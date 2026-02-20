"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Loader2, Pencil, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ProfileData, UpdateProfilePayload } from "@/types";

interface ProfileInfoCardProps {
    profile: ProfileData;
    onUpdate: (payload: UpdateProfilePayload) => Promise<ProfileData>;
}

export function ProfileInfoCard({ profile, onUpdate }: ProfileInfoCardProps) {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: profile.name,
        phone: profile.phone ?? "",
        image: profile.image ?? "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const payload: UpdateProfilePayload = {
                name: form.name,
                phone: form.phone || undefined,
                image: form.image || undefined,
            };
            await onUpdate(payload);
            toast.success("Profile updated successfully!");
            setEditing(false);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : typeof err === "string" ? err : "Failed to update profile";
            toast.error(message);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setForm({
            name: profile.name,
            phone: profile.phone ?? "",
            image: profile.image ?? "",
        });
        setEditing(false);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Personal Information</CardTitle>
                {!editing && (
                    <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                    </Button>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border flex items-center justify-center shrink-0">
                        {(editing ? form.image : profile.image) ? (
                            <Image
                                src={editing ? form.image : profile.image!}
                                alt={profile.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <User className="w-8 h-8 text-gray-400" />
                        )}
                        {editing && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Camera className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-300">{profile.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{profile.role.toLowerCase()}</p>
                        {profile.emailVerified && (
                            <span className="text-xs text-green-600 font-medium">✓ Email Verified</span>
                        )}
                    </div>
                </div>

                {/* Image URL Input (editing mode) */}
                {editing && (
                    <div className="space-y-1">
                        <Label htmlFor="image">Profile Image URL</Label>
                        <Input
                            id="image"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="https://example.com/avatar.jpg"
                        />
                        <p className="text-xs text-muted-foreground">Paste a direct image URL</p>
                    </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    {editing ? (
                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                        />
                    ) : (
                        <p className="text-sm text-gray-700 py-2 dark:text-gray-300">{profile.name || "—"}</p>
                    )}
                </div>

                {/* Email (read-only always) */}
                <div className="space-y-1">
                    <Label>Email Address</Label>
                    <p className="text-sm text-gray-500 py-2 dark:text-gray-300">{profile.email}</p>
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    {editing ? (
                        <Input
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+880 1700-000000"
                        />
                    ) : (
                        <p className="text-sm text-gray-700 py-2 dark:text-gray-300">{profile.phone || "—"}</p>
                    )}
                </div>

                {/* Action Buttons */}
                {editing && (
                    <div className="flex gap-3 pt-2">
                        <Button onClick={handleSave} disabled={saving}>
                            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancel} disabled={saving}>
                            Cancel
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}