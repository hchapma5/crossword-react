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

type WordConfiguration = {
  id: number;
  position: Position;
  orientation: "across" | "down" | "none";
};

type Position = [row: number, col: number];

type Direction = "across" | "down" | "none";

export type {
  CrosswordData,
  CrosswordPuzzle,
  WordConfiguration,
  Position,
  Direction,
};
