import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";
import { generateCrosswordGameData } from "@/utils/crossword-utils";
import CrosswordPuzzlePage from "@/components/crossword-puzzle";
import { insertCrosswordData } from "@/db/query";
import { currentUser } from "@clerk/nextjs/server";
import { redis } from "@/db/upstash";
import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "24 h"),
  analytics: true,
});

export default async function CrosswordPage({
  searchParams,
}: {
  searchParams: { theme: string };
}) {
  // FOR TESTING LOADING STATE ONLY
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
    return;
  }

  // const { remaining, limit, success } = await rateLimit.limit(user.id!);

  // // TODO: Handle this case in the UI
  // if (!success)
  //   return (
  //     <div>
  //       Rate limit: {remaining} / {limit}
  //     </div>
  //   );

  // Get the theme from the search params or redirect to the browse page
  const theme = searchParams.theme;
  if (!theme) redirect("/browse");

  // fetch the crossword data from Gemini
  const { data, error } = await askGeminiForCrosswordData(theme);

  // TODO: Handle this case in the UI
  if (error) {
    return <div>Something went wrong, please try again...</div>;
  }

  // Generate the crossword game data
  const { completedPuzzle, clues, positions, navigation, rows, cols } =
    generateCrosswordGameData(data!);

  //TODO: Refactor this to prompt user to save the crossword (supabase db)
  // Insert the crossword data into the database
  const crosswordId = await insertCrosswordData(
    theme,
    data!,
    user!.username || user!.id,
  );

  return (
    <CrosswordPuzzlePage
      {...{ crosswordId, rows, cols, clues, navigation, positions, theme }}
    />
  );
}
