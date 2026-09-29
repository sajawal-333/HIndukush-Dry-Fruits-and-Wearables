import { formatPrice } from '@/lib/utils';
import { DELIVERY_PENDING_LABEL, DELIVERY_PENDING_NOTE } from '@/lib/shipping';
import { useCartStore } from '@/store/cartStore';

/** One pricing summary shared by the cart, drawer and checkout. */
export function OrderTotals() {
  const cart = useCartStore();
  const deliveryFee = cart.getDeliveryFee();
  const total = cart.getTotal();
  const discount = cart.getCouponAmount();

  return (
    <div className="space-y-3 text-sm" aria-live="polite" aria-atomic="true">
      <dl className="space-y-2.5">
        <div className="flex justify-between gap-4 text-muted-foreground">
          <dt>Subtotal</dt>
          <dd className="shrink-0 tabular-nums">{formatPrice(cart.getSubtotal())}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between gap-4 text-emerald-700">
            <dt>Discount{cart.couponCode ? ` (${cart.couponCode})` : ''}</dt>
            <dd className="shrink-0 tabular-nums">−{formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4 text-muted-foreground">
          <dt>Delivery</dt>
          <dd className="text-right font-medium">
            {deliveryFee === null ? DELIVERY_PENDING_LABEL : formatPrice(deliveryFee)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-border pt-3 text-base font-semibold text-foreground">
          <dt>{total === null ? 'Items total' : 'Order total'}</dt>
          <dd className="shrink-0 tabular-nums">{formatPrice(total ?? cart.getMerchandiseTotal())}</dd>
        </div>
      </dl>
      {deliveryFee === null && (
        <p className="rounded-xl bg-secondary/50 px-3.5 py-3 text-xs leading-relaxed text-muted-foreground">
          {DELIVERY_PENDING_NOTE}
        </p>
      )}
    </div>
  );
}
