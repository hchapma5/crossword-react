import { Input } from "@/components/ui/input";
import { RxMagnifyingGlass } from "react-icons/rx";
import { fetchPuzzleData } from "@/actions/fetchPuzzleData";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-24">
      <h1 className="w-1/2 text-ellipsis break-words text-center text-6xl font-bold">
        Crossword Puzzle{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Generator
        </span>
      </h1>
      <form action={fetchPuzzleData} className="flex w-1/2 flex-col">
        <Input
          id="theme"
          name="theme"
          type="search"
          placeholder="Enter a theme or topic"
          className="relative h-fit w-full rounded-full px-12 py-4 text-lg"
        />
        <RxMagnifyingGlass className="relative bottom-11 left-4 h-6 w-6" />
        <label className="relative bottom-4 right-4 text-right text-sm text-gray-500">
          Powered by AI
        </label>
        <button className="hidden" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
