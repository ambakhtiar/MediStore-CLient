import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { medicineService } from "@/services/medicine.service";
import type { MedicineType } from "@/types/medicine.type";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default async function MedicinePage({ params }: Props) {
    const { id } = await params;

    const { data, status } = await medicineService.getMedicineById(id, { revalidate: 60 });

    const payload: MedicineType = data?.data ?? data ?? null;
    const medicine: MedicineType | null = payload ?? null;

    if (!medicine) {
        if (status === 404) return notFound();
        return (
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center text-red-600">Failed to load medicine details. Please try again later.</div>
            </main>
        );
    }
    console.log(medicine);
    return (
        <main className="max-w-5xl mx-auto px-4 py-8">
            <nav className="text-sm text-gray-500 mb-4">
                <Link href="/shop" className="text-blue-600 hover:underline">Shop</Link>
                <span className="mx-2">/</span>
                <span>{medicine.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row justify-around gap-8">
                {/* Image column */}
                <div>
                    <div className="w-auto bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mb-2">
                        {medicine.imageUrl ? (
                            <Image
                                src={encodeURI(medicine.imageUrl)}
                                alt={medicine.name ?? "Medicine Image"}
                                width={400}
                                height={280}
                                className="object-cover w-auto h-auto"
                                sizes="(max-width:2xl) 100vw, 50vw"
                                unoptimized={true}
                            />
                        ) : (
                            <div className="w-full h-36 flex items-center justify-center text-gray-400">No image</div>
                        )}
                    </div>
                    {/* small meta */}
                    <div className="mt-4 text-sm text-gray-600">
                        <div><strong>Manufacturer:</strong> {medicine.manufacturer ?? "—"}</div>
                        <div><strong>Category:</strong> {medicine.category?.name ?? "—"}</div>
                        <div><strong>Stock:</strong> {typeof medicine.stock === "number" ? medicine.stock : "—"}</div>
                    </div>
                </div>

                {/* Details column */}
                <div>
                    <h1 className="text-2xl font-bold mb-2">{medicine.name}</h1>
                    <p className="text-sm text-gray-600 mb-4">{medicine.genericName}</p>

                    <div className="mb-4">
                        <span className="text-2xl font-extrabold text-gray-900">${Number(medicine.price ?? 0).toFixed(2)}</span>
                        {medicine.price && medicine.price > 0 && (
                            <span className="ml-3 text-sm text-gray-500">incl. VAT (if applicable)</span>
                        )}
                    </div>

                    <div className="prose max-w-none text-gray-700 dark:text-gray-300 mb-6">
                        <p>{medicine.description ?? "No description available."}</p>
                    </div>
                    <div>
                        <p><span className="font-semibold">Seller Name: </span>{medicine.seller?.name}</p>
                        {medicine.category?.id &&
                            <Link href={`{/medicine/${medicine.category?.id}` || ""}>
                                <p className="text-blue-700"><span className="font-semibold">Category: </span>{medicine.category?.name}</p>
                            </Link>}
                    </div>

                    {/* Client-side add to cart */}
                    <div className="mb-6">
                        <Button>{/* <AddToCart medicine={medicine} /> */}</Button>
                    </div>

                    <div className="text-xs text-gray-500">
                        <div>Product ID: {medicine.id}</div>
                        <div>Last updated: {medicine.updatedAt ? new Date(medicine.updatedAt).toLocaleString() : "—"}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}