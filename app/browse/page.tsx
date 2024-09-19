import Search from "@/components/ui/search";
import { getAllCrosswords } from "@/db/query";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import ImageCard from "@/components/image-card";
import CrosswordGeneratorCard from "@/components/crossword-generator-card";
import Navbar from "@/components/navbar";

const supabase = createClient();

export default async function BrowseCrosswords({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const crosswords = await getAllCrosswords();

  const filteredCrosswords = crosswords.filter(
    (crossword) =>
      crossword.theme.toLowerCase().includes(query.toLowerCase()) ||
      crossword.username.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="bg-gray-100 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredCrosswords.map((crossword) => {
            const { data } = supabase.storage
              .from("crosswords")
              .getPublicUrl(`${crossword.id}.png`);

            return (
              <Link
                key={crossword.id}
                href={`/crossword/${crossword.id}`}
                className="full block"
              >
                <ImageCard
                  theme={crossword.theme}
                  imgUrl={data.publicUrl}
                  username={crossword.username}
                  createdAt={crossword.createdAt}
                />
              </Link>
            );
          })}
          <CrosswordGeneratorCard />
        </div>
      </section>
    </div>
  );
}
