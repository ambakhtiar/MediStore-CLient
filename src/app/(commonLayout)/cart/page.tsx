import Link from "next/link";
import { getCart } from "@/action/cart.action";
import Image from "next/image";
import { CartItemType } from "@/types/cart.type";
import CartItemControls from "@/components/modules/cart/CartItemControls";

export default async function CartPage() {
    const res = await getCart();
    const data = res?.data?.data ?? null;
    const items = data?.items ?? [];
    const subtotal = data?.subtotal || 0;

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

            {items.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                    <p className="mb-4">Your cart is empty.</p>
                    <Link href="/shop" className="inline-block px-4 py-2 bg-primary text-white rounded">Continue shopping</Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    <ul className="divide-y">
                        {items.map((it: CartItemType) => (
                            <li key={it.id} className="py-4 flex items-center gap-4">
                                <Image src={it?.medicine?.imageUrl || ""} alt={it?.medicine?.name} width={80} height={50} className="object-cover rounded" />

                                <div className="flex-1">
                                    <div className="font-medium">{it?.medicine?.name}</div>
                                    <div className="flex flex-col md:flex-row gap-2">
                                        <div className="text-sm font-semibold text-muted-foreground">Stocks: {it?.medicine?.stock}</div>
                                        <div className="text-sm text-shadow-muted-foreground">Qty: {it.quantity}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">৳{((it.unitPrice ?? 0) * (it.quantity ?? 1)).toFixed(2)}</div>
                                    <div className="text-sm text-muted-foreground">৳{(it.unitPrice ?? 0).toFixed(2)} each</div>
                                </div>

                                <div>
                                    <CartItemControls item={it} />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-sm text-muted-foreground">Subtotal</div>
                            <div className="text-xl font-semibold">৳{subtotal.toFixed(2)}</div>
                        </div>

                        <div className="flex gap-3">
                            <Link href="/shop" className="px-4 py-2 border rounded">Continue shopping</Link>
                            <Link href="/checkout" className="px-4 py-2 bg-primary text-white rounded">Proceed to Checkout</Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}