# adyant-demo
Demo for Adyant Fragrances

# ADYANT™ — Elegance, Distilled.

## Overview
A hyper-premium, Awwwards-level, cinematic e-commerce landing page for **Adyant Fragrances**, featuring their flagship scent **HAPPIE** and the full collection. Built as a static frontend experience mimicking the high-fidelity Apple product reveal aesthetic tailored for luxury cosmetics.

---

## ✅ Completed Features

### Core Architecture
- **Cinematic Preloader** — Animated brand reveal with loading bar (2.4s)
- **Custom SVG-tracked cursor** — Smooth lag cursor with gold dot, scales on hover
- **Scroll progress bar** — Fixed gold gradient bar at page top

### Navigation
- **Glassmorphism navbar** — `backdrop-filter: blur(20px)`, becomes visible on scroll
- **Logo** — Adyant™ official PNG (white-inverted for dark background)
- **Nav links** — Collection, The Craft, Sustainability, Bespoke with gold underline hover
- **"Shop Now" CTA** — Gold gradient border button
- **Mobile hamburger menu** — Full-screen overlay with animated X toggle

### Hero Section
- **Particle canvas** — 120 gold + white floating particles, hardware-accelerated
- **Animated 3D perfume bottle** — CSS-built glass bottle with:
  - Gold metallic cap with shine + monogram
  - Atomizer collar + nozzle
  - Transparent glass body with amber liquid fill
  - Reflective shine layers
  - Animated liquid shimmer
  - Hand-crafted label: ADYANT™ / HAPPIE / Eau de Parfum
- **3D parallax mouse tracking** — Bottle rotates on mouse movement (desktop)
- **Floating scent notes** — Orange Blossom, Jasmine, Cedarwood labels
- **Hero typography** — Staggered word-by-word reveal animation
- **Scroll hint** — Animated gold line with "Scroll to explore"

### Scrollytelling Section (Olfactory Journey)
- **Pin + scroll narrative** — 400vh spacer with sticky canvas
- **3 narrative panels** — Left/Right/Center aligned with progress tracking
  - Panel 1: Top Notes — Orange Blossom
  - Panel 2: Heart Notes — Jasmine
  - Panel 3: Base Notes — Patchouli, Honey & Cedarwood
- **Bottle disassembly** — Cap and atomizer drift on scroll progress
- **Atmosphere gradient** — Background radial changes per panel
- **Progress dots** — Interactive dots at panel bottom

### Collection Grid (7 Fragrances)
- **Featured HAPPIE card** — Gold-tinted, prominent placement
- **All 7 fragrances** — HAPPIE, Eden Garden, Most Wanted by Night, Bombay Dreams, Valour, Provocateur, Royale
- **Glassmorphism cards** — Translucent with gold border glow on hover
- **Mini CSS 3D bottles** — Unique liquid colors per fragrance
- **Variant selector** — 50ml / 100ml toggle with price update animation
- **Spotlight glow** — Mouse-tracking radial gradient per card
- **Mini bottle tilt** — 3D perspective tilt on card hover
- **Add to Cart** — Gold gradient button with toast notification
- **Wishlist toggle** — Heart icon with color transition

### Craft Section
- **Two-column layout** — Story copy + animated stats
- **Counter animation** — Numbers count up when scrolled into view
  - 7 Fragrances, 100% Natural, 5000+ Customers, 3 Years
- **Brand quote** — Serif italic blockquote
- **Directional reveal** — Left/right slide-in animations

### Sustainability Section
- **6 trust pillars** — Handmade with Love, Cruelty-Free, Vegan, Skin-Friendly, Sustainable Packaging, Ethically Sourced
- **Staggered card reveal** — 120ms delay between cards
- **Icon hover animation** — Scale + rotate on hover

### Testimonials (Bespoke)
- **Infinite scroll carousel** — Continuous auto-scroll, pauses on hover
- **5 testimonials** — Real-feeling customer reviews
- **Serif italic styling** — Premium editorial feel

### Footer
- **4-column layout** — Brand, Collection links, Brand links, Newsletter
- **"Join the World of Adyant" newsletter** — Email validation + success state
- **Social links** — Instagram, Facebook, Twitter/X with hover animations
- **Legal strip** — Copyright + certifications

### Floating Utility
- **WhatsApp concierge button** — Monochromatic → green on hover
- **Pulse ring animation** — Green ring pulses outward
- **Tooltip** — "Luxury Concierge" label
- **Delayed appearance** — Shows after 4s (non-intrusive)

### Animations & Micro-interactions
- **Marquee band** — Continuous fragrance name scroll between sections
- **Magnetic buttons** — CTAs follow cursor slightly
- **Text scramble** — Hero eyebrow briefly scrambles with gold characters
- **Cinematic bottle glow** — Animated breathing glow ring on hero bottle
- **IntersectionObserver** — Hardware-accelerated scroll reveals throughout

---

## 📁 File Structure

```
/
├── index.html          # Main HTML — full page structure
├── css/
│   └── style.css       # All styles, animations, responsive
├── js/
│   └── main.js         # All interactions, scrollytelling, canvas
└── README.md
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#050505` (Deep Charcoal) |
| Gold | `#DAA520` (Goldenrod) |
| Dark Gold | `#B8860B` |
| Gold Light | `#F5C842` |
| Text Primary | `rgba(255,255,255,0.92)` |
| Text Secondary | `rgba(255,255,255,0.60)` |
| Font Main | Inter / SF Pro Display |
| Font Serif | Cormorant Garamond |
| Border Radius | 16px cards, 100px pills |

---

## 💰 Fragrance Catalog

| Fragrance | Notes | 50ml | 100ml |
|-----------|-------|------|-------|
| HAPPIE (Flagship) | Orange Blossom · Jasmine · Cedarwood | ₹2,499 | ₹4,299 |
| Eden Garden | Green Tea · Lotus · White Musk | ₹2,299 | ₹3,999 |
| Most Wanted by Night | Black Pepper · Cardamom · Amber | ₹2,799 | ₹4,799 |
| Bombay Dreams | Saffron · Rose · Sandalwood | ₹2,999 | ₹5,199 |
| Valour | Bergamot · Vetiver · Dark Oud | ₹2,699 | ₹4,599 |
| Provocateur | Tuberose · Musk · Black Vanilla | ₹2,899 | ₹4,999 |
| Royale | Neroli · Iris · Ambergris | ₹3,299 | ₹5,699 |

---

## 🔧 Technical Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, Animations, Glassmorphism, `backdrop-filter`
- **Vanilla JavaScript** — No frameworks, pure ES6+
- **Canvas API** — Particle system
- **IntersectionObserver API** — Scroll-triggered animations
- **RequestAnimationFrame** — Hardware-accelerated animations
- **Google Fonts** — Inter + Cormorant Garamond via CDN

---

## 🚀 Entry Points

| URL | Description |
|-----|-------------|
| `/` or `/index.html` | Main landing page |
| `#collection` | Jump to fragrance collection |
| `#craft` | The Craft section |
| `#sustainability` | Sustainability / brand trust |
| `#bespoke` | Testimonials / bespoke |

---

## 📋 Features Not Yet Implemented

- [ ] Actual backend cart / checkout flow
- [ ] Product detail pages per fragrance
- [ ] Real payment gateway integration
- [ ] Search functionality
- [ ] User account / order history
- [ ] Actual WhatsApp number integration (currently placeholder)
- [ ] CMS / product data management
- [ ] Multi-language support

## 🔮 Recommended Next Steps

1. **Connect real cart** — Integrate Razorpay / Stripe for payments
2. **Individual product pages** — Deep-dive page for each fragrance
3. **CMS integration** — Headless CMS for product content management
4. **Analytics** — Google Analytics + Meta Pixel integration
5. **WhatsApp Business** — Replace placeholder number with real business number
6. **SEO** — Add Open Graph tags, sitemap, structured data
7. **Performance** — Add WebP images, CDN assets for real bottle photography
