import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "AIToolsWeekly — Every AI Tool Reviewed",
  description: "In-depth reviews and comparisons of every major AI tool. Save hours. Pick the right stack for your workflow.",
  keywords: "best AI writing tool, AI code assistant, AI tools comparison, ChatGPT alternatives, Cursor vs Copilot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased overflow-x-hidden w-full max-w-full">{children}</body>
    </html>
  );
}
