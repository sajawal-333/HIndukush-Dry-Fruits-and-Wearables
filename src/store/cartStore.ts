import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, WeightOption } from '../types';
import { getCartSubtotal } from '../lib/utils';
import { normalizeDeliveryFee } from '../lib/shipping';
import { validCoupons } from '../data/products';

interface CartState {
  items: CartItem[];
  couponCode: string;
  couponDiscount: number;
  isOpen: boolean;
  deliveryFee: number | null;

  // Actions
  addItem: (product: Product, weight: WeightOption, quantity?: number) => void;
  addCustomItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setOpen: (open: boolean) => void;
  // Connect this to a validated server quote when the admin API is available.
  setDeliveryFee: (amount: number | null) => void;

  // Computed (as getters via functions)
  getSubtotal: () => number;
  getDeliveryFee: () => number | null;
  getCouponAmount: () => number;
  getMerchandiseTotal: () => number;
  getTotal: () => number | null;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      couponDiscount: 0,
      isOpen: false,
      deliveryFee: null,

      addItem: (product, weight, quantity = 1) => {
        const id = `${product.id}-${weight.weight}`;
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              deliveryFee: null,
              items: state.items.map((i) =>
                i.id === id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, 20) }
                  : i
              ),
            };
          }
          const newItem: CartItem = {
            id,
            productId: product.id,
            name: product.name,
            image: product.images[0]?.url ?? '',
            weight: weight.weight,
            grams: weight.grams,
            price: weight.price,
            originalPrice: weight.originalPrice,
            quantity,
            slug: product.slug,
          };
          return { items: [...state.items, newItem], deliveryFee: null };
        });
      },

      addCustomItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              deliveryFee: null,
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, 20) }
                  : i
              ),
            };
          }
          return { items: [...state.items, item], deliveryFee: null };
        });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id), deliveryFee: null })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          deliveryFee: null,
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(quantity, 20) } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: '', couponDiscount: 0, deliveryFee: null }),

      applyCoupon: (code: string) => {
        const upper = code.trim().toUpperCase();
        const discount = validCoupons[upper];
        if (discount !== undefined) {
          set({ couponCode: upper, couponDiscount: discount });
          return { success: true, message: `Coupon applied! ${discount}% off` };
        }
        return { success: false, message: 'Invalid coupon code' };
      },

      removeCoupon: () => set({ couponCode: '', couponDiscount: 0 }),

      setOpen: (open) => set({ isOpen: open }),

      setDeliveryFee: (amount) => set({ deliveryFee: normalizeDeliveryFee(amount) }),

      getSubtotal: () => getCartSubtotal(get().items),

      getDeliveryFee: () => get().deliveryFee,

      getCouponAmount: () => {
        const subtotal = getCartSubtotal(get().items);
        return Math.round((subtotal * get().couponDiscount) / 100);
      },

      getMerchandiseTotal: () => Math.max(0, get().getSubtotal() - get().getCouponAmount()),

      getTotal: () => {
        const deliveryFee = get().getDeliveryFee();
        return deliveryFee === null ? null : get().getMerchandiseTotal() + deliveryFee;
      },

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'kkk-cart',
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as Partial<CartState>;
        const couponCode = typeof state.couponCode === 'string' ? state.couponCode : '';
        const couponDiscount = validCoupons[couponCode] ?? 0;
        return {
          items: Array.isArray(state.items) ? state.items : [],
          couponCode: couponDiscount > 0 ? couponCode : '',
          couponDiscount,
        };
      },
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
      }),
    }
  )
);
