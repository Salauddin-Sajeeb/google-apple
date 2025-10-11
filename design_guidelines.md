# Pass Generator Design Guidelines

## Design Approach: Modern Utility with Premium Polish

**Selected Framework:** Design System Approach with Material Design principles
**Justification:** Pass generator is a utility-focused application requiring clarity, efficiency, and trust. Material Design provides excellent form patterns and card components while allowing creative customization for the pass preview card.

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 220 85% 55% (Confident blue - trustworthy for pass generation)
- Background: 220 15% 98% (Soft neutral)
- Surface: 0 0% 100% (Pure white for cards)
- Text Primary: 220 20% 15%
- Text Secondary: 220 10% 45%

**Dark Mode:**
- Primary: 220 80% 65%
- Background: 220 20% 10%
- Surface: 220 18% 15%
- Text Primary: 220 10% 95%
- Text Secondary: 220 10% 70%

**Pass Card Accent:** 250 70% 60% (Distinct purple-blue for pass visual interest)

### B. Typography

**Font Stack:**
- Primary: 'Inter', system-ui, sans-serif (via Google Fonts)
- Monospace: 'JetBrains Mono' (for pass IDs/numbers)

**Hierarchy:**
- Page Title: 2.5rem (40px), font-weight 700
- Section Headers: 1.5rem (24px), font-weight 600
- Form Labels: 0.875rem (14px), font-weight 500, uppercase tracking
- Body Text: 1rem (16px), font-weight 400
- Pass Details: 0.875rem (14px), font-weight 500

### C. Layout System

**Spacing Units:** Tailwind spacing of 2, 4, 6, 8, 12, 16, 20, 24
- Form field gaps: gap-6
- Section padding: py-20 (desktop), py-12 (mobile)
- Card padding: p-8
- Button padding: px-8 py-4

**Container Strategy:**
- Max width: max-w-6xl mx-auto
- Form container: max-w-md (centered)
- Pass preview: max-w-sm to max-w-md

---

## Component Specifications

### 1. Hero/Header Section
- Clean, centered layout with gradient background (220 85% 55% to 250 70% 60%)
- Page title: "Generate Your Digital Pass"
- Subtitle: "Create secure, wallet-ready passes in seconds"
- Height: min-h-[40vh] on desktop, min-h-[30vh] mobile
- NO large hero image - focus on clean typography and gradient

### 2. Form Container
**Layout:** Single column, centered, max-w-md
**Form Fields (in order):**
1. First Name (required)
2. Last Name (required)
3. Email (required, with validation pattern)
4. Points (number input, min 0)

**Input Styling:**
- Border: 2px solid with focus ring in primary color
- Rounded: rounded-lg
- Padding: px-4 py-3
- Dark mode: transparent background with border
- Labels: Floating or top-aligned with 2px bottom spacing
- Focus state: Scale border, add primary color glow

**Generate Pass Button:**
- Full width (w-full)
- Large size: px-8 py-4 text-lg
- Primary color background with white text
- Rounded-lg
- Hover: Lift with shadow-lg, slight scale (1.02)
- Loading state: Spinner animation

### 3. Pass Preview Card
**Appearance:** Modern digital pass card design
- Dimensions: Aspect ratio similar to credit card (1.586:1)
- Background: Gradient from primary to accent color
- Rounded corners: rounded-2xl
- Shadow: shadow-2xl
- Subtle pattern overlay or mesh gradient

**Pass Content Layout:**
- Top section: Logo/icon placeholder + "Digital Pass" label
- Middle: User's full name (large, bold, white)
- Bottom row: Email (small, semi-transparent white)
- Bottom right: Points badge (rounded-full, contrasting background)
- Pass ID: Bottom left in monospace font

**Visual States:**
- Initial: Hidden/opacity-0
- After generation: Fade in with scale animation
- Hover: Subtle lift (translateY -4px)

### 4. Wallet Integration Buttons
**Layout:** Two buttons side-by-side on desktop, stacked on mobile
- Gap: gap-4
- Each button: flex items-center justify-center

**Google Wallet Button:**
- Black background (#000000)
- White text + Google Wallet icon
- Rounded-lg, px-6 py-3
- Icon: Google Wallet SVG (use Font Awesome or Heroicons placeholder)

**Apple Wallet Button:**
- Black background (#000000)
- White text + Apple logo
- Rounded-lg, px-6 py-3
- Icon: Apple logo (Font Awesome)

**Shared Button Behavior:**
- Hover: Opacity 0.9, slight scale
- Active: Scale 0.98

### 5. Supporting Elements
**Information Section (Below Pass):**
- Small card with icon
- Text: "Your pass is automatically encrypted and ready for digital wallets"
- Icon: Shield or lock (Heroicons)
- Background: Surface color
- Border: Subtle border
- Padding: p-6
- Rounded: rounded-lg

---

## Animation Guidelines

**Use Sparingly:**
1. Form submit: Button loading spinner only
2. Pass card reveal: Fade in + scale from 0.95 to 1 (300ms ease-out)
3. Wallet button hover: Opacity + scale (200ms)
4. Input focus: Border glow transition (150ms)

**No:**
- Page load animations
- Scroll-triggered effects
- Background animations
- Excessive micro-interactions

---

## Accessibility & Polish

- Maintain WCAG AA contrast ratios (4.5:1 minimum)
- Form inputs: Clear focus indicators (3px outline)
- Error states: Red text below input with icon
- Success state: Green checkmark after generation
- Dark mode: All form inputs with proper contrast
- Mobile: Touch targets minimum 44px
- Keyboard navigation: Logical tab order

---

## Icon Library
**Use:** Heroicons (via CDN) for all UI icons
- Form field icons: envelope, user, chart-bar
- Security icon: shield-check
- Wallet icons: Use Font Awesome for brand logos (Google, Apple)

---

## Page Structure Flow

1. **Header/Hero** (gradient background)
2. **Form Section** (white/dark surface, centered)
3. **Pass Preview** (appears after generation, centered)
4. **Wallet Buttons** (directly below pass)
5. **Info Card** (reassurance text)
6. **Footer** (minimal, links if needed)

**Vertical Rhythm:** py-16 between major sections, py-8 within sections