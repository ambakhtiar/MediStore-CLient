export type MedicineType = {
    id: string;
    name: string;
    genericName?: string | null;
    description?: string | null;
    price?: number | null;
    stock?: number | null;
    manufacturer?: string | null;
    isFeatured?: boolean | null;
    imageUrl?: string | null;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    categoryId?: string | null;
    category?: { id: string; name: string; slug?: string } | null;
    sellerId?: string | null;
    seller?: { id: string; name?: string } | null;
};