import { Activity, BarChart3, Check, ChevronDown, ChevronRight, CirclePlay, Ellipsis, Folder, Gamepad2, LayoutGrid, List, Maximize2, Minus, Music2, Plus, Radio, Search, Settings2, Signal, SlidersHorizontal, Wifi, X } from "lucide-react";

const games = [
  { title: "Orbitfall", genre: "Exploration · Adventure", time: "24.6 hrs", className: "game-orbit", symbol: "◈" },
  { title: "Neon Drift", genre: "Arcade · Racing", time: "18.2 hrs", className: "game-neon", symbol: "╱╱" },
  { title: "Wildwood", genre: "Cozy · Survival", time: "12.4 hrs", className: "game-wood", symbol: "⌁" },
];

export function WindowControls() {
  return <span className="window-controls" aria-hidden="true"><Minus size={10} /><Maximize2 size={9} /><X size={11} /></span>;
}

export function GenericPreview({ name, status }: { name: string; status: string }) {
  return <div className="app-window" aria-hidden="true"><div className="app-titlebar"><span className="app-brand"><span className="app-icon"><LayoutGrid size={12}/></span>{name}</span><WindowControls/></div><div className="generic-preview"><LayoutGrid size={29} strokeWidth={1.3}/><strong>{name}</strong><span>{status}</span><div className="generic-preview-grid"><i/><i/><i/></div><small>A small window into the next useful idea.</small></div></div>;
}

export function LitePlayPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`app-window liteplay-window ${compact ? "is-compact" : ""}`} aria-hidden="true">
      <div className="app-titlebar"><span className="app-brand"><span className="app-icon"><Gamepad2 size={13} /></span>LitePlay <span className="app-version">DEV</span></span><WindowControls /></div>
      <div className="liteplay-layout">
        <aside className="app-sidebar"><span className="sidebar-label">WORKSPACE</span><span className="sidebar-item"><LayoutGrid size={12} /> Library <span>12</span></span><span className="sidebar-item selected"><BarChart3 size={12} /> Analytics</span><span className="sidebar-item"><Activity size={12} /> Sessions</span><div className="sidebar-bottom"><Settings2 size={12} /> Settings</div><span className="local-indicator"><i /> All data stored locally</span></aside>
        <div className="app-main">
          <div className="app-page-heading"><div><span className="app-overline">YOUR TIME, AT A GLANCE</span><strong>Playtime overview</strong></div><span className="mock-period">Last 7 days <ChevronDown size={10} /></span></div>
          <div className="stat-grid"><div><span>Total playtime</span><strong>24<span>h</span> 38<span>m</span></strong><small>↗ 12.8% this week</small></div><div><span>Sessions</span><strong>18</strong><small>Across 4 games</small></div><div><span>Daily average</span><strong>3<span>h</span> 31<span>m</span></strong><small>A little time well spent</small></div></div>
          <div className="chart-panel"><div className="chart-header"><span>Activity</span><span className="chart-tabs"><b>7D</b><span>30D</span><span>12M</span></span></div><div className="chart-plot"><div className="chart-gridlines"><span>6h</span><span>4h</span><span>2h</span></div><svg className="activity-chart" viewBox="0 0 480 105" preserveAspectRatio="none"><defs><linearGradient id={compact ? "heroChartFill" : "projectChartFill"} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5387ff" stopOpacity=".28"/><stop offset="100%" stopColor="#5387ff" stopOpacity="0"/></linearGradient></defs><path d="M0 85C27 85 38 45 72 58S122 91 150 66S191 27 220 39S265 74 294 42S340 62 368 25S426 42 451 11L480 21V105H0Z" fill={`url(#${compact ? "heroChartFill" : "projectChartFill"})`}/><path className="chart-line" d="M0 85C27 85 38 45 72 58S122 91 150 66S191 27 220 39S265 74 294 42S340 62 368 25S426 42 451 11L480 21" fill="none" stroke="#6796ff" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/><circle cx="368" cy="25" r="4" fill="#a3bdff" stroke="#3e6ccd" strokeWidth="4"/></svg></div><div className="chart-days"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div>
          <div className="dashboard-bottom"><div className="recent-games"><div className="mock-block-title">Recently played <ChevronRight size={12} /></div>{games.slice(0, compact ? 2 : 3).map(game => <div className="game-row" key={game.title}><span className={`game-cover ${game.className}`}>{game.symbol}</span><span className="game-info"><b>{game.title}</b><small>{game.genre}</small></span><span className="game-time">{game.time}</span></div>)}</div><div className="distribution"><div className="mock-block-title">By game</div><div className="donut-chart"><span>4<small>games</small></span></div><span className="donut-legend"><i /> Orbitfall <b>42%</b></span><span className="donut-legend second"><i /> Neon Drift <b>31%</b></span></div></div>
          {!compact && <div className="session-strip"><span><i /> Last session · Orbitfall</span><span>1h 24m <Check size={10} /></span></div>}
        </div>
      </div>
      <div className="app-statusbar"><span><span className="tiny-dot" /> Tracking saved locally. Everything on your machine.</span><span>LIGHT ON PURPOSE</span></div>
    </div>
  );
}

