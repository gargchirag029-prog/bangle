import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/banglesData';

export default function ReviewsSection() {
  return (
    <section className="section-padding" style={{ background: '#f5efe4' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <Star size={13} fill="var(--gold-500)" /> 4.9/5 from 1,200+ Brides
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--crimson-900)', marginBottom: '14px' }}>
            Stories of <span className="gold-text">Our Brides & Patrons</span>
          </h2>
          <p style={{ color: 'var(--stone-600)', fontSize: '1.02rem' }}>
            Read real feedback from brides and jewelry lovers who customized their dream bangles with us.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {CUSTOMER_REVIEWS.map(rev => (
            <div
              key={rev.id}
              className="royal-card"
              style={{
                padding: '28px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', color: 'var(--gold-500)', marginBottom: '14px' }}>
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Review Text */}
              <p style={{
                fontSize: '0.92rem',
                color: 'var(--stone-700)',
                lineHeight: '1.65',
                marginBottom: '20px',
                fontStyle: 'italic',
                flex: 1
              }}>
                "{rev.text}"
              </p>

              {/* Item Tag */}
              <div style={{
                background: 'var(--cream-100)',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                color: 'var(--crimson-800)',
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                Item: {rev.item}
              </div>

              {/* Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--cream-200)', paddingTop: '14px' }}>
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--stone-900)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {rev.name}
                    {rev.verified && <CheckCircle size={14} color="var(--emerald-700)" />}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--stone-500)' }}>
                    {rev.city} • {rev.occasion}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
