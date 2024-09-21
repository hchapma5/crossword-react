"use client";

import { useCrossword } from "./crossword-provider";

export default function CrosswordCluesContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCluesCollapsed, isMobile } = useCrossword();

  return (
    <div
      className={`overflow-y-auto bg-card transition-all duration-300 ease-in-out ${
        isCluesCollapsed
          ? isMobile
            ? "fixed inset-x-0 top-0 z-10 h-1/2 -translate-y-full transform"
            : "w-0 overflow-hidden"
          : isMobile
            ? "h-1/2"
            : "max-h-screen w-full"
      }`}
    >
      {children}
    </div>
  );
}
