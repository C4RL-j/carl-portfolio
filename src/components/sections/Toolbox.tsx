import { Code2, Monitor, Scissors, Wrench } from "lucide-react";

const toolGroups = [
  { title: "Build", icon: Code2, tools: ["Python", "PySide6", "TypeScript", "Next.js", "Git"] },
  { title: "Workspace", icon: Monitor, tools: ["VS Code", "PowerShell", "Windows Terminal", "GitHub"] },
  { title: "Creative", icon: Scissors, tools: ["CapCut", "Short-form Editing", "Asset Management"] },
  { title: "Tinkering", icon: Wrench, tools: ["Windows", "PC Hardware", "Networking", "LTE / Router Diagnostics"] },
];

export function Toolbox() {
  return (
    <section id="stack" className="section toolbox-section">
      <div className="section-heading">
        <span className="eyebrow">05 / TOOLBOX</span>
        <h2>Tools I keep reaching for.</h2>
      </div>
      <div className="toolbox-grid">
        {toolGroups.map(({ title, icon: Icon, tools }) => (
          <article className="toolbox-group" key={title}>
            <div className="toolbox-group-heading"><Icon size={19} strokeWidth={1.6} aria-hidden="true" /><h3>{title}</h3></div>
            <ul className="tool-chips">{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          </article>
        ))}
      </div>
      <p className="toolbox-caption">I care less about collecting technologies and more about whether a tool helps me finish something useful.</p>
    </section>
  );
}
