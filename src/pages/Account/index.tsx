import { useState } from 'react';
import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User, Package, MapPin, LogOut, Eye, EyeOff, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Divider } from '@/components/ui/index';
import { toast } from '@/components/ui/index';
import { EmptyState } from '@/components/ui/index';
import { useAuthStore } from '@/store/authStore';
import { mockOrders } from '@/data/products';
import { formatPrice, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

// ─── Login ────────────────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
  const { login, isLoading } = useAuthStore();
  const [showPwd, setShowPwd] = useState(false);
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/account';

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data);
    toast({ title: result.success ? 'Welcome back!' : 'Login failed', variant: result.success ? 'success' : 'error', description: result.message });
    if (result.success) window.location.href = from;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-display font-bold">KKK</span>
          </div>
          <h1 className="font-display text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your KKK Dry Fruits account</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="ahmed@example.com"
              {...register('email')}
              error={errors.email?.message as string | undefined}
            />
            <Input
              label="Password"
              type={showPwd ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message as string | undefined}
              rightIcon={
                <button type="button" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
            </div>
            <Button type="submit" size="lg" className="w-full" loading={isLoading}>
              Sign In
            </Button>
          </form>

          <Divider label="or" className="my-4" />

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/account/register" className="text-primary font-medium hover:underline">
              Create Account
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-4 bg-muted rounded-xl px-4 py-3 text-xs text-muted-foreground">
            <Lock className="h-3 w-3 inline mr-1" />
            Demo: any email + password (6+ chars) works
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Register ─────────────────────────────────────────────────────────────────
const registerSchema = z.object({
  name: z.string().min(3, 'Full name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^03\d{9}$/, 'Enter valid Pakistani number'),
  password: z.string().min(6, 'At least 6 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterPage() {
  const { register: registerUser, isLoading } = useAuthStore();
  const [showPwd, setShowPwd] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = await registerUser(data);
    toast({ title: result.success ? 'Account created!' : 'Registration failed', variant: result.success ? 'success' : 'error' });
    if (result.success) window.location.href = '/account';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-display font-bold">KKK</span>
          </div>
          <h1 className="font-display text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join KKK Dry Fruits for the best experience</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full Name" placeholder="Ahmed Khan" {...register('name')} error={errors.name?.message as string | undefined} />
            <Input label="Email" type="email" placeholder="ahmed@example.com" {...register('email')} error={errors.email?.message as string | undefined} />
            <Input label="Phone" placeholder="03001234567" {...register('phone')} error={errors.phone?.message as string | undefined} />
            <Input
              label="Password"
              type={showPwd ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message as string | undefined}
              rightIcon={
                <button type="button" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            <Input label="Confirm Password" type="password" placeholder="••••••••" {...register('confirmPassword')} error={errors.confirmPassword?.message as string | undefined} />
            <Button type="submit" size="lg" className="w-full" loading={isLoading}>Create Account</Button>
          </form>
          <Divider label="or" className="my-4" />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/account/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Account Dashboard ────────────────────────────────────────────────────────
const statusColors: Record<string, 'success' | 'warning' | 'secondary' | 'destructive'> = {
  delivered: 'success',
  shipped: 'secondary',
  processing: 'warning',
  confirmed: 'warning',
  pending: 'secondary',
  cancelled: 'destructive',
};

function AccountDashboard() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const sidebarLinks = [
    { label: 'Profile', to: '/account', icon: User },
    { label: 'Orders', to: '/account/orders', icon: Package },
    { label: 'Addresses', to: '/account/addresses', icon: MapPin },
  ];

  const activeTab = location.pathname;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary/20 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="section-title">My Account</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="space-y-2">
            {/* User card */}
            <div className="bg-card border border-border rounded-2xl p-4 text-center mb-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <p className="font-semibold text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>

            {sidebarLinks.map(({ label, to, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  activeTab === to
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <button
              onClick={() => { logout(); window.location.href = '/'; }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route index element={<ProfileTab />} />
              <Route path="orders" element={<OrdersTab />} />
              <Route path="addresses" element={<AddressesTab />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  const { user, updateProfile } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');

  const save = () => {
    updateProfile({ name, phone });
    toast({ title: 'Profile updated!', variant: 'success' });
    setEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-xl">Profile Information</h2>
        <Button size="sm" variant="outline" onClick={() => setEditing(!editing)}>
          {editing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {editing ? (
          <>
            <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} />
            <Input label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          </>
        ) : (
          <>
            <div><p className="text-xs text-muted-foreground">Full Name</p><p className="font-medium">{user?.name}</p></div>
            <div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{user?.phone}</p></div>
          </>
        )}
        <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{user?.email}</p></div>
        <div><p className="text-xs text-muted-foreground">Member Since</p><p className="font-medium">{formatDate(user?.createdAt ?? '')}</p></div>
      </div>
      {editing && <Button onClick={save}>Save Changes</Button>}
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl">My Orders</h2>
      {mockOrders.length === 0 ? (
        <EmptyState icon={<Package />} title="No orders yet" description="Your orders will appear here." action={<Link to="/shop" className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-brand-600 transition-colors">Start Shopping</Link>} />
      ) : (
        mockOrders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-sm font-bold text-foreground">{order.orderNumber}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatDate(order.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusColors[order.status] ?? 'secondary'} className="capitalize">
                  {order.status}
                </Badge>
                <Link to={`/track?order=${order.orderNumber}`}>
                  <Button size="sm" variant="outline">Track Order</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {order.items.map((item: any) => (
                <div key={item.productId} className="flex items-center gap-2 text-sm">
                  <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-medium text-foreground text-xs line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.weight} × {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">{order.items.length} items</span>
              <span className="font-bold text-foreground">{formatPrice(order.total)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function AddressesTab() {
  const { user } = useAuthStore();
  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl">Saved Addresses</h2>
      {user?.addresses.map((addr, i) => (
        <div key={i} className="bg-card border border-border rounded-2xl p-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-foreground">{addr.fullName}</p>
              <p className="text-muted-foreground">{addr.address}</p>
              <p className="text-muted-foreground">{addr.area}, {addr.city}, {addr.province}</p>
              <p className="text-muted-foreground">{addr.phone}</p>
            </div>
            <Badge variant="secondary">Default</Badge>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">+ Add New Address</Button>
    </div>
  );
}

// ─── Account Router ───────────────────────────────────────────────────────────
export function AccountRoutes() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route path="login" element={isAuthenticated ? <Navigate to="/account" /> : <LoginPage />} />
      <Route path="register" element={isAuthenticated ? <Navigate to="/account" /> : <RegisterPage />} />
      <Route
        path="*"
        element={isAuthenticated ? <AccountDashboard /> : <Navigate to="/account/login" state={{ from: '/account' }} />}
      />
    </Routes>
  );
}
