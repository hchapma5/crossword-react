import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Crossword AI App",
    default: "Crossword AI App",
  },
  description: "Personalised crossword puzzles using GenAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#fffcfc]">
          {children}
        </main>
      </body>
    </html>
  );
}
