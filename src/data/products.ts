import type { Product, Category, ProductReview } from '../types';

// ─── Customer Reviews ────────────────────────────────────────────────────────
const sampleReviews: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Mohammad Rahim (Gilgit)',
    rating: 5,
    date: '2026-09-12',
    comment: 'Pure and authentic! The Kaghazi almonds and Kilao brought back memories of Chitral.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Ayesha Khan (Islamabad)',
    rating: 5,
    date: '2026-09-08',
    comment: 'Ordered pure Salajeet and Roasted Chilgoza. Fast COD delivery to Islamabad within 24 hours!',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Dr. Hamza Tariq (Lahore)',
    rating: 5,
    date: '2026-08-28',
    comment: 'The Chitrali Chugha and Pakol are authentic hand-spun wool. Exceptional quality.',
    verified: true,
  },
];

// ─── Products Catalog (Hindukush Dry Fruits & Specialties) ───────────────────
export const products: Product[] = [
  // 1. Almond (Kaghazi)
  {
    id: 'hk-1',
    name: 'Kaghazi Almonds (Chitral Valley)',
    slug: 'kaghazi-almonds',
    category: 'dry-fruits',
    description: 'Thin-shelled, sweet organic almonds handpicked from the pristine high-altitude orchards of Chitral. Easy to crack by hand with rich natural oil content.',
    shortDescription: 'Thin-shelled, sweet almonds from Chitral valley.',
    photoCredit: 'Chitral Valley Mountain Harvest',
    images: [
      { id: 'img-1a', url: '/images/kaghazi_almonds.jpg', alt: 'Chitrali Kaghazi Thin Shell Almonds in Wooden Bowl' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 650, originalPrice: 750, sku: 'KAG-ALM-250' },
      { weight: '500g', grams: 500, price: 1250, originalPrice: 1400, sku: 'KAG-ALM-500' },
      { weight: '1kg', grams: 1000, price: 2400, originalPrice: 2700, sku: 'KAG-ALM-1000' },
    ],
    tags: ['almond', 'kaghazi', 'nuts', 'chitral', 'organic'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 120,
    rating: 4.9,
    reviewCount: 48,
    reviews: sampleReviews,
    badge: 'sale',
    origin: 'Chitral Valley',
  },

  // 2. Almond Plain (Kernels)
  {
    id: 'hk-2',
    name: 'Mountain Giri Almonds (Badam Kernels)',
    slug: 'almond-plain-kernels',
    category: 'dry-fruits',
    description: '100% shelled mountain almond kernels harvested from Chitral valleys. Sweet, oil-dense kernels packed with vitamin E, natural antioxidants, and healthy omega fatty acids.',
    shortDescription: 'Sweet, oil-dense mountain almond kernels from Chitral.',
    photoCredit: 'Hindukush Valley Organic Harvest',
    images: [
      { id: 'img-2a', url: '/images/almonds_giri.jpg', alt: 'Mountain Giri Almond Kernels in Wooden Bowl' },
      { id: 'img-2b', url: '/images/almonds_giri_heap.jpg', alt: 'Crisp Giri Almonds on Artisan Board' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 950, originalPrice: 1100, sku: 'PLN-ALM-250' },
      { weight: '500g', grams: 500, price: 1850, originalPrice: 2000, sku: 'PLN-ALM-500' },
      { weight: '1kg', grams: 1000, price: 3600, originalPrice: 3900, sku: 'PLN-ALM-1000' },
    ],
    tags: ['almond', 'badam', 'giri', 'kernels', 'chitral', 'organic'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 95,
    rating: 4.9,
    reviewCount: 56,
    reviews: sampleReviews,
    badge: 'sale',
    origin: 'Chitral Valley',
  },

  // 3. Pine Nuts Roasted (Chilgoza)
  {
    id: 'hk-3',
    name: 'Pine Nuts Roasted (Chilgoza)',
    slug: 'pine-nuts-roasted-chilgoza',
    category: 'dry-fruits',
    description: 'Pristine mountain pine nuts (Chilgoza) roasted to buttery perfection. Harvested from wild pine forests in the high peaks of Hindukush.',
    shortDescription: 'Luxury wild roasted Chilgoza from Hindukush pine forests.',
    photoCredit: 'Hindukush High Peaks Wild Harvest',
    images: [
      { id: 'img-3a', url: '/images/roasted_chilgoza.jpg', alt: 'Hindukush Roasted Chilgoza Pine Nuts' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 2400, originalPrice: 2700, sku: 'CHIL-250' },
      { weight: '500g', grams: 500, price: 4600, originalPrice: 5000, sku: 'CHIL-500' },
      { weight: '1kg', grams: 1000, price: 9000, originalPrice: 9800, sku: 'CHIL-1000' },
    ],
    tags: ['chilgoza', 'pine nuts', 'luxury', 'wild harvest'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 40,
    rating: 5.0,
    reviewCount: 64,
    reviews: sampleReviews,
    badge: 'limited',
    origin: 'Hindukush High Peaks',
  },

  // 4. Kilao (Traditional Nut Roll)
  {
    id: 'hk-4',
    name: 'Chitrali Kilao (کیلاؤ / Traditional Walnut Roll)',
    slug: 'kilao-traditional-nut-roll',
    category: 'gift-packs',
    description: 'The crowning heritage sweet of Chitral & Hunza. Premium mountain walnut halves painstakingly threaded on string and dipped in rich, simmered grape & mulberry molasses.',
    shortDescription: 'Fresh threaded mountain walnuts dipped in rich mulberry & grape syrup.',
    photoCredit: 'Authentic Chitrali Artisan Harvest',
    images: [
      { id: 'img-4a', url: '/images/kilao_hand.jpg', alt: 'Fresh Handcrafted Chitrali Kilao Walnut Roll' },
      { id: 'img-4b', url: '/images/kilao_hanging_strands.jpg', alt: 'Traditional Hanging Kilao Walnut Strands Drying' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 850, originalPrice: 950, sku: 'KIL-250' },
      { weight: '500g', grams: 500, price: 1650, originalPrice: 1850, sku: 'KIL-500' },
      { weight: '1kg', grams: 1000, price: 3200, originalPrice: 3500, sku: 'KIL-1000' },
    ],
    tags: ['kilao', 'walnut roll', 'traditional sweet', 'chitral', 'organic candy', 'gift-packs'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 75,
    rating: 4.9,
    reviewCount: 52,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Chitral Heritage Artisans',
  },

  // 5. Cashews Roasted (Namkeen Kaju)
  {
    id: 'hk-5',
    name: 'Roasted & Salted Cashews (Namkeen Kaju)',
    slug: 'cashew-roasted',
    category: 'dry-fruits',
    description: 'Whole W240 giant cashews, lightly dry roasted with Himalayan pink salt and subtle cracked black pepper. Distinctive crunch and velvety buttery finish.',
    shortDescription: 'Slow-roasted jumbo cashews with Himalayan salt and black pepper.',
    photoCredit: 'Mountain Select Premium Roast',
    images: [
      { id: 'img-5a', url: '/images/kaju_roasted.jpg', alt: 'Roasted & Salted Cashews' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 1150, originalPrice: 1280, sku: 'CSH-RST-250' },
      { weight: '500g', grams: 500, price: 2180, originalPrice: 2400, sku: 'CSH-RST-500' },
      { weight: '1kg', grams: 1000, price: 4200, originalPrice: 4600, sku: 'CSH-RST-1000' },
    ],
    tags: ['cashews', 'kaju', 'roasted', 'namkeen', 'w240', 'crunchy'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 90,
    rating: 4.9,
    reviewCount: 44,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Premium Roasted Select',
  },

  // 5b. Plain Jumbo Cashews (Raw Kaju)
  {
    id: 'hk-5b',
    name: 'Jumbo Plain Cashews (Raw Kaju)',
    slug: 'cashew-plain-raw',
    category: 'dry-fruits',
    description: 'Supreme grade W240 unroasted cashew nuts. Naturally sweet, ultra-creamy, and packed with wholesome plant-based protein and magnesium.',
    shortDescription: 'Supreme unroasted W240 jumbo cashews, naturally creamy & sweet.',
    photoCredit: 'Hindukush Valley Select',
    images: [
      { id: 'img-5b', url: '/images/kaju_plain.jpg', alt: 'Jumbo Plain Cashews Raw Kaju' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 1050, originalPrice: 1180, sku: 'CSH-PLN-250' },
      { weight: '500g', grams: 500, price: 2000, originalPrice: 2250, sku: 'CSH-PLN-500' },
      { weight: '1kg', grams: 1000, price: 3900, originalPrice: 4350, sku: 'CSH-PLN-1000' },
    ],
    tags: ['cashews', 'kaju', 'plain', 'raw', 'w240', 'organic'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 110,
    rating: 4.9,
    reviewCount: 52,
    reviews: sampleReviews,
    badge: 'sale',
    origin: 'Handpicked Grade W240',
  },

  // 6. Pistachio with Shell (Pista)
  {
    id: 'hk-6',
    name: 'Roasted Salted Pistachios (Pista)',
    slug: 'pistachio-with-shell',
    category: 'dry-fruits',
    description: 'Naturally opened roasted pistachios with a touch of Himalayan pink salt. Bold flavor and rich green kernels.',
    shortDescription: 'Lightly salted, roasted in small batches.',
    photoCredit: 'Handcrafted Small Batch Roast',
    images: [
      { id: 'img-6a', url: '/images/salted_pistachios.jpg', alt: 'Roasted Salted Pistachios in Ceramic Bowl' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 1000, originalPrice: 1150, sku: 'PST-250' },
      { weight: '500g', grams: 500, price: 1950, originalPrice: 2100, sku: 'PST-500' },
      { weight: '1kg', grams: 1000, price: 3800, originalPrice: 4200, sku: 'PST-1000' },
    ],
    tags: ['pistachio', 'pista', 'salted', 'roasted'],
    featured: true,
    bestSeller: false,
    inStock: true,
    stockQuantity: 65,
    rating: 4.9,
    reviewCount: 28,
    reviews: sampleReviews,
    badge: 'sale',
    origin: 'Mountain Harvest',
  },

  // 7. Pure Shilajeet (Salajeet)
  {
    id: 'hk-7',
    name: 'Pure Himalayan/Hindukush Shilajeet (Salajeet)',
    slug: 'pure-shilajeet-salajeet',
    category: 'organics',
    description: '100% Raw, purified resin extracted from high altitude rock cliffs of the Hindukush ranges above 16,000 ft. Packed with 84+ mineral trace elements & fulvic acid.',
    shortDescription: '100% Purified mountain resin resin rich in fulvic acid.',
    photoCredit: '16,000ft Hindukush Rock Extraction',
    images: [
      { id: 'img-7a', url: '/images/pure_shilajeet.jpg', alt: 'Pure Himalayan Shilajeet Salajeet Mineral Resin' },
    ],
    weights: [
      { weight: '10g', grams: 10, price: 1000, originalPrice: 1200, sku: 'SHIL-10G' },
      { weight: '20g', grams: 20, price: 1900, originalPrice: 2200, sku: 'SHIL-20G' },
      { weight: '50g', grams: 50, price: 4500, originalPrice: 5000, sku: 'SHIL-50G' },
    ],
    tags: ['shilajeet', 'salajeet', 'herbal', 'organic', 'energy'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 150,
    rating: 5.0,
    reviewCount: 112,
    reviews: sampleReviews,
    badge: 'hot',
    origin: '16,000ft Hindukush Peaks',
  },

  // 8. Wild Honey
  {
    id: 'hk-8',
    name: 'Wild Mountain Organic Honey',
    slug: 'wild-honey',
    category: 'organics',
    description: 'Raw, unfiltered wild forest honey extracted from wild beehives in untouched valleys of Chitral. Unheated with zero sugar additives.',
    shortDescription: '100% Unfiltered wild forest mountain honey.',
    photoCredit: 'Chitral Valley Wild Beehives',
    images: [
      { id: 'img-8a', url: '/images/wild_mountain_honey.jpg', alt: 'Chitral Wild Mountain Organic Honey Jar' },
    ],
    weights: [
      { weight: '500g', grams: 500, price: 3200, originalPrice: 3500, sku: 'HNY-500' },
      { weight: '1kg', grams: 1000, price: 6200, originalPrice: 6800, sku: 'HNY-1000' },
    ],
    tags: ['wild honey', 'organic', 'raw honey', 'chitral'],
    featured: true,
    bestSeller: false,
    inStock: true,
    stockQuantity: 50,
    rating: 4.9,
    reviewCount: 34,
    reviews: sampleReviews,
    badge: 'new',
    origin: 'Chitral Forest',
  },

  // 9. Dried Apricot (Without Seed)
  {
    id: 'hk-9',
    name: 'Dried Apricots Seedless (Khubani)',
    slug: 'dried-apricot-without-seed',
    category: 'dried-fruits',
    description: 'Naturally sun-dried golden apricots without seed. Intensely sweet, chewy and rich in natural dietary fiber and vitamins.',
    shortDescription: 'Golden sun-dried seedless apricots from Hunza.',
    photoCredit: 'Hunza Valley Sun-Dried Orchard Harvest',
    images: [
      { id: 'img-9a', url: '/images/dried_apricots.jpg', alt: 'Hunza Valley Sun-Dried Seedless Golden Apricots' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 550, originalPrice: 650, sku: 'APR-SLS-250' },
      { weight: '500g', grams: 500, price: 1050, originalPrice: 1200, sku: 'APR-SLS-500' },
      { weight: '1kg', grams: 1000, price: 2000, originalPrice: 2300, sku: 'APR-SLS-1000' },
    ],
    tags: ['apricot', 'khubani', 'sun-dried', 'hunza'],
    featured: false,
    bestSeller: true,
    inStock: true,
    stockQuantity: 100,
    rating: 4.8,
    reviewCount: 42,
    reviews: sampleReviews,
    badge: 'sale',
    origin: 'Hunza Valley',
  },

  // 10. Dried Fig / Anjeer Large
  {
    id: 'hk-10',
    name: 'Jumbo Sun-Dried Figs (Anjeer انجیر)',
    slug: 'dried-fig-anjeer-large',
    category: 'dried-fruits',
    description: 'Selected premium jumbo sun-dried mountain figs (Anjeer انجیر). Plump, naturally honey-sweet, and sun-cured to perfection. Packed with dietary fiber, iron, calcium, and essential minerals.',
    shortDescription: 'Jumbo sweet sun-dried figs (Anjeer) rich in calcium and natural sweetness.',
    photoCredit: 'Chitral & Swat Valley Sun-Dry Harvest',
    images: [
      { id: 'img-10a', url: '/images/anjeer_bowl.jpg', alt: 'Anjeer Large Dried Fig Ceramic Bowl' },
      { id: 'img-10b', url: '/images/anjeer_bazaar.jpg', alt: 'Large Dried Figs Anjeer Traditional Market Display' },
      { id: 'img-10c', url: '/images/anjeer_mala_toot.jpg', alt: 'Traditional Anjeer Fig Mala Garland and White Mulberries' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 850, originalPrice: 950, sku: 'FIG-250' },
      { weight: '500g', grams: 500, price: 1650, originalPrice: 1850, sku: 'FIG-500' },
      { weight: '1kg', grams: 1000, price: 3200, originalPrice: 3600, sku: 'FIG-1000' },
    ],
    tags: ['fig', 'anjeer', 'large dried figs', 'sun-dried', 'organic', 'dried-fruits'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 80,
    rating: 4.9,
    reviewCount: 47,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Organic Mountain Orchards',
  },

  // 11. Kaghazi Walnut
  {
    id: 'hk-11',
    name: 'Kaghazi Walnuts (Paper-Shell Akhrot کاغذی اخروٹ)',
    slug: 'kaghazi-walnut',
    category: 'dry-fruits',
    description: 'Directly harvested from high-altitude Chitral valleys. Famous for their fragile paper-thin shell that cracks open effortlessly between your palms. Packed with crisp, brain-shaped golden kernels rich in omega-3 and healthy mountain fats.',
    shortDescription: 'Soft paper-shell walnuts easily cracked by hand, sweet oil-rich kernels.',
    photoCredit: 'Chitral Valley Paper-Shell Orchards',
    images: [
      { id: 'img-11a', url: '/images/kaghazi_walnut_pouch.jpg', alt: 'Kaghazi Walnut Paper-Shell Akhrot with Burlap Sack' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 350, originalPrice: 420, sku: 'WAL-KAG-250' },
      { weight: '500g', grams: 500, price: 680, originalPrice: 790, sku: 'WAL-KAG-500' },
      { weight: '1kg', grams: 1000, price: 1300, originalPrice: 1500, sku: 'WAL-KAG-1000' },
    ],
    tags: ['walnut', 'akhrot', 'kaghazi', 'paper shell', 'nuts', 'chitral', 'dry-fruits'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 200,
    rating: 4.9,
    reviewCount: 58,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Chitral Paper-Shell Orchards',
  },

  // 12. Walnut Plain Kernels
  {
    id: 'hk-12',
    name: 'Walnut Plain Kernels (Giri Akhrot)',
    slug: 'walnut-plain-kernels',
    category: 'dry-fruits',
    description: 'Snow white & light amber walnut halves (giri). Zero bitterness, crunchy and rich in natural omega-3 oil.',
    shortDescription: 'Fresh light amber walnut halves.',
    photoCredit: 'Chitral Paper-Shell Akhrot Kernels',
    images: [
      { id: 'img-12a', url: '/images/walnut_kernels.jpg', alt: 'Chitral Premium Akhrot Walnut Giri Kernels' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 800, originalPrice: 900, sku: 'WAL-KRN-250' },
      { weight: '500g', grams: 500, price: 1550, originalPrice: 1700, sku: 'WAL-KRN-500' },
      { weight: '1kg', grams: 1000, price: 3000, originalPrice: 3300, sku: 'WAL-KRN-1000' },
    ],
    tags: ['walnut kernels', 'giri', 'omega-3', 'brain food'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 110,
    rating: 4.9,
    reviewCount: 45,
    reviews: sampleReviews,
    origin: 'Chitral Harvest',
  },

  // 13. Dried Mulberries (Toot / شہتوت)
  {
    id: 'hk-13',
    name: 'Mountain Dried Mulberries (Toot / شہتوت)',
    slug: 'dried-mulberries-toot',
    category: 'dried-fruits',
    description: 'Wild mountain dark mulberries (Toot / شہتوت) handpicked from ancient groves across Chitral valleys. Naturally sun-dried with intense, rich berry sweetness. Rich in iron, antioxidants, and vitamin C.',
    shortDescription: 'Intensely sweet sun-dried dark mountain mulberries (Toot).',
    photoCredit: 'Chitral Valley Ancient Groves',
    images: [
      { id: 'img-13a', url: '/images/dried_mulberries_toot.jpg', alt: 'Mountain Dried Mulberries Toot in Wooden Bowl' },
      { id: 'img-13b', url: '/images/anjeer_mala_toot.jpg', alt: 'Mountain Dried White Mulberries Toot and Anjeer Garland' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 450, originalPrice: 550, sku: 'TOT-250' },
      { weight: '500g', grams: 500, price: 850, originalPrice: 1000, sku: 'TOT-500' },
      { weight: '1kg', grams: 1000, price: 1600, originalPrice: 1900, sku: 'TOT-1000' },
    ],
    tags: ['toot', 'mulberry', 'shah toot', 'sweet', 'dried fruit', 'organic', 'dried-fruits'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 140,
    rating: 4.8,
    reviewCount: 39,
    reviews: sampleReviews,
    badge: 'sale',
    origin: 'Chitral Valley Groves',
  },

  // 14. Mix Dry Fruits Box
  {
    id: 'hk-14',
    name: 'Hindukush Deluxe Mix Dry Fruits',
    slug: 'mix-dry-fruits',
    category: 'gift-packs',
    description: 'Perfect balanced blend of Kaghazi almonds, cashews, pistachios, walnuts, raisins, and dried apricots.',
    shortDescription: 'Balanced blend of top quality nuts and dried fruits.',
    photoCredit: 'Hindukush Curated Dry Fruit Collection',
    images: [
      { id: 'img-14a', url: '/images/mix_dryfruits.jpg', alt: 'Hindukush Deluxe Mix Dry Fruits Brass Bowl' },
    ],
    weights: [
      { weight: '500g', grams: 500, price: 1800, originalPrice: 2000, sku: 'MIX-500' },
      { weight: '1kg', grams: 1000, price: 3500, originalPrice: 3900, sku: 'MIX-1000' },
    ],
    tags: ['mix dry fruit', 'assorted', 'snack', 'gift'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 130,
    rating: 4.9,
    reviewCount: 77,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Curated Harvest',
  },

  // 15. Mix Nuts Honey Jar
  {
    id: 'hk-15',
    name: 'Mix Nuts in Pure Wild Honey Jar',
    slug: 'mix-nuts-honey-jar',
    category: 'gift-packs',
    description: 'Glass jar filled with crunchy roasted almonds, cashews, walnuts & pistachios submerged in pure Chitral wild honey.',
    shortDescription: 'Nutritious energy jar of roasted nuts in wild honey.',
    photoCredit: 'Artisan Chitral Wild Honey & Roasted Nuts',
    images: [
      { id: 'img-15a', url: '/images/nuts_honey_jar.jpg', alt: 'Roasted Mixed Nuts Submerged in Wild Mountain Honey Jar' },
    ],
    weights: [
      { weight: '500g', grams: 500, price: 2000, originalPrice: 2300, sku: 'JAR-500' },
      { weight: '1kg', grams: 1000, price: 3800, originalPrice: 4200, sku: 'JAR-1000' },
    ],
    tags: ['honey jar', 'nuts', 'wild honey', 'superfood'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 45,
    rating: 5.0,
    reviewCount: 56,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Chitral Valley',
  },

  // 16. Royal Wooden Dry Fruit Gift Box (12 Compartments)
  {
    id: 'hk-16',
    name: 'Royal Wooden Dry Fruit Gift Box (12 Compartments)',
    slug: 'dry-fruit-gift-tray',
    category: 'gift-packs',
    description: 'Handcrafted luxury wooden gift box adorned with brass corner carvings, glass viewing lid, and gold-trimmed navy ribbon. 12 compartments filled with premium Giri Almonds, Kaghazi Walnuts, Jumbo Cashews, Pistachios, Anjeer, Dried Apricots, Green & Black Raisins, and Royal Dates.',
    shortDescription: 'Luxury handcrafted wooden box with ribbon & 12 partitioned premium dry fruits.',
    photoCredit: 'Hindukush Royal Artisan Gift Collection',
    images: [
      { id: 'img-16a', url: '/images/gift_box_ribbon.jpg', alt: 'Royal Luxury Dry Fruit Wooden Gift Box with Ribbon' },
    ],
    weights: [
      { weight: '1 Luxury Box (1.2kg)', grams: 1200, price: 5500, originalPrice: 6500, sku: 'TRAY-ROYAL' },
      { weight: 'Hamper Set (2.4kg)', grams: 2400, price: 9800, originalPrice: 11500, sku: 'BOX-ROYAL-24' },
    ],
    tags: ['gift box', 'dry fruit box', 'wooden box', 'luxury gift', 'eid gift', 'wedding gift', 'gift-packs'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 45,
    rating: 5.0,
    reviewCount: 63,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Handcrafted Artisan Gift Box',
  },

  // 17. Chitrali Cap (Pakol)
  {
    id: 'hk-17',
    name: 'Chitrali Cap (Phakol / Pakol)',
    slug: 'chitrali-cap-phakol-pakol',
    category: 'traditional-wear',
    description: 'Authentic hand-spun 100% pure wool Pakol cap from Chitral. Soft, warm, durable and classic mountain headwear.',
    shortDescription: 'Authentic 100% hand-spun wool Chitrali Pakol cap.',
    photoCredit: 'Authentic Chitral Mountain Sheep Wool Handcraft',
    images: [
      { id: 'img-17a', url: '/images/chitrali_pakol.jpg', alt: 'Authentic Chitrali Pure Wool Pakol Cap' },
    ],
    weights: [
      { weight: '1 Piece', grams: 200, price: 1950, originalPrice: 2300, sku: 'PAKOL-01' },
    ],
    tags: ['pakol', 'cap', 'chitrali', 'wool', 'traditional headwear'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 60,
    rating: 4.9,
    reviewCount: 88,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Chitral Artisans',
  },

  // 18. Chitrali Chugha (For Men)
  {
    id: 'hk-18',
    name: 'Hand-Woven Chitrali Chugha (Men)',
    slug: 'chitrali-chugha-men',
    category: 'traditional-wear',
    description: 'Masterfully hand-spun pure Chitrali mountain wool coat gown (Chugha), intricately embroidered along the lapels and cuffs with traditional tribal motifs. Features an authentic Pakol companion aesthetic.',
    shortDescription: 'Masterfully hand-spun pure Chitrali wool embroidered coat gown.',
    photoCredit: 'Chitral Heritage Artisans',
    images: [
      { id: 'img-18a', url: '/images/chitrali_chugha.jpg', alt: 'Hand-Woven Chitrali Chugha Coat' },
    ],
    weights: [
      { weight: 'Standard Free Size', grams: 1500, price: 9500, originalPrice: 11000, sku: 'CHUG-MEN-01' },
      { weight: 'Custom Tailored Fit', grams: 1600, price: 12500, originalPrice: 14000, sku: 'CHUG-MEN-02' },
    ],
    tags: ['chugha', 'men coat', 'chitrali dress', 'traditional attire', 'pakol', 'heritage'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 15,
    rating: 5.0,
    reviewCount: 38,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Chitral Artisan Guild',
  },

  // 19. Ladies Shawl (Women's Collection)
  {
    id: 'hk-19',
    name: 'Pure Wool Hand-Embroidered Ladies Shawl (خواتین شال)',
    slug: 'ladies-shawl',
    category: 'traditional-wear',
    subCategory: 'women-shawls',
    description: 'Soft, luxurious pure mountain sheep wool shawl featuring intricate Chitrali floral thread work needlework (Tilla & Resham). Hand-crafted with delicate fringe edges. Fully customizable in natural fleece tones, botanical herbal dyes, and custom dimensions.',
    shortDescription: 'Hand-embroidered pure wool shawl for women. Custom colors & sizes available.',
    photoCredit: 'Chitral Heritage Hand-Needlework Guild',
    images: [
      { id: 'img-19a', url: '/images/embroidered_ladies_shawl.jpg', alt: 'Pure Wool Hand-Embroidered Chitrali Ladies Shawl' },
    ],
    weights: [
      { weight: 'Standard (2.25m × 1.15m)', grams: 450, price: 4200, originalPrice: 4800, sku: 'SHW-LAD-STD' },
      { weight: 'Festive Royal (2.5m × 1.25m)', grams: 550, price: 5500, originalPrice: 6200, sku: 'SHW-LAD-ROYAL' },
      { weight: 'Custom Made to Order', grams: 500, price: 5800, originalPrice: 6800, sku: 'SHW-LAD-CUSTOM' },
    ],
    tags: ['shawl', 'ladies-shawl', 'women', 'embroidery', 'wool', 'pashmina', 'custom-made', 'custom-color', 'traditional-wear'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 25,
    rating: 4.9,
    reviewCount: 31,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Chitral Heritage Artisans',
  },

  // 19b. Men's Chitrali Mountain Wool Shawl / Chaddar (مردانہ پٹو شال)
  {
    id: 'hk-19b',
    name: "Men's Chitrali Pure Mountain Wool Shawl / Chaddar (مردانہ پٹو شال)",
    slug: 'mens-chitrali-wool-shawl-chaddar',
    category: 'traditional-wear',
    subCategory: 'men-shawls',
    description: 'Authentic Chitrali hand-spun 100% pure mountain sheep wool shawl (Pattu Chaddar) for men. Heavyweight, windproof, durable, and naturally insulating with classic woven earthy border stripes and hand-knotted fringe. Worn for generations across the Hindu Kush. Available in natural undyed fleece (camel, ivory, charcoal) or bespoke custom dyed colors.',
    shortDescription: 'Traditional pure mountain sheep wool Pattu Chaddar for men. Custom sizes & shades available.',
    photoCredit: 'Chitral Valley Master Pattu Weavers',
    images: [
      { id: 'img-19b', url: '/images/mens_chitrali_shawl.jpg', alt: "Men's Chitrali Pure Mountain Wool Shawl Chaddar" },
    ],
    weights: [
      { weight: 'Standard Chaddar (2.5m × 1.25m)', grams: 950, price: 4500, originalPrice: 5200, sku: 'SHW-MEN-STD' },
      { weight: 'Heavy Winter Warmth (3.0m × 1.5m)', grams: 1300, price: 6200, originalPrice: 7000, sku: 'SHW-MEN-HVY' },
      { weight: 'Custom Made to Order', grams: 1100, price: 5900, originalPrice: 6800, sku: 'SHW-MEN-CUSTOM' },
    ],
    tags: ['shawl', 'men-shawl', 'men', 'pattu', 'chaddar', 'pure-wool', 'custom-made', 'custom-color', 'traditional-wear'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 20,
    rating: 5.0,
    reviewCount: 27,
    reviews: sampleReviews,
    badge: 'new',
    origin: 'Chitral Valley Pattu Guild',
  },

  // 20. Ladies Chitrali Chugha
  {
    id: 'hk-20',
    name: 'Royal Ladies Chitrali Chugha',
    slug: 'ladies-chitrali-chugha',
    category: 'traditional-wear',
    description: 'Exquisite hand-crafted long coat for women decorated with gold needlework embroidery and traditional Chitrali motifs.',
    shortDescription: 'Luxury hand-embroidered royal Chugha coat for ladies.',
    photoCredit: 'Chitral Royal Artisan Embroidered Wool',
    images: [
      { id: 'img-20a', url: '/images/royal_ladies_chugha.jpg', alt: 'Royal Ladies Chitrali Hand-Embroidered Chugha Coat' },
    ],
    weights: [
      { weight: '1 Piece', grams: 1200, price: 10000, originalPrice: 11500, sku: 'CHUG-LAD-01' },
    ],
    tags: ['ladies chugha', 'royal', 'handicraft', 'coat'],
    featured: true,
    bestSeller: false,
    inStock: true,
    stockQuantity: 10,
    rating: 5.0,
    reviewCount: 14,
    reviews: sampleReviews,
    badge: 'limited',
    origin: 'Master Weavers',
  },

  // 21. Chitrali Rings (Animal Horn)
  {
    id: 'hk-21',
    name: 'Chitrali Handcrafted Horn Rings',
    slug: 'chitrali-rings-animal-horn',
    category: 'traditional-wear',
    description: 'Authentic mountain animal horn rings, meticulously hand-carved and inlaid with vibrant traditional Kalash geometric lacquer motifs. Completely handmade and unique.',
    shortDescription: 'Hand-carved animal horn rings with traditional Kalash lacquer inlays.',
    photoCredit: 'Kalash Valley Tribal Crafts',
    images: [
      { id: 'img-21a', url: '/images/chitrali_horn_rings.jpg', alt: 'Chitrali Handcrafted Animal Horn Rings' },
    ],
    weights: [
      { weight: '1 Ring (Single)', grams: 25, price: 1200, originalPrice: 1500, sku: 'RING-HORN-01' },
      { weight: 'Set of 3 Rings', grams: 75, price: 3200, originalPrice: 3800, sku: 'RING-HORN-03' },
      { weight: 'Collector Box (10 Rings)', grams: 250, price: 9500, originalPrice: 12000, sku: 'RING-HORN-10' },
    ],
    tags: ['ring', 'horn', 'jewelry', 'handicraft', 'kalash', 'traditional-wear'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 40,
    rating: 4.9,
    reviewCount: 29,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Kalash Valley Crafts',
  },

  // 22. Anar Dana (Dried Pomegranate)
  {
    id: 'hk-22',
    name: 'Wild Sun-Dried Anar Dana (Pomegranate)',
    slug: 'anar-dana-dried-pomegranate',
    category: 'dried-fruits',
    description: '100% natural, sun-dried seeds of organic wild mountain pomegranates from Chitral valleys. Unadulterated, wonderfully tangy, and rich in natural antioxidants.',
    shortDescription: 'Tangy, sun-dried mountain wild pomegranate aril seeds.',
    photoCredit: 'Wild Chitral Valley Harvest',
    images: [
      { id: 'img-22a', url: '/images/anardana_bowl.jpg', alt: 'Wild Dried Anar Dana Seeds' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 550, originalPrice: 650, sku: 'ANR-250' },
      { weight: '500g', grams: 500, price: 1050, originalPrice: 1200, sku: 'ANR-500' },
      { weight: '1kg', grams: 1000, price: 2000, originalPrice: 2300, sku: 'ANR-1000' },
    ],
    tags: ['anar dana', 'pomegranate', 'tangy', 'organic', 'spices', 'dried-fruits'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 80,
    rating: 4.9,
    reviewCount: 36,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Wild Chitral Peaks',
  },

  // 23. Dried Amlok (Japani Phal / Persimmon / خشک املوک)
  {
    id: 'hk-23',
    name: 'Organic Dried Amlok (Japani Phal / Persimmon)',
    slug: 'dried-amlok-persimmon',
    category: 'dried-fruits',
    description: '100% natural sun-dried black mountain persimmons (Amlok / خشک املوک). Intensely sweet with a honeyed, date-like chewy texture, packed with dietary fiber and natural energy.',
    shortDescription: 'Sweet sun-dried black mountain persimmons (Amlok / Japani Phal).',
    photoCredit: 'Valley Traditional Sun-Dry',
    images: [
      { id: 'img-23a', url: '/images/dried_amlok.jpg', alt: 'Dried Amlok Japani Phal Persimmon' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 650, originalPrice: 750, sku: 'AML-250' },
      { weight: '500g', grams: 500, price: 1200, originalPrice: 1400, sku: 'AML-500' },
      { weight: '1kg', grams: 1000, price: 2300, originalPrice: 2600, sku: 'AML-1000' },
    ],
    tags: ['amlok', 'persimmon', 'japani phal', 'sun-dried', 'organic', 'dried-fruits'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 65,
    rating: 4.9,
    reviewCount: 41,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Swat & Chitral Valleys',
  },

  // 24. Sun-Dried Mountain Apple Rings (سیب خشک)
  {
    id: 'hk-24',
    name: 'Sun-Dried Mountain Apple Rings (سیب خشک)',
    slug: 'sun-dried-apple-rings',
    category: 'dried-fruits',
    description: 'Naturally orchard-ripened mountain apples sliced into delicate rings and sun-dried in the crisp mountain air. Chewy, naturally tart-sweet, and completely free of added sugars or preservatives.',
    shortDescription: 'Naturally sun-dried tart-sweet mountain apple rings.',
    photoCredit: 'Hunza Valley Orchard Harvest',
    images: [
      { id: 'img-24a', url: '/images/dried_apple.jpg', alt: 'Sun-Dried Mountain Apple Rings' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 600, originalPrice: 700, sku: 'APL-250' },
      { weight: '500g', grams: 500, price: 1150, originalPrice: 1300, sku: 'APL-500' },
      { weight: '1kg', grams: 1000, price: 2200, originalPrice: 2500, sku: 'APL-1000' },
    ],
    tags: ['dried apple', 'apple rings', 'seb khushk', 'hunza', 'sun-dried', 'dried-fruits'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 90,
    rating: 4.8,
    reviewCount: 33,
    reviews: sampleReviews,
    badge: 'new',
    origin: 'Hunza Valley Orchards',
  },

  // 25. Traditional Anjeer Mala & White Toot Pack (انجیر لڑی اور سفید توت)
  {
    id: 'hk-25',
    name: 'Traditional Anjeer Mala & White Toot Pack (انجیر لڑی اور سفید توت)',
    slug: 'traditional-anjeer-mala-toot-pack',
    category: 'dried-fruits',
    description: 'Heritage mountain dried fruit pair from Chitral valleys. Features traditionally hand-threaded long garlands of sun-dried mountain figs (Anjeer Mala) served alongside naturally sweet, chewy wild white mulberries (Toot). Rich in iron, dietary fiber, and wholesome mountain vitality.',
    shortDescription: 'Hand-threaded Anjeer fig rope garland paired with sweet sun-dried white Toot.',
    photoCredit: 'Chitral Valley Traditional Orchard Harvest',
    images: [
      { id: 'img-25a', url: '/images/anjeer_mala_toot.jpg', alt: 'Traditional Anjeer Fig Mala Garland and White Mulberries' },
    ],
    weights: [
      { weight: '500g', grams: 500, price: 950, originalPrice: 1100, sku: 'MALA-TOT-500' },
      { weight: '1kg', grams: 1000, price: 1850, originalPrice: 2150, sku: 'MALA-TOT-1000' },
    ],
    tags: ['anjeer', 'fig', 'mala', 'garland', 'toot', 'mulberry', 'dried-fruits', 'organic'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 70,
    rating: 4.9,
    reviewCount: 38,
    reviews: sampleReviews,
    badge: 'hot',
    origin: 'Chitral Valley Heritage',
  },

  // 26. Vacuum-Sealed Chitrali Walnut Confection (Halwa-e-Joz / مغز اخروٹ)
  {
    id: 'hk-26',
    name: 'Vacuum-Sealed Chitrali Walnut Confection (Halwa-e-Joz / مغز اخروٹ)',
    slug: 'vacuum-sealed-chitrali-walnut-confection',
    category: 'gift-packs',
    description: 'Specialty Chitrali mountain walnut confection prepared with crushed premium walnut meats, mountain honey, and natural grape reduction. Hermetically vacuum-sealed in heavy-duty embossed barrier pouches to preserve mountain freshness, aroma, and crisp nutty texture for long shelf life and travel.',
    shortDescription: 'Aroma-locked vacuum-sealed mountain walnut candy delicacy.',
    photoCredit: 'Chitral Heritage Vacuum Fresh Pack',
    images: [
      { id: 'img-26a', url: '/images/vacuum_pack_walnut_confection.jpg', alt: 'Vacuum Sealed Chitrali Walnut Confection Pack' },
    ],
    weights: [
      { weight: '250g', grams: 250, price: 650, originalPrice: 750, sku: 'VAC-WAL-250' },
      { weight: '500g', grams: 500, price: 1250, originalPrice: 1400, sku: 'VAC-WAL-500' },
      { weight: '1kg', grams: 1000, price: 2400, originalPrice: 2700, sku: 'VAC-WAL-1000' },
    ],
    tags: ['walnut confection', 'halwa e joz', 'vacuum pack', 'travel pack', 'sweet', 'gift-packs'],
    featured: true,
    bestSeller: true,
    inStock: true,
    stockQuantity: 85,
    rating: 4.9,
    reviewCount: 42,
    reviews: sampleReviews,
    badge: 'new',
    origin: 'Chitral Heritage Vacuum Fresh',
  },
];

// One collection per product category. Counts always follow the live catalog.
export const categories: Category[] = [
  {
    id: 'nuts',
    name: 'Nuts & kernels',
    slug: 'dry-fruits',
    description: 'Almonds, walnuts, cashews, pistachios and mountain chilgoza.',
    image: '/images/almonds_giri.jpg',
  },
  {
    id: 'dried-fruits',
    name: 'Dried fruits',
    slug: 'dried-fruits',
    description: 'Sun-dried apricots, figs, mulberries and orchard favourites.',
    image: '/images/anjeer_bowl.jpg',
  },
  {
    id: 'organics',
    name: 'Honey & shilajeet',
    slug: 'organics',
    description: 'Wild mountain honey and traditional mountain shilajeet.',
    image: '/images/pure_shilajeet.jpg',
  },
  {
    id: 'gifts',
    name: 'Gifts & local sweets',
    slug: 'gift-packs',
    description: 'Chitrali kilao, nut assortments and thoughtful gift boxes.',
    image: '/images/gift_box_ribbon.jpg',
  },
  {
    id: 'traditional-wear',
    name: 'Traditional wear',
    slug: 'traditional-wear',
    description: 'Chughas, pakols, wool shawls and handcrafted accessories.',
    image: '/images/chitrali_chugha.jpg',
  },
].map((category) => ({
  ...category,
  productCount: products.filter((product) => product.category === category.slug).length,
  featured: true,
}));

// Helper utilities
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(category: string, currentId: string): Product[] {
  return products.filter((p) => p.category === category && p.id !== currentId).slice(0, 4);
}

// ─── Coupons Data ─────────────────────────────────────────────────────────────
export const validCoupons: Record<string, number> = {
  WELCOME10: 10,
  HINDUKUSH15: 15,
};

// ─── Pakistan Cities & Areas ──────────────────────────────────────────────────
export const pakistanCities: Record<string, string[]> = {
  Islamabad: ['F-6', 'F-7', 'F-8', 'F-10', 'G-9', 'G-11', 'I-8', 'DHA Phase 1', 'Bahria Town'],
  Rawalpindi: ['Saddar', 'Satellite Town', 'Westridge', 'Bahria Town', 'DHA Phase 1', 'Chaklala'],
  Lahore: ['Gulberg', 'DHA Phase 5', 'DHA Phase 6', 'Model Town', 'Johar Town', 'Cantt', 'Mall Road'],
  Karachi: ['Clifton', 'DHA Phase 5', 'PECHS', 'Gulshan-e-Iqbal', 'North Nazimabad', 'Saddar'],
  Chitral: ['Main Bazar', 'Booni', 'Garam Chasma', 'Drosh', 'Mastuj', 'Ayun'],
  Peshawar: ['Hayatabad', 'University Town', 'Cantt', 'Saddar'],
  Quetta: ['Cantt', 'Jinnah Road', 'Samungli Road'],
  Multan: ['Gulgasht Colony', 'Cantt', 'Boson Road'],
  Faisalabad: ['People Colony', 'D Ground', 'Civil Lines'],
};

// ─── Mock Orders Data ─────────────────────────────────────────────────────────
export const mockOrders: any[] = [
  {
    id: 'ord-1001',
    orderNumber: 'HK-98214',
    items: [
      {
        productId: 'hk-3',
        name: 'Pine Nuts Roasted (Chilgoza)',
        image: '/images/roasted_chilgoza.jpg',
        weight: '500g',
        quantity: 1,
        price: 4600,
      },
      {
        productId: 'hk-1',
        name: 'Kaghazi Almonds (Chitral Valley)',
        image: '/images/kaghazi_almonds.jpg',
        weight: '500g',
        quantity: 1,
        price: 1250,
      },
    ],
    subtotal: 5850,
    deliveryFee: 0,
    discount: 0,
    total: 5850,
    paymentMethod: 'cod',
    status: 'shipped',
    shippingAddress: {
      fullName: 'Sajawal Khan',
      phone: '+92 306 4166360',
      address: 'House #45, Street 12, F-8/3',
      city: 'Islamabad',
      area: 'F-8',
      province: 'Islamabad Capital Territory',
    },
    createdAt: '2026-09-26T10:30:00Z',
    updatedAt: '2026-09-27T08:00:00Z',
    estimatedDelivery: '2026-09-28',
    timeline: [
      { status: 'pending', label: 'Order Placed', description: 'Your order was received.', completed: true, current: false },
      { status: 'confirmed', label: 'Order Confirmed', description: 'Verified by merchant.', completed: true, current: false },
      { status: 'shipped', label: 'Dispatched via TCS', description: 'Tracking ID: TCS-882194', completed: true, current: true },
      { status: 'delivered', label: 'Delivered', description: 'Package arrived at destination.', completed: false, current: false },
    ],
  },
];
