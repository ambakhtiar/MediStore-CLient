import MedicineCard from "@/components/modules/homepage/MedicineCard";
import { medicineService } from "@/services/medicine.service";
import type { MedicineType } from "@/types/medicine.type";

export default async function ShopPage() {
    const { data } = await medicineService.getAllMedicine();
    const items: MedicineType[] = data?.data?.data ?? [];
    console.log(items);

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-2xl font-bold mb-6">Shop</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        items.map((item: MedicineType) => (
                            <MedicineCard key={item.id} {...item} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}