import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";
import { generateCrosswordGameData } from "@/utils/crossword-utils";
import { insertCrosswordData } from "@/db/query";
import { currentUser } from "@clerk/nextjs/server";
import { redis } from "@/db/upstash";
import { Ratelimit } from "@upstash/ratelimit";
import CrosswordPuzzle from "@/components/crossword-puzzle";
import { unstable_cache } from "next/cache";

// To implement once testing is done
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

  // Get the theme from the search params or redirect to the browse page
  const theme = searchParams.theme;
  if (!theme) redirect("/browse");

  const cache = unstable_cache(
    async () => {
      // fetch the crossword data from Gemini
      const { data } = await askGeminiForCrosswordData(theme);

      // make a copy of the data to avoid mutating the original
      const dataCopy = { ...data! };

      console.log("data before: ", dataCopy);

      // Generate the answers to insert into the database
      const { completedPuzzle, clues, positions, navigation, rows, cols } =
        generateCrosswordGameData(dataCopy);

      console.log("data after: ", data);

      const crosswordId = await insertCrosswordData({
        theme,
        data: data!,
        createdBy: user.username || user.id,
        answers: completedPuzzle,
      });

      return { crosswordId, clues, positions, navigation, rows, cols };
    },
    [`crossword-data:${theme}`],
    {
      revalidate: 3600,
    },
  );

  const crosswordData = await cache();

  return <CrosswordPuzzle {...crosswordData} theme={theme} />;
}
