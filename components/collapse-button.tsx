"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCrossword } from "./crossword-provider";
import { Button } from "./ui/button";

export default function CollapseButton() {
  const { isCluesCollapsed, setIsCluesCollapsed, isMobile } = useCrossword();

  return (
    <>
      {!isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 transform md:flex"
          onClick={() => setIsCluesCollapsed(!isCluesCollapsed)}
        >
          {isCluesCollapsed ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </Button>
      )}
    </>
  );
}
