"use client";

import { Loader2, AlertCircle, ShoppingBag } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChangePasswordCard } from "@/components/modules/profile/ChangePasswordCard";
import { ProfileInfoCard } from "@/components/modules/profile/ProfileInfoCard";

export default function ProfilePage() {
    const { profile, loading, error, handleUpdateProfile, handleChangePassword } = useProfile();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="max-w-xl mx-auto mt-10 px-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error || "Failed to load profile"}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Profile</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage your personal information and account settings
                </p>
            </div>

            <Separator />

            {/* Profile Info */}
            <ProfileInfoCard profile={profile} onUpdate={handleUpdateProfile} />

            {/* Change Password */}
            <ChangePasswordCard onChangePassword={handleChangePassword} />

            {/* Quick Links based on role */}
            {profile.role === "CUSTOMER" && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm">My Orders</p>
                                    <p className="text-xs text-muted-foreground">View your order history</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/orders">View Orders</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {profile.role === "SELLER" && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Seller Dashboard</p>
                                <p className="text-xs text-muted-foreground">Manage your medicines and orders</p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/seller/dashboard">Go to Dashboard</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {profile.role === "ADMIN" && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Seller Dashboard</p>
                                <p className="text-xs text-muted-foreground">Manage your users and orders</p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin">Go to Dashboard</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Account info footer */}
            <p className="text-xs text-center text-muted-foreground">
                Member since {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </div>
    );
}