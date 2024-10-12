"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCrossword } from "./crossword-provider";
import { useFormState } from "react-dom";
import { validateCrosswordPuzzle } from "@/utils/actions";

type CrosswordValidatorProps = {
  children: React.ReactNode;
};

export default function CrosswordValidator({
  children,
}: CrosswordValidatorProps) {
  const { crosswordId } = useCrossword();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const [gameState, formAction] = useFormState(validateCrosswordPuzzle, {
    message: "",
    success: false,
  });

  useEffect(() => {
    if (gameState.success) {
      setDialogOpen(true);
    } else {
      console.log("gameState", gameState.message);
    }
  }, [gameState]);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleReturn = () => {
    setDialogOpen(false);
    router.push("/");
  };

  return (
    <>
      <form action={formAction} className="contents">
        <input type="hidden" name="crosswordId" value={crosswordId} />
        <Button type="submit">Submit</Button>
        {children}
      </form>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Congratulations! 🧩
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              You&apos;ve completed the crossword puzzle!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-center">
              How would you rate this crossword?
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={handleReturn} className="w-full max-w-xs">
              Return to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
