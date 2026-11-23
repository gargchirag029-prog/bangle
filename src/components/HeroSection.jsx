import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Crown, Ruler, MessageCircle } from 'lucide-react';

export default function HeroSection({ onOpenCustomizer, onOpenCatalog, onOpenSizeGuide }) {
  return (
    <section style={{
      position: 'relative',
      background: 'radial-gradient(ellipse at 70% 30%, #520d1c 0%, #29050d 60%, #150206 100%)',
      color: '#ffffff',
      padding: '70px 0 90px',
      overflow: 'hidden'
    }}>
      {/* Subtle royal background ornament rings */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        border: '1.5px dashed rgba(212, 175, 55, 0.15)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Column: Hero Text & CTAs */}
          <div>
            <div className="badge-gold" style={{ marginBottom: '16px' }}>
              <Crown size={13} /> Royal Jaipur & Firozabad Heritage
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              lineHeight: 1.15,
              marginBottom: '20px',
              fontFamily: 'var(--font-royal)',
              fontWeight: 800
            }}>
              Sacred Circles of Grace, <span className="gold-text">Crafted Your Way.</span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: 'rgba(255, 240, 215, 0.9)',
              marginBottom: '32px',
              maxWidth: '560px'
            }}>
              From regal <strong>Punjabi Bridal Choodas</strong> and <strong>Jadau Kundan Kadas</strong> to
              vibrant <strong>Hand-Wound Silk Resham</strong> bangles. Explore our curated collections
              or use our <strong>Interactive 3D Studio</strong> to customize sizes, colors, gemstones, and engraved initials.
            </p>

            {/* Hero CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
              <button
                onClick={onOpenCustomizer}
                className="btn-gold"
                style={{ padding: '16px 28px', fontSize: '1.05rem' }}
              >
                <Sparkles size={20} /> Design In Custom Studio
              </button>

              <button
                onClick={onOpenCatalog}
                className="btn-outline-gold"
                style={{
                  padding: '16px 24px',
                  fontSize: '1rem',
                  borderColor: 'rgba(255, 236, 158, 0.6)',
                  color: '#ffec9e',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                Explore Collections <ArrowRight size={18} />
              </button>
            </div>

            {/* Trust Markers */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(212, 175, 55, 0.25)',
              fontSize: '0.85rem',
              color: '#ffec9e'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={18} color="var(--gold-400)" />
                <span>100% Artisan Crafted</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Ruler size={18} color="var(--gold-400)" />
                <span>Sizes 2.2 to 2.10</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageCircle size={18} color="#25d366" />
                <span>WhatsApp Order Direct</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '440px',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, rgba(82, 13, 28, 0.7) 0%, rgba(20, 2, 7, 0.85) 100%)',
              border: '2px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.2)',
              padding: '24px',
              overflow: 'hidden'
            }}>
              {/* Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="badge-crimson" style={{ border: '1px solid var(--gold-500)' }}>
                  👑 Bridal Spotlight
                </span>
                <span style={{ fontSize: '0.78rem', color: '#ffd97d', fontFamily: 'var(--font-royal)' }}>
                  HANDCRAFTED IN RAJASTHAN
                </span>
              </div>

              {/* Showcase Image */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '4 / 3',
                marginBottom: '16px',
                position: 'relative',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                  alt="Royal Kundan Chooda Stack"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 2, 7, 0.8) 0%, transparent 60%)'
                }} />
                <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                    Maharani Sindoor Red & White Chooda
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#ffd97d' }}>
                    With Pearl Latkans & Engraved Monogram Initial Tag
                  </div>
                </div>
              </div>

              {/* Quick Feature Callout */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#ffec9e', textTransform: 'uppercase' }}>Available For Customization</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Customize Color, Stone & Size</div>
                </div>
                <button
                  onClick={onOpenCustomizer}
                  style={{
                    background: 'var(--gold-foil)',
                    color: '#281702',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Customize →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
