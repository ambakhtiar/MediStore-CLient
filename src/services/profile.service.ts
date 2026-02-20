import { env } from "@/env";
import { ChangePasswordPayload, ProfileData, UpdateProfilePayload } from "@/types";
import { cookies } from "next/headers";

const BASE_URL = env.API_URL;

// GET /api/users/me
async function getProfile(): Promise<ProfileData> {
    const cookieStore = await cookies();

    const res = await fetch(`${BASE_URL}/profile/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
    });

    const json = await res.json();
    if (!res) throw new Error(json.message || "Failed to fetch profile");
    return json.data;
}

// PUT /api/users/me
async function updateProfile(payload: UpdateProfilePayload): Promise<ProfileData> {
    const cookieStore = await cookies();

    const res = await fetch(`${BASE_URL}/profile/me`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res) throw new Error(json.message || "Failed to update profile");
    console.log(res);
    return json.data;
}

// PATCH /api/users/me/password
async function changePassword(payload: ChangePasswordPayload): Promise<void> {
    const cookieStore = await cookies();

    const res = await fetch(`${BASE_URL}/profile/me/password`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
    });

    const json = await res.json();
    console.log(res);
    if (!res) throw new Error(json.message || "Failed to change password");
}

export const profileService = {
    getProfile,
    updateProfile,
    changePassword,
}