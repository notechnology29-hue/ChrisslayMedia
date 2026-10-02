"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-black px-6 py-8 text-[11px] uppercase tracking-[0.2em] lg:px-10">
      <div className="mx-auto max-w-6xl">
        <span>&copy; {new Date().getFullYear()} Chriss Lay Media</span>
      </div>
    </footer>
  );
}
