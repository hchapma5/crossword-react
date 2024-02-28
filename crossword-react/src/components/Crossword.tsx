import { CrosswordData } from "../utils/utils";
import clg from "crossword-layout-generator";
interface CrosswordProps {
  data: CrosswordData;
}

export default function Crossword(props: CrosswordProps) {
  const { data } = props.data;

  const layout = clg.generateLayout(data);
  const table = layout.table;
  return (
    <>
      {table.map((row: any[], i: number) => (
        <div
          key={`row-${i}`}
          style={{ display: "flex", width: "100%", height: "100%" }}
        >
          {row.map((cell: string, j: number) => (
            <div
              key={`cell-${i}-${j}`}
              style={{ display: "flex", width: "100%" }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
