import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import CustomizerStudio from './components/CustomizerStudio';
import ProductQuickView from './components/ProductQuickView';
import SizeGuideModal from './components/SizeGuideModal';

export default function App() {
  // Currency State
  const [currency, setCurrency] = useState('USD');
  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    INR: { symbol: '₹', rate: 86.5 }
  };

  const formatPrice = (usdAmount) => {
    const info = currencyRates[currency] || currencyRates.USD;
    const converted = Math.round(usdAmount * info.rate);
    return `${info.symbol}${converted.toLocaleString()}`;
  };

  // Gallery Showcase State
  const [activeGalleryImg, setActiveGalleryImg] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAvVG9U6tJb3fH1b2Rh0dkK7C_Pr4TTmuIj3VeBqkv6-RLop5r3-3jFeNrvXD8BxCMI5dl3sRDdQ_VJQMwk34dPhnZ6JLxk9c1-xDg5_iIi5KJWCZ79bruPZFVN6OWUuGQ-m-cgOrjHHqk4g1diKbbqPSmGYge2cpi5pWRC1U1DVbOvzc8_Jmc_kzYWl6WMFyJZrcPrWP3azlgYcdkG-Oeml7GALziLQh3wNjn0QjAA'
  );
  const [activeThumb, setActiveThumb] = useState(0);
  const [lightingMode, setLightingMode] = useState('studio'); // 'studio', 'sunlit', 'candlelight'
  const [isZoomed, setIsZoomed] = useState(false);

  // Customization Options for the Main Kada
  const [selectedSize, setSelectedSize] = useState({ id: '2-6', mm: '60.3 mm', label: 'standard luxury medium wrist' });
  const [selectedFinish, setSelectedFinish] = useState({ id: '22k-royal', name: '22K Sovereign', price: 4850 });
  const [engravingText, setEngravingText] = useState('');
  const [engravingFont, setEngravingFont] = useState('roman');

  // Modals & Interactivity
  const [isMandrelOpen, setIsMandrelOpen] = useState(false);
  const [isSalonModalOpen, setIsSalonModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [is3DStudioOpen, setIs3DStudioOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isPlayingChime, setIsPlayingChime] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: 'Bridal Wedding Suite',
    city: 'Virtual Encrypted 4K Gemologist Session',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // ── SugGos Inspired Interactive States ─────────────────────
  // 1. Scroll Progress & Back to Top
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowBackToTop(window.scrollY > 380);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Before / After Transformation Slider
  const [baSliderPos, setBaSliderPos] = useState(50);

  // 3. Hotspot Inspector State
  const [activeHotspot, setActiveHotspot] = useState(null);

  // 4. Interactive Mood Board Style
  const [activeMoodboard, setActiveMoodboard] = useState('bridal');

  // 5. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // 6. Style Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // 7. Floating Atelier AI Concierge Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Maison Aura & Karat. I am your personal High-Jewelry Concierge. Are you looking to design a bridal chooda, find your exact mandrel wrist size, or explore our Syndicate polki kadas?'
    }
  ]);

  const handleSendChatMessage = (textToSend) => {
    const message = textToSend || chatInput.trim();
    if (!message) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: message }]);
    if (!textToSend) setChatInput('');
    setIsChatTyping(true);

    setTimeout(() => {
      setIsChatTyping(false);
      let reply = "Our senior Jaipur gemologists are delighted to assist. You can calibrate your exact inner wrist diameter with our live Mandrel Tool or launch our 3D Studio to preview your custom bangle!";
      const lower = message.toLowerCase();

      if (lower.includes('size') || lower.includes('mandrel') || lower.includes('measure')) {
        reply = "Our bangles feature concealed hinges and screw locks, contoured to your exact wrist diameter (e.g. 2-4 is 57.2mm, 2-6 is 60.3mm). Click 'Sizing Guide' in the navbar or let me know your wrist bone millimeters!";
      } else if (lower.includes('polki') || lower.includes('diamond')) {
        reply = "Every piece uses natural, uncut Syndicate Polki diamonds cold-burnished in 24K pure gold ribbon over reflective silver daak foil. They radiate an iconic soft royal luster under candlelight.";
      } else if (lower.includes('lehenga') || lower.includes('color') || lower.includes('match') || lower.includes('silk')) {
        reply = "Yes! We hand-wrap Mulberry Silk Resham in Sindoor Red, Rani Pink, Royal Emerald, Regal Navy, and Ochre Gold to match your bridal lehenga. You can also send a photo to our WhatsApp concierge (+91 98765 43210).";
      } else if (lower.includes('shipping') || lower.includes('delivery') || lower.includes('safe') || lower.includes('vault')) {
        reply = "We provide 100% insured armored door-to-vault transit worldwide via Malca-Amit with BIS laser assay hallmarking and GIA gemological accreditation.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 900);
  };

  const handleQuizAnswer = (styleKey) => {
    const nextAnswers = { ...quizAnswers, [quizStep]: styleKey };
    setQuizAnswers(nextAnswers);

    if (quizStep + 1 < 4) {
      setQuizStep(prev => prev + 1);
    } else {
      // Calculate dominant style
      const counts = {};
      Object.values(nextAnswers).forEach(st => { counts[st] = (counts[st] || 0) + 1; });
      let winner = 'Bridal';
      let maxCount = 0;
      Object.entries(counts).forEach(([st, cnt]) => {
        if (cnt > maxCount) {
          maxCount = cnt;
          winner = st;
        }
      });
      setQuizResult(winner);
      setQuizStep(4);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResult(null);
  };

  // Acoustic Gold Chime Harmonics Generator
  const playGoldChimes = () => {
    setIsPlayingChime(true);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        // High pure gold & crystalline bell harmonics
        const harmonics = [1046.5, 1318.51, 1567.98, 2093.00, 2637.02];
        harmonics.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.09 + 1.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.09);
          osc.stop(ctx.currentTime + i * 0.09 + 1.4);
        });
      }
    } catch (err) {
      console.log('Audio Context', err);
    }
    setTimeout(() => setIsPlayingChime(false), 1600);
  };

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ak_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ak_wishlist');
      return saved ? JSON.parse(saved) : [
        { id: 'ak-01', name: 'The Royal Nizam Polki Kada', price: 4850, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80' },
        { id: 'ak-02', name: 'Aethelgard Pavé Eternity Bangle', price: 2420, image: 'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=600&q=80' }
      ];
    } catch {
      return [];
    }
  });

  // Craft Tabs State
  const [craftTab, setCraftTab] = useState(1);

  // Catalog Filtering State
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [metalFilter, setMetalFilter] = useState('all');
  const [profileFilter, setProfileFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Save Cart & Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('ak_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('ak_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Add to Cart Handlers
  const handleAddToCart = (product) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#c5a059', '#775a19', '#fbf9f6', '#3e6752']
    });

    const newItem = {
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      specs: {
        size: product.size || selectedSize.id,
        metal: product.metal || selectedFinish.name,
        engraving: product.engraving || (engravingText.trim() ? `${engravingText} (${engravingFont})` : null)
      }
    };

    setCartItems(prev => [...prev, newItem]);
    showToast(`Allocated "${product.name}" to your Bespoke Acquisition Bag`);
    setIsCartOpen(true);
  };

  const handleAcquireMainPiece = () => {
    handleAddToCart({
      id: 'ak-nizam-kada',
      name: 'The Royal Nizam Polki Kada',
      price: selectedFinish.price,
      image: activeGalleryImg,
      size: selectedSize.id,
      metal: selectedFinish.name,
      engraving: engravingText.trim() ? `${engravingText} (${engravingFont})` : null
    });
  };

  const handleBundleAcquisition = () => {
    handleAddToCart({
      id: 'empress-arm-suite-bundle',
      name: 'The Empress 4-Piece Arm Suite Bundle',
      price: 8418,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      size: selectedSize.id,
      metal: '22K Sovereign Gold Suite',
      engraving: 'Complete Empress Curation'
    });
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`De-allocated from private wishlist vault`);
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`❤️ Saved to your private salon vault`);
        return [...prev, product];
      }
    });
  };

  // WhatsApp Checkout
  const handleWhatsAppOrder = () => {
    const shopPhoneNumber = "919876543210";
    let message = `👑 *MAISON AURA & KARAT — PRIVATE ATELIER ORDER* 👑\n`;
    message += `-----------------------------------------------\n`;
    message += `💎 *Client Currency:* ${currency}\n`;
    message += `🛍️ *ACQUISITION RESERVATIONS:*\n\n`;

    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}* (Qty: ${item.quantity})\n`;
      message += `   💰 Price: ${formatPrice(item.price * item.quantity)}\n`;
      if (item.specs?.size) message += `   📏 Mandrel Size: ${item.specs.size}\n`;
      if (item.specs?.metal) message += `   🥇 Metal: ${item.specs.metal}\n`;
      if (item.specs?.engraving) message += `   ✍️ Secret Engraving: "${item.specs.engraving}"\n`;
      message += `\n`;
    });

    const totalUsd = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `-----------------------------------------------\n`;
    message += `💵 *Total Valuation:* ${formatPrice(totalUsd)}\n`;
    message += `🚚 *Transit:* Malca-Amit Armored Vault Delivery Included\n`;
    message += `_Please coordinate private gemologist consultation & armored delivery protocol._`;

    window.open(`https://wa.me/${shopPhoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Products Master List
  const catalogProducts = [
    {
      id: "prod-1",
      name: "The Royal Nizam Polki Kada",
      price: 4850,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9iE_qc_p5qZjha0jhCy08Pk2DH9RS5Uzj5VB4dqR1iLpU93ZP_h_KfBx2f2wrMviinBFyuDuDG1OiMNsD8L6GkwR26RLIp-_h2G7nOHzxWjBiKtvENxnUGr6cK1poSlOo7LDwdHHVflTp0Loal7-ldOT6nduySLTLttYzmzg0g7aIhoP6JswC-kZJNBW8Uj_IQwbFZgAZrEoV4YdradzjQ3n-TF7K4Z0hur2oS9g3",
      category: "bridal-heritage",
      metal: "22K Sovereign Gold",
      metalCode: "22k",
      tag: "Masterpiece",
      badgeClass: "bg-primary text-on-primary",
      weight: "22K • 42.5g",
      width: "14.5mm Width",
      widthCode: "15mm",
      clasp: "Hinged Spring Clasp",
      stock: "1 in Vault",
      description: "22K Sovereign gold hallmarked kada adorned with natural uncut syndicate polki diamonds and hand-painted peacock meenakari on the inner sleeve."
    },
    {
      id: "prod-2",
      name: "Aethelgard Pavé Eternity Bangle",
      price: 2420,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkq33XRhkqGHgZ0YkV34dkPiXnYdX3iW68qtIkoD_IpEpCHf7ht3hCuOxaeP7EI9cnz2UOp7GinmzK7sqK0-DIrSDfdv68t4B6DwOjskTTpYwz-q-rBqnOoyzEaqg8MMF5yx3Jg8eoriy8-qwvAQ07ATjmDmSFGn7OLOuxnF_q-hC46hFm5HAngvLUb6NSa4C3alAH7qVTVjbfTN6wM0MHrzXibcDimsytDMqC21Kw",
      category: "everyday-minimalist",
      metal: "18K Honey Yellow",
      metalCode: "18k",
      tag: "Best For Stacking",
      badgeClass: "bg-surface-container-highest text-on-surface",
      weight: "18K • 18.2g",
      width: "3.2mm Slim",
      widthCode: "2.5mm",
      clasp: "Invisible Concealed Lock",
      stock: "Immediate Dispatch",
      description: "18K honey gold channel set with 1.85ct F-VS clarity brilliant-cut lab-certified natural diamonds. Whisper-light ergonomic wrist contour."
    },
    {
      id: "prod-3",
      name: "Vedic Sun Temple Bangle",
      price: 3690,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDN80n9gcAyfo3VC91hIDsA8HW2LIm44gyVvZaVgxotX_j55yP0Yn4wFuTdjeGaCQ-Yj2HUAsiz4ZVxAbOIhkuHbre47jOGXhixDvds5gmOETUN0CaBsJ5_TrJxoBZRLxuxjI5dsshI-wZuFzWlGxL1PEiPgPSjeI5oo_Ea7bpLfMcoVmgajGfxuvSw3cjUXjKD0XEn5mkJXUkY-aRDeuUd_FnxySBFGfhyKV20qGP",
      category: "temple-nakshi",
      metal: "22K Sovereign Gold",
      metalCode: "22k",
      tag: "Heritage Craft",
      badgeClass: "bg-tertiary text-on-tertiary",
      weight: "22K • 36.0g",
      width: "11.0mm Relief",
      widthCode: "6mm",
      clasp: "Screw Pin Fastener",
      stock: "Bespoke 3 Wks",
      description: "Hand-sculpted Nakshi relief depicting celestial sun rays and architectural deity motifs, crowned with 8 natural cabochon Burmese rubies."
    },
    {
      id: "prod-4",
      name: "Lumière Fluted Torque Cuff",
      price: 1980,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAj8063quV7N09tegr_bxdf_HY5hozFtEwXLebSaas9R2a76FZ-IKx0VPH20gGPrBOse3LZHo6FvcJnTVJzwVQkaxtOcl2L5kwgpmmWP1-HsCDKOvVxoU15tSMhlZg3p0MkvHEBCNUClIvq1RVdgct-gG8Ob-rizTCTleTKyhgrQS01r--GNuQMXbLboBRwjP_7PTaAftXWoRfcRb27YrOxXoKXze_Ug29rjmllw18u",
      category: "everyday-minimalist",
      metal: "Rose Blush",
      metalCode: "rose",
      tag: "Modern Silhouette",
      badgeClass: "bg-surface-container-highest text-on-surface",
      weight: "18K • 22.4g",
      width: "7.5mm Torque",
      widthCode: "6mm",
      clasp: "Spring Tension Cuff",
      stock: "2 in Vault",
      description: "Ergonomic hinged oval cuff with fluted Roman column ridges in 18K Rose Blush. Fluid tension closure designed for effortless daily slip-on."
    },
    {
      id: "prod-5",
      name: "Devi Filigree Bridal Chooda Pair",
      price: 5200,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlz4xIrt4bGNHDfQh4WygJHaIZFi0Z2zuH9lCGh0PYoYR5pn8JJFkCVDViNSONhje9uLyGelOp_TT1HTxAjPErpf4uBIQSTPhpSChsa-Y2Cc5q01AmFFX5sn3S9_ZAhNW4I2EqRFdPTCAKylhgclV6d3mF76UKHn13V6YvzbRQCaxNIaKoCQ7YIF6hbxlDiKatWaBpKAUjU5_N-LzBDP_zpRnWcUHzw6UIjY6k2f3Q",
      category: "bridal-heritage",
      metal: "22K Sovereign Gold",
      metalCode: "22k",
      tag: "Bridal Suite",
      badgeClass: "bg-primary text-on-primary",
      weight: "22K Pair • 58.0g",
      width: "Set of 2 Kadas",
      widthCode: "15mm",
      clasp: "Safety Double Hasp",
      stock: "Made to Order",
      description: "Matching pair of ornate bridal kadas with micro wire filigree lattice, Basra seed pearl tassels, and Colombian emerald cabochons."
    },
    {
      id: "prod-6",
      name: "Sleek Hammered 2.5mm Stacker",
      price: 940,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1nIIU6zCs7RBjeWbVbleW7HzNk_pkg8e9x8OGBfUtlD_Ma8R36eoXIAy1uYecB3BLyLpfw-P1N2jEd0fmZu4tJOlUgbi8ib8v6lDlASGJQMlKRT3A8sPM4rbyDgzvaiz2ljLp-G0ZWKKGUmjjad5ME9VwrXf_49PE0ya80EF2e5sEMLk_DNaNIAk7hX1x77A_4T297wiKALIIBeQf3pTc9eh3s9CNIBils3-dX-Wc",
      category: "everyday-minimalist",
      metal: "22K Sovereign Gold",
      metalCode: "22k",
      tag: "Everyday Luxury",
      badgeClass: "bg-surface-container-highest text-on-surface",
      weight: "22K • 9.8g",
      width: "2.5mm Delicate",
      widthCode: "2.5mm",
      clasp: "Seamless Slip-On",
      stock: "4 in Vault",
      description: "Hallmarked 22K sovereign pure gold with artisan facet-hammered micro-surfaces that shimmer in motion. Custom inner monogram engraving included."
    }
  ];

  // Filtered Products
  const filteredProducts = catalogProducts.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (metalFilter !== 'all' && p.metalCode !== metalFilter) return false;
    if (profileFilter !== 'all' && p.widthCode !== profileFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  const cartTotalUsd = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background font-body-md text-on-surface antialiased overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-on-surface text-surface px-5 py-3 rounded-lg shadow-2xl border border-primary text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-base">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==================== IMMUTABLE SHARED TOPNAVBAR COMPONENT ==================== */}
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,24,23,0.05)] border-b border-surface-container">
        {/* Top Announcement Bar */}
        <div className="bg-surface-container-high px-gutter py-space-xs text-center border-b border-outline-variant/20">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            Complimentary Insured Global Atelier Shipping &amp; Bespoke Consultations &nbsp;|&nbsp;&nbsp;
            <button
              onClick={() => setIsSalonModalOpen(true)}
              className="text-primary hover:text-on-primary-container transition-colors font-medium bg-transparent border-0 cursor-pointer"
            >
              Book Private Salon
            </button>
          </p>
        </div>

        {/* Main Navbar Row */}
        <div className="h-20 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <div className="size-5 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <a href="#" className="font-headline-sm text-headline-sm text-on-surface tracking-wider uppercase font-medium">
              Aura &amp; Karat
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-space-md xl:gap-space-lg">
            <a href="#hero-section" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all py-1">
              Home
            </a>
            <button
              onClick={() => {
                setIs3DStudioOpen(true);
                setTimeout(() => {
                  const el = document.getElementById('custom-studio-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all py-1 bg-transparent border-0 cursor-pointer"
            >
              Custom Studio
            </button>
            <a href="#offerings-section" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all py-1">
              Offerings
            </a>
            <a href="#collections-section" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all py-1">
              Collections
            </a>
            <a href="#lookbook-section" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all py-1">
              Bridal &amp; Stacks
            </a>
            <a href="#about-section" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all py-1">
              About Us
            </a>
            <button
              onClick={() => setIsMandrelOpen(true)}
              className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all py-1 bg-transparent border-0 cursor-pointer"
            >
              Sizing Guide
            </button>
            <a href="#contact-section" className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-all py-1">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-space-md">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center">
              <select
                aria-label="Currency Selector"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent font-label-md text-label-md uppercase tracking-wider text-on-surface-variant focus:outline-none cursor-pointer pr-1"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>

            {/* Wishlist Vault Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Saved Wishlist"
              className="relative text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-transparent border-0 cursor-pointer p-1"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-on-primary font-label-sm text-[9px] px-1 rounded-full flex items-center justify-center min-w-[14px] h-[14px]">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Bespoke Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Bespoke Cart Drawer"
              className="relative flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors bg-surface-container px-3 py-1.5 rounded border border-outline-variant/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="font-label-md text-label-md hidden md:inline-block font-semibold">
                {formatPrice(cartTotalUsd)}
              </span>
              <span className="bg-primary text-on-primary font-label-sm text-[9px] px-1.5 rounded-full flex items-center justify-center min-w-[14px] h-[14px]">
                {cartItems.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </button>

            {/* Direct WhatsApp Concierge Button */}
            <button
              onClick={handleWhatsAppOrder}
              title="Direct WhatsApp Atelier Concierge"
              className="size-8 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-sm hover:scale-105 transition-all border-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================== MAIN BODY CONTENT ==================== */}
      <main className="w-full pt-28 bg-background">
        <div className="flex flex-col w-full">

          {/* ==================== 1. HOMEPAGE HERO SECTION ==================== */}
          <section id="hero-section" className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface py-12 lg:py-20 border-b border-outline-variant/20">
            {/* Ambient luxury light glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              {/* Left Column: Brand Mission, Offerings Explanation & Action Next Steps */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 text-primary w-fit shadow-xs">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  <span className="font-label-sm text-[11px] uppercase tracking-[0.2em] font-semibold">
                    Haute Joaillerie &amp; Bespoke Bangle Atelier
                  </span>
                </div>

                <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-on-surface font-normal leading-[1.12] tracking-tight">
                  Sacred Circles of Grace. <br className="hidden sm:inline" />
                  <span className="italic font-headline-xl text-primary">Royal &amp; Bespoke Bangles,</span> <br className="hidden sm:inline" />
                  Tailored to Your Wrist.
                </h1>

                <p className="font-body-lg text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                  <strong>What we craft:</strong> Museum-grade Bridal Choodas, Syndicate uncut Polki Kadas, hand-spun Silk Resham sets, and contemporary 18K diamond cuffs. <br className="my-1.5 block" />
                  <strong>Who it is for:</strong> Designed for modern brides, festive celebrations, and women who desire flawless custom millimeter mandrel wrist fit with 100% BIS hallmarked gold.
                </p>

                {/* What visitors should do next: Clear Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIs3DStudioOpen(true);
                      setTimeout(() => {
                        const el = document.getElementById('custom-studio-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-6 py-3.5 rounded bg-on-surface text-surface hover:bg-primary transition-all font-label-md text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-2 shadow-md hover:shadow-lg border-0 cursor-pointer animate-shimmer"
                  >
                    <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                    Launch 3D Customizer Studio
                  </button>

                  <a
                    href="#offerings-section"
                    className="px-6 py-3.5 rounded bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container transition-all font-label-md text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">category</span>
                    Explore Bangle Offerings
                  </a>

                  <button
                    onClick={() => setIsMandrelOpen(true)}
                    className="px-4 py-3.5 rounded text-primary hover:text-on-primary-container transition-colors font-label-md text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">straighten</span>
                    Calibrate Wrist Size
                  </button>
                </div>

                {/* Trust Proof Badges Ribbon */}
                <div className="pt-4 border-t border-outline-variant/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface font-bold">BIS 916 Pure Gold</span>
                      <span className="text-[10px]">Laser Hallmarked</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface font-bold">Armored Global Transit</span>
                      <span className="text-[10px]">100% Insured Door-to-Vault</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">straighten</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface font-bold">Custom Mandrel Fit</span>
                      <span className="text-[10px]">Exact Wrist Diameter</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">published_with_changes</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface font-bold">Lifetime Polish</span>
                      <span className="text-[10px]">Complimentary Care</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                    alt="Imperial Royal Bridal Bangle Suite"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Sparkle Glints */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <span className="absolute top-1/4 right-1/4 text-amber-200 animate-sparkle text-lg select-none">✦</span>
                    <span className="absolute bottom-1/3 left-1/4 text-amber-100 animate-sparkle text-sm select-none" style={{ animationDelay: '1s' }}>✧</span>
                  </div>

                  {/* Floating Atelier Highlight Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-primary/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-label-sm uppercase tracking-widest text-primary font-bold block">
                        Royal Bridal Suite
                      </span>
                      <h4 className="font-headline-sm text-base text-on-surface font-bold">
                        The Maharani Chooda Symphony
                      </h4>
                      <p className="text-[11px] text-on-surface-variant font-mono">
                        22K Sovereign Gold • Syndicate Polki
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIs3DStudioOpen(true);
                        setTimeout(() => {
                          const el = document.getElementById('custom-studio-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-3 py-2 bg-primary text-on-primary rounded text-[11px] uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition border-0 cursor-pointer shrink-0"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== 2. ABOUT OUR OFFERINGS & BANGLE STYLES ==================== */}
          <section id="offerings-section" className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-14 lg:py-20 border-b border-outline-variant/20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-primary font-label-sm text-label-sm uppercase tracking-widest border border-outline-variant/30 mb-3">
                <span className="material-symbols-outlined text-[14px]">category</span>
                Our Specialized Bangle Styles &amp; Offerings
              </span>
              <h2 className="font-headline-md text-3xl lg:text-4xl text-on-surface">
                Crafted for Every Occasion, <span className="italic font-headline-md text-primary">Customized to You</span>
              </h2>
              <p className="font-body-md text-on-surface-variant text-sm mt-3 leading-relaxed">
                From ancient royal court traditions to contemporary daily wear, explore our 6 signature bangle architectures forged in our Jaipur and Milan ateliers.
              </p>
            </div>

            {/* 6 Offerings Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 'bridal-chooda',
                  title: 'Imperial Bridal Chooda & Kaliras',
                  badge: 'For Weddings & Brides',
                  badgeColor: 'bg-primary text-on-primary',
                  desc: 'Auspicious crimson & ivory bangles framed by heavy 22K Jadau polki kadas and custom hanging Basra seed pearl kaliras.',
                  price: 'From $3,800 USD (₹45,000+)',
                  image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
                  targetCategory: 'bridal-heritage'
                },
                {
                  id: 'kundan-polki',
                  title: 'Kundan & Jadau Polki Kadas',
                  badge: 'Jaipur Royal Guild',
                  badgeColor: 'bg-primary-container text-on-primary-container',
                  desc: 'Untreated natural syndicate polki diamonds cold-burnished in 24K pure gold ribbon over reflective silver daak foil with kiln meenakari.',
                  price: 'From $2,420 USD',
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvVG9U6tJb3fH1b2Rh0dkK7C_Pr4TTmuIj3VeBqkv6-RLop5r3-3jFeNrvXD8BxCMI5dl3sRDdQ_VJQMwk34dPhnZ6JLxk9c1-xDg5_iIi5KJWCZ79bruPZFVN6OWUuGQ-m-cgOrjHHqk4g1diKbbqPSmGYge2cpi5pWRC1U1DVbOvzc8_Jmc_kzYWl6WMFyJZrcPrWP3azlgYcdkG-Oeml7GALziLQh3wNjn0QjAA',
                  targetCategory: 'bridal-heritage'
                },
                {
                  id: 'silk-thread',
                  title: 'Hand-Spun Silk Thread & Resham',
                  badge: 'Custom Lehenga Matching',
                  badgeColor: 'bg-tertiary text-on-tertiary',
                  desc: 'Pure Mulberry silk thread meticulously hand-wrapped over durable copper cores, encrusted with zardozi micro-pearls and zari cords.',
                  price: 'From $480 USD',
                  image: 'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=600&q=80',
                  targetCategory: 'everyday-minimalist'
                },
                {
                  id: 'glass-velvet',
                  title: 'Firozabad Glass & Velvet Choodiyan',
                  badge: 'Sacred Musical Resonance',
                  badgeColor: 'bg-surface-container-high text-on-surface',
                  desc: 'Experience the authentic romantic clinking chime (*khanak*) of artisanal blown glass bangles wrapped in fine Austrian velvet plush.',
                  price: 'From $290 USD',
                  image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
                  targetCategory: 'bridal-heritage'
                },
                {
                  id: 'temple-nakshi',
                  title: 'Temple & Antique Nakshi Kadas',
                  badge: 'Museum Heritage',
                  badgeColor: 'bg-primary text-on-primary',
                  desc: 'Sculpted repoussé high-relief depicting celestial sun deities, royal peacocks, and floral arabesques crowned with Burmese rubies.',
                  price: 'From $3,690 USD',
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDN80n9gcAyfo3VC91hIDsA8HW2LIm44gyVvZaVgxotX_j55yP0Yn4wFuTdjeGaCQ-Yj2HUAsiz4ZVxAbOIhkuHbre47jOGXhixDvds5gmOETUN0CaBsJ5_TrJxoBZRLxuxjI5dsshI-wZuFzWlGxL1PEiPgPSjeI5oo_Ea7bpLfMcoVmgajGfxuvSw3cjUXjKD0XEn5mkJXUkY-aRDeuUd_FnxySBFGfhyKV20qGP',
                  targetCategory: 'temple-nakshi'
                },
                {
                  id: 'minimalist-cuffs',
                  title: '18K Everyday Minimalist Diamond Cuffs',
                  badge: 'Contemporary Daily Luxury',
                  badgeColor: 'bg-surface-container-high text-on-surface',
                  desc: 'Fluted Roman torque cuffs and eternity bands channel-set with brilliant-cut F-VS diamonds for comfortable 24/7 wrist contour.',
                  price: 'From $940 USD',
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj8063quV7N09tegr_bxdf_HY5hozFtEwXLebSaas9R2a76FZ-IKx0VPH20gGPrBOse3LZHo6FvcJnTVJzwVQkaxtOcl2L5kwgpmmWP1-HsCDKOvVxoU15tSMhlZg3p0MkvHEBCNUClIvq1RVdgct-gG8Ob-rizTCTleTKyhgrQS01r--GNuQMXbLboBRwjP_7PTaAftXWoRfcRb27YrOxXoKXze_Ug29rjmllw18u',
                  targetCategory: 'everyday-minimalist'
                }
              ].map(offering => (
                <div
                  key={offering.id}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 gold-foil-hover"
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-surface-container overflow-hidden">
                      <img
                        src={offering.image}
                        alt={offering.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <span className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] tracking-[0.14em] font-semibold uppercase rounded shadow-sm ${offering.badgeColor}`}>
                        {offering.badge}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-headline-sm text-xl text-on-surface mb-2">
                        {offering.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                        {offering.desc}
                      </p>
                      <div className="text-xs font-semibold text-primary font-mono">
                        Starting Valuation: {offering.price}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex gap-2">
                    <button
                      onClick={() => {
                        setIs3DStudioOpen(true);
                        setTimeout(() => {
                          const el = document.getElementById('custom-studio-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="flex-1 py-2.5 px-3 bg-on-surface text-surface hover:bg-primary transition text-xs font-semibold uppercase tracking-wider rounded text-center border-0 cursor-pointer"
                    >
                      Customize Style
                    </button>
                    <a
                      href="#collections-section"
                      onClick={() => setCategoryFilter(offering.targetCategory)}
                      className="py-2.5 px-3 bg-surface-container text-on-surface hover:bg-surface-container-high transition text-xs font-semibold uppercase tracking-wider rounded text-center border border-outline-variant/30 cursor-pointer"
                    >
                      Browse
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ==================== 3. FEATURED ATELIER MASTERPIECE SHOWCASE ==================== */}
          <div className="text-center pt-8 pb-2">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary font-semibold">
              Masterwork of the Month • Interactive 360° Benchmark
            </span>
          </div>

          {/* Top Breadcrumb & Status Ribbon */}
          <section className="w-full bg-surface-container-low/70 py-space-xs border-b border-outline-variant/20">
            <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex flex-wrap items-center justify-between gap-y-2 text-on-surface-variant">
              <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-widest">
                <a className="hover:text-primary transition-colors" href="#">Atelier Archive</a>
                <span className="text-outline-variant">/</span>
                <a className="hover:text-primary transition-colors" href="#">Heritage Kadas</a>
                <span className="text-outline-variant">/</span>
                <span className="text-on-surface font-medium">The Royal Nizam Polki Kada</span>
              </nav>
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-tertiary-container/30 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> BIS 916 Hallmarked
                </span>
                <span className="px-2.5 py-1 rounded bg-surface text-primary font-label-sm text-label-sm uppercase tracking-widest shadow-sm">
                  22K Royal Sovereign Gold
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
                  Jaipur Guild Bench
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                  Edition 03 of 12
                </span>
              </div>
            </div>
          </section>

          {/* ==================== MAIN SHOWCASE: 2-COLUMN GALLERY & COMMERCE DOCK ==================== */}
          <section className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-space-md lg:py-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-8 items-start">

              {/* LEFT COLUMN: Precision Gallery (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-space-md lg:sticky lg:top-32">
                {/* Large Interactive Canvas */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low shadow-md group">
                  <img
                    alt="The Royal Nizam Polki Kada Primary View"
                    className={`w-full h-full object-cover transition-all duration-700 ease-out transform ${isZoomed ? 'scale-125' : 'group-hover:scale-105'}`}
                    id="main-gallery-view"
                    src={activeGalleryImg}
                  />

                  {/* Ambient Lighting Simulator Gradient Overlay */}
                  <div
                    className={`pointer-events-none absolute inset-0 transition-all duration-500 ${
                      lightingMode === 'studio'
                        ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60'
                        : lightingMode === 'sunlit'
                        ? 'bg-gradient-to-tr from-amber-500/20 via-transparent to-yellow-100/30 opacity-70'
                        : 'bg-gradient-to-t from-amber-950/70 via-amber-900/20 to-black/40 opacity-80'
                    }`}
                  />

                  {/* Delicate Gemstone Sparkle Glints */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <span className="absolute top-1/4 left-1/3 text-amber-200 animate-sparkle text-lg select-none">✦</span>
                    <span className="absolute top-1/2 left-2/3 text-amber-100 animate-sparkle text-sm select-none" style={{ animationDelay: '1.2s' }}>✧</span>
                    <span className="absolute bottom-1/3 left-1/2 text-yellow-200 animate-sparkle text-base select-none" style={{ animationDelay: '0.6s' }}>✦</span>
                    <span className="absolute top-1/3 right-1/4 text-amber-300 animate-sparkle text-xs select-none" style={{ animationDelay: '1.8s' }}>✧</span>
                  </div>

                  {/* Top Toolbar Badges & 360 Spin Indicator */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider shadow-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                      BIS Master Assay
                    </span>
                    <div className="pointer-events-auto flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-[16px] animate-spin text-primary" style={{ animationDuration: '9s' }}>360</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">Interactive 360° Studio</span>
                    </div>
                  </div>

                  {/* Bottom Viewport Atmosphere Switchers */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1 p-1 rounded-full bg-surface/90 backdrop-blur-md shadow-sm">
                      <button
                        onClick={() => setLightingMode('studio')}
                        className={`px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-widest transition-all border-0 cursor-pointer ${
                          lightingMode === 'studio' ? 'bg-on-surface text-surface' : 'hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        Studio Glow
                      </button>
                      <button
                        onClick={() => setLightingMode('sunlit')}
                        className={`px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-widest transition-all border-0 cursor-pointer ${
                          lightingMode === 'sunlit' ? 'bg-on-surface text-surface' : 'hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        Sunlit Pavilion
                      </button>
                      <button
                        onClick={() => setLightingMode('candlelight')}
                        className={`px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-widest transition-all border-0 cursor-pointer ${
                          lightingMode === 'candlelight' ? 'bg-on-surface text-surface' : 'hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        Candlelight Noir
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Acoustic Chimes Bar Button */}
                      <button
                        onClick={playGoldChimes}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md text-on-surface hover:text-primary font-label-sm text-label-sm uppercase tracking-wider shadow-sm transition-all border-0 cursor-pointer"
                        title="Experience the pure harmonic resonance of solid gold bangle clinking"
                      >
                        <span className="material-symbols-outlined text-primary text-[15px]">music_note</span>
                        <span className="hidden sm:inline">Gold Chime</span>
                        <div className="flex items-end gap-0.5 h-3">
                          <span className={`w-0.5 bg-primary rounded-full transition-all ${isPlayingChime ? 'chime-bar-1' : 'h-1.5'}`}></span>
                          <span className={`w-0.5 bg-primary rounded-full transition-all ${isPlayingChime ? 'chime-bar-2' : 'h-2.5'}`}></span>
                          <span className={`w-0.5 bg-primary rounded-full transition-all ${isPlayingChime ? 'chime-bar-3' : 'h-1'}`}></span>
                          <span className={`w-0.5 bg-primary rounded-full transition-all ${isPlayingChime ? 'chime-bar-4' : 'h-2'}`}></span>
                        </div>
                      </button>

                      <button
                        onClick={() => setIsZoomed(!isZoomed)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md text-on-surface hover:text-primary font-label-sm text-label-sm uppercase tracking-wider shadow-sm transition-colors border-0 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                        {isZoomed ? 'Reset' : 'Loupe (10x)'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Gallery */}
                <div className="grid grid-cols-4 gap-space-sm">
                  {[
                    {
                      label: 'Front Profile',
                      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApDaniHFOePtVP1tK8PO6aySpPs6llF-rK8MmAR2tYu-hnMAkiDDb8YvT_BZK_gWkMj0LaAE57bBZbsgB4mI94DVhQWWQawDQoPWvaZhrlnC-sxICbaoZ4-KVJKj5LjPwpvPLtiq2g1spQH5iPNjPBYSlgF1B1hd8oz51mcubpRlAfK_y8BJdesdhjGmKwN6sx9iuvTATS5j_CJnLv9fIq-VkAqrDsu0yHkD1wxAv5'
                    },
                    {
                      label: 'Champlevé Enamel',
                      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArOWgw1pDFs7UOdH5EBKfNhCG64r8scd0B2pTtFLJbiPAAorBDiA-PFppVhSueRlnCHWcHzIDFWJrq0siO5ThEaPMpY_jEqQgUb-B8oSwHkvbHMGW-pxK14gRW6EGk8sSUlMtBdRq0ZAQDbBbLqz18xg1KqXoKU5psQASNBNaljbEIkD7UoY2ZbRHUP0lZgv_qvJVcDXqgJqyBnRsceMj1mfQ0-wh0YmcQtI2fgRDC'
                    },
                    {
                      label: 'BIS Clasp Assay',
                      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXQ0GcGC4aNocoIUy_yrH98FPEgvQbyU_56E7j4fi_VoAveVkySG9h9m_FXebL5eK9CeNx_tRSPCb1UTioSCl6kuRmtUUUNc1VoUKq3i9qbGpQj2pQ7xBzcAYIXBO04rzAZy4NKeSh-3edqBB9JU72NvHzOTndtAu2614nYd9ocNdAaynGnU5jeK39HJRlU0MZdA66Vy7sPu3JGNaPltprr1GPvxW3tjBNPjYA4YvP'
                    },
                    {
                      label: 'On Wrist Scale',
                      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo29k-kw9YF8nlPVluB2FXcc96dqu8SNKpPVZkgpnPQ7sQqxt1I59t52OqzK49_tLxUlzj8YMt6fDiNzeiaI7EdHDhD7O_2ZXsBMJwXYtyf1xA_n3IVXN2HgIldn5Rlf4jwqZPJOSNFRsjW8-MgqrT3Yc4ymPFxBAt2Zg-TCXEomH2xW5QkcCLsf_a1016i4xxjcNpl7KtXOnzNjR-r4YkkKzotDCjem4egMudeBVy'
                    }
                  ].map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveThumb(idx);
                        setActiveGalleryImg(thumb.img);
                      }}
                      className={`relative aspect-[4/3] rounded overflow-hidden bg-surface-container-high transition-all shadow-sm border-0 cursor-pointer ${
                        activeThumb === idx ? 'ring-2 ring-primary opacity-100' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img alt={thumb.label} className="w-full h-full object-cover" src={thumb.img} />
                      <span className="absolute bottom-1 left-1 right-1 bg-surface/90 text-on-surface text-[9px] font-label-sm uppercase tracking-tighter text-center py-0.5 rounded backdrop-blur-xs">
                        {thumb.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Craft Highlight Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 shadow-sm border border-outline-variant/20">
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-[18px]">palette</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">Champlevé Enamel</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Concealed botanical peacock motifs fired at 800°C for heirloom durability.</p>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 shadow-sm border border-outline-variant/20">
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">Threaded Piston Lock</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Engineered screw mechanism ensures seamless ergonomic balance &amp; security.</p>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 shadow-sm border border-outline-variant/20">
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">Syndicate Diamonds</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Hand-cut, unbacked natural rough polki stones with pure silver foil underlay.</p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Atelier Acquisition Console (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-space-md">
                {/* Header & Identity */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary font-semibold">
                      Heritage Kada Suite • No. 01
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                      SKU: AK-NK-01
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                    The Royal Nizam Polki Kada
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Commissioned with sovereign 22K gold, hand-set natural uncut polki diamonds, and royal floral meenakari enamel on the inner contour. Forged individually by fourth-generation bench artisans in Jaipur.
                  </p>
                </div>

                {/* Metallurgical Assay Card */}
                <div className="rounded-lg bg-surface-container-low p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/20">
                  <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">Atelier Certified Specifications</span>
                    <span className="material-symbols-outlined text-primary text-[20px]">science</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-body-sm font-body-sm">
                    <div className="flex flex-col">
                      <span className="text-on-surface-variant text-[11px] uppercase tracking-wider font-label-sm">Pure Gold Net Weight</span>
                      <span className="font-medium text-on-surface text-[15px]">42.50 Grams (22K)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface-variant text-[11px] uppercase tracking-wider font-label-sm">Polki Diamond Weight</span>
                      <span className="font-medium text-on-surface text-[15px]">3.40 Carats Total</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface-variant text-[11px] uppercase tracking-wider font-label-sm">Diamond Grade</span>
                      <span className="font-medium text-on-surface text-[15px]">Syndicate Uncut (VVS-eq)</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface-variant text-[11px] uppercase tracking-wider font-label-sm">Assay Hallmarking</span>
                      <span className="font-medium text-on-surface text-[15px]">BIS 916 &amp; GIA Certified</span>
                    </div>
                  </div>
                </div>

                {/* Customizer 1: Wrist Size Mandrel Selector */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                      Bangle Size (Inner Diameter)
                    </label>
                    <button
                      onClick={() => setIsMandrelOpen(true)}
                      className="text-primary hover:text-on-primary-container font-label-sm text-label-sm uppercase tracking-widest inline-flex items-center gap-1 transition-colors bg-transparent border-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">straighten</span> Mandrel Calibration
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { id: '2-2', mm: '54.0 mm', label: 'petite wrist contour' },
                      { id: '2-4', mm: '57.2 mm', label: 'slender wrist contour' },
                      { id: '2-6', mm: '60.3 mm', label: 'standard luxury medium wrist' },
                      { id: '2-8', mm: '63.5 mm', label: 'comfortable broad wrist' },
                      { id: '2-10', mm: '66.7 mm', label: 'generous royal fit' }
                    ].map(sz => (
                      <button
                        key={sz.id}
                        onClick={() => setSelectedSize(sz)}
                        className={`size-btn flex flex-col items-center py-2 px-1 rounded transition-all border-0 cursor-pointer ${
                          selectedSize.id === sz.id
                            ? 'bg-on-surface text-surface shadow-md ring-2 ring-primary'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        <span className="font-label-md text-label-md font-semibold">{sz.id}</span>
                        <span className="text-[10px] opacity-75 font-label-sm">{sz.mm}</span>
                      </button>
                    ))}
                  </div>
                  <span className="text-body-sm font-body-sm text-on-surface-variant text-xs mt-1">
                    Selected: <strong>{selectedSize.id}</strong> ({selectedSize.mm} internal diameter • {selectedSize.label})
                  </span>
                </div>

                {/* Customizer 2: Gold Karat & Patina Finish */}
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                    Precious Metal &amp; Patina Finish
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: '22k-royal', name: '22K Sovereign', price: 4850, subtitle: 'Standard Royal Finish' },
                      { id: '18k-honey', name: '18K Honey Gold', price: 4120, subtitle: 'Modern Lighter Hue' },
                      { id: '24k-nakshi', name: '24K Nakshi Wash', price: 5230, subtitle: 'Museum Antique Leaf' }
                    ].map(fin => (
                      <button
                        key={fin.id}
                        onClick={() => setSelectedFinish(fin)}
                        className={`finish-btn flex flex-col p-2.5 rounded text-left transition-all border-0 cursor-pointer ${
                          selectedFinish.id === fin.id
                            ? 'bg-surface-container-low ring-2 ring-primary shadow-sm'
                            : 'bg-surface-container-low hover:bg-surface-container'
                        }`}
                      >
                        <span className="font-label-md text-label-md font-semibold text-on-surface">{fin.name}</span>
                        <span className="text-body-sm font-body-sm text-primary font-medium">{formatPrice(fin.price)}</span>
                        <span className="text-[10px] font-label-sm uppercase tracking-wider text-on-surface-variant">{fin.subtitle}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customizer 3: Secret Inner Contour Inscription */}
                <div className="flex flex-col gap-1.5 p-space-sm rounded-lg bg-surface-container-low shadow-sm border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">edit_note</span> Atelier Monogram / Secret Date
                    </span>
                    <span className="font-label-sm text-label-sm uppercase text-tertiary font-semibold tracking-wider">Complimentary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      className="w-full bg-surface px-3 py-2 rounded text-body-sm font-body-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary uppercase tracking-widest border border-outline-variant/30"
                      maxLength={28}
                      placeholder="e.g. AURA • MMXXIV • FOREVER"
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                    />
                    <select
                      className="bg-surface px-2.5 py-2 rounded text-label-sm font-label-sm uppercase tracking-wider text-on-surface focus:outline-none border border-outline-variant/30"
                      value={engravingFont}
                      onChange={(e) => setEngravingFont(e.target.value)}
                    >
                      <option value="roman">Roman Serif</option>
                      <option value="script">Royal Script</option>
                      <option value="devanagari">Devanagari</option>
                    </select>
                  </div>
                  <span className="text-[11px] font-label-sm uppercase tracking-wider text-on-surface-variant">
                    Hand-graved by Jaipur master engraver adjacent to assay stamp.
                  </span>
                </div>

                {/* Price Display & Acquisition Buttons */}
                <div className="flex flex-col gap-space-sm pt-space-xs">
                  <div className="flex items-baseline justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
                          {formatPrice(selectedFinish.price)}
                        </span>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                          {currency} (Insured Transit Incl.)
                        </span>
                      </div>
                      <span className="text-body-sm font-body-sm text-on-surface-variant text-xs">
                        or <strong>{formatPrice(Math.round(selectedFinish.price / 12))}/month</strong> over 12 months with Atelier Reserve 0% APR.
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-label-sm uppercase tracking-widest text-tertiary">
                      <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span> Bench Ready
                    </span>
                  </div>

                  {/* Primary Actions */}
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={handleAcquireMainPiece}
                      className="w-full py-3.5 px-6 rounded bg-on-surface text-surface hover:bg-primary transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-label-md text-label-md uppercase tracking-[0.16em] font-semibold border-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                      Acquire Masterpiece
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setIs3DStudioOpen(true)}
                        className="py-2.5 px-3 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1.5 border border-outline-variant/30 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">auto_fix_high</span>
                        Customize in 3D Studio
                      </button>
                      <button
                        onClick={() => setIsSalonModalOpen(true)}
                        className="py-2.5 px-3 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-1.5 border border-outline-variant/30 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
                        Book Private Salon
                      </button>
                    </div>
                  </div>
                </div>

                {/* White-Glove Guarantee Grid */}
                <div className="pt-space-xs grid grid-cols-2 gap-3 text-on-surface-variant">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0">local_shipping</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">Malca-Amit Armored Delivery</span>
                      <span className="text-body-sm font-body-sm text-[12px] leading-tight">100% insured door-to-vault transit worldwide.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0">published_with_changes</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">Lifetime Atelier Guarantee</span>
                      <span className="text-body-sm font-body-sm text-[12px] leading-tight">Complimentary re-lacquering, sizing &amp; polish.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== INTERACTIVE DEEP-DIVE: PROVENANCE & ANATOMY ==================== */}
          <section id="provenance-section" className="w-full bg-surface-container-low py-space-xl mt-space-md border-y border-outline-variant/20">
            <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin flex flex-col gap-space-lg">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
                <div className="flex flex-col gap-1 max-w-xl">
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary font-semibold">Jaipur Royal Guild Bench Notes</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">The Anatomy of Kundan-Meenakari</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">Every Kada takes over 110 bench hours, traveling between four specialized heritage guilds across Rajasthan.</p>
                </div>

                {/* Craftsmanship Tab Triggers */}
                <div className="flex items-center gap-1 bg-surface p-1 rounded shadow-sm border border-outline-variant/30 flex-wrap">
                  {[
                    { id: 1, title: '1. Jadau Carving' },
                    { id: 2, title: '2. Kiln Meenakari' },
                    { id: 3, title: '3. Kundan Burnish' },
                    { id: 4, title: '4. Clasp Assay' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setCraftTab(tab.id)}
                      className={`px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider transition-all border-0 cursor-pointer ${
                        craftTab === tab.id ? 'bg-on-surface text-surface' : 'text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center bg-surface p-space-md lg:p-space-lg rounded-xl shadow-md border border-outline-variant/20">
                <div className="lg:col-span-5 flex flex-col gap-space-sm">
                  {craftTab === 1 && (
                    <>
                      <span className="px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-widest w-fit">
                        Stage 01 • Master Engraver (Ghaad)
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Hand-Carving the 22K Jadau Gold Skeletal Chassis
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        The foundation begins with sovereign 22-karat gold bullion forged into a rigid hollow cylinder. Master goldsmiths pierce and carve open collets (ghats) tailored precisely to the organic contour of each untreated polki diamond, leaving zero standard gaps.
                      </p>
                    </>
                  )}
                  {craftTab === 2 && (
                    <>
                      <span className="px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm uppercase tracking-widest w-fit">
                        Stage 02 • Enameler (Meenakar)
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Kiln-Firing Persian Champlevé at 800°C
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Ground vitreous glass minerals mixed with essential oils are painted into engraved recesses on the kada’s inner surface. The piece is fired up to 8 times at high heat, yielding brilliant royal emeralds and ruby hues that never tarnish with skin contact.
                      </p>
                    </>
                  )}
                  {craftTab === 3 && (
                    <>
                      <span className="px-2.5 py-1 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-widest w-fit">
                        Stage 03 • Gemsetter (Jadia)
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Kundan Pure 24K Gold Foil Burnishing
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Natural syndicate polki diamonds are positioned over reflective silver sheets (daak) to capture light. Pure hyper-refined 24-karat gold ribbons (kundan) are cold-burnished layer by layer with agate stones around the diamond borders until hermetically sealed.
                      </p>
                    </>
                  )}
                  {craftTab === 4 && (
                    <>
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase tracking-widest w-fit">
                        Stage 04 • Micro-Mechanic &amp; Assay
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Threaded Screw Clasp Integration &amp; Laser Assay
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        The kada is calibrated with a hidden gold hinge and internal threaded screw lock to ensure absolute security on the wrist. Finally, it passes laser spectrometry assay for BIS 916 purity hallmarking and GIA certification.
                      </p>
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-space-xs text-on-surface">
                    <div className="flex flex-col">
                      <span className="text-primary font-headline-sm font-semibold">110+</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Artisan Bench Hours</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-primary font-headline-sm font-semibold">91.6%</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Verified Gold Purity</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 aspect-[16/9] rounded-lg overflow-hidden bg-surface-container-high shadow-inner relative">
                  <img
                    alt="Craftsmanship Technique Visual"
                    className="w-full h-full object-cover transition-opacity duration-500"
                    src={
                      craftTab === 1
                        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDVRgvRP5KPsXXzsKbC-5CAYC_VvAD4n06x4q0-umppMJ03gH3iL47eY4W33Ms0jsiD4J3nmnx74T7KtMI72HPdVUQ9U3vpW26_oeQXwwONS8neVxKTfLEh-KhUOLjl5K5fC3QFYB0c_wJpg-E3GUBGEtFg0rChV_l3NXrJqJlMY4AgGotkfR-mFT7Bq0ShZ-TEwD6CtiWMhzbC_wROVh0Xc3bHAlYuV1rb8cvIDLOc"
                        : craftTab === 2
                        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuArOWgw1pDFs7UOdH5EBKfNhCG64r8scd0B2pTtFLJbiPAAorBDiA-PFppVhSueRlnCHWcHzIDFWJrq0siO5ThEaPMpY_jEqQgUb-B8oSwHkvbHMGW-pxK14gRW6EGk8sSUlMtBdRq0ZAQDbBbLqz18xg1KqXoKU5psQASNBNaljbEIkD7UoY2ZbRHUP0lZgv_qvJVcDXqgJqyBnRsceMj1mfQ0-wh0YmcQtI2fgRDC"
                        : craftTab === 3
                        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBjxj__vvp7bnhg6Virg24q9f4-szHvG7eXcfVzgfK7slHM3yvXo5Q-DoGUijFPYoOkwc1Rd1GlsryIug4yNXaedKt_jRvHlXoekzN-hnzi52qb1RAV86f339ciUpdrr5eN65Tn5B9iBwu2rKPdey5UHTSb_xuZFOBTdysG9e3MivtNYLgIRaxSsOQwGgIs4JcsWYkGDOaCSvF-vQNj8-E6CmKwuhRS5X3SAFULJhFD"
                        : "https://lh3.googleusercontent.com/aida-public/AB6AXuDXQ0GcGC4aNocoIUy_yrH98FPEgvQbyU_56E7j4fi_VoAveVkySG9h9m_FXebL5eK9CeNx_tRSPCb1UTioSCl6kuRmtUUUNc1VoUKq3i9qbGpQj2pQ7xBzcAYIXBO04rzAZy4NKeSh-3edqBB9JU72NvHzOTndtAu2614nYd9ocNdAaynGnU5jeK39HJRlU0MZdA66Vy7sPu3JGNaPltprr1GPvxW3tjBNPjYA4YvP"
                    }
                  />
                  <div className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded font-label-sm text-label-sm uppercase tracking-wider text-on-surface shadow-sm">
                    Archival Salon Footage #JP-72
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== CURATED COMPANION STACKING SUITE ==================== */}
          <section className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
            <div className="flex flex-col gap-space-md">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary font-semibold">Curated Atelier Harmonies</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Harmonize the Look: The Empress Arm Stack</h2>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                  Curated by our head stylist to complement the width of the Royal Nizam Kada with minimalist architectural bangles and micro-pavé diamonds.
                </p>
              </div>

              {/* 3 Stacking Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {/* Companion Item 1 */}
                <div className="rounded-lg bg-surface-container-low p-space-md flex flex-col gap-space-sm shadow-sm hover:shadow-md transition-shadow group border border-outline-variant/20">
                  <div className="aspect-[4/3] rounded overflow-hidden bg-surface-container-high relative">
                    <img
                      alt="Sleek Hammered Stacker"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZFtgcVuYs_9Tdi-dr9vWX_4IQLUt0YOd_UsSnpWaNhW-WhyN8Zkc7LFR5SyiS75JIJG0ZSwLc_gqMVq-yBgAv9_fpGhCp0_AafBBlYtdcp3hIRhKxeUKPGkYl-CQfOGOrc8irltBuc0w9JkUpknIkRxx3Hyf2qpgFSHWA1U_jNPTWzBUCtth2xIHCvyQz7H1aZkMwOKkzWWR1FWITytzWhR2tMb-qBdDLd_H62UnS"
                    />
                    <span className="absolute top-2 right-2 bg-surface/90 text-on-surface text-[10px] font-label-sm uppercase px-2 py-0.5 rounded backdrop-blur-xs">Stacker 01</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline-sm text-[18px] text-on-surface">Hammered 2.5mm Stacker</h3>
                      <span className="font-label-md text-label-md text-primary font-semibold">{formatPrice(940)}</span>
                    </div>
                    <span className="text-body-sm font-body-sm text-on-surface-variant text-xs mt-1">Solid 22K sovereign gold with hand-chiseled texture.</span>
                  </div>
                </div>

                {/* Companion Item 2 */}
                <div className="rounded-lg bg-surface-container-low p-space-md flex flex-col gap-space-sm shadow-sm hover:shadow-md transition-shadow group border border-outline-variant/20">
                  <div className="aspect-[4/3] rounded overflow-hidden bg-surface-container-high relative">
                    <img
                      alt="Aethelgard Pavé Eternity"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuALylDljaESL6WJtbMTA74_eQbCem8Pska7_QDtqnLYqmOuCBoNeA2WL_LJFLwrxEfSmWbbwHrN_j4Wj-O-TIHecf9_NvBS9Aas8_D2L0ERD1bu-mxrj6VLFCpGgAi8cVQCy9tQ6oj8qecno5pd-cgoCWlG5bhIlwDCf6AOpnbL2Z6iB0QXcXXfsWbhHtM0h4rFnjR6bEPSdf-mUqkW2YibTpxwICpArj_O1-36A46m"
                    />
                    <span className="absolute top-2 right-2 bg-surface/90 text-on-surface text-[10px] font-label-sm uppercase px-2 py-0.5 rounded backdrop-blur-xs">Stacker 02</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline-sm text-[18px] text-on-surface">Aethelgard Pavé Eternity</h3>
                      <span className="font-label-md text-label-md text-primary font-semibold">{formatPrice(2420)}</span>
                    </div>
                    <span className="text-body-sm font-body-sm text-on-surface-variant text-xs mt-1">1.80 ct F/VVS brilliant-cut micro-pavé diamonds.</span>
                  </div>
                </div>

                {/* Companion Item 3: Combined Stack Bundle Box */}
                <div className="rounded-lg bg-on-surface text-surface p-space-md flex flex-col justify-between shadow-md">
                  <div className="flex flex-col gap-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim font-semibold">Atelier Suite Bundle</span>
                    <h3 className="font-headline-sm text-headline-sm text-surface">Complete 4-Piece Empress Arm Suite</h3>
                    <p className="font-body-sm text-body-sm text-surface-variant/80 mt-1 text-xs">
                      Includes: 1x Royal Nizam Kada + 2x Hammered Stackers + 1x Aethelgard Pavé Eternity.
                    </p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-headline-md text-headline-md text-primary-fixed font-semibold">{formatPrice(8418)}</span>
                      <span className="font-body-sm text-body-sm line-through text-surface-variant/60">{formatPrice(9150)}</span>
                      <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-[10px] font-semibold uppercase">Save 8%</span>
                    </div>
                  </div>
                  <button
                    onClick={handleBundleAcquisition}
                    className="mt-4 w-full py-3 rounded bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm border-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">layers</span>
                    Acquire Curated Stack
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== MAIN COLLECTIONS PRODUCT SHOWCASE ==================== */}
          <section id="collections-section" className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
            {/* Header & Subtitle */}
            <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-outline-variant/30">
              <div>
                <h3 className="font-headline-sm text-2xl text-on-surface tracking-tight">The Imperial &amp; Modern Bangle Suites</h3>
                <p className="text-xs text-on-surface-variant font-body-sm mt-0.5">Sculpted from single ingots of 22K &amp; 18K solid precious metal in our private Jaipur &amp; Milan ateliers.</p>
              </div>
              <a href="#lookbook-section" className="text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                View Lookbook Index <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            {/* Filter Navigation Bar */}
            <div className="flex border-b border-[#e2ddd5] px-2 gap-6 overflow-x-auto mb-4">
              {[
                { id: 'all', label: 'All Collections' },
                { id: 'bridal-heritage', label: 'Bridal & Heritage Kadas' },
                { id: 'everyday-minimalist', label: 'Everyday Minimalist Stacks' },
                { id: 'temple-nakshi', label: 'Temple & Antique Nakshi' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[11px] pt-2 text-sm font-bold tracking-[0.015em] transition-all bg-transparent cursor-pointer whitespace-nowrap ${
                    categoryFilter === cat.id ? 'border-b-[#c59f59] text-[#181611]' : 'border-b-transparent text-[#89795d]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Secondary Filter Badges Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface-container-low rounded border border-outline-variant/30 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-outline">Metal Alloy:</span>
                <select
                  value={metalFilter}
                  onChange={(e) => setMetalFilter(e.target.value)}
                  className="bg-surface text-xs py-1.5 px-3 rounded border border-outline-variant/40 focus:outline-none"
                >
                  <option value="all">All Metals</option>
                  <option value="22k">22K Sovereign Gold</option>
                  <option value="18k">18K Honey Yellow</option>
                  <option value="rose">Rose Blush</option>
                </select>

                <span className="text-xs uppercase tracking-wider font-semibold text-outline ml-2">Band Profile:</span>
                <select
                  value={profileFilter}
                  onChange={(e) => setProfileFilter(e.target.value)}
                  className="bg-surface text-xs py-1.5 px-3 rounded border border-outline-variant/40 focus:outline-none"
                >
                  <option value="all">All Profiles</option>
                  <option value="2.5mm">2.5mm Sleek</option>
                  <option value="6mm">6mm Classic</option>
                  <option value="15mm">15mm Royal Kada</option>
                </select>
              </div>

              <div className="text-xs text-outline font-medium tracking-wide">
                Showing <strong>{filteredProducts.length}</strong> Masterworks
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => {
                const isSaved = wishlistItems.some(w => w.id === product.id);
                return (
                  <article
                    key={product.id}
                    className="group bg-surface-container-lowest rounded border border-outline-variant/30 overflow-hidden flex flex-col justify-between transition-all duration-300 gold-foil-hover"
                  >
                    <div>
                      {/* Image Container with Quick View Trigger */}
                      <div
                        onClick={() => setQuickViewProduct(product)}
                        className="relative overflow-hidden aspect-[4/3] bg-surface-container cursor-pointer group/img"
                      >
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          src={product.image}
                          alt={product.name}
                        />
                        {/* Hover Quick View Badge */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="bg-surface/90 text-on-surface px-3 py-1.5 rounded-full font-label-sm text-[11px] uppercase tracking-widest backdrop-blur-sm shadow flex items-center gap-1.5 font-semibold text-primary">
                            <span className="material-symbols-outlined text-[15px]">visibility</span>
                            Quick View
                          </span>
                        </div>
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className={`px-2.5 py-0.5 text-[10px] tracking-[0.14em] font-semibold uppercase rounded shadow-sm ${product.badgeClass}`}>
                            {product.tag}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] tracking-wider font-mono bg-surface-container-lowest/90 text-on-surface rounded backdrop-blur-sm">
                            {product.weight}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleWishlist(product);
                          }}
                          className="absolute top-3 right-3 size-8 rounded-full bg-surface-container-lowest/80 text-on-surface hover:text-primary backdrop-blur-sm flex items-center justify-center transition shadow-sm border-0 cursor-pointer"
                          title="Save to Wishlist Vault"
                        >
                          <span className="material-symbols-outlined text-base" style={{ color: isSaved ? '#775a19' : 'inherit' }}>
                            {isSaved ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>
                      </div>

                      {/* Details */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4
                            onClick={() => setQuickViewProduct(product)}
                            className="font-headline-sm text-lg text-on-surface leading-snug group-hover:text-primary transition cursor-pointer"
                          >
                            {product.name}
                          </h4>
                          <span className="font-headline-sm text-lg font-medium text-on-surface shrink-0">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant font-body-sm line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-outline font-medium">
                          <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-primary-container"></span> {product.width}</span>
                          <span>•</span>
                          <span>{product.clasp}</span>
                          <span>•</span>
                          <span className="text-tertiary font-semibold">{product.stock}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-0 mt-auto flex items-center gap-2">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="py-2 px-3 bg-surface-container text-on-surface hover:bg-surface-container-high transition text-xs font-semibold uppercase tracking-wider rounded text-center border border-outline-variant/30 cursor-pointer"
                        title="Quick View Details"
                      >
                        Quick View
                      </button>
                      <button
                        onClick={() => {
                          setIs3DStudioOpen(true);
                          setTimeout(() => {
                            const el = document.getElementById('custom-studio-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="flex-1 py-2 px-3 bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary-container transition text-xs font-semibold uppercase tracking-wider rounded text-center border-0 cursor-pointer"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="py-2 px-3.5 bg-on-surface text-surface-container-lowest hover:bg-primary transition text-xs font-semibold uppercase tracking-wider rounded border-0 cursor-pointer"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* ==================== CURATE YOUR DREAM WRIST STACK LOOKBOOK ==================== */}
          <section id="lookbook-section" className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin my-12 p-8 lg:p-12 bg-surface-container-low rounded border border-outline-variant/40">
            <div className="max-w-2xl mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Atelier Styling Masterclass</span>
              <h3 className="font-headline-md text-3xl text-on-surface mt-1 mb-2">Curate Your Dream Wrist Stack</h3>
              <p className="text-xs text-on-surface-variant font-body-sm">
                The art of the royal wrist lies in deliberate contrast: balancing weighty heritage kadas with razor-fine pavé diamond bands and hammered gold spacer rings.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stack Formula 1 */}
              <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-primary-fixed text-on-primary-fixed rounded">Stack 01</span>
                    <span className="text-xs font-mono font-medium text-outline">5 Pieces Total</span>
                  </div>
                  <h4 className="font-headline-sm text-xl text-on-surface mb-2">The Imperial Heritage Stack</h4>
                  <p className="text-xs text-on-surface-variant font-body-sm mb-4">
                    Anchored by the Nizam Polki Kada at the center, flanked symmetrically by two Vedic Sun filigree cuffs and framed by dual 2.5mm hammered gold spacers.
                  </p>
                  <ul className="text-xs space-y-2 mb-6 border-t border-outline-variant/30 pt-3 text-on-surface-variant">
                    <li className="flex items-center justify-between">
                      <span>1x Royal Nizam Kada (22K)</span>
                      <span className="font-mono text-on-surface font-medium">{formatPrice(4850)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>2x Vedic Sun Bangles (22K)</span>
                      <span className="font-mono text-on-surface font-medium">{formatPrice(7380)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>2x Sleek Hammered 2.5mm (22K)</span>
                      <span className="font-mono text-on-surface font-medium">{formatPrice(1880)}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-outline-variant/30">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-outline font-semibold">Ensemble Value:</span>
                    <span className="font-headline-sm text-xl font-semibold text-on-surface">{formatPrice(14110)}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart({
                        id: 'imperial-heritage-stack-bundle',
                        name: 'The Imperial Heritage Stack (5 Pieces)',
                        price: 14110,
                        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
                        size: '2-6',
                        metal: '22K Sovereign Gold',
                        engraving: 'Heritage Ensemble'
                      });
                    }}
                    className="w-full py-2.5 px-4 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-xs font-semibold uppercase tracking-wider rounded transition border-0 cursor-pointer"
                  >
                    Load Stack into Studio Customizer
                  </button>
                </div>
              </div>

              {/* Stack Formula 2 */}
              <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-secondary-fixed text-on-secondary-fixed rounded">Stack 02</span>
                    <span className="text-xs font-mono font-medium text-outline">3 Pieces Total</span>
                  </div>
                  <h4 className="font-headline-sm text-xl text-on-surface mb-2">The Contemporary Diamond Stack</h4>
                  <p className="text-xs text-on-surface-variant font-body-sm mb-4">
                    A tri-tone symphony of modern geometric grace: alternating 18K Rose Blush Fluted Torque cuffs with twin Aethelgard Pavé Eternity diamond bands.
                  </p>
                  <ul className="text-xs space-y-2 mb-6 border-t border-outline-variant/30 pt-3 text-on-surface-variant">
                    <li className="flex items-center justify-between">
                      <span>2x Aethelgard Pavé Eternity (18K)</span>
                      <span className="font-mono text-on-surface font-medium">{formatPrice(4840)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>1x Lumière Fluted Torque Cuff (18K)</span>
                      <span className="font-mono text-on-surface font-medium">{formatPrice(1980)}</span>
                    </li>
                    <li className="flex items-center justify-between text-outline">
                      <span>Complimentary Stack Interlocking Kit</span>
                      <span className="font-mono text-tertiary font-semibold">Included</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-outline-variant/30">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-outline font-semibold">Ensemble Value:</span>
                    <span className="font-headline-sm text-xl font-semibold text-on-surface">{formatPrice(6820)}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart({
                        id: 'contemporary-diamond-stack-bundle',
                        name: 'The Contemporary Diamond Stack (3 Pieces)',
                        price: 6820,
                        image: 'https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=600&q=80',
                        size: '2-6',
                        metal: '18K Honey & Rose Gold',
                        engraving: 'Diamond Trio'
                      });
                    }}
                    className="w-full py-2.5 px-4 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-xs font-semibold uppercase tracking-wider rounded transition border-0 cursor-pointer"
                  >
                    Load Stack into Studio Customizer
                  </button>
                </div>
              </div>

              {/* Stack Formula 3 */}
              <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-primary text-on-primary rounded">Stack 03</span>
                    <span className="text-xs font-mono font-medium text-outline">7-Tier Auspicious Set</span>
                  </div>
                  <h4 className="font-headline-sm text-xl text-on-surface mb-2">The Royal Bridal Chooda Symphony</h4>
                  <p className="text-xs text-on-surface-variant font-body-sm mb-4">
                    The pinnacle auspicious bridal heirloom: full matching Devi Filigree pair encasing traditional red lac accents and five micro-engraved gold bands.
                  </p>
                  <ul className="text-xs space-y-2 mb-6 border-t border-outline-variant/30 pt-3 text-on-surface-variant">
                    <li className="flex items-center justify-between">
                      <span>1x Devi Bridal Chooda Pair (22K)</span>
                      <span className="font-mono text-on-surface font-medium">{formatPrice(5200)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>4x Sleek Hammered 2.5mm (22K)</span>
                      <span className="font-mono text-on-surface font-medium">{formatPrice(3760)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>1x Royal Nizam Center Kada (22K)</span>
                      <span className="font-mono text-on-surface font-medium">{formatPrice(4850)}</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-outline-variant/30">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-outline font-semibold">Ensemble Value:</span>
                    <span className="font-headline-sm text-xl font-semibold text-on-surface">{formatPrice(13810)}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart({
                        id: 'bridal-chooda-symphony-bundle',
                        name: 'The Royal Bridal Chooda Symphony (7-Tier)',
                        price: 13810,
                        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
                        size: '2-6',
                        metal: '22K Sovereign Gold',
                        engraving: 'Bridal Symphony'
                      });
                    }}
                    className="w-full py-2.5 px-4 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-xs font-semibold uppercase tracking-wider rounded transition border-0 cursor-pointer"
                  >
                    Load Stack into Studio Customizer
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== 3D BESPOKE STUDIO DRAWER / ACCORDION ==================== */}
          {is3DStudioOpen && (
            <section id="custom-studio-section" className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-space-md">
              <div className="p-4 bg-surface rounded-xl border border-primary shadow-lg mb-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">auto_fix_high</span>
                  <span className="font-headline-sm text-base text-on-surface">Interactive 3D Bangle Customizer Studio Active</span>
                </div>
                <button
                  onClick={() => setIs3DStudioOpen(false)}
                  className="px-3 py-1 bg-surface-container rounded text-xs uppercase font-semibold text-on-surface hover:bg-surface-container-high border-0 cursor-pointer"
                >
                  Close Studio ✕
                </button>
              </div>
              <CustomizerStudio
                onAddToCart={(item) => {
                  setCartItems(prev => [...prev, item]);
                  setIsCartOpen(true);
                }}
                onOpenSizeGuide={() => setIsMandrelOpen(true)}
              />
            </section>
          )}

          {/* ==================== 4. ABOUT MAISON AURA & KARAT ==================== */}
          <section id="about-section" className="w-full bg-surface-container-low py-16 lg:py-24 border-y border-outline-variant/20">
            <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/30">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                    alt="Master Goldsmiths of Jaipur Bench"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-surface p-6 rounded-xl shadow-xl border border-primary/30 max-w-xs hidden sm:block">
                  <span className="font-headline-md text-3xl font-bold text-primary block">100+</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-on-surface mt-1 block">Artisan Bench Hours</span>
                  <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">Every piece is hand-carved, kiln-fired, and cold-burnished by hereditary Rajasthani guilds.</p>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col gap-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface rounded-full text-primary font-label-sm text-label-sm uppercase tracking-widest border border-outline-variant/30 w-fit">
                  <span className="material-symbols-outlined text-[14px]">history_edu</span>
                  About Maison Aura &amp; Karat
                </span>

                <h2 className="font-headline-md text-3xl lg:text-4xl text-on-surface leading-tight">
                  Two Centuries of Sacred Craft, <br />
                  <span className="italic font-headline-md text-primary">Reimagined for the Modern Woman</span>
                </h2>

                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                  Founded upon the sacred premise that a bangle is never merely an ornament, but an auspicious circle of strength, identity, and personal history. For four generations, our family ateliers in Jaipur and Milan have preserved the rare champlevé kiln enamel and syndicate polki Jadau techniques once commissioned exclusively by imperial royal courts.
                </p>

                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                  Unlike mass-produced circular slip-on bangles that bruise knuckles and fit poorly, Aura &amp; Karat pioneers bespoke millimeter mandrel calibration with concealed ergonomic hinges and threaded screw locks—ensuring lifelong comfort on any wrist.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-outline-variant/20">
                  <div>
                    <span className="font-headline-sm text-lg font-bold text-on-surface block">100% Ethical</span>
                    <span className="text-xs text-on-surface-variant">Kimberley certified rough polki diamonds.</span>
                  </div>
                  <div>
                    <span className="font-headline-sm text-lg font-bold text-on-surface block">BIS 916 Assay</span>
                    <span className="text-xs text-on-surface-variant">Laser hallmarked pure 22K and 18K alloys.</span>
                  </div>
                  <div>
                    <span className="font-headline-sm text-lg font-bold text-on-surface block">Lifetime Polish</span>
                    <span className="text-xs text-on-surface-variant">Complimentary lifelong salon re-lacquering.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== 5. CONTACT & PRIVATE SALON SECTION ==================== */}
          <section id="contact-section" className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Contact Information, Salons & Direct WhatsApp */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-primary font-label-sm text-label-sm uppercase tracking-widest border border-outline-variant/30 mb-3">
                    <span className="material-symbols-outlined text-[14px]">support_agent</span>
                    Atelier Concierge &amp; Private Salons
                  </span>
                  <h2 className="font-headline-md text-3xl text-on-surface">
                    Connect With Our <span className="italic font-headline-md text-primary">Master Gemologists</span>
                  </h2>
                  <p className="font-body-md text-on-surface-variant text-sm mt-2 leading-relaxed">
                    Whether you desire a custom bridal chooda consultation, heirloom bangle restoration, or private salon viewing in London, Geneva, or Mumbai—we are at your service.
                  </p>
                </div>

                {/* Direct Contact Cards */}
                <div className="space-y-4">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[#25d366]/10 border border-[#25d366]/30 hover:bg-[#25d366]/20 transition flex items-center gap-4 text-on-surface group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[24px]">chat</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#1ea952] block">Instant WhatsApp Concierge</span>
                      <span className="font-headline-sm text-base font-bold">+91 98765 43210</span>
                      <span className="text-xs text-on-surface-variant block">Typical response time: Under 15 minutes</span>
                    </div>
                  </a>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface text-primary flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">mail</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-primary block">Private Atelier Desk</span>
                      <span className="font-headline-sm text-base font-bold">concierge@aurakarat.com</span>
                      <span className="text-xs text-on-surface-variant block">Encrypted quotes &amp; CAD render dispatches</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface text-primary flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">location_on</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-primary block">Global Atelier Salons</span>
                      <span className="text-xs font-semibold text-on-surface block mt-0.5">London (Mayfair) • Mumbai (Bandra West) • Geneva (Rue du Rhône)</span>
                      <span className="text-xs text-on-surface-variant block">Private viewing strictly by advance reservation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Bespoke Inquiry Form */}
              <div className="lg:col-span-7 bg-surface rounded-2xl p-8 lg:p-10 shadow-lg border border-outline-variant/30">
                <h3 className="font-headline-sm text-2xl text-on-surface mb-1">
                  Request a Bespoke Commission
                </h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  Please share your vision. A senior jewellery curator will prepare complimentary CAD concepts and ingot spot valuations.
                </p>

                {contactSubmitted ? (
                  <div className="p-8 text-center bg-surface-container-low rounded-xl border border-primary/40 space-y-3">
                    <span className="material-symbols-outlined text-4xl text-primary">verified</span>
                    <h4 className="font-headline-sm text-xl text-on-surface">Thank You, Lady &amp; Karat Patron</h4>
                    <p className="text-xs text-on-surface-variant max-w-md mx-auto">
                      Your bespoke inquiry has been delivered directly to our head gemologist. We will coordinate your private salon session via WhatsApp and email within 2 hours.
                    </p>
                    <button
                      onClick={() => setContactSubmitted(false)}
                      className="mt-3 px-4 py-2 bg-on-surface text-surface text-xs uppercase font-bold tracking-wider rounded border-0 cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSubmitted(true);
                      showToast('✨ Your commission request has been received.');
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1.5">Your Full Name *</label>
                        <input
                          required
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Lady Katherine / Pooja Sharma"
                          className="w-full text-xs p-3 rounded-lg bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1.5">Mobile / WhatsApp *</label>
                        <input
                          required
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+91 98765 43210 / +44 20 7946 0912"
                          className="w-full text-xs p-3 rounded-lg bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1.5">Email Address *</label>
                        <input
                          required
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="katherine@domain.com"
                          className="w-full text-xs p-3 rounded-lg bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1.5">Target Occasion / Celebration</label>
                        <select
                          value={contactForm.occasion}
                          onChange={(e) => setContactForm({ ...contactForm, occasion: e.target.value })}
                          className="w-full text-xs p-3 rounded-lg bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option>Bridal Wedding Suite</option>
                          <option>Sangeet / Mehendi Auspicious Set</option>
                          <option>Festive Diwali / Eid Royal Stacks</option>
                          <option>Everyday 18K Diamond Cuffs</option>
                          <option>Heirloom Restoration &amp; Remount</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1.5">Preferred Viewing Salon</label>
                      <select
                        value={contactForm.city}
                        onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                        className="w-full text-xs p-3 rounded-lg bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option>Virtual Encrypted 4K Gemologist Session</option>
                        <option>London Salon (Mayfair)</option>
                        <option>Mumbai Atelier (Bandra West)</option>
                        <option>Geneva Salon (Rue du Rhône)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1.5">Specific Requests or Wrist Measurements</label>
                      <textarea
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your preferred metal karat, diamond clarity, lehenga color matching, or exact wrist millimeters..."
                        className="w-full text-xs p-3 rounded-lg bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-lg bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-all text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-md border-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      Submit Bespoke Commission Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* ==================== SIZING MANDREL MODAL ==================== */}
      {isMandrelOpen && (
        <SizeGuideModal
          onClose={() => setIsMandrelOpen(false)}
          onSelectSize={(sz) => {
            const mmMap = {
              '2-2': '54.0 mm',
              '2-4': '57.2 mm',
              '2-6': '60.3 mm',
              '2-8': '63.5 mm',
              '2-10': '66.7 mm'
            };
            setSelectedSize({ id: sz, mm: mmMap[sz] || '60.3 mm', label: 'calibrated from precision mandrel' });
            showToast(`Applied calibrated size ${sz} to your piece`);
          }}
        />
      )}

      {/* ==================== PRODUCT QUICK VIEW MODAL ==================== */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(item) => {
            handleAddToCart(item);
            setQuickViewProduct(null);
          }}
          onCustomize={(prod) => {
            setQuickViewProduct(null);
            setIs3DStudioOpen(true);
            setTimeout(() => {
              const el = document.getElementById('custom-studio-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistItems.some(w => w.id === quickViewProduct.id)}
          onOpenSizeGuide={() => setIsMandrelOpen(true)}
          formatPrice={formatPrice}
        />
      )}

      {/* ==================== PRIVATE SALON APPOINTMENT MODAL ==================== */}
      {isSalonModalOpen && (
        <div className="modal-overlay" onClick={() => setIsSalonModalOpen(false)}>
          <div
            className="bg-surface rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-outline-variant/30 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface bg-transparent border-0 cursor-pointer"
              onClick={() => setIsSalonModalOpen(false)}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Private Client Salon</span>
              <h3 className="font-headline-sm text-lg text-on-surface">Book Private Atelier Viewing</h3>
              <p className="text-xs text-on-surface-variant">
                Experience our imperial bangles in London, Geneva, or Mumbai salons, or schedule an encrypted high-definition virtual gemologist viewing.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('✨ Private Salon Concierge will contact you within 2 hours to confirm your reservation.');
                setIsSalonModalOpen(false);
              }}
              className="flex flex-col gap-3"
            >
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">Your Full Name</label>
                <input required type="text" placeholder="e.g. Lady Katherine / Pooja Sharma" className="w-full text-xs p-2.5 rounded bg-surface-container-low border border-outline-variant/40" />
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">Mobile / WhatsApp Number</label>
                <input required type="tel" placeholder="+91 98765 43210 / +44 20 7946 0912" className="w-full text-xs p-2.5 rounded bg-surface-container-low border border-outline-variant/40" />
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">Preferred Salon City</label>
                <select className="w-full text-xs p-2.5 rounded bg-surface-container-low border border-outline-variant/40">
                  <option>London (Mayfair Salon)</option>
                  <option>Geneva (Rue du Rhône)</option>
                  <option>Mumbai (Bandra West Atelier)</option>
                  <option>Virtual Encrypted 4K Gemologist Session</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider rounded border-0 cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-all mt-2">
                Confirm Private Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== BESPOKE CART & WHATSAPP DRAWER ==================== */}
      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div
            className="fixed top-0 right-0 bottom-0 w-full max-w-md h-full bg-surface shadow-2xl p-6 flex flex-col justify-between border-l border-outline-variant/30 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
                  <h3 className="font-headline-sm text-lg text-on-surface">Bespoke Acquisition Bag</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-transparent border-0 cursor-pointer text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Items List */}
              <div className="py-4 flex flex-col gap-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl text-outline mb-2">shopping_bag</span>
                    <p className="text-xs font-medium">Your salon acquisition bag is empty.</p>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 pb-3 border-b border-outline-variant/20">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover bg-surface-container shrink-0" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-on-surface leading-tight">{item.name}</h4>
                          <button
                            onClick={() => setCartItems(prev => prev.filter((_, i) => i !== idx))}
                            className="bg-transparent border-0 cursor-pointer text-outline hover:text-primary text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        {item.specs && (
                          <p className="text-[10px] text-on-surface-variant">
                            {item.specs.size && `Size: ${item.specs.size} • `}
                            {item.specs.metal && `${item.specs.metal}`}
                            {item.specs.engraving && ` • Inscription: "${item.specs.engraving}"`}
                          </p>
                        )}
                        <span className="text-xs font-semibold text-primary">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-outline font-semibold">Total Valuation:</span>
                  <span className="font-headline-md text-xl font-bold text-on-surface">{formatPrice(cartTotalUsd)}</span>
                </div>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 bg-[#25d366] text-white hover:bg-[#20ba5a] text-xs font-bold uppercase tracking-widest rounded shadow flex items-center justify-center gap-2 border-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Direct Order Via WhatsApp
                </button>
                <button
                  onClick={() => {
                    alert('✨ Thank you for your commission reservation. Your private invoice has been logged.');
                    setCartItems([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-3 bg-on-surface text-surface hover:bg-primary text-xs font-bold uppercase tracking-widest rounded shadow flex items-center justify-center gap-2 border-0 cursor-pointer"
                >
                  Secure Salon Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== WISHLIST DRAWER ==================== */}
      {isWishlistOpen && (
        <div className="modal-overlay" onClick={() => setIsWishlistOpen(false)}>
          <div
            className="fixed top-0 right-0 bottom-0 w-full max-w-md h-full bg-surface shadow-2xl p-6 flex flex-col justify-between border-l border-outline-variant/30 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">favorite</span>
                  <h3 className="font-headline-sm text-lg text-on-surface">Private Wishlist Vault</h3>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-transparent border-0 cursor-pointer text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="py-4 flex flex-col gap-4">
                {wishlistItems.length === 0 ? (
                  <p className="text-center py-12 text-xs text-on-surface-variant">No pieces saved in your vault.</p>
                ) : (
                  wishlistItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 pb-3 border-b border-outline-variant/20 items-center justify-between">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover bg-surface-container shrink-0" />
                      <div className="flex-1 px-2">
                        <h4 className="text-xs font-bold text-on-surface">{item.name}</h4>
                        <span className="text-xs font-semibold text-primary">{formatPrice(item.price)}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleAddToCart(item);
                          setWishlistItems(prev => prev.filter((_, i) => i !== idx));
                        }}
                        className="py-1 px-2.5 bg-primary text-on-primary text-[10px] uppercase font-bold rounded border-0 cursor-pointer"
                      >
                        Move to Bag
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-2.5 bg-surface-container text-on-surface text-xs uppercase font-semibold rounded border-0 cursor-pointer"
            >
              Close Vault
            </button>
          </div>
        </div>
      )}

      {/* ==================== LUXURY ATELIER FOOTER ==================== */}
      <footer className="bg-inverse-surface text-inverse-on-surface border-t border-outline-variant/20 pt-16 pb-12 font-body-sm mt-auto">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-inverse-primary">
                <div className="size-4">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h5 className="text-sm font-bold tracking-widest uppercase">Aura &amp; Karat</h5>
              </div>
              <p className="text-xs text-outline-variant leading-relaxed">
                Haute joaillerie maison preserving the sacred heritage of royal goldsmithing, Syndicate polki diamonds, and architectural modern elegance.
              </p>
              <div className="pt-2 space-y-1 text-xs text-outline-variant">
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[15px] text-inverse-primary">call</span>
                  <a href="tel:+919876543210" className="hover:text-inverse-primary transition text-outline-variant">+91 98765 43210 / +44 20 7946 0912</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[15px] text-inverse-primary">mail</span>
                  <a href="mailto:concierge@aurakarat.com" className="hover:text-inverse-primary transition text-outline-variant">concierge@aurakarat.com</a>
                </p>
                <p className="flex items-center gap-2 text-[11px] text-outline font-mono">
                  <span className="material-symbols-outlined text-[15px] text-inverse-primary">location_on</span>
                  Salons: London • Mumbai • Geneva
                </p>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2 text-inverse-primary">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" title="Instagram">
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" title="WhatsApp Concierge">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" title="Pinterest Lookbook">
                  <span className="material-symbols-outlined text-[18px]">collections</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" title="Jaipur Bench Documentaries">
                  <span className="material-symbols-outlined text-[18px]">smart_display</span>
                </a>
              </div>
            </div>
            <div>
              <h6 className="text-xs font-semibold uppercase tracking-widest text-inverse-primary mb-4">High Jewelry</h6>
              <ul className="space-y-2 text-xs text-outline-variant list-none p-0">
                <li><a className="hover:text-inverse-primary transition" href="#">The Bangle Chronicles</a></li>
                <li><a className="hover:text-inverse-primary transition" href="#">Polki Bridal Chokers</a></li>
                <li><a className="hover:text-inverse-primary transition" href="#">Solitaire Signet Bands</a></li>
                <li><a className="hover:text-inverse-primary transition" href="#">Temple Nakshi Amulets</a></li>
                <li><a className="hover:text-inverse-primary transition" href="#">Certified Solitaire Vault</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-xs font-semibold uppercase tracking-widest text-inverse-primary mb-4">Atelier Services</h6>
              <ul className="space-y-2 text-xs text-outline-variant list-none p-0">
                <li><button onClick={() => setIs3DStudioOpen(true)} className="hover:text-inverse-primary transition bg-transparent border-0 text-left cursor-pointer p-0 text-xs text-outline-variant">Custom Atelier Studio</button></li>
                <li><button onClick={() => setIsSalonModalOpen(true)} className="hover:text-inverse-primary transition bg-transparent border-0 text-left cursor-pointer p-0 text-xs text-outline-variant">Private Gemologist Concierge</button></li>
                <li><a className="hover:text-inverse-primary transition" href="#">Gold Purity Assay Testing</a></li>
                <li><button onClick={() => setIsMandrelOpen(true)} className="hover:text-inverse-primary transition bg-transparent border-0 text-left cursor-pointer p-0 text-xs text-outline-variant">Complimentary Wrist Fitting</button></li>
                <li><a className="hover:text-inverse-primary transition" href="#">Heritage Heirloom Restoration</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-xs font-semibold uppercase tracking-widest text-inverse-primary mb-4">Atelier Dispatch</h6>
              <p className="text-xs text-outline-variant mb-3">
                Receive private exhibition invitations, seasonal catalogue releases, and bespoke ingot spot notifications.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('✨ Thank you for subscribing to Aura & Karat Atelier Dispatch.'); }} className="flex items-center">
                <input required className="bg-inverse-surface border border-outline-variant/40 text-xs px-3 py-2 rounded-l text-inverse-on-surface focus:outline-none focus:border-inverse-primary w-full" placeholder="Your email address" type="email"/>
                <button type="submit" className="bg-primary text-on-primary px-3 py-2 text-xs font-semibold rounded-r uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition border-0 cursor-pointer">
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-outline-variant/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-outline">
            <p>© 2026 Maison Aura &amp; Karat. All Rights Reserved. Hallmarked by State Assay &amp; GIA Accredited.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a className="hover:text-inverse-on-surface transition" href="#">Purity Assurance</a>
              <a className="hover:text-inverse-on-surface transition" href="#">Ethical Sourcing</a>
              <a className="hover:text-inverse-on-surface transition" href="#">Vault Security</a>
              <a className="hover:text-inverse-on-surface transition" href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
