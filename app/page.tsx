import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { auth, currentUser, User } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface SearchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: SearchParams) {
  const { userId } = auth();

  if (!userId) return <RedirectToSignIn />;

  const user = await currentUser();

  // Extract the theme from query parameters
  const theme = searchParams?.theme;
  if (theme) {
    // Redirect to the crossword page with the theme
    redirect(`/browse/?query=${theme}`);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-24">
      <h1 className="w-1/2 text-ellipsis break-words text-center text-6xl font-bold">
        Crossword Puzzle{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Generator
        </span>
      </h1>
      <form className="flex w-1/2 flex-col" method="GET">
        <Input
          id="theme"
          name="theme"
          type="search"
          placeholder="Enter a theme or topic"
          className="relative h-fit w-full rounded-full px-12 py-4 text-lg"
        />
        <MagnifyingGlassIcon className="relative bottom-11 left-4 h-6 w-6" />
        <Label className="relative bottom-4 right-4 text-right">
          Powered by AI
        </Label>
      </form>
    </div>
  );
}
