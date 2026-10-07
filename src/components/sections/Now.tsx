import { ArrowUpRight, Cpu, FlaskConical, Hammer, Layers3 } from "lucide-react";

const statuses = [
  { label:"BUILDING", name:"LitePlay", description:"Lightweight game management, tracking, analytics, and portable game-progress workflows.", icon:Hammer, color:"blue", href:"#projects" },
  { label:"IMPROVING", name:"EditFlow", description:"Making video-editing workflow management faster and less annoying.", icon:Layers3, color:"green", href:"#projects" },
  { label:"EXPLORING", name:"Seamless cloud sync", description:"Moving application data and save files between machines without duplicated progress.", icon:FlaskConical, color:"orange", href:"#exploring" },
  { label:"PROBABLY TINKERING WITH", name:"Windows or old PC hardware", description:"Because apparently leaving working computers alone is difficult.", icon:Cpu, color:"purple", href:"#about" },
];

export function Now() {
  return <section className="now-section" id="now" aria-labelledby="now-title"><div className="now-heading"><div><h2 id="now-title">Carl <span>/ now</span></h2><p>What my brain is currently occupied with.</p></div><span className="system-online"><i/> SYSTEM ONLINE</span></div><div className="now-grid">{statuses.map(item=><a className={`now-item now-${item.color}`} key={item.label} href={item.href}><span className="now-label"><i/>{item.label}</span><span className="now-item-name">{item.name}<ArrowUpRight size={14}/></span><p>{item.description}</p><item.icon className="now-icon" size={18}/></a>)}</div></section>;
}
