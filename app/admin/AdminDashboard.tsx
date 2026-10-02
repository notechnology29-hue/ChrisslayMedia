"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Gallery = { id: string; title: string | null; image_url: string; category: string; sort_order: number };
type EventRow = { id: string; title: string; description: string | null; event_date: string | null; cover_image_url: string | null };
type Inquiry = {
  id: string; name: string; email: string; session_type: string;
  heard_from: string; message: string; created_at: string;
};

const MAX_BYTES = 10 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/avif": "avif",
};
const TABS = ["Upload", "Galleries", "Events", "Inquiries"] as const;

export default function AdminDashboard({
  email, galleries, events, inquiries,
}: { email: string; galleries: Gallery[]; events: EventRow[]; inquiries: Inquiry[] }) {
  const supabase = createClient();
  const router = useRouter();

  const [tab, setTab] = useState<(typeof TABS)[number]>("Upload");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  async function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = new FormData(e.currentTarget).get("file") as File | null;
    if (!file || !file.size) return;

    const ext = EXT_BY_TYPE[file.type];
    if (!ext) return setMessage("Only JPG, PNG, WebP, GIF or AVIF images are allowed.");
    if (file.size > MAX_BYTES) return setMessage("File must be under 10 MB.");

    setUploading(true);
    setMessage(null);
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
    setUploading(false);

    if (error) return setMessage(`Upload failed: ${error.message}`);
    setUploadedUrl(supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    setMessage("Upload complete. The URL is pre-filled in the Galleries and Events forms.");
  }

  async function addGallery(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const { error } = await supabase.from("galleries").insert({
      title: (d.get("title") as string) || null,
      image_url: d.get("image_url") as string,
      category: d.get("category") as string,
      sort_order: Number(d.get("sort_order") || 0),
    });
    setMessage(error ? `Error: ${error.message}` : "Gallery image added.");
    if (!error) { form.reset(); router.refresh(); }
  }

  async function addEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const { error } = await supabase.from("events").insert({
      title: d.get("title") as string,
      description: (d.get("description") as string) || null,
      event_date: (d.get("event_date") as string) || null,
      cover_image_url: (d.get("cover_image_url") as string) || null,
    });
    setMessage(error ? `Error: ${error.message}` : "Event added.");
    if (!error) { form.reset(); router.refresh(); }
  }

  async function remove(table: "galleries" | "events" | "inquiries", id: string, fileUrl?: string | null) {
    if (!confirm("Delete this item permanently?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return setMessage(`Error: ${error.message}`);

    // Remove the stored file too if it lives in our bucket
    const marker = "/media/";
    const idx = fileUrl?.indexOf(marker) ?? -1;
    if (fileUrl && idx !== -1) {
      await supabase.storage.from("media").remove([decodeURIComponent(fileUrl.slice(idx + marker.length))]);
    }
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-light">Admin Dashboard</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-black/60">{email}</p>
        </div>
        <button onClick={signOut} className="btn">Sign out</button>
      </div>

      <div className="mb-10 flex gap-6 border-b border-black text-xs uppercase tracking-[0.2em]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 ${tab === t ? "border-b-2 border-black font-semibold" : "text-black/50"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {message && <p className="mb-8 border border-black p-4 text-sm">{message}</p>}

      {tab === "Upload" && (
        <section>
          <h2 className="mb-6 text-2xl">Upload Image</h2>
          <form onSubmit={onUpload} className="space-y-6">
            <input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" required className="block w-full text-sm" />
            <button className="btn" disabled={uploading}>{uploading ? "Uploading…" : "Upload"}</button>
          </form>
          {uploadedUrl && <p className="mt-4 break-all text-xs">{uploadedUrl}</p>}
        </section>
      )}

      {tab === "Galleries" && (
        <section className="space-y-12">
          <form onSubmit={addGallery} className="space-y-6">
            <h2 className="text-2xl">Add to Gallery</h2>
            <div>
              <label className="label">Image URL *</label>
              <input name="image_url" type="url" required defaultValue={uploadedUrl} key={uploadedUrl} className="field" />
            </div>
            <div>
              <label className="label">Title</label>
              <input name="title" maxLength={200} className="field" />
            </div>
            <div>
              <label className="label">Category</label>
              <select name="category" className="field" defaultValue="client">
                <option value="client">Client Area</option>
                <option value="portfolio">Portfolio</option>
              </select>
            </div>
            <div>
              <label className="label">Sort order</label>
              <input name="sort_order" type="number" defaultValue={0} className="field" />
            </div>
            <button className="btn">Add to Gallery</button>
          </form>

          <div>
            <h2 className="mb-6 text-2xl">Existing ({galleries.length})</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {galleries.map((g) => (
                <div key={g.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image_url} alt={g.title ?? ""} className="aspect-square w-full object-cover" />
                  <p className="mt-1 truncate text-xs">{g.title || "Untitled"} · {g.category}</p>
                  <button onClick={() => remove("galleries", g.id, g.image_url)} className="text-xs underline">Delete</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === "Events" && (
        <section className="space-y-12">
          <form onSubmit={addEvent} className="space-y-6">
            <h2 className="text-2xl">Add Event</h2>
            <div>
              <label className="label">Title *</label>
              <input name="title" required maxLength={200} className="field" />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea name="description" rows={3} className="field" />
            </div>
            <div>
              <label className="label">Date</label>
              <input name="event_date" type="date" className="field" />
            </div>
            <div>
              <label className="label">Cover image URL</label>
              <input name="cover_image_url" type="url" defaultValue={uploadedUrl} key={uploadedUrl} className="field" />
            </div>
            <button className="btn">Add Event</button>
          </form>

          <div>
            <h2 className="mb-6 text-2xl">Existing ({events.length})</h2>
            <ul className="divide-y divide-black/20">
              {events.map((ev) => (
                <li key={ev.id} className="flex items-center justify-between py-3 text-sm">
                  <span>{ev.title} {ev.event_date && <span className="text-black/50">· {ev.event_date}</span>}</span>
                  <button onClick={() => remove("events", ev.id, ev.cover_image_url)} className="text-xs underline">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {tab === "Inquiries" && (
        <section>
          <h2 className="mb-6 text-2xl">Inquiries ({inquiries.length})</h2>
          <ul className="space-y-6">
            {inquiries.map((q) => (
              <li key={q.id} className="border border-black p-5 text-sm">
                <div className="mb-2 flex justify-between gap-4">
                  <strong>{q.name}</strong>
                  <span className="text-xs text-black/50">{new Date(q.created_at).toLocaleString()}</span>
                </div>
                <a href={`mailto:${q.email}`} className="underline">{q.email}</a>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-black/60">{q.session_type} · via {q.heard_from}</p>
                <p className="mt-3 whitespace-pre-wrap">{q.message}</p>
                <button onClick={() => remove("inquiries", q.id)} className="mt-3 text-xs underline">Delete</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
