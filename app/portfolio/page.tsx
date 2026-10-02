import PageShell from "@/components/PageShell";
import MasonryGallery from "@/components/MasonryGallery";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function Portfolio() {
  const { data } = await createClient()
    .from("galleries")
    .select("id, title, image_url")
    .eq("category", "portfolio")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <PageShell title="Portfolio">
      <MasonryGallery images={data ?? []} />
    </PageShell>
  );
}
