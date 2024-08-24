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

//TODO: Finish implementation of isPuzzleComplete function
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

  console.log(puzzleData.result);

  let positionMap = new Map<string, number | null>();
  let wordArray: Array<{ direction: Direction; startingPosition: Position }> =
    Array(
      puzzleData.result.filter((word) => word.orientation !== "none").length,
    );

  puzzleData.result
    .filter((word) => word.orientation !== "none")
    .forEach((word, i) => {
      word.answer.split("").forEach((_, i) => {
        const position =
          word.orientation === "across"
            ? `${word.starty},${word.startx + i}`
            : `${word.starty + i},${word.startx}`;

        const isFirstLetter = i === 0;

        if (!positionMap.has(position) || isFirstLetter)
          positionMap.set(position, isFirstLetter ? word.position : null);

        completedPuzzleData.set(position, word.answer[i]);
      });

      wordArray[i] = {
        direction: word.orientation,
        startingPosition: [word.starty, word.startx],
      };
    });

  console.log(positionMap);
  console.log(wordArray);

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="mb-4 text-2xl font-semibold">{theme as string}</h1>
        <CrosswordGame
          rows={puzzleData.rows}
          cols={puzzleData.cols}
          wordArray={wordArray}
          positionMap={positionMap}
        />
      </div>
      {/* <CrosswordClues clues={clues} /> */}
      {/* <Button>
        <Link href="/">Get a new puzzle</Link>
      </Button> */}
    </div>
  );
}
