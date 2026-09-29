import { useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ShoppingCart, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { EmptyState } from '@/components/ui/index';
import { OrderTotals } from './OrderTotals';

export function CartDrawer() {
  const {
    items, isOpen, setOpen, removeItem, updateQuantity,
    getItemCount,
  } = useCartStore();

  const previousFocus = useRef<HTMLElement | null>(null);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-[101] flex h-[100dvh] w-full max-w-md flex-col bg-background shadow-2xl focus:outline-none"
          onOpenAutoFocus={() => { previousFocus.current = document.activeElement as HTMLElement | null; }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            previousFocus.current?.focus();
          }}
        >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <Dialog.Title className="font-display font-semibold text-2xl">Your bag</Dialog.Title>
            {items.length > 0 && (
              <span className="text-sm text-muted-foreground">({getItemCount()})</span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-accent transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <Dialog.Description className="sr-only">Review your selected items, quantities and delivery information.</Dialog.Description>

        {/* Items */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain custom-scrollbar">
          {items.length === 0 ? (
            <EmptyState
              icon={<ShoppingCart />}
              title="Your cart is empty"
              description="Discover mountain-grown essentials and traditional craft."
              action={
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-brand-600 transition-colors"
                >
                  Browse Products
                </Link>
              }
            />
          ) : (
            <div className="p-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 group">
                  {/* Image */}
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden bg-muted"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-sm font-semibold text-foreground hover:text-primary line-clamp-2 leading-snug"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.weight}</p>
                    {item.customDetails && (
                      <div className="mt-1.5 flex flex-wrap gap-1 text-[10px]">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                          ✨ Custom ({item.customDetails.gender || 'Shawl'})
                        </span>
                        {item.customDetails.colorName && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 font-medium">
                            {item.customDetails.colorHex && (
                              <span className="w-2 h-2 rounded-full border border-stone-400" style={{ backgroundColor: item.customDetails.colorHex }} />
                            )}
                            {item.customDetails.colorName}
                          </span>
                        )}
                        {item.customDetails.dimensions && (
                          <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                            {item.customDetails.dimensions}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                      {/* Quantity */}
                      <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-10 w-10 items-center justify-center hover:bg-accent transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= 20}
                          className="flex h-10 w-10 items-center justify-center hover:bg-accent transition-colors disabled:opacity-40"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-all"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Checkout */}
        {items.length > 0 && (
          <div className="max-h-[55dvh] shrink-0 overflow-y-auto border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-4 bg-background">
            {/* Summary */}
            <OrderTotals />

            {/* CTA Buttons */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-brand-600 transition-colors shadow-brand"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center h-11 rounded-xl border border-input text-sm font-medium hover:bg-accent transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
