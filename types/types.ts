type CrosswordThemeData = Array<{ clue: string; answer: string }>;

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

type Clue = {
  clue: string;
  direction: Direction;
  id: number;
  length: number;
};

export type {
  CrosswordThemeData,
  CrosswordPuzzle,
  WordPosition,
  Position,
  Direction,
  DirectionsMap,
  Clue,
};
