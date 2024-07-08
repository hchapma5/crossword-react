import { WordPosition } from "@/types/types";

interface CrosswordProps {
  cols: number;
  rows: number;
  wordPositions: WordPosition[];
  layout: string[][];
}

function hideEmptyCells(
  table: string[][],
  rowIndex: number,
  columnIndex: number,
) {
  if (table[rowIndex][columnIndex] === "-") {
    return "invisible";
  } else {
    return "";
  }
}

export default function CrosswordGrid(props: CrosswordProps) {
  const { cols, rows, wordPositions, layout } = props;

  function getPosition(x: number, y: number): number | null {
    const found = wordPositions.find(
      (word) => word.startx === x + 1 && word.starty === y + 1,
    );
    return found ? found.position : null;
  }

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      className="border-grey-500 border-collape grid w-full gap-0"
    >
      {layout.map((row: string[], rowIndex: number) =>
        row.map((cell: string, columnIndex: number) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            className={`relative flex aspect-square items-center justify-center bg-red-100 ${hideEmptyCells(
              layout,
              rowIndex,
              columnIndex,
            )}`}
          >
            <label className="absolute left-0 top-0 mx-1 text-[0.8rem] font-semibold">
              {getPosition(columnIndex, rowIndex)}
            </label>
            {cell}
          </div>
        )),
      )}
    </div>
  );
}
