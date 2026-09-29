/**
 * Delivery prices must come from the store's delivery configuration or quote API.
 * A missing or invalid quote is unknown, never a zero-cost delivery offer.
 * The storefront currently has no connected admin API, so quotes start pending.
 */
export function normalizeDeliveryFee(amount: number | null | undefined): number | null {
  return typeof amount === 'number' && Number.isFinite(amount) && amount > 0
    ? Math.round(amount * 100) / 100
    : null;
}

export const DELIVERY_PENDING_LABEL = 'To be confirmed';
export const DELIVERY_PENDING_NOTE =
  'Delivery is charged separately. The delivery charge and final amount will be confirmed with you before dispatch.';
