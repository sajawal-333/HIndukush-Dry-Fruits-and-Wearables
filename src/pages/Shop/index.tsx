import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { ProductCard, ProductCardSkeleton } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/index';
import { Badge } from '@/components/ui/Badge';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';
import type { ShopFilters } from '@/types';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
] as const;

const PER_PAGE = 12;

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<ShopFilters>({
    search: searchParams.get('search') ?? '',
    category: searchParams.get('category') ?? '',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'featured',
    inStockOnly: false,
    page: 1,
    perPage: PER_PAGE,
  });

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, [filters.category, filters.search]);

  // Sync URL params to filters
  useEffect(() => {
    const search = searchParams.get('search') ?? '';
    const category = searchParams.get('category') ?? '';
    setFilters((f) => ({ ...f, search, category, page: 1 }));
  }, [searchParams]);

  const updateFilter = <K extends keyof ShopFilters>(key: K, val: ShopFilters[K]) => {
    setFilters((f) => ({ ...f, [key]: val, page: 1 }));
  };

  // Filter + sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.category.includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    result = result.filter((p) => {
      const price = p.weights[0].price;
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.weights[0].price - b.weights[0].price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.weights[0].price - a.weights[0].price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (filters.page - 1) * PER_PAGE,
    filters.page * PER_PAGE
  );

  // Active filter count
  const activeFilterCount = [
    filters.category,
    filters.search,
    filters.inStockOnly,
    filters.minPrice > 0,
    filters.maxPrice < 10000,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters((f) => ({
      ...f,
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 10000,
      inStockOnly: false,
      page: 1,
    }));
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-secondary/30 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="section-title mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
            {filters.category && ` in "${categories.find(c => c.slug === filters.category)?.name ?? filters.category}"`}
            {filters.search && ` for "${filters.search}"`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* ── Sidebar Filters ── */}
          <aside
            className={cn(
              'w-72 flex-shrink-0 space-y-6',
              'hidden lg:block',
              showFilters && 'fixed inset-0 z-50 overflow-auto bg-background p-6 lg:relative lg:p-0 block'
            )}
          >
            {/* Mobile close */}
            <div className="flex items-center justify-between lg:hidden">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  placeholder="Search products…"
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => updateFilter('category', '')}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                    !filters.category
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-accent text-muted-foreground'
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateFilter('category', cat.slug)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                      filters.category === cat.slug
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-accent text-muted-foreground'
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-muted rounded-full px-1.5">{cat.productCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Price Range</h3>
              <div className="space-y-3">
                {[
                  { label: 'Under Rs. 500', min: 0, max: 500 },
                  { label: 'Rs. 500 – 1,000', min: 500, max: 1000 },
                  { label: 'Rs. 1,000 – 2,500', min: 1000, max: 2500 },
                  { label: 'Rs. 2,500 – 5,000', min: 2500, max: 5000 },
                  { label: 'Above Rs. 5,000', min: 5000, max: 10000 },
                ].map(({ label, min, max }) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={filters.minPrice === min && filters.maxPrice === max}
                      onChange={() => { updateFilter('minPrice', min); updateFilter('maxPrice', max); }}
                      className="accent-primary"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={filters.minPrice === 0 && filters.maxPrice === 10000}
                    onChange={() => { updateFilter('minPrice', 0); updateFilter('maxPrice', 10000); }}
                    className="accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">All Prices</span>
                </label>
              </div>
            </div>

            {/* In Stock */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                  className="h-4 w-4 accent-primary rounded"
                />
                <span className="text-sm font-medium text-foreground">In Stock Only</span>
              </label>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="w-full gap-2">
                <X className="h-4 w-4" />
                Clear Filters
                <Badge variant="secondary">{activeFilterCount}</Badge>
              </Button>
            )}
          </aside>

          {/* Mobile filter backdrop */}
          {showFilters && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* ── Products ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(true)}
                className="lg:hidden gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="default" className="text-xs px-1.5 py-0">{activeFilterCount}</Badge>
                )}
              </Button>

              {/* Sort */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
                <div className="relative">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value as ShopFilters['sortBy'])}
                    className="h-9 pl-3 pr-8 rounded-xl border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active filters chips */}
            {(filters.search || filters.category) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.search && (
                  <button
                    onClick={() => updateFilter('search', '')}
                    className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm hover:bg-primary/20 transition-colors"
                  >
                    Search: {filters.search} <X className="h-3 w-3" />
                  </button>
                )}
                {filters.category && (
                  <button
                    onClick={() => updateFilter('category', '')}
                    className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm hover:bg-primary/20 transition-colors"
                  >
                    {categories.find(c => c.slug === filters.category)?.name ?? filters.category}
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <EmptyState
                icon={<Search />}
                title="No products found"
                description="Try adjusting your search or filters to find what you're looking for."
                action={<Button onClick={clearFilters}>Clear Filters</Button>}
              />
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                  {paginatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={filters.page <= 1}
                      onClick={() => updateFilter('page', filters.page - 1)}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => updateFilter('page', pg)}
                        className={cn(
                          'h-9 w-9 rounded-lg text-sm font-medium transition-colors',
                          filters.page === pg
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent text-muted-foreground'
                        )}
                      >
                        {pg}
                      </button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={filters.page >= totalPages}
                      onClick={() => updateFilter('page', filters.page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
