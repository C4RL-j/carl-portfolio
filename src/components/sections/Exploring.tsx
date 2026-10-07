import { ArrowUpRight, Boxes, Cloud, HardDrive, MousePointer2, Rabbit } from "lucide-react";

const rabbitHoles = [
  { name: "Seamless Save Sync", description: "One logical game save progressing over time instead of creating duplicate backups.", icon: Cloud },
  { name: "Lightweight Software", description: "How much functionality can exist without turning a small utility into a giant application?", icon: Boxes },
  { name: "Local-First Apps", description: "Keep useful data close to the user while making backup and migration painless.", icon: HardDrive },
  { name: "Better Desktop UX", description: "Small interactions that make software feel dramatically better.", icon: MousePointer2 },
  { name: "Old Hardware, New Tricks", description: "Finding out how much useful life can still be squeezed out of modest PC hardware.", icon: Rabbit },
];

export function Exploring() {
  return (
    <section id="exploring" className="section exploring-section">
      <div className="exploring-heading">
        <div className="section-heading"><span className="eyebrow">CURIOSITY / ALWAYS RUNNING</span><h2>Current rabbit holes.</h2></div>
        <span className="exploring-note">No roadmap. Just questions.<ArrowUpRight size={15} aria-hidden="true" /></span>
      </div>
      <div className="rabbit-hole-grid">
        {rabbitHoles.map(({ name, description, icon: Icon }, index) => (
          <article className="rabbit-hole-card" key={name}>
            <div className="rabbit-hole-topline"><Icon size={21} strokeWidth={1.6} aria-hidden="true" /><span>0{index + 1}</span></div>
            <h3>{name}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
