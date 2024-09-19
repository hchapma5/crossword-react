import Link from "next/link";
import Search from "./ui/search";
import { Grid } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="flex h-14 items-center bg-white px-4 py-8 lg:px-6">
      <Link className="flex items-center justify-center" href="/browse">
        <Grid className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">
          Crossword Puzzle{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Generator
          </span>
        </span>
      </Link>
      <nav className="ml-auto flex items-center justify-between gap-4 sm:gap-6">
        <div className="w-full max-w-xs">
          <Search placeholder="Search for crosswords..." />
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
