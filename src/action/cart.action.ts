"use server";

import { cartService } from "@/services/cart.service";
import { AddToCartPayload } from "@/types/cart.type";

export const addToCart = async (payload: AddToCartPayload) => {
    return await cartService.addToCart(payload);
};

export const getCart = async () => {
    return await cartService.getCart();
};