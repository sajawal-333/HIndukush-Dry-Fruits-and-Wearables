import { categories, products } from '@/data/products';
import type { Product } from '@/types';

export const collections = categories;

export const getCollection = (slug: string) =>
  collections.find((collection) => collection.slug === slug);

export const getCollectionProducts = (slug: string) =>
  products.filter((product) => !slug || product.category === slug);

interface ProductTypeDefinition {
  slug: string;
  name: string;
  category: string;
  matches: (product: Product) => boolean;
}

const named = (pattern: RegExp) => (product: Product) => pattern.test(product.name);

// Product families are separate from the five main collections, so choosing
// "Almonds" no longer accidentally shows every kind of nut.
const productTypes: ProductTypeDefinition[] = [
  { slug: 'almonds', name: 'Almonds', category: 'dry-fruits', matches: named(/almond/i) },
  { slug: 'walnuts', name: 'Walnuts', category: 'dry-fruits', matches: named(/walnut/i) },
  { slug: 'cashews', name: 'Cashews', category: 'dry-fruits', matches: named(/cashew/i) },
  { slug: 'pistachios', name: 'Pistachios', category: 'dry-fruits', matches: named(/pistachio/i) },
  { slug: 'chilgoza', name: 'Chilgoza', category: 'dry-fruits', matches: named(/chilgoza/i) },
  { slug: 'apricots', name: 'Apricots', category: 'dried-fruits', matches: named(/apricot/i) },
  { slug: 'figs', name: 'Figs & anjeer', category: 'dried-fruits', matches: named(/fig|anjeer/i) },
  { slug: 'mulberries', name: 'Mulberries & toot', category: 'dried-fruits', matches: named(/mulberr|toot/i) },
  { slug: 'orchard-fruits', name: 'Orchard fruits', category: 'dried-fruits', matches: named(/anar dana|amlok|apple/i) },
  { slug: 'honey', name: 'Mountain honey', category: 'organics', matches: named(/honey/i) },
  { slug: 'shilajeet', name: 'Shilajeet', category: 'organics', matches: named(/shilajeet/i) },
  { slug: 'local-sweets', name: 'Kilao & local sweets', category: 'gift-packs', matches: named(/kilao|confection/i) },
  { slug: 'gift-boxes', name: 'Gift boxes & assortments', category: 'gift-packs', matches: named(/mix|gift box/i) },
  { slug: 'chughas', name: 'Chughas', category: 'traditional-wear', matches: named(/chugha/i) },
  { slug: 'shawls', name: 'Shawls & chaddars', category: 'traditional-wear', matches: named(/shawl/i) },
  { slug: 'pakols', name: 'Pakols', category: 'traditional-wear', matches: named(/cap/i) },
  { slug: 'accessories', name: 'Accessories', category: 'traditional-wear', matches: named(/ring/i) },
];

export const getProductType = (slug: string) =>
  productTypes.find((type) => type.slug === slug);

export const matchesProductType = (product: Product, slug: string) => {
  if (!slug) return true;
  const type = getProductType(slug);
  return Boolean(type && product.category === type.category && type.matches(product));
};

export const getProductTypes = (category: string) =>
  productTypes
    .filter((type) => type.category === category)
    .map(({ slug, name }) => ({
      slug,
      name,
      productCount: products.filter((product) => matchesProductType(product, slug)).length,
    }))
    .filter((type) => type.productCount > 0);

export const getStartingPrice = (product: Product) =>
  Math.min(...product.weights.map((option) => option.price));
