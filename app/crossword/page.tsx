import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";
import { generateCrosswordGameData } from "@/utils/crossword-utils";
import { insertCrosswordData } from "@/db/query";
import { currentUser } from "@clerk/nextjs/server";
import { redis } from "@/db/upstash";
import { Ratelimit } from "@upstash/ratelimit";
import CrosswordPuzzle from "@/components/crossword-puzzle";

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

  // Insert the crossword data into the database
  const crosswordId = await insertCrosswordData({
    theme,
    data: data!,
    createdBy: user.username || user.id,
    answers: completedPuzzle,
  });

  return (
    <CrosswordPuzzle
      {...{
        completedPuzzle,
        theme,
        crosswordId,
        clues,
        positions,
        navigation,
        rows,
        cols,
      }}
    />
  );
}
