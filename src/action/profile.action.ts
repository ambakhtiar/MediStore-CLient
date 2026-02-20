"use server";

import { profileService } from "@/services/profile.service";
import { ChangePasswordPayload, UpdateProfilePayload } from "@/types";
import { updateTag } from "next/cache";

export const getProfile = async () => {
    const result = await profileService.getProfile();
    return result;
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
    const result = await profileService.updateProfile(payload);
    updateTag("profileAdd");
    return result;
}

export const changePassword = async (payload: ChangePasswordPayload) => {
    const result = await profileService.changePassword(payload);
    updateTag("profileAdd");
    return result;
}