---
name: Fiscal Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The brand personality is rooted in **trust, efficiency, and sophistication**. The design system targets a professional audience that requires rapid, accurate financial data without cognitive friction. 

The aesthetic is **Modern Minimalist** with a focus on data clarity. It utilizes a card-based architecture to group logical functions (e.g., input, conversion results, historical trends). The interface feels premium through the use of expansive whitespace, precise typography, and a "soft-UI" approach that avoids harsh lines in favor of depth and intentionality.

## Colors
The palette is engineered for professional financial contexts:
- **Primary (Deep Navy - #0F172A):** Used for primary headings, navigation, and high-emphasis text to establish authority.
- **Secondary (Emerald Green - #10B981):** Reserved for "growth" signals, success states, and the primary "Convert" action. It symbolizes financial health.
- **Tertiary (Slate - #64748B):** Used for secondary text, icons, and supporting information to provide hierarchy without distraction.
- **Neutral (Soft Gray - #F8FAFC):** The primary background color, providing a low-contrast canvas that reduces eye strain.
- **Surface:** Pure white (#FFFFFF) is used for cards and interactive elements to lift them off the neutral background.

## Typography
**Inter** is the sole typeface, chosen for its exceptional legibility in data-heavy environments. 
- **Headlines:** Use tighter letter spacing and heavier weights to create a sense of stability.
- **Numbers:** Ensure the use of tabular lining figures (if available) for currency amounts to maintain vertical alignment in lists and tables.
- **Labels:** Use Medium (500) or SemiBold (600) weights for all form labels and small UI metadata to ensure they remain readable against soft backgrounds.

## Layout & Spacing
This design system utilizes a **Fixed Grid** approach for desktop to maintain a professional, organized "dashboard" feel, transitioning to a fluid layout for mobile.

- **Desktop (1440px+):** 12-column grid, 1200px max-width, 24px gutters.
- **Tablet (768px - 1024px):** 8-column grid, 24px gutters, 32px side margins.
- **Mobile (<768px):** 4-column fluid grid, 16px side margins.

Spacing follows an 8px geometric scale. Content should be grouped in cards with consistent internal padding (32px for desktop, 24px for mobile) to maintain a cohesive visual rhythm.

## Elevation & Depth
Depth is created through **Ambient Shadows** and **Tonal Layering** rather than heavy borders.

- **Level 0 (Background):** Neutral Gray (#F8FAFC).
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a subtle, highly diffused shadow (0px 4px 20px rgba(15, 23, 42, 0.05)).
- **Level 2 (Active/Hover):** Increased shadow spread (0px 10px 30px rgba(15, 23, 42, 0.08)) to indicate interactivity.

Floating elements like dropdown menus or tooltips use a more pronounced shadow to distinguish them from the card layer. No harsh black shadows are permitted; all shadows must be tinted with the Primary Navy color to remain soft and sophisticated.

## Shapes
The design system uses a generous rounding logic to soften the professional tone, making the application feel modern and accessible.

- **Standard Elements (Buttons, Inputs):** 0.5rem (8px).
- **Large Elements (Cards, Containers):** 1.5rem (24px) — equivalent to `rounded-2xl` in modern frameworks.
- **Small Elements (Chips, Badges):** Pill-shaped (9999px) to contrast against the structured card layout.

## Components
- **Buttons:** 
  - *Primary:* Emerald Green background with White text. Bold, sans-serif labels. 
  - *Secondary:* Transparent background with Navy border and text. 
- **Currency Inputs:** Large, clear numerical text. Include a prominent currency flag/ISO code selector on the right side of the field. Use a 1px Slate-200 border that thickens and turns Emerald Green on focus.
- **Cards:** The primary container. Must have 24px - 32px padding and 1.5rem corner radius.
- **Chips/Badges:** Used for "Trending" currencies or "High/Low" indicators. Small text, pill-shaped, with low-opacity background tints of the status color (e.g., light green tint for growth).
- **Lists:** Currency historical lists should use subtle dividers (1px Slate-100) and generous vertical padding (16px) to ensure data rows are scannable.
- **Switch/Toggle:** Used for "Reverse Currency" actions. Circular button with a Navy icon, floating between the two main input cards.