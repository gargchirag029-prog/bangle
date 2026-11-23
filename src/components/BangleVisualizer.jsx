import React, { useState } from 'react';

export default function BangleVisualizer({ config, selectedSize, monogramInitial, customEngraving }) {
  const [viewMode, setViewMode] = useState('stack'); // 'stack' or 'front'
  const [sparkleActive, setSparkleActive] = useState(true);
  const [isPlayingChime, setIsPlayingChime] = useState(false);

  // Metal colors lookup in Haute Joaillerie tones
  const metalColorMap = {
    'antique-gold': { main: '#c5a059', light: '#ffecb3', dark: '#775a19', shadow: '#3d2e0b' },
    'yellow-gold': { main: '#f3c642', light: '#fff4b3', dark: '#9c7308', shadow: '#594002' },
    'rose-gold': { main: '#d98270', light: '#fed9d1', dark: '#8f4738', shadow: '#54261d' },
    'oxidized-silver': { main: '#a4a8ad', light: '#e5e8ed', dark: '#505459', shadow: '#282b2e' },
    'temple-copper': { main: '#b86a34', light: '#ffcca3', dark: '#6e3612', shadow: '#401d07' },
    'platinum': { main: '#d5d8dc', light: '#ffffff', dark: '#808b96', shadow: '#3e444a' }
  };

  const currentMetal = metalColorMap[config.metal] || metalColorMap['antique-gold'];
  const threadColor = config.colorHex || '#775a19';
  const stoneColor1 = config.stoneColorHex1 || '#9e1022';
  const stoneColor2 = config.stoneColorHex2 || '#0b5b3b';

  // Number of bangles in stack depending on setType
  const stackLayers = {
    'single-kada': 1,
    'pair-kadas': 2,
    'festive-12': 8,
    'bridal-chooda': 14
  }[config.setType] || 4;

  const triggerChime = () => {
    setIsPlayingChime(true);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const harmonics = [1046.5, 1318.51, 1567.98, 2093.00, 2637.02];
        harmonics.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.08 + 1.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.08);
          osc.stop(ctx.currentTime + i * 0.08 + 1.4);
        });
      }
    } catch (e) {
      console.log('Audio Context', e);
    }
    setTimeout(() => setIsPlayingChime(false), 2200);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#261f14] via-[#17130b] to-[#0c0a06] p-6 text-surface shadow-2xl border border-primary/40">
      {/* Decorative luxury atelier corner hallmarks */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/60" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary/60" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary/60" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/60" />

      {/* Visualizer Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 text-primary-fixed-dim text-[10px] font-semibold uppercase tracking-widest border border-primary/30">
            <span className="material-symbols-outlined text-[13px]">auto_fix_high</span>
            Atelier 3D Canvas
          </span>
          <div className="text-primary-fixed text-xs font-semibold uppercase tracking-wider mt-1.5 font-headline-sm">
            Mandrel Size: {selectedSize.id || selectedSize.label} • {selectedSize.innerDiaMm || selectedSize.mm || '60.3 mm'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Acoustic Chime Button */}
          <button
            onClick={triggerChime}
            title="Listen to the Royal Bangle Chime (Khanak)"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all border-0 cursor-pointer ${
              isPlayingChime ? 'bg-primary text-on-primary' : 'bg-surface/10 text-primary-fixed hover:bg-surface/20'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">music_note</span>
            <span>Acoustic Chime</span>
            {isPlayingChime && (
              <div className="flex items-end gap-0.5 ml-1 h-3">
                <span className="w-0.5 bg-primary-fixed chime-bar-1" />
                <span className="w-0.5 bg-primary-fixed chime-bar-2" />
                <span className="w-0.5 bg-primary-fixed chime-bar-3" />
                <span className="w-0.5 bg-primary-fixed chime-bar-4" />
              </div>
            )}
          </button>

          {/* Perspective View Switcher */}
          <button
            onClick={() => setViewMode(viewMode === 'stack' ? 'front' : 'stack')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/10 text-primary-fixed hover:bg-surface/20 text-[11px] font-semibold uppercase tracking-wider transition-all border-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">visibility</span>
            <span>{viewMode === 'stack' ? 'Front Ring' : 'Stack View'}</span>
          </button>

          {/* Shimmer Toggle */}
          <button
            onClick={() => setSparkleActive(!sparkleActive)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all border-0 cursor-pointer ${
              sparkleActive ? 'bg-primary/30 text-primary-fixed border border-primary/50' : 'bg-surface/10 text-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">diamond</span>
            <span>{sparkleActive ? 'Shimmer' : 'Static'}</span>
          </button>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="flex items-center justify-center min-h-[320px] relative">
        {/* Subtle royal medallion background watermark */}
        <div className="pointer-events-none absolute w-64 h-64 rounded-full border border-dashed border-primary/10 animate-spin" style={{ animationDuration: '60s' }} />

        <svg
          viewBox="0 0 500 420"
          className="w-full max-w-[430px] h-auto overflow-visible filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
        >
          <defs>
            {/* Dynamic Sovereign Metal Gradient */}
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentMetal.light} />
              <stop offset="25%" stopColor={currentMetal.main} />
              <stop offset="50%" stopColor={currentMetal.dark} />
              <stop offset="75%" stopColor={currentMetal.light} />
              <stop offset="100%" stopColor={currentMetal.shadow} />
            </linearGradient>

            {/* Radial Metal for Latkan Medallion Coin */}
            <radialGradient id="metalCoin" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor={currentMetal.light} />
              <stop offset="60%" stopColor={currentMetal.main} />
              <stop offset="100%" stopColor={currentMetal.dark} />
            </radialGradient>

            {/* Pearl Lustre Gradient */}
            <radialGradient id="pearlGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f7f2ea" />
              <stop offset="85%" stopColor="#dcd3c2" />
              <stop offset="100%" stopColor="#968972" />
            </radialGradient>

            {/* Uncut Polki Diamond with Silver Foil Foil-backed Daak */}
            <radialGradient id="polkiDaakGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fcf9ec" />
              <stop offset="80%" stopColor="#d5c898" />
              <stop offset="100%" stopColor="#7a6728" />
            </radialGradient>

            {/* Gemstone Imperial Rubies & Emeralds */}
            <radialGradient id="gemGrad1" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="45%" stopColor={stoneColor1} />
              <stop offset="100%" stopColor="#1a0206" />
            </radialGradient>

            <radialGradient id="gemGrad2" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="45%" stopColor={stoneColor2} />
              <stop offset="100%" stopColor="#02140a" />
            </radialGradient>

            {/* Soft Shadow */}
            <filter id="shadowFilter" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.55" />
            </filter>

            {/* Shimmer Flare */}
            <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {viewMode === 'stack' ? (
            /* STACK PERSPECTIVE VIEW */
            <g transform="translate(250, 190)">
              {Array.from({ length: stackLayers }).map((_, idx) => {
                const total = stackLayers;
                const yOffset = (idx - total / 2) * 16;
                const isCenterpiece = idx === 0 || idx === total - 1 || idx === Math.floor(total / 2);
                const rx = 160 + (isCenterpiece ? 12 : 0);
                const ry = 48 + (isCenterpiece ? 4 : 0);
                const strokeWidth = isCenterpiece ? 18 : 10;
                const isSilk = config.coreBase === 'silk' && !isCenterpiece;
                const isVelvet = config.coreBase === 'velvet' && !isCenterpiece;

                return (
                  <g key={idx} transform={`translate(0, ${yOffset})`}>
                    {/* Shadow underneath */}
                    <ellipse
                      cx="0"
                      cy="4"
                      rx={rx}
                      ry={ry}
                      fill="none"
                      stroke="rgba(0,0,0,0.35)"
                      strokeWidth={strokeWidth}
                    />

                    {/* Base Rim */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={rx}
                      ry={ry}
                      fill="none"
                      stroke={isSilk || isVelvet ? threadColor : "url(#metalGrad)"}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                    />

                    {/* Gold Borders on Fabric layers */}
                    {(isSilk || isVelvet) && (
                      <>
                        <ellipse cx="0" cy="0" rx={rx + strokeWidth / 2 - 1} ry={ry + 2} fill="none" stroke="url(#metalGrad)" strokeWidth="1.8" />
                        <ellipse cx="0" cy="0" rx={rx - strokeWidth / 2 + 1} ry={ry - 2} fill="none" stroke="url(#metalGrad)" strokeWidth="1.8" />
                      </>
                    )}

                    {/* Stones on Centerpiece Kada */}
                    {isCenterpiece && (
                      <g>
                        {[-110, -80, -50, -20, 10, 40, 70, 100].map((deg, sIdx) => {
                          const rad = (deg * Math.PI) / 180;
                          const sx = rx * Math.cos(rad);
                          const sy = ry * Math.sin(rad);
                          const isAlt = sIdx % 2 === 0;

                          if (config.stoneStyle === 'pearl-moti') {
                            return (
                              <circle
                                key={sIdx}
                                cx={sx}
                                cy={sy}
                                r="5.5"
                                fill="url(#pearlGrad)"
                                stroke="url(#metalGrad)"
                                strokeWidth="1"
                                filter="url(#shadowFilter)"
                              />
                            );
                          } else if (config.stoneStyle === 'zircon-diamonds') {
                            return (
                              <g key={sIdx}>
                                <circle cx={sx} cy={sy} r="4.5" fill="#ffffff" stroke={currentMetal.light} strokeWidth="1.2" />
                                {sparkleActive && sIdx % 3 === 0 && (
                                  <path
                                    d={`M ${sx} ${sy - 6} L ${sx} ${sy + 6} M ${sx - 6} ${sy} L ${sx + 6} ${sy}`}
                                    stroke="#fff"
                                    strokeWidth="1.2"
                                    opacity="0.9"
                                    filter="url(#glowFilter)"
                                  />
                                )}
                              </g>
                            );
                          } else if (config.stoneStyle === 'mirror-work') {
                            return (
                              <g key={sIdx}>
                                <circle cx={sx} cy={sy} r="6" fill="#e0f2fe" stroke="url(#metalGrad)" strokeWidth="1.5" />
                                <ellipse cx={sx - 1.5} cy={sy - 1.5} rx="2" ry="1" fill="#ffffff" opacity="0.8" />
                              </g>
                            );
                          } else {
                            // Default Kundan Polki Jadau
                            return (
                              <g key={sIdx}>
                                <rect
                                  x={sx - 5.5}
                                  y={sy - 4.5}
                                  width="11"
                                  height="9"
                                  rx="2"
                                  fill={isAlt ? "url(#gemGrad1)" : "url(#gemGrad2)"}
                                  stroke="url(#metalGrad)"
                                  strokeWidth="1.4"
                                  transform={`rotate(${deg / 3}, ${sx}, ${sy})`}
                                />
                                <circle cx={sx - 1} cy={sy - 1} r="1.5" fill="#ffffff" opacity="0.8" />
                              </g>
                            );
                          }
                        })}
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Hanging Latkans at bottom */}
              {config.latkan !== 'none' && (
                <g transform="translate(0, 65)">
                  <circle cx="0" cy="0" r="5" fill="none" stroke="url(#metalGrad)" strokeWidth="2.5" />
                  <line x1="0" y1="5" x2="0" y2="25" stroke="url(#metalGrad)" strokeWidth="2" />

                  {config.latkan === 'pearl-cluster' && (
                    <g transform="translate(0, 25)">
                      <circle cx="0" cy="0" r="4" fill="url(#pearlGrad)" />
                      <circle cx="-10" cy="18" r="4" fill="url(#pearlGrad)" />
                      <circle cx="-5" cy="28" r="4.5" fill="url(#pearlGrad)" />
                      <circle cx="0" cy="38" r="5.5" fill="url(#pearlGrad)" />
                      <circle cx="5" cy="28" r="4.5" fill="url(#pearlGrad)" />
                      <circle cx="10" cy="18" r="4" fill="url(#pearlGrad)" />
                      <circle cx="0" cy="46" r="2.5" fill="url(#metalGrad)" />
                    </g>
                  )}

                  {config.latkan === 'golden-jhumka' && (
                    <g transform="translate(0, 25)">
                      <path d="M -16 16 C -16 0, 16 0, 16 16 Z" fill="url(#metalGrad)" stroke={currentMetal.dark} strokeWidth="1" filter="url(#shadowFilter)" />
                      <line x1="-16" y1="16" x2="16" y2="16" stroke={currentMetal.light} strokeWidth="1.5" />
                      {[-12, -6, 0, 6, 12].map((xPos, pIdx) => (
                        <g key={pIdx}>
                          <line x1={xPos} y1="16" x2={xPos} y2="24" stroke="url(#metalGrad)" strokeWidth="1" />
                          <circle cx={xPos} cy="26" r="2.5" fill="url(#pearlGrad)" />
                        </g>
                      ))}
                    </g>
                  )}

                  {config.latkan === 'monogram-tag' && (
                    <g transform="translate(0, 25)">
                      <circle cx="0" cy="18" r="18" fill="url(#metalCoin)" stroke={currentMetal.light} strokeWidth="2" filter="url(#shadowFilter)" />
                      <circle cx="0" cy="18" r="15" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" strokeDasharray="2,2" />
                      <text x="0" y="24" textAnchor="middle" fill="#3a2806" fontSize="15" fontWeight="bold" fontFamily="serif">
                        {monogramInitial || 'A'}
                      </text>
                    </g>
                  )}

                  {config.latkan === 'ghungroo-bells' && (
                    <g transform="translate(0, 25)">
                      {[
                        { x: -12, y: 10 },
                        { x: -5, y: 22 },
                        { x: 0, y: 12 },
                        { x: 6, y: 24 },
                        { x: 12, y: 14 }
                      ].map((pos, bIdx) => (
                        <circle key={bIdx} cx={pos.x} cy={pos.y} r="5" fill="url(#metalGrad)" stroke={currentMetal.shadow} strokeWidth="1" />
                      ))}
                    </g>
                  )}
                </g>
              )}
            </g>
          ) : (
            /* FRONT FACE RING VIEW */
            <g transform="translate(250, 200)">
              <circle cx="0" cy="0" r="130" fill="none" stroke="url(#metalGrad)" strokeWidth="28" filter="url(#shadowFilter)" />

              {(config.coreBase === 'silk' || config.coreBase === 'velvet') && (
                <circle cx="0" cy="0" r="130" fill="none" stroke={threadColor} strokeWidth="20" />
              )}

              <circle cx="0" cy="0" r="114" fill="none" stroke="url(#metalGrad)" strokeWidth="3" />
              <circle cx="0" cy="0" r="145" fill="none" stroke="url(#metalGrad)" strokeWidth="3" />
              <circle cx="0" cy="0" r="110" fill="rgba(14, 11, 7, 0.95)" />

              <line x1="-100" y1="0" x2="100" y2="0" stroke="rgba(197, 160, 89, 0.35)" strokeDasharray="4,4" />
              <text x="0" y="-8" fill="#ffecb3" fontSize="11" textAnchor="middle" fontFamily="serif" letterSpacing="0.08em">
                INNER Ø {selectedSize.innerDiaMm || selectedSize.mm || '60.3'} mm
              </text>
              <text x="0" y="16" fill="rgba(255, 236, 179, 0.75)" fontSize="10" textAnchor="middle" textTransform="uppercase">
                MANDREL: {selectedSize.id || selectedSize.label}
              </text>

              {/* Radial Stones */}
              {Array.from({ length: 16 }).map((_, stIdx) => {
                const angle = (stIdx * 360) / 16;
                const rad = (angle * Math.PI) / 180;
                const sx = 130 * Math.cos(rad);
                const sy = 130 * Math.sin(rad);
                const isAlt = stIdx % 2 === 0;

                return (
                  <g key={stIdx} transform={`rotate(${angle}, ${sx}, ${sy})`}>
                    <rect
                      x={sx - 5.5}
                      y={sy - 4.5}
                      width="11"
                      height="9"
                      rx="2"
                      fill={isAlt ? "url(#gemGrad1)" : "url(#gemGrad2)"}
                      stroke="url(#metalGrad)"
                      strokeWidth="1.2"
                    />
                  </g>
                );
              })}

              {/* Threaded Screw Clasp Indicator */}
              <g transform="translate(142, 0)">
                <circle cx="0" cy="0" r="5" fill="url(#metalGrad)" stroke="#111" strokeWidth="1" />
                <line x1="-3" y1="0" x2="3" y2="0" stroke="#111" strokeWidth="1.5" />
              </g>

              {customEngraving && (
                <text x="0" y="85" textAnchor="middle" fill="#ffecb3" fontSize="10" fontFamily="serif" letterSpacing="1px">
                  "{customEngraving}"
                </text>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Visualizer Specs Footer */}
      <div className="mt-3 p-3 bg-surface/5 rounded-xl border border-primary/20 flex flex-wrap items-center justify-between gap-2 text-xs text-primary-fixed">
        <div className="flex items-center gap-2">
          <span className="text-outline-variant text-[11px] uppercase tracking-wider">Finish:</span>
          <strong>{config.metalName}</strong>
          <span className="text-outline-variant">•</span>
          <span className="text-outline-variant text-[11px] uppercase tracking-wider">Core:</span>
          <strong>{config.coreBase.toUpperCase()}</strong>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-outline-variant text-[11px] uppercase tracking-wider">Work:</span>
          <strong>{config.stoneName}</strong>
          {config.latkan !== 'none' && (
            <>
              <span className="text-outline-variant">•</span>
              <span className="text-outline-variant text-[11px] uppercase tracking-wider">Charm:</span>
              <strong>{config.latkanName}</strong>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
