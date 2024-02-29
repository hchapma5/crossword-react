import { CrosswordData } from "../utils/utils";
import clg from "crossword-layout-generator";
interface CrosswordProps {
  data: CrosswordData;
}

function findEmptyCells(
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

type CrosswordObject = {
  answer: string;
  startx: number;
  starty: number;
  orientation: string;
  position: number;
};

export default function CrosswordGrid(props: CrosswordProps) {
  const { data } = props.data;

  const layout = clg.generateLayout(data);
  const table = layout.table;
  const numColumns = table[0].length;
  const puzzle = layout.result as CrosswordObject[];

  function getPosition(x: number, y: number): number | null {
    const found = puzzle.find(
      (word) => word.startx === x + 1 && word.starty === y + 1
    );
    return found ? found.position : null;
  }

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
      }}
      className="grid w-full gap-1"
    >
      {table.map((row: string[], rowIndex: number) =>
        row.map((cell: string, columnIndex: number) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            className={`bg-white border-2 border-gray-500 aspect-square px-1 ${findEmptyCells(
              table,
              rowIndex,
              columnIndex
            )}`}
          >
            {getPosition(columnIndex, rowIndex)}
            {/* {cell} */}
          </div>
        ))
      )}
    </div>
  );
}
