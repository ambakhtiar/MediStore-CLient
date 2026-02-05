// models.ts
export type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    phone: string | null;
    role: "CUSTOMER" | "SELLER" | string;
    status: "UNBAN" | "BAN" | string;
    createdAt: string; // ISO timestamp
    updatedAt: string; // ISO timestamp
};

export type SessionPayload = {
    id: string;
    userId: string;
    token: string;
    userAgent?: string | null;
    ipAddress?: string | null;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
    // include other fields you expect
    user?: User;
};

export type SessionWithUser = {
    session: SessionPayload;
    user: User;
};

export type ApiResponse<T = unknown> = {
    data?: T | null;
    error?: unknown;
} | null;
