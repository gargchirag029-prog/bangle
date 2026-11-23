// Comprehensive data for Kangan Mandir Artisanal Bangles & Custom Studio

export const CATEGORIES = [
  {
    id: "all",
    name: "All Collections",
    icon: "Sparkles",
    count: 18,
    description: "Explore our entire collection of handcrafted Indian bangles and kadas."
  },
  {
    id: "bridal-chooda",
    name: "Bridal Chooda & Sets",
    icon: "Crown",
    count: 4,
    badge: "Trending",
    description: "Traditional Punjabi & Rajasthani bridal choodas with kadas, pearls, and latkan kalire."
  },
  {
    id: "kundan-polki",
    name: "Kundan & Polki Kadas",
    icon: "Gem",
    count: 4,
    badge: "Royal Heirloom",
    description: "Handcrafted Jadau uncut polki stones set in pure 22K antique gold finish with meenakari."
  },
  {
    id: "silk-thread",
    name: "Silk Thread & Festive",
    icon: "Palette",
    count: 3,
    badge: "Hand-Woven",
    description: "Vibrant resham silk thread wound meticulously around sturdy bases, adorned with moti and zardozi."
  },
  {
    id: "glass-velvet",
    name: "Glass & Velvet Chooriyan",
    icon: "Layers",
    count: 3,
    badge: "Traditional",
    description: "Authentic Firozabad sound glass bangles and soft velvet shimmer sets for weddings and festivals."
  },
  {
    id: "temple-antique",
    name: "Temple & Antique Brass",
    icon: "ShieldAlert",
    count: 2,
    badge: "Heritage",
    description: "South Indian temple jewelry kadas featuring Goddess Laxmi, peacocks, and floral motifs."
  },
  {
    id: "daily-minimal",
    name: "Everyday Minimalist",
    icon: "Watch",
    count: 2,
    badge: "Modern",
    description: "Sleek openable kadas, rose gold cuffs, and zircon line bangles crafted for daily grace."
  }
];

