import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingCart, MessageCircle, Ruler, Palette, Feather, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/components/ui/index';
import { cn } from '@/lib/utils';
import type { CartItem } from '@/types';

export interface ShawlColorOption {
  id: string;
  name: string;
  urduName?: string;
  hex: string;
  type: 'natural' | 'botanical' | 'custom';
  description: string;
}

export const SHAWL_COLORS: ShawlColorOption[] = [
  // 1. Natural Undyed Fleece (100% Organic, zero chemical dye)
  {
    id: 'natural-ivory',
    name: 'Karakul Natural Ivory',
    urduName: 'قدرتی سفید بھیڑ اون',
    hex: '#F4EFE6',
    type: 'natural',
    description: '100% raw unbleached mountain sheep fleece, soft warm cream tone',
  },
  {
    id: 'natural-camel',
    name: 'Chitrali Camel Khaki',
    urduName: 'اونٹ رنگ قدرتی خاکی',
    hex: '#C19A6B',
    type: 'natural',
    description: 'Indigenous warm camel fleece shade, earthy & wind-tested',
  },
  {
    id: 'natural-grey',
    name: 'Heather Mountain Mist Grey',
    urduName: 'کوہستانی سلیٹی اون',
    hex: '#9A948D',
    type: 'natural',
    description: 'Natural blended grey fleece from high-altitude Chitral flocks',
  },
  {
    id: 'natural-charcoal',
    name: 'Deep Mountain Charcoal',
    urduName: 'سیاہ بھیڑ خالص اون',
    hex: '#3A322D',
    type: 'natural',
    description: 'Natural black mountain sheep wool, rich un-dyed dark espresso tone',
  },

  // 2. Botanical Herbal & Mineral Artisan Hand-Dyes
  {
    id: 'rohnas-ruby',
    name: 'Rohnas Ruby Crimson',
    urduName: 'روہناس لال (قدرتی جڑی بوٹی)',
    hex: '#78282B',
    type: 'botanical',
    description: 'Hand-dyed with wild Chitral madder root (Rohnas), deep royal crimson',
  },
  {
    id: 'juniper-green',
    name: 'Emerald Juniper Forest Green',
    urduName: 'صنوبر سبز',
    hex: '#1E4434',
    type: 'botanical',
    description: 'Chitral high-altitude evergreen juniper pine leaf dye extract',
  },
  {
    id: 'khyber-indigo',
    name: 'Midnight Khyber Indigo Navy',
    urduName: 'گہرا نیلا سرمئی',
    hex: '#1E2A3A',
    type: 'botanical',
    description: 'Classic mountain mineral indigo dye, timeless royal navy finish',
  },
  {
    id: 'anar-mustard',
    name: 'Anar Dana Golden Ochre',
    urduName: 'انار دانہ زرد زعفرانی',
    hex: '#C6923C',
    type: 'botanical',
    description: 'Derived from sun-dried wild mountain pomegranate peels',
  },
  {
    id: 'walnut-umber',
    name: 'Walnut Husk Bark Umber',
    urduName: 'اخروٹ چھال کتھئی',
    hex: '#553E2D',
    type: 'botanical',
    description: 'Simmered fresh green walnut husk dye bath, rich earthy tone',
  },
  {
    id: 'rose-clay',
    name: 'Kafirstan Rose Terracotta',
    urduName: 'گلابی مٹی روایتی رنگ',
    hex: '#C48378',
    type: 'botanical',
    description: 'Gentle mineral rose clay wash, antique pastel elegance',
  },
];

interface CustomShawlModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGender?: 'Men' | 'Women';
}

