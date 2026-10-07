"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";

const links = [
  { id: "projects", label: "Projects" },
  { id: "lab", label: "Lab" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      const next = links
        .filter((link) => visible.has(link.id))
        .sort((a, b) => Math.abs(document.getElementById(a.id)?.getBoundingClientRect().top ?? Infinity) - Math.abs(document.getElementById(b.id)?.getBoundingClientRect().top ?? Infinity))[0];
      setActive(next?.id ?? "");
    }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });

    for (const link of links) {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    }
    function closeOnOutsideClick(event: MouseEvent) {
      if (event.target instanceof Element && !event.target.closest(".site-header")) setMenuOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("click", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a href="#top" className="nav-brand" aria-label="Carl, back to top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">C/</span>
          <span className="brand-text">CARL</span>
        </a>
        <span className="nav-status"><span className="status-dot" aria-hidden="true" />Building something</span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.id} className={`nav-link${active === link.id ? " is-active" : ""}`} href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined}>{link.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button type="button" className="command-trigger" aria-label="Open command palette, Control or Command K" onClick={() => { setMenuOpen(false); window.dispatchEvent(new Event("carl:open-palette")); }}>
            <Command size={13} aria-hidden="true" /><kbd>Ctrl K</kbd>
          </button>
          <a href="#lab" className="nav-cta" onClick={() => setMenuOpen(false)}>Explore the Lab<ArrowUpRight size={14} aria-hidden="true" /></a>
          <button id="mobile-menu-toggle" type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => setMenuOpen((previous) => !previous)}>
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="Mobile navigation" hidden={!menuOpen}>
        {links.map((link) => <a key={link.id} href={`#${link.id}`} className={`mobile-nav-link${active === link.id ? " is-active" : ""}`} aria-current={active === link.id ? "location" : undefined} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
        <a href="#lab" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Explore the Lab<ArrowUpRight size={14} aria-hidden="true" /></a>
      </nav>
    </header>
  );
}