export const PRODUCTS = [
  {
    id: "prod-1",
    name: "Maharani Royal Punjabi Chooda Set",
    category: "bridal-chooda",
    price: 4999,
    originalPrice: 6499,
    rating: 4.9,
    reviewCount: 142,
    tag: "Bridal Bestseller",
    badgeColor: "bg-rose-900 text-amber-200",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description: "Authentic 48-piece bridal chooda featuring deep sindoor red and ivory bangles, flanked by heavy antique kadas with pearl latkans and crystal work.",
    metal: "Antique Gold / Brass core",
    stoneType: "Jadau Kundan & Pearl Clusters",
    sizes: ["2.2", "2.4", "2.6", "2.8", "2.10"],
    customizable: true,
    isNew: false,
    leadTime: "3-5 days dispatch",
    highlights: [
      "Custom name tag engraving available",
      "Traditional dot & check patterned ivory bangles",
      "Supplied in velvet bridal keepsake chest",
      "Non-fading gloss lacquer finish"
    ]
  },
  {
    id: "prod-2",
    name: "Noor-e-Jahan Emerald Polki Kada (Pair)",
    category: "kundan-polki",
    price: 3799,
    originalPrice: 4899,
    rating: 5.0,
    reviewCount: 88,
    tag: "Handcrafted Heirloom",
    badgeColor: "bg-emerald-900 text-emerald-100",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    description: "Statement pair of openable kadas set with faceted uncut polki stones, deep Colombian green emerald drops, and hand-enameled reverse meenakari floral art.",
    metal: "22K Micro Gold Plated Brass",
    stoneType: "Polki Jadau & Synthetic Emerald",
    sizes: ["2.4", "2.6", "2.8"],
    customizable: true,
    isNew: true,
    leadTime: "2-4 days dispatch",
    highlights: [
      "Smooth screw lock mechanism for easy wearing",
      "Intricate peacock carving on rim",
      "Meenakari back work prevents skin irritation",
      "Lifetime micro-polish warranty"
    ]
  },
  {
    id: "prod-3",
    name: "Surya Kanti Haldi Silk Thread Bangle Box",
    category: "silk-thread",
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 64,
    tag: "Haldi Special",
    badgeColor: "bg-amber-600 text-amber-50",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    description: "Hand-wrapped in bright mustard yellow and royal maroon resham silk threads, accented with gold ball chains, cutdana borders, and cluster moti beads.",
    metal: "Sturdy Acrylic & Metal core",
    stoneType: "Glass Kundan & Artificial Pearls",
    sizes: ["2.2", "2.4", "2.6", "2.8"],
    customizable: true,
    isNew: false,
    leadTime: "Ready to ship",
    highlights: [
      "Lightweight and comfortable for all-day festivities",
      "Custom color combinations available on order",
      "Set includes 14 bangles per hand (total 28)",
      "Sweat resistant protective coating"
    ]
  },
  {
    id: "prod-4",
    name: "Padmavati Temple Laxmi Antique Kada",
    category: "temple-antique",
    price: 3299,
    originalPrice: 4299,
    rating: 4.9,
    reviewCount: 96,
    tag: "South Heritage",
    badgeColor: "bg-yellow-900 text-yellow-200",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
    description: "Heirloom temple kada embossed with Goddess Laxmi seated on a lotus flanked by celestial elephants, rendered in dull matte antique temple gold polish.",
    metal: "Pure Brass Temple Gold Finish",
    stoneType: "Kemp Stones (Ruby & Green)",
    sizes: ["2.4", "2.6", "2.8"],
    customizable: false,
    isNew: false,
    leadTime: "Ready to ship",
    highlights: [
      "Authentic Nakshi temple artisan handcrafting",
      "Traditional screw hinge opening",
      "Antique matte rustic luster",
      "Ideal for Kanjeevaram and Silk Sarees"
    ]
  },
  {
    id: "prod-5",
    name: "Firozabad Velvet & Zari Shimmer Set (24 Pcs)",
    category: "glass-velvet",
    price: 1299,
    originalPrice: 1699,
    rating: 4.7,
    reviewCount: 110,
    tag: "Festive Favorite",
    badgeColor: "bg-purple-900 text-purple-200",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80",
    description: "Rich wine purple and deep rose velvet-coated glass bangles with shimmering golden zari lines and chiming sound, famous from the artisans of Firozabad.",
    metal: "Pure High-Grade Acoustic Glass",
    stoneType: "Gold Zari Powder & Micro Stones",
    sizes: ["2.2", "2.4", "2.6", "2.8", "2.10"],
    customizable: true,
    isNew: false,
    leadTime: "Ready to ship",
    highlights: [
      "Melodic acoustic chiming glass",
      "Plush velvet touch prevents wrist marks",
      "Pair with metallic kadas for instant bridal look",
      "Safe bubble cushion packaging guarantee"
    ]
  },
  {
    id: "prod-6",
    name: "Aura Zircon & Rose Gold Openable Cuff",
    category: "daily-minimal",
    price: 2199,
    originalPrice: 2799,
    rating: 4.8,
    reviewCount: 52,
    tag: "Modern Daily",
    badgeColor: "bg-stone-800 text-stone-200",
    image: "https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=800&q=80",
    description: "Contemporary single-row pave Austrian Zircon kada plated in 18K rose gold, featuring a spring clasp for effortless daily wear with western & ethnic outfits.",
    metal: "18K Rose Gold Plated Stainless Brass",
    stoneType: "AAA Grade Austrian Zircon",
    sizes: ["2.4", "2.6", "2.8"],
    customizable: false,
    isNew: true,
    leadTime: "Ready to ship",
    highlights: [
      "Tarnish resistant & waterproof coating",
      "Spring click-lock mechanism",
      "Minimalist silhouette for office and evening wear",
      "Gift boxed with authenticity card"
    ]
  },
  {
    id: "prod-7",
    name: "Rajasthani Dhalu Chura with Gota Latkan",
    category: "bridal-chooda",
    price: 4599,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 74,
    tag: "Royal Rajputana",
    badgeColor: "bg-red-900 text-amber-100",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    description: "Authentic Marwari white & maroon bridal chura with gold foil dhalu kadas, hand-tied gota patti latkans, and personalized name charm options.",
    metal: "Gold Foiled Brass & Bone Acrylic",
    stoneType: "White Polki & Pearl Ghungroos",
    sizes: ["2.2", "2.4", "2.6", "2.8"],
    customizable: true,
    isNew: false,
    leadTime: "3-5 days dispatch",
    highlights: [
      "Traditional Rajasthani dhalu broad profile",
      "Detachable gota & bell latkans",
      "Custom groom & bride name charms",
      "Packed in ceremonial embroidered potli"
    ]
  },
  {
    id: "prod-8",
    name: "Sheesh Mahal Mirror & Pearl Center Kada",
    category: "kundan-polki",
    price: 2899,
    originalPrice: 3599,
    rating: 4.8,
    reviewCount: 43,
    tag: "Mirror Art",
    badgeColor: "bg-blue-900 text-blue-100",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
    description: "Inspired by the Sheesh Mahal of Jaipur, this broad statement kada features hand-cut real glass mirrors encased in floral antique gold bezels with dangling rice pearls.",
    metal: "Antique Yellow Gold Finish",
    stoneType: "Convex Sheesha Mirror & Rice Pearls",
    sizes: ["2.4", "2.6", "2.8"],
    customizable: true,
    isNew: true,
    leadTime: "2-4 days dispatch",
    highlights: [
      "Stunning light reflection for evening sangeet",
      "Smooth finished inner contour",
      "Includes 2 extra replacement mirrors",
      "Openable screw latch"
    ]
  },
  {
    id: "prod-9",
    name: "Rani Bagh Silk & Kundan Festive Pair",
    category: "silk-thread",
    price: 1699,
    originalPrice: 2199,
    rating: 4.7,
    reviewCount: 39,
    tag: "Vibrant Duo",
    badgeColor: "bg-pink-800 text-pink-100",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    description: "Pair of broad kadas wrapped in rich hot magenta silk thread, encrusted with circular floral kundan arrangements and pearl borders.",
    metal: "Reinforced Brass Core",
    stoneType: "Faceted Glass Kundan & Pearls",
    sizes: ["2.2", "2.4", "2.6", "2.8"],
    customizable: true,
    isNew: false,
    leadTime: "Ready to ship",
    highlights: [
      "Color customizer compatible",
      "Perfect match for silk lehengas",
      "Durable non-fraying thread weave",
      "Lightweight feel"
    ]
  },
  {
    id: "prod-10",
    name: "Mayura Antique Peacock Kada",
    category: "temple-antique",
    price: 3499,
    originalPrice: 4499,
    rating: 5.0,
    reviewCount: 81,
    tag: "Masterpiece",
    badgeColor: "bg-amber-950 text-amber-200",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    description: "Twin dancing peacocks meeting at the center with ruby-eyed detailing and feathered engravings, crafted in traditional South Indian temple antique gold.",
    metal: "Pure Brass Temple Gold Plating",
    stoneType: "Synthetic Kemp Rubies",
    sizes: ["2.4", "2.6", "2.8"],
    customizable: false,
    isNew: false,
    leadTime: "Ready to ship",
    highlights: [
      "Exquisite feather relief work",
      "Hinge with safety chain",
      "Matte vintage gold patina",
      "Heirloom collector's item"
    ]
  },
  {
    id: "prod-11",
    name: "Classic Firozabad Red & Gold Glass Churi (Box of 48)",
    category: "glass-velvet",
    price: 999,
    originalPrice: 1399,
    rating: 4.9,
    reviewCount: 165,
    tag: "Karwa Chauth Essential",
    badgeColor: "bg-red-800 text-red-100",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80",
    description: "Traditional pure glass bangles in deep bridal red adorned with delicate 24K gold foil line patterns, delivering the unmistakable auspicious chiming sound.",
    metal: "Firozabad Acoustic Silica Glass",
    stoneType: "Micro Gold Foil Dusting",
    sizes: ["2.2", "2.4", "2.6", "2.8", "2.10"],
    customizable: false,
    isNew: false,
    leadTime: "Ready to ship",
    highlights: [
      "Authentic tinkling sound",
      "Smooth round edges protect the skin",
      "48 bangles (24 for each hand)",
      "Double reinforced bubble foam box"
    ]
  },
  {
    id: "prod-12",
    name: "Sleek Solitaire Dual Row Kada",
    category: "daily-minimal",
    price: 1999,
    originalPrice: 2599,
    rating: 4.8,
    reviewCount: 31,
    tag: "Everyday Sparkle",
    badgeColor: "bg-gray-800 text-amber-200",
    image: "https://images.unsplash.com/photo-1611591475152-47831c367295?auto=format&fit=crop&w=800&q=80",
    description: "Double band geometric openable kada with alternating round and baguette cubic zirconia stones set in yellow gold vermeil finish.",
    metal: "18K Gold Vermeil over Brass",
    stoneType: "Cubic Zirconia (CZ)",
    sizes: ["2.4", "2.6"],
    customizable: false,
    isNew: true,
    leadTime: "Ready to ship",
    highlights: [
      "Effortless push-button clasp",
      "Snag-free bezel settings",
      "Pairs beautifully with smartwatches",
      "Hypoallergenic nickel-free build"
    ]
  }
];

