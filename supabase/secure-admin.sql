-- Run AFTER schema.sql. Restricts all writes to an allowlist of admin emails.

-- 1. Admin allowlist (no RLS policies = unreadable by clients; only is_admin() reads it)
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security;

-- >>> Replace with your admin email(s), then run <<<
insert into public.admins (email) values ('Info@chrisslaymedia.com') on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 2. Replace the "any authenticated user" policies
drop policy if exists "Admin reads inquiries" on public.inquiries;
drop policy if exists "Admin deletes inquiries" on public.inquiries;
drop policy if exists "Admin inserts galleries" on public.galleries;
drop policy if exists "Admin updates galleries" on public.galleries;
drop policy if exists "Admin deletes galleries" on public.galleries;
drop policy if exists "Admin inserts events" on public.events;
drop policy if exists "Admin updates events" on public.events;
drop policy if exists "Admin deletes events" on public.events;
drop policy if exists "Admin uploads media" on storage.objects;
drop policy if exists "Admin updates media" on storage.objects;
drop policy if exists "Admin deletes media" on storage.objects;

create policy "Admin reads inquiries" on public.inquiries
  for select to authenticated using (public.is_admin());
create policy "Admin deletes inquiries" on public.inquiries
  for delete to authenticated using (public.is_admin());

create policy "Admin inserts galleries" on public.galleries
  for insert to authenticated with check (public.is_admin());
create policy "Admin updates galleries" on public.galleries
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin deletes galleries" on public.galleries
  for delete to authenticated using (public.is_admin());

create policy "Admin inserts events" on public.events
  for insert to authenticated with check (public.is_admin());
create policy "Admin updates events" on public.events
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admin deletes events" on public.events
  for delete to authenticated using (public.is_admin());

create policy "Admin uploads media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "Admin updates media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "Admin deletes media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());

-- 3. Validate public inquiry submissions and cap upload size/type
drop policy if exists "Anyone can submit inquiries" on public.inquiries;
create policy "Anyone can submit inquiries" on public.inquiries
  for insert to anon, authenticated
  with check (
    char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and char_length(message) between 1 and 5000
  );

update storage.buckets
set file_size_limit = 10485760,
    allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','image/avif']
where id = 'media';
