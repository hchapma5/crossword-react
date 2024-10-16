"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import { addRatingAction, validateCrosswordPuzzle } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import StarRating from "./star-rating";

type CrosswordValidatorProps = {
  children: React.ReactNode;
};

export default function CrosswordValidator({
  children,
}: CrosswordValidatorProps) {
  const { crosswordId } = useCrossword();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();

  const ratingRef = useRef<{ getRating: () => number } | null>(null);

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

  // If the user has rated the crossword, add the rating to the database
  const handleReturn = async () => {
    const rating = ratingRef.current?.getRating();
    if (rating) {
      console.log("rating from handleReturn", rating);
      await addRatingAction(rating, crosswordId, userId!);
    }
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
            <StarRating ref={ratingRef} />
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
