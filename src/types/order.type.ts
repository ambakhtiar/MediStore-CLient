// Order Types
export type OrderStatus =
    | "PLACED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

export interface OrderItem {
    id: string;
    orderId: string;
    medicineId: string;
    quantity: number;
    unitPrice: number;
    orderItemStatus: OrderStatus;
    createdAt: string;
    updatedAt: string;
    medicine: {
        id: string;
        name: string;
        imageUrl?: string | null;
        genericName?: string | null;
        manufacturer?: string | null;
    };
}

export interface Order {
    id: string;
    userId: string;
    total: number;
    status: OrderStatus;
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
}

// Create Order Request
export interface CreateOrderPayload {
    shippingName: string;
    shippingPhone: string;
    shippingAddress: string;
}

// API Response Types
export interface OrderApiResponse {
    ok: boolean;
    status: number;
    data?: {
        message?: string;
        data?: Order;
    } | null;
    error?: {
        message: string;
    } | null;
}

export interface OrdersListApiResponse {
    ok: boolean;
    status: number;
    data?: {
        message?: string;
        data?: Order[];
    } | null;
    error?: {
        message: string;
    } | null;
}