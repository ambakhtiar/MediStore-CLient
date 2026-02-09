import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { MedicineType } from "@/types/medicine.type";
import { getMedicineById } from "@/action/medicine.action";
import AddToCartSection from "@/components/modules/homepage/addToCardSection";

type Props = { params: { id: string } };

export default async function MedicinePage({ params }: Props) {
    const { id } = await params;
    const { data, status } = await getMedicineById(id, { revalidate: 60 });
    // console.log(data);
    const payload: MedicineType = data?.data ?? data ?? null;
    const medicine: MedicineType | null = payload ?? null;

    if (!medicine) {
        if (status === 404) return notFound();
        return (
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center text-red-600">
                    Failed to load medicine details. Please try again later.
                </div>
            </main>
        );
    }

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
                                width={200}
                                height={100}
                                className="object-cover w-auto h-auto"
                                sizes="(max-width:xl) 100vw, 50vw"
                            />
                        ) : (
                            <div className="w-full h-36 flex items-center justify-center text-gray-400">No image</div>
                        )}
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        <div><strong>Manufacturer:</strong> {medicine.manufacturer ?? "—"}</div>
                        <div><strong>Category:</strong> {medicine.category?.name ?? "—"}</div>
                        <div><strong>Stock:</strong> {typeof medicine.stock === "number" ? medicine.stock : "—"}</div>
                    </div>
                </div>

                {/* Details column */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold mb-2">{medicine.name}</h1>
                    <p className="text-sm text-gray-600 mb-2">{medicine.genericName}</p>

                    <div className="mb-2">
                        <span className="text-2xl font-extrabold text-gray-900">${Number(medicine.price ?? 0).toFixed(2)}</span>
                        {medicine.price && medicine.price > 0 && (
                            <span className="ml-3 text-sm text-gray-500">incl. VAT (if applicable)</span>
                        )}
                    </div>

                    <div className="prose max-w-none text-gray-700 dark:text-gray-300 mb-3">
                        <p>{medicine.description ?? "No description available."}</p>
                    </div>

                    <div>
                        <p><span className="font-semibold">Seller Name: </span>{medicine.seller?.name}</p>
                        {medicine.category?.id && (
                            <Link href={`/medicine/${medicine.genericName}`}>
                                <p className="text-blue-700"><span className="font-semibold">Category: </span>{medicine.category?.name}</p>
                            </Link>
                        )}
                    </div>

                    {/* Client-side add to cart section (client component) */}
                    <div className="my-3">
                        <AddToCartSection medicineId={medicine.id} maxStock={medicine.stock ?? undefined} />
                    </div>

                    <div className="text-xs text-gray-500">
                        <div>Seller Name: {String(medicine.seller?.name).toUpperCase()}</div>
                        <div>Last updated: {medicine.updatedAt ? new Date(medicine.updatedAt).toLocaleString() : "—"}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}