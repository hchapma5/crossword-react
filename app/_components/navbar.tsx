"use client";

import Link from "next/link";
import { Grid, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "../../components/theme-toggle";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = () => (
    <>
      <Link
        className="underline-offset-4 hover:underline"
        href="/browse"
        onClick={() => setIsOpen(false)}
      >
        Browse
      </Link>
      <Link
        className="underline-offset-4 hover:underline"
        href="/"
        onClick={() => setIsOpen(false)}
      >
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
    </>
  );

  return (
    <header className="sticky flex items-center justify-between border-b px-4 py-4 lg:px-6">
      {/* Title */}
      <Link className="flex items-center" href="/">
        <Grid className="h-6 w-6" />
        <span className="text-md ml-2 font-bold sm:text-xl lg:text-2xl 2xl:text-3xl">
          Crossword Puzzle <span className="gradient-text">Generator</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center justify-end space-x-4 font-semibold md:flex">
        <NavItems />
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col space-y-4 pt-4">
            <NavItems />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
