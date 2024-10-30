"use client";

import { useCrossword } from "./crossword-provider";

export default function CrosswordActiveClue() {
  const { currentClue, isCluesCollapsed } = useCrossword();

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-primary p-6 text-primary-foreground transition-all duration-300 ease-in-out ${
        isCluesCollapsed ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="w-fit flex-grow text-wrap text-center">{currentClue}</p>
      </div>
    </div>
  );
}
