"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

const responses: Record<string, string> = {
  help: "Available commands:\nhelp      Show this list\nwhoami    Meet the person behind the keyboard\nprojects  See what I am building\nnow       Check the current operating mode\nstack     Open the toolbox\nclear     Clear the terminal",
  whoami: 'Carl\nBuilder.\nEditor.\nPC tinkerer.\nProfessional "what if I made my own version?" person.',
  projects: "LitePlay\nEditFlow\nD2 Controller Center\n+ several experiments that escaped containment.",
  now: "Building lightweight software.\nThinking about seamless sync.\nProbably changing a UI detail nobody else noticed.",
  stack: "Python\nPySide6\nTypeScript\nGit\nPowerShell\nVS Code\nCapCut\nCuriosity",
};

type Entry = { id: number; command: string; output: string };

export function Terminal() {
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const draftRef = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [entries]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = value.trim();
    if (!command) return;
    const normalized = command.toLowerCase();

    setHistory((previous) => [...previous, command].slice(-100));
    setHistoryIndex(null);
    setValue("");
    draftRef.current = "";

    if (normalized === "clear") {
      setEntries([]);
      return;
    }

    setEntries((previous) => [
      ...previous.slice(-49),
      {
        id: nextId.current++,
        command,
        output: responses[normalized] ?? `Command not found: ${command}\nType "help" to see available commands.`,
      },
    ]);
  }

  function navigateHistory(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    if (!history.length) return;

    if (event.key === "ArrowUp") {
      if (historyIndex === null) draftRef.current = value;
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setValue(history[index]);
      return;
    }

    if (historyIndex === null) return;
    if (historyIndex === history.length - 1) {
      setHistoryIndex(null);
      setValue(draftRef.current);
    } else {
      setHistoryIndex(historyIndex + 1);
      setValue(history[historyIndex + 1]);
    }
  }

  return (
    <div
      className="terminal"
      role="region"
      aria-label="Interactive Lab terminal"
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus();
      }}
    >
      <div className="terminal-titlebar">
        <span className="terminal-controls" aria-hidden="true">
          <i className="terminal-control" />
          <i className="terminal-control" />
          <i className="terminal-control" />
        </span>
        <span className="terminal-title"><TerminalIcon size={13} aria-hidden="true" /> carl@lab</span>
        <span className="terminal-local">LOCAL</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        <p className="terminal-welcome">A little window into the workshop.<br />Type <span>help</span> to look around.</p>
        <div className="terminal-history" role="log" aria-live="polite" aria-relevant="additions">
          {entries.map((entry) => (
            <div className="terminal-entry" key={entry.id}>
              <div className="terminal-command"><span className="terminal-prompt" aria-hidden="true">carl@lab ~ $</span> {entry.command}</div>
              <pre className="terminal-output">{entry.output}</pre>
            </div>
          ))}
        </div>
        <form className="terminal-form" onSubmit={submit}>
          <label htmlFor="lab-terminal-input" className="terminal-prompt"><span aria-hidden="true">carl@lab ~ $</span><span className="sr-only">Terminal command</span></label>
          <input
            ref={inputRef}
            id="lab-terminal-input"
            className="terminal-input"
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setHistoryIndex(null);
            }}
            onKeyDown={navigateHistory}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            aria-describedby="terminal-hint"
          />
        </form>
      </div>
      <div className="terminal-hint" id="terminal-hint"><span>↑ ↓ history</span><span>↵ run command</span><span>no cloud required</span></div>
    </div>
  );
}
