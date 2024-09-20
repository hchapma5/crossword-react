"use server";

import { Button } from "@/components/ui/button";
import { Clue } from "@/types/types";
import { getCrosswordDataById } from "@/db/query";
import { CrosswordProvider } from "@/components/crossword-provider";
import CluesContainer from "@/components/clues-container";
import CrosswordGrid from "@/components/crossword-grid";

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

  let clues: Array<Clue> = [];

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
        length: word.answer.length,
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

  return (
    <form action={isPuzzleComplete}>
      <div className="flex flex-col">
        <CrosswordProvider>
          <CrosswordGrid
            rows={puzzleData.rows}
            cols={puzzleData.cols}
            navigationArray={navigationArray}
            positionsMap={positionsMap}
          />
          <CluesContainer clues={clues} />
        </CrosswordProvider>
        <div className="flex w-full items-center justify-evenly">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  );
}
