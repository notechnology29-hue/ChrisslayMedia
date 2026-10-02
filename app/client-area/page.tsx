import PageShell from "@/components/PageShell";
import MasonryGallery from "@/components/MasonryGallery";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function ClientArea() {
  const { data } = await createClient()
    .from("galleries")
    .select("id, title, image_url")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <PageShell title="Client Area">
      <p className="mb-16 max-w-3xl text-sm leading-relaxed md:text-base">
        I have been blessed to work with some of the most fantastic clients. After 30+ years of doing
        this I am still amazed at the hidden talent I have been able to photograph once people get in
        front of my lens. Fashion is where I started in New York City, the city that never sleeps and
        yes plenty of overnight shoots. Special Events have always been fun to plan and shoot for our
        clients, so much that we are always requested to return for the next event. BTS (Behind the
        Scenes) gives us the chance to work on movie sets with some of the best in the industry on some
        of the best movies ever made.
      </p>
      <MasonryGallery images={data ?? []} />
    </PageShell>
  );
}
