type CrosswordData = Array<{ clue: string; answer: string }>;

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
};

type DirectionsMap = { [key: string]: Direction };

type Position = [row: number, col: number];

type Direction = "across" | "down" | "intersection" | "none";

export type {
  CrosswordData,
  CrosswordPuzzle,
  WordPosition,
  Position,
  Direction,
  DirectionsMap,
};
