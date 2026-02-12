import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product' // Yeni oluşturduğumuz dosyayı import et

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product], // Listeye ekle
}