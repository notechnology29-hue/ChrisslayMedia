export default function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-32 pt-40 lg:px-10">
      <h1 className="mb-12 text-5xl font-light uppercase tracking-wide md:text-7xl">{title}</h1>
      {children}
    </main>
  );
}
