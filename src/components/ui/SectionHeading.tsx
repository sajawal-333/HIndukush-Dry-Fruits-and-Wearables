import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  link?: { to: string; label: string };
}

export function SectionHeading({ eyebrow, title, description, link }: SectionHeadingProps) {
  return (
    <div className="section-header">
      <div><p className="eyebrow">{eyebrow}</p><h2 className="section-heading">{title}</h2>{description && <p className="section-description">{description}</p>}</div>
      {link && <Link className="text-link" to={link.to}>{link.label}<ArrowUpRight size={17} aria-hidden="true" /></Link>}
    </div>
  );
}
