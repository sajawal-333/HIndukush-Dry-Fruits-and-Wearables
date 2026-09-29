import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, ChevronRight, Smartphone, Banknote, Package, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/index';
import { toast } from '@/components/ui/index';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { OrderTotals } from '@/components/cart/OrderTotals';
import { pakistanCities } from '@/data/products';
import { cn } from '@/lib/utils';
import type { CheckoutFormData } from '@/types';

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  phone: z.string().regex(/^03\d{9}$/, 'Enter valid Pakistani phone number (e.g. 03001234567)'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().min(10, 'Please enter a complete address'),
  city: z.string().min(1, 'Please select a city'),
  area: z.string().min(1, 'Please select or enter an area'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(['cod', 'jazzcash']),
  jazzCashNumber: z.string().optional(),
  notes: z.string().optional(),
}).refine(
  (data) => {
    if (data.paymentMethod === 'jazzcash') {
      return data.jazzCashNumber && /^03\d{9}$/.test(data.jazzCashNumber);
    }
    return true;
  },
  { message: 'Enter valid JazzCash number', path: ['jazzCashNumber'] }
);

const PROVINCES = [
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Sindh', label: 'Sindh' },
  { value: 'KPK', label: 'Khyber Pakhtunkhwa' },
  { value: 'Balochistan', label: 'Balochistan' },
  { value: 'AJK', label: 'Azad Jammu & Kashmir' },
  { value: 'Gilgit-Baltistan', label: 'Gilgit-Baltistan' },
  { value: 'ICT', label: 'Islamabad Capital Territory' },
];

