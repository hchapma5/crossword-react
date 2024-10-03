import { Clue, CrosswordPuzzle, CrosswordThemeData } from "@/types/types";
import clg from "crossword-layout-generator";

export function generateCrosswordGameData(themeData: CrosswordThemeData) {
  let completedPuzzle = new Map<string, string>();
  let clues: Array<Clue> = [];
  let positions = new Map<
    string,
    { indices: { wordIndex: number; letterIndex: number }[]; id?: number }
  >();
  let navigation: Array<Array<string>> = [[]];

  const puzzle = clg.generateLayout(themeData) as CrosswordPuzzle;

  const rows = puzzle.rows;
  const cols = puzzle.cols;

  puzzle.result
    .filter((word) => word.orientation !== "none")
    .forEach((word, wordIndex) => {
      clues[wordIndex] = {
        clue: word.clue,
        direction: word.orientation,
        id: word.position,
        length: word.answer.length,
      };

      navigation[wordIndex] = [];

      word.answer.split("").forEach((_, letterIndex) => {
        const position =
          word.orientation === "across"
            ? `${word.starty - 1},${word.startx + letterIndex - 1}`
            : `${word.starty + letterIndex - 1},${word.startx - 1}`;

        navigation[wordIndex][letterIndex] = position;

        const isFirstLetter = letterIndex === 0;

        const existingCell = positions.get(position);
        const newIndices = existingCell
          ? [...existingCell.indices, { wordIndex, letterIndex }]
          : [{ wordIndex, letterIndex }];

        positions.set(position, {
          indices: newIndices,
          id: isFirstLetter ? word.position : existingCell?.id,
        });

        completedPuzzle.set(position, word.answer[letterIndex]);
      });
    });

  return { completedPuzzle, clues, positions, navigation, rows, cols };
}
