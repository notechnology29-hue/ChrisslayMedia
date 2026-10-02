import Link from "next/link";
import PageShell from "@/components/PageShell";

const services = [
  "Engagement / Wedding",
  "Fashion",
  "Model Comp Cards",
  "Casual",
  "Event",
  "Product / Branding",
  "Video",
  "Maternity",
  "Real Estate",
];

const steps = [
  { n: "01", title: "Share your idea", text: "Tell us about your project through the contact form: the type of session, your vision, and your timeline." },
  { n: "02", title: "Reserve your date", text: "Our calendar fills quickly. We temporarily hold your date while we shape a plan together." },
  { n: "03", title: "Meet in person", text: "We meet to strategize and, when needed, walk through the venue." },
  { n: "04", title: "Create", text: "We capture and create your story, then deliver your finished images and video." },
];

export default function Investment() {
  return (
    <PageShell title="Investment">
      <p className="mb-20 max-w-3xl text-sm leading-relaxed md:text-base">
        Every project is different, so every investment is tailored. Pricing depends on the type of
        session, the length of coverage, the number of people involved, location, and whether photo,
        video, or both are needed. Tell us about your vision and we will provide a clear quote.
      </p>

      <section className="mb-24">
        <h2 className="mb-8 text-3xl font-light md:text-4xl">Sessions</h2>
        <ul className="grid border-l border-t border-black sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s} className="border-b border-r border-black p-6 text-xs uppercase tracking-[0.2em]">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-24">
        <h2 className="mb-8 text-3xl font-light md:text-4xl">How It Works</h2>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n}>
              <span className="font-serif text-5xl font-light text-black/30">{s.n}</span>
              <h3 className="mb-2 mt-2 text-xl">{s.title}</h3>
              <p className="text-sm leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-black pt-12">
        <h2 className="mb-4 text-3xl font-light md:text-4xl">Plan well in advance</h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed md:text-base">
          As soon as you think of your project, contact us so we can accommodate your request in a
          timely manner.
        </p>
        <Link href="/contact" className="btn inline-block">Request a quote</Link>
      </section>
    </PageShell>
  );
}
