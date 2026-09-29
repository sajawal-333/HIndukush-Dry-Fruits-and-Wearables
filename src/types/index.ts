// ─── Product Types ───────────────────────────────────────────────────────────
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategory?: string;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  weights: WeightOption[];
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  badge?: 'new' | 'sale' | 'hot' | 'limited';
  origin?: string;
  photoCredit?: string;
}

export interface WeightOption {
  weight: string;   // e.g. "250g", "500g", "1kg"
  grams: number;    // numeric grams for sorting
  price: number;    // PKR
  originalPrice?: number; // for discount display
  discount?: number; // percentage
  sku: string;
}

// ─── Category Types ───────────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

// ─── Cart Types ───────────────────────────────────────────────────────────────
export interface CartItemCustomDetails {
  gender?: 'Men' | 'Women';
  colorName?: string;
  colorHex?: string;
  dimensions?: string;
  woolGrade?: string;
  embroideryStyle?: string;
  customerNotes?: string;
}

export interface CartItem {
  id: string;          // productId + weight/custom combination
  productId: string;
  name: string;
  image: string;
  weight: string;
  grams: number;
  price: number;
  originalPrice?: number;
  quantity: number;
  slug: string;
  customDetails?: CartItemCustomDetails;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  couponDiscount?: number;
}

// ─── Order Types ──────────────────────────────────────────────────────────────
export type PaymentMethod = 'cod' | 'jazzcash';
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  weight: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  area: string;
  postalCode?: string;
  province: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  timeline: OrderTimelineEvent[];
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

// ─── User / Auth Types ────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: ShippingAddress[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Filter Types ─────────────────────────────────────────────────────────────
export interface ShopFilters {
  search: string;
  category: string;
  subCategory?: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  inStockOnly: boolean;
  page: number;
  perPage: number;
}

// ─── Checkout Types ───────────────────────────────────────────────────────────
export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  area: string;
  postalCode?: string;
  province: string;
  paymentMethod: PaymentMethod;
  jazzCashNumber?: string;
  notes?: string;
}
