import { useQuery } from "@tanstack/react-query"
import { fetchCrossword } from "@/actions/fetchCrossword"

export const useCrosswordData = (theme: string, wordCount: number) => {
  return useQuery({
    queryKey: ["crossword"],
    queryFn: () => fetchCrossword(theme, wordCount),
  })
}
