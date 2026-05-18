import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TalentStage — Where Talent Gets Its Stage",
  description:
    "A verified, privacy-first platform where students and educators can showcase talent safely. No toxic DMs. AI moderated. Performance stages for every creator.",
  keywords: [
    "talent",
    "creators",
    "students",
    "safe social media",
    "performance",
    "education",
    "community",
  ],
  authors: [{ name: "TalentStage" }],
  openGraph: {
    title: "TalentStage — Where Talent Gets Its Stage",
    description:
      "A verified, privacy-first platform for safe talent discovery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-[family-name:var(--font-body)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
