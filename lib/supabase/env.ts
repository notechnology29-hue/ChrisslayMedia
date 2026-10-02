export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// Accepts either the legacy anon key name or the newer publishable key name.
export const SUPABASE_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!;
