type CrosswordThemeData = Array<{ clue: string; answer: string }>;

type CrosswordPuzzleData = {
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

type Answers = { [position: string]: string };

type Positions = { [position: string]: PositionData };

type PositionData = {
  indices: { wordIndex: number; letterIndex: number }[];
  id?: number;
};

type Navigation = string[][];

export type {
  CrosswordThemeData,
  CrosswordPuzzleData,
  WordPosition,
  Position,
  Direction,
  DirectionsMap,
  Clue,
  Answers,
  Positions,
  Navigation,
};
