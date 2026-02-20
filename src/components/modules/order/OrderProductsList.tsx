"use client";

/**
 * Order Products List Component
 *
 * What it does: Lists all products in an order
 * Where to use: Order details page
 *
 * Features:
 * - Product image, name, quantity, price
 * - Review button (only for delivered products)
 * - Clean layout with dividers
 */

import { OrderItem } from "@/types/order.type";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface OrderProductsListProps {
    items: OrderItem[];
    orderStatus: string;
}

export default function OrderProductsList({ items, orderStatus }: OrderProductsListProps) {
    // Check if order is delivered (to show review button)
    const isDelivered = orderStatus === "DELIVERED";

    return (
        <Card>
            <CardContent className="p-0">
                <div className="divide-y">
                    {items.map((item) => (
                        <div key={item.id} className="p-4 flex items-center gap-4">
                            {/* Product Image */}
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                                {item.medicine.imageUrl ? (
                                    <Image
                                        src={item.medicine.imageUrl}
                                        alt={item.medicine.name}
                                        width={80}
                                        height={80}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                        <span className="text-xs text-gray-400">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.medicine.name}</h3>
                                {item.medicine.genericName && (
                                    <p className="text-sm text-muted-foreground">{item.medicine.genericName}</p>
                                )}
                                <div className="mt-1 flex items-center gap-3 text-sm">
                                    <span className="text-muted-foreground">Quantity: {item.quantity}</span>
                                    <span className="text-muted-foreground">৳{item.unitPrice.toFixed(2)} each</span>
                                </div>
                            </div>

                            {/* Price & Review Button */}
                            <div className="text-right space-y-2">
                                <p className="font-semibold text-lg">৳{(item.unitPrice * item.quantity).toFixed(2)}</p>

                                {/* Review button - only shown for delivered products */}
                                {isDelivered && (
                                    <Link href={`/reviews/create/${item.medicineId}`}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            Leave Review
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}