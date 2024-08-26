"use server";

import { Button } from "@/components/ui/button";
import { Direction, Position } from "@/types/types";
import { getCrosswordDataById } from "@/db/query";
import Link from "next/link";
import CrosswordGame from "@/components/CrosswordGame";
import CrosswordClues from "@/components/CrosswordClues";

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

  const puzzleWordCount = puzzleData.result.filter(
    (word) => word.orientation !== "none",
  ).length;

  let clues: Array<{ clue: string; direction: Direction; id: number }> =
    Array(puzzleWordCount);

  let positionsMap = new Map<string, { id: number; firstLetter: boolean }>();

  let navigationArray: Array<{
    direction: Direction;
    startingPosition: Position;
  }> = Array(puzzleWordCount);

  //TODO: Refactor this code to be more readable

  puzzleData.result
    .filter((word) => word.orientation !== "none")
    .forEach((word, i) => {
      clues[i] = {
        clue: word.clue,
        direction: word.orientation,
        id: word.position,
      };

      word.answer.split("").forEach((_, i) => {
        const position =
          word.orientation === "across"
            ? `${word.starty},${word.startx + i}`
            : `${word.starty + i},${word.startx}`;

        const isFirstLetter = i === 0;

        if (!positionsMap.has(position) || isFirstLetter)
          positionsMap.set(position, {
            id: word.position,
            firstLetter: isFirstLetter,
          });

        completedPuzzleData.set(position, word.answer[i]);
      });

      if (navigationArray[word.position - 1] === undefined) {
        navigationArray[word.position - 1] = {
          direction: word.orientation,
          startingPosition: [word.starty, word.startx],
        };
        return;
      }
      //TODO: Intersection
      navigationArray[word.position - 1].direction = "intersection";
    });

  // console.log(puzzleData.result);
  // console.log(navigationArray);

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="mb-4 text-2xl font-semibold">{theme as string}</h1>
        <CrosswordGame
          rows={puzzleData.rows}
          cols={puzzleData.cols}
          navigationArray={navigationArray}
          positionsMap={positionsMap}
        />
      </div>
      <CrosswordClues clues={clues} />
      <Button>
        <Link href="/">Get a new puzzle</Link>
      </Button>
    </div>
  );
}
