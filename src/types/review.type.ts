// Review Types

export interface Review {
    id: string;
    userId: string;
    medicineId: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
    user?: {
        id: string;
        name: string;
        image?: string | null;
    };
    medicine?: {
        id: string;
        name: string;
        imageUrl?: string | null;
        genericName?: string | null;
    };
}

export interface CreateReviewPayload {
    rating: number;
    comment?: string;
}

export interface ReviewApiResponse {
    ok: boolean;
    status: number;
    data?: {
        message?: string;
        data?: {
            review: Review;
            meta?: {
                averageRating: number | null;
                reviewCount: number;
            };
        };
    } | null;
    error?: {
        message: string;
    } | null;
}

export interface ReviewsListApiResponse {
    ok: boolean;
    status: number;
    data?: {
        message?: string;
        data?: {
            reviews: Review[];
            meta?: {
                averageRating: number | null;
                reviewCount: number;
            };
        };
    } | null;
    error?: {
        message: string;
    } | null;
}

// Delivered Medicine for Review
export interface DeliveredMedicine {
    medicineId: string;
    medicineName: string;
    medicineImage?: string | null;
    genericName?: string | null;
    orderId: string;
    orderDate: string;
}

export interface DeliveredMedicinesApiResponse {
    ok: boolean;
    status: number;
    data?: {
        message?: string;
        data?: DeliveredMedicine[];
    } | null;
    error?: {
        message: string;
    } | null;
}