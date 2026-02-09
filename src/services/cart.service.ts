import { env } from "@/env";
import { AddToCartPayload, ClientApiResult } from "@/types/cart.type";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const addToCart = async (payload: AddToCartPayload): Promise<ClientApiResult> => {
    const cookieStore = await cookies();
    try {
        const res = await fetch(`${API_URL}/cart/items`, {
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
                error: { message: body?.message ?? "Request failed" },
            };
        }

        return {
            ok: true,
            status: res.status,
            data: body?.data ?? body ?? null,
            error: null,
        };
    } catch (err) {
        console.error("cart.client.addToCart error:", err);
        return { ok: false, status: 0, data: null, error: { message: "Network error" } };
    }
}

const getCart = async () => {
    try {
        const cookieStore = await cookies();
        const res = fetch(`${API_URL}/cart`, {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString(),
            },
        })

        const data = (await res).json();
        if (!data) {
            return {
                data: null, error: { message: "Cart not found" },
            };
        }

        return { data, error: null };
    } catch (err) {
        console.log(err);
        return {
            data: null, error: { message: "Cart not found" },
        };
    }
}


export const cartService = {
    addToCart,
    getCart,
}