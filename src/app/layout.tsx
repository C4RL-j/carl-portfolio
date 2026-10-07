import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";
import { siteConfig } from "@/config/site";

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const metadataOrigin = siteConfig.url || (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: "Carl.OS",
  metadataBase: new URL(metadataOrigin),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Carl / Personal workshop",
    title: "Carl — Builder, Editor & Professional Tinkerer",
    description: "Small tools. Useful experiments. An unreasonable number of tiny revisions. Welcome to Carl's personal workshop.",
    ...(siteConfig.url ? { url: siteConfig.url } : {}),
  },
  twitter: { card: "summary_large_image", title: "Carl — Builder, Editor & Professional Tinkerer", description: "Small tools. Useful experiments. Welcome to Carl's personal workshop." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#090d14", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
