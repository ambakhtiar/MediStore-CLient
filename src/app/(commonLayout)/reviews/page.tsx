"use client";

/**
 * Reviews Hub Page
 * Path: src/app/reviews/page.tsx
 *
 * What it does: Central hub for managing user's reviews
 *
 * Features:
 * - 2 Tabs: "Pending Reviews" and "My Reviews"
 * - Tab 1: Delivered products that don't have a review yet
 * - Tab 2: Already reviewed products
 */

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDeliveredMedicinesForReview, getReviewsByUser } from "@/action/review.action";
import { DeliveredMedicine, Review } from "@/types/review.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReviewList from "@/components/modules/review/ReviewList";
import Image from "next/image";

export default function ReviewsHubPage() {
    const searchParams = useSearchParams();
    const defaultTab = searchParams.get("tab") || "pending";

    const [pendingMedicines, setPendingMedicines] = useState<DeliveredMedicine[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [pendingRes, reviewsRes] = await Promise.all([
                    getDeliveredMedicinesForReview(),
                    getReviewsByUser("current"), // Backend will get current user
                ]);

                if (pendingRes.ok && pendingRes.data?.data) {
                    setPendingMedicines(pendingRes.data.data);
                }

                if (reviewsRes.ok && reviewsRes.data?.data?.reviews) {
                    setMyReviews(reviewsRes.data.data.reviews);
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="max-w-4xl mx-auto p-6">
                <div className="text-center py-12">
                    <p>Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
                <p className="text-muted-foreground">Write and manage your product reviews</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pending">Pending Reviews ({pendingMedicines.length})</TabsTrigger>
                    <TabsTrigger value="my-reviews">My Reviews ({myReviews.length})</TabsTrigger>
                </TabsList>

                {/* Tab 1: Pending Reviews */}
                <TabsContent value="pending" className="mt-6">
                    {pendingMedicines.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-muted-foreground">No products to review</p>
                                <Link href="/shop" className="mt-4 inline-block">
                                    <Button variant="outline">Shop Now</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {pendingMedicines.map((medicine) => (
                                <Card key={medicine.medicineId}>
                                    <CardContent className="p-4 flex items-center gap-4">
                                        {/* Medicine Image */}
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                            {medicine.medicineImage ? (
                                                <Image
                                                    src={medicine.medicineImage}
                                                    alt={medicine.medicineName}
                                                    width={64}
                                                    height={64}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                                    <span className="text-xs text-gray-400">No Image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Medicine Info */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{medicine.medicineName}</h3>
                                            {medicine.genericName && (
                                                <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
                                            )}
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Delivered from Order #{medicine.orderId.slice(0, 8)}
                                            </p>
                                        </div>

                                        {/* Review Button */}
                                        <Link href={`/reviews/create/${medicine.medicineId}`}>
                                            <Button>Write Review</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Tab 2: My Reviews */}
                <TabsContent value="my-reviews" className="mt-6">
                    <ReviewList reviews={myReviews} showMedicine={true} title="My Reviews" />
                </TabsContent>
            </Tabs>
        </main>
    );
}