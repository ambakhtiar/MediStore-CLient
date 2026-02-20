"use client";


import { Review } from "@/types/review.type";
import StarRating from "./StarRating";
import { formatDistanceToNow } from "date-fns";
import { bn } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewCardProps {
    review: Review;
    showMedicine?: boolean;
}

export default function ReviewCard({ review, showMedicine = false }: ReviewCardProps) {
    // User initials (for Avatar fallback)
    const userInitials = review.user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U";

    return (
        <Card className="mb-4">
            <CardContent className="pt-6">
                {/* Header: User info + Rating */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        {/* User Avatar */}
                        <Avatar>
                            <AvatarImage src={review.user?.image || undefined} />
                            <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>

                        <div>
                            {/* User Name */}
                            <p className="font-semibold">{review.user?.name || "Anonymous"}</p>

                            {/* Date */}
                            <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(review.createdAt), {
                                    addSuffix: true,
                                    locale: bn,
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Star Rating */}
                    <StarRating rating={review.rating} readonly size={20} />
                </div>

                {/* Medicine Info */}
                {showMedicine && review.medicine && (
                    <div className="mb-3 flex items-center gap-2">
                        {review.medicine.imageUrl && (
                            <img
                                src={review.medicine.imageUrl}
                                alt={review.medicine.name}
                                className="h-10 w-10 rounded object-cover"
                            />
                        )}
                        <div>
                            <p className="text-sm font-medium">{review.medicine.name}</p>
                            {review.medicine.genericName && (
                                <p className="text-xs text-muted-foreground">
                                    {review.medicine.genericName}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Comment */}
                {review.comment && (
                    <p className="text-sm text-foreground leading-relaxed mb-2">
                        {review.comment}
                    </p>
                )}

                {/* Verified Purchase Badge (future feature) */}
                {/* <Badge variant="secondary" className="text-xs">
                    ✓ Verified Purchase
                </Badge> */}
            </CardContent>
        </Card>
    );
}