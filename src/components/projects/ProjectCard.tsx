"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { Project } from "@/data/projects";
import { ProjectDrawer } from "@/components/projects/ProjectDrawer";

interface ProjectCardProps {
  project: Project;
  children: ReactNode;
  featured?: boolean;
}

export function ProjectCard({ project, children, featured = false }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <article
        className={`project-card${featured ? " project-card-featured" : ""}`}
      >
        <div className="project-card-preview" aria-hidden="true">
          {children}
        </div>
        <div className="project-card-content">
          <div className="project-card-meta">
            <span className="project-category">{project.category}</span>
            <span className={`status-badge${project.status === "Experiment" ? " status-experiment" : ""}`}>
              <span className="status-dot" aria-hidden="true" />
              {project.status}
            </span>
          </div>
          <h3 className="project-card-title">{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <div className="feature-chips">
            {project.features.slice(0, featured ? 5 : 3).map((feature) => (
              <span className="feature-chip" key={feature}>{feature}</span>
            ))}
            {project.id === "editflow" && (
              <span className="feature-chip technology-chip">{project.technology.join(" / ")}</span>
            )}
          </div>
          <div className="project-card-footer">
            <span>{project.footer}</span>
            <span className="project-details-link">
              View details <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
        <button
          type="button"
          className="project-card-trigger"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-label={`Explore ${project.name}: ${project.description}`}
        />
      </article>
      <ProjectDrawer project={project} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
