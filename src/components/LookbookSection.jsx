import React, { useState } from 'react';
import { Sparkles, Crown, ArrowRight } from 'lucide-react';
import { LOOKBOOK_STORIES } from '../data/banglesData';

export default function LookbookSection({ onSelectOccasionCombo }) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const currentStory = LOOKBOOK_STORIES[activeStoryIndex] || LOOKBOOK_STORIES[0];

  return (
    <section className="section-padding" id="lookbook-section" style={{ background: '#f5efe4' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <Crown size={14} /> Wedding & Celebration Styling
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--crimson-900)', marginBottom: '12px' }}>
            The Bridal <span className="gold-text">Lookbook</span>
          </h2>
          <p style={{ color: 'var(--stone-600)', fontSize: '1.02rem' }}>
            Curated bangle stacks designed to complement every Indian wedding ceremony — from sun-drenched Mehendi to glamorous cocktail nights.
          </p>
        </div>

        {/* Occasion Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}>
          {LOOKBOOK_STORIES.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => setActiveStoryIndex(idx)}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: activeStoryIndex === idx ? 700 : 500,
                cursor: 'pointer',
                border: activeStoryIndex === idx ? '2px solid var(--gold-500)' : '1px solid var(--cream-300)',
                background: activeStoryIndex === idx ? 'var(--crimson-900)' : '#ffffff',
                color: activeStoryIndex === idx ? '#ffd97d' : 'var(--stone-800)',
                boxShadow: activeStoryIndex === idx ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'all 0.2s'
              }}
            >
              {story.occasion}
            </button>
          ))}
        </div>

        {/* Feature Story Card */}
        <div className="royal-card" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          overflow: 'hidden',
          background: '#ffffff'
        }}>
          {/* Image */}
          <div style={{ position: 'relative', minHeight: '360px', maxHeight: '460px', overflow: 'hidden' }}>
            <img
              src={currentStory.image}
              alt={currentStory.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(66, 8, 21, 0.9)',
              color: '#ffd97d',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              fontFamily: 'var(--font-royal)'
            }}>
              {currentStory.occasion}
            </div>
          </div>

          {/* Details */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--gold-700)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Ceremony Recommendation
            </div>

            <h3 style={{ fontSize: '1.8rem', color: 'var(--crimson-900)', marginBottom: '16px', lineHeight: 1.25 }}>
              {currentStory.title}
            </h3>

            <blockquote style={{
              fontSize: '1.05rem',
              fontStyle: 'italic',
              color: 'var(--stone-700)',
              borderLeft: '3px solid var(--gold-500)',
              paddingLeft: '16px',
              marginBottom: '20px',
              lineHeight: 1.6
            }}>
              "{currentStory.quote}"
            </blockquote>

            {/* Suggested Combo */}
            <div style={{ background: 'var(--cream-100)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stone-800)', marginBottom: '6px' }}>
                Ideal Styling Formula:
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--crimson-800)', fontWeight: 600 }}>
                {currentStory.suggestedCombo}
              </div>

              {/* Color Swatch dots */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--stone-600)' }}>Harmonizing Palette:</span>
                {currentStory.colorPalette.map((col, cIdx) => (
                  <span
                    key={cIdx}
                    style={{ width: '18px', height: '18px', borderRadius: '50%', background: col, border: '1px solid #ccc' }}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => onSelectOccasionCombo(currentStory)}
                className="btn-gold"
                style={{ padding: '12px 24px', fontSize: '0.92rem' }}
              >
                <Sparkles size={16} /> Customize This Look in Studio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
