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
import {
  addRatingAction,
  getUserRatingAction,
  updateRatingAction,
  validateCrosswordPuzzle,
} from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import StarRating from "@/components/star-rating";

type CrosswordValidatorProps = {
  children: React.ReactNode;
};

export default function CrosswordValidator({
  children,
}: CrosswordValidatorProps) {
  const { crosswordId } = useCrossword();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialRating, setInitialRating] = useState<number | undefined>(
    undefined,
  );
  const router = useRouter();
  const { userId } = useAuth();

  const formRef = useRef<HTMLFormElement>(null);
  const ratingRef = useRef<{ getRating: () => number } | null>(null);

  const [gameState, formAction] = useFormState(validateCrosswordPuzzle, {
    message: "",
    success: false,
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    // If the user has already rated the crossword, set initial rating
    const fetchRating = async () => {
      const rating = await getUserRatingAction(crosswordId, userId!);
      if (rating) {
        setInitialRating(rating.rating);
      }
    };
    fetchRating();
  }, [crosswordId, userId]);

  useEffect(() => {
    if (gameState.success) {
      setDialogOpen(true);
    } else {
      console.log("gameState", gameState.message);
    }
  }, [gameState]);

  useEffect(() => {
    if (isFormComplete && formRef.current) {
      formRef.current.requestSubmit();
    }
  }, [isFormComplete]);

  const checkFormCompletion = () => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll('input[type="text"]');
      const allFilled = Array.from(inputs).every(
        (input) => (input as HTMLInputElement).value.length > 0,
      );
      setIsFormComplete(allFilled);
    }
  };

  // If the user has rated the crossword, add the rating to the database
  const handleReturn = async () => {
    const rating = ratingRef.current?.getRating();

    if (initialRating && rating && initialRating !== rating) {
      await updateRatingAction(rating, crosswordId, userId!);
    } else if (!initialRating && rating) {
      await addRatingAction(rating, crosswordId, userId!);
    }
    setDialogOpen(false);
    router.push("/");
  };

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        className="contents"
        onChange={checkFormCompletion}
      >
        <input type="hidden" name="crosswordId" value={crosswordId} />
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
            <StarRating ref={ratingRef} initialRating={initialRating} />
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
