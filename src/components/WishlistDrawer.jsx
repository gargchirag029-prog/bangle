import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div
        className="royal-card"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          borderRadius: 0,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          boxShadow: '-8px 0 25px rgba(0,0,0,0.25)',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--cream-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="var(--crimson-800)" fill="var(--crimson-800)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--crimson-900)' }}>
              Saved Styles ({wishlistItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--cream-100)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--stone-600)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', margin: 'auto 0' }}>
            <Heart size={36} color="var(--stone-400)" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '1.15rem', color: 'var(--crimson-900)', marginBottom: '6px' }}>
              No Saved Bangles Yet
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--stone-600)', marginBottom: '16px' }}>
              Tap the heart icon on any bangle in the collection to bookmark it here for later.
            </p>
            <button onClick={onClose} className="btn-gold" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Explore Catalog
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--cream-200)'
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '8px', overflow: 'hidden', background: '#f5efe6', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--stone-900)', fontWeight: 700, margin: 0 }}>
                      {item.name}
                    </h5>
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}
                      title="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--crimson-900)', margin: '4px 0' }}>
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>

                  <button
                    onClick={() => onMoveToCart(item)}
                    className="btn-gold"
                    style={{ padding: '6px 12px', fontSize: '0.78rem', marginTop: '6px' }}
                  >
                    <ShoppingBag size={12} /> Move to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
