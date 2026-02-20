/**
 * Order Tracking Page
 * Path: src/app/orders/[id]/track/page.tsx
 *
 * What it does: Displays the order status timeline
 *
 * Features:
 * - Visual timeline with dates
 * - Current status highlight
 * - Link back to order details
 */

import { notFound } from "next/navigation";
import { getOrder, getOrderStatusHistory } from "@/action/order.action";
import OrderTrackingTimeline from "@/components/modules/order/OrderTrackingTimeline";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function OrderTrackingPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;

    // Fetch order and status history in parallel
    const [orderRes, historyRes] = await Promise.all([getOrder(id), getOrderStatusHistory(id)]);

    const order = orderRes?.data?.data;
    const statusHistory = historyRes?.data?.data || [];

    // If order not found
    if (!order) {
        return notFound();
    }

    return (
        <main className="max-w-3xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
                <p className="text-muted-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                <Link href={`/orders/${order.id}`} className="text-sm text-primary hover:underline">
                    ← View order details
                </Link>
            </div>

            {/* Timeline */}
            <OrderTrackingTimeline statusHistory={statusHistory} currentStatus={order.status} />

            {/* Back Button */}
            <div className="mt-6">
                <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" className="w-full">
                        Back to Order Details
                    </Button>
                </Link>
            </div>
        </main>
    );
}