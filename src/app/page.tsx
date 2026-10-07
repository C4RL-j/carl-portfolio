import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Now } from "@/components/sections/Now";
import { Projects } from "@/components/sections/Projects";
import { Lab } from "@/components/sections/Lab";
import { Creative } from "@/components/sections/Creative";
import { Process } from "@/components/sections/Process";
import { Toolbox } from "@/components/sections/Toolbox";
import { Exploring } from "@/components/sections/Exploring";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { EasterEggs } from "@/components/ui/EasterEggs";

export default function Home() {
  return <><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main" className="site-main"><Hero/><Now/><Projects/><Lab/><Creative/><Process/><Toolbox/><Exploring/><About/><Contact/></main><Footer/><CommandPalette/><EasterEggs/></>;
}
