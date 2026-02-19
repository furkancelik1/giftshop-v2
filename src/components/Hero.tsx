import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

async function getHeroData() {
    // imageUrl'i bulmak için "coalesce" (ilk bulduğunu al) kullanıyoruz
    const query = `*[_type == "product"][0..1] {
    _id,
    "imageUrl": coalesce(images[0], image), 
    name,
    "slug": slug.current
  }`;

    const data = await client.fetch(query);
    return data;
}

export default async function Hero() {
    const data = await getHeroData();

    // Eğer veri yoksa hiç gösterme
    if (!data || data.length === 0) return null;

    return (
        <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
            <div className="mb-8 flex flex-wrap justify-between md:mb-16">
                <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
                    <h1 className="mb-4 text-4xl font-bold text-black dark:text-white sm:text-5xl md:mb-8 md:text-6xl">
                        Benzersiz 3D Figürler & Hediyeler
                    </h1>
                    <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
                        Giftshop V2 ile hayalinizdeki tasarımları gerçeğe dönüştürüyoruz.
                        En yeni koleksiyonumuzu keşfedin.
                    </p>
                </div>

                <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
                    <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
                        {/* 1. Büyük Resim - Güvenli Kontrol Eklendi */}
                        <div className="relative h-[300px] w-[300px] sm:h-[500px] sm:w-[500px]">
                            {data[0]?.imageUrl ? (
                                <Image
                                    src={urlFor(data[0].imageUrl).url()}
                                    alt={data[0].name}
                                    priority
                                    className="h-full w-full object-cover object-center"
                                    width={500}
                                    height={500}
                                />
                            ) : (
                                // Resim yoksa gri bir kutu göster (Hata vermesin)
                                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">Görsel Yok</div>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                        {/* 2. Küçük Resim - Güvenli Kontrol Eklendi */}
                        <div className="relative h-[250px] w-[250px] sm:h-[400px] sm:w-[400px]">
                            {data[1]?.imageUrl ? (
                                <Image
                                    src={urlFor(data[1].imageUrl).url()}
                                    alt={data[1].name}
                                    className="h-full w-full object-cover object-center"
                                    width={400}
                                    height={400}
                                    priority
                                />
                            ) : (
                                // Resim yoksa boş render et
                                <div className="h-full w-full bg-gray-200" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Alt Linkler */}
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <Link
                        href="/Figürler"
                        className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                        Figürler
                    </Link>
                    <Link
                        href="/Sanat"
                        className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                        Sanat
                    </Link>
                    <Link
                        href="/Aksesuar"
                        className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                        Aksesuar
                    </Link>
                </div>
            </div>
        </section>
    );
}