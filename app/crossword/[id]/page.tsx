import clg from "crossword-layout-generator";

import { Button } from "@/components/ui/button";
import { CrosswordPuzzle, WordConfiguration } from "@/types/types";
import { getCrosswordDataById } from "@/db/query";
import Link from "next/link";
import CrosswordGame from "@/components/CrosswordGame";
import CrosswordClues from "@/components/CrosswordClues";

interface Params {
  params: {
    id: string;
  };
}

export default async function CrosswordPage({ params }: Params) {
  const [theme, data] = await getCrosswordDataById(params.id);

  const layout: CrosswordPuzzle = clg.generateLayout(data);
  const gridLayout = layout.table.map((row) =>
    row.map((cell) => (cell === "-" ? "-" : "")),
  );

  const clues = Array.from(layout.result, (data) => ({
    clue: data.clue,
    direction: data.orientation,
    position: data.position,
  }));

  const wordConfigs: WordConfiguration[] = Array.from(
    layout.result,
    (word) => ({
      id: word.position,
      position: [word.starty, word.startx],
      orientation: word.orientation,
    }),
  );

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="mb-4 text-2xl font-semibold">{theme as string}</h1>
        <CrosswordGame
          cols={layout.cols}
          rows={layout.rows}
          wordConfigs={wordConfigs}
          layout={gridLayout}
        />
      </div>
      <CrosswordClues clues={clues} />
      {/* <Button>
        <Link href="/">Get a new puzzle</Link>
      </Button> */}
    </div>
  );
}
