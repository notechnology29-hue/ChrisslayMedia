import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-32 pt-40">
      <h1 className="mb-8 text-5xl font-light tracking-wide md:text-7xl">Let&apos;s Start Your Journey</h1>
      <div className="mb-16 space-y-4 text-sm leading-relaxed md:text-base">
        <p>
          So you like what you see on our page... Thanks!! Now you have more questions and no clue
          where to begin; well we can help. First, you need to have an idea to start with. Next, fill
          out the page below and hang on.....we will get this form and reach out to you and start to
          formulate a plan.
        </p>
        <p>
          <strong>PLAN WELL IN ADVANCE:</strong> As soon as you think of your project contact us. our
          calendar fills quickly, and we want to ensure we can accommodate your request in a timely
          manner.
        </p>
        <p>
          <strong>MEETING IN PERSON:</strong> Once we have temporarily reserved your date, we will meet
          in person to strategize and possibly do a venue walk through.
        </p>
      </div>
      <ContactForm />
    </main>
  );
}
