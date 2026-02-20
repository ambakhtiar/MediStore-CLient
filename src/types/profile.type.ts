export type ProfileData = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    image?: string | null;
    role: string;
    emailVerified: boolean;
    createdAt: string;
};

export type UpdateProfilePayload = {
    name?: string;
    phone?: string;
    image?: string;
};

export type ChangePasswordPayload = {
    currentPassword: string;
    newPassword: string;
    revokeOtherSessions?: boolean;
};