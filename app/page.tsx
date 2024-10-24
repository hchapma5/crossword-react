import { Button } from "@/components/ui/button";
import { ArrowRight, PenTool, Search, Zap, LogIn } from "lucide-react";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl">
                  <span className="text-gray-900 dark:text-gray-100">
                    Create Personalized Crosswords on Any Topic, Powered by AI
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-xl text-gray-700 dark:text-gray-300 sm:text-2xl md:text-3xl">
                  Perfect for trivia lovers, puzzle enthusiasts, and everyone
                  else.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-3">
                <Link href="/browse">
                  <Button className="w-full bg-purple-600 py-6 text-lg text-white hover:bg-purple-700">
                    Browse Puzzles
                    <Search className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Play AI-generated puzzles for free!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-white py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<PenTool className="h-12 w-12 text-blue-500" />}
                title="Custom Creation"
                description="Sign up to create puzzles on themes like 'Marvel Movies' or 'World Capitals'."
              />
              <FeatureCard
                icon={<Search className="h-12 w-12 text-purple-500" />}
                title="Diverse Collection"
                description="Browse our extensive library of puzzles on various topics, from pop culture to academic subjects."
              />
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-blue-500" />}
                title="AI-Powered"
                description="Our smart AI ensures each puzzle is unique, challenging, and tailored to your interests."
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Ready to Create Your Own?
                </h2>
                <p className="max-w-[900px] text-xl text-gray-700 dark:text-gray-300 sm:text-2xl">
                  Get started with a free account to create unlimited puzzles
                </p>
              </div>
              <div className="w-full max-w-sm space-y-3">
                <SignUpButton>
                  <Button
                    className="w-full bg-purple-600 py-6 text-lg text-white hover:bg-purple-700"
                    size="lg"
                  >
                    Sign Up
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </SignUpButton>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  No credit card required. Create puzzles after signing up.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 py-12 dark:from-gray-900 dark:to-gray-800">
        <p className="text-center text-base text-gray-500 dark:text-gray-400">
          © 2024 Crossword Puzzle Generator. A hobby project.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-3 rounded-lg bg-gray-50 p-6 shadow-md transition-transform hover:scale-105 dark:bg-gray-900">
      {icon}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}
