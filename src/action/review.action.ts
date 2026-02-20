"use server";

import { reviewService } from "@/services/review.service";
import { CreateReviewPayload } from "@/types/review.type";
import { revalidatePath } from "next/cache";


export const createReview = async (medicineId: string, payload: CreateReviewPayload) => {
    const result = await reviewService.createReview(medicineId, payload);

    if (result.ok) {
        // Reviews page revalidate 
        revalidatePath("/reviews");

        // Medicine details page revalidate (যেখানে reviews দেখায়)
        revalidatePath(`/medicine/${medicineId}`);
    }

    return result;
};


export const getReviewsByMedicine = async (medicineId: string) => {
    return await reviewService.getReviewsByMedicine(medicineId);
};


export const getReviewsByUser = async (userId: string) => {
    return await reviewService.getReviewsByUser(userId);
};


export const getDeliveredMedicinesForReview = async () => {
    return await reviewService.getDeliveredMedicinesForReview();
};


export const deleteReview = async (reviewId: string) => {
    const result = await reviewService.deleteReview(reviewId);

    if (result.ok) {
        // Reviews page revalidate 
        revalidatePath("/reviews");
    }

    return result;
};