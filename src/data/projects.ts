export type ProjectStatus = "Active Development" | "Active Project" | "Experiment";

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  status: ProjectStatus;
  technology: string[];
  designGoals: string[];
  inspiration: string;
  futureDirection: string[];
  footer: string;
}

/** Project facts and ambitions live here; empty technology lists are intentional. */
export const projects: Project[] = [
  {
    id: "liteplay",
    name: "LitePlay",
    category: "Desktop Software · Game Management",
    description:
      "A lightweight Windows game library built around tracking, analytics, and eventually making game progress portable.",
    longDescription:
      "LitePlay started as a simple game manager and kept growing. It tracks sessions and playtime, turns activity into useful analytics, and is evolving toward a system where a game's tracking data and save progress can be exported, synced, and restored without creating duplicate copies everywhere.",
    features: [
      "Game Library",
      "Session Tracking",
      "7D / 30D / 12M Analytics",
      "Playtime Charts",
      "Session History",
      "Crash-Safe Tracking",
      "Favorites",
      "Save Export Vision",
      "Cloud Sync Research",
    ],
    status: "Active Development",
    technology: ["Windows desktop"],
    designGoals: [
      "Keep the library fast, focused, and comfortable on modest hardware.",
      "Make playtime and session history useful at a glance.",
      "Treat tracking reliability as a core part of the experience.",
    ],
    inspiration:
      "Game launchers keep getting heavier, while the things I actually want are a tidy library, dependable tracking, and a clear view of what I've been playing.",
    futureDirection: [
      "Explore exporting and restoring a game's save files alongside its tracking data.",
      "Research seamless cloud sync that preserves one evolving game state instead of multiplying backups.",
      "Make moving progress between machines feel straightforward.",
    ],
    footer: "Built because launchers somehow keep getting heavier.",
  },
  {
    id: "editflow",
    name: "EditFlow",
    category: "Desktop Software · Workflow",
    description:
      "A desktop workspace for managing short-form video editing from raw task to final upload.",
    longDescription:
      "Instead of juggling folders, notes, revision messages, files, and payment tracking separately, EditFlow brings the editing workflow into one focused desktop interface. The pipeline stays simple: Need Edit → Editing → Need Upload → Done.",
    features: [
      "Editing Pipeline",
      "Asset Manager",
      "Image / Video / Audio Previews",
      "Notes",
      "Revision Checklists",
      "Earnings Tracking",
      "Publish & Restore Workflow",
      "Folder Organization",
    ],
    status: "Active Project",
    technology: ["Python", "PySide6"],
    designGoals: [
      "Keep tasks, assets, notes, and revisions in one focused workspace.",
      "Make the next step visible without another spreadsheet or window.",
      "Reduce the repetitive administration around an editing session.",
    ],
    inspiration:
      "Finishing a short video should not require remembering which folder, note, revision message, and payment record belong together.",
    futureDirection: [
      "Keep refining the pipeline through real editing work.",
      "Make publish and restore workflows easier to follow.",
      "Remove small, repeated steps from asset organization and revision handling.",
    ],
    footer: "Because the editor shouldn't need five windows open to finish one video.",
  },
  {
    id: "d2-controller-center",
    name: "D2 Controller Center",
    category: "Networking · Utility",
    description:
      "An experimental control and diagnostics interface for LTE router management.",
    longDescription:
      "D2 Controller Center grew out of repeatedly working with APN configurations, LTE signal information, IPv4 / IPv6 behavior, modem diagnostics, and connection troubleshooting. The experiment brings the useful information into one readable control surface.",
    features: [
      "Connection Status",
      "LTE Band",
      "Signal Strength",
      "APN Configuration",
      "Modem Information",
      "IPv4 / IPv6 State",
      "Diagnostic Actions",
    ],
    status: "Experiment",
    technology: ["LTE router diagnostics", "IPv4 / IPv6"],
    designGoals: [
      "Show the connection information that helps explain what is happening.",
      "Keep signal, modem, and network states readable in one place.",
      "Make common troubleshooting steps easier to repeat.",
    ],
    inspiration:
      "Spending far too much time staring at router status pages makes a single, clearer diagnostics interface start to sound like a reasonable weekend project.",
    futureDirection: [
      "Explore a focused dashboard for connection state, LTE bands, signal quality, and APN settings.",
      "Investigate useful diagnostic actions as router and modem behavior becomes clearer.",
    ],
    footer: "Created after spending far too much time staring at router status pages.",
  },
];
