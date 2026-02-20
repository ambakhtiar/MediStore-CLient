"use client";

/**
 * Order Details Card Component
 *
 * Purpose: Displays basic order information
 * Usage: Order details page
 *
 * Shows:
 * - Order ID
 * - Order date & time
 * - Order status
 * - Delivery information
 * - Total amount
 */

import { Order } from "@/types/order.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface OrderDetailsCardProps {
    order: Order;
}

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | null | undefined => {
    switch (status) {
        case "PLACED":
            return "secondary";
        case "CONFIRMS":
        case "PROCESSING":
            return "default";
        case "SHIPPED":
            return "outline";
        case "DELIVERED":
            return "default";
        case "CANCELLED":
            return "destructive";
        default:
            return "secondary";
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

export default function OrderDetailsCard({ order }: OrderDetailsCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-xl">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            {format(new Date(order.createdAt), "PPP 'at' p")}
                        </p>
                    </div>
                    <Badge variant={getStatusVariant(order.status)}>
                        {getStatusText(order.status)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Delivery Information */}
                <div>
                    <h3 className="font-semibold mb-3">Delivery Information</h3>
                    <div className="space-y-2 text-sm">
                        {order.shippingName && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Name:</span>
                                <span className="font-medium">{order.shippingName}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone:</span>
                            <span className="font-medium">{order.shippingPhone}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground">Address:</span>
                            <span className="font-medium text-right">
                                {order.shippingAddress}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-muted-foreground">Item Count:</span>
                        <span className="font-medium">{order.items?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium">৳{order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-muted-foreground">Delivery Charge:</span>
                        <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-lg font-bold">৳{order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="border-t pt-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            ₹
                        </div>
                        <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-xs text-muted-foreground">
                                Pay when you receive the product
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}