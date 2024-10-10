import { Clue } from "@/types/types";
import CollapseButton from "./collapse-button";
import CrosswordActiveClue from "./crossword-active-clue";
import CrosswordClues from "./crossword-clues";
import CrosswordCluesContainer from "./crossword-clues-container";
import CrosswordGrid from "./crossword-grid";
import { CrosswordProvider } from "./crossword-provider";
import CrosswordValidator from "./crossword-validator";

type CrosswordPuzzleProps = {
  crosswordId: string;
  clues: Clue[];
  rows: number;
  cols: number;
  navigation: Array<Array<string>>;
  positions: Map<
    string,
    { indices: { wordIndex: number; letterIndex: number }[]; id?: number }
  >;
  theme: string;
};

export default function CrosswordPuzzlePage(props: CrosswordPuzzleProps) {
  const { crosswordId, clues, rows, cols, navigation, positions, theme } =
    props;

  return (
    <CrosswordProvider
      {...{
        crosswordId,
        clues,
        rows,
        cols,
        navigation,
        positions,
        theme,
      }}
    >
      <div className="flex flex-col items-center justify-center bg-background p-4">
        <div className="flex h-full max-h-[80vh] w-full max-w-full flex-col gap-4 backdrop:flex-grow md:flex-row">
          <div className="relative flex justify-center overflow-hidden rounded-lg bg-gray-200 p-10 dark:bg-gray-600">
            <CrosswordValidator>
              <CrosswordGrid />
            </CrosswordValidator>
          </div>
          <CrosswordCluesContainer>
            <CrosswordClues />
            <CollapseButton />
          </CrosswordCluesContainer>
          <CrosswordActiveClue />
        </div>
      </div>
    </CrosswordProvider>
  );
}
