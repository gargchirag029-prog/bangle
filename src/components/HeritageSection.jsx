import React from 'react';
import { Crown, Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export default function HeritageSection() {
  const pillars = [
    {
      title: "Jaipur Jadau & Uncut Polki",
      description: "Rooted in royal Rajasthani jewelry traditions, every stone is carefully hand-set in pure silver foils and 22K gold plating by master artisans whose families have practiced for centuries.",
      icon: <Crown size={24} color="var(--gold-600)" />
    },
    {
      title: "Firozabad Acoustic Glassmaking",
      description: "Crafted using high-silica pure glass blown in traditional furnaces to produce the crystal-clear chime and comfortable velvet smooth inner rims that protect the bride's wrists.",
      icon: <Sparkles size={24} color="var(--gold-600)" />
    },
    {
      title: "Hand-Wound Silk Resham",
      description: "Finest quality mulberry silk threads meticulously wound around unbreakable reinforced cores, finished with non-fraying waterproof sealants and zardozi borders.",
      icon: <Heart size={24} color="var(--gold-600)" />
    },
    {
      title: "Lifetime Polish & Size Exchange",
      description: "Every kada and chooda set comes with our hallmark certificate, anti-tarnish protective lacquer, and complimentary size resizing assistance.",
      icon: <ShieldCheck size={24} color="var(--gold-600)" />
    }
  ];

  return (
    <section className="section-padding" id="heritage-section" style={{ background: '#fdfbf7' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <Award size={14} /> Four Centuries of Legacy
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--crimson-900)', marginBottom: '14px' }}>
            The Art Behind <span className="gold-text">Every Churi & Kada</span>
          </h2>
          <p style={{ color: 'var(--stone-600)', fontSize: '1.02rem' }}>
            We believe bangles are not mere accessories — they are resonant heirlooms, blessings from generations, and sacred adornments of love.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="royal-card"
              style={{
                padding: '28px',
                background: '#ffffff',
                border: '1px solid var(--cream-200)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: 'var(--cream-100)',
                border: '1px solid var(--gold-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                {pillar.icon}
              </div>

              <h4 style={{ fontSize: '1.2rem', color: 'var(--crimson-900)', marginBottom: '10px' }}>
                {pillar.title}
              </h4>

              <p style={{ fontSize: '0.88rem', color: 'var(--stone-600)', lineHeight: '1.65' }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
