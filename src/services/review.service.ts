import { env } from "@/env";
import {
    CreateReviewPayload,
    ReviewApiResponse,
    ReviewsListApiResponse,
    DeliveredMedicinesApiResponse
} from "@/types/review.type";
import { cookies } from "next/headers";

const API_URL = env.API_URL;


const createReview = async (
    medicineId: string,
    payload: CreateReviewPayload
): Promise<ReviewApiResponse> => {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${API_URL}/reviews/medicines/${medicineId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(payload),
            credentials: "include",
        });

        const body = await res.json().catch(() => null);

        if (!res.ok) {
            return {
                ok: false,
                status: res.status,
                data: null,
                error: { message: body?.message ?? "Review তৈরি করা যায়নি" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("review.service.createReview error:", err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: { message: "Network error" }
        };
    }
};


const getReviewsByMedicine = async (
    medicineId: string
): Promise<ReviewsListApiResponse> => {
    try {
        const res = await fetch(`${API_URL}/reviews/medicines/${medicineId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Always fetch fresh reviews
        });

        const body = await res.json().catch(() => null);

        if (!res.ok) {
            return {
                ok: false,
                status: res.status,
                data: null,
                error: { message: body?.message ?? "Reviews আনা যায়নি" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("review.service.getReviewsByMedicine error:", err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: { message: "Network error" }
        };
    }
};


const getReviewsByUser = async (
    userId: string
): Promise<ReviewsListApiResponse> => {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${API_URL}/reviews/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            credentials: "include",
            cache: "no-store",
        });

        const body = await res.json().catch(() => null);

        if (!res.ok) {
            return {
                ok: false,
                status: res.status,
                data: null,
                error: { message: body?.message ?? "Reviews আনা যায়নি" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("review.service.getReviewsByUser error:", err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: { message: "Network error" }
        };
    }
};


const getDeliveredMedicinesForReview = async (): Promise<DeliveredMedicinesApiResponse> => {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${API_URL}/orders/delivered-medicines`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            credentials: "include",
            cache: "no-store",
        });

        const body = await res.json().catch(() => null);

        if (!res.ok) {
            return {
                ok: false,
                status: res.status,
                data: null,
                error: { message: body?.message ?? "Medicines আনা যায়নি" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("review.service.getDeliveredMedicinesForReview error:", err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: { message: "Network error" }
        };
    }
};


const deleteReview = async (reviewId: string): Promise<ReviewApiResponse> => {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            credentials: "include",
        });

        const body = await res.json().catch(() => null);

        if (!res.ok) {
            return {
                ok: false,
                status: res.status,
                data: null,
                error: { message: body?.message ?? "Review delete করা যায়নি" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("review.service.deleteReview error:", err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: { message: "Network error" }
        };
    }
};



export const reviewService = {
    createReview,
    getReviewsByMedicine,
    getReviewsByUser,
    getDeliveredMedicinesForReview,
    deleteReview,
};