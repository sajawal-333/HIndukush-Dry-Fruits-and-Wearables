import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, HeartHandshake, MapPin, PackageCheck, Truck } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { HeroSlider } from '@/components/home/HeroSlider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { products } from '@/data/products';
import { collections } from '@/lib/catalog';

const services = [
  { icon: MapPin, title: 'Northern roots', copy: 'Harvests & heritage from the valleys' },
  { icon: PackageCheck, title: 'Thoughtfully packed', copy: 'Ready for your table or a gift' },
  { icon: Truck, title: 'Delivered nationwide', copy: 'Delivery charges apply' },
  { icon: HeartHandshake, title: 'A little help, anytime', copy: 'Talk to us before you choose' },
];

function Collections() {
  return (
    <section className="section-space" aria-label="Shop by collection">
      <div className="content-shell">
        <SectionHeading eyebrow="Something for every day" title="Find your kind of northern treasure." description="Five thoughtful collections. One place to discover them." link={{to:'/shop', label:'Shop everything'}} />
        <div className="collection-grid">
          {collections.map((category, index) => (
            <Link className="collection-card" key={category.slug} to={'/shop?category=' + category.slug}>
              <div className="collection-image"><img src={category.image} alt="" loading="lazy" width={480} height={480} /><span className="collection-index">0{index + 1}</span></div>
              <div className="collection-info"><div><h3>{category.name}</h3><p>{category.productCount} products</p></div><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const [active, setActive] = useState('');
  const matches = products.filter((product) => active ? product.category === active : product.featured);
  const shown = matches.slice(0, 4);
  return (
    <section className="featured-section section-space">
      <div className="content-shell">
        <SectionHeading eyebrow="A good place to start" title="Carefully chosen. Easy to love." description="Everyday favourites and a few discoveries for your next order." link={{to:active ? '/shop?category=' + active : '/shop', label:'See the collection'}} />
        <div className="collection-tabs" role="group" aria-label="Choose a featured collection">
          <button onClick={() => setActive('')} aria-pressed={!active}>Our picks</button>
          {collections.map((category) => <button key={category.slug} onClick={() => setActive(category.slug)} aria-pressed={active === category.slug}>{category.name}</button>)}
        </div>
        <div className="home-product-grid">
          {shown.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <p className="collection-result" aria-live="polite">Showing {shown.length} of {matches.length} {active ? 'products in this collection' : 'selected favourites'}<Link to={active ? '/shop?category=' + active : '/shop'}>Explore more <ArrowRight size={14} /></Link></p>
      </div>
    </section>
  );
}

function HeritageStory() {
  return (
    <section className="section-space">
      <div className="content-shell">
        <div className="heritage-story">
          <div className="heritage-image"><img src="/images/hero_wearables.jpg" alt="Traditional northern clothing and handmade woollen pieces" loading="lazy" width={1376} height={768} /><span>MADE OF STORIES.</span></div>
          <div className="heritage-copy">
            <p className="eyebrow">More than a place. A way of life.</p>
            <h2 className="section-heading">From the valleys,<br /><em>with a little soul.</em></h2>
            <p>The north lives in its little details. A warm pakol. The sweetness of a dried apricot. A shawl that feels like home.</p>
            <p>Hindukush brings together the harvests and traditions of Gilgit-Baltistan and the neighbouring valleys, for you to enjoy wherever you are.</p>
            <Link to="/about" className="text-link">Get to know Hindukush <ArrowUpRight size={18} /></Link>
          </div>
        </div>
        <div className="help-banner"><div><p className="eyebrow">A thoughtful gift. A favourite flavour.</p><h2>Need a hand choosing?</h2><p>We’re happy to help you find something just right.</p></div><Link to="/contact" className="button-primary">Talk to our team <ArrowUpRight size={18} /></Link></div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <section className="service-strip" aria-label="Shopping with Hindukush">
        <div className="content-shell service-grid">
          {services.map(({icon:Icon,title,copy}) => <div className="service-item" key={title}><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><div><h2>{title}</h2><p>{copy}</p></div></div>)}
        </div>
      </section>
      <Collections />
      <FeaturedProducts />
      <HeritageStory />
    </>
  );
}
