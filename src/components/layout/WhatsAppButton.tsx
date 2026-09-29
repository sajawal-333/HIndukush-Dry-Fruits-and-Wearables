import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phone = '923064166360';
  const message = encodeURIComponent("Assalam-o-Alaikum! I want to order from Hindukush Dry Fruits & Specialties.");
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-30 group flex items-center gap-2 sm:bottom-6 sm:right-6"
    >
      <span className="hidden sm:block bg-[#2C221E] text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
        Need help? Chat with us
      </span>
      <div className="h-12 w-12 rounded-full bg-[#203E35] text-white shadow-lg ring-1 ring-white/30 flex items-center justify-center transition-colors hover:bg-[#315748]">
        <MessageCircle className="h-6 w-6" strokeWidth={1.6} />
      </div>
    </a>
  );
}
