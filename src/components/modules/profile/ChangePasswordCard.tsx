"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ChangePasswordPayload } from "@/types";

interface ChangePasswordCardProps {
    onChangePassword: (payload: ChangePasswordPayload) => Promise<void>;
}

type VisibilityState = {
    current: boolean;
    newPass: boolean;
    confirm: boolean;
};

export function ChangePasswordCard({ onChangePassword }: ChangePasswordCardProps) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [show, setShow] = useState<VisibilityState>({
        current: false,
        newPass: false,
        confirm: false,
    });

    const toggleShow = (field: keyof VisibilityState) => {
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.newPassword.length < 8) {
            toast.error("New password must be at least 8 characters");
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (form.newPassword === form.currentPassword) {
            toast.error("New password must be different from current password");
            return;
        }

        try {
            setLoading(true);
            await onChangePassword({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
                revokeOtherSessions: true,
            });
            toast.success("Password changed successfully!");
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : typeof err === "string" ? err : "Failed to update profile";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const PasswordInput = ({
        id,
        name,
        value,
        placeholder,
        showKey,
    }: {
        id: string;
        name: string;
        value: string;
        placeholder: string;
        showKey: keyof VisibilityState;
    }) => (
        <div className="relative">
            <Input
                id={id}
                name={name}
                type={show[showKey] ? "text" : "password"}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="pr-10"
                required
            />
            <button
                type="button"
                onClick={() => toggleShow(showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
                {show[showKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
        </div>
    );

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <CardTitle className="text-lg">Change Password</CardTitle>
                </div>
                <CardDescription>
                    Update your password. All other sessions will be signed out.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <PasswordInput
                            id="currentPassword"
                            name="currentPassword"
                            value={form.currentPassword}
                            placeholder="Enter current password"
                            showKey="current"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="newPassword">New Password</Label>
                        <PasswordInput
                            id="newPassword"
                            name="newPassword"
                            value={form.newPassword}
                            placeholder="Min. 8 characters"
                            showKey="newPass"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <PasswordInput
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            placeholder="Re-enter new password"
                            showKey="confirm"
                        />
                    </div>

                    {/* Password strength hint */}
                    {form.newPassword && (
                        <div className="space-y-1">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-1 flex-1 rounded-full transition-colors ${form.newPassword.length >= level * 3
                                            ? level <= 1
                                                ? "bg-red-400"
                                                : level <= 2
                                                    ? "bg-yellow-400"
                                                    : level <= 3
                                                        ? "bg-blue-400"
                                                        : "bg-green-500"
                                            : "bg-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {form.newPassword.length < 4
                                    ? "Too short"
                                    : form.newPassword.length < 7
                                        ? "Weak"
                                        : form.newPassword.length < 10
                                            ? "Good"
                                            : "Strong"}
                            </p>
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Update Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}