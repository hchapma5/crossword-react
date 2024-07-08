import clg from "crossword-layout-generator";
import CrosswordClues from "@/components/CrosswordClues";
import CrosswordGrid from "@/components/CrosswordGrid";

import { Button } from "@/components/ui/button";
import { CrosswordPuzzle, WordPosition } from "@/types/types";
import { getCrosswordDataById } from "@/db/query";
import Link from "next/link";

interface Params {
  params: {
    id: string;
  };
}

export default async function CrosswordPage({ params }: Params) {
  // Fetch crossword data from the database
  const [theme, data] = await getCrosswordDataById(params.id);

  const layout: CrosswordPuzzle = clg.generateLayout(data);

  const clues = Array.from(layout.result, (data) => ({
    clue: data.clue,
    direction: data.orientation,
    position: data.position,
  }));

  const wordPositions: WordPosition[] = Array.from(layout.result, (word) => ({
    position: word.position,
    startx: word.startx,
    starty: word.starty,
  }));

  return (
    <div className="border-grey-500 flex w-3/4 flex-col items-center border-2 p-8">
      <h1 className="mb-4 text-2xl font-semibold">{theme as string}</h1>
      <div className="flex w-full p-4">
        <CrosswordGrid
          cols={layout.cols}
          rows={layout.rows}
          wordPositions={wordPositions}
          layout={layout.table}
        />
        {/* <CrosswordClues clues={clues} /> */}
      </div>
      <div className="mt-4 justify-center">
        <Button>
          <Link href="/">Get a new puzzle</Link>
        </Button>
      </div>
    </div>
  );
}
