import { type SchemaTypeDefinition } from 'sanity'

// 1. Kategoriyi içeri aktarıyoruz (Dosya adına göre import)
import { categoryType } from './categoryType'
// veya bazen default export olabilir, üstteki hata verirse şunu dene: import categoryType from './categoryType'

import { product } from './product'
// (Diğer importların da burada duruyor olacak: authorType, postType vb.)

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        // 2. Kategoriyi listeye ekliyoruz
        categoryType,
        product,
        // diğer tiplerin...
    ],
}