

# Kitchen Cabinet eCommerce Website

## Overview
A premium, futuristic, light-themed eCommerce website for a kitchen cabinet company featuring a clean, airy aesthetic with glassmorphism effects, smooth animations, and full shopping functionality.

## Design System
- **Colors**: White, soft grey (#F5F5F0), light beige (#FAF8F5), warm wood tones (#C4A882), subtle green accents (#7FA87F), dark text (#1A1A2E)
- **Style**: Glassmorphism cards, soft gradients, rounded corners (xl/2xl), modern sans-serif typography
- **Animations**: Fade-in on scroll, hover scale effects, smooth transitions throughout

## Pages & Features

### 1. Homepage
- **Hero Section**: Full-width luxury kitchen imagery with headline "Future-Ready Kitchen Cabinets Designed for Modern Living", two CTAs (Shop Cabinets / Get Custom Quote)
- **Featured Categories**: Base, Wall, Pantry, Custom, and High-Gloss cabinets — each with image, description, and Shop Now button
- **Featured Products**: Product cards with image, name, price, star rating, Add to Cart, wishlist heart icon, and Quick View modal
- **Custom Kitchen Builder**: 4-step process cards (Measure → Design → Manufacture → Install) with "Design My Kitchen" CTA
- **Why Choose Us**: Icon cards for Premium Materials, Precision Craftsmanship, Fast Installation, 10-Year Warranty, Eco-Friendly Materials
- **Testimonials**: Horizontal slider with client reviews, avatars, and ratings
- **About Preview**: Short company story section
- **Footer**: Contact info, quick links, social icons, newsletter signup

### 2. Shop Page
- Product grid with sidebar filters (category, price range, material)
- Search bar at top
- Sort options (price, rating, name)
- Product cards with Add to Cart and Wishlist functionality

### 3. Product Detail Page
- Large product image gallery
- Product info (name, price, description, specs, rating)
- Quantity selector, Add to Cart, Add to Wishlist buttons
- Related products section

### 4. Cart Page
- List of cart items with images, names, prices
- Quantity update (+/−) and remove buttons
- Order subtotal, shipping estimate, total
- "Proceed to Checkout" button

### 5. Checkout Page
- Billing details form (name, email, phone, address)
- Order summary sidebar
- Payment method selection UI (Visa, Mastercard, EFT placeholders)
- Place Order button with confirmation

### 6. Wishlist Page
- Saved products grid
- Move to Cart / Remove options

### 7. Custom Cabinets Page
- Detailed custom cabinet process explanation
- Quote request form (kitchen dimensions, style preferences, contact info)

### 8. About Page
- Company story, mission, values
- Team or workshop imagery section

### 9. Contact Page
- Contact form (name, email, message)
- Company address, phone, email display
- Embedded map placeholder

### Navigation & Layout
- **Sticky Navbar**: Logo, Home, Shop, Custom Cabinets, About, Contact, search icon, wishlist icon, cart icon with live badge count
- **Glassmorphism effect** on scroll (semi-transparent blur background)
- Fully responsive across mobile, tablet, and desktop

### State Management
- React Context for Cart (add, remove, update quantity, totals)
- React Context for Wishlist (add, remove, toggle)
- All data stored in client-side state (mock product data)

