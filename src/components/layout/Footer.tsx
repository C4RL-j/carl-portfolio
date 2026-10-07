"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";

const systemInfo = [
  ["Mode", "Building"],
  ["Environment", "Windows"],
  ["Primary process", "curiosity.exe"],
  ["Background tasks", "too many"],
  ["Last stable release", "unknown"],
];

export function Footer() {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <footer className="site-footer">
        <div className="footer-main">
          <a href="#top" className="footer-name">Carl<span aria-hidden="true">.</span></a>
          <p className="footer-caption">Built with curiosity and an unreasonable number of tiny revisions.</p>
          <div className="footer-meta"><span>© {new Date().getFullYear()} Carl</span><button className="system-info-button" type="button" onClick={() => setInfoOpen(true)}><Terminal size={11} aria-hidden="true" />system info</button></div>
        </div>
      </footer>
      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} title="CARL.OS" kicker="SYSTEM INFORMATION" className="system-info" titleIcon={<Terminal size={21} aria-hidden="true" />}>
        <p className="system-info-status"><span className="status-dot" aria-hidden="true" />All systems curious.</p>
        <dl className="system-info-grid">
          {systemInfo.map(([key, value]) => <div key={key}><dt>{key}:</dt><dd>{value}</dd></div>)}
        </dl>
      </Dialog>
    </>
  );
}
