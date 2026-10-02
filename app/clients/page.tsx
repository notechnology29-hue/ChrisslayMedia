import PageShell from "@/components/PageShell";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function Clients() {
  const { data: events } = await createClient()
    .from("events")
    .select("id, title, description, event_date, cover_image_url")
    .order("event_date", { ascending: false });

  return (
    <PageShell title="Clients">
      {!events?.length && (
        <p className="text-sm uppercase tracking-[0.2em] text-black/50">No events yet.</p>
      )}
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {events?.map((e) => (
          <article key={e.id}>
            {e.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={e.cover_image_url} alt={e.title} className="mb-4 aspect-[4/5] w-full object-cover grayscale" />
            )}
            <h2 className="text-2xl">{e.title}</h2>
            {e.event_date && (
              <p className="text-xs uppercase tracking-[0.2em] text-black/60">
                {new Date(e.event_date).toLocaleDateString("en-US", { dateStyle: "long" })}
              </p>
            )}
            {e.description && <p className="mt-3 text-sm leading-relaxed">{e.description}</p>}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