export function CustomShawlModal({ isOpen, onClose, defaultGender = 'Women' }: CustomShawlModalProps) {
  const [gender, setGender] = useState<'Men' | 'Women'>(defaultGender);
  const [selectedColor, setSelectedColor] = useState<ShawlColorOption>(SHAWL_COLORS[0]);
  const [isCustomColorMode, setIsCustomColorMode] = useState(false);
  const [customColorText, setCustomColorText] = useState('');
  
  // Dimensions
  const [sizeOption, setSizeOption] = useState<'standard' | 'large' | 'custom'>('standard');
  const [customDimensions, setCustomDimensions] = useState('');

  // Wool Grade
  const [woolGrade, setWoolGrade] = useState<'classic' | 'pashmina' | 'heavy'>('classic');

  // Embroidery / Finish
  const [embroideryStyle, setEmbroideryStyle] = useState<string>(
    defaultGender === 'Men' ? 'Woven Mountain Fringes' : 'Hand-Embroidered Floral Border'
  );
  const [customMonogram, setCustomMonogram] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  const addCustomItem = useCartStore((s) => s.addCustomItem);
  const setCartOpen = useCartStore((s) => s.setOpen);

  if (!isOpen) return null;

  // Pricing calculation
  const basePrice = gender === 'Men' ? 4500 : 4200;
  const sizeAddon = sizeOption === 'large' ? 1200 : sizeOption === 'custom' ? 1500 : 0;
  const woolAddon = woolGrade === 'pashmina' ? 1800 : woolGrade === 'heavy' ? 900 : 0;
  const customColorAddon = isCustomColorMode ? 600 : 0;
  const monogramAddon = customMonogram.trim() ? 500 : 0;
  const totalPrice = basePrice + sizeAddon + woolAddon + customColorAddon + monogramAddon;

  const currentSizeLabel =
    sizeOption === 'standard'
      ? gender === 'Men' ? 'Standard Chaddar (2.5m × 1.25m)' : 'Standard Shawl (2.25m × 1.15m)'
      : sizeOption === 'large'
      ? gender === 'Men' ? 'Extra Warm Winter Large (3.0m × 1.5m)' : 'Festive Royal Large (2.5m × 1.25m)'
      : `Bespoke Custom: ${customDimensions || 'As specified'}`;

  const colorTitle = isCustomColorMode
    ? `Custom Bespoke Shade: ${customColorText || 'Client Sample'}`
    : selectedColor.name;

  const handleAddToCart = () => {
    const item: CartItem = {
      id: `custom-shawl-${gender.toLowerCase()}-${Date.now()}`,
      productId: gender === 'Men' ? 'hk-19b' : 'hk-19',
      name: `Custom-Made ${gender}'s Chitrali Wool Shawl`,
      image: gender === 'Men' ? '/images/mens_chitrali_shawl.jpg' : '/images/embroidered_ladies_shawl.jpg',
      weight: currentSizeLabel,
      grams: gender === 'Men' ? 1000 : 550,
      price: totalPrice,
      originalPrice: totalPrice + 800,
      quantity: 1,
      slug: gender === 'Men' ? 'mens-chitrali-wool-shawl-chaddar' : 'ladies-shawl',
      customDetails: {
        gender,
        colorName: colorTitle,
        colorHex: isCustomColorMode ? '#E2D9CC' : selectedColor.hex,
        dimensions: currentSizeLabel,
        woolGrade: woolGrade === 'pashmina' ? 'Pashmina / Cashmere Blend' : woolGrade === 'heavy' ? 'Heavy Double Pattu Wool' : 'Pure Chitral Mountain Sheep Wool',
        embroideryStyle: `${embroideryStyle}${customMonogram.trim() ? ` (Monogram: "${customMonogram.trim()}")` : ''}`,
        customerNotes: customerNotes.trim() || undefined,
      },
    };

    addCustomItem(item);
    toast({
      title: 'Custom Shawl added to cart!',
      description: `${item.name} (${colorTitle})`,
      variant: 'success',
    });
    setCartOpen(true);
    onClose();
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Salaam! I would like to order a Custom-Made Chitrali Shawl from Hindukush Dry Fruits & Specialties:\n` +
      `• Gender/Style: ${gender}'s Shawl\n` +
      `• Color: ${colorTitle}\n` +
      `• Size/Dimensions: ${currentSizeLabel}\n` +
      `• Wool Grade: ${woolGrade}\n` +
      `• Border/Embroidery: ${embroideryStyle} ${customMonogram ? `(Monogram: ${customMonogram})` : ''}\n` +
      `• Estimated Price: PKR ${totalPrice.toLocaleString()}\n` +
      (customerNotes ? `• Special Notes: ${customerNotes}\n` : '') +
      `Please let me know how to proceed with this custom order!`
    );
    window.open(`https://wa.me/923064166360?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-3xl border border-[#DCD3C4] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#2C221E] text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C86D3B] text-white text-[11px] font-bold tracking-wide uppercase">
              <Sparkles className="h-3 w-3" />
              Bespoke Artisan Atelier
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight">
              Order Custom-Made Chitrali Shawl
            </h2>
            <p className="text-xs sm:text-sm text-[#DDD4CB]">
              Handcrafted in Chitral by master weavers with 100% pure mountain wool.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Step 1: Gender / Collection Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2C221E] flex items-center gap-1.5">
              <span>1. Choose Shawl Collection</span>
              <span className="text-[#C86D3B]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setGender('Men');
                  setEmbroideryStyle('Woven Mountain Fringes');
                }}
                className={cn(
                  'p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3',
                  gender === 'Men'
                    ? 'border-[#2C221E] bg-white shadow-md ring-2 ring-[#2C221E]'
                    : 'border-[#E2D8C9] bg-[#F5ECE0] hover:bg-white'
                )}
              >
                <div className="h-12 w-12 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                  <img src="/images/mens_chitrali_shawl.jpg" alt="Men's Shawl" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm text-[#2C221E]">Men's Shawl / Chaddar</div>
                  <div className="text-[11px] text-[#7A6F66]">Traditional Pattu, windproof & warm</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setGender('Women');
                  setEmbroideryStyle('Hand-Embroidered Floral Border');
                }}
                className={cn(
                  'p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3',
                  gender === 'Women'
                    ? 'border-[#2C221E] bg-white shadow-md ring-2 ring-[#2C221E]'
                    : 'border-[#E2D8C9] bg-[#F5ECE0] hover:bg-white'
                )}
              >
                <div className="h-12 w-12 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                  <img src="/images/embroidered_ladies_shawl.jpg" alt="Women's Shawl" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm text-[#2C221E]">Women's Shawl</div>
                  <div className="text-[11px] text-[#7A6F66]">Fine needlework floral embroidery</div>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Custom-Made Colors Palette */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2C221E] flex items-center gap-1.5">
                <Palette className="h-4 w-4 text-[#C86D3B]" />
                <span>2. Select Wool Color / Dye Shade</span>
              </label>
              <span className="text-[11px] text-[#86796E]">
                {isCustomColorMode ? 'Bespoke Custom Dye' : selectedColor.name}
              </span>
            </div>

            {/* Natural Undyed Section */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-[#6D6157] uppercase tracking-wider">
                🍃 Natural Undyed Mountain Sheep Wool (Chemical-Free)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SHAWL_COLORS.filter((c) => c.type === 'natural').map((c) => {
                  const isSelected = !isCustomColorMode && selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c);
                        setIsCustomColorMode(false);
                      }}
                      className={cn(
                        'p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5',
                        isSelected
                          ? 'border-[#2C221E] bg-white shadow-xs ring-2 ring-[#2C221E]'
                          : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white'
                      )}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/20 flex-shrink-0 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#2C221E] truncate">{c.name}</div>
                        <div className="text-[10px] text-[#85796E] truncate">{c.urduName}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botanical Artisan Dyed Section */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-[#6D6157] uppercase tracking-wider">
                🎨 Heritage Botanical & Mineral Artisan Dyes
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SHAWL_COLORS.filter((c) => c.type === 'botanical').map((c) => {
                  const isSelected = !isCustomColorMode && selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c);
                        setIsCustomColorMode(false);
                      }}
                      className={cn(
                        'p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5',
                        isSelected
                          ? 'border-[#2C221E] bg-white shadow-xs ring-2 ring-[#2C221E]'
                          : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white'
                      )}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/20 flex-shrink-0 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#2C221E] truncate">{c.name}</div>
                        <div className="text-[10px] text-[#85796E] truncate">{c.urduName}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bespoke Custom Color Input */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsCustomColorMode(!isCustomColorMode)}
                className={cn(
                  'w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between',
                  isCustomColorMode
                    ? 'border-[#C86D3B] bg-white ring-2 ring-[#C86D3B]'
                    : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-400 via-amber-300 via-emerald-400 to-indigo-500 shadow-xs" />
                  <div>
                    <span className="text-xs font-bold text-[#2C221E]">
                      Need a Specific Custom Color (Match My Dress / Sherwani)?
                    </span>
                    <span className="block text-[10px] text-[#7A6F66]">
                      Custom dye master batch (+PKR 600)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#C86D3B]">
                  {isCustomColorMode ? 'Selected' : 'Select'}
                </span>
              </button>

              {isCustomColorMode && (
                <div className="mt-2.5 p-3 rounded-xl bg-white border border-[#DCD3C4] space-y-2 animate-in fade-in">
                  <label className="text-xs font-semibold text-[#443831]">
                    Enter desired shade name, hex, or description:
                  </label>
                  <input
                    type="text"
                    value={customColorText}
                    onChange={(e) => setCustomColorText(e.target.value)}
                    placeholder="e.g. Sage Green, Bridal Maroon, Groom Sherwani Gold..."
                    className="w-full h-10 px-3 rounded-xl border border-[#D0C4B4] text-xs focus:ring-2 focus:ring-[#C86D3B] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#867B71]">
                    💡 You can also send us a photo of your cloth swatch on WhatsApp after placing the order!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Dimensions & Sizes */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2C221E] flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-[#C86D3B]" />
              <span>3. Choose Dimensions & Length</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSizeOption('standard')}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  sizeOption === 'standard'
                    ? 'border-[#2C221E] bg-white ring-2 ring-[#2C221E]'
                    : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white'
                )}
              >
                <div className="text-xs font-bold text-[#2C221E]">Standard Size</div>
                <div className="text-[11px] text-[#7A6F66]">
                  {gender === 'Men' ? '2.5m × 1.25m' : '2.25m × 1.15m'}
                </div>
                <div className="text-[11px] font-semibold text-[#C86D3B] mt-1">Included</div>
              </button>

              <button
                type="button"
                onClick={() => setSizeOption('large')}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  sizeOption === 'large'
                    ? 'border-[#2C221E] bg-white ring-2 ring-[#2C221E]'
                    : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white'
                )}
              >
                <div className="text-xs font-bold text-[#2C221E]">
                  {gender === 'Men' ? 'Overcoat Winter Large' : 'Festive Royal Large'}
                </div>
                <div className="text-[11px] text-[#7A6F66]">
                  {gender === 'Men' ? '3.0m × 1.5m' : '2.5m × 1.25m'}
                </div>
                <div className="text-[11px] font-semibold text-[#C86D3B] mt-1">+PKR 1,200</div>
              </button>

              <button
                type="button"
                onClick={() => setSizeOption('custom')}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  sizeOption === 'custom'
                    ? 'border-[#2C221E] bg-white ring-2 ring-[#2C221E]'
                    : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white'
                )}
              >
                <div className="text-xs font-bold text-[#2C221E]">Custom Dimensions</div>
                <div className="text-[11px] text-[#7A6F66]">Bespoke length/width</div>
                <div className="text-[11px] font-semibold text-[#C86D3B] mt-1">+PKR 1,500</div>
              </button>
            </div>

            {sizeOption === 'custom' && (
              <div className="p-3 bg-white border border-[#D5C9B8] rounded-xl space-y-1.5 animate-in fade-in">
                <label className="text-xs font-semibold text-[#443831]">
                  Specify exact measurements (in meters or feet):
                </label>
                <input
                  type="text"
                  value={customDimensions}
                  onChange={(e) => setCustomDimensions(e.target.value)}
                  placeholder="e.g., 2.8 meters length × 1.4 meters width"
                  className="w-full h-10 px-3 rounded-xl border border-[#D0C4B4] text-xs focus:ring-2 focus:ring-[#C86D3B] focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Step 4: Wool Grade & Warmth */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2C221E] flex items-center gap-1.5">
              <Feather className="h-4 w-4 text-[#C86D3B]" />
              <span>4. Wool Weave & Warmth Grade</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setWoolGrade('classic')}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  woolGrade === 'classic'
                    ? 'border-[#2C221E] bg-white ring-2 ring-[#2C221E]'
                    : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white'
                )}
              >
                <div className="text-xs font-bold text-[#2C221E]">100% Pure Mountain Wool</div>
                <div className="text-[11px] text-[#7A6F66]">Authentic Chitrali sheep wool</div>
                <div className="text-[11px] font-semibold text-[#C86D3B] mt-1">Standard</div>
              </button>

              <button
                type="button"
                onClick={() => setWoolGrade('pashmina')}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  woolGrade === 'pashmina'
                    ? 'border-[#2C221E] bg-white ring-2 ring-[#2C221E]'
                    : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white'
                )}
              >
                <div className="text-xs font-bold text-[#2C221E]">Pashmina / Cashmere Blend</div>
                <div className="text-[11px] text-[#7A6F66]">Feather-soft & lightweight luxury</div>
                <div className="text-[11px] font-semibold text-[#C86D3B] mt-1">+PKR 1,800</div>
              </button>

              <button
                type="button"
                onClick={() => setWoolGrade('heavy')}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  woolGrade === 'heavy'
                    ? 'border-[#2C221E] bg-white ring-2 ring-[#2C221E]'
                    : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white'
                )}
              >
                <div className="text-xs font-bold text-[#2C221E]">Heavy Winter Double-Pattu</div>
                <div className="text-[11px] text-[#7A6F66]">Sub-zero mountain windproof</div>
                <div className="text-[11px] font-semibold text-[#C86D3B] mt-1">+PKR 900</div>
              </button>
            </div>
          </div>

          {/* Step 5: Embroidery & Monogram Finish */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2C221E]">
              5. Embroidery & Finish Preferences
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                gender === 'Men' ? 'Woven Mountain Fringes' : 'Hand-Embroidered Floral Border',
                'Minimalist Clean Edge',
                'Kalash Tribal Geometric Pattern',
                'Full Jaal Needlework',
              ].map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setEmbroideryStyle(style)}
                  className={cn(
                    'p-2.5 rounded-xl border text-left text-xs font-medium transition-all',
                    embroideryStyle === style
                      ? 'border-[#2C221E] bg-white font-bold ring-2 ring-[#2C221E]'
                      : 'border-[#E0D5C5] bg-[#F8F2E8] hover:bg-white text-[#554941]'
                  )}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Optional Initials / Monogram */}
            <div className="p-3 bg-white rounded-xl border border-[#D8CCBA] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C221E]">
                  Optional Hand-Embroidered Name or Monogram (+PKR 500)
                </span>
                <span className="text-[10px] text-[#867B71]">Personalized Gift</span>
              </div>
              <input
                type="text"
                value={customMonogram}
                onChange={(e) => setCustomMonogram(e.target.value)}
                placeholder="e.g. S.K. or Sajawal Khan (in English or Urdu script)"
                className="w-full h-9 px-3 rounded-lg border border-[#D0C4B4] text-xs focus:ring-2 focus:ring-[#C86D3B] focus:outline-none"
              />
            </div>

            {/* Special Instructions */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#443831]">
                Special Instructions or Matching Requirements:
              </label>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={2}
                placeholder="Any special details for our Chitrali master artisans..."
                className="w-full p-2.5 rounded-xl border border-[#D0C4B4] text-xs focus:ring-2 focus:ring-[#C86D3B] focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer & Actions */}
        <div className="bg-white border-t border-[#E5DAC9] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-[#7A6F66]">
              Configured: <strong className="text-[#2C221E]">{gender}'s Shawl</strong> • {colorTitle}
            </div>
            <div className="text-xl sm:text-2xl font-serif font-extrabold text-[#2C221E]">
              PKR {totalPrice.toLocaleString()}
              <span className="text-xs text-emerald-700 font-sans font-semibold ml-2">
                Delivery charges apply
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="flex-1 sm:flex-initial py-3 px-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Inquire on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial py-3 px-5 rounded-full bg-[#C86D3B] hover:bg-[#B55B2B] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add Custom Shawl to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
