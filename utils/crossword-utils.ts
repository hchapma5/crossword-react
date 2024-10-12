import {
  Clue,
  CrosswordPuzzleData,
  CrosswordThemeData,
  Answers,
  Positions,
  Navigation,
} from "@/types/types";
import clg from "crossword-layout-generator";

export function generateCrosswordGameData(themeData: CrosswordThemeData) {
  let answers: Answers = {};
  let clues: Clue[] = [];
  let positions: Positions = {};
  let navigation: Navigation = [[]];

  console.log("themeData: ", themeData);

  const puzzle = clg.generateLayout(themeData) as CrosswordPuzzleData;

  const rows = puzzle.rows;
  const cols = puzzle.cols;

  puzzle.result
    .filter((word) => word.orientation !== "none")
    .forEach((word, wordIndex) => {
      // Build the clues array
      clues[wordIndex] = {
        clue: word.clue,
        direction: word.orientation,
        id: word.position,
        length: word.answer.length,
      };

      navigation[wordIndex] = [];

      word.answer.split("").forEach((_, letterIndex) => {
        // Calculate the position string based on orientation
        const position =
          word.orientation === "across"
            ? `${word.starty - 1},${word.startx + letterIndex - 1}`
            : `${word.starty + letterIndex - 1},${word.startx - 1}`;

        navigation[wordIndex][letterIndex] = position;

        const isFirstLetter = letterIndex === 0;

        // Retrieve the existing cell data if it exists
        const existingCell = positions[position];

        // Update the indices array with the current letter's position
        const newIndices = existingCell
          ? [...existingCell.indices, { wordIndex, letterIndex }]
          : [{ wordIndex, letterIndex }];

        // Update the positions object with the new indices and id
        positions[position] = {
          indices: newIndices,
          id: isFirstLetter ? word.position : existingCell?.id,
        };

        // Update the answers object with the current letter
        answers[position] = word.answer[letterIndex];
      });
    });

  return { answers, clues, positions, navigation, rows, cols };
}
