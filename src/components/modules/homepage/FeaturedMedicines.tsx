import Link from "next/link";
import Image from "next/image";
import { medicineService } from "@/services/medicine.service";
import { MedicineType } from "@/types/medicine.type";

export default async function FeaturedMedicines({ limit = 4 }: { limit?: number }) {
    const { data } = await medicineService.getAllMedicine({ limit: String(limit), isFeatured: true, page: "1" }, { revalidate: 60 });
    const medicines: MedicineType[] = data?.data?.data;
    // console.log(medicines);

    if (!medicines.length) {
        return <div className="py-8 text-center text-sm text-gray-500">No featured medicines right now.</div>;
    }

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Featured Medicines</h2>
                    <Link href="/shop" className="text-sm text-blue-600">All Products →</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {medicines.map((m) => (
                        <article key={m.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                            <Link href={`/shop/${m.id}`} className="block">
                                <div className="relative w-full h-36 bg-gray-100 rounded-md overflow-hidden mb-2">
                                    {m.imageUrl && m.name ? (
                                        <Image src={m.imageUrl} alt={m.name} fill className="object-cover" sizes="(max-width:768px)100vw,33vw" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                                    )}
                                </div>

                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{m.name}</h3>

                                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                    {
                                        m.price &&
                                        <span className="font-semibold">${m.price.toFixed(2)}</span>
                                    }
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}