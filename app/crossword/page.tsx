import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";
import { generateCrosswordGameData } from "@/utils/crossword-utils";
import CrosswordPuzzlePage from "@/components/crossword-puzzle";
import { insertCrosswordData } from "@/db/query";
import { currentUser } from "@clerk/nextjs/server";

export default async function CrosswordPage({
  searchParams,
}: {
  searchParams: { theme: string };
}) {
  // FOR TESTING LOADING STATE ONLY
  await new Promise((resolve) => setTimeout(resolve, 10000));

  // Get the theme from the search params or redirect to the browse page
  const theme = searchParams.theme;
  if (!theme) redirect("/browse");

  // Get the current user
  const user = await currentUser();

  // fetch the crossword data from Gemini
  const themeData = await askGeminiForCrosswordData(theme);

  // Generate the crossword game data
  const { completedPuzzle, clues, positions, navigation, rows, cols } =
    generateCrosswordGameData(themeData);

  // Insert the crossword data into the database
  const crosswordId = await insertCrosswordData(
    theme,
    themeData,
    user!.username || user!.id,
  );

  return (
    <CrosswordPuzzlePage
      {...{ crosswordId, rows, cols, clues, navigation, positions, theme }}
    />
  );
}
