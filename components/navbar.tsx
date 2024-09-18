import Search from "./ui/search";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Crossword Puzzles
          </h1>
          <div className="w-full max-w-xs">
            <Search placeholder="Search for crosswords..." />
          </div>
        </div>
      </div>
    </nav>
  );
}
