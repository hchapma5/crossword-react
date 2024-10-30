import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";
import { generateCrosswordGameData } from "@/utils/crossword-utils";
import { insertCrosswordData } from "@/db/query";
import { currentUser, User } from "@clerk/nextjs/server";
import { redis } from "@/db/upstash";
import { Ratelimit } from "@upstash/ratelimit";
import { unstable_cache } from "next/cache";
import CrosswordPuzzle from "./_components/crossword-puzzle";

// Rate limiting setup
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
  }

  const theme = searchParams.theme;
  if (!theme) redirect("/browse");

  const crosswordCache = unstable_cache(
    async () => {
      const { data } = await askGeminiForCrosswordData(theme);
      const { answers, clues, positions, navigation, rows, cols } =
        generateCrosswordGameData(data!);

      const crosswordId = await insertCrosswordData({
        theme,
        data: data!,
        createdBy: user.username || user.id,
        answers: answers,
      });

      return {
        crosswordId,
        clues,
        positions,
        navigation,
        rows,
        cols,
        theme,
      };
    },
    [`crossword-data:${theme}`],
    { revalidate: 3600 },
  );

  let crosswordData = await crosswordCache();

  return <CrosswordPuzzle {...crosswordData} />;
}
