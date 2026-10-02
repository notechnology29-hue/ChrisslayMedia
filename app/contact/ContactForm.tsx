"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const sessionTypes = [
  "Engagement/ Wedding",
  "Fashion",
  "Model Comp Cards",
  "Casual",
  "Event",
  "Product/ Branding",
  "Video",
  "Maternity",
  "Real Estate",
];
const sources = ["Facebook Ads", "Google search", "From a friend", "Other"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const { error } = await createClient()
      .from("inquiries")
      .insert({
        name: data.get("name") as string,
        email: data.get("email") as string,
        session_type: data.get("session_type") as string,
        heard_from: data.get("heard_from") as string,
        message: data.get("message") as string,
      });

    if (error) {
      setStatus("error");
    } else {
      form.reset();
      setStatus("sent");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div>
        <label className="label" htmlFor="name">Your name *</label>
        <input id="name" name="name" required className="field" />
      </div>
      <div>
        <label className="label" htmlFor="email">Email address *</label>
        <input id="email" name="email" type="email" required className="field" />
      </div>
      <div>
        <label className="label" htmlFor="session_type">What type of session are you looking for? *</label>
        <select id="session_type" name="session_type" required defaultValue="" className="field">
          <option value="" disabled>Select…</option>
          {sessionTypes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="heard_from">How did you hear about us? *</label>
        <select id="heard_from" name="heard_from" required defaultValue="" className="field">
          <option value="" disabled>Select…</option>
          {sources.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="message">Message *</label>
        <textarea id="message" name="message" required rows={5} className="field" />
      </div>

      <button type="submit" disabled={status === "sending"} className="btn">
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {status === "sent" && <p className="text-sm">Thank you. We will be in touch shortly.</p>}
      {status === "error" && <p className="text-sm">Something went wrong. Please try again.</p>}
    </form>
  );
}
