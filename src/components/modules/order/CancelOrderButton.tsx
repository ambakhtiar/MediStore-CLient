"use client";
import { Button } from "@/components/ui/button";
import { cancelOrder } from "@/action/order.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CancelOrderButton({ orderId }: { orderId: string }) {
    const router = useRouter();

    const handleCancel = async () => {
        if (!confirm("Are you want to cencel order?")) return;

        const res = await cancelOrder(orderId);
        if (res.ok) {
            toast.success("Order Succefullt Cencel");
            router.refresh();
        } else {
            toast.error("Order cencel failed");
        }
    };

    return (
        <Button variant="destructive" onClick={handleCancel} className="w-full">
            অর্ডার বাতিল করুন
        </Button>
    );
}