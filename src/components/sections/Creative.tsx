import { Clapperboard, FolderOpen, Scissors, Volume2 } from "lucide-react";

const creativeTools = [
  {
    name: "Short-form Editing",
    description: "Fast-paced social and UGC editing with emphasis on clear pacing and readable visuals.",
    icon: Scissors,
  },
  {
    name: "Workflow",
    description: "Asset organization, captions, revisions, exports, and repeatable production systems.",
    icon: FolderOpen,
  },
  {
    name: "Tools",
    description: "Primarily CapCut and custom workflow utilities.",
    icon: Clapperboard,
  },
];

export function Creative() {
  return (
    <section id="creative" className="section creative-section">
      <div className="section-heading">
        <span className="eyebrow">03 / CREATIVE</span>
        <h2>Code isn&apos;t the only timeline I stare at.</h2>
        <p>
          I also work with short-form video. Editing taught me a lot of the same
          lessons as software: organization matters, tiny details matter, and
          repetitive work eventually begs to be automated.
        </p>
      </div>

      <div className="creative-layout">
        <div className="creative-cards">
          {creativeTools.map(({ name, description, icon: Icon }) => (
            <article className="creative-card" key={name}>
              <span className="creative-icon"><Icon size={20} strokeWidth={1.6} aria-hidden="true" /></span>
              <div><h3>{name}</h3><p>{description}</p></div>
            </article>
          ))}
        </div>

        <div className="timeline-panel" role="img" aria-label="An illustrative video editing timeline with video, caption, and audio tracks.">
          <div className="timeline-topbar" aria-hidden="true">
            <span><span className="tiny-orange-dot" /> A LITTLE LESS FRICTION.mov</span>
            <span>00:00:18:24</span>
          </div>
          <div className="timeline-viewer" aria-hidden="true">
            <span className="viewer-corner corner-tl" />
            <span className="viewer-corner corner-tr" />
            <span className="viewer-corner corner-bl" />
            <span className="viewer-corner corner-br" />
            <div className="viewer-frame">
              <span className="viewer-frame-label">LESS NOISE.</span>
              <strong>Better stories.</strong>
              <span className="viewer-frame-caption">one tiny cut at a time</span>
            </div>
            <span className="viewer-ratio">9:16</span>
          </div>
          <div className="timeline-workspace" aria-hidden="true">
            <div className="timeline-ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span><span>00:20</span></div>
            <div className="timeline-track"><span className="track-label">V1</span><div className="track-clips"><span className="video-clip clip-one">Intro</span><span className="video-clip clip-two">The useful bit</span><span className="video-clip clip-three">Outro</span></div></div>
            <div className="timeline-track"><span className="track-label">T1</span><div className="track-clips"><span className="caption-clip">A good story</span><span className="caption-clip">gets to the point.</span></div></div>
            <div className="timeline-track"><span className="track-label"><Volume2 size={12} /></span><div className="audio-clip">{Array.from({ length: 48 }, (_, i) => <span key={i} className={`wave-bar wave-${i % 8}`} />)}</div></div>
            <div className="timeline-playhead"><span /></div>
          </div>
          <div className="timeline-footer" aria-hidden="true"><span>EVERY FRAME HAS A JOB.</span><span>Preview / 01</span></div>
        </div>
      </div>
    </section>
  );
}
