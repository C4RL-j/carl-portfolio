"use client";

import { ArrowRight, ArrowUpRight, Cpu, Lightbulb, Waypoints } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import type { Project } from "@/data/projects";

interface ProjectDrawerProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

export function ProjectDrawer({ project, open, onClose }: ProjectDrawerProps) {
  return (
    <Dialog open={open} onClose={onClose} title={project.name} className="project-drawer">
      <div className="project-drawer-intro">
        <span className="project-category">{project.category}</span>
        <span className={`status-badge${project.status === "Experiment" ? " status-experiment" : ""}`}>
          <span className="status-dot" aria-hidden="true" />
          {project.status}
        </span>
        <p className="project-drawer-description">{project.longDescription}</p>
      </div>

      <section className="project-drawer-section" aria-label="Features">
        <h3>{project.status === "Experiment" ? "Ideas being explored" : "Inside the project"}</h3>
        <ul className="project-drawer-features feature-chips">
          {project.features.map((feature) => (
            <li className="feature-chip" key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      {project.id === "editflow" && (
        <div className="project-workflow" aria-label="Editing pipeline: Need Edit, Editing, Need Upload, Done">
          {["Need Edit", "Editing", "Need Upload", "Done"].map((step, index) => (
            <span className="project-workflow-item" key={step}>
              <span>{step}</span>
              {index < 3 && <ArrowRight size={14} aria-hidden="true" />}
            </span>
          ))}
        </div>
      )}

      {project.technology.length > 0 && (
        <section className="project-drawer-section">
          <h3><Cpu size={16} aria-hidden="true" /> {project.id === "editflow" ? "Built with" : "Platform & focus"}</h3>
          <ul className="project-drawer-features feature-chips">
            {project.technology.map((technology) => (
              <li className="feature-chip" key={technology}>{technology}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="project-drawer-section">
        <h3><Waypoints size={16} aria-hidden="true" /> Design goals</h3>
        <ul className="project-detail-list">
          {project.designGoals.map((goal) => <li key={goal}>{goal}</li>)}
        </ul>
      </section>

      <section className="project-drawer-section">
        <h3><Lightbulb size={16} aria-hidden="true" /> What started it</h3>
        <p>{project.inspiration}</p>
      </section>

      <section className="project-drawer-section">
        <h3><ArrowUpRight size={16} aria-hidden="true" /> Where it could go</h3>
        <ul className="project-detail-list">
          {project.futureDirection.map((direction) => <li key={direction}>{direction}</li>)}
        </ul>
      </section>

      <p className="project-drawer-note">{project.footer}</p>
    </Dialog>
  );
}
