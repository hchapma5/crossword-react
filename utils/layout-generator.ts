import clg from "crossword-layout-generator";
import { CrosswordPuzzle } from "@/types/types";

export function generateRandomCrosswordGrid() {
  // mock theme data
  const data = Array.from({ length: 20 }, () => {
    return {
      clue: "",
      answer: generateRandomWord(),
    };
  });

  // generate crossword layout
  const puzzle = clg.generateLayout(data) as CrosswordPuzzle;

  const positions = new Set<string>();

  puzzle.result.forEach((word) => {
    word.answer.split("").forEach((_, letterIndex) => {
      const position =
        word.orientation === "across"
          ? `${word.starty - 1},${word.startx + letterIndex - 1}`
          : `${word.starty + letterIndex - 1},${word.startx - 1}`;

      positions.add(position);
    });
  });

  const rows = puzzle.rows;
  const cols = puzzle.cols;

  return { positions, rows, cols };
}

// generate random word of length between 3 and 10
function generateRandomWord() {
  return "x".repeat(Math.floor(Math.random() * (10 - 3 + 1)) + 3);
}
