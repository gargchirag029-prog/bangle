import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Star,
  Check,
  Crown,
  Layers,
  Palette,
  Gem,
  ShieldAlert,
  Watch,
  SlidersHorizontal
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/banglesData';

export default function CatalogSection({
  onQuickView,
  onAddToCart,
  onCustomize,
  onToggleWishlist,
  wishlistIds
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under-2000', '2000-4000', 'above-4000'
  const [customizableOnly, setCustomizableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Category Icon Map
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Crown': return <Crown size={15} />;
      case 'Gem': return <Gem size={15} />;
      case 'Palette': return <Palette size={15} />;
      case 'Layers': return <Layers size={15} />;
      case 'ShieldAlert': return <ShieldAlert size={15} />;
      case 'Watch': return <Watch size={15} />;
      default: return <Sparkles size={15} />;
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.metal.toLowerCase().includes(q) ||
        p.stoneType.toLowerCase().includes(q)
      );
    }

    // Size Filter
    if (selectedSizeFilter !== 'all') {
      result = result.filter(p => p.sizes.includes(selectedSizeFilter));
    }

    // Price Filter
    if (priceRange === 'under-2000') {
      result = result.filter(p => p.price < 2000);
    } else if (priceRange === '2000-4000') {
      result = result.filter(p => p.price >= 2000 && p.price <= 4000);
    } else if (priceRange === 'above-4000') {
      result = result.filter(p => p.price > 4000);
    }

    // Customizable Only
    if (customizableOnly) {
      result = result.filter(p => p.customizable);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, selectedSizeFilter, priceRange, customizableOnly, sortBy]);

  return (
    <div className="section-padding" id="catalog-section" style={{ background: '#fdfbf7' }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <div className="badge-gold" style={{ marginBottom: '12px' }}>
            <Crown size={14} /> Curated Collections
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--crimson-900)', marginBottom: '12px' }}>
            Explore Royal <span className="gold-text">Bangle Styles</span>
          </h2>
          <p style={{ color: 'var(--stone-600)', fontSize: '1.02rem' }}>
            From ceremonial bridal choodas to everyday minimal cuffs, discover authentic Indian craftsmanship
            with ready designs and bespoke customizer options.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '28px',
          scrollbarWidth: 'none'
        }}>
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  border: isSelected ? '2px solid var(--gold-500)' : '1px solid var(--cream-300)',
                  background: isSelected ? 'var(--gold-foil)' : '#ffffff',
                  color: isSelected ? '#2b1a03' : 'var(--stone-700)',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : 'var(--shadow-sm)'
                }}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
                {cat.badge && (
                  <span style={{
                    fontSize: '0.68rem',
                    background: isSelected ? 'rgba(0,0,0,0.15)' : 'var(--crimson-100)',
                    color: isSelected ? '#000' : 'var(--crimson-800)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 700
                  }}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search & Filter Toolbar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid var(--cream-200)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '32px'
        }}>
          {/* Search Bar */}
          <div style={{
            position: 'relative',
            flex: '1 1 280px',
            maxWidth: '400px'
          }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--stone-400)' }}
            />
            <input
              type="text"
              placeholder="Search by name, stone, metal (e.g. Emerald, Polki, Chooda)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 40px',
                borderRadius: '10px',
                border: '1px solid var(--cream-300)',
                fontSize: '0.88rem',
                background: 'var(--cream-50)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '0.8rem',
                  color: '#999',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            {/* Size Filter */}
            <select
              value={selectedSizeFilter}
              onChange={(e) => setSelectedSizeFilter(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--cream-300)',
                fontSize: '0.85rem',
                background: '#fff',
                color: 'var(--stone-800)',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Sizes</option>
              <option value="2.2">Size 2.2 (XS)</option>
              <option value="2.4">Size 2.4 (S)</option>
              <option value="2.6">Size 2.6 (M)</option>
              <option value="2.8">Size 2.8 (L)</option>
              <option value="2.10">Size 2.10 (XL)</option>
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--cream-300)',
                fontSize: '0.85rem',
                background: '#fff',
                color: 'var(--stone-800)',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Prices</option>
              <option value="under-2000">Under ₹2,000</option>
              <option value="2000-4000">₹2,000 - ₹4,000</option>
              <option value="above-4000">Above ₹4,000</option>
            </select>

            {/* Customizable Checkbox */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--crimson-900)',
              cursor: 'pointer',
              background: 'var(--cream-100)',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--cream-300)'
            }}>
              <input
                type="checkbox"
                checked={customizableOnly}
                onChange={(e) => setCustomizableOnly(e.target.checked)}
                style={{ accentColor: 'var(--crimson-800)' }}
              />
              <Sparkles size={14} color="var(--gold-600)" /> Customizable Only
            </label>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--cream-300)',
                fontSize: '0.85rem',
                background: '#fff',
                color: 'var(--stone-800)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '0.85rem', color: 'var(--stone-600)' }}>
          <span>Showing <strong>{filteredProducts.length}</strong> artisanal styles</span>
          {(searchQuery || selectedCategory !== 'all' || selectedSizeFilter !== 'all' || priceRange !== 'all' || customizableOnly) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedSizeFilter('all');
                setPriceRange('all');
                setCustomizableOnly(false);
              }}
              style={{ background: 'none', border: 'none', color: 'var(--crimson-700)', cursor: 'pointer', fontWeight: 600 }}
            >
              Reset Filters ✕
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px dashed var(--cream-300)'
          }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--stone-700)', marginBottom: '8px' }}>
              No bangles found matching your filter criteria.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--stone-500)', marginBottom: '16px' }}>
              Try searching with different terms or reset your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedSizeFilter('all');
                setPriceRange('all');
                setCustomizableOnly(false);
              }}
              className="btn-gold"
            >
              View All Bangles
            </button>
          </div>
        ) : (
          <div className="grid-catalog">
            {filteredProducts.map(product => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="royal-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {/* Image Container with Badges */}
                  <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', background: '#f5efe4' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />

                    {/* Tag Badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#641220',
                        color: '#fff',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }}
                    >
                      {product.tag}
                    </span>

                    {/* Customizable Badge */}
                    {product.customizable && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.92)',
                          color: 'var(--crimson-900)',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Sparkles size={11} color="var(--gold-600)" /> Customizer Ready
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '34px',
                        height: '34px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        color: isWishlisted ? 'var(--crimson-700)' : 'var(--stone-600)'
                      }}
                    >
                      <Heart size={16} fill={isWishlisted ? 'var(--crimson-700)' : 'none'} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* Rating & Reviews */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      <Star size={13} fill="var(--gold-500)" color="var(--gold-500)" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--stone-800)' }}>
                        {product.rating}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--stone-500)' }}>
                        ({product.reviewCount})
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onQuickView(product)}
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: 'var(--crimson-900)',
                        marginBottom: '8px',
                        cursor: 'pointer',
                        lineHeight: 1.3
                      }}
                    >
                      {product.name}
                    </h3>

                    {/* Sizes available pill list */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--stone-500)', marginRight: '4px' }}>Sizes:</span>
                      {product.sizes.map(s => (
                        <span
                          key={s}
                          style={{
                            fontSize: '0.68rem',
                            padding: '1px 5px',
                            background: 'var(--cream-100)',
                            borderRadius: '4px',
                            border: '1px solid var(--cream-300)',
                            fontWeight: 600
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Price row */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px', marginTop: 'auto' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--crimson-900)', fontFamily: 'var(--font-royal)' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span style={{ fontSize: '0.85rem', color: '#999', textDecoration: 'line-through' }}>
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => onQuickView(product)}
                          className="btn-outline-gold"
                          style={{ flex: 1, padding: '8px 10px', fontSize: '0.82rem' }}
                        >
                          <Eye size={14} /> Quick View
                        </button>

                        <button
                          onClick={() => onAddToCart({
                            id: `${product.id}-${product.sizes[0] || '2.6'}`,
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            originalPrice: product.originalPrice,
                            image: product.image,
                            quantity: 1,
                            isCustom: false,
                            specs: {
                              size: product.sizes[0] || '2.6',
                              metal: product.metal,
                              stoneType: product.stoneType,
                              leadTime: product.leadTime
                            }
                          })}
                          className="btn-gold"
                          style={{ flex: 1, padding: '8px 10px', fontSize: '0.82rem' }}
                        >
                          <ShoppingBag size={14} /> Add to Bag
                        </button>
                      </div>

                      {product.customizable && (
                        <button
                          onClick={() => onCustomize(product)}
                          style={{
                            width: '100%',
                            background: 'var(--cream-100)',
                            border: '1px dashed var(--gold-600)',
                            borderRadius: '8px',
                            color: 'var(--crimson-800)',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            padding: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <Sparkles size={12} color="var(--gold-600)" /> Customize In 3D Studio
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
