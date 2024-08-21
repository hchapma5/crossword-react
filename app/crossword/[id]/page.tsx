"use server";

import { Button } from "@/components/ui/button";
import { Direction, Position } from "@/types/types";
import { getCrosswordDataById } from "@/db/query";
import Link from "next/link";
import CrosswordGame from "@/components/CrosswordGame";
import CrosswordClues from "@/components/CrosswordClues";

let crosswordPuzzleId = "";

interface Params {
  params: {
    id: string;
  };
}

export const isPuzzleComplete = async (formData: FormData) => {
  console.log(formData);
  //TODO: fetch the correct data from the database and compare to the form data
};

export default async function CrosswordPage({ params }: Params) {
  const [theme, puzzleData] = await getCrosswordDataById(params.id);

  // Build a map of the puzzle data to serve the client
  // TODO: need to either overload key comparison or use a string key
  let puzzleMap = new Map<Position, { direction: Direction; id: number }>();

  puzzleData.result.forEach((word) => {
    // Skip words without an orientation
    if (word.orientation === "none") return;

    word.answer.split("").forEach((_, i) => {
      const position: Position =
        word.orientation === "across"
          ? [word.starty, word.startx + i]
          : [word.starty + i, word.startx];

      // TODO: hanlde case where word already exists in the map (i.e. intersection)
      if (puzzleMap.has(position)) {
        console.log("this is an intersection", position);
      } else {
        puzzleMap.set(position, {
          direction: word.orientation,
          id: word.position,
        });
      }
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