// Customizer Options System
export const CUSTOMIZER_CONFIG = {
  setTypes: [
    {
      id: "single-kada",
      name: "Single Statement Kada",
      description: "One broad, heavy centerpiece kada for solitary elegance.",
      multiplier: 1,
      bangleCount: 1,
      basePrice: 1800
    },
    {
      id: "pair-kadas",
      name: "Royal Pair of Kadas (2 Pcs)",
      description: "A matching pair of statement kadas for both hands.",
      multiplier: 1.8,
      bangleCount: 2,
      basePrice: 3200
    },
    {
      id: "festive-12",
      name: "Festive Stack (12 Bangles)",
      description: "2 centerpiece kadas flanked by 10 matching coordinated bangles.",
      multiplier: 2.2,
      bangleCount: 12,
      basePrice: 3900
    },
    {
      id: "bridal-chooda",
      name: "Bridal Chooda Stack (48+ Bangles)",
      description: "Complete ceremonial bridal set with central kadas, chura bangles & latkans.",
      multiplier: 3.2,
      bangleCount: 48,
      basePrice: 5800
    }
  ],

  sizes: [
    { id: "2.2", label: "2.2 (XS)", innerDiaMm: 54.0, innerDiaIn: "2.125\"", palmCircumferenceMm: 170, palmCircumferenceIn: "6.7\"" },
    { id: "2.4", label: "2.4 (S)", innerDiaMm: 57.2, innerDiaIn: "2.250\"", palmCircumferenceMm: 180, palmCircumferenceIn: "7.1\"" },
    { id: "2.6", label: "2.6 (M - Most Popular)", innerDiaMm: 60.3, innerDiaIn: "2.375\"", palmCircumferenceMm: 190, palmCircumferenceIn: "7.5\"" },
    { id: "2.8", label: "2.8 (L)", innerDiaMm: 63.5, innerDiaIn: "2.500\"", palmCircumferenceMm: 200, palmCircumferenceIn: "7.9\"" },
    { id: "2.10", label: "2.10 (XL)", innerDiaMm: 66.7, innerDiaIn: "2.625\"", palmCircumferenceMm: 210, palmCircumferenceIn: "8.3\"" }
  ],

  metals: [
    {
      id: "antique-gold",
      name: "22K Antique Royal Gold",
      hex: "#c89d3c",
      highlightHex: "#ffd97d",
      shadowHex: "#7a5914",
      description: "Rich traditional vintage matte gold with subtle shadow patina.",
      priceAdd: 0
    },
    {
      id: "yellow-gold",
      name: "Bright 24K Yellow Gold Polish",
      hex: "#f3c642",
      highlightHex: "#fff2a8",
      shadowHex: "#99730a",
      description: "Lustrous high-gloss royal bridal yellow gold plating.",
      priceAdd: 200
    },
    {
      id: "rose-gold",
      name: "Warm Rose Gold",
      hex: "#e09886",
      highlightHex: "#fedad1",
      shadowHex: "#8f4d3d",
      description: "Romantic blush pink metallic tone for modern and fusion outfits.",
      priceAdd: 300
    },
    {
      id: "oxidized-silver",
      name: "Vintage Oxidized Silver",
      hex: "#a3a7ab",
      highlightHex: "#e3e7eb",
      shadowHex: "#45484c",
      description: "Tribal antique blackened silver for rustic and bohemian looks.",
      priceAdd: 100
    },
    {
      id: "temple-copper",
      name: "Temple Copper & Brass",
      hex: "#b87333",
      highlightHex: "#f0b37e",
      shadowHex: "#61360f",
      description: "Dull rustic temple deity finish with warm reddish undertones.",
      priceAdd: 150
    }
  ],

  coreBases: [
    { id: "metal", name: "Solid Engraved Metal", description: "Carved gold motifs and etched patterns" },
    { id: "silk", name: "Hand-Wrapped Silk Resham", description: "Dense vibrant silk thread with smooth satin luster" },
    { id: "velvet", name: "Royal Velvet Touch", description: "Soft flocking velvet exterior for regal depth" }
  ],

  colors: [
    { id: "sindoor-red", name: "Sindoor Red", hex: "#a81323", family: "Bridal" },
    { id: "rani-pink", name: "Rani Magenta Pink", hex: "#c71585", family: "Festive" },
    { id: "haldi-yellow", name: "Haldi Mustard Yellow", hex: "#e5a912", family: "Mehendi" },
    { id: "emerald-green", name: "Emerald Bottle Green", hex: "#0b5b3b", family: "Royal" },
    { id: "peacock-blue", name: "Peacock Royal Blue", hex: "#0e3b6e", family: "Royal" },
    { id: "regal-purple", name: "Regal Plum Wine", hex: "#5b1b4b", family: "Evening" },
    { id: "ivory-white", name: "Pure Pearl Ivory", hex: "#f4f1ea", family: "Bridal" },
    { id: "sunset-orange", name: "Sunset Marigold", hex: "#d9531e", family: "Festive" },
    { id: "mint-green", name: "Pistachio Mint", hex: "#7cb594", family: "Pastel" },
    { id: "rose-peach", name: "Blush Peach", hex: "#df8a7c", family: "Pastel" },
    { id: "midnight-black", name: "Midnight Onyx Black", hex: "#1f2226", family: "Modern" }
  ],

  stoneStyles: [
    {
      id: "kundan-polki",
      name: "Jadau Kundan & Uncut Polki",
      description: "Flat-cut polki stones backed with silver foil for regal shimmer.",
      priceAdd: 450,
      visualType: "kundan"
    },
    {
      id: "zircon-diamonds",
      name: "Austrian Zircon Crystals (AD)",
      description: "Faceted diamond-cut crystals with multi-angle fire & brilliance.",
      priceAdd: 550,
      visualType: "zircon"
    },
    {
      id: "pearl-moti",
      name: "Freshwater Cultured Pearls",
      description: "Classic round white & cream moti beads for royal subtlety.",
      priceAdd: 350,
      visualType: "pearl"
    },
    {
      id: "mirror-work",
      name: "Rajasthani Sheesha Mirrors",
      description: "Authentic hand-set mirrors reflecting light with every movement.",
      priceAdd: 300,
      visualType: "mirror"
    },
    {
      id: "meenakari",
      name: "Floral Enamel Meenakari Work",
      description: "Fine hand-painted glass enamel in floral and vine motifs.",
      priceAdd: 600,
      visualType: "meena"
    }
  ],

  stoneColors: [
    { id: "ruby-emerald", name: "Ruby Red & Emerald Duo", hex1: "#9e1022", hex2: "#0b5b3b" },
    { id: "pure-crystal", name: "Diamond Clear / Solitaire", hex1: "#e0f2fe", hex2: "#f8fafc" },
    { id: "emerald-only", name: "Imperial Green Emerald", hex1: "#0b5b3b", hex2: "#107e53" },
    { id: "ruby-only", name: "Pigeon Blood Ruby", hex1: "#9e1022", hex2: "#c71830" },
    { id: "champagne", name: "Champagne Gold Topaz", hex1: "#cf9f52", hex2: "#eedbb0" },
    { id: "sapphire-blue", name: "Kashmir Blue Sapphire", hex1: "#193c72", hex2: "#2d5ba6" }
  ],

  latkans: [
    {
      id: "none",
      name: "No Hanging Charms (Clean Edge)",
      priceAdd: 0,
      description: "Classic smooth circular perimeter without dangling accents."
    },
    {
      id: "pearl-cluster",
      name: "Cascading Pearl & Zari Latkan",
      priceAdd: 450,
      description: "Clusters of rice pearls and golden zari cords for bridal sway."
    },
    {
      id: "golden-jhumka",
      name: "Miniature Golden Jhumki Drops",
      priceAdd: 550,
      description: "Delicate dangling jhumka bells with tiny chiming clappers."
    },
    {
      id: "ghungroo-bells",
      name: "Musical Ghungroo Bell Clusters",
      priceAdd: 350,
      description: "Auspicious ringing brass bells evoking traditional celebration."
    },
    {
      id: "monogram-tag",
      name: "Custom Initial Monogram Coin",
      priceAdd: 400,
      description: "Laser-cut circular medallion with your personal initials."
    },
    {
      id: "bridal-kalire",
      name: "Mini Kalira Bridal Tassels",
      priceAdd: 750,
      description: "Tiered golden umbrella kalira drops with pearl strings."
    }
  ],

  packaging: [
    {
      id: "standard-pouch",
      name: "Eco-Cotton Embroidered Potli Pouch",
      priceAdd: 0,
      description: "Soft velvet drawstring bag with gold tassel, ideal for travel."
    },
    {
      id: "velvet-box",
      name: "Royal Crimson Velvet Keepsake Chest",
      priceAdd: 450,
      description: "Cushioned bangle rolls inside a rigid magnetic crimson box."
    },
    {
      id: "wooden-heritage",
      name: "Carved Teakwood Box with Brass Latch",
      priceAdd: 850,
      description: "Heirloom handcrafted wooden casket with mirror and velvet lining."
    }
  ]
};

// Size Guide Helpers & Calibration
export const BANGLE_SIZE_CHART = [
  { size: "2.2", innerDiaIn: "2-2/16\" (2.125\")", innerDiaMm: "54.0 mm", palmCircumferenceIn: "6.7\"", palmCircumferenceMm: "170 mm", standard: "Extra Small (XS)" },
  { size: "2.4", innerDiaIn: "2-4/16\" (2.250\")", innerDiaMm: "57.2 mm", palmCircumferenceIn: "7.1\"", palmCircumferenceMm: "180 mm", standard: "Small (S)" },
  { size: "2.6", innerDiaIn: "2-6/16\" (2.375\")", innerDiaMm: "60.3 mm", palmCircumferenceIn: "7.5\"", palmCircumferenceMm: "190 mm", standard: "Medium (M) - Most Common" },
  { size: "2.8", innerDiaIn: "2-8/16\" (2.500\")", innerDiaMm: "63.5 mm", palmCircumferenceIn: "7.9\"", palmCircumferenceMm: "200 mm", standard: "Large (L)" },
  { size: "2.10", innerDiaIn: "2-10/16\" (2.625\")", innerDiaMm: "66.7 mm", palmCircumferenceIn: "8.3\"", palmCircumferenceMm: "210 mm", standard: "Extra Large (XL)" }
];

// Bridal & Festive Lookbook
export const LOOKBOOK_STORIES = [
  {
    id: "mehendi-sunshine",
    occasion: "Haldi & Mehendi",
    title: "Vibrant Resham & Floral Sunshine",
    quote: "Playful pops of mustard yellow and parrot green silk with cluster pearls.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
    suggestedCombo: "Haldi Yellow Silk Base + Rice Pearl Border + Mini Jhumka Drops",
    colorPalette: ["#e5a912", "#0b5b3b", "#f4f1ea", "#c89d3c"]
  },
  {
    id: "sangeet-glam",
    occasion: "Sangeet & Cocktail Night",
    title: "Starlight Polki & Mirror Sparkle",
    quote: "Mirrors catching every light on the dance floor with Austrian zircon fireworks.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=80",
    suggestedCombo: "Rose Gold or Antique Base + Mirror Sheesha Work + Zircon Pave Lines",
    colorPalette: ["#e09886", "#e0f2fe", "#9e1022", "#cf9f52"]
  },
  {
    id: "main-shaadi",
    occasion: "The Wedding Phere",
    title: "Maharani Sindoor Red & White Chooda",
    quote: "The eternal symbol of Indian bridal royalty, customized with the couple's monogram.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
    suggestedCombo: "Sindoor Red & Ivory Stacks + Jadau Kundan Kadas + Pearl Kalira Latkan",
    colorPalette: ["#a81323", "#f4f1ea", "#c89d3c", "#0b5b3b"]
  },
  {
    id: "reception-elegance",
    occasion: "Grand Reception",
    title: "Imperial Emerald & Antique Grandeur",
    quote: "Regal Colombian emerald accents with matte gold temple deity carvings.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
    suggestedCombo: "Antique Temple Gold Kada Pair + Emerald Polki Clusters + Openable Screw Clasp",
    colorPalette: ["#0b5b3b", "#c89d3c", "#7a5914", "#e0f2fe"]
  }
];

// Customer Reviews & Stories
export const CUSTOMER_REVIEWS = [
  {
    id: "rev-1",
    name: "Dr. Ananya Sharma",
    city: "Jaipur, Rajasthan",
    occasion: "Bridal Chooda Customization",
    rating: 5,
    date: "14 Oct 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    text: "I customized my entire wedding chooda here with our wedding date and initials engraved on the latkan coin. The live preview on the website matched 100% with the real box when it arrived. The quality of the kundan is royal grade!",
    verified: true,
    item: "Maharani Royal Punjabi Chooda Set (Customized)"
  },
  {
    id: "rev-2",
    name: "Simran Kaur",
    city: "Amritsar, Punjab",
    occasion: "Sister's Wedding",
    rating: 5,
    date: "28 Sep 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    text: "Ordered 14 matching silk thread sets for the Mehendi bridesmaids. We customized them to match our exact pastel mint lehengas using the color picker. Everyone was stunned by how light and durable they were!",
    verified: true,
    item: "Festive Silk Thread Stack (12 Pcs)"
  },
  {
    id: "rev-3",
    name: "Pooja Hegde-Patil",
    city: "Bangalore, Karnataka",
    occasion: "Varalakshmi Pooja",
    rating: 5,
    date: "18 Aug 2026",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    text: "The Padmavati Laxmi temple kada has this serene, genuine antique temple patina. It doesn't look like cheap yellow paint; it feels like authentic family heirloom jewelry. Highly recommend using the Size Guide calculator!",
    verified: true,
    item: "Padmavati Temple Laxmi Antique Kada"
  }
];

