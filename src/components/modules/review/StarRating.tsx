"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    onChange?: (rating: number) => void;
    readonly?: boolean;
    size?: number;
}

export default function StarRating({
    rating,
    onChange,
    readonly = false,
    size = 24
}: StarRatingProps) {

    const handleClick = (value: number) => {
        if (!readonly && onChange) {
            onChange(value);
        }
    };

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= rating;

                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleClick(star)}
                        disabled={readonly}
                        className={`
                            transition-all
                            ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                            disabled:cursor-default
                        `}
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    >
                        <Star
                            size={size}
                            className={`
                                ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                transition-colors
                            `}
                        />
                    </button>
                );
            })}

            {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-muted-foreground">
                    {rating}/5
                </span>
            )}
        </div>
    );
}