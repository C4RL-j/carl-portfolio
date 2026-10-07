import {
  ArrowDownRight,
  BookOpen,
  FlaskConical,
  LayoutTemplate,
  Network,
  PanelTop,
  Sun,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";
import { experiments } from "@/data/experiments";
import { Terminal } from "@/components/terminal/Terminal";

const experimentIcons: Record<string, LucideIcon> = {
  "manga-reader": BookOpen,
  "brightness-utility": Sun,
  "windows-utilities": PanelTop,
  "network-experiments": Network,
  "ui-experiments": LayoutTemplate,
};

export function Lab() {
  return (
    <section id="lab" className="section lab-section">
      <div className="section-heading">
        <span className="eyebrow">02 / LAB</span>
        <h2>Not everything needs to become a startup.</h2>
        <p>
          Some ideas are just experiments. Some become useful tools. Some teach
          me why the original software was complicated in the first place. All
          of them teach me something.
        </p>
      </div>

      <div className="lab-grid">
        {experiments.map((experiment, index) => {
          const Icon = experimentIcons[experiment.id] ?? FlaskConical;

          return (
            <article className="experiment-card" key={experiment.id}>
              <div className="experiment-topline">
                <span className="experiment-icon"><Icon size={21} strokeWidth={1.6} aria-hidden="true" /></span>
                <span className="tiny-label">{experiment.status}</span>
              </div>
              <h3>{experiment.name}</h3>
              <p>{experiment.description}</p>
              <span className="experiment-index" aria-hidden="true">
                EXP_{String(index + 1).padStart(2, "0")}
                <ArrowDownRight size={14} />
              </span>
            </article>
          );
        })}
      </div>

      <div className="lab-terminal">
        <div className="lab-terminal-note">
          <span className="eyebrow"><TerminalSquare size={15} aria-hidden="true" /> A SMALL SIDE ENTRANCE</span>
          <h3>Make yourself at home.</h3>
          <p>
            A little terminal. A few local commands. Just enough to poke around.
          </p>
          <span className="terminal-hint">Try <code>help</code> to get started.</span>
        </div>
        <Terminal />
      </div>
    </section>
  );
}
