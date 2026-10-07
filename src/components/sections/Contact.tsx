import { ArrowUpRight, GitBranch, Mail, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Contact() {
  const socialLinks = siteConfig.socials.filter((social) => social.url.trim());
  const hasContact = Boolean(siteConfig.email || siteConfig.github || socialLinks.length);

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-panel">
        <span className="contact-symbol" aria-hidden="true"><Sparkles size={26} strokeWidth={1.4} /></span>
        <span className="eyebrow">GOOD PROBLEMS WELCOME</span>
        <h2>Want to build something useful?</h2>
        <p>I&apos;m always interested in interesting tools, editing workflows, strange software ideas, and problems that sound unnecessarily difficult.</p>
        {hasContact && <div className="contact-actions">
          {siteConfig.email && <a className="button button-primary" href={`mailto:${siteConfig.email}`}><Mail size={16} aria-hidden="true" />Get in touch<ArrowUpRight size={15} aria-hidden="true" /></a>}
          {siteConfig.github && <a className="button button-secondary" href={siteConfig.github} target="_blank" rel="noreferrer"><GitBranch size={17} aria-hidden="true" />View GitHub<ArrowUpRight size={15} aria-hidden="true" /></a>}
          {socialLinks.map((social) => <a className="button button-secondary" key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}
        </div>}
        <span className="contact-footnote"><span className="tiny-orange-dot" />Curiosity has no office hours.</span>
      </div>
    </section>
  );
}
