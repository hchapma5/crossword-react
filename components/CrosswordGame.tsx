"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Position, Direction } from "@/types/types";
import { Button } from "./ui/button";
import { isPuzzleComplete } from "@/app/crossword/[id]/page";

interface CrosswordGameProps {
  cols: number;
  rows: number;
  map: Map<string, { direction: Direction; id: number; firstLetter: boolean }>;
}

//TODO: Finish implementating smooth navigation of component (i.e arrow keys, tab, etc)
export default function CrosswordGame(props: CrosswordGameProps) {
  const { map, rows, cols } = props;
  // const [selected, setSelected] = useState<Position>(positions[0].position);
  // const [direction, setDirection] = useState<Direction>(
  //   directions[`${selected[0]}-${selected[1]}`],
  // );

  const layout = Array(rows).fill(Array(cols).fill(""));

  const inputRefs = useRef<Array<Array<HTMLInputElement | null>>>(
    Array.from({ length: rows }, () => Array(cols).fill(null)),
  );

  const setInputRef = useCallback(
    (rowIndex: number, colIndex: number) => (el: HTMLInputElement | null) => {
      if (inputRefs.current) {
        inputRefs.current[rowIndex][colIndex] = el;
      }
    },
    [],
  );

  // useEffect(() => {
  //   const [row, col] = selected;
  //   const input = inputRefs.current[row - 1][col - 1];
  //   if (input) {
  //     input.focus();
  //   }
  //   setDirection(
  //     directions[`${row}-${col}`] === "intersection"
  //       ? direction
  //       : directions[`${row}-${col}`],
  //   );
  // }, [direction, directions, selected]);

  return (
    <form action={isPuzzleComplete}>
      <table className="border-collapse">
        <tbody>
          {layout.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((_: any, colIndex: number) => (
                <td
                  key={`row-${rowIndex}-col-${colIndex}`}
                  className={`relative aspect-square h-12 w-12 border border-black text-center ${map.has(`${rowIndex + 1},${colIndex + 1}`) ? "" : "invisible border-none"}`}
                >
                  <>
                    {map.get(`${rowIndex + 1},${colIndex + 1}`)
                      ?.firstLetter && (
                      <label
                        htmlFor="word-position"
                        className="absolute flex items-center justify-center font-semibold"
                      >
                        {map.get(`${rowIndex + 1},${colIndex + 1}`)?.id}
                      </label>
                    )}
                    <input
                      type="text"
                      name={`row-${rowIndex}-col-${colIndex}`}
                      id={`row-${rowIndex}-col-${colIndex}`}
                      // ref={setInputRef(rowIndex, colIndex)}
                      // onChange={(e) => {
                      //   e.target.value.match(/^[a-zA-Z]*$/)
                      //     ? (e.target.value = e.target.value.toUpperCase())
                      //     : (e.target.value = "");
                      //   let nextPosition = selected;
                      //   if (direction === "across") {
                      //     nextPosition = [selected[0], selected[1] + 1];
                      //   } else if (direction === "down") {
                      //     nextPosition = [selected[0] + 1, selected[1]];
                      //   }
                      //   if (
                      //     inputRefs.current[nextPosition[0] - 1] &&
                      //     inputRefs.current[nextPosition[0] - 1][
                      //       nextPosition[1] - 1
                      //     ] &&
                      //     e.target.value.length === 1
                      //   )
                      //     setSelected(nextPosition);
                      // }}
                      // onKeyDown={(e) => {
                      //   let nextPosition = selected;
                      //   if (e.key === "ArrowUp") {
                      //     nextPosition = [selected[0] - 1, selected[1]];
                      //   } else if (e.key === "ArrowDown") {
                      //     nextPosition = [selected[0] + 1, selected[1]];
                      //   } else if (e.key === "ArrowLeft") {
                      //     nextPosition = [selected[0], selected[1] - 1];
                      //   } else if (e.key === "ArrowRight") {
                      //     nextPosition = [selected[0], selected[1] + 1];
                      //   } else if (e.key === "Tab") {
                      //     e.preventDefault(); // Prevent default tabbing behavior
                      //     if (e.shiftKey) {
                      //       // Shift + Tab
                      //       if (direction === "across") {
                      //         nextPosition = [selected[0], selected[1] - 1];
                      //       } else if (direction === "down") {
                      //         nextPosition = [selected[0] - 1, selected[1]];
                      //       }
                      //     } else {
                      //       // Tab
                      //       if (direction === "across") {
                      //         nextPosition = [selected[0], selected[1] + 1];
                      //       } else if (direction === "down") {
                      //         nextPosition = [selected[0] + 1, selected[1]];
                      //       }
                      //     }
                      //   }
                      //   if (
                      //     inputRefs.current[nextPosition[0] - 1] &&
                      //     inputRefs.current[nextPosition[0] - 1][
                      //       nextPosition[1] - 1
                      //     ]
                      //   )
                      //     setSelected(nextPosition);
                      // }}
                      // onClick={() =>
                      //   setSelected([rowIndex + 1, colIndex + 1])
                      // }
                      // // Handle Delete and Backspace
                      // onSelect={(e) =>
                      //   e.currentTarget.setSelectionRange(0, 1)
                      // }
                      className={`h-full w-full bg-slate-50 text-center text-xl`}
                      maxLength={1}
                    />
                  </>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="submit">Submit</Button>
    </form>
  );
}
