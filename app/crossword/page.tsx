import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";
import { generateCrosswordGameData } from "@/utils/crossword-utils";
import { insertCrosswordData } from "@/db/query";
import { currentUser } from "@clerk/nextjs/server";
import { redis } from "@/db/upstash";
import { Ratelimit } from "@upstash/ratelimit";
import CrosswordPuzzle, {
  CrosswordPuzzleProps,
} from "@/components/crossword-puzzle";

// Rate limiting setup
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "24 h"),
  analytics: true,
});

// Cache utility functions
async function getCachedData(key: string) {
  const cachedData = await redis.get(key);
  if (cachedData) return cachedData;
  return null;
}

async function setCachedData(
  key: string,
  data: any,
  expirationInSeconds: number = 3600,
) {
  await redis.set(key, data, { ex: expirationInSeconds });
}

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

  const cacheKey = `crossword:${theme}`;
  let crosswordData = (await getCachedData(cacheKey)) as CrosswordPuzzleProps;

  if (!crosswordData) {
    // Fetch the crossword data from Gemini
    const { data } = await askGeminiForCrosswordData(theme);

    // Generate the answers to insert into the database
    const { answers, clues, positions, navigation, rows, cols } =
      generateCrosswordGameData(data!);

    const crosswordId = await insertCrosswordData({
      theme,
      data: data!,
      createdBy: user.username || user.id,
      answers: answers,
    });

    crosswordData = {
      crosswordId,
      clues,
      positions,
      navigation,
      rows,
      cols,
      theme,
    };

    // Cache the data
    await setCachedData(cacheKey, crosswordData);
  }

  return <CrosswordPuzzle {...crosswordData} />;
}
