"use server";

import { orderService } from "@/services/order.service";
import { CreateOrderPayload } from "@/types/order.type";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Create Order Action
 * - Creates order from cart items
 * - Revalidates cart (will be empty after order)
 * - Revalidates orders list
 */
export const createOrder = async (payload: CreateOrderPayload) => {
    const result = await orderService.createOrder(payload);

    if (result.ok) {
        // Cart will be cleared by backend, so revalidate cart
        revalidateTag("CartAdd", "tag");

        // Revalidate orders list page
        revalidatePath("/orders");
    }

    return result;
};

/**
 * Get Orders Action
 * Fetches all orders for current user
 */
export const getOrders = async () => {
    return await orderService.getOrders();
};

/**
 * Get Single Order Action
 * Fetches a single order by ID
 */
export const getOrder = async (orderId: string) => {
    return await orderService.getOrder(orderId);
};

/**
 * Cancel Order Action
 * - Cancels the order
 * - Revalidates orders list
 */
export const cancelOrder = async (orderId: string) => {
    const result = await orderService.cancelOrder(orderId);

    if (result.ok) {
        // Revalidate orders list
        revalidatePath("/orders");
        revalidatePath(`/orders/${orderId}`);
    }

    return result;
};