const STEPS = [
  { label: 'Information', icon: '📋' },
  { label: 'Payment', icon: '💳' },
  { label: 'Confirm', icon: '✅' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedCity, setSelectedCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const { items, getTotal, getMerchandiseTotal, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cod',
      province: 'Punjab',
    },
  });

  const paymentMethod = watch('paymentMethod');

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <EmptyState
          title="Your cart is empty"
          description="Add items to your cart before checking out."
          action={<Link to="/shop" className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-brand-600 transition-colors">Browse Products</Link>}
        />
      </div>
    );
  }

  // Order summary component
  const OrderSummary = () => (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4 sticky top-24">
      <h3 className="font-display font-bold text-lg">Order Summary</h3>
      <div className="space-y-3 max-h-48 overflow-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground line-clamp-1">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.weight} × {item.quantity}</p>
            </div>
            <p className="text-sm font-bold flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4">
        <OrderTotals />
      </div>
    </div>
  );

  // Success screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto animate-fade-in">
            <Check className="h-12 w-12 text-emerald-600" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Order Placed! 🎉</h2>
            <p className="text-muted-foreground">
              Thank you for your order. We'll call you to confirm.
            </p>
            <div className="mt-4 bg-muted rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Order Number</p>
              <p className="font-mono font-bold text-lg text-foreground">{orderNumber}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-sm text-left space-y-2">
            <p className="font-medium text-foreground">What's next?</p>
            <p className="text-muted-foreground">📞 We'll call you within 1 hour to confirm your order.</p>
            <p className="text-muted-foreground">🚚 Expected delivery: 24–48 hours</p>
          </div>
          <div className="flex gap-3">
            <Link to="/orders" className="flex-1 inline-flex items-center justify-center h-10 rounded-xl border border-input text-sm font-medium hover:bg-accent transition-colors">
              Track Order
            </Link>
            <Link to="/shop" className="flex-1 inline-flex items-center justify-center h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-brand-600 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    if (step === 0) { setStep(1); return; }
    if (step === 1) { setStep(2); return; }

    // Step 2: Place order
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    const num = `KKK-${Date.now().toString().slice(-8)}`;
    setOrderNumber(num);
    clearCart();
    setOrderPlaced(true);
    setIsSubmitting(false);
    toast({ title: 'Order placed successfully!', variant: 'success' });
  };

  const cityOptions = Object.keys(pakistanCities).map((c) => ({ value: c, label: c }));
  const areaOptions = selectedCity
    ? pakistanCities[selectedCity]?.map((a) => ({ value: a, label: a })) ?? []
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary/20 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="section-title mb-4">Checkout</h1>
          {/* Progress */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                  i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}>
                  <span>{s.icon}</span>
                  <span className="hidden sm:block">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight className={cn('h-4 w-4', i < step ? 'text-primary' : 'text-muted-foreground')} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Form ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
            {/* Step 0: Customer Info */}
            {step === 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <h2 className="font-display font-bold text-xl">Customer Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    placeholder="Ahmed Khan"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                  />
                  <Input
                    label="Phone Number *"
                    placeholder="03001234567"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                </div>
                <Input
                  label="Email (Optional)"
                  type="email"
                  placeholder="ahmed@email.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold text-foreground mb-4">Delivery Address</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select
                      label="Province *"
                      options={PROVINCES}
                      placeholder="Select province"
                      {...register('province')}
                      error={errors.province?.message}
                    />
                    <Select
                      label="City *"
                      options={cityOptions}
                      placeholder="Select city"
                      {...register('city')}
                      error={errors.city?.message}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        setValue('city', e.target.value);
                        setValue('area', '');
                      }}
                    />
                    <Select
                      label="Area *"
                      options={areaOptions}
                      placeholder={selectedCity ? 'Select area' : 'Select city first'}
                      disabled={!selectedCity}
                      {...register('area')}
                      error={errors.area?.message}
                    />
                    <Input
                      label="Postal Code (Optional)"
                      placeholder="54000"
                      {...register('postalCode')}
                    />
                  </div>
                  <div className="mt-4">
                    <Input
                      label="Street Address *"
                      placeholder="House #, Street #, Block/Sector"
                      {...register('address')}
                      error={errors.address?.message}
                    />
                  </div>
                  <div className="mt-4">
                    <Input
                      label="Order Notes (Optional)"
                      placeholder="Special instructions for delivery…"
                      {...register('notes')}
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  Continue to Payment <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <h2 className="font-display font-bold text-xl">Payment Method</h2>

                {/* COD */}
                <label className={cn(
                  'flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                  paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                )}>
                  <input type="radio" value="cod" {...register('paymentMethod')} className="accent-primary mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-emerald-600" />
                      <span className="font-semibold text-foreground">Cash on Delivery (COD)</span>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Recommended</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pay when your order arrives at your door. Safe and convenient.
                    </p>
                  </div>
                </label>

                {/* JazzCash */}
                <label className={cn(
                  'flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                  paymentMethod === 'jazzcash' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                )}>
                  <input type="radio" value="jazzcash" {...register('paymentMethod')} className="accent-primary mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-red-500" />
                      <span className="font-semibold text-foreground">JazzCash</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pay online via JazzCash mobile wallet.
                    </p>
                    {paymentMethod === 'jazzcash' && (
                      <div className="mt-4 space-y-3">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-amber-700">
                            <p className="font-medium">How it works:</p>
                            <ol className="list-decimal list-inside space-y-1 mt-1">
                              <li>Enter your JazzCash number below</li>
                              <li>You'll receive a payment request on your phone</li>
                              <li>Approve the payment in JazzCash app</li>
                              <li>Order confirmed once payment received</li>
                            </ol>
                          </div>
                        </div>
                        <Input
                          label="JazzCash Mobile Number *"
                          placeholder="03001234567"
                          {...register('jazzCashNumber')}
                          error={errors.jazzCashNumber?.message}
                          leftIcon={<Smartphone className="h-4 w-4" />}
                        />
                        <p className="text-xs text-muted-foreground">
                          Amount to pay: <strong>{formatPrice(getTotal() ?? getMerchandiseTotal())}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(0)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" size="lg" className="flex-1 gap-2">
                    Review Order <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Confirm */}
            {step === 2 && (
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <h2 className="font-display font-bold text-xl">Review & Place Order</h2>

                <div className="space-y-3 text-sm">
                  <div className="bg-secondary/30 rounded-xl p-4 space-y-1">
                    <p className="font-semibold text-foreground mb-2">Delivery Details</p>
                    <p><span className="text-muted-foreground">Name: </span>{watch('fullName')}</p>
                    <p><span className="text-muted-foreground">Phone: </span>{watch('phone')}</p>
                    <p><span className="text-muted-foreground">Address: </span>{watch('address')}, {watch('area')}, {watch('city')}</p>
                    <p><span className="text-muted-foreground">Province: </span>{watch('province')}</p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-4">
                    <p className="font-semibold text-foreground mb-2">Payment</p>
                    <p className="flex items-center gap-2">
                      {watch('paymentMethod') === 'cod' ? (
                        <><Banknote className="h-4 w-4 text-emerald-600" /> Cash on Delivery</>
                      ) : (
                        <><Smartphone className="h-4 w-4 text-red-500" /> JazzCash ({watch('jazzCashNumber')})</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 flex gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  By placing this order, you agree to our terms of service and return policy.
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" size="lg" className="flex-1 gap-2" loading={isSubmitting}>
                    <Package className="h-5 w-5" />
                    Place Order · {formatPrice(getTotal() ?? getMerchandiseTotal())}
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* ── Summary ── */}
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
