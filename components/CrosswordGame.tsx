"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Position, Direction } from "@/types/types";
import { Button } from "./ui/button";
import { isPuzzleComplete } from "@/app/crossword/[id]/page";
import { is } from "drizzle-orm";

interface CrosswordGameProps {
  cols: number;
  rows: number;
  map: Map<string, { direction: Direction; id: number; firstLetter: boolean }>;
}

export default function CrosswordGame(props: CrosswordGameProps) {
  const { map, rows, cols } = props;
  const [selected, setSelected] = useState<Position>(
    map.keys().next().value.split(",").map(Number),
  );

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

  useEffect(() => {
    const [row, col] = selected;
    const input = inputRefs.current[row - 1][col - 1];
    if (input) {
      input.focus();
    }
  }, [selected]);

  return (
    <form action={isPuzzleComplete}>
      <table className="border-collapse">
        <tbody>
          {layout.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((_: any, colIndex: number) => (
                <td
                  key={`${rowIndex},${colIndex}`}
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
                    {map.get(`${rowIndex + 1},${colIndex + 1}`) && (
                      <input
                        type="text"
                        name={`${rowIndex + 1},${colIndex + 1}`}
                        id={`${rowIndex + 1},${colIndex + 1}`}
                        ref={setInputRef(rowIndex, colIndex)}
                        onChange={(e) => {
                          e.target.value.match(/^[a-zA-Z]*$/)
                            ? (e.target.value = e.target.value.toUpperCase())
                            : (e.target.value = "");
                          const direction = map.get(
                            `${rowIndex + 1},${colIndex + 1}`,
                          )?.direction;
                          switch (direction) {
                            case "across":
                              setSelected([rowIndex + 1, colIndex + 2]);
                              break;
                            case "down":
                              setSelected([rowIndex + 2, colIndex + 1]);
                              break;
                            case "intersection":
                            /** TODO: Implement intersection logic
                              If the previous cell direction is across and the cell to the right exists, go right
                              If the previous cell direction is down and the cell below exists, go down
                              if neither exist, go to the next cell (the next word starting cell)
                              break;
                              */
                          }
                        }}
                        onKeyDown={(e) => {
                          let nextPosition = selected;
                          switch (e.key) {
                            case "ArrowUp":
                              nextPosition = [selected[0] - 1, selected[1]];
                              break;
                            case "ArrowDown":
                              nextPosition = [selected[0] + 1, selected[1]];
                              break;
                            case "ArrowLeft":
                              nextPosition = [selected[0], selected[1] - 1];
                              break;
                            case "ArrowRight":
                              nextPosition = [selected[0], selected[1] + 1];
                              break;
                            case "Tab":
                              e.preventDefault(); // Prevent default tabbing behavior
                              //TODO: Implement tabbing behavior
                              break;
                          }
                          if (map.has(nextPosition[0] + "," + nextPosition[1]))
                            setSelected(nextPosition);
                        }}
                        onClick={() =>
                          setSelected([rowIndex + 1, colIndex + 1])
                        }
                        // Handle Delete and Backspace
                        onSelect={(e) =>
                          e.currentTarget.setSelectionRange(0, 1)
                        }
                        className={`h-full w-full bg-slate-50 text-center text-xl`}
                        maxLength={1}
                      />
                    )}
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
