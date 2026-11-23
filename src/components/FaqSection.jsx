import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/banglesData';

export default function FaqSection({ onOpenSizeGuide }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="section-padding" style={{ background: '#fdfbf7' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <HelpCircle size={14} /> Clear Answers
          </div>
          <h2 style={{ fontSize: '2.4rem', color: 'var(--crimson-900)', marginBottom: '12px' }}>
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
          <p style={{ color: 'var(--stone-600)', fontSize: '1rem' }}>
            Everything you need to know about custom bangle sizing, color matching, and dispatch timelines.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="royal-card"
                style={{
                  background: '#ffffff',
                  border: isOpen ? '1.5px solid var(--gold-500)' : '1px solid var(--cream-200)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    color: isOpen ? 'var(--crimson-900)' : 'var(--stone-800)'
                  }}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={20} color="var(--gold-600)" /> : <ChevronDown size={20} color="var(--stone-400)" />}
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 20px',
                    fontSize: '0.92rem',
                    color: 'var(--stone-600)',
                    lineHeight: '1.7',
                    borderTop: '1px solid var(--cream-100)'
                  }}>
                    {faq.answer}
                    {idx === 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <button
                          onClick={onOpenSizeGuide}
                          className="btn-outline-gold"
                          style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                        >
                          Open Interactive Size Guide →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
