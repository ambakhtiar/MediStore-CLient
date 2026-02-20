"use client";

/**
 * Order Tracking Timeline Component
 *
 * What it does: Displays the order status history timeline
 * Where to use: Order tracking page
 *
 * Features:
 * - Visual timeline with icons and vertical line
 * - Date/time for each status
 * - Current status highlight with animation
 * - Pending states in gray
 * - Cancelled status in red
 */

import { OrderStatus, OrderStatusHistory } from "@/types/order.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { CheckCircle2, Clock, Package, Truck, Home, XCircle } from "lucide-react";

interface OrderTrackingTimelineProps {
    statusHistory: OrderStatusHistory[];
    currentStatus: string;
}

// Status order (for the timeline)
const STATUS_ORDER: string[] = ["PLACED", "CONFIRMS", "PROCESSING", "SHIPPED", "DELIVERED"];

// Status icon mapping
const getStatusIcon = (status: string) => {
    switch (status) {
        case "PLACED":
            return CheckCircle2;
        case "CONFIRMS":
            return CheckCircle2;
        case "PROCESSING":
            return Package;
        case "SHIPPED":
            return Truck;
        case "DELIVERED":
            return Home;
        case "CANCELLED":
            return XCircle;
        default:
            return Clock;
    }
};

// Status text in English
const getStatusText = (status: string) => {
    switch (status) {
        case "PLACED":
            return "Order Placed";
        case "CONFIRMS":
            return "Confirmed";
        case "PROCESSING":
            return "Processing";
        case "SHIPPED":
            return "Shipped";
        case "DELIVERED":
            return "Delivered";
        case "CANCELLED":
            return "Cancelled";
        default:
            return status;
    }
};

export default function OrderTrackingTimeline({
    statusHistory,
    currentStatus,
}: OrderTrackingTimelineProps) {
    // Create a map of completed statuses
    const completedStatuses = new Set(statusHistory.map((h) => h.status));
    const isCancelled = currentStatus === "CANCELLED";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

                    {/* Timeline Items */}
                    <div className="space-y-6">
                        {STATUS_ORDER.map((status: string) => {
                            // Find history entry for this status
                            const history = statusHistory.find((h) => h.status === status);
                            const isCompleted = completedStatuses.has(status as OrderStatus);
                            const isCurrent = status === currentStatus;
                            const isPending = !isCompleted && !isCancelled;

                            const Icon = getStatusIcon(status);

                            return (
                                <div key={status} className="relative flex items-start gap-4">
                                    {/* Icon Circle */}
                                    <div
                                        className={`
                                        relative z-10 flex h-8 w-8 items-center justify-center rounded-full
                                        transition-all
                                        ${isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-blue-500 text-white animate-pulse" : "bg-gray-200 text-gray-400"}
                                    `}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>

                                    {/* Status Info */}
                                    <div className="flex-1 pt-0.5">
                                        <p
                                            className={`font-semibold ${isCompleted ? "text-foreground" : isCurrent ? "text-blue-600" : "text-muted-foreground"
                                                }`}
                                        >
                                            {getStatusText(status)}
                                        </p>

                                        {/* Date/Time (if completed) */}
                                        {history && (
                                            <p className="text-sm text-muted-foreground">
                                                {format(new Date(history.changedAt), "PPP 'at' p",)}
                                            </p>
                                        )}

                                        {/* Pending label */}
                                        {isPending && <p className="text-sm text-muted-foreground">Pending</p>}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Cancelled Status (if cancelled) */}
                        {isCancelled && (
                            <div className="relative flex items-start gap-4">
                                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
                                    <XCircle className="h-4 w-4" />
                                </div>
                                <div className="flex-1 pt-0.5">
                                    <p className="font-semibold text-red-600">Cancelled</p>
                                    {statusHistory.find((h) => h.status === "CANCELLED") && (
                                        <p className="text-sm text-muted-foreground">
                                            {format(
                                                new Date(statusHistory.find((h) => h.status === "CANCELLED")!.changedAt),
                                                "PPP 'at' p",
                                                { locale: bn }
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}