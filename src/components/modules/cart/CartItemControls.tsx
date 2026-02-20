"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CartItemType } from "@/types/cart.type";
import { removeCartItem, updateCartItem } from "@/action/cart.action";
import { XCircle } from "lucide-react";


export default function CartItemControls({ item }: { item: CartItemType }) {
    const router = useRouter();

    // local optimistic qty so UI updates immediately
    const [localQty, setLocalQty] = useState<number>(item.quantity ?? 1);
    const [loading, setLoading] = useState(false);

    // keep localQty in sync if parent updates item.quantity
    useEffect(() => {
        setLocalQty(item.quantity ?? 1);
    }, [item.quantity]);

    // broadcast helper: include count if available, fallback to storage
    const broadcast = (count?: number) => {
        try {
            const bc = new BroadcastChannel("cart");
            bc.postMessage({ type: "cart-updated", count });
            bc.close();
        } catch {
            try { localStorage.setItem("cart-sync", Date.now().toString()); } catch { }
        }
    };

    // change quantity (optimistic)
    const changeQty = async (newQty: number) => {
        if (newQty < 1) return;
        if (loading) return;

        const prevQty = localQty;
        setLocalQty(newQty);
        setLoading(true);

        try {
            const res = await updateCartItem({ id: item.id, quantity: newQty });
            if (!res.ok) {
                setLocalQty(prevQty);
                toast.error(res.error?.body?.message ?? "Update failed");
                return;
            }


            const newCount = res.data?.count;
            broadcast(typeof newCount === "number" ? newCount : undefined);

            toast.success("Quantity updated");
            router.refresh();
        } catch (err) {
            setLocalQty(prevQty);
            console.error("update error", err);
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    // remove item
    const removeItem = async () => {
        if (!confirm("Remove this item from cart?")) return;
        if (loading) return;

        setLoading(true);
        try {
            const res = await removeCartItem(item.id);
            if (!res.ok) {
                toast.error(res.error?.body?.message ?? "Remove failed");
                return;
            }

            const newCount = res.data?.count;
            broadcast(typeof newCount === "number" ? newCount : undefined);

            toast.success("Item removed");
            router.refresh();
        } catch (err) {
            console.error("remove error", err);
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => changeQty(localQty - 1)}
                disabled={loading || localQty <= 1}
                aria-label="Decrease quantity"
                className="px-2 py-1 rounded border disabled:opacity-50"
            >
                −
            </button>

            <span className="w-8 text-center">{localQty}</span>

            <button
                onClick={() => changeQty(localQty + 1)}
                disabled={loading}
                aria-label="Increase quantity"
                className="px-2 py-1 rounded border disabled:opacity-50"
            >
                +
            </button>

            <button
                onClick={removeItem}
                disabled={loading}
                className="text-red-600 px-2 py-1 rounded border disabled:opacity-50"
            >
                <XCircle className="w-4 h-4" />
                <span className="sr-only">Remove</span>
            </button>
        </div>
    );
}