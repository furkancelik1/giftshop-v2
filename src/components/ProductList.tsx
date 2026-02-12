import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductCard from "./ProductCard";

interface Product {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
    image: any;
}

const ProductList = async () => {
    const products = await client.fetch<Product[]>(`
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      price,
      image
    }
  `);


    return (
        <div className="bg-white dark:bg-black py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                    Featured Collection
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={{
                            _id: product._id,
                            name: product.name,
                            slug: product.slug,
                            price: product.price,
                            imageUrl: product.image ? urlFor(product.image).url() : ''
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
