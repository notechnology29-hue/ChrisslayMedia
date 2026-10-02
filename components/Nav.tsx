"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "HOME", href: "/" },
  { label: "CONTACT", href: "/contact" },
  { label: "ABOUT", href: "/about" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "CLIENTS", href: "/clients" },
  { label: "INVESTMENT", href: "/investment" },
  { label: "CLIENT AREA", href: "/client-area" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 ${
          isHome ? "text-white mix-blend-difference" : "border-b border-black bg-white text-black"
        }`}
      >
        <div className="relative flex items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" aria-label="Chriss Lay Media home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={isHome ? "/logo-white.png" : "/logo.png"} alt="Chriss Lay Media" className="h-14 w-auto" />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-5 whitespace-nowrap text-[10px] tracking-[0.15em] lg:flex xl:gap-8 xl:text-[11px] xl:tracking-[0.25em]">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="underline-offset-8 hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`hidden whitespace-nowrap border px-4 py-2 text-[10px] tracking-[0.15em] transition sm:block xl:px-5 xl:text-[11px] xl:tracking-[0.25em] ${
                isHome
                  ? "border-white hover:bg-white hover:text-black"
                  : "border-black hover:bg-black hover:text-white"
              }`}
            >
              GET IN TOUCH
            </Link>
            <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay: hidden entirely when closed, so it never sits over page content */}
      {open && (
      <div
        className="fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen animate-fade-in flex-col bg-black text-white lg:hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute right-6 top-6"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        <nav className="flex flex-1 flex-col items-center justify-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-serif text-3xl font-light tracking-[0.2em] transition hover:opacity-60"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-6 border border-white px-8 py-3 text-xs tracking-[0.25em] transition hover:bg-white hover:text-black"
          >
            GET IN TOUCH
          </Link>
        </nav>
      </div>
      )}
    </>
  );
}
