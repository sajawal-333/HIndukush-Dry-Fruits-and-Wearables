import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag, ArrowRight, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/index';
import { toast } from '@/components/ui/index';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import { OrderTotals } from '@/components/cart/OrderTotals';

export default function CartPage() {
  const {
    items, removeItem, updateQuantity,
    getItemCount,
    couponCode, applyCoupon, removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    toast({
      title: result.success ? 'Coupon applied!' : 'Invalid coupon',
      description: result.message,
      variant: result.success ? 'success' : 'error',
    });
    if (result.success) setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-background flex items-center justify-center px-4">
        <EmptyState
          icon={<ShoppingBag />}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          action={
            <Link to="/shop" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground">
              Explore the collection <ArrowRight className="h-5 w-5" />
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary/20 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="section-title">Your shopping bag</h1>
          <p className="text-muted-foreground mt-2">{getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}, thoughtfully chosen.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid items-start lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-12">
          {/* ── Cart Items ── */}
          <div className="min-w-0 space-y-4">
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-2 border-b border-border">
              <span>Product</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Price</span>
              <span />
            </div>

            {items.map((item) => (
              <div key={item.id} className="relative grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center bg-card border border-border rounded-2xl p-4">
                {/* Product */}
                <div className="col-span-2 sm:col-span-1 flex min-w-0 items-center gap-4 pr-8 sm:pr-0">
                  <Link to={`/product/${item.slug}`} className="h-20 w-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover hover:scale-105 transition-transform" />
                  </Link>
                  <div className="min-w-0">
                    <Link to={`/product/${item.slug}`} className="font-semibold text-sm text-foreground hover:text-primary line-clamp-2 transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.weight}</p>
                    {item.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">{formatPrice(item.originalPrice)}</p>
                    )}
                    {item.customDetails && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Custom made{item.customDetails.colorName ? ` · ${item.customDetails.colorName}` : ''}{item.customDetails.dimensions ? ` · ${item.customDetails.dimensions}` : ''}</p>}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center sm:justify-center">
                  <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-10 w-10 items-center justify-center hover:bg-accent transition-colors" aria-label={`Decrease quantity of ${item.name}`}>
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= 20} className="flex h-10 w-10 items-center justify-center hover:bg-accent transition-colors disabled:opacity-40" aria-label={`Increase quantity of ${item.name}`}>
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-bold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                  <p className="text-xs text-muted-foreground">{formatPrice(item.price)} each</p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => { removeItem(item.id); toast({ title: 'Removed', variant: 'default' }); }}
                  className="absolute right-2 top-2 sm:static flex h-11 w-11 items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 text-muted-foreground transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Continue shopping */}
            <Link to="/shop" className="flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all mt-2">
              ← Continue Shopping
            </Link>
          </div>

          {/* ── Order Summary ── */}
          <aside aria-label="Order summary" className="space-y-4 lg:sticky lg:top-32">
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
              <h2 className="font-display font-bold text-lg">Order Summary</h2>

              {/* Coupon */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
                      <Tag className="h-4 w-4" />
                      {couponCode} applied!
                    </div>
                    <button onClick={removeCoupon} className="flex h-10 w-10 items-center justify-center text-emerald-600 hover:text-emerald-800" aria-label="Remove coupon">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      aria-label="Coupon code"
                      leftIcon={<Tag className="h-4 w-4" />}
                      className="flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <Button onClick={handleApplyCoupon} variant="outline" disabled={!couponInput.trim()}>Apply</Button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <OrderTotals />

              {/* Checkout */}
              <Link to="/checkout" className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-brand-600">
                Continue to checkout <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Payment methods */}
              <div className="flex items-center justify-center gap-3 pt-2">
                {['Cash on delivery', 'JazzCash'].map((m) => (
                  <span key={m} className="text-xs bg-muted px-2 py-1 rounded font-medium text-muted-foreground">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
