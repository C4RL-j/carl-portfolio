export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  github: string;
  socials: SocialLink[];
}

/** Add your public contact details here. Empty values stay hidden on the site. */
export const siteConfig: SiteConfig = {
  name: "Carl",
  title: "Carl — Builder, Editor & Professional Tinkerer",
  description:
    "Personal lab of Carl — lightweight desktop software, experiments, editing workflows, PC tinkering, and tools built to remove everyday friction.",
  url: "",
  email: "ablercarl25@gmail.com",
  github: "https://github.com/C4RL-j",
  socials: [],
};
