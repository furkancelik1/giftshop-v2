import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";

interface Product {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
    image: any;
}

const ProductPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const product = await client.fetch<Product>(`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      price,
      image
    }
  `, { slug });

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {/* Product Images */}
                <div className="mt-8 lg:mt-0">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                        {product.image && (
                            <Image
                                src={urlFor(product.image).url()}
                                alt={product.name}
                                width={800}
                                height={800}
                                className="h-full w-full object-cover object-center"
                            />
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>
                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900 dark:text-gray-200">${product.price}</p>
                    </div>

                    <div className="mt-10 flex">
                        <AddToCart product={{
                            _id: product._id,
                            name: product.name,
                            slug: product.slug.current,
                            price: product.price,
                            imageUrl: product.image ? urlFor(product.image).url() : ''
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
