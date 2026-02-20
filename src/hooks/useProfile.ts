"use client";

import { useState, useEffect, useCallback } from "react";

import { ChangePasswordPayload, ProfileData, UpdateProfilePayload } from "@/types";
import { changePassword, getProfile, updateProfile } from "@/action/profile.action";

export function useProfile() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProfile();
            setProfile(data);
        } catch (err: unknown) {
            // safe extraction of message
            const message =
                err instanceof Error ? err.message : typeof err === "string" ? err : "Failed to update profile";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleUpdateProfile = async (payload: UpdateProfilePayload) => {
        const updated = await updateProfile(payload);
        setProfile(updated);
        return updated;
    };

    const handleChangePassword = async (payload: ChangePasswordPayload) => {
        await changePassword(payload);
    };

    return {
        profile,
        loading,
        error,
        refetch: fetchProfile,
        handleUpdateProfile,
        handleChangePassword,
    };
}