// Frequently Asked Questions
export const FAQS = [
  {
    question: "How do I choose the correct bangle size for my wrist?",
    answer: "Unlike watches or bracelets, bangles must slide over the widest part of your hand (your knuckles). Use our built-in 'Find My Size' calculator above, or measure the inside diameter of a well-fitting bangle in millimeters. 2.4 (57mm) and 2.6 (60mm) are our most common sizes. If you have stiff knuckles, we recommend our openable screw-lock kadas!"
  },
  {
    question: "Can I customize the silk thread color to match my wedding lehenga?",
    answer: "Yes, absolutely! In our 'Custom Studio', you can pick from 12+ royal colors, or choose 'Custom Lehenga Match' and send a photo of your dress directly to our master artisan via WhatsApp after placing the order."
  },
  {
    question: "Can I engrave my name or wedding date on the bangles or latkan?",
    answer: "Yes! For our bridal choodas and custom sets, you can enter custom initials, bride/groom names, or auspicious symbols which are etched onto gold-plated medallion latkans or central kadas."
  },
  {
    question: "How long does custom handcrafted bangle dispatch take?",
    answer: "Standard catalog items ship within 24-48 hours. Completely custom-wound silk thread and engraved bridal chooda sets take 3 to 5 business days for our artisans to craft before express tracked shipping."
  },
  {
    question: "Can I place an order or discuss customization over WhatsApp?",
    answer: "Yes! Every design created in our Custom Studio has a 'Direct WhatsApp Order' button that instantly formats your exact specifications, size, stones, and initials into a message sent directly to our shop master artisan."
  }
];
