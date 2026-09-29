import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, Check, Truck, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { mockOrders } from '@/data/products';
import { formatDate, formatPrice } from '@/lib/utils';
import type { OrderStatus } from '@/types';

const TIMELINE: { status: OrderStatus; label: string; description: string; icon: React.FC<{ className?: string }> }[] = [
  { status: 'pending', label: 'Order Placed', description: 'Your order has been received', icon: Package },
  { status: 'confirmed', label: 'Order Confirmed', description: 'We\'ve confirmed your order', icon: Check },
  { status: 'processing', label: 'Processing', description: 'Your items are being packed', icon: Package },
  { status: 'shipped', label: 'Shipped', description: 'On the way to you', icon: Truck },
  { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Almost there!', icon: MapPin },
  { status: 'delivered', label: 'Delivered', description: 'Enjoy your order!', icon: Check },
];

const STATUS_ORDER: OrderStatus[] = [
  'pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'
];

export default function TrackPage() {
  const [searchParams] = useSearchParams();
  const [orderNum, setOrderNum] = useState(searchParams.get('order') ?? '');
  const [searched, setSearched] = useState(!!searchParams.get('order'));
  const [foundOrder, setFoundOrder] = useState(
    searchParams.get('order') ? mockOrders.find(o => o.orderNumber === searchParams.get('order')) ?? null : null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = mockOrders.find(o => o.orderNumber === orderNum.trim().toUpperCase());
    setFoundOrder(order ?? null);
    setSearched(true);
  };

  const currentStatusIndex = foundOrder
    ? STATUS_ORDER.indexOf(foundOrder.status as OrderStatus)
    : -1;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-brand-900 to-brand-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-3">Track Your Order</h1>
          <p className="text-white/70 mb-8">Enter your order number to see real-time status</p>
          <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto">
            <Input
              value={orderNum}
              onChange={e => setOrderNum(e.target.value)}
              placeholder="e.g. KKK-20250801-001"
              leftIcon={<Search className="h-4 w-4" />}
              className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:bg-white/20"
            />
            <Button type="submit" className="flex-shrink-0">Track</Button>
          </form>
          <p className="text-white/40 text-xs mt-3">Try: KKK-20250801-001</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!searched ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Enter an Order Number</h2>
            <p className="text-muted-foreground">You can find your order number in the confirmation SMS or email</p>
            <div className="mt-6">
              <Link to="/account/orders" className="inline-flex items-center justify-center h-10 px-5 rounded-xl border border-input text-sm font-medium hover:bg-accent transition-colors">View My Orders</Link>
            </div>
          </div>
        ) : !foundOrder ? (
          <div className="text-center py-12">
            <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-red-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-6">We couldn't find order "{orderNum}". Please check the number and try again.</p>
            <Button onClick={() => { setSearched(false); setOrderNum(''); }}>Try Again</Button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Order header */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs text-muted-foreground">Order Number</p>
                  <p className="font-mono font-bold text-lg text-foreground">{foundOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Placed On</p>
                  <p className="font-medium text-foreground">{formatDate(foundOrder.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-bold text-foreground">{formatPrice(foundOrder.total)}</p>
                </div>
              </div>

              {/* Current status */}
              <div className={cn(
                'rounded-xl p-4 flex items-center gap-3',
                foundOrder.status === 'delivered' ? 'bg-emerald-50 border border-emerald-200' : 'bg-brand-50 border border-brand-200'
              )}>
                <div className={cn(
                  'h-10 w-10 rounded-full flex items-center justify-center',
                  foundOrder.status === 'delivered' ? 'bg-emerald-100' : 'bg-brand-100'
                )}>
                  <Truck className={cn('h-5 w-5', foundOrder.status === 'delivered' ? 'text-emerald-600' : 'text-brand-600')} />
                </div>
                <div>
                  <p className={cn('font-bold', foundOrder.status === 'delivered' ? 'text-emerald-700' : 'text-brand-700')}>
                    {TIMELINE.find(t => t.status === foundOrder.status)?.label ?? foundOrder.status}
                  </p>
                  <p className={cn('text-sm', foundOrder.status === 'delivered' ? 'text-emerald-600' : 'text-brand-600')}>
                    {TIMELINE.find(t => t.status === foundOrder.status)?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display font-bold text-lg mb-6">Order Timeline</h3>
              <div className="space-y-0">
                {TIMELINE.map((step, i) => {
                  const isCompleted = i <= currentStatusIndex;
                  const isCurrent = i === currentStatusIndex;
                  const Icon = step.icon;
                  return (
                    <div key={step.status} className="flex gap-4">
                      {/* Icon column */}
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          'h-9 w-9 rounded-full flex items-center justify-center border-2 transition-all z-10',
                          isCompleted
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'bg-background border-border text-muted-foreground'
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        {i < TIMELINE.length - 1 && (
                          <div className={cn(
                            'w-0.5 h-12 mt-1',
                            i < currentStatusIndex ? 'bg-primary' : 'bg-border'
                          )} />
                        )}
                      </div>
                      {/* Content */}
                      <div className={cn('pb-8 pt-1', i === TIMELINE.length - 1 && 'pb-0')}>
                        <p className={cn(
                          'font-semibold text-sm',
                          isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                        )}>
                          {step.label}
                          {isCurrent && <span className="ml-2 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">Current</span>}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display font-bold text-lg mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {foundOrder.items.map((item: any) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.weight} × {item.quantity}</p>
                    </div>
                    <p className="font-bold text-foreground text-sm">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className="bg-secondary/30 border border-border rounded-2xl p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-brand-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Need help with your order?</p>
                <p className="text-xs text-muted-foreground">Our team is available Mon–Sat, 9am to 9pm</p>
              </div>
              <a href="tel:+923001234567">
                <Button size="sm" variant="outline">Call Us</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
