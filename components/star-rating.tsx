"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  readOnly?: boolean;
  initialRating?: number;
};

const StarRating = forwardRef(
  ({ readOnly = false, initialRating = 0 }: StarRatingProps, ref) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    useImperativeHandle(ref, () => ({
      getRating: () => rating,
      setRating: (newRating: number) => !readOnly && setRating(newRating),
    }));

    const handleMouseEnter = (starIndex: number) => {
      if (!readOnly) setHover(starIndex);
    };

    const handleMouseLeave = () => {
      if (!readOnly) setHover(0);
    };

    const handleClick = (starIndex: number) => {
      if (!readOnly) setRating(starIndex);
    };

    return (
      <div
        className={`flex justify-center space-x-1 ${readOnly ? "pointer-events-none" : ""}`}
      >
        {[1, 2, 3, 4, 5].map((starIndex: number) => (
          <Star
            key={starIndex}
            size={32}
            className={` ${!readOnly && "cursor-pointer"} transition-colors duration-200 ${
              (hover || rating) >= starIndex
                ? "fill-yellow-400 stroke-yellow-400"
                : "fill-none stroke-gray-400"
            } `}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
          />
        ))}
      </div>
    );
  },
);

StarRating.displayName = "StarRating";

export default StarRating;
