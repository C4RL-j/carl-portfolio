"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Box, CornerDownLeft, FlaskConical, Layers3, Search, Terminal, UserRound } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";

const actions = [
  { id: "projects", label: "Go to Projects", hint: "The things I build", icon: Box, keywords: "builds software liteplay editflow" },
  { id: "lab", label: "Go to Lab", hint: "Experiments in progress", icon: FlaskConical, keywords: "experiments research" },
  { id: "about", label: "Go to About", hint: "The person at the keyboard", icon: UserRound, keywords: "carl story learn" },
  { id: "stack", label: "Go to Stack", hint: "Open the toolbox", icon: Layers3, keywords: "tools python typescript" },
  { id: "terminal", label: "Open Terminal", hint: "A few local commands", icon: Terminal, keywords: "shell help whoami" },
  { id: "top", label: "Back to Top", hint: "Back where we started", icon: ArrowUp, keywords: "home start" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = actions.filter((action) => `${action.label} ${action.hint} ${action.keywords}`.toLowerCase().includes(query.trim().toLowerCase()));
  const activeIndex = Math.min(selected, Math.max(0, filtered.length - 1));

  useEffect(() => {
    function shortcut(event: globalThis.KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (document.querySelector("dialog[open]:not(.command-palette)")) return;
        setQuery("");
        setSelected(0);
        setOpen((previous) => !previous);
      }
    }
    function openPalette() {
      if (document.querySelector("dialog[open]:not(.command-palette)")) return;
      setQuery("");
      setSelected(0);
      setOpen(true);
    }
    window.addEventListener("keydown", shortcut);
    window.addEventListener("carl:open-palette", openPalette);
    return () => {
      window.removeEventListener("keydown", shortcut);
      window.removeEventListener("carl:open-palette", openPalette);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listId, open]);

  function run(id: string) {
    setOpen(false);
    // Let the native dialog return focus before moving it to the chosen destination.
    window.setTimeout(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      if (id === "top") {
        const heading = document.querySelector("h1");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior });
        return;
      }
      const target = document.getElementById(id === "terminal" ? "lab" : id);
      target?.scrollIntoView({ behavior, block: "start" });
      if (id === "terminal") {
        document.getElementById("lab-terminal-input")?.focus({ preventScroll: true });
      } else if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }, 0);
  }

  function handleKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!filtered.length) return;
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setSelected((activeIndex + direction + filtered.length) % filtered.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (filtered[activeIndex]) run(filtered[activeIndex].id);
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title="Jump somewhere" kicker="CARL.OS / COMMAND PALETTE" className="command-palette">
      <div className="palette-search">
        <Search size={18} aria-hidden="true" />
        <input
          ref={inputRef}
          className="palette-input"
          type="search"
          placeholder="Where are we going?"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setSelected(0); }}
          onKeyDown={handleKey}
          role="combobox"
          aria-label="Search site commands"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-activedescendant={filtered.length ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
          spellCheck={false}
        />
        <kbd className="palette-shortcut">esc</kbd>
      </div>
      <div id={listId} className="palette-list" role="listbox" aria-label="Site commands">
        {filtered.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              id={`${listId}-${index}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              tabIndex={-1}
              className={`palette-action${index === activeIndex ? " is-selected" : ""}`}
              onMouseMove={() => setSelected(index)}
              onClick={() => run(action.id)}
            >
              <span className="palette-action-icon"><Icon size={17} aria-hidden="true" /></span>
              <span className="palette-action-label">{action.label}<span className="palette-action-hint">{action.hint}</span></span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          );
        })}
        {!filtered.length ? <p className="palette-empty" role="status">No commands found. Try “lab” or “projects”.</p> : null}
      </div>
      <div className="palette-footer"><span><ArrowUp size={12} aria-hidden="true" /><ArrowDown size={12} aria-hidden="true" /> navigate</span><span><CornerDownLeft size={13} aria-hidden="true" /> select</span><span>esc to close</span></div>
    </Dialog>
  );
}
