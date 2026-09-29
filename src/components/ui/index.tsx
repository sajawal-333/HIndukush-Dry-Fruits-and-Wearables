import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateStars } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

const sizeMap = { sm: 'h-3 w-3', md: 'h-4 w-4', lg: 'h-5 w-5' };
const textSizeMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

export function StarRating({ rating, count, size = 'md', showCount = true, className }: StarRatingProps) {
  const stars = generateStars(rating);
  const starSize = sizeMap[size];
  const textSize = textSizeMap[size];

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {stars.map((type, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              type === 'full' && 'fill-amber-400 text-amber-400',
              type === 'half' && 'fill-amber-200 text-amber-400',
              type === 'empty' && 'fill-none text-gray-300'
            )}
          />
        ))}
      </div>
      {showCount && (
        <span className={cn('text-muted-foreground', textSize)}>
          {rating.toFixed(1)}
          {count !== undefined && ` (${count.toLocaleString()})`}
        </span>
      )}
    </div>
  );
}

// Skeleton loader component
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('skeleton', className)}
      {...props}
    />
  );
}

// Toast notification hook (simple)
interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
  duration?: number;
}

let toastCallback: ((opts: ToastOptions) => void) | null = null;

export function registerToast(cb: (opts: ToastOptions) => void) {
  toastCallback = cb;
}

export function toast(opts: ToastOptions) {
  if (toastCallback) toastCallback(opts);
  else console.log('[Toast]', opts);
}

// Toast Provider & Display
interface ToastItem extends ToastOptions {
  id: string;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    registerToast((opts) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...opts, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, opts.duration ?? 3000);
    });
  }, []);

  const variantIcon = { default: '🔔', success: '✅', error: '❌' };
  const variantBg = {
    default: 'bg-card border-border',
    success: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20',
    error: 'bg-red-50 border-red-200 dark:bg-red-900/20',
  };

  return (
    <>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg animate-slide-in-right',
              variantBg[t.variant ?? 'default']
            )}
          >
            <span className="text-lg">{variantIcon[t.variant ?? 'default']}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{t.title}</p>
              {t.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Empty state component
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-20 text-center px-4', className)}>
      {icon && (
        <div className="mb-4 text-muted-foreground/40 [&>svg]:h-16 [&>svg]:w-16">{icon}</div>
      )}
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

// Spinner
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-6 w-6 animate-spin text-primary', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// Divider
export function Divider({ className, label }: { className?: string; label?: string }) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
    );
  }
  return <div className={cn('h-px bg-border', className)} />;
}