export function EditFlowPreview() {
  const columns = [{name:"Need edit", count:2, tasks:["The morning routine", "A little product story"],color:""},{name:"Editing",count:1,tasks:["Make every second count"],color:"blue"},{name:"Need upload",count:1,tasks:["Something worth sharing"],color:"orange"},{name:"Done",count:3,tasks:["Good things, small format"],color:"green"}];
  return <div className="app-window editflow-window" aria-hidden="true"><div className="app-titlebar"><span className="app-brand"><span className="app-icon edit-icon"><SlidersHorizontal size={12}/></span>EditFlow<span className="app-version">workspace</span></span><WindowControls /></div><div className="editflow-main"><div className="editflow-toolbar"><strong>Editing pipeline <span>7 tasks</span></strong><span><Search size={12}/><List size={12}/><Plus size={13}/></span></div><div className="kanban-board">{columns.map((column,i)=><div className="kanban-column" key={column.name}><div className="kanban-heading"><i className={column.color}/>{column.name}<span>{column.count}</span></div>{column.tasks.map((task,j)=><div className="kanban-task" key={task}><div className={`video-art video-art-${(i+j)%4}`}><CirclePlay size={21}/><span>00:{(i+1)*12}</span></div><b>{task}</b><span className="task-caption">Short-form · 9:16</span><div className="task-meta"><span>{i===3?<Check size={10}/>:<Folder size={10}/>} {i===3?"Exported":"3 assets"}</span><Ellipsis size={13}/></div></div>)}</div>)}</div><div className="editflow-footer"><span><Check size={10}/> All changes saved</span><span>One workspace. Less chaos.</span></div></div></div>;
}

export function RouterPreview() {
  return <div className="app-window router-window" aria-hidden="true"><div className="app-titlebar"><span className="app-brand"><span className="app-icon router-icon"><Radio size={12}/></span>D2 Controller Center</span><WindowControls/></div><div className="router-main"><div className="router-heading"><span className="router-wifi"><Wifi size={26}/></span><div><strong>You&apos;re connected.</strong><span><i className="tiny-dot"/> LTE connection is looking good</span></div><span className="router-live">LIVE</span></div><div className="router-stats"><div><Signal size={14}/><span>Signal strength</span><strong>−78 <small>dBm</small></strong><span className="signal-quality">Good signal</span></div><div><Radio size={14}/><span>LTE band</span><strong>Band 3</strong><span>1800 MHz</span></div><div><Activity size={14}/><span>Network mode</span><strong>4G LTE</strong><span>FDD · Connected</span></div></div><div className="router-details"><span>APN <b>internet</b></span><span>IPv4 <b><i/>Connected</b></span><span>IPv6 <b><i/>Available</b></span><span>Modem <b>LTE / USB</b></span></div><div className="diagnostic-button"><Activity size={12}/> Run diagnostics <ChevronRight size={11}/></div></div></div>;
}

export function FloatingEditFlow() {
  return <div className="floating-editflow app-window" aria-hidden="true"><div className="app-titlebar"><span className="app-brand"><SlidersHorizontal size={11}/> EditFlow</span><span className="tiny-orange-dot"/></div><div className="floating-edit-body"><div className="floating-edit-header"><span>From idea to upload.</span><Check size={12}/></div><div className="mini-pipeline"><span><i/>Need edit</span><ChevronRight size={10}/><span className="editing"><i/>Editing</span><ChevronRight size={10}/><span><i/>Done</span></div><div className="mini-timeline"><span/><span/><span/><i/></div><div className="mini-audio"><Music2 size={10}/><svg viewBox="0 0 180 14"><path d="M0 7h6l2-4 2 8 3-10 2 12 2-6h10l2-3 2 7 2-10 2 11 2-5h9l2-5 2 9 2-13 2 14 2-6h12l2-3 2 8 2-11 2 12 2-6h9l2-4 2 8 2-10 2 11 2-5h12l2-5 2 9 2-12 2 13 2-6h10l2-3 2 7 2-10 2 11 2-5h8l2-3 2 7 2-9 2 10 2-5h20" fill="none" stroke="currentColor" strokeWidth="1"/></svg></div></div></div>;
}

export function FloatingTerminal() {
  return <div className="floating-terminal app-window" aria-hidden="true"><div className="app-titlebar"><span className="app-brand"><span className="terminal-symbol">›_</span>carl@lab</span><span className="local-pill">LOCAL</span></div><div className="floating-terminal-body"><span><b>~</b> $ ./build-something-useful</span><span className="terminal-success">✓ curiosity initialized</span><span className="terminal-muted">↳ removing unnecessary friction…</span><span><b>~</b> $ <i className="mock-cursor"/></span></div></div>;
}
