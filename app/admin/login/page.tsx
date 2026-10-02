"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    setError(null);

    const { error } = await createClient().auth.signInWithPassword({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });

    if (error) {
      setError("Invalid credentials.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("denied")) {
      setError("This account is not authorized for admin access.");
      createClient().auth.signOut();
    }
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="mb-10 text-4xl font-light">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-8">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="field" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required className="field" />
        </div>
        <button className="btn w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
        {error && <p className="text-sm">{error}</p>}      </form>
    </main>
  );
}
