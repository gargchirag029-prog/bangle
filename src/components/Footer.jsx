import React from 'react';
import { Crown, Heart, MessageCircle, Phone, Mail, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenSizeGuide, onOpenCustomizer }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #26050e 0%, #120106 100%)',
      color: '#ffffff',
      paddingTop: '64px',
      paddingBottom: '32px',
      borderTop: '2px solid rgba(212, 175, 55, 0.4)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '36px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Column 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--gold-foil)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Crown size={20} color="#2b1a03" />
              </div>
              <div style={{ fontFamily: 'var(--font-royal)', fontSize: '1.3rem', fontWeight: 800, color: '#ffec9e' }}>
                KANGAN MANDIR
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'rgba(255, 240, 220, 0.8)', lineHeight: '1.65', marginBottom: '20px' }}>
              Handcrafting royal Indian bangles, bridal chooda sets, and uncut kundan kadas since generations.
              Tailored precisely to your wrist size and wedding ensembles.
            </p>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '8px 16px', fontSize: '0.84rem' }}
            >
              <MessageCircle size={16} /> WhatsApp Us: +91 98765 43210
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffd97d', fontFamily: 'var(--font-royal)', marginBottom: '16px', letterSpacing: '0.04em' }}>
              COLLECTIONS & STUDIO
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  onClick={onOpenCustomizer}
                  style={{ background: 'none', border: 'none', color: '#ffec9e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
                >
                  <Sparkles size={14} color="var(--gold-400)" />
                  <strong>Custom Bangle Studio</strong>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog-section')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer', padding: 0 }}
                >
                  Bridal Chooda Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog-section')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer', padding: 0 }}
                >
                  Kundan & Polki Kadas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog-section')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer', padding: 0 }}
                >
                  Handcrafted Silk Thread
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog-section')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.8)', cursor: 'pointer', padding: 0 }}
                >
                  Firozabad Glass & Velvet
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  style={{ background: 'none', border: 'none', color: 'var(--gold-400)', cursor: 'pointer', padding: 0 }}
                >
                  Find My Bangle Size Tool
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Atelier */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffd97d', fontFamily: 'var(--font-royal)', marginBottom: '16px', letterSpacing: '0.04em' }}>
              BOUTIQUE & ARTISAN LAB
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'rgba(255, 240, 220, 0.85)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} color="var(--gold-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Johari Bazaar, Near Hawa Mahal, Jaipur, Rajasthan - 302003</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <Phone size={16} color="var(--gold-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>+91 98765 43210 / +91 141 260 4890</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <Mail size={16} color="var(--gold-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>orders@kanganmandir.com</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--gold-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Lifetime Micro-Polish & Authenticity Certificate</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffd97d', fontFamily: 'var(--font-royal)', marginBottom: '16px', letterSpacing: '0.04em' }}>
              BRIDAL ATELIER UPDATES
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255, 240, 220, 0.8)', marginBottom: '14px' }}>
              Subscribe for new festive collection previews, custom bridal inspirations, and exclusive coupon codes.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('✨ Thank you for subscribing! Use coupon ROYAL10 for 10% off your first order.'); }} style={{ display: 'flex', gap: '6px' }}>
              <input
                type="email"
                required
                placeholder="Enter email address..."
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '0.84rem'
                }}
              />
              <button type="submit" className="btn-gold" style={{ padding: '9px 14px', fontSize: '0.84rem' }}>
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div style={{
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.78rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          <div>
            © 2026 Kangan Mandir & Co. All Rights Reserved. Handcrafted with devotion in India.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>UPI / Cards / NetBanking / COD</span>
            <span>•</span>
            <span>Insured Shipping Across India & Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
