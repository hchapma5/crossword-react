import { getAllCrosswords, getCrosswordsByTheme } from "@/db/query";

export default async function CrosswordsPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams?.query;

  const crosswords = query
    ? await getCrosswordsByTheme(query)
    : await getAllCrosswords();

  //TODO: Add an additional card for creating a new crossword
  //TODO: Add user authenitcation and rate limiting
  //TODO: Style a car component with a screenshot of the crossword
  //TODO: Add a 5-star rating system to the card

  return (
    <div className="grid w-3/4 grid-cols-5 items-center justify-center gap-4 p-4">
      {crosswords.map((crossword) => (
        <div className="bg-red-200 p-4" key={crossword.id}>
          <h3>{crossword.theme}</h3>
          <p>{crossword.id}</p>
        </div>
      ))}
    </div>
  );
}
