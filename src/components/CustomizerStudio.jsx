import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { CUSTOMIZER_CONFIG } from '../data/banglesData';
import BangleVisualizer from './BangleVisualizer';

export default function CustomizerStudio({ onAddToCart, onOpenSizeGuide, presetConfig }) {
  // Customization State
  const [setTypeId, setSetTypeId] = useState(presetConfig?.setType || 'pair-kadas');
  const [sizeId, setSizeId] = useState(presetConfig?.size || '2.6');
  const [claspType, setClaspType] = useState('openable');
  const [metalId, setMetalId] = useState(presetConfig?.metal || 'antique-gold');
  const [coreBase, setCoreBase] = useState(presetConfig?.coreBase || 'metal');
  const [colorId, setColorId] = useState(presetConfig?.colorId || 'sindoor-red');
  const [stoneStyleId, setStoneStyleId] = useState(presetConfig?.stoneStyle || 'kundan-polki');
  const [stoneColorId, setStoneColorId] = useState('ruby-emerald');
  const [latkanId, setLatkanId] = useState('pearl-cluster');
  const [monogramInitial, setMonogramInitial] = useState('A');
  const [customEngraving, setCustomEngraving] = useState('');
  const [packagingId, setPackagingId] = useState('velvet-box');

  const [activeTab, setActiveTab] = useState('style'); // 'style', 'metal-color', 'stones', 'charms', 'box'

  // Lookups
  const selectedSet = CUSTOMIZER_CONFIG.setTypes.find(s => s.id === setTypeId) || CUSTOMIZER_CONFIG.setTypes[0];
  const selectedSize = CUSTOMIZER_CONFIG.sizes.find(s => s.id === sizeId) || CUSTOMIZER_CONFIG.sizes[2];
  const selectedMetal = CUSTOMIZER_CONFIG.metals.find(m => m.id === metalId) || CUSTOMIZER_CONFIG.metals[0];
  const selectedColor = CUSTOMIZER_CONFIG.colors.find(c => c.id === colorId) || CUSTOMIZER_CONFIG.colors[0];
  const selectedStoneStyle = CUSTOMIZER_CONFIG.stoneStyles.find(s => s.id === stoneStyleId) || CUSTOMIZER_CONFIG.stoneStyles[0];
  const selectedStoneColor = CUSTOMIZER_CONFIG.stoneColors.find(c => c.id === stoneColorId) || CUSTOMIZER_CONFIG.stoneColors[0];
  const selectedLatkan = CUSTOMIZER_CONFIG.latkans.find(l => l.id === latkanId) || CUSTOMIZER_CONFIG.latkans[0];
  const selectedPackaging = CUSTOMIZER_CONFIG.packaging.find(p => p.id === packagingId) || CUSTOMIZER_CONFIG.packaging[0];

  // Dynamic Price Calculation (in USD)
  const totalPrice = useMemo(() => {
    const base = selectedSet.basePrice;
    const metalAdd = selectedMetal.priceAdd;
    const stoneAdd = selectedStoneStyle.priceAdd * (selectedSet.multiplier >= 2 ? 1.5 : 1);
    const latkanAdd = selectedLatkan.priceAdd;
    const engravingAdd = customEngraving.trim() ? 250 : 0;
    const packagingAdd = selectedPackaging.priceAdd;
    const claspAdd = claspType === 'openable' ? 300 : 0;

    return Math.round(base + metalAdd + stoneAdd + latkanAdd + engravingAdd + packagingAdd + claspAdd);
  }, [selectedSet, selectedMetal, selectedStoneStyle, selectedLatkan, customEngraving, selectedPackaging, claspType]);

  const visualConfig = {
    setType: setTypeId,
    metal: metalId,
    metalName: selectedMetal.name,
    coreBase: coreBase,
    colorHex: selectedColor.hex,
    colorName: selectedColor.name,
    stoneStyle: stoneStyleId,
    stoneName: selectedStoneStyle.name,
    stoneColorHex1: selectedStoneColor.hex1,
    stoneColorHex2: selectedStoneColor.hex2,
    latkan: latkanId,
    latkanName: selectedLatkan.name
  };

  const handleAddToCart = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c5a059', '#775a19', '#fbf9f6', '#3e6752']
    });

    const customItem = {
      id: `custom-${Date.now()}`,
      isCustom: true,
      name: `Bespoke ${selectedSet.name}`,
      price: totalPrice,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvVG9U6tJb3fH1b2Rh0dkK7C_Pr4TTmuIj3VeBqkv6-RLop5r3-3jFeNrvXD8BxCMI5dl3sRDdQ_VJQMwk34dPhnZ6JLxk9c1-xDg5_iIi5KJWCZ79bruPZFVN6OWUuGQ-m-cgOrjHHqk4g1diKbbqPSmGYge2cpi5pWRC1U1DVbOvzc8_Jmc_kzYWl6WMFyJZrcPrWP3azlgYcdkG-Oeml7GALziLQh3wNjn0QjAA',
      quantity: 1,
      specs: {
        setTypeName: selectedSet.name,
        bangleCount: selectedSet.bangleCount,
        size: selectedSize.label,
        innerDia: `${selectedSize.innerDiaMm} mm`,
        claspType: claspType === 'openable' ? 'Threaded Screw Clasp (Openable)' : 'Seamless Slip-On',
        metal: selectedMetal.name,
        coreBase: coreBase === 'silk' ? `Silk Resham (${selectedColor.name})` : coreBase === 'velvet' ? `Velvet (${selectedColor.name})` : 'Solid Carved Gold',
        stoneStyle: selectedStoneStyle.name,
        stoneColor: selectedStoneColor.name,
        latkan: selectedLatkan.name,
        monogram: latkanId === 'monogram-tag' ? monogramInitial : null,
        engraving: customEngraving.trim() || null,
        packaging: selectedPackaging.name
      }
    };

    onAddToCart(customItem);
  };

  const handleWhatsAppOrder = () => {
    const shopPhoneNumber = "919876543210";
    const message = `👑 *AURA & KARAT BESPOKE ATELIER COMMISSION* 👑
---------------------------------------------
✨ *Masterwork:* Custom ${selectedSet.name}
📏 *Mandrel Size:* ${selectedSize.label} (${selectedSize.innerDiaMm}mm)
🔒 *Clasp Mechanism:* ${claspType === 'openable' ? 'Concealed Screw Clasp' : 'Seamless Slip-on'}
🥇 *Precious Alloy:* ${selectedMetal.name}
🧵 *Base Contour:* ${coreBase === 'silk' ? `Hand-Wound Silk (${selectedColor.name})` : coreBase === 'velvet' ? `Velvet (${selectedColor.name})` : 'Solid Gold Skeletal Chassis'}
💎 *Stone Inlay:* ${selectedStoneStyle.name} (${selectedStoneColor.name})
📿 *Latkan/Charm:* ${selectedLatkan.name} ${latkanId === 'monogram-tag' ? `[Monogram: "${monogramInitial}"]` : ''}
✍️ *Inner Inscription:* ${customEngraving.trim() ? customEngraving : 'None'}
🎁 *Presentation Chest:* ${selectedPackaging.name}
---------------------------------------------
💰 *Valuation Estimate:* $${totalPrice.toLocaleString()} USD
_Please coordinate private gemologist consultation & armored delivery protocol._`;

    window.open(`https://wa.me/${shopPhoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="py-12 bg-surface-container-low/50 rounded-2xl border border-outline-variant/30 my-8 p-6 lg:p-10 shadow-sm" id="custom-studio">
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-primary font-label-sm text-label-sm uppercase tracking-widest border border-outline-variant/30 mb-3">
            <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
            Bespoke Haute Joaillerie Atelier
          </span>
          <h2 className="font-headline-lg text-3xl lg:text-4xl text-on-surface tracking-tight">
            Design Your <span className="italic font-headline-lg text-primary">Signature Bangle</span>
          </h2>
          <p className="font-body-md text-on-surface-variant text-sm mt-2 leading-relaxed">
            Calibrate every parameter to your wrist proportion: select sovereign gold fineness, untreated syndicate polki diamonds, 
            royal Persian champlevé enamels, and custom heirloom cipher engravings.
          </p>
        </div>

        {/* 2-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Visualizer & Price Card */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 space-y-5">
            <BangleVisualizer
              config={visualConfig}
              selectedSize={selectedSize}
              monogramInitial={monogramInitial}
              customEngraving={customEngraving}
            />

            {/* Price & Action Box */}
            <div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant/30">
              <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-outline-variant/20">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant block">
                    Bespoke Commission Estimate
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-headline-md text-3xl font-bold text-on-surface">
                      ${totalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-on-surface-variant uppercase">USD (Insured Transit Incl.)</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-label-sm uppercase tracking-widest text-tertiary font-semibold">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span> Bench Ready
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-5 rounded bg-on-surface text-surface hover:bg-primary transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm border-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  Acquire Bespoke Commission
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="py-3.5 px-5 rounded bg-[#25d366] text-white hover:bg-[#20bd5a] transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm border-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Direct Order Via WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Tabs and Options */}
          <div className="lg:col-span-6 bg-surface rounded-xl p-6 lg:p-8 shadow-sm border border-outline-variant/30">
            {/* Step Navigation Tabs */}
            <div className="flex border-b border-outline-variant/30 gap-4 overflow-x-auto pb-2 mb-6">
              {[
                { id: 'style', label: '1. Set & Size' },
                { id: 'metal-color', label: '2. Metal & Alloy' },
                { id: 'stones', label: '3. Stones & Gem' },
                { id: 'charms', label: '4. Charms & Inscription' },
                { id: 'box', label: '5. Presentation Chest' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs uppercase tracking-wider font-semibold pb-2 border-b-2 transition-all bg-transparent cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Set Type & Size */}
            {activeTab === 'style' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline-sm text-lg text-on-surface">Choose Bangle Architecture</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Select from a solitary statement kada, an auspicious royal pair, or a ceremonial bridal chooda suite.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOMIZER_CONFIG.setTypes.map(s => (
                    <div
                      key={s.id}
                      onClick={() => setSetTypeId(s.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border ${
                        setTypeId === s.id ? 'bg-primary-fixed/20 border-primary ring-1 ring-primary' : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-xs text-on-surface uppercase tracking-wider">{s.name}</span>
                        {setTypeId === s.id && <span className="material-symbols-outlined text-primary text-sm">check_circle</span>}
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1">{s.description}</p>
                      <span className="text-xs font-bold text-primary block mt-2">Base: ${s.basePrice.toLocaleString()} USD</span>
                    </div>
                  ))}
                </div>

                {/* Mandrel Sizing */}
                <div className="pt-4 border-t border-outline-variant/20">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface">Wrist Mandrel Size</label>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-primary hover:underline text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[13px]">straighten</span> Mandrel Calibration Guide
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {CUSTOMIZER_CONFIG.sizes.map(sz => (
                      <button
                        key={sz.id}
                        onClick={() => setSizeId(sz.id)}
                        className={`py-2 px-1 rounded flex flex-col items-center border transition-all cursor-pointer ${
                          sizeId === sz.id ? 'bg-on-surface text-surface ring-1 ring-primary border-transparent' : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                        }`}
                      >
                        <span className="text-xs font-bold">{sz.id}</span>
                        <span className="text-[10px] opacity-75">{sz.innerDiaMm}mm</span>
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-on-surface-variant block mt-1.5">
                    Selected Mandrel: <strong>{selectedSize.label}</strong> ({selectedSize.innerDiaMm} mm internal diameter)
                  </span>
                </div>

                {/* Clasp Mechanism */}
                <div className="pt-4 border-t border-outline-variant/20">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-2">Wearing Mechanism</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setClaspType('openable')}
                      className={`p-3 rounded-lg border cursor-pointer ${
                        claspType === 'openable' ? 'bg-primary-fixed/20 border-primary ring-1 ring-primary' : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      <span className="text-xs font-bold text-on-surface block">Threaded Screw Clasp (+$300)</span>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Hidden precision gold hinge. Opens smoothly with screw pin.</p>
                    </div>

                    <div
                      onClick={() => setClaspType('slip-on')}
                      className={`p-3 rounded-lg border cursor-pointer ${
                        claspType === 'slip-on' ? 'bg-primary-fixed/20 border-primary ring-1 ring-primary' : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      <span className="text-xs font-bold text-on-surface block">Seamless Slip-On</span>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Continuous circular ring designed to slide over folded knuckles.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <button
                    onClick={() => setActiveTab('metal-color')}
                    className="py-2.5 px-5 bg-on-surface text-surface rounded text-xs uppercase font-bold tracking-wider hover:bg-primary transition-all border-0 cursor-pointer"
                  >
                    Next: Metal &amp; Alloy →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Metal & Core Base */}
            {activeTab === 'metal-color' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline-sm text-lg text-on-surface">Precious Metal Alloy &amp; Core</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Select your precious metal fineness and inner sleeve craftsmanship.</p>
                </div>

                {/* Metals */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {CUSTOMIZER_CONFIG.metals.map(m => (
                    <div
                      key={m.id}
                      onClick={() => setMetalId(m.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        metalId === m.id ? 'bg-primary-fixed/20 border-primary ring-1 ring-primary' : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="size-3.5 rounded-full border border-black/20" style={{ background: m.hex }} />
                        <span className="text-xs font-bold text-on-surface">{m.name.split(' ')[0]}</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant block">{m.description}</span>
                    </div>
                  ))}
                </div>

                {/* Core Base */}
                <div className="pt-4 border-t border-outline-variant/20">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-2">Core Sleeve Material</label>
                  <div className="grid grid-cols-3 gap-2">
                    {CUSTOMIZER_CONFIG.coreBases.map(cb => (
                      <div
                        key={cb.id}
                        onClick={() => setCoreBase(cb.id)}
                        className={`p-2.5 rounded border cursor-pointer text-center ${
                          coreBase === cb.id ? 'bg-primary-fixed/20 border-primary font-bold' : 'bg-surface-container-low border-outline-variant/30'
                        }`}
                      >
                        <span className="text-xs block">{cb.name.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="pt-4 border-t border-outline-variant/20">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-2">
                    Accent Color: <strong>{selectedColor.name}</strong>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CUSTOMIZER_CONFIG.colors.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setColorId(c.id)}
                        title={c.name}
                        className={`size-8 rounded-full border transition-all cursor-pointer ${
                          colorId === c.id ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-105'
                        }`}
                        style={{ background: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button onClick={() => setActiveTab('style')} className="text-xs uppercase font-bold text-outline hover:text-on-surface bg-transparent border-0 cursor-pointer">
                    ← Back
                  </button>
                  <button onClick={() => setActiveTab('stones')} className="py-2.5 px-5 bg-on-surface text-surface rounded text-xs uppercase font-bold tracking-wider hover:bg-primary transition-all border-0 cursor-pointer">
                    Next: Stones &amp; Gem →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Stones & Workmanship */}
            {activeTab === 'stones' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline-sm text-lg text-on-surface">Gemstone Embellishment &amp; Setting</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Authentic Jaipur Jadau Kundan, Austrian zircon pavé, and Colombian emerald drops.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOMIZER_CONFIG.stoneStyles.map(st => (
                    <div
                      key={st.id}
                      onClick={() => setStoneStyleId(st.id)}
                      className={`p-3.5 rounded-lg border cursor-pointer ${
                        stoneStyleId === st.id ? 'bg-primary-fixed/20 border-primary ring-1 ring-primary' : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-on-surface">{st.name}</span>
                        <span className="text-[11px] text-primary font-semibold">+${st.priceAdd}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1">{st.description}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button onClick={() => setActiveTab('metal-color')} className="text-xs uppercase font-bold text-outline hover:text-on-surface bg-transparent border-0 cursor-pointer">
                    ← Back
                  </button>
                  <button onClick={() => setActiveTab('charms')} className="py-2.5 px-5 bg-on-surface text-surface rounded text-xs uppercase font-bold tracking-wider hover:bg-primary transition-all border-0 cursor-pointer">
                    Next: Charms &amp; Cipher →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: Charms & Inscription */}
            {activeTab === 'charms' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline-sm text-lg text-on-surface">Hanging Latkans &amp; Secret Inscription</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Personalize your kada with hanging gold jhumki drops, pearl tassels, or a custom monogram cipher.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CUSTOMIZER_CONFIG.latkans.map(lk => (
                    <div
                      key={lk.id}
                      onClick={() => setLatkanId(lk.id)}
                      className={`p-3 rounded border cursor-pointer ${
                        latkanId === lk.id ? 'bg-primary-fixed/20 border-primary ring-1 ring-primary' : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-on-surface">{lk.name}</span>
                        {lk.priceAdd > 0 && <span className="text-[11px] text-primary font-semibold">+${lk.priceAdd}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {latkanId === 'monogram-tag' && (
                  <div className="p-3 bg-surface-container rounded-lg border border-primary/30">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1">Laser-Engraved Monogram Initial:</label>
                    <input
                      type="text"
                      maxLength={1}
                      value={monogramInitial}
                      onChange={e => setMonogramInitial(e.target.value.toUpperCase())}
                      className="w-14 p-2 text-center text-lg font-bold rounded bg-surface border border-outline-variant/50 uppercase"
                    />
                  </div>
                )}

                {/* Inner Contour Inscription */}
                <div className="pt-4 border-t border-outline-variant/20">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1">
                    Secret Inner Rim Inscription (+₹250 / $30):
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="e.g. AURA • MMXXIV • FOREVER"
                    value={customEngraving}
                    onChange={e => setCustomEngraving(e.target.value)}
                    className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/40 text-xs uppercase tracking-widest"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button onClick={() => setActiveTab('stones')} className="text-xs uppercase font-bold text-outline hover:text-on-surface bg-transparent border-0 cursor-pointer">
                    ← Back
                  </button>
                  <button onClick={() => setActiveTab('box')} className="py-2.5 px-5 bg-on-surface text-surface rounded text-xs uppercase font-bold tracking-wider hover:bg-primary transition-all border-0 cursor-pointer">
                    Next: Presentation Chest →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: Packaging */}
            {activeTab === 'box' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline-sm text-lg text-on-surface">Presentation Keepsake Chest</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Each masterpiece arrives in a luxury velvet or carved teakwood chest with assay documentation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CUSTOMIZER_CONFIG.packaging.map(pkg => (
                    <div
                      key={pkg.id}
                      onClick={() => setPackagingId(pkg.id)}
                      className={`p-3 rounded-lg border cursor-pointer ${
                        packagingId === pkg.id ? 'bg-primary-fixed/20 border-primary ring-1 ring-primary' : 'bg-surface-container-low border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      <span className="text-xs font-bold text-on-surface block">{pkg.name}</span>
                      <p className="text-[10px] text-on-surface-variant mt-1">{pkg.description}</p>
                    </div>
                  ))}
                </div>

                {/* Summary of Selection */}
                <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30 text-xs space-y-1.5 text-on-surface">
                  <div className="font-bold text-primary uppercase tracking-wider mb-2">Bespoke Dossier Summary:</div>
                  <p>👑 <strong>Style:</strong> {selectedSet.name} ({selectedSet.bangleCount} Bangles)</p>
                  <p>📏 <strong>Mandrel:</strong> {selectedSize.label} ({selectedSize.innerDiaMm}mm) • {claspType === 'openable' ? 'Threaded Screw Clasp' : 'Slip-on'}</p>
                  <p>🥇 <strong>Precious Alloy:</strong> {selectedMetal.name}</p>
                  <p>💎 <strong>Gemstone Setting:</strong> {selectedStoneStyle.name}</p>
                  {customEngraving.trim() && <p>✍️ <strong>Inner Cipher:</strong> "{customEngraving}"</p>}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button onClick={() => setActiveTab('charms')} className="text-xs uppercase font-bold text-outline hover:text-on-surface bg-transparent border-0 cursor-pointer">
                    ← Back
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-6 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-xs font-bold uppercase tracking-wider rounded shadow transition-all border-0 cursor-pointer"
                  >
                    Acquire Masterpiece (${totalPrice.toLocaleString()} USD)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
