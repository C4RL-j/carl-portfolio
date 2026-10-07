import { ArrowDownRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EditFlowPreview, GenericPreview, LitePlayPreview, RouterPreview } from "@/components/projects/Previews";

const previews: Record<string, React.ReactNode> = { liteplay:<LitePlayPreview/>, editflow:<EditFlowPreview/>, "d2-controller-center":<RouterPreview/>, d2:<RouterPreview/> };

export function Projects() {
  return <section className="section projects-section" id="projects" aria-labelledby="projects-title"><div className="section-heading section-heading-split"><div><span className="eyebrow">01 <span>/</span> BUILDS</span><h2 id="projects-title">Things I&apos;ve decided<br/>should exist<span className="accent-blue">.</span></h2><p>Most of my projects start with the same thought:<br className="desktop-break"/> “Why doesn&apos;t this already work the way I want?”</p></div><span className="section-aside">SMALL TOOLS. REAL PROBLEMS. <ArrowDownRight size={20}/></span></div><div className="projects-grid">{projects.map((project,index)=><ProjectCard key={project.id} project={project} featured={index===0}>{previews[project.id] || <GenericPreview name={project.name} status={project.status}/>}</ProjectCard>)}</div><div className="projects-footnote"><span className="tiny-dot"/> Built for real use. Refined one small frustration at a time.<span>SELECT A BUILD TO LOOK INSIDE ↗</span></div></section>;
}
