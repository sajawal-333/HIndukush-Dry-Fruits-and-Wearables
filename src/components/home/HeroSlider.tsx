import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Mountain } from 'lucide-react';
import { heroSlides } from '@/data/hero';

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slide = heroSlides[current];

  // Auto-advance slides smoothly every 6.5s, pausing when hovered or interacted with
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, current]);

  const goToNext = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
  const goToPrev = () => setCurrent((prev) => (prev + heroSlides.length - 1) % heroSlides.length);

  return (
    <section
      className="hero-section"
      aria-label="Discover Hindukush"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="hero-layout">
        <div className="hero-copy">
          <div key={slide.id} className="hero-copy-main animate-hero-content">
            <p className="eyebrow hero-eyebrow"><span />{slide.eyebrow}</p>
            <div aria-live="polite" aria-atomic="true">
              <h1 className="hero-title">{slide.title}<br /><em>{slide.emphasis}</em></h1>
              <p className="hero-description">{slide.description}</p>
              <Link className="hero-cta" to={slide.link}>
                {slide.cta}
                <ArrowRight size={19} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-origin">
              <Mountain size={25} strokeWidth={1.2} aria-hidden="true" />
              <span>Rooted in the north.<br /><strong>Chosen with care.</strong></span>
            </div>
          </div>
          <div className="hero-controls">
            <div className="hero-pagination" aria-label="Featured collections">
              {heroSlides.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(index)}
                  aria-label={'Show ' + item.label}
                  aria-pressed={index === current}
                >
                  <span className={index === current ? 'active' : ''} />
                </button>
              ))}
            </div>
            <div className="hero-arrows">
              <span className="hero-counter">
                {String(current + 1).padStart(2, '0')}{' '}
                <span>/ {String(heroSlides.length).padStart(2, '0')}</span>
              </span>
              <button aria-label="Previous collection" onClick={goToPrev}>
                <ChevronLeft size={18} />
              </button>
              <button aria-label="Next collection" onClick={goToNext}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <figure className="hero-photo">
          {heroSlides.map((item, index) => {
            const isActive = index === current;
            return (
              <div
                key={item.id}
                className={`hero-slide-image-wrap ${isActive ? 'is-active' : ''}`}
                aria-hidden={!isActive}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1376}
                  height={768}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <figcaption className="hero-slide-caption-wrap">
                  <span className="hero-photo-caption">{item.caption}</span>
                  <span className="hero-photo-note">HINDUKUSH · HARVEST & HERITAGE</span>
                </figcaption>
              </div>
            );
          })}
        </figure>
      </div>
    </section>
  );
}
