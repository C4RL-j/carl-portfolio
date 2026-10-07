import { ArrowRight, Coffee, Hammer, MousePointer2, Sparkles } from "lucide-react";

const stages = [
  { title: "Get annoyed", description: "Find something unnecessarily repetitive, heavy, awkward, or missing.", icon: Coffee },
  { title: "Build the smallest useful version", description: "Ignore the giant roadmap and make the useful part work first.", icon: Hammer },
  { title: "Use it myself", description: "Real usage exposes problems faster than imaginary users do.", icon: MousePointer2 },
  { title: "Keep shaving friction", description: "Remove clicks, improve layout, automate repetitive steps, and make it lighter.", icon: Sparkles },
];

export function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="section-heading">
        <span className="eyebrow">04 / PROCESS</span>
        <h2>My development process is suspiciously simple.</h2>
      </div>
      <ol className="process-grid">
        {stages.map(({ title, description, icon: Icon }, index) => (
          <li className="process-step" key={title}>
            <div className="process-step-top"><span className="process-number">0{index + 1}</span><Icon size={20} strokeWidth={1.6} aria-hidden="true" /></div>
            <h3>{title}</h3>
            <p>{description}</p>
            {index < stages.length - 1 && <ArrowRight className="process-arrow" size={18} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <blockquote className="build-quote">
        <span className="quote-mark" aria-hidden="true">&ldquo;</span>
        <p>If I repeat it enough, <span>automate it.</span><br />If it feels heavy, <span>make it lighter.</span><br />If it breaks, <span>understand why.</span></p>
        <span className="quote-caption">A WORKING PHILOSOPHY. STILL IN DEVELOPMENT.</span>
      </blockquote>
    </section>
  );
}
