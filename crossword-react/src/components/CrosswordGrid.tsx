import { WordPosition } from "@/types/types";

interface CrosswordProps {
  cols: number;
  wordPositions: WordPosition[];
  layout: string[][];
}

function hideEmptyCells(
  table: string[][],
  rowIndex: number,
  columnIndex: number
) {
  if (table[rowIndex][columnIndex] === "-") {
    return "invisible";
  } else {
    return "";
  }
}

export default function CrosswordGrid(props: CrosswordProps) {
  const { cols, wordPositions, layout } = props;

  function getPosition(x: number, y: number): number | null {
    const found = wordPositions.find(
      (word) => word.startx === x + 1 && word.starty === y + 1
    );
    return found ? found.position : null;
  }

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      className="grid w-full gap-0.5 border-2 border-grey-500 p-4 relative"
    >
      {layout.map((row: string[], rowIndex: number) =>
        row.map((cell: string, columnIndex: number) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            className={`flex items-center justify-center bg-white border-2 border-gray-500 aspect-square text-xl px-1 relative ${hideEmptyCells(
              layout,
              rowIndex,
              columnIndex
            )}`}
          >
            <label className="absolute top-0 left-0 font-semibold text-[1rem] mx-1">
              {getPosition(columnIndex, rowIndex)}
            </label>
            {cell}
          </div>
        ))
      )}
    </div>
  );
}
