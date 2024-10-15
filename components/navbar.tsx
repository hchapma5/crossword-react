"use client";

import Link from "next/link";
import Search from "./ui/search";
import { Grid } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import CrosswordGeneratorButton from "./crossword-generator-button";
import GradientText from "./gradient-text";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  return (
    <header className="sticky flex h-14 items-center justify-between border-b px-4 py-8 lg:px-6">
      {/* Title */}
      <Link className="flex w-1/3 items-center justify-start" href="/">
        <Grid className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">
          Crossword Puzzle <GradientText>Generator</GradientText>
        </span>
      </Link>

      {/* Search */}
      {path === "/browse" && (
        <div className="flex w-1/3 items-center justify-center">
          <Search placeholder="Search for crosswords..." />
        </div>
      )}

      {/* Actions */}
      <nav className="flex w-1/3 items-center justify-end space-x-4 font-semibold">
        <CrosswordGeneratorButton>
          <GradientText>Generate</GradientText>
        </CrosswordGeneratorButton>
        <Link className="underline-offset-4 hover:underline" href="/browse">
          Browse
        </Link>
        <Link className="underline-offset-4 hover:underline" href="/">
          About
        </Link>
        <SignedOut>
          <SignInButton>
            <div className="w-fit cursor-pointer underline-offset-4 hover:underline">
              Sign In
            </div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ThemeToggle />
      </nav>
    </header>
  );
}
