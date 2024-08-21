"use server";

import clg from "crossword-layout-generator";
import { Button } from "@/components/ui/button";
import {
  CrosswordPuzzle,
  Direction,
  DirectionsMap,
  WordPosition,
} from "@/types/types";
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
  const [theme, data] = await getCrosswordDataById(params.id);

  // const gridLayout = layout.table.map((row) =>
  //   row.map((cell) => (cell === "-" ? "-" : "")),
  // );

  // const clues = Array.from(layout.result, (data) => ({
  //   clue: data.clue,
  //   direction: data.orientation,
  //   position: data.position,
  // }));

  // const wordPositions: WordPosition[] = Array.from(layout.result, (word) => ({
  //   id: word.position,
  //   position: [word.starty, word.startx],
  //   length: word.answer.length,
  // }));

  // let directionMap: DirectionsMap = {};

  // layout.result.forEach((word) => {
  //   for (let i = 0; i < word.answer.length; i++) {
  //     let key = "";
  //     if (word.orientation === "across") {
  //       key = `${word.starty}-${word.startx + i}`;
  //     } else if (word.orientation === "down") {
  //       key = `${word.starty + i}-${word.startx}`;
  //     }
  //     if (directionMap[key]) {
  //       directionMap[key] = "intersection";
  //     } else {
  //       directionMap[key] = word.orientation;
  //     }
  //   }
  // });

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="mb-4 text-2xl font-semibold">{theme as string}</h1>
        {/* <CrosswordGame
          cols={layout.cols}
          rows={layout.rows}
          positions={wordPositions}
          directions={directionMap}
          layout={gridLayout}
        /> */}
      </div>
      {/* <CrosswordClues clues={clues} /> */}
      {/* <Button>
        <Link href="/">Get a new puzzle</Link>
      </Button> */}
    </div>
  );
}
