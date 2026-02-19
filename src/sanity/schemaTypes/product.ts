import { defineType, defineField } from "sanity";

export const product = defineType({
    name: "product",
    title: "Ürünler",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Ürün Adı",
            type: "string",
        }),
        defineField({
            name: "price",
            title: "Fiyat",
            type: "number",
        }),
        defineField({
            name: "image",
            title: "Ürün Görseli",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name" },
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'reference',
            to: [
                {
                    type: 'category',
                },
            ],
        }),
    ],
});