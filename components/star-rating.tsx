"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  readOnlyRating?: number;
}
export default function StarRating({ readOnlyRating }: StarRatingProps) {
  const [rating, setRating] = useState(readOnlyRating ?? 0);

  //TODO: Add logic for hovering over stars

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={rating}
          className={`h-6 w-6 ${
            rating >= value
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          } ${!readOnlyRating ? "cursor-pointer" : "disabled"}`}
          onClick={() => {
            if (!readOnlyRating) {
              setRating(rating);
            }
          }}
        />
      ))}
    </div>
  );
}
