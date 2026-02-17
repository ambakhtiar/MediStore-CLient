import { redirect } from "next/navigation";
import { getCart } from "@/action/cart.action";
import CheckoutForm from "@/components/modules/checkout/CheckoutForm";
import Link from "next/link";

export default async function CheckoutPage() {
    // Fetch cart data
    const res = await getCart();
    const data = res?.data?.data ?? null;
    const items = data?.items ?? [];
    const subtotal = data?.subtotal || 0;
    const cartCount = data?.cartCount || 0;

    // If cart is empty, redirect to cart page
    if (items.length === 0) {
        redirect("/cart");
    }

    return (
        <main className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">চেকআউট</h1>
                <p className="text-muted-foreground">
                    আপনার অর্ডার নিশ্চিত করতে নিচের তথ্য পূরণ করুন
                </p>
            </div>

            {/* Checkout Form */}
            <CheckoutForm subtotal={subtotal} itemCount={cartCount} />

            {/* Back to Cart Link */}
            <div className="mt-6 text-center">
                <Link
                    href="/cart"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    ← কার্টে ফিরে যান
                </Link>
            </div>
        </main>
    );
}