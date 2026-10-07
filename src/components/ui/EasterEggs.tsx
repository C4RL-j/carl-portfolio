"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, X } from "lucide-react";

const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let consoleMessagePrinted = false;

export function EasterEggs() {
  const [unlocked, setUnlocked] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!consoleMessagePrinted) {
      console.info("Hey, you opened DevTools.\n\nYou'll probably fit in here.\n\n> help is available inside the Lab terminal.");
      consoleMessagePrinted = true;
    }

    let recentKeys: string[] = [];
    function listen(event: KeyboardEvent) {
      const element = event.target;
      if (element instanceof HTMLElement && (element.isContentEditable || element.closest("input, textarea, select"))) {
        recentKeys = [];
        return;
      }
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      recentKeys = [...recentKeys, key].slice(-konami.length);
      if (recentKeys.length !== konami.length || !recentKeys.every((entry, index) => entry === konami[index])) return;
      recentKeys = [];
      setUnlocked(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setUnlocked(false), 5500);
    }
    window.addEventListener("keydown", listen);
    return () => {
      window.removeEventListener("keydown", listen);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!unlocked) return null;

  return (
    <div className="easter-egg-toast" role="status" aria-live="polite">
      <span className="easter-egg-icon"><Code2 size={19} aria-hidden="true" /></span>
      <p className="easter-egg-copy"><strong>Developer mode unlocked.</strong> Nothing changed. You were already in developer mode.</p>
      <button className="easter-egg-close" type="button" aria-label="Dismiss developer mode message" onClick={() => setUnlocked(false)}><X size={16} aria-hidden="true" /></button>
    </div>
  );
}
