/**
 * Create Review Page
 * Path: src/app/reviews/create/[medicineId]/page.tsx
 * 
 * কি করে: একটা medicine এর জন্য review form দেখায়
 * 
 * Features:
 * - Medicine info display
 * - Review form (rating + comment)
 * - Validation
 * - Submit handler
 */

import { notFound } from "next/navigation";
import { getMedicineById } from "@/action/medicine.action";
import ReviewForm from "@/components/modules/review/ReviewForm";
import Link from "next/link";

export default async function CreateReviewPage({
    params
}: {
    params: { medicineId: string }
}) {
    const { medicineId } = await params;

    // Fetch medicine details
    const res = await getMedicineById(medicineId);
    const medicine = res?.data?.data || res?.data;

    // if not found medicine
    if (!medicine) {
        return notFound();
    }

    return (
        <main className="max-w-2xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Write Review</h1>
                <Link href="/reviews" className="text-sm text-primary hover:underline">
                    ← Back to Review Page
                </Link>
            </div>

            {/* Review Form */}
            <ReviewForm
                medicineId={medicine.id}
                medicineName={medicine.name}
                medicineImage={medicine.imageUrl}
            />
        </main>
    );
}