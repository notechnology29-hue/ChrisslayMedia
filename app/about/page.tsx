import PageShell from "@/components/PageShell";

const profiles = [
  {
    name: "CHRISS LAY",
    roles: "Creative Director, Director of Photography, Videographer",
    image: "/images/chriss.jpg",
    paragraphs: [
      "The story of a photographer. Chriss R Lay: Master of Cinematic Storytelling. In the vibrant world where fashion meets artistry, Chriss R Lay stands as a visionary force, weaving narratives through the lens of his camera. With a career spanning nearly five decades, Chriss has carved out a niche as a prolific videographer whose work transcends mere imagery, capturing the essence of fashion, beauty, and cultural zeitgeist.",
      "A Legacy of Excellence: Since 1974, Chriss R Lay has been at the forefront of videography, leaving an indelible mark on prestigious events and brands worldwide. His portfolio reads like a who's who of the fashion and entertainment industries, including groundbreaking collaborations with Phoenix Fashion Week, New York Fashion Week, Milan Fashion Week, and Paris Fashion Week.",
      "Behind the Camera: Chriss's journey from photographer to director of photography and executive producer reflects his multifaceted talent and dedication to storytelling. His keen eye for detail and ability to evoke emotion through visuals have earned him acclaim among peers and clients alike. Whether capturing the electrifying energy of a runway show or the subtle nuances of a hair transformation, Chriss infuses each project with creativity and technical finesse.",
      "A Diverse Portfolio: Chriss's contributions extend beyond fashion into diverse realms, from corporate giants like Mountain Dew to cultural showcases like The Garment League, Fashion Industry Youth Initiative (501c3), Phoenix Swim Week and The Hair Transformation Tour. His versatility shines through in every project, seamlessly adapting his cinematic style to suit the unique essence of each brand and event.",
      "Innovation and Collaboration: Beyond his technical prowess, Chriss R Lay is celebrated for his collaborative spirit and ability to orchestrate seamless productions. His leadership as an executive producer and his role in transportation ensure that every aspect of filming, from logistics to execution, is meticulously planned and flawlessly executed.",
      "Looking Ahead: As Chriss continues to push the boundaries of visual storytelling, his passion for innovation remains undiminished. His upcoming projects promise to redefine the intersection of fashion, art, and culture, further cementing his status as a luminary in the world of videography.",
      "Conclusion: Chriss R Lay's journey from a photographer in 1974 to an esteemed videographer today is a testament to his unwavering commitment to excellence and his profound impact on the industry. His ability to capture moments that transcend time and trends makes him a true visionary, shaping the future of visual storytelling with each frame. For those seeking to experience the magic of storytelling through film, Chriss R Lay stands ready to capture the essence of your vision and bring it to life with unparalleled artistry and dedication.",
    ],
  },
  {
    name: "CATHERINE DICKSON",
    roles: "Stylist, Jewelry Designer, 1st Assistant Photographer",
    image: "https://placehold.co/800x1000/000000/ffffff?text=CATHERINE+DICKSON",
    paragraphs: [
      "The story of a photographer. I have the eye of an artist; I see beauty and light in the world and people around me. For as long as I can remember, I have found great joy in expressing and revealing this beauty through different art forms. My jewelry design, styling, and photography allow me to shine a light on the beauty around me AND empower others to document their beautiful stories for the world to discover. My favorite styles of photography are product/brand photography and boudoir; for in them I am able to focus on the story the business owner or individual is working to tell the world. These formats allow me to partner with others to empower them to reach their goals and reveal their inner strengths.",
    ],
  },
];

export default function About() {
  return (
    <PageShell title="About Me">
      <div className="space-y-32">
        {profiles.map((p, i) => (
          <section key={p.name} className="grid gap-12 md:grid-cols-2">
            <div className={i % 2 ? "md:order-2" : ""}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="w-full grayscale md:sticky md:top-32" />
            </div>
            <div>
              <h2 className="text-4xl font-light tracking-wide md:text-5xl">{p.name}</h2>
              <p className="mb-8 mt-2 text-xs uppercase tracking-[0.25em] text-black/60">{p.roles}</p>
              <div className="space-y-5 text-sm leading-relaxed md:text-base">
                {p.paragraphs.map((t, j) => (
                  <p key={j}>{t}</p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
