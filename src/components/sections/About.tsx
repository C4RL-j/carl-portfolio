import { Circle, TerminalSquare } from "lucide-react";

const modes = [
  { name: "Build", value: 9 },
  { name: "Edit", value: 7 },
  { name: "Tinker", value: 10 },
  { name: "Sleep", value: 2 },
];

export function About() {
  return (
    <section id="about" className="section about-section">
      <div className="about-copy">
        <div className="section-heading"><span className="eyebrow">THE PERSON BEHIND THE WINDOWS</span><h2>I learn by building.</h2></div>
        <p>Most things I know started with curiosity rather than a syllabus. I pick something I want to understand, build around it, get stuck, research the problem, fix it, and keep going.</p>
        <p>That means my projects tend to jump between software, editing, networking, Windows, hardware, and whatever problem happens to catch my attention next. The subject changes. The pattern doesn&apos;t.</p>
        <p>I like practical things. Small tools. Clear interfaces. Systems that save time. And software that respects the machine it&apos;s running on.</p>
      </div>
      <aside className="operating-mode" aria-label="A humorous snapshot of Carl's operating mode">
        <div className="operating-mode-title"><span><TerminalSquare size={16} aria-hidden="true" /> Operating mode</span><Circle size={7} className="mode-online" aria-hidden="true" /></div>
        <div className="mode-bars">
          {modes.map(({ name, value }) => (
            <div className={`mode-row mode-${name.toLowerCase()}`} key={name} aria-label={`${name}: ${value} of 10, for amusement only`}>
              <span className="mode-name">{name}</span>
              <span className="mode-segments" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <span key={i} className={`mode-segment${i < value ? " is-filled" : ""}`} />)}</span>
            </div>
          ))}
        </div>
        <p className="operating-mode-caption"><span aria-hidden="true">{"//"}</span> sleep optimization pending</p>
      </aside>
    </section>
  );
}
