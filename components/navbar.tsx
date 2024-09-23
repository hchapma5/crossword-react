import Link from "next/link";
import Search from "./ui/search";
import { Grid } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import CrosswordGeneratorButton from "./crossword-generator-button";
import GradientText from "./gradient-text";

export default function Navbar() {
  return (
    <header className="sticky flex h-14 items-center border-b bg-white px-4 py-8 lg:px-6">
      {/* Title */}
      <Link className="flex w-1/3 items-center justify-start" href="/">
        <Grid className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">
          Crossword Puzzle <GradientText>Generator</GradientText>
        </span>
      </Link>

      {/* Search */}
      <div className="flex w-1/3 items-center justify-center">
        <Search placeholder="Search for crosswords..." />
      </div>

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
      </nav>
    </header>
  );
}
