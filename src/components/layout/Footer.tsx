import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { brand } from '@/data/brand';
import { collections } from '@/lib/catalog';

const helpLinks = [
  { label: 'Our story', to: '/about' },
  { label: 'Contact us', to: '/contact' },
  { label: 'Track an order', to: '/track' },
  { label: 'Questions & answers', to: '/faq' },
  { label: 'Returns & exchanges', to: '/returns' },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-shell">
        <div className="footer-grid">
          <div className="footer-about">
            <BrandMark inverse />
            <p>A little closer to the north. Discover mountain harvests, traditional clothing and thoughtful gifts from our valleys.</p>
            <p>Delivered across Pakistan.<br />Delivery charges apply.</p>
          </div>
          <div><h2 className="footer-heading">Explore the collections</h2><ul className="footer-links">{collections.map((category) => <li key={category.slug}><Link to={'/shop?category=' + category.slug}>{category.name}</Link></li>)}</ul></div>
          <div><h2 className="footer-heading">Here to help</h2><ul className="footer-links">{helpLinks.map((link) => <li key={link.to}><Link to={link.to}>{link.label}</Link></li>)}</ul></div>
          <div className="footer-contact-column">
            <h2 className="footer-heading">Let’s stay in touch</h2>
            <div className="footer-contact">
              <a href={brand.phoneHref}><Phone size={16} />{brand.phone}</a>
              <a href={'mailto:' + brand.email}><Mail size={16} />{brand.email}</a>
              <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">Chat on WhatsApp<ArrowUpRight size={16} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Hindukush Dry Fruits & Specialties.</p><span><Link to="/privacy">Privacy policy</Link><span>Cash on Delivery · JazzCash</span></span></div>
      </div>
    </footer>
  );
}
