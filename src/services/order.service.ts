import { env } from "@/env";
import { CreateOrderPayload, OrderApiResponse, OrdersListApiResponse } from "@/types/order.type";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

/**
 * Order Service
 * Handles all order-related API calls
 */

/**
 * Create a new order from cart items
 * POST /api/orders
 */
const createOrder = async (payload: CreateOrderPayload): Promise<OrderApiResponse> => {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${API_URL}/orders`, {
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
                error: { message: body?.message ?? "Failed to create order" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("order.service.createOrder error:", err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: { message: "Network error" }
        };
    }
};

/**
 * Get all orders for the current user
 * GET /api/orders
 */
const getOrders = async (): Promise<OrdersListApiResponse> => {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${API_URL}/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            credentials: "include",
            cache: "no-store", // Always fetch fresh data
        });

        const body = await res.json().catch(() => null);

        if (!res.ok) {
            return {
                ok: false,
                status: res.status,
                data: null,
                error: { message: body?.message ?? "Failed to fetch orders" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("order.service.getOrders error:", err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: { message: "Network error" }
        };
    }
};

/**
 * Get a single order by ID
 * GET /api/orders/:id
 */
const getOrder = async (orderId: string): Promise<OrderApiResponse> => {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${API_URL}/orders/${orderId}`, {
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
                error: { message: body?.message ?? "Failed to fetch order" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("order.service.getOrder error:", err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: { message: "Network error" }
        };
    }
};

/**
 * Cancel an order (customer)
 * PATCH /api/orders/:id/cancel
 */
const cancelOrder = async (orderId: string): Promise<OrderApiResponse> => {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
            method: "PATCH",
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
                error: { message: body?.message ?? "Failed to cancel order" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("order.service.cancelOrder error:", err);
        return {
            ok: false,
            status: 0,
            data: null,
            error: { message: "Network error" }
        };
    }
};

export const orderService = {
    createOrder,
    getOrders,
    getOrder,
    cancelOrder,
};