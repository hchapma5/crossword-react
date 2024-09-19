import Link from "next/link";
import Search from "./ui/search";
import { Grid } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="sticky flex h-14 items-center justify-between border-b bg-white px-4 py-8 lg:px-6">
      {/* Title */}
      <Link className="flex items-center" href="/">
        <Grid className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">
          Crossword Puzzle{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Generator
          </span>
        </span>
      </Link>

      {/* Search */}
      <div className="w-fit justify-self-center">
        <Search placeholder="Search for crosswords..." />
      </div>

      {/* Actions */}
      <nav className="flex items-center justify-end space-x-4">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Generate {/* TODO: Open modal for generating crosswords */}
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/browse"
        >
          Browse
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/"
        >
          About
        </Link>
        <SignedOut>
          <SignInButton>
            <div className="w-fit cursor-pointer text-sm font-medium underline-offset-4 hover:underline">
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
