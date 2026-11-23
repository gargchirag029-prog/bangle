import React, { useState } from 'react';

export default function ProductQuickView({ product, onClose, onAddToCart, onCustomize, onToggleWishlist, isWishlisted, onOpenSizeGuide, formatPrice }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : '2-6');
  const [selectedQty, setSelectedQty] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      quantity: selectedQty,
      image: product.image,
      specs: {
        size: selectedSize,
        metal: product.metal,
        clasp: product.clasp
      }
    });
    onClose();
  };

  const handleWhatsApp = () => {
    const text = `Hello Aura & Karat Concierge, I would like to inquire about:
💍 *${product.name}*
📏 Size: ${selectedSize}
💰 Price: $${product.price} USD
Link: ${window.location.origin}/#${product.id}

Please confirm salon availability and vault dispatch protocol.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-container">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <span className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] tracking-[0.14em] font-semibold uppercase rounded shadow-sm ${product.badgeClass || 'bg-primary text-on-primary'}`}>
              {product.tag}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-label-sm uppercase tracking-widest text-primary font-semibold block">
                Atelier Masterwork
              </span>
              <h3 className="font-headline-sm text-xl text-on-surface mt-1 leading-snug">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-headline-md text-2xl font-bold text-on-surface">
                  {formatPrice ? formatPrice(product.price) : `$${product.price}`}
                </span>
                <span className="text-xs text-on-surface-variant uppercase tracking-wider font-mono">
                  {product.weight || '22K Sovereign'}
                </span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            {/* Sizing */}
            <div className="pt-2 border-t border-outline-variant/20">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface">Mandrel Size</label>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-primary hover:underline text-[11px] uppercase tracking-wider font-semibold bg-transparent border-0 cursor-pointer"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex gap-2">
                {['2-2', '2-4', '2-6', '2-8', '2-10'].map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-1 px-2.5 rounded text-xs font-bold transition-all border cursor-pointer ${
                      selectedSize === sz ? 'bg-on-surface text-surface ring-1 ring-primary border-transparent' : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAdd}
                className="w-full py-3 bg-on-surface text-surface hover:bg-primary transition-all text-xs uppercase font-bold tracking-wider rounded border-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                Acquire into Bag
              </button>

              <button
                onClick={() => {
                  onClose();
                  onCustomize(product);
                }}
                className="w-full py-2.5 bg-surface-container text-on-surface hover:bg-surface-container-high transition-all text-xs uppercase font-bold tracking-wider rounded border border-outline-variant/30 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">auto_fix_high</span>
                Customize in 3D Studio
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-2 bg-[#25d366] text-white hover:bg-[#20bd5a] transition-all text-xs uppercase font-bold tracking-wider rounded border-0 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                WhatsApp Atelier Concierge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
