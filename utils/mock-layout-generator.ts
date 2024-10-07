import { generateLayout } from "crossword-layout-generator";
import { CrosswordPuzzle } from "@/types/types";

export function generateRandomCrosswordGrid() {
  // temporarily disable crossword-layout-generator logging
  console.log = () => {};
  console.error = () => {};

  // mock theme data
  const data = Array.from({ length: 20 }, () => {
    return {
      clue: "",
      answer: generateRandomWord(),
    };
  });

  const positions = new Set<string>();

  // generate crossword layout
  const puzzle = generateLayout(data) as CrosswordPuzzle;

  puzzle.result.forEach((word) => {
    const letters = word.answer.split("");

    letters.forEach((_, letterIndex) => {
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

// generate a random word between 3-10 characters
function generateRandomWord() {
  const length = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let string = "";
  for (let i = 0; i < length; i++) {
    string += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return string;
}
