import { Button } from "@/components/ui/button";
import { ArrowRight, PenTool, User, Search } from "lucide-react";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";

export default async function HomePage() {
  return (
    <>
      <div className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Custom Crossword Puzzles with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Generate unique crosswords instantly or solve AI-created
                  puzzles. Perfect for educators, puzzle enthusiasts, and word
                  lovers.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href={"/browse"}>
                  <Button className="w-full" size="lg">
                    Browse Our Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {`Discover puzzles on various themes like "World Capitals" or
                  "Science Fiction"`}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <PenTool className="mb-2 h-10 w-10" />
                <h2 className="text-xl font-bold">AI-Powered Generation</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Create custom crosswords instantly by entering your desired
                  theme or topic.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <Search className="mb-2 h-10 w-10" />
                <h2 className="text-xl font-bold">Browse Puzzles</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Explore our collection of AI-generated crossword puzzles on
                  various themes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <User className="mb-2 h-10 w-10" />
                <h2 className="text-xl font-bold">User Accounts</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Create an account to save your puzzles and track your solving
                  progress.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Creating Today
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Generate your own custom crosswords and challenge yourself
                  with AI-created puzzles.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <SignUpButton>
                  <Button className="w-full" size="lg">
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignUpButton>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No credit card required. Free account for solving puzzles.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Crossword Puzzle Generator. A hobby project.
        </p>
      </footer>
    </>
  );
}
