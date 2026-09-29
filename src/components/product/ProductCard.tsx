import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ShoppingBag, Star, Sparkles } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/components/ui/index';
import { cn, formatPrice } from '@/lib/utils';
import { CustomShawlModal } from '@/components/shawl/CustomShawlModal';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const optionId = useId();
  const [selectedSku, setSelectedSku] = useState(product.weights[0]?.sku);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const selectedOption = product.weights.find((option) => option.sku === selectedSku) ?? product.weights[0];
  const available = product.inStock && product.stockQuantity > 0 && Boolean(selectedOption);
  const isWearable = product.category === 'traditional-wear';
  const isCustomMade = product.tags.includes('custom-made');
  const originalPrice = selectedOption?.originalPrice;
  const discount = originalPrice && originalPrice > selectedOption.price
    ? Math.round((1 - selectedOption.price / originalPrice) * 100)
    : 0;
  const badge = !available ? 'Unavailable' : product.bestSeller ? 'Bestseller' : discount > 0 ? `${discount}% off` : product.badge;

  const handleAddToCart = () => {
    if (!available || !selectedOption) return;
    addItem(product, selectedOption, 1);
    toast({ title: 'Added to your bag', description: `${product.name} · ${selectedOption.weight}`, variant: 'success' });
    setCartOpen(true);
  };

  return (
    <article className={cn('group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E5E8DF] bg-white transition-shadow duration-300 hover:shadow-[0_12px_32px_-16px_rgba(32,62,53,0.22)]', className)}>
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden bg-[#F4F2EB]" aria-label={`View ${product.name}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <img src={product.images[0]?.url} alt={product.images[0]?.alt || product.name} loading="lazy" decoding="async" className={cn('h-full w-full transition-transform duration-500 motion-reduce:transition-none', isWearable ? 'object-contain' : 'object-cover group-hover:scale-[1.03] motion-reduce:transform-none')} />
        </div>
        {badge && <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold capitalize tracking-wide text-[#203E35] shadow-sm backdrop-blur-sm">{badge}</span>}
      </Link>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4 lg:p-5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          {product.origin && <p className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-[#6F7869]">{product.origin}</p>}
          {product.reviewCount > 0 && <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-[#5E695F]" aria-label={`${product.rating.toFixed(1)} out of 5, ${product.reviewCount} reviews`}><Star aria-hidden="true" className="h-3 w-3 fill-[#B18A55] text-[#B18A55]" />{product.rating.toFixed(1)} <span className="text-[#747D74]">({product.reviewCount})</span></span>}
        </div>
        <Link to={`/product/${product.slug}`} className="rounded-sm hover:text-[#203E35]"><h3 className="font-sans text-[15px] font-semibold leading-snug text-[#262E29] sm:text-base">{product.name}</h3></Link>
        <p className="mb-5 mt-2 line-clamp-2 text-xs leading-relaxed text-[#697269]">{product.shortDescription}</p>

        <div className="mt-auto space-y-3">
          {selectedOption && <div>
            <label htmlFor={optionId} className="mb-1.5 block text-[11px] font-medium text-[#697269]">{isWearable ? 'Size / option' : product.category === 'gift-packs' ? 'Pack size' : 'Pack weight'}</label>
            <div className="relative">
              <select id={optionId} aria-label={`${isWearable ? 'Option' : 'Pack size'} for ${product.name}`} value={selectedOption.sku} onChange={(event) => setSelectedSku(event.target.value)} className="min-h-11 w-full min-w-0 appearance-none rounded-lg border border-[#DDE2D8] bg-[#FBFCF9] py-2 pl-3 pr-8 text-xs font-medium text-[#34463C] transition-colors hover:border-[#819582]">
                {product.weights.map((option) => <option key={option.sku} value={option.sku}>{option.weight}</option>)}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#697269]" />
            </div>
          </div>}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-1" aria-live="polite">
            <span className="text-base font-semibold tabular-nums tracking-tight text-[#203E35] sm:text-lg">{selectedOption ? formatPrice(selectedOption.price) : 'Unavailable'}</span>
            {discount > 0 && originalPrice && <del className="text-xs tabular-nums text-[#7C847A]">{formatPrice(originalPrice)}</del>}
          </div>
          <button type="button" onClick={handleAddToCart} disabled={!available} aria-label={available ? `Add ${product.name} to your bag` : `${product.name} is unavailable`} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#203E35] px-2 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#315749] disabled:cursor-not-allowed disabled:bg-[#E6E9E2] disabled:text-[#747D74] sm:text-sm">
            <ShoppingBag aria-hidden="true" className="h-4 w-4 shrink-0" />{available ? 'Add to bag' : 'Out of stock'}
          </button>
          {isCustomMade && <button type="button" onClick={() => setCustomModalOpen(true)} className="flex min-h-10 w-full items-center justify-center gap-1.5 text-xs font-medium text-[#795B35] underline-offset-4 hover:underline"><Sparkles aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /> Customize your shawl</button>}
        </div>
      </div>
      {isCustomMade && <CustomShawlModal isOpen={customModalOpen} onClose={() => setCustomModalOpen(false)} defaultGender={product.subCategory === 'men-shawls' ? 'Men' : 'Women'} />}
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E8DF] bg-white motion-safe:animate-pulse" aria-hidden="true">
      <div className="aspect-[4/3] bg-[#EEEEE6]" />
      <div className="space-y-4 p-5"><div className="h-3 w-1/3 rounded bg-[#EEEEE6]" /><div className="h-5 w-4/5 rounded bg-[#EEEEE6]" /><div className="h-8 w-full rounded bg-[#EEEEE6]" /><div className="h-11 w-full rounded-lg bg-[#EEEEE6]" /><div className="h-6 w-1/2 rounded bg-[#EEEEE6]" /><div className="h-11 rounded-lg bg-[#EEEEE6]" /></div>
    </div>
  );
}
