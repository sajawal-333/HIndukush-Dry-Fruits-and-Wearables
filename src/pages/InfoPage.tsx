import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, HelpCircle, MapPin, MessageCircle, RotateCcw, ShieldCheck } from 'lucide-react';

type Info = {
  eyebrow: string;
  title: string;
  intro: string;
  icon: typeof MapPin;
  items: Array<{ title: string; body: string }>;
};

const pages: Record<string, Info> = {
  '/about': {
    eyebrow: 'Our valley story', title: 'Closer to the mountain harvest.', icon: MapPin,
    intro: 'Hindukush brings together food and craft traditions from Chitral, Hunza and Skardu for customers across Pakistan.',
    items: [
      { title: 'Thoughtful sourcing', body: 'We look for products with a clear valley origin and work with makers who know their craft.' },
      { title: 'Small-batch selection', body: 'Our collection focuses on familiar essentials, rare mountain specialties and meaningful gifts.' },
      { title: 'Made for sharing', body: 'Every order is packed to travel well, whether it is headed to your home or sent as a gift.' },
    ],
  },
  '/contact': {
    eyebrow: 'We are here to help', title: 'Let’s make your order simple.', icon: MessageCircle,
    intro: 'For product questions, order support or help choosing a gift, our team is one message or call away.',
    items: [
      { title: 'Call us', body: '+92 306 4166360 — for quick help with an order.' },
      { title: 'Email us', body: 'info@hindukushdryfruits.pk — for detailed product or delivery questions.' },
      { title: 'Chat on WhatsApp', body: 'Use the green chat button at the bottom of the page for the fastest response.' },
    ],
  },
  '/privacy': {
    eyebrow: 'Privacy', title: 'Your details stay with your order.', icon: ShieldCheck,
    intro: 'We use the information you provide to process orders, provide customer support and improve the shopping experience.',
    items: [
      { title: 'What we collect', body: 'Contact, delivery and order details needed to fulfil a purchase and support you afterwards.' },
      { title: 'How we use it', body: 'Only for order handling, delivery updates and customer service—not for unrelated purposes.' },
      { title: 'Questions', body: 'Contact us at info@hindukushdryfruits.pk if you need help with your information.' },
    ],
  },
  '/returns': {
    eyebrow: 'Returns & exchanges', title: 'A straightforward 7-day promise.', icon: RotateCcw,
    intro: 'If an item reaches you damaged or does not match your order, please contact us within seven days so we can make it right.',
    items: [
      { title: 'Start a request', body: 'Message us with your order details and a clear photo of the item or package.' },
      { title: 'Eligible items', body: 'Unopened food products and unused heritage items in their original condition can be reviewed for return or exchange.' },
      { title: 'Our resolution', body: 'Once verified, we will guide you through a replacement, exchange or the suitable next step.' },
    ],
  },
  '/faq': {
    eyebrow: 'Frequently asked questions', title: 'Good to know before you order.', icon: HelpCircle,
    intro: 'A few quick answers to make shopping with Hindukush feel uncomplicated.',
    items: [
      { title: 'How can I pay?', body: 'Cash on Delivery and JazzCash are available across Pakistan.' },
      { title: 'How is freshness protected?', body: 'Products are packed in protective, food-safe packaging before dispatch.' },
      { title: 'Can I choose a different weight?', body: 'Select the available weight directly on a product card or its product page before adding it to cart.' },
    ],
  },
};

export default function InfoPage() {
  const page = pages[useLocation().pathname] ?? pages['/about'];
  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <div className="border-b border-[#E7DED2] bg-[#F5F0E8] py-14 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#24463A] text-[#E9C67D]"><Icon className="h-6 w-6" /></span>
          <p className="mt-5 text-xs font-extrabold uppercase tracking-[.17em] text-[#A85228]">{page.eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#2C221E] sm:text-5xl">{page.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#786D65] sm:text-base">{page.intro}</p>
        </div>
      </div>
      <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:gap-5">
          {page.items.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-[#E7DED2] bg-white p-5 shadow-[0_4px_20px_rgba(44,34,30,.04)] sm:p-6">
              <span className="text-xs font-extrabold text-[#C86D3B]">0{index + 1}</span>
              <h2 className="mt-1 font-serif text-xl font-bold text-[#2C221E]">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#786D65]">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#24463A] px-6 py-6 text-center text-white sm:flex-row sm:text-left">
          <p className="text-sm font-medium text-white/80">Ready to find something from the north?</p>
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#E9C67D] px-5 py-3 text-sm font-bold text-[#2C221E] transition hover:bg-[#F4D991]">Shop now <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </main>
    </div>
  );
}
