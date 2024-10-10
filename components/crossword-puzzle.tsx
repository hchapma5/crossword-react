import { Clue } from "@/types/types";
import CollapseButton from "./collapse-button";
import CrosswordActiveClue from "./crossword-active-clue";
import CrosswordClues from "./crossword-clues";
import CrosswordCluesContainer from "./crossword-clues-container";
import CrosswordGrid from "./crossword-grid";
import { CrosswordProvider } from "./crossword-provider";
import { Button } from "./ui/button";
import { isPuzzleComplete } from "@/utils/actions";

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

export default async function CrosswordPuzzlePage(props: CrosswordPuzzleProps) {
  const { crosswordId, clues, rows, cols, navigation, positions, theme } =
    props;

  return (
    <form action={isPuzzleComplete}>
      {/* Inject crossword id into form data */}
      <input type="hidden" name="crosswordId" value={crosswordId} />{" "}
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
              <CrosswordGrid />
              <div className="absolute bottom-4 right-4">
                <Button type="submit">Submit</Button>
              </div>
            </div>
            <CrosswordCluesContainer>
              <CrosswordClues />
              <CollapseButton />
            </CrosswordCluesContainer>
            <CrosswordActiveClue />
          </div>
        </div>
      </CrosswordProvider>
    </form>
  );
}
