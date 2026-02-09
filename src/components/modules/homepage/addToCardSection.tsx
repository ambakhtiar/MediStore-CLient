"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addToCart } from "@/action/cart.action";

type Props = {
    medicineId: string;
    initialQty?: number;
    maxStock?: number | undefined;
    className?: string;
};

export default function AddToCartSection({
    medicineId,
    initialQty = 1,
    maxStock,
    className,
}: Props) {
    const [qty, setQty] = useState<number>(initialQty);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const currentAbsoluteUrl = () => {
        try {
            return window.location.href;
        } catch {
            return "/";
        }
    };

    const handleAdd = async () => {
        if (!Number.isInteger(qty) || qty < 1) {
            toast.error("Quantity must be at least 1");
            return;
        }
        if (typeof maxStock === "number" && qty > maxStock) {
            toast.error(`Only ${maxStock} item(s) available`);
            return;
        }

        setLoading(true);
        const toastId = toast.loading?.("Adding to cart...");

        try {
            const res = await addToCart({ medicineId, quantity: qty });

            if (!res.ok) {
                if (res.status === 403) {
                    toast.dismiss?.(toastId);
                    toast.error("Please sign in to add items to cart");
                    const cb = encodeURIComponent(currentAbsoluteUrl());
                    router.push(`/login?callbackUrl=${cb}`);
                    return;
                }
                toast.error(res.error?.message ?? "Failed to add to cart", { id: toastId });
                return;
            }

            const successMessage = (res.data as { message?: string })?.message ?? "Added to cart";

            toast.success(successMessage, { id: toastId });
            router.refresh();

        } catch (err) {
            console.error("Add to cart failed:", err);
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={className}>
            <div className="flex items-center gap-3">
                <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => {
                        const v = Number(e.target.value || 1);
                        if (Number.isNaN(v)) return;
                        if (typeof maxStock === "number") setQty(Math.max(1, Math.min(maxStock, Math.floor(v))));
                        else setQty(Math.max(1, Math.floor(v)));
                    }}
                    className="w-16 border rounded px-2 py-1 text-center"
                    aria-label="Quantity"
                />
                <Button onClick={handleAdd} disabled={loading} variant="default">
                    {loading ? "Adding..." : "Add to Cart"}
                </Button>
            </div>
        </div>
    );
}