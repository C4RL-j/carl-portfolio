export type ExperimentStatus = "Prototype" | "Experiment" | "Research" | "Someday™";

export interface Experiment {
  id: string;
  name: string;
  description: string;
  status: ExperimentStatus;
}

export const experiments: Experiment[] = [
  {
    id: "manga-reader",
    name: "Manga Reader",
    description:
      "A desktop reading experiment focused on a clean, distraction-free manga experience.",
    status: "Prototype",
  },
  {
    id: "brightness-utility",
    name: "Brightness Utility",
    description:
      "A tiny Windows monitor brightness controller designed around being lightweight, simple, and keyboard-friendly.",
    status: "Experiment",
  },
  {
    id: "windows-utilities",
    name: "Windows Utilities",
    description: "Small experiments for simplifying everyday Windows tasks.",
    status: "Experiment",
  },
  {
    id: "network-experiments",
    name: "Network Experiments",
    description:
      "Tools and scripts created while learning how routers, LTE modems, VPNs, IPv6, and local networking behave.",
    status: "Research",
  },
  {
    id: "ui-experiments",
    name: "UI Experiments",
    description:
      "Trying interface ideas before deciding whether they deserve a full application.",
    status: "Someday™",
  },
];
