import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface RatingsProps {
  rating?: number;
  onRatingChange?: (newRating: number) => void;
  readonly?: boolean;
}

const Ratings = ({
  rating = 0,
  onRatingChange,
  readonly = false,
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(rating);
  const [isUserRated, setIsUserRated] = useState<boolean>(false); // Track user interaction

  // Update `currentRating` only when `rating` prop changes and user hasn't rated yet
  useEffect(() => {
    if (!isUserRated) {
      setCurrentRating(rating);
    }
  }, [rating, isUserRated]);

  // Determine displayed rating (hover effect takes priority)
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
    partialRating = Math.round(partialRating * 2) / 2; // Round to nearest 0.5
    partialRating = Math.min(Math.max(partialRating, 0), 5); // Clamp between 0 and 5

    setHoverRating(partialRating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(null); // Keep currentRating intact
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
    clickedRating = Math.round(clickedRating * 2) / 2; // Round to nearest 0.5
    clickedRating = Math.min(Math.max(clickedRating, 0), 5); // Clamp between 0 and 5

    setCurrentRating(clickedRating); // Keep the clicked rating permanent
    setIsUserRated(true); // Mark that the user has given a rating
    setHoverRating(null); // Clear hover effect after selection
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

      {/* Numerical Rating Display */}
      <span className="ml-2 text-sm text-gray-600">
        {displayRating.toFixed(1)}
      </span>
    </div>
  );
};

export default Ratings;
