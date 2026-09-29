import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ToastProvider } from '@/components/ui/index';
import { Spinner } from '@/components/ui/index';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/Home/index'));
const ShopPage = lazy(() => import('@/pages/Shop/index'));
const ProductPage = lazy(() => import('@/pages/Product/index'));
const CartPage = lazy(() => import('@/pages/Cart/index'));
const CheckoutPage = lazy(() => import('@/pages/Checkout/index'));
const AccountRoutes = lazy(() =>
  import('@/pages/Account/index').then((m) => ({ default: m.AccountRoutes }))
);
const TrackPage = lazy(() => import('@/pages/Orders/TrackPage'));
const InfoPage = lazy(() => import('@/pages/InfoPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner className="h-10 w-10" />
    </div>
  );
}

function AppLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-5 py-3 text-sm text-white focus:translate-y-0">Skip to content</a>
      <Header />
      <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account/*" element={<AccountRoutes />} />
            <Route path="/orders/*" element={<AccountRoutes />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/about" element={<InfoPage />} />
            <Route path="/contact" element={<InfoPage />} />
            <Route path="/privacy" element={<InfoPage />} />
            <Route path="/returns" element={<InfoPage />} />
            <Route path="/faq" element={<InfoPage />} />
            {/* Fallback */}
            <Route path="*" element={
              <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-8xl font-display font-black text-muted/20">404</p>
                  <h2 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h2>
                  <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
                  <a href="/" className="text-primary font-medium hover:underline">← Go Home</a>
                </div>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
          <AppLayout />
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
