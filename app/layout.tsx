import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
