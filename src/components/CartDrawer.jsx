import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  Tag,
  ArrowRight,
  CheckCircle,
  Gift
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Customer form details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');

  if (!isOpen) return null;

  // Totals calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingThreshold = 2999;
  const shipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 199;
  const grandTotal = subtotal - discountAmount + shipping;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ROYAL10') {
      setDiscountPercent(10);
      setPromoMessage('✨ 10% Royal Welcome Discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'BRIDAL15') {
      setDiscountPercent(15);
      setPromoMessage('💍 15% Bridal Atelier Discount applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try ROYAL10');
    }
  };

  // WhatsApp Order Flow
  const handleWhatsAppCheckout = () => {
    const shopPhoneNumber = "919876543210";

    let message = `👑 *ORDER FROM KANGAN MANDIR WEBSITE* 👑\n`;
    message += `--------------------------------------\n`;

    if (customerName) message += `👤 *Customer:* ${customerName}\n`;
    if (customerPhone) message += `📞 *Phone:* ${customerPhone}\n`;
    if (customerCity) message += `📍 *Destination:* ${customerCity} ${customerPincode ? `(${customerPincode})` : ''}\n`;
    message += `--------------------------------------\n`;
    message += `🛍️ *ORDER ITEMS:*\n\n`;

    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}* (Qty: ${item.quantity})\n`;
      message += `   💰 Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
      if (item.specs) {
        if (item.specs.size) message += `   📏 Size: ${item.specs.size}\n`;
        if (item.specs.metal) message += `   🥇 Metal: ${item.specs.metal}\n`;
        if (item.specs.coreBase) message += `   🧵 Core: ${item.specs.coreBase}\n`;
        if (item.specs.stoneStyle) message += `   💎 Stones: ${item.specs.stoneStyle}\n`;
        if (item.specs.latkan) message += `   📿 Latkan: ${item.specs.latkan}\n`;
        if (item.specs.monogram) message += `   🔤 Monogram: "${item.specs.monogram}"\n`;
        if (item.specs.engraving) message += `   ✍️ Engraving: "${item.specs.engraving}"\n`;
      }
      message += `\n`;
    });

    message += `--------------------------------------\n`;
    message += `💵 *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    if (discountAmount > 0) message += `🏷️ *Discount:* -₹${discountAmount.toLocaleString('en-IN')}\n`;
    message += `🚚 *Shipping:* ${shipping === 0 ? 'FREE EXPRESS' : `₹${shipping}`}\n`;
    message += `💎 *TOTAL PAYABLE:* ₹${grandTotal.toLocaleString('en-IN')}\n`;
    message += `--------------------------------------\n`;
    message += `_Please share payment UPI / bank transfer link and confirm dispatch timeline._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${shopPhoneNumber}?text=${encoded}`, '_blank');
  };

  // Direct Standard Checkout Submit
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerCity) {
      alert('Please fill in your name, phone number, and city.');
      return;
    }

    const orderId = `KM-${Math.floor(100000 + Math.random() * 900000)}`;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#d4af37', '#ffd97d', '#85182a', '#0b6647']
    });

    setOrderSuccess({
      orderId,
      name: customerName,
      phone: customerPhone,
      city: customerCity,
      total: grandTotal
    });

    onClearCart();
  };

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
          maxWidth: '480px',
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
            <ShoppingBag size={20} color="var(--crimson-900)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--crimson-900)' }}>
              Your Jewelry Bag ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
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

        {/* Free Shipping Progress */}
        <div style={{ padding: '12px 0', borderBottom: '1px solid var(--cream-200)' }}>
          {subtotal >= shippingThreshold ? (
            <div style={{ fontSize: '0.82rem', color: 'var(--emerald-700)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={16} /> Congratulations! You unlocked <strong>FREE Express Insured Shipping</strong>!
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--stone-600)', marginBottom: '6px' }}>
                Add <strong>₹{(shippingThreshold - subtotal).toLocaleString('en-IN')}</strong> more for <strong>FREE Express Shipping</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--cream-200)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%`,
                    height: '100%',
                    background: 'var(--gold-foil)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ORDER SUCCESS SCREEN */}
        {orderSuccess ? (
          <div style={{ padding: '40px 10px', textAlign: 'center', margin: 'auto 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#ecfdf5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--emerald-700)'
            }}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--crimson-900)', marginBottom: '8px' }}>
              Order Received With Honor!
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--stone-600)', marginBottom: '16px' }}>
              Thank you, <strong>{orderSuccess.name}</strong>. Your custom order reference is:
            </p>
            <div style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              fontFamily: 'var(--font-royal)',
              color: 'var(--crimson-900)',
              background: 'var(--cream-100)',
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px dashed var(--gold-500)',
              display: 'inline-block',
              marginBottom: '20px'
            }}>
              {orderSuccess.orderId}
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--stone-600)', marginBottom: '24px' }}>
              Our master artisan will contact you at <strong>{orderSuccess.phone}</strong> for bangle size verification and dispatch updates.
            </p>
            <button
              onClick={() => {
                setOrderSuccess(null);
                setIsCheckoutOpen(false);
                onClose();
              }}
              className="btn-gold"
              style={{ width: '100%' }}
            >
              Continue Exploring Bangles
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* EMPTY CART SCREEN */
          <div style={{ textAlign: 'center', padding: '60px 20px', margin: 'auto 0' }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'var(--cream-100)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--stone-400)'
            }}>
              <ShoppingBag size={32} />
            </div>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--crimson-900)', marginBottom: '6px' }}>
              Your Bag is Empty
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--stone-600)', marginBottom: '20px' }}>
              Explore our royal collections or create a custom signature bangle stack in our 3D Studio.
            </p>
            <button onClick={onClose} className="btn-gold" style={{ padding: '10px 20px' }}>
              Start Shopping
            </button>
          </div>
        ) : isCheckoutOpen ? (
          /* CHECKOUT FORM VIEW */
          <div style={{ flex: 1, padding: '16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--gold-700)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                ← Back to Bag
              </button>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--crimson-900)', margin: 0 }}>Shipping & Delivery</h4>
            </div>

            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stone-800)', display: 'block', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--cream-300)', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stone-800)', display: 'block', marginBottom: '4px' }}>
                  WhatsApp / Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--cream-300)', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stone-800)', display: 'block', marginBottom: '4px' }}>
                  Street Address & House No.
                </label>
                <textarea
                  rows={2}
                  placeholder="Apartment, Street name, Landmark"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--cream-300)', fontSize: '0.88rem', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stone-800)', display: 'block', marginBottom: '4px' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaipur"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--cream-300)', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stone-800)', display: 'block', marginBottom: '4px' }}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="302001"
                    value={customerPincode}
                    onChange={(e) => setCustomerPincode(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--cream-300)', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ padding: '12px', background: 'var(--cream-100)', borderRadius: '10px', marginTop: '10px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Total Amount Payable:</span>
                  <strong style={{ color: 'var(--crimson-900)' }}>₹{grandTotal.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ color: 'var(--stone-600)', fontSize: '0.75rem' }}>
                  Payment: Cash on Delivery / UPI upon artisan size verification.
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                <button type="submit" className="btn-gold" style={{ padding: '12px' }}>
                  Confirm Order (₹{grandTotal.toLocaleString('en-IN')})
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="btn-whatsapp"
                  style={{ padding: '12px' }}
                >
                  <MessageCircle size={18} /> Place Directly via WhatsApp
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* CART ITEMS LIST */
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--cream-200)'
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: item.isCustom ? item.image : '#f5efe6',
                    border: '1px solid var(--cream-300)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.isCustom ? (
                      <Sparkles size={24} color="#ffffff" />
                    ) : (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>

                  {/* Item Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h5 style={{ fontSize: '0.9rem', color: 'var(--stone-900)', fontWeight: 700, margin: 0 }}>
                        {item.name}
                      </h5>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', padding: '2px' }}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Specs snippet */}
                    <div style={{ fontSize: '0.74rem', color: 'var(--stone-600)', margin: '4px 0' }}>
                      {item.specs?.size && <span>Size: <strong>{item.specs.size}</strong> • </span>}
                      {item.specs?.metal && <span>{item.specs.metal}</span>}
                      {item.specs?.monogram && <span> • Initial: <strong>{item.specs.monogram}</strong></span>}
                      {item.specs?.engraving && <div>Engraved: "{item.specs.engraving}"</div>}
                    </div>

                    {/* Price and quantity controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--crimson-900)' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--cream-300)', borderRadius: '6px' }}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          style={{ width: '24px', height: '24px', border: 'none', background: 'var(--cream-100)', cursor: 'pointer' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ width: '28px', textAlign: 'center', fontSize: '0.82rem', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          style={{ width: '24px', height: '24px', border: 'none', background: 'var(--cream-100)', cursor: 'pointer' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <form onSubmit={handleApplyPromo} style={{ padding: '12px 0', borderTop: '1px solid var(--cream-200)' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="Coupon code (e.g. ROYAL10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{ flex: 1, padding: '8px 10px', fontSize: '0.82rem', borderRadius: '6px', border: '1px solid var(--cream-300)' }}
                />
                <button type="submit" className="btn-outline-gold" style={{ padding: '8px 12px', fontSize: '0.78rem' }}>
                  Apply
                </button>
              </div>
              {promoMessage && (
                <div style={{ fontSize: '0.75rem', marginTop: '4px', color: discountPercent > 0 ? 'var(--emerald-700)' : 'var(--crimson-700)' }}>
                  {promoMessage}
                </div>
              )}
            </form>

            {/* Totals Summary */}
            <div style={{ padding: '12px 0', borderTop: '1px solid var(--cream-200)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--stone-600)' }}>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--emerald-700)' }}>
                  <span>Discount ({discountPercent}%):</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--stone-600)' }}>Shipping:</span>
                <span>{shipping === 0 ? <strong style={{ color: 'var(--emerald-700)' }}>FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--crimson-900)', marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--cream-300)' }}>
                <span>Grand Total:</span>
                <span style={{ fontFamily: 'var(--font-royal)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px' }}>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="btn-gold"
                style={{ padding: '12px', width: '100%' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="btn-whatsapp"
                style={{ padding: '12px', width: '100%' }}
              >
                <MessageCircle size={18} /> Order Cart via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
