const VIDEO_SRC =
  process.env.NEXT_PUBLIC_HOME_VIDEO_URL ||
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col md:flex-row">
      <div className="relative h-1/2 w-full bg-black md:h-screen md:w-1/2">
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-[0.35] grayscale"
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <section className="flex h-1/2 w-full items-center justify-center overflow-y-auto px-8 pb-8 pt-24 md:h-screen md:w-1/2 md:px-16">
        <div className="max-w-xl">
          <h1 className="mb-8 text-3xl font-light uppercase leading-tight tracking-wide lg:text-4xl xl:text-5xl">
            My Philosophy &ndash; Photography is Poetry
          </h1>
          <div className="space-y-5 text-sm leading-relaxed md:text-base">
            <p>
              The poet Langston Hughes wrote one of my favorite poems &ldquo;Mother to Son&rdquo; a
              piece done during the Harlem Renaissance. I&apos;ve often wondered in my minds eye what
              that looked like.
            </p>
            <p>
              My goal is for my pictures to touch your minds eye, not just your visual eye. I want my
              work to make you think beyond what you see. I want &ldquo;our art,&rdquo; the art you
              and I create, to invoke thought on a higher level when it&apos;s seen with your minds
              eye.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
