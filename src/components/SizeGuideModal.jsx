import React, { useState } from 'react';
import { BANGLE_SIZE_CHART } from '../data/banglesData';

export default function SizeGuideModal({ onClose, onSelectSize }) {
  const [sliderMm, setSliderMm] = useState(60.3); // default 2-6

  const getClosestSize = (mm) => {
    if (mm < 55.6) return { size: '2-2', label: 'Extra Small (XS)', fit: 'For very petite wrists' };
    if (mm < 58.7) return { size: '2-4', label: 'Small (S)', fit: 'Popular for slender wrists' };
    if (mm < 61.9) return { size: '2-6', label: 'Medium (M - Standard)', fit: 'Most common luxury wrist proportion (~65%)' };
    if (mm < 65.1) return { size: '2-8', label: 'Large (L)', fit: 'Comfortable standard for medium-broad wrists' };
    return { size: '2-10', label: 'Extra Large (XL)', fit: 'Generous royal fit or larger hand bones' };
  };

  const detected = getClosestSize(sliderMm);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="bg-surface rounded-xl max-w-2xl w-full p-6 lg:p-8 shadow-2xl relative border border-outline-variant/30 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface bg-transparent border-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-primary font-label-sm text-label-sm uppercase tracking-widest border border-outline-variant/30 mb-2">
            <span className="material-symbols-outlined text-[14px]">straighten</span>
            Atelier Precision Mandrel Calibration
          </span>
          <h2 className="font-headline-md text-2xl lg:text-3xl text-on-surface">
            Find Your Sovereign <span className="italic font-headline-md text-primary">Bangle Fit</span>
          </h2>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto mt-1">
            Indian royal bangles are measured by internal diameter in inches and sixteenths (e.g. 2-6 represents 2 and 6/16 inches, or 60.3mm).
          </p>
        </div>

        {/* Interactive Millimeter Mandrel Slider */}
        <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/30 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
              Interactive Inner Diameter Finder:
            </span>
            <span className="font-headline-md text-xl font-bold text-primary">
              {sliderMm} mm
            </span>
          </div>

          <input
            type="range"
            min="52"
            max="68"
            step="0.5"
            value={sliderMm}
            onChange={(e) => setSliderMm(parseFloat(e.target.value))}
            className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-[#775a19]"
          />

          <div className="flex justify-between text-[10px] text-on-surface-variant font-mono mt-1.5">
            <span>52mm (2-2)</span>
            <span>57mm (2-4)</span>
            <span>60mm (2-6)</span>
            <span>63.5mm (2-8)</span>
            <span>68mm (2-10)</span>
          </div>

          {/* Result Card */}
          <div className="mt-4 p-4 bg-surface rounded-lg border border-primary/40 flex flex-wrap justify-between items-center gap-3">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-outline-variant block">
                Calculated Mandrel Fineness
              </span>
              <div className="font-headline-sm text-lg font-bold text-on-surface mt-0.5">
                Size {detected.size} <span className="text-xs font-normal text-on-surface-variant">({detected.label})</span>
              </div>
              <span className="text-xs text-tertiary font-medium block mt-0.5">{detected.fit}</span>
            </div>

            {onSelectSize && (
              <button
                onClick={() => {
                  onSelectSize(detected.size);
                  onClose();
                }}
                className="py-2 px-4 bg-primary text-on-primary text-xs uppercase font-bold tracking-wider rounded hover:bg-primary-container hover:text-on-primary-container transition-all border-0 cursor-pointer"
              >
                Apply Size {detected.size}
              </button>
            )}
          </div>
        </div>

        {/* 2 Measurement Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[16px]">straighten</span> Method 1: Existing Bangle
            </h4>
            <ol className="text-xs text-on-surface-variant space-y-1 pl-4 list-decimal leading-relaxed">
              <li>Take a well-fitting rigid circular bangle.</li>
              <li>Place a standard ruler across the <strong>inner hollow center</strong>.</li>
              <li>Measure strictly inside millimeter diameter.</li>
            </ol>
          </div>

          <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[16px]">pan_tool</span> Method 2: Knuckle Span
            </h4>
            <ol className="text-xs text-on-surface-variant space-y-1 pl-4 list-decimal leading-relaxed">
              <li>Fold your hand (thumb touching little finger).</li>
              <li>Wrap a flexible tape measure around the widest knuckle line.</li>
              <li>Match knuckle circumference to chart below.</li>
            </ol>
          </div>
        </div>

        {/* Reference Table */}
        <div className="rounded bg-surface-container-low overflow-hidden border border-outline-variant/30 text-xs">
          <div className="grid grid-cols-4 p-2.5 bg-surface-container font-label-sm text-[10px] uppercase tracking-wider text-on-surface font-semibold">
            <span>Traditional</span>
            <span>Inner Diameter</span>
            <span>Knuckle Circ.</span>
            <span>Standard Fit</span>
          </div>
          {[
            { size: '2-2', dia: '54.0 mm', circ: '170 mm', std: 'Extra Small' },
            { size: '2-4', dia: '57.2 mm', circ: '180 mm', std: 'Small' },
            { size: '2-6', dia: '60.3 mm', circ: '190 mm', std: 'Medium (Standard)', active: true },
            { size: '2-8', dia: '63.5 mm', circ: '200 mm', std: 'Large' },
            { size: '2-10', dia: '66.7 mm', circ: '210 mm', std: 'Extra Large' }
          ].map(row => (
            <div
              key={row.size}
              onClick={() => {
                if (onSelectSize) onSelectSize(row.size);
                onClose();
              }}
              className={`grid grid-cols-4 p-2.5 border-b border-outline-variant/20 hover:bg-surface-container-high transition-colors cursor-pointer ${
                row.active ? 'bg-primary-fixed/20 font-bold' : ''
              }`}
            >
              <span className="font-bold text-on-surface">{row.size}</span>
              <span>{row.dia}</span>
              <span>{row.circ}</span>
              <span className="text-on-surface-variant">{row.std}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
