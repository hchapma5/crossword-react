import { getCrosswordDataById } from "@/db/query";
import { generateCrosswordGameData } from "@/utils/crossword-utils";
import CrosswordPuzzlePage from "../_components/crossword-puzzle";

export default async function CrosswordPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch the crossword data from the database
  const [theme, themeData] = await getCrosswordDataById(params.id);

  // Generate the crossword game data
  const { rows, cols, clues, navigation, positions } =
    generateCrosswordGameData(themeData);

  return (
    <CrosswordPuzzlePage
      {...{
        crosswordId: params.id,
        rows,
        cols,
        clues,
        navigation,
        positions,
        theme,
      }}
    />
  );
}
