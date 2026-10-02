import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login?denied=1");

  const [galleries, events, inquiries] = await Promise.all([
    supabase.from("galleries").select("*").order("created_at", { ascending: false }),
    supabase.from("events").select("*").order("event_date", { ascending: false }),
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <AdminDashboard
      email={user.email ?? ""}
      galleries={galleries.data ?? []}
      events={events.data ?? []}
      inquiries={inquiries.data ?? []}
    />
  );
}
