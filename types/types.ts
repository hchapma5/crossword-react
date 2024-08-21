type GenAiCrosswordData = Array<{ clue: string; answer: string }>;

// {
//   clue: "Bart's signature prank",
//   answer: 'CHALKBOARD',
//   startx: 3,
//   starty: 12,
//   orientation: 'down',
//   position: 15
// },

type CrosswordPuzzle = {
  table: string[][];
  result: {
    clue: string;
    answer: string;
    startx: number;
    starty: number;
    orientation: Direction;
    position: number;
  }[];
  rows: number;
  cols: number;
  table_string: string;
};

type WordPosition = {
  id: number;
  position: Position;
  length: number;
};

type DirectionsMap = { [key: string]: Direction };

type Position = [row: number, col: number];

type Direction = "across" | "down" | "intersection" | "none";

export type {
  GenAiCrosswordData,
  CrosswordPuzzle,
  WordPosition,
  Position,
  Direction,
  DirectionsMap,
};
