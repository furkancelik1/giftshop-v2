import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";

// Önbelleği (Cache) kapatır, her seferinde en güncel veriyi çeker
export const dynamic = 'force-dynamic';

// Sanity'den veriyi çeken fonksiyon
async function getCategoryData(category: string) {
    // Hem "name" hem de "title" alanında kategoriyi arar
    const query = `*[_type == "product" && (category->name match "${category}*" || category->title match "${category}*")] {
    _id,
    "imageUrl": coalesce(images[0].asset->url, image.asset->url),
    price,
    name,
    "slug": slug
  }`;

    const data = await client.fetch(query);
    return data;
}

// Sayfanın ana gövdesi (Az önce kaybolan kısım burasıydı)
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    // 1. URL'deki parametreyi al ve Türkçe karakterleri düzelt (Örn: %C3%BC -> ü)
    const resolvedParams = await params;
    const categoryName = decodeURIComponent(resolvedParams.category);

    // 2. Veriyi çek
    const data = await getCategoryData(categoryName);

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                {/* Kategori Başlığı */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                        {categoryName} Koleksiyonu
                    </h2>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}