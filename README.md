# THAANGI HANDBAGS – Luxury E-Commerce Website

A modern, responsive handbag e-commerce web application developed with **React 19**, **Vite**, **JavaScript**, **HTML5**, **CSS3**, and **Bootstrap 5**, replicating the reference design structure of the [Bisum Bag Theme](https://spreethemesprevious.github.io/bisum/html/index-bag.html) customized for **THAANGI HANDBAGS**.

---

## 👜 Features & Modules

### 1. Reference Layout & Design System
- **Announcement Bar:** Top contact line (`Call: +1 078 2376`), sale promotion announcement, and User account / Currency switcher.
- **Brand Header & Navbar:** Responsive navigation, desktop mega menus, and mobile slide-out drawer menu.
- **Search, Wishlist & Cart Counters:** Live badges reflecting cart and wishlist counts.
- **Hero Slider:** Autoplay and manual dot-navigation slider showcasing hero handbag releases with warm coral CTA buttons.
- **Side-by-Side Promotional Banners:** Mini Backpack & New Year Sale banners with pastel card backdrops.
- **Popular Products Grid:** 8-product showcase featuring instant hover action buttons:
  - **`QUICKVIEW`**: Opens a fast modal with color swatches, gallery, and quantity selection.
  - **`ADD TO CART`**: One-click cart addition with toast notifications.
- **Shop By Category (Bento Masonry Grid):** 5-card layout matching Bisum with customized soft pastel backgrounds (`#FBECEE`, `#EBF3FC`, `#EAF4F4`, `#FFF3EA`, `#EFF1FD`).
- **Latest Blogs:** Editorial articles covering handbag fashion, luxury craftsmanship, and sustainability.
- **Instagram Gallery:** Interactive 4-square gallery feed (`@thaangi_style`).
- **Frequently Asked Questions (FAQ):** Two-column interactive accordion with a "SEE MORE" link to the full FAQ center.
- **Newsletter Subscription:** Two-column promotional banner with email validation.
- **Brand Partners:** Monochrome luxury partner logos strip.
- **Multi-column Footer:** About, Shopping categories, Help, Newsletter signup, social links, and smooth scroll-to-top floating button.

---

### 2. Customer Features & Workflows
- **Authentication:** Registration, Login, Logout, and Forgot Password (with 1-click demo credential filler).
- **Customer Profile & Address Book:**
  - View & edit personal contact details and VIP membership status.
  - Add, edit, delete, and set default shipping addresses.
  - Password change security form.
- **Shop & Catalog:**
  - Category & subcategory filtering (Handbags, Sling Bags, Tote Bags, Shoulder Bags, Backpacks, Clutches, Wallets, Travel Bags).
  - Price range slider ($100 – $2,000).
  - Color filter swatches.
  - In-stock availability toggle.
  - Sorting (Featured, Newest, Price: Low to High, Price: High to Low, Rating, Biggest Savings).
- **Product Details Page:**
  - High-res image gallery with interactive thumbnail switcher.
  - Real-time stock status and SKU identification.
  - Color swatch selector & quantity adjusters.
  - Tabbed specification sheet: Features & Story, Dimensions & Technical Specs, Leather Care Guide, and Customer Reviews with an interactive review submission form.
  - "You May Also Admire" related products carousel.
- **Shopping Cart & Slide-out Drawer:**
  - Interactive table: update quantities, remove items, clear cart.
  - Free shipping progress bar (orders over $500 qualify for free express shipping).
  - Live coupon codes: `THAANGI10` (10% off), `FIRST50` ($50 off), `FESTIVE25` (25% off), `FREESHIP` (Free shipping).
  - Tax calculation (5% luxury tax) & shipping fees.
- **Multi-Method Checkout:**
  - Shipping address pre-filled from customer address book.
  - Delivery options: DHL Express Insured vs. White Glove Overnight Courier.
  - Payment methods:
    1. **Credit / Debit Cards** (with test card auto-fill)
    2. **UPI** (Dynamic QR code + VPA entry)
    3. **Net Banking** (Major banks dropdown)
    4. **Digital Wallets** (Apple Pay, Google Pay, PayPal)
    5. **Cash on Delivery (COD)**
- **Order Placement & Confirmation:**
  - Celebration confetti effect upon order placement.
  - Order ID generation, delivery date, itemized receipt.
- **Order History & Real-Time Tracking:**
  - Stepper tracking journey: *Order Placed → Payment Confirmed → Crafted & Packed → Shipped via DHL → Delivered*.
  - Order cancellation request modal with cancellation reason selection.
  - **Tax Invoice Modal:** Formatted printable and downloadable tax invoice with THAANGI branding.
- **Customer Support:**
  - Contact form with auto-responder feedback.
  - Floating WhatsApp concierge chat button (`+1 078 2376`).
  - Searchable FAQ categorized by Ordering, Shipping, Leather Care, and Returns.

---

## 📁 Project Structure

```
THAANGI-HANDBAGS/frontend/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── hero/          # Hero slider luxury bag imagery
│       ├── banners/       # Promotional & newsletter banner images
│       ├── categories/    # Bento grid category images
│       ├── products/      # 20+ High-res product photographs
│       ├── blogs/         # Blog editorial photos
│       ├── instagram/     # Instagram feed square imagery
│       └── brands/        # Monochrome partner SVG logos
├── src/
│   ├── assets/            # App icons and assets
│   ├── components/        # Reusable UI Components
│   │   ├── AnnouncementBar.jsx
│   │   ├── Header.jsx
│   │   ├── HeroSlider.jsx
│   │   ├── PromoBanners.jsx
│   │   ├── ProductCard.jsx
│   │   ├── QuickViewModal.jsx
│   │   ├── CategoryBento.jsx
│   │   ├── BlogSection.jsx
│   │   ├── InstagramSection.jsx
│   │   ├── FaqSection.jsx
│   │   ├── NewsletterSection.jsx
│   │   ├── BrandLogos.jsx
│   │   ├── Footer.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── SearchModal.jsx
│   │   ├── ToastNotification.jsx
│   │   └── WhatsAppButton.jsx
│   ├── context/           # React Context Providers
│   │   ├── AuthContext.jsx       # User auth, profile, addresses, orders
│   │   ├── CartContext.jsx       # Cart items, quantities, coupons, totals
│   │   └── WishlistContext.jsx   # Wishlist items, toggle, counters
│   ├── data/              # Editable Demo Data
│   │   ├── products.js    # 20+ Handbags with categories, prices, specs
│   │   ├── categories.js  # 8 Handbag categories with subcategories
│   │   ├── banners.js     # Hero slides, promo banners, instagram posts
│   │   ├── coupons.js     # Valid promo vouchers
│   │   ├── blogs.js       # Editorial articles
│   │   └── faqs.js        # Frequently asked questions
│   ├── pages/             # Route Pages
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── Orders.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── FAQ.jsx
│   ├── styles/            # Theme & Component Styling
│   │   ├── theme.css      # Colors, typography, buttons, badges
│   │   └── components.css # Bisum reference layout & hover animations
│   ├── App.jsx            # Routing and global layout structure
│   ├── index.css          # Base resets
│   └── main.jsx           # App entrypoint
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd "e:/Thaangi Bags/THAANGI-HANDBAGS/frontend"
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Production Build
```bash
npm run build
```
Builds optimized production assets to the `dist/` directory.
