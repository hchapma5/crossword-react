import { getCrosswordsBySearchQuery } from "@/db/query";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import ImageCard from "./_components/image-card";
import PaginationComponent from "./_components/pagination";
import CrosswordGeneratorBanner from "./_components/crossword-generator-banner";
import Search from "@/components/ui/search";
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
    <div className="flex min-h-[90vh] flex-col px-4 py-2 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full flex-1 flex-col items-center">
        <div className="flex w-full flex-col items-center justify-between gap-4 py-2 sm:flex-row">
          <Search placeholder="Search for crosswords..." />
          <PaginationComponent totalPages={totalPages} />
        </div>
        <div className="flex w-full flex-col gap-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-500 sm:p-6">
          <div className="col-span-full row-span-1 flex">
            <CrosswordGeneratorBanner />
          </div>
          <div className="grid flex-grow auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
          </div>
        </div>
        <div className="mt-4 flex justify-center py-2">
          <PaginationComponent totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
}
