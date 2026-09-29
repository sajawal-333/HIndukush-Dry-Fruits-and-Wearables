import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Menu, Search, ShoppingBag, UserRound, X, Truck } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { collections } from '@/lib/catalog';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export function Header() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const setCartOpen = useCartStore((state) => state.setOpen);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const activeCategory = new URLSearchParams(location.search).get('category');

  useEffect(() => { setMenuOpen(false); }, [location.pathname, location.search]);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(query.trim() ? '/shop?search=' + encodeURIComponent(query.trim()) : '/shop');
  }

  return (
    <header className="site-header">
      <div className="announcement">
        <div className="content-shell announcement-inner">
          <span>From the valleys of the north, with care.</span>
          <span className="announcement-detail"><Truck size={13} aria-hidden="true" /> Nationwide delivery · Delivery charges apply</span>
        </div>
      </div>
      <div className="content-shell header-main">
        <BrandMark />
        <form role="search" onSubmit={search} className="header-search">
          <Search size={19} aria-hidden="true" />
          <label className="sr-only" htmlFor="store-search">Search all products</label>
          <input id="store-search" type="search" placeholder="Search almonds, honey, shawls…" value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="submit" aria-label="Submit product search"><ArrowRight size={19} /></button>
        </form>
        <div className="header-actions">
          <Link to={isAuthenticated ? '/account' : '/account/login'} className="account-action" aria-label="My account"><UserRound size={21} strokeWidth={1.6} /><span>Account</span></Link>
          <button onClick={() => setCartOpen(true)} className="bag-action" aria-label={'Open bag, ' + itemCount + ' items'}><ShoppingBag size={21} strokeWidth={1.6} /><span className="bag-label">Bag</span><span className="bag-count">{itemCount}</span></button>
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild><button className="icon-button menu-trigger" aria-label="Open navigation"><Menu size={23} /></button></Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#14251f]/40 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-sm flex-col overflow-y-auto bg-background p-6 shadow-xl">
                <div className="flex items-center justify-between gap-4"><Dialog.Title className="font-serif text-3xl font-semibold">Explore Hindukush</Dialog.Title><Dialog.Close asChild><button className="icon-button" aria-label="Close navigation"><X size={22} /></button></Dialog.Close></div>
                <Dialog.Description className="mt-2 text-sm text-muted-foreground">Find your favourite harvests and heritage pieces.</Dialog.Description>
                <nav aria-label="Mobile navigation" className="mt-7 divide-y divide-border">
                  <Link className="mobile-nav-link" to="/shop">Shop everything<ArrowRight size={17} /></Link>
                  {collections.map((category) => <Link className="mobile-nav-link" key={category.slug} to={'/shop?category=' + category.slug}>{category.name}<span className="text-xs text-muted-foreground">{category.productCount}</span></Link>)}
                  <Link className="mobile-nav-link" to="/about">Our story<ArrowRight size={17} /></Link>
                  <Link className="mobile-nav-link" to="/track">Track your order<ArrowRight size={17} /></Link>
                  <Link className="mobile-nav-link" to="/contact">Get in touch<ArrowRight size={17} /></Link>
                  <Link className="mobile-nav-link" to={isAuthenticated ? '/account' : '/account/login'}>My account<UserRound size={17} /></Link>
                </nav>
                <p className="mt-auto pt-8 text-xs leading-6 text-muted-foreground">Delivery charges apply and will be confirmed for your order.</p>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <div className="header-nav-row">
        <div className="content-shell header-nav-inner">
          <nav aria-label="Main navigation">
            <Link to="/shop" className={location.pathname === '/shop' && !activeCategory ? 'is-active' : ''}>Shop all</Link>
            {collections.map((category) => <Link key={category.slug} to={'/shop?category=' + category.slug} className={activeCategory === category.slug ? 'is-active' : ''}>{category.name}</Link>)}
          </nav>
          <Link className="story-nav" to="/about">Our story <ArrowRight size={14} /></Link>
        </div>
      </div>
    </header>
  );
}
