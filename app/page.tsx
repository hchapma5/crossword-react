import { Input } from "@/components/ui/input";
import { fetchPuzzleData } from "@/actions/fetchPuzzleData";

export default function HomePage() {
  return (
    <div className="flex w-2/3 flex-col items-center justify-center gap-y-32">
      <div>
        <h1 className="text-ellipsis break-words text-center text-6xl font-bold">
          Generate Your Own Personalized Crossword Puzzle
        </h1>
        <h2 className="self-start text-2xl">Powered by AI</h2>
      </div>
      <form action={fetchPuzzleData}>
        <Input id="theme" name="theme" placeholder="Search for a theme" />
        <button className="hidden" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
