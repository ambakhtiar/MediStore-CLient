"use client";

/**
 * Review List Component
 *
 * What it does: Displays multiple reviews in a list
 * Where to use: Medicine details page, My Reviews page
 *
 * Features:
 * - Average rating display
 * - Total review count
 * - List of review cards
 * - Empty state
 */

import { Review } from "@/types/review.type";
import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewListProps {
    reviews: Review[];
    averageRating?: number | null;
    reviewCount?: number;
    showMedicine?: boolean; // Whether to show medicine info in ReviewCard
    title?: string; // Custom title (default: "Reviews")
}

export default function ReviewList({
    reviews,
    averageRating,
    reviewCount,
    showMedicine = false,
    title = "Reviews",
}: ReviewListProps) {
    // Empty state
    if (reviews.length === 0) {
        return (
            <Card>
                <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No reviews yet</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            {/* Header with average rating */}
            {(averageRating || reviewCount) && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            {/* Average Rating */}
                            {averageRating && (
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                                    <div>
                                        <StarRating rating={Math.round(averageRating)} readonly size={20} />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {reviewCount || reviews.length} reviews
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} showMedicine={showMedicine} />
                ))}
            </div>
        </div>
    );
}