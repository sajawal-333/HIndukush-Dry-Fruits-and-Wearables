import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart,
  Zap, Package, Shield, Star, Check, MapPin, Truck, Sparkles
} from 'lucide-react';
import { CustomShawlModal } from '@/components/shawl/CustomShawlModal';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { StarRating } from '@/components/ui/index';
import { Badge, ProductBadge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/index';
import { toast } from '@/components/ui/index';
import { formatPrice, formatDate } from '@/lib/utils';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import type { WeightOption } from '@/types';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);

  const product = getProductBySlug(slug ?? '');

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(
    product?.weights[0] ?? ({} as WeightOption)
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [customModalOpen, setCustomModalOpen] = useState(false);

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="The product you're looking for doesn't exist or has been removed."
        action={<Button onClick={() => navigate('/shop')}>Back to Shop</Button>}
        className="min-h-[60vh]"
      />
    );
  }

  const relatedProducts = getRelatedProducts(product.category, product.id);

  const handleAddToCart = () => {
    addItem(product, selectedWeight, quantity);
    toast({ title: 'Added to cart!', description: `${product.name} (${selectedWeight.weight})`, variant: 'success' });
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    addItem(product, selectedWeight, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary/20 border-b border-border py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* ── Image Gallery ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted group">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <ProductBadge badge={product.badge} />
                </div>
              )}
              <img
                src={product.images[selectedImage]?.url}
                alt={product.images[selectedImage]?.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((i) => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      'h-20 w-20 rounded-xl overflow-hidden ring-2 transition-all',
                      selectedImage === i ? 'ring-primary' : 'ring-transparent hover:ring-border'
                    )}
                  >
                    <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <Link
                to={`/shop?category=${product.category}`}
                className="text-sm text-primary font-medium capitalize hover:underline"
              >
                {product.category.replace('-', ' ')}
              </Link>
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>

            {/* Name */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Short description */}
            <p className="text-muted-foreground text-base leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Origin */}
            {product.origin && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-brand-500" />
                <span>Origin: <span className="text-foreground font-medium">{product.origin}</span></span>
              </div>
            )}

            {/* ── Weight Selector ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Select Weight</h3>
                <span className="text-xs text-muted-foreground">SKU: {selectedWeight.sku}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.weights.map((w) => (
                  <button
                    key={w.weight}
                    onClick={() => setSelectedWeight(w)}
                    className={cn(
                      'relative px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all',
                      selectedWeight.weight === w.weight
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {w.weight}
                    {w.discount && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full px-1.5 py-0.5">
                        -{w.discount}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Price ── */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-display font-bold text-foreground">
                  {formatPrice(selectedWeight.price)}
                </span>
                {selectedWeight.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(selectedWeight.originalPrice)}
                  </span>
                )}
                {selectedWeight.discount && (
                  <Badge variant="success" className="text-sm">
                    {selectedWeight.discount}% OFF
                  </Badge>
                )}
              </div>
              {selectedWeight.originalPrice && (
                <p className="text-sm text-emerald-600 font-medium">
                  You save {formatPrice(selectedWeight.originalPrice - selectedWeight.price)}!
                </p>
              )}
            </div>

            {/* ── Stock ── */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">
                    In Stock ({product.stockQuantity} available)
                  </span>
                </>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* ── Quantity & Actions ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-accent transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="p-3 hover:bg-accent transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: <span className="font-bold text-foreground">{formatPrice(selectedWeight.price * quantity)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  size="lg"
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  size="lg"
                  className="flex-1 gap-2"
                >
                  <Zap className="h-5 w-5" />
                  Buy Now
                </Button>
              </div>
            </div>

            {/* ── Custom-Made Shawl Studio Banner ── */}
            {product.tags.includes('custom-made') && (
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/70 p-4 sm:p-5 space-y-3 shadow-2xs">
                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-xl bg-amber-600 text-white shadow-xs flex-shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-amber-950">
                      Custom-Made {product.subCategory === 'men-shawls' ? "Men's" : "Women's"} Shawl Atelier
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
                      Need a personalized length, un-dyed organic fleece tone, specific matching outfit color, or custom monogram? We hand-craft bespoke pieces in Chitral.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setCustomModalOpen(true)}
                  className="w-full bg-[#C86D3B] hover:bg-[#B55B2B] text-white font-bold text-xs sm:text-sm py-3 rounded-full flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Customize Your Shawl (Colors, Sizes & Finish)</span>
                </Button>
              </div>
            )}

            {/* ── Delivery Info ── */}
            <div className="bg-secondary/40 rounded-xl p-4 space-y-2">
              {[
                { icon: Truck, text: 'Free delivery on orders above Rs. 2,000' },
                { icon: Package, text: 'Delivered in 24–48 hours across Pakistan' },
                { icon: Shield, text: '7-day easy return policy' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-brand-500 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/shop?search=${tag}`}
                  className="text-xs bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground px-2.5 py-1 rounded-full transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs: Description & Reviews ── */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-border mb-8">
            {(['description', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px',
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {tab}
                {tab === 'reviews' && (
                  <span className="ml-1 text-xs bg-muted rounded-full px-1.5">{product.reviewCount}</span>
                )}
              </button>
            ))}
          </div>

          {activeTab === 'description' ? (
            <div className="max-w-3xl">
              <p className="text-muted-foreground leading-relaxed text-base">
                {product.description}
              </p>
              {product.origin && (
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Origin', value: product.origin },
                    { label: 'Category', value: product.category.replace('-', ' ') },
                    { label: 'Stock', value: `${product.stockQuantity} units` },
                    { label: 'Available Weights', value: product.weights.map(w => w.weight).join(', ') },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">{label}</p>
                      <p className="text-sm font-semibold text-foreground capitalize">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 max-w-2xl">
              {/* Rating Summary */}
              <div className="flex items-center gap-6 bg-card border border-border rounded-2xl p-6 mb-6">
                <div className="text-center">
                  <p className="text-5xl font-display font-bold text-foreground">{product.rating.toFixed(1)}</p>
                  <StarRating rating={product.rating} showCount={false} size="lg" className="mt-1 justify-center" />
                  <p className="text-xs text-muted-foreground mt-1">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map((stars) => {
                    const pct = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : 2;
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-2">{stars}</span>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-6">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews */}
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                        {review.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {review.verified && (
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">
                          <Check className="h-3 w-3" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <StarRating rating={review.rating} showCount={false} size="sm" className="mb-2" />
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
      {/* Custom Shawl Modal */}
      {product.tags.includes('custom-made') && (
        <CustomShawlModal
          isOpen={customModalOpen}
          onClose={() => setCustomModalOpen(false)}
          defaultGender={product.subCategory === 'men-shawls' ? 'Men' : 'Women'}
        />
      )}
    </div>
  );
}
