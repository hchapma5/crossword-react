import Search from "@/components/ui/search";
import { getAllCrosswords } from "@/db/query";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const supabase = createClient();

export default async function BrowseCrosswords({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const crosswords = await getAllCrosswords();

  //TODO: Add an additional card for creating a new crossword
  //TODO: Add user authenitcation and rate limiting
  //TODO: Style a car component with a screenshot of the crossword
  //TODO: Add a 5-star rating system to the card
  //TODO: Migrate some code to layout.tsx and a navigation component

  const filteredCrosswords = crosswords.filter((crossword) =>
    crossword.theme.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Crosswords</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search for Crosswords..." />
      </div>
      <div className="flex flex-wrap gap-12 p-4">
        {filteredCrosswords.map((crossword) => {
          const { data } = supabase.storage
            .from("crosswords")
            .getPublicUrl(`${crossword.id}.png`);

          return (
            <div key={crossword.id} className="mb-4 flex size-48 flex-col">
              <Link href={`/crossword/${crossword.id}`}>
                <div className="border-2 border-black">
                  <h2 className="text-center text-lg font-semibold">
                    {crossword.theme}
                  </h2>
                  <img
                    src={data.publicUrl}
                    alt="crossword thumbnail"
                    width={200}
                    height={200}
                  />
                </div>
              </Link>
            </div>
          );
        })}
        {/* Place a `generate crossword` card here */}
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        {<Table query={query} currentPage={currentPage} />}
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
