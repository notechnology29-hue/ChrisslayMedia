-- Run in Supabase SQL Editor.

-- TABLES
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  session_type text not null,
  heard_from text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.galleries (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  category text not null default 'client',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date,
  cover_image_url text,
  created_at timestamptz not null default now()
);

-- ROW LEVEL SECURITY
alter table public.inquiries enable row level security;
alter table public.galleries enable row level security;
alter table public.events enable row level security;

-- inquiries: public can submit; only authenticated admin can read/manage
create policy "Anyone can submit inquiries" on public.inquiries
  for insert to anon, authenticated with check (true);
create policy "Admin reads inquiries" on public.inquiries
  for select to authenticated using (true);
create policy "Admin deletes inquiries" on public.inquiries
  for delete to authenticated using (true);

-- galleries: public read; admin writes
create policy "Public reads galleries" on public.galleries
  for select to anon, authenticated using (true);
create policy "Admin inserts galleries" on public.galleries
  for insert to authenticated with check (true);
create policy "Admin updates galleries" on public.galleries
  for update to authenticated using (true) with check (true);
create policy "Admin deletes galleries" on public.galleries
  for delete to authenticated using (true);

-- events: public read; admin writes
create policy "Public reads events" on public.events
  for select to anon, authenticated using (true);
create policy "Admin inserts events" on public.events
  for insert to authenticated with check (true);
create policy "Admin updates events" on public.events
  for update to authenticated using (true) with check (true);
create policy "Admin deletes events" on public.events
  for delete to authenticated using (true);

-- STORAGE: public bucket "media"
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public reads media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');
create policy "Admin uploads media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');
create policy "Admin updates media" on storage.objects
  for update to authenticated using (bucket_id = 'media');
create policy "Admin deletes media" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
