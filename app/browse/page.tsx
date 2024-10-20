import { getCrosswordsBySearchQuery } from "@/db/query";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import ImageCard from "@/components/image-card";
import CrosswordGeneratorCard from "@/components/crossword-generator-card";
import PaginationComponent from "./_components/pagination";

export const dynamic = "force-dynamic";

const supabase = createClient();

export default async function BrowseCrosswords({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const { crosswords, totalPages, currentPage } =
    await getCrosswordsBySearchQuery(page, query);

  return (
    <div className="flex min-h-[90vh] flex-col py-2 sm:px-6 lg:px-8">
      <section className="mx-auto flex flex-1 flex-col items-center sm:px-6 lg:px-8">
        <div className="flex justify-center py-2">
          <PaginationComponent totalPages={totalPages} />
        </div>
        <div className="grid flex-grow auto-rows-fr grid-cols-1 gap-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {crosswords.map((crossword) => {
            const { data } = supabase.storage
              .from("crosswords")
              .getPublicUrl(`${crossword.id}.png`);

            return (
              <Link
                key={crossword.id}
                href={`/crossword/${crossword.id}`}
                className="block h-full"
              >
                <ImageCard
                  theme={crossword.theme}
                  imgUrl={data.publicUrl}
                  username={crossword.createdBy}
                  createdAt={crossword.createdAt}
                  rating={crossword.averageRating}
                />
              </Link>
            );
          })}
          <CrosswordGeneratorCard />
        </div>
        <div className="flex justify-center py-2">
          <PaginationComponent totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
}
