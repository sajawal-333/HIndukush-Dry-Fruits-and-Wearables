import { Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brand } from '@/data/brand';

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className={`brand-mark ${inverse ? 'brand-mark-inverse' : ''}`} aria-label={`${brand.name} home`}>
      <Mountain size={39} strokeWidth={1.25} aria-hidden="true" />
      <span><span className="brand-name">{brand.name}</span><span className="brand-tagline">{brand.tagline}</span></span>
    </Link>
  );
}
