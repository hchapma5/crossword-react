"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Position, Direction } from "@/types/types";
import { Button } from "./ui/button";
import { isPuzzleComplete } from "@/app/crossword/[id]/page";

interface CrosswordGameProps {
  rows: number;
  cols: number;
  navigationArray: Array<{ direction: Direction; startingPosition: Position }>;
  positionsMap: Map<string, { id: number; firstLetter: boolean }>;
}
//TODO: Implement Submit behavior
//TODO: First letter is an intersection
//TODO: Arrow key not updating word/direction
export default function CrosswordGame(props: CrosswordGameProps) {
  const { rows, cols, navigationArray, positionsMap } = props;
  const [selected, setSelected] = useState<Position>(
    navigationArray[0].startingPosition,
  );
  const [currentWordId, setCurrentWordId] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>(
    navigationArray[0].direction,
  );

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

  const setNextPosition = () => {
    let nextPosition = selected;
    switch (direction) {
      case "across":
        nextPosition = [selected[0], selected[1] + 1];
        break;
      case "down":
        nextPosition = [selected[0] + 1, selected[1]];
        break;
      case "intersection":
      //TODO: Handle case when the first letter is an intersection
    }
    if (positionsMap.has(nextPosition[0] + "," + nextPosition[1])) {
      setSelected(nextPosition);
    } else {
      // If the next position is not a valid position, move to the next word
      if (currentWordId === navigationArray.length - 1) return;
      const nextWord = navigationArray[currentWordId + 1];
      setSelected(nextWord.startingPosition);
      setCurrentWordId(currentWordId + 1);
      setDirection(nextWord.direction);
    }
  };

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
          {Array(rows)
            .fill(Array(cols).fill(""))
            .map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((_: any, colIndex: number) => (
                  <td
                    key={`${rowIndex},${colIndex}`}
                    className={`relative aspect-square h-12 w-12 border border-black text-center ${positionsMap.has(`${rowIndex + 1},${colIndex + 1}`) ? "" : "invisible border-none"}`}
                  >
                    <>
                      {positionsMap.has(`${rowIndex + 1},${colIndex + 1}`) &&
                        positionsMap.get(`${rowIndex + 1},${colIndex + 1}`)
                          ?.firstLetter && (
                          <label
                            htmlFor="word-position"
                            className="absolute flex items-center justify-center font-semibold"
                          >
                            {
                              positionsMap.get(
                                `${rowIndex + 1},${colIndex + 1}`,
                              )?.id
                            }
                          </label>
                        )}
                      {positionsMap.has(`${rowIndex + 1},${colIndex + 1}`) && (
                        <input
                          type="text"
                          name={`${rowIndex + 1},${colIndex + 1}`}
                          id={`${rowIndex + 1},${colIndex + 1}`}
                          ref={setInputRef(rowIndex, colIndex)}
                          onChange={(e) => {
                            e.target.value.match(/^[a-zA-Z]*$/)
                              ? (e.target.value = e.target.value.toUpperCase())
                              : (e.target.value = "");
                            setNextPosition();
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
                              case "Backspace" || "Delete": // TODO: Refactor this later
                                e.preventDefault();
                                inputRefs.current[selected[0] - 1][
                                  selected[1] - 1
                                ]!.value = "";

                                direction === "across"
                                  ? (nextPosition = [
                                      selected[0],
                                      selected[1] - 1,
                                    ])
                                  : (nextPosition = [
                                      selected[0] - 1,
                                      selected[1],
                                    ]);
                                break;

                              case "Tab":
                                e.preventDefault(); // Prevent default tabbing behavior
                                if (e.shiftKey) {
                                  // Shift + Tab
                                  direction === "across"
                                    ? (nextPosition = [
                                        selected[0],
                                        selected[1] - 1,
                                      ])
                                    : (nextPosition = [
                                        selected[0] - 1,
                                        selected[1],
                                      ]);
                                } else {
                                  // Tab
                                  direction === "across"
                                    ? (nextPosition = [
                                        selected[0],
                                        selected[1] + 1,
                                      ])
                                    : (nextPosition = [
                                        selected[0] + 1,
                                        selected[1],
                                      ]);
                                }
                                break;
                            }
                            if (
                              positionsMap.has(
                                nextPosition[0] + "," + nextPosition[1],
                              )
                            )
                              setSelected(nextPosition);
                          }}
                          onClick={() => {
                            setSelected([rowIndex + 1, colIndex + 1]);
                            setCurrentWordId(
                              positionsMap.get(
                                `${rowIndex + 1},${colIndex + 1}`,
                              )!.id - 1,
                            );
                            setDirection(
                              navigationArray[
                                positionsMap.get(
                                  `${rowIndex + 1},${colIndex + 1}`,
                                )!.id - 1
                              ].direction,
                            );
                          }}
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
