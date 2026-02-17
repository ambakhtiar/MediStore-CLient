import Link from "next/link";
import { getOrders } from "@/action/order.action";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { bn } from "date-fns/locale";
import { Order } from "@/types";

// Status badge variants
const getStatusVariant = (status: string): "secondary" | "default" | "outline" | "destructive" => {
    switch (status) {
        case "PLACED":
            return "secondary";
        case "PROCESSING":
            return "default";
        case "SHIPPED":
            return "outline";
        case "DELIVERED":
            return "destructive";
        case "CANCELLED":
            return "destructive";
        default:
            return "secondary";
    }
};

// Status text in Bangla
const getStatusText = (status: string) => {
    switch (status) {
        case "PLACED":
            return "অর্ডার সম্পন্ন";
        case "PROCESSING":
            return "প্রসেসিং";
        case "SHIPPED":
            return "পাঠানো হয়েছে";
        case "DELIVERED":
            return "ডেলিভার হয়েছে";
        case "CANCELLED":
            return "বাতিল";
        default:
            return status;
    }
};

export default async function OrdersPage() {
    const res = await getOrders();
    const orders = res?.data?.data ?? [];

    return (
        <main className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">আমার অর্ডার</h1>

            {orders.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground mb-4">আপনার কোনো অর্ডার নেই</p>
                        <Link
                            href="/shop"
                            className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                        >
                            কেনাকাটা শুরু করুন
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {orders.map((order: Order) => (
                        <Link key={order.id} href={`/orders/${order.id}`}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">
                                                অর্ডার #{order.id.slice(0, 8)}
                                            </CardTitle>
                                            <CardDescription>
                                                {formatDistanceToNow(new Date(order.createdAt), {
                                                    addSuffix: true,
                                                    locale: bn,
                                                })}
                                            </CardDescription>
                                        </div>
                                        <Badge variant={getStatusVariant(order.status)}>
                                            {getStatusText(order.status)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">আইটেম সংখ্যা</p>
                                            <p className="font-medium">{order.items?.length || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">মোট</p>
                                            <p className="font-medium text-lg">৳{order.total.toFixed(2)}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-muted-foreground">ডেলিভারি ঠিকানা</p>
                                            <p className="font-medium line-clamp-1">
                                                {order.shippingAddress}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}