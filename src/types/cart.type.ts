export type AddToCartPayload = {
    medicineId: string;
    quantity: number;
};

export type ClientApiResult<T = unknown> = {
    ok: boolean;
    status: number;
    data?: T | null;
    error?: { message: string } | null;
};