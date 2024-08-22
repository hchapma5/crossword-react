"use server";

import { Button } from "@/components/ui/button";
import { Direction, Position } from "@/types/types";
import { getCrosswordDataById } from "@/db/query";
import Link from "next/link";
import CrosswordGame from "@/components/CrosswordGame";
import CrosswordClues from "@/components/CrosswordClues";
import { is } from "drizzle-orm";

// Global variable to store the completed puzzle data of type { string -> string }
let completedPuzzleData = new Map<string, string>();

interface Params {
  params: {
    id: string;
  };
}

export const isPuzzleComplete = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  for (const [position, answer] of Object.entries(data)) {
    if (position.startsWith("$ACTION")) continue;
    if (completedPuzzleData.get(position) !== answer) {
      console.log(position, "is incorrect");
      return console.log("no win!");
    }
  }
  return console.log("you won!");
};

export default async function CrosswordPage({ params }: Params) {
  const [theme, puzzleData] = await getCrosswordDataById(params.id);

  // Set global puzzleData for use in isPuzzleComplete (server action)

  let puzzleMap = new Map<
    string,
    { direction: Direction; id: number; firstLetter: boolean }
  >();

  puzzleData.result.forEach((word) => {
    if (word.orientation === "none") return;

    word.answer.split("").forEach((_, i) => {
      const position =
        word.orientation === "across"
          ? `${word.starty},${word.startx + i}`
          : `${word.starty + i},${word.startx}`;

      const direction = puzzleMap.get(position)
        ? "intersection"
        : word.orientation;

      const isFirstLetter = puzzleMap.get(position)?.firstLetter || i === 0;

      puzzleMap.set(position, {
        direction: direction,
        id: word.position,
        firstLetter: isFirstLetter,
      });

      completedPuzzleData.set(position, word.answer[i]);
    });
  });

  console.log(puzzleMap);
  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="mb-4 text-2xl font-semibold">{theme as string}</h1>
        <CrosswordGame
          cols={puzzleData.cols}
          rows={puzzleData.rows}
          map={puzzleMap}
        />
      </div>
      {/* <CrosswordClues clues={clues} /> */}
      {/* <Button>
        <Link href="/">Get a new puzzle</Link>
      </Button> */}
    </div>
  );
}
