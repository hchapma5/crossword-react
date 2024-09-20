"use client";

import { checkIfThumbnailExists } from "@/db/storage";
import React, { createContext, useState, useContext, useEffect } from "react";

type CrosswordContextType = {
  isCluesCollapsed: boolean;
  setIsCluesCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  currentClue: string;
  setCurrentClue: React.Dispatch<React.SetStateAction<string>>;
  currentPosition: {
    wordIndex: number;
    letterIndex: number;
  };
  setCurrentPosition: React.Dispatch<
    React.SetStateAction<{
      wordIndex: number;
      letterIndex: number;
    }>
  >;
};

const CrosswordContext = createContext<CrosswordContextType | undefined>(
  undefined,
);

export const CrosswordProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isCluesCollapsed, setIsCluesCollapsed] = useState(false);
  const [currentClue, setCurrentClue] = useState("");
  const [currentPosition, setCurrentPosition] = useState({
    wordIndex: 0,
    letterIndex: 0,
  });

  return (
    <CrosswordContext.Provider
      value={{
        isCluesCollapsed,
        setIsCluesCollapsed,
        currentClue,
        setCurrentClue,
        currentPosition,
        setCurrentPosition,
      }}
    >
      {children}
    </CrosswordContext.Provider>
  );
};

export const useCrossword = () => {
  const context = useContext(CrosswordContext);
  if (context === undefined) {
    throw new Error("useCrossword must be used within a CrosswordProvider");
  }
  return context;
};
