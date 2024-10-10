"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Clue } from "@/types/types";
import CrosswordCongratulations from "./crossword-congrats";
import { Button } from "./ui/button";

type CrosswordContextType = {
  crosswordId: string;
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
  theme: string;
  clues: Array<Clue>;
  inputRefs: React.MutableRefObject<Map<string, HTMLInputElement>>;
  navigation: Array<Array<string>>;
  positions: Map<
    string,
    { indices: { wordIndex: number; letterIndex: number }[]; id?: number }
  >;
  moveToNextPosition: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setInputRef: (position: string) => (el: HTMLInputElement | null) => void;
  rows: number;
  cols: number;
  isMobile: boolean;
};

const CrosswordContext = createContext<CrosswordContextType | undefined>(
  undefined,
);

type CrosswordProviderProps = {
  children: React.ReactNode;
  crosswordId: string;
  clues: Array<Clue>;
  theme: string;
  navigation: Array<Array<string>>;
  positions: Map<
    string,
    { indices: { wordIndex: number; letterIndex: number }[]; id?: number }
  >;
  rows: number;
  cols: number;
};

export const CrosswordProvider: React.FC<CrosswordProviderProps> = ({
  children,
  crosswordId,
  clues,
  theme,
  navigation,
  positions,
  rows,
  cols,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCluesCollapsed, setIsCluesCollapsed] = useState<boolean>(false);
  const [currentClue, setCurrentClue] = useState<string>(
    `${clues[0].id} ${clues[0].direction} : ${clues[0].clue} (${clues[0].length})`,
  );
  const [currentPosition, setCurrentPosition] = useState({
    wordIndex: 0,
    letterIndex: 0,
  });
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const moveToNextPosition = useCallback(() => {
    setCurrentPosition((prev) => {
      if (prev.letterIndex < navigation[prev.wordIndex].length - 1) {
        return { ...prev, letterIndex: prev.letterIndex + 1 };
      } else if (prev.wordIndex < navigation.length - 1) {
        return { wordIndex: prev.wordIndex + 1, letterIndex: 0 };
      }
      return prev;
    });
  }, [navigation]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase();
      e.target.value = value.match(/^[A-Z]$/) ? value : "";
      if (value) moveToNextPosition();
    },
    [moveToNextPosition],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      const position = positions.get(e.currentTarget.id)!.indices;
      const { wordIndex, letterIndex } =
        position[0].wordIndex === currentPosition.wordIndex && position[1]
          ? position[1]
          : position[0];
      setCurrentPosition({
        wordIndex: wordIndex,
        letterIndex: letterIndex,
      });
    },
    [currentPosition, positions],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Backspace":
          e.preventDefault();
          e.currentTarget.value = "";
          setCurrentPosition((prev) => ({
            ...prev,
            letterIndex: Math.max(0, prev.letterIndex - 1),
          }));
          break;
        case "Tab":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            letterIndex: e.shiftKey
              ? Math.max(0, prev.letterIndex - 1)
              : Math.min(
                  navigation[prev.wordIndex].length - 1,
                  prev.letterIndex + 1,
                ),
          }));
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          e.preventDefault();
          const [currentRow, currentCol] = e.currentTarget.id
            .split(",")
            .map(Number);
          let nextRow = currentRow;
          let nextCol = currentCol;

          switch (e.key) {
            case "ArrowUp":
              nextRow = Math.max(0, currentRow - 1);
              break;
            case "ArrowDown":
              nextRow = Math.min(rows - 1, currentRow + 1);
              break;
            case "ArrowLeft":
              nextCol = Math.max(0, currentCol - 1);
              break;
            case "ArrowRight":
              nextCol = Math.min(cols - 1, currentCol + 1);
              break;
          }

          const nextCellId = `${nextRow},${nextCol}`;
          const nextCell = document.getElementById(
            nextCellId,
          ) as HTMLInputElement;
          if (nextCell) {
            handleClick({
              currentTarget: nextCell,
            } as React.MouseEvent<HTMLInputElement>);
          }
          break;
        case " ":
          e.preventDefault();
          break;
      }
    },
    [navigation, rows, cols, handleClick],
  );

  const setInputRef = useCallback(
    (position: string) => (el: HTMLInputElement | null) => {
      if (el && inputRefs.current) {
        inputRefs.current.set(position, el);
      }
    },
    [],
  );

  useEffect(() => {
    const selectedCell =
      navigation[currentPosition.wordIndex][currentPosition.letterIndex];
    inputRefs.current.get(selectedCell)?.focus();
  }, [currentPosition, navigation]);

  useEffect(() => {
    const id = currentPosition.wordIndex;
    const formattedClue = `${id + 1} ${clues[id].direction.charAt(0).toUpperCase() + clues[id].direction.slice(1)} : ${
      clues[id].clue
    } (${clues[id].length})`;
    setCurrentClue(formattedClue);
  }, [currentPosition, setCurrentClue, clues]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <CrosswordContext.Provider
      value={{
        isCluesCollapsed,
        setIsCluesCollapsed,
        currentClue,
        setCurrentClue,
        currentPosition,
        setCurrentPosition,
        clues,
        inputRefs,
        navigation,
        positions,
        moveToNextPosition,
        handleInputChange,
        handleClick,
        handleKeyDown,
        setInputRef,
        rows,
        cols,
        isMobile,
        theme,
        crosswordId,
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
