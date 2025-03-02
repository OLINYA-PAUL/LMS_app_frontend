import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface RatingsProps {
  rating?: number;
  onRatingChange?: (newRating: number) => void;
  readonly?: boolean;
}

const Ratings = ({
  rating,
  onRatingChange,
  readonly = false,
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(rating ?? 0);

  // Update currentRating only if the component is controlled (rating prop is provided)
  useEffect(() => {
    if (rating !== undefined) {
      setCurrentRating(rating);
    }
  }, [rating]);

  const displayRating = hoverRating ?? currentRating;

  const handleMouseMove = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (readonly) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const position = event.clientX - rect.left;
    const percentage = position / rect.width;

    let partialRating = index + percentage;
    partialRating = Math.round(partialRating * 2) / 2;
    partialRating = Math.min(Math.max(partialRating, 0), 5);

    setHoverRating(partialRating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(null);
  };

  const handleClick = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (readonly || !onRatingChange) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const position = event.clientX - rect.left;
    const percentage = position / rect.width;

    let clickedRating = index + percentage;
    clickedRating = Math.round(clickedRating * 2) / 2;
    clickedRating = Math.min(Math.max(clickedRating, 0), 5);

    setCurrentRating(clickedRating);
    setHoverRating(null);
    onRatingChange(clickedRating);
  };

  return (
    <div
      className={`flex items-center gap-1 ${readonly ? "" : "cursor-pointer"}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          const isFull = starValue <= displayRating;
          const isPartial =
            starValue - 1 < displayRating && starValue > displayRating;
          const partialWidth = isPartial
            ? `${(displayRating % 1) * 100}%`
            : "0%";

          return (
            <div
              key={index}
              className="relative"
              onMouseMove={(e) => handleMouseMove(index, e)}
              onClick={(e) => handleClick(index, e)}
            >
              <Star
                className={`transition-colors ${
                  isFull ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
                size={20}
              />
              {isPartial && (
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: partialWidth }}
                >
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <span className="ml-2 text-sm text-gray-600">
        {displayRating.toFixed(1)}
      </span>
    </div>
  );
};

export default Ratings;
