export const products = [
  // 1. Popular Products matching Bisum layout
  {
    id: 1,
    name: "Black City Backpack",
    category: "Backpacks",
    categorySlug: "backpacks",
    subcategory: "City Backpacks",
    price: 1529,
    originalPrice: 1759,
    discount: 13,
    rating: 4.8,
    reviewCount: 42,
    stock: 15,
    sku: "TH-BP-001",
    isPopular: true,
    isBestSeller: true,
    isNew: false,
    colors: [
      { name: "Obsidian Black", hex: "#111111" },
      { name: "Charcoal Grey", hex: "#4A4A4A" },
      { name: "Tan Brown", hex: "#8B5A2B" }
    ],
    images: [
      "/images/products/product-1.jpg",
      "/images/products/product-4.jpg",
      "/images/products/product-9.jpg"
    ],
    shortDesc: "A sleek, rain-resistant obsidian leather backpack engineered for urban commutes and boardroom elegance.",
    description: "Handcrafted from full-grain Italian calf leather, the Black City Backpack seamlessly blends architectural minimalism with versatile utility. Features an ergonomic padded laptop sleeve (up to 16\"), discreet anti-theft passport pocket, and brushed gold custom hardware.",
    features: [
      "100% Genuine Full-Grain Leather exterior",
      "Padded compartment fits up to 16\" laptop",
      "Concealed rear zip security pocket for valuables",
      "Breathable honeycomb mesh back panel",
      "Waterproof nylon internal lining"
    ],
    specs: {
      dimensions: "42cm x 30cm x 14cm",
      weight: "950g",
      capacity: "18 Liters",
      warranty: "2 Years International Warranty"
    }
  },
  {
    id: 2,
    name: "Lady Handbag - Crimson Grace",
    category: "Handbags",
    categorySlug: "handbags",
    subcategory: "Top Handle Bags",
    price: 529,
    originalPrice: 759,
    discount: 30,
    rating: 4.9,
    reviewCount: 88,
    stock: 12,
    sku: "TH-HB-002",
    isPopular: true,
    isBestSeller: false,
    isNew: true,
    colors: [
      { name: "Crimson Berry", hex: "#8A1C2E" },
      { name: "Blush Rose", hex: "#E8A598" },
      { name: "Onyx Black", hex: "#1A1A1A" }
    ],
    images: [
      "/images/products/product-2.jpg",
      "/images/products/product-1.jpg",
      "/images/products/product-3.jpg"
    ],
    shortDesc: "Sculptural top-handle silhouette featuring hand-stitched detailing and high-polish gold hardware.",
    description: "The Lady Handbag is THAANGI's quintessential feminine heirloom. Cut with graceful curves inspired by neoclassical architecture, this bag commands attention at evening galas and business lunches alike. Includes a detachable crossbody strap.",
    features: [
      "Hand-burnished vegetable tanned leather",
      "Detachable and adjustable leather crossbody strap",
      "Magnetic flap closure with signature gold lock",
      "Internal divider zip pouch with two slip slots",
      "Metal protective feet on base"
    ],
    specs: {
      dimensions: "28cm x 22cm x 11cm",
      weight: "680g",
      capacity: "6.5 Liters",
      warranty: "Lifetime Craftsmanship Warranty"
    }
  },
  {
    id: 3,
    name: "Men Executive Travel Bag",
    category: "Travel Bags",
    categorySlug: "travel-bags",
    subcategory: "Weekender Duffels",
    price: 529,
    originalPrice: 759,
    discount: 30,
    rating: 4.7,
    reviewCount: 35,
    stock: 8,
    sku: "TH-TB-003",
    isPopular: true,
    isBestSeller: false,
    isNew: false,
    colors: [
      { name: "Midnight Black", hex: "#181818" },
      { name: "Espresso Brown", hex: "#3B2219" }
    ],
    images: [
      "/images/products/product-3.jpg",
      "/images/products/product-8.jpg",
      "/images/products/product-10.jpg"
    ],
    shortDesc: "High-capacity rugged weekend duffle tailored with reinforced corners and dedicated shoe compartment.",
    description: "Designed for the sophisticated globetrotter, this travel carrier features premium waterproof ballistic canvas trimmed with full-grain bridle leather. Meets domestic and international airline carry-on size standards with effortless poise.",
    features: [
      "Water-repellent heavy canvas with bridle leather trim",
      "Ventilated side shoe / sneaker compartment",
      "Trolley sleeve fits snugly over rolling luggage handle",
      "Detachable padded shoulder strap with brass clips",
      "Heavy duty YKK double zips"
    ],
    specs: {
      dimensions: "52cm x 30cm x 25cm",
      weight: "1.4kg",
      capacity: "38 Liters",
      warranty: "3 Years Travel Warranty"
    }
  },
  {
    id: 4,
    name: "Nike Legend Stripe Satchel",
    category: "Handbags",
    categorySlug: "handbags",
    subcategory: "Satchels",
    price: 529,
    originalPrice: 529,
    discount: 0,
    rating: 4.6,
    reviewCount: 29,
    stock: 20,
    sku: "TH-HB-004",
    isPopular: true,
    isBestSeller: false,
    isNew: false,
    colors: [
      { name: "Monogram Cognac", hex: "#8A542D" },
      { name: "Cream Monogram", hex: "#E9DFD0" }
    ],
    images: [
      "/images/products/product-4.jpg",
      "/images/products/product-2.jpg",
      "/images/products/product-6.jpg"
    ],
    shortDesc: "Timeless monogram canvas barrel satchel adorned with honeyed vachetta leather handles.",
    description: "A tribute to classical luxury travel, this iconic cylindrical satchel combines heritage check canvas with durable rolled leather handles that develop a warm, unique patina over years of cherished wear.",
    features: [
      "Durable coated monogram canvas",
      "Natural patina untreated cowhide leather trims",
      "Double top rolled handles for arm or hand carry",
      "Golden padlock and key bell included",
      "Wide opening with smooth zipper glide"
    ],
    specs: {
      dimensions: "30cm x 21cm x 17cm",
      weight: "590g",
      capacity: "10 Liters",
      warranty: "1 Year Standard Warranty"
    }
  },
  {
    id: 5,
    name: "Heritage Check Speedy Satchel",
    category: "Handbags",
    categorySlug: "handbags",
    subcategory: "Satchels",
    price: 529,
    originalPrice: 649,
    discount: 18,
    rating: 4.9,
    reviewCount: 52,
    stock: 14,
    sku: "TH-HB-005",
    isPopular: true,
    isBestSeller: true,
    isNew: false,
    colors: [
      { name: "Alabaster Check", hex: "#E5DEC9" },
      { name: "Camel", hex: "#C19A6B" }
    ],
    images: [
      "/images/products/product-5.jpg",
      "/images/products/product-4.jpg",
      "/images/products/product-7.jpg"
    ],
    shortDesc: "Light checkered canvas body with reinforced leather piping and signature gold accents.",
    description: "Evoking sun-drenched European promenades, this light-toned satchel pairs exceptionally with summer linens and autumn trench coats. Water-resistant outer coating ensures year-round protection.",
    features: [
      "Stain-resistant coated canvas exterior",
      "Plush red microsuede inner lining",
      "Interior zip pocket and D-ring for keys",
      "Hand-finished edge coating",
      "Sturdy base board prevents sagging"
    ],
    specs: {
      dimensions: "30cm x 22cm x 18cm",
      weight: "610g",
      capacity: "11 Liters",
      warranty: "2 Years Limited Warranty"
    }
  },
  {
    id: 6,
    name: "Woven Vanity Cosmetic Bag",
    category: "Clutches",
    categorySlug: "clutches",
    subcategory: "Wristlets",
    price: 529,
    originalPrice: 599,
    discount: 11,
    rating: 4.8,
    reviewCount: 46,
    stock: 19,
    sku: "TH-CL-006",
    isPopular: true,
    isBestSeller: true,
    isNew: true,
    colors: [
      { name: "Terracotta Brown", hex: "#C86D51" },
      { name: "Caramel", hex: "#AF6E4D" },
      { name: "Cream White", hex: "#FDF8F2" }
    ],
    images: [
      "/images/products/product-6.jpg",
      "/images/products/product-7.jpg",
      "/images/products/product-1.jpg"
    ],
    shortDesc: "Artisanal maxi intrecciato woven leather cosmetic case with thick gold chain handle.",
    description: "Expertly hand-woven using wide strips of supple nappa leather, this tactile vanity bag serves as an upscale evening clutch or an exquisite toiletry accessory for luxury hotels.",
    features: [
      "Artisanal woven nappa leather craftsmanship",
      "Detachable chunky curb chain strap",
      "Dual zip pullers with embossed leather tabs",
      "Elasticated interior brush and bottle loops",
      "Spill-proof cleanable interior base"
    ],
    specs: {
      dimensions: "24cm x 16cm x 12cm",
      weight: "440g",
      capacity: "4.5 Liters",
      warranty: "2 Years Limited Warranty"
    }
  },
  {
    id: 7,
    name: "Artisan Leather Travel Duffel",
    category: "Travel Bags",
    categorySlug: "travel-bags",
    subcategory: "Cabin Bags",
    price: 529,
    originalPrice: 699,
    discount: 24,
    rating: 4.7,
    reviewCount: 31,
    stock: 7,
    sku: "TH-TB-007",
    isPopular: true,
    isBestSeller: false,
    isNew: false,
    colors: [
      { name: "Taupe Suede & Tan", hex: "#8D7B68" },
      { name: "Dark Walnut", hex: "#3C2A21" }
    ],
    images: [
      "/images/products/product-7.jpg",
      "/images/products/product-3.jpg",
      "/images/products/product-8.jpg"
    ],
    shortDesc: "Heavy suede and bridle leather duffle equipped with comfortable dual handles and brass hardware.",
    description: "Built to endure decades of cross-continental journeys, this duffel contrasts velvety nubuck suede with sturdy oil-tanned leather harnesses. Ideal for 3-day getaways and first-class cabins.",
    features: [
      "Water-treated velour suede with oil-pullup leather",
      "Brass studs and double-layer base reinforcement",
      "Wide U-zip lid opening for effortless packing",
      "Two exterior magnetic snapshot pockets",
      "Luggage tag embossed with gold THAANGI crest"
    ],
    specs: {
      dimensions: "50cm x 28cm x 26cm",
      weight: "1.3kg",
      capacity: "35 Liters",
      warranty: "3 Years Travel Warranty"
    }
  },
  {
    id: 8,
    name: "Sculpted Crescent Shoulder Bag",
    category: "Shoulder Bags",
    categorySlug: "shoulder-bags",
    subcategory: "Crescent Bags",
    price: 489,
    originalPrice: 620,
    discount: 21,
    rating: 4.9,
    reviewCount: 64,
    stock: 18,
    sku: "TH-SB-008",
    isPopular: true,
    isBestSeller: true,
    isNew: true,
    colors: [
      { name: "Dark Espresso", hex: "#2E1C14" },
      { name: "Olive Green", hex: "#556B2F" },
      { name: "Ivory", hex: "#FFFFF0" }
    ],
    images: [
      "/images/products/product-8.jpg",
      "/images/products/product-2.jpg",
      "/images/products/product-5.jpg"
    ],
    shortDesc: "Dramatic crescent arc silhouette fitting comfortably under the shoulder with gold hardware.",
    description: "Capturing 90s minimalism reimagined through contemporary tailoring, the Crescent Bag rests effortlessly against the ribs. The sculpted curve holds your phone, wallet, lipstick, and sunglasses with poise.",
    features: [
      "Ultra-smooth box-calf leather",
      "Ergonomic shoulder drop curve",
      "Top zip with leather pull tab",
      "Internal card organizer slot",
      "Subtle foiled THAANGI logo front and center"
    ],
    specs: {
      dimensions: "26cm x 15cm x 7cm",
      weight: "380g",
      capacity: "2.8 Liters",
      warranty: "1 Year Standard Warranty"
    }
  },

  // 2. Additional rich products across all categories
  {
    id: 9,
    name: "Riviera Canvas Executive Tote",
    category: "Tote Bags",
    categorySlug: "tote-bags",
    subcategory: "Work Executive Totes",
    price: 640,
    originalPrice: 800,
    discount: 20,
    rating: 4.9,
    reviewCount: 73,
    stock: 22,
    sku: "TH-TT-009",
    isPopular: false,
    isBestSeller: true,
    isNew: true,
    colors: [
      { name: "Cream & Cognac", hex: "#F5EBE1" },
      { name: "Black & Tan", hex: "#1E1E1E" }
    ],
    images: [
      "/images/products/product-9.jpg",
      "/images/products/product-10.jpg",
      "/images/products/product-1.jpg"
    ],
    shortDesc: "Heavyweight 24oz organic cotton canvas tote finished with saddle-stitched Italian leather straps.",
    description: "The definitive everyday tote for creative professionals. Accommodates a 15\" MacBook, notebook, thermal flask, and makeup pouch without losing its crisp structured profile.",
    features: [
      "Triple-ply 24oz weatherproof cotton canvas",
      "Stitched Italian saddle leather straps with 10\" drop",
      "Central zip security compartment + two open utility slots",
      "Durable brass base feet to prevent soiling",
      "Includes matching detachable zip pouch"
    ],
    specs: {
      dimensions: "38cm x 30cm x 15cm",
      weight: "820g",
      capacity: "16 Liters",
      warranty: "2 Years Limited Warranty"
    }
  },
  {
    id: 10,
    name: "Saddle Crossbody Sling",
    category: "Sling Bags",
    categorySlug: "sling-bags",
    subcategory: "Saddle Bags",
    price: 380,
    originalPrice: 480,
    discount: 20,
    rating: 4.8,
    reviewCount: 39,
    stock: 16,
    sku: "TH-SL-010",
    isPopular: false,
    isBestSeller: false,
    isNew: true,
    colors: [
      { name: "Warm Honey", hex: "#D48B47" },
      { name: "Forest Emerald", hex: "#1C3F2D" },
      { name: "Classic Noir", hex: "#1A1A1A" }
    ],
    images: [
      "/images/products/product-10.jpg",
      "/images/products/product-5.jpg",
      "/images/products/product-6.jpg"
    ],
    shortDesc: "Equine-inspired curved saddle bag featuring a bold horseshoe buckle and magnetic clasp.",
    description: "An instant classic for casual weekends and gallery visits. The contoured saddle silhouette moulds comfortably to the hip, while the thick guitar-style strap ensures all-day shoulder comfort.",
    features: [
      "Semi-rigid vegetable tanned cowhide",
      "Interchangeable wide embroidered strap & thin leather strap",
      "Concealed magnetic snap closure under brass buckle",
      "Back exterior slip pocket for transit cards",
      "Microfiber scratch-free lining"
    ],
    specs: {
      dimensions: "22cm x 18cm x 7cm",
      weight: "480g",
      capacity: "3 Liters",
      warranty: "2 Years Limited Warranty"
    }
  },
  {
    id: 11,
    name: "Zip-Around Continental Wallet",
    category: "Wallets",
    categorySlug: "wallets",
    subcategory: "Zip-Around Wallets",
    price: 195,
    originalPrice: 245,
    discount: 20,
    rating: 4.7,
    reviewCount: 54,
    stock: 30,
    sku: "TH-WL-011",
    isPopular: false,
    isBestSeller: true,
    isNew: false,
    colors: [
      { name: "Rose Gold Grain", hex: "#B76E79" },
      { name: "Burgundy Wine", hex: "#5C1D24" },
      { name: "Grained Navy", hex: "#1F2D3D" }
    ],
    images: [
      "/images/products/product-11.jpg",
      "/images/products/product-12.jpg",
      "/images/products/product-1.jpg"
    ],
    shortDesc: "Full-zip pebbled leather continental wallet with RFID-blocking fabric and 12 card slots.",
    description: "Keep all credit cards, foreign currency, cheques, and smartphone organized in one sleek zip clutch. Built with military-grade RFID lining to safeguard contactless cards against electronic skim theft.",
    features: [
      "Scratch-resistant pebbled leather",
      "Certified RFID protection weave in every pocket",
      "12 individual card slots + central coin zip pouch",
      "Accommodates up to iPhone 15 Pro Max",
      "Polished anti-tarnish metal zipper"
    ],
    specs: {
      dimensions: "20cm x 10.5cm x 2.5cm",
      weight: "220g",
      capacity: "Continental Standard",
      warranty: "1 Year Standard Warranty"
    }
  },
  {
    id: 12,
    name: "Golden Glamour Evening Clutch",
    category: "Clutches",
    categorySlug: "clutches",
    subcategory: "Evening Clutches",
    price: 360,
    originalPrice: 450,
    discount: 20,
    rating: 4.9,
    reviewCount: 47,
    stock: 10,
    sku: "TH-CL-012",
    isPopular: false,
    isBestSeller: false,
    isNew: true,
    colors: [
      { name: "Champagne Gold", hex: "#F1E5AC" },
      { name: "Liquid Silver", hex: "#E0E0E0" },
      { name: "Rose Bronze", hex: "#C98A7D" }
    ],
    images: [
      "/images/products/product-12.jpg",
      "/images/products/product-6.jpg",
      "/images/products/product-2.jpg"
    ],
    shortDesc: "Glimmering metallic hardcase minaudière topped with a faceted gemstone push clasp.",
    description: "The jewel of your evening ensemble. Reflects candlelight with every gesture, delivering red-carpet prestige. Includes a delicate serpent chain for optional shoulder wear.",
    features: [
      "Mirror-finish metallic alloy hardcase with satin backing",
      "Faceted crystal clasp closure",
      "Detachable drop-in serpent link chain (55cm)",
      "Padded velvet interior prevents phone scratches",
      "Compact yet holds standard smartphones and compacts"
    ],
    specs: {
      dimensions: "19cm x 12cm x 5cm",
      weight: "390g",
      capacity: "1.2 Liters",
      warranty: "1 Year Luxury Care Warranty"
    }
  },
  {
    id: 13,
    name: "Parisian Chic Top Handle Bag",
    category: "Handbags",
    categorySlug: "handbags",
    subcategory: "Top Handle Bags",
    price: 720,
    originalPrice: 890,
    discount: 19,
    rating: 5.0,
    reviewCount: 38,
    stock: 9,
    sku: "TH-HB-013",
    isPopular: false,
    isBestSeller: true,
    isNew: true,
    colors: [
      { name: "Cream Ivory", hex: "#FFFDD0" },
      { name: "Midnight Navy", hex: "#001B3A" }
    ],
    images: [
      "/images/products/product-13.jpg",
      "/images/products/product-2.jpg",
      "/images/products/product-1.jpg"
    ],
    shortDesc: "Trapezoidal structured handbag featuring signature turn-lock and silk twilly wrap.",
    description: "Channel timeless French poise with the Parisian Chic Top Handle. Sculpted from micro-grain calfskin, each piece includes a bespoke printed silk twilly scarf knotted around the handle.",
    features: [
      "Stiff structured box-grain calfskin",
      "Turn-lock engraved clasp with key loop",
      "Complimentary printed pure silk twilly scarf",
      "Two expandable accordion interior compartments",
      "Four brass bottom protective studs"
    ],
    specs: {
      dimensions: "31cm x 24cm x 13cm",
      weight: "790g",
      capacity: "8.5 Liters",
      warranty: "Lifetime Craftsmanship Warranty"
    }
  },
  {
    id: 14,
    name: "Nordic Commuter Laptop Backpack",
    category: "Backpacks",
    categorySlug: "backpacks",
    subcategory: "Laptop Backpacks",
    price: 430,
    originalPrice: 520,
    discount: 17,
    rating: 4.8,
    reviewCount: 61,
    stock: 25,
    sku: "TH-BP-014",
    isPopular: false,
    isBestSeller: false,
    isNew: false,
    colors: [
      { name: "Slate Grey", hex: "#708090" },
      { name: "Matte Black", hex: "#1C1C1C" },
      { name: "Pine Green", hex: "#2D5A27" }
    ],
    images: [
      "/images/products/product-14.jpg",
      "/images/products/product-1.jpg",
      "/images/products/product-9.jpg"
    ],
    shortDesc: "Minimalist roll-top commuter pack made with waterproof recycled PET fabric and magnetic buckles.",
    description: "Clean Scandinavian aesthetics meet high-efficiency everyday utility. The roll-top expansion allows for sudden grocery runs or extra gym wear, while keeping electronics dry in heavy downpours.",
    features: [
      "Eco-certified waterproof RPET woven fabric",
      "Fidlock magnetic quick-release chest buckle",
      "Independent side-access 15.6\" laptop compartment",
      "Expandable roll-top adds 6L extra capacity",
      "Hidden water bottle side zip pocket"
    ],
    specs: {
      dimensions: "44cm x 29cm x 14cm (expands to 55cm height)",
      weight: "880g",
      capacity: "20L - 26L",
      warranty: "3 Years Commute Warranty"
    }
  },
  {
    id: 15,
    name: "Baguette 90s Chain Shoulder Bag",
    category: "Shoulder Bags",
    categorySlug: "shoulder-bags",
    subcategory: "Baguette Bags",
    price: 340,
    originalPrice: 420,
    discount: 19,
    rating: 4.7,
    reviewCount: 44,
    stock: 17,
    sku: "TH-SB-015",
    isPopular: false,
    isBestSeller: false,
    isNew: true,
    colors: [
      { name: "Croc Embossed Lilac", hex: "#C8A2C8" },
      { name: "Patent Black", hex: "#0A0A0A" },
      { name: "Cream Butter", hex: "#F3E5AB" }
    ],
    images: [
      "/images/products/product-15.jpg",
      "/images/products/product-8.jpg",
      "/images/products/product-2.jpg"
    ],
    shortDesc: "Chic elongated baguette bag with high-shine mock croc texture and chunky brass shoulder chain.",
    description: "The silhouette of the decade. Sits snug right beneath your shoulder, instantly elevating low-rise jeans, slip dresses, or structured blazers.",
    features: [
      "Embossed mock crocodile vegan leather",
      "Chunky brushed brass shoulder chain + leather shoulder pad",
      "Secure magnetic snap flap closure",
      "Internal zipped card pocket",
      "Mirror charm attached to zipper"
    ],
    specs: {
      dimensions: "27cm x 13cm x 6cm",
      weight: "320g",
      capacity: "2.1 Liters",
      warranty: "1 Year Standard Warranty"
    }
  },
  {
    id: 16,
    name: "Structured Work Shopper Tote",
    category: "Tote Bags",
    categorySlug: "tote-bags",
    subcategory: "Shopper Totes",
    price: 580,
    originalPrice: 690,
    discount: 16,
    rating: 4.8,
    reviewCount: 57,
    stock: 13,
    sku: "TH-TT-016",
    isPopular: false,
    isBestSeller: false,
    isNew: false,
    colors: [
      { name: "Saddle Tan", hex: "#9E5B32" },
      { name: "Rich Burgundy", hex: "#651C32" },
      { name: "Classic Black", hex: "#1C1C1C" }
    ],
    images: [
      "/images/products/product-16.jpg",
      "/images/products/product-9.jpg",
      "/images/products/product-4.jpg"
    ],
    shortDesc: "Roomy structured calfskin tote bag with reinforced handles and interior zip divider.",
    description: "Your reliable Monday-through-Friday anchor. Stands upright gracefully on the floor or desk, keeping paperwork, iPad, charger, and makeup strictly organized.",
    features: [
      "Semi-rigid smooth calfskin leather",
      "Reinforced double handles with cross-stitch anchoring",
      "Full zipper top prevents items from spilling",
      "Padded central tablet compartment",
      "Key leash with brass swivel trigger snap"
    ],
    specs: {
      dimensions: "40cm x 29cm x 14cm",
      weight: "890g",
      capacity: "15 Liters",
      warranty: "2 Years Limited Warranty"
    }
  },
  {
    id: 17,
    name: "Minimalist Half-Moon Sling",
    category: "Sling Bags",
    categorySlug: "sling-bags",
    subcategory: "Half-Moon Slings",
    price: 320,
    originalPrice: 390,
    discount: 18,
    rating: 4.9,
    reviewCount: 50,
    stock: 21,
    sku: "TH-SL-017",
    isPopular: false,
    isBestSeller: true,
    isNew: false,
    colors: [
      { name: "Caramel Brown", hex: "#A76840" },
      { name: "Alabaster", hex: "#FAF0E6" },
      { name: "Sage Green", hex: "#9CAF88" }
    ],
    images: [
      "/images/products/product-17.jpg",
      "/images/products/product-10.jpg",
      "/images/products/product-5.jpg"
    ],
    shortDesc: "Organic demi-lune crossbody bag in butter-soft nappa leather with adjustable strap.",
    description: "A viral silhouette adored by style influencers worldwide. Its seamless arch profile tucks neatly across the body, offering featherweight elegance on long strolls and flights.",
    features: [
      "Supple full-grain nappa leather",
      "Two-way curved nylon zipper for left or right access",
      "Interior slip pocket for passport or phone",
      "Adjustable webbed leather strap (80cm - 130cm)",
      "Featherlight construction"
    ],
    specs: {
      dimensions: "30cm x 17cm x 9cm",
      weight: "260g",
      capacity: "3.5 Liters",
      warranty: "1 Year Standard Warranty"
    }
  },
  {
    id: 18,
    name: "Tri-Fold Compact RFID Wallet",
    category: "Wallets",
    categorySlug: "wallets",
    subcategory: "Tri-Fold Wallets",
    price: 145,
    originalPrice: 180,
    discount: 19,
    rating: 4.6,
    reviewCount: 33,
    stock: 28,
    sku: "TH-WL-018",
    isPopular: false,
    isBestSeller: false,
    isNew: false,
    colors: [
      { name: "Vintage Cognac", hex: "#9A5B2D" },
      { name: "Emerald Pine", hex: "#1D3C34" },
      { name: "Midnight Black", hex: "#161616" }
    ],
    images: [
      "/images/products/product-18.jpg",
      "/images/products/product-11.jpg",
      "/images/products/product-1.jpg"
    ],
    shortDesc: "Palm-sized tri-fold leather wallet with external snap coin pocket and 8 card holders.",
    description: "Tiny in your palm, vast in capacity. Easily slides into small evening clutches or coat pockets while accommodating 8 cards and full unfolded bills.",
    features: [
      "Waxed pull-up leather that distresses handsomely",
      "RFID Faraday lining against card cloning",
      "Exterior gusseted snap-flap coin pouch",
      "Full-length unfolded bill compartment",
      "Thumb-slide ID window slot"
    ],
    specs: {
      dimensions: "10.5cm x 8cm x 3cm",
      weight: "110g",
      capacity: "Tri-Fold Compact",
      warranty: "1 Year Standard Warranty"
    }
  },
  {
    id: 19,
    name: "Cabin Duffle with Shoe Compartment",
    category: "Travel Bags",
    categorySlug: "travel-bags",
    subcategory: "Cabin Bags",
    price: 610,
    originalPrice: 780,
    discount: 22,
    rating: 4.8,
    reviewCount: 40,
    stock: 11,
    sku: "TH-TB-019",
    isPopular: false,
    isBestSeller: false,
    isNew: true,
    colors: [
      { name: "Heather Charcoal", hex: "#36454F" },
      { name: "Navy Canvas", hex: "#1A2930" }
    ],
    images: [
      "/images/products/product-19.jpg",
      "/images/products/product-3.jpg",
      "/images/products/product-7.jpg"
    ],
    shortDesc: "Smart flight duffle engineered with isolated ventilated shoe pocket and waterproof wash pouch.",
    description: "The ultimate overhead-bin companion. Designed to keep dirty sneakers away from fresh press shirts, with an organized front tech station for tablet, passport, and chargers.",
    features: [
      "Waterproof tarpaulin base and 900D ripstop fabric",
      "Isolated side zipper shoe garage with dual eyelets",
      "Luggage trolley sleeve with zip pocket",
      "Detachable ergonomic memory-foam shoulder pad",
      "Includes TSA-approved clear toiletry case"
    ],
    specs: {
      dimensions: "48cm x 28cm x 24cm",
      weight: "1.1kg",
      capacity: "32 Liters",
      warranty: "3 Years Travel Warranty"
    }
  },
  {
    id: 20,
    name: "Emerald Velvet Minaudière Clutch",
    category: "Clutches",
    categorySlug: "clutches",
    subcategory: "Minaudières",
    price: 395,
    originalPrice: 495,
    discount: 20,
    rating: 4.9,
    reviewCount: 28,
    stock: 12,
    sku: "TH-CL-020",
    isPopular: false,
    isBestSeller: false,
    isNew: true,
    colors: [
      { name: "Royal Emerald", hex: "#046307" },
      { name: "Deep Ruby", hex: "#841B2D" },
      { name: "Sapphire Midnight", hex: "#0F2537" }
    ],
    images: [
      "/images/products/product-20.jpg",
      "/images/products/product-12.jpg",
      "/images/products/product-6.jpg"
    ],
    shortDesc: "Lush jewel-toned silk velvet hardcase box clutch framed in antique gold filigree.",
    description: "An opulent conversation starter for galas, festive celebrations, and weddings. Hand-lined in golden satin with an intricate floral clasp set with mother-of-pearl.",
    features: [
      "Plush silk-blend velvet upholstery",
      "Antique brass filigree frame and hinge",
      "Mother-of-pearl inlaid top latch",
      "Concealable gold shoulder chain",
      "Accommodates phone, lipstick, cards and keys"
    ],
    specs: {
      dimensions: "18cm x 11cm x 5.5cm",
      weight: "360g",
      capacity: "1.1 Liters",
      warranty: "1 Year Luxury Care Warranty"
    }
  }
];

export default products;
