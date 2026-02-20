/**
 * Order Details Page
 * Path: src/app/orders/[id]/page.tsx
 *
 * What it does: Displays all details of a single order
 *
 * Features:
 * - Order info card (status, date, delivery info)
 * - Products list with images
 * - Track order button
 * - Cancel order button (only for PLACED status)
 */

import { redirect, notFound } from "next/navigation";
import { getOrder } from "@/action/order.action";
import OrderDetailsCard from "@/components/modules/order/OrderDetailsCard";
import OrderProductsList from "@/components/modules/order/OrderProductsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CancelOrderButton from "@/components/modules/order/CancelOrderButton";

export default async function OrderDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;

    // Fetch order details
    const res = await getOrder(id);
    const order = res?.data?.data;

    // If order not found, show 404 page
    if (!order) {
        return notFound();
    }

    // Check if order can be cancelled (only when status is PLACED)
    const canCancel = order.status === "PLACED";

    return (
        <main className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Order Details</h1>
                <Link href="/orders" className="text-sm text-primary hover:underline">
                    ← View all orders
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Order Details Card */}
                <div className="lg:col-span-1">
                    <OrderDetailsCard order={order} />

                    {/* Action Buttons */}
                    <div className="mt-4 space-y-3">
                        {/* Track Order Button - always shown */}
                        <Link href={`/orders/${order.id}/track`} className="block">
                            <Button variant="outline" className="w-full bg-green-800 text-white dark:bg-green-800">
                                Track Order
                            </Button>
                        </Link>

                        {/* Cancel Order Button - shown only when PLACED */}
                        {canCancel && <CancelOrderButton orderId={order.id} />}
                    </div>
                </div>

                {/* Right Column: Products List */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>
                    <OrderProductsList items={order.items} orderStatus={order.status} />
                </div>
            </div>
        </main>
    );
}