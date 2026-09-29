import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-border text-foreground',
  destructive: 'bg-destructive/10 text-destructive border border-destructive/20',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

// Product badge (overlaid on card corner)
export function ProductBadge({ badge }: { badge?: 'new' | 'sale' | 'hot' | 'limited' }) {
  if (!badge) return null;
  const classes = {
    hot: 'badge-hot',
    sale: 'badge-sale',
    new: 'badge-new',
    limited: 'badge-limited',
  };
  const labels = { hot: '🔥 Hot', sale: '% Sale', new: 'New', limited: 'Limited' };
  return <span className={classes[badge]}>{labels[badge]}</span>;
}
