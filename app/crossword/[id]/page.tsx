"use server";

import { Button } from "@/components/ui/button";
import { Direction, Position } from "@/types/types";
import { getCrosswordDataById } from "@/db/query";
import Link from "next/link";
import CrosswordGame from "@/components/CrosswordGame";
import CrosswordClues from "@/components/CrosswordClues";

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

  let clues: Array<{ clue: string; direction: Direction; id: number }> = [];

  let positionsMap = new Map<
    string,
    { indices: { wordIndex: number; letterIndex: number }[]; id?: number }
  >();

  let navigationArray: Array<Array<string>> = [[]];

  puzzleData.result
    .filter((word) => word.orientation !== "none")
    .forEach((word, wordIndex) => {
      clues[wordIndex] = {
        clue: word.clue,
        direction: word.orientation,
        id: word.position,
      };

      navigationArray[wordIndex] = [];

      word.answer.split("").forEach((_, letterIndex) => {
        const position =
          word.orientation === "across"
            ? `${word.starty - 1},${word.startx + letterIndex - 1}`
            : `${word.starty + letterIndex - 1},${word.startx - 1}`;

        navigationArray[wordIndex][letterIndex] = position;

        const isFirstLetter = letterIndex === 0;

        const existingCell = positionsMap.get(position);
        const newIndices = existingCell
          ? [...existingCell.indices, { wordIndex, letterIndex }]
          : [{ wordIndex, letterIndex }];

        positionsMap.set(position, {
          indices: newIndices,
          id: isFirstLetter ? word.position : existingCell?.id,
        });

        completedPuzzleData.set(position, word.answer[letterIndex]);
      });
    });

  console.log(navigationArray);
  console.log(positionsMap);

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
      {/* <Button>
        <Link href="/">Get a new puzzle</Link>
      </Button> */}
    </div>
  );
}
