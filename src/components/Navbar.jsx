import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Ruler,
  MessageCircle,
  Menu,
  X,
  Crown,
  Search
} from 'lucide-react';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSizeGuide,
  onNavigateCustomizer
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900, background: '#ffffff', boxShadow: '0 2px 12px rgba(40, 20, 10, 0.08)' }}>
      {/* Top Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #420815 0%, #72162a 50%, #420815 100%)',
        color: '#ffec9e',
        fontSize: '0.78rem',
        padding: '7px 16px',
        textAlign: 'center',
        fontWeight: 600,
        letterSpacing: '0.04em',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)'
      }}>
        ✨ FREE Insured Express Shipping On Orders Above ₹2,999 • 💍 Live Bridal Consultation on WhatsApp: +91 98765 43210
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            color: 'var(--crimson-900)',
            cursor: 'pointer',
            padding: '8px'
          }}
          className="hide-on-desktop"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #72162a 0%, #30050e 100%)',
            border: '2px solid var(--gold-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-gold)'
          }}>
            <Crown size={22} color="#ffd97d" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-royal)',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: 'var(--crimson-900)',
              letterSpacing: '0.06em',
              lineHeight: 1
            }}>
              KANGAN MANDIR
            </div>
            <div style={{
              fontSize: '0.66rem',
              color: 'var(--gold-700)',
              letterSpacing: '0.14em',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginTop: '2px'
            }}>
              Artisanal Bangle Atelier
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="nav-desktop-links">
          <button
            onClick={() => scrollToSection('catalog-section')}
            style={{ background: 'none', border: 'none', fontSize: '0.92rem', fontWeight: 600, color: 'var(--stone-800)', cursor: 'pointer' }}
          >
            Collections
          </button>

          <button
            onClick={() => {
              scrollToSection('custom-studio');
              if (onNavigateCustomizer) onNavigateCustomizer();
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: 700,
              color: 'var(--crimson-800)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sparkles size={16} color="var(--gold-600)" />
            Custom Studio
          </button>

          <button
            onClick={() => scrollToSection('lookbook-section')}
            style={{ background: 'none', border: 'none', fontSize: '0.92rem', fontWeight: 600, color: 'var(--stone-800)', cursor: 'pointer' }}
          >
            Bridal Lookbook
          </button>

          <button
            onClick={onOpenSizeGuide}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--stone-800)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Ruler size={15} color="var(--gold-600)" />
            Size Guide
          </button>

          <button
            onClick={() => scrollToSection('heritage-section')}
            style={{ background: 'none', border: 'none', fontSize: '0.92rem', fontWeight: 600, color: 'var(--stone-800)', cursor: 'pointer' }}
          >
            Our Craft
          </button>
        </nav>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            title="Wishlist"
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              color: 'var(--stone-700)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'var(--crimson-800)',
                color: '#fff',
                fontSize: '0.68rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            title="Shopping Bag"
            style={{
              position: 'relative',
              background: 'var(--cream-100)',
              border: '1px solid var(--cream-300)',
              borderRadius: '12px',
              color: 'var(--crimson-900)',
              cursor: 'pointer',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '0.88rem'
            }}
          >
            <ShoppingBag size={20} />
            <span>Bag</span>
            {cartCount > 0 && (
              <span style={{
                background: 'var(--crimson-800)',
                color: '#ffec9e',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '2px 7px',
                borderRadius: '9999px'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp Direct Inquiry Button */}
          <a
            href="https://wa.me/919876543210?text=Hello%20Kangan%20Mandir,%20I%20would%20like%20to%20inquire%20about%20bangles"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Consultation"
            style={{
              background: '#25d366',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(37, 211, 102, 0.35)'
            }}
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          borderTop: '1px solid var(--cream-200)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <button
            onClick={() => scrollToSection('catalog-section')}
            style={{ textAlign: 'left', background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600, color: 'var(--stone-800)', padding: '8px 0' }}
          >
            Explore Collections
          </button>

          <button
            onClick={() => scrollToSection('custom-studio')}
            style={{ textAlign: 'left', background: 'none', border: 'none', fontSize: '1rem', fontWeight: 700, color: 'var(--crimson-800)', padding: '8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={16} color="var(--gold-600)" />
            Custom Bangle Studio
          </button>

          <button
            onClick={() => scrollToSection('lookbook-section')}
            style={{ textAlign: 'left', background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600, color: 'var(--stone-800)', padding: '8px 0' }}
          >
            Bridal Lookbook
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSizeGuide();
            }}
            style={{ textAlign: 'left', background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600, color: 'var(--stone-800)', padding: '8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Ruler size={16} color="var(--gold-600)" />
            Bangle Size Calculator
          </button>

          <button
            onClick={() => scrollToSection('heritage-section')}
            style={{ textAlign: 'left', background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600, color: 'var(--stone-800)', padding: '8px 0' }}
          >
            Artisan Craftsmanship
          </button>
        </div>
      )}
    </header>
  );
}
