# Design Guidelines: Copy Trading & Investment Dashboard

## Design Approach
**Selected Approach:** Trading Platform Pattern System (Reference: Robinhood, Coinbase, TradingView)
**Justification:** Financial platforms require trust, clarity, and data density. Design prioritizes information hierarchy and functional efficiency over decorative elements.

## Core Design Elements

### A. Color Palette

**Dark Mode Primary (Default):**
- Background Base: 220 25% 8%
- Surface Cards: 220 20% 12%
- Surface Elevated: 220 18% 16%
- Border Subtle: 220 15% 20%

**Accent Colors:**
- Primary Blue: 230, 91%, 49%
- Success Green: 145 65% 50%
- Danger Red: 0 75% 55%
- Warning Amber: 38 92% 58%

**Text Hierarchy:**
- Primary Text: 0 0% 95%
- Secondary Text: 220 10% 65%
- Muted Text: 220 8% 45%

### B. Typography
**Font Stack:** Inter (Google Fonts) for all text
- Display Large (Hero): 600 weight, 32px
- Heading 1: 600 weight, 24px
- Heading 2: 600 weight, 20px
- Body Large: 400 weight, 16px
- Body Default: 400 weight, 14px
- Caption/Labels: 500 weight, 12px, uppercase tracking
- Data/Prices: 600 weight (tabular numbers)

### C. Layout System
**Spacing Primitives:** Use Tailwind units: 2, 4, 6, 8, 12, 16, 20
- Card padding: p-6
- Section gaps: gap-6 or gap-8
- Component spacing: space-y-4
- Grid gaps: gap-4 or gap-6

**Container Strategy:**
- Sidebar: Fixed 240px width (collapsed: 64px)
- Main content: Fluid with max-w-7xl
- Cards: Rounded corners (rounded-lg to rounded-xl)
- Modals: max-w-md to max-w-lg centered

### D. Component Library

**Navigation:**
- Persistent sidebar with icon + label
- Active state: Blue accent background (220 95% 20%)
- Hover: Subtle background lift (220 18% 14%)
- Top navigation tabs for asset categories

**Trading Pair Cards:**
- Grid layout: 2-4 columns responsive
- Each card shows: Pair name, current price, mini chart, percentage change, BUY/SELL buttons
- Chart: Lightweight sparkline (8-12 data points)
- Price: Large, bold, color-coded (green up, red down)

**Action Buttons:**
- BUY: Success green background, white text
- SELL: Danger red background, white text
- Primary actions: Blue accent background
- Secondary: Outline with blue border
- Size hierarchy: Large (py-3 px-6), Medium (py-2 px-4), Small (py-1.5 px-3)

**Data Display:**
- Statistics cards: Icon + label + large value + trend indicator
- Tables: Striped rows, hover highlight, sticky headers
- Status badges: Rounded-full, small text, color-coded
- Progress indicators: Thin bars with gradient fills

**Modals:**
- Backdrop: Darkened overlay (opacity-80)
- Container: Elevated surface on dark background
- Header: Bold title + close button
- Content: Form fields with clear labels
- Footer: Action buttons right-aligned

**Forms:**
- Input fields: Dark background with subtle border, focus: blue accent ring
- Dropdowns: Native select styled consistently
- Amount inputs: Large text, currency prefix/suffix
- Validation: Inline error messages in red

**Master Trader Cards (Social Trading):**
- Profile image (circular, 64px)
- Name + verification badge
- Stats grid: ROI, Win Rate, Followers, Total Trades
- Commission rate prominently displayed
- Mirror Trade button (primary blue)

### E. Micro-Interactions
**Minimal Animations:**
- Card hover: Subtle scale (1.01) + shadow elevation
- Button click: Scale down (0.98)
- Modal entry: Fade + slight scale up (duration-200)
- Price updates: Brief flash of color on change
- NO continuous animations or distracting effects

## Page-Specific Guidelines

**Landing/Market View:**
- Hero section: None - immediately show trading pairs grid
- Filter tabs at top: Forex, CFD, Crypto, Stock, Futures, Options
- 3-4 column grid of trading pair cards
- Each card compact but information-rich

**Social Trading:**
- Master trader cards in 2-3 column grid
- Sorting/filtering controls at top
- Each card shows comprehensive stats
- Copy trading modal triggered by "Mirror Trade" button

**Fund Account:**
- Clean form-focused layout
- Wallet selector dropdown with icons
- Large amount input field
- Payment method cards (if multiple options)
- Clear fee breakdown

**User Profile:**
- Two-column layout: Personal info left, account details right
- KYC status prominently displayed with badge
- Membership ID and tier information
- Account statistics cards

**Investment/Portfolio:**
- Dashboard overview cards (Total Balance, Active Trades, P&L)
- Active trades table with filters
- Mini charts for performance visualization

## Images
No large hero images required. Use:
- Trading pair logos/icons (crypto symbols, currency flags)
- Master trader profile photos (circular avatars)
- Payment method logos (wallet icons)
- Small decorative chart backgrounds (subtle, non-distracting)

## Critical Quality Standards
- All prices must use tabular numbers for alignment
- Color-code gains (green) and losses (red) consistently
- Maintain dark theme throughout - no jarring white surfaces
- Ensure high contrast for readability of financial data
- Test all interactive elements for clear feedback states
- Modal overlays must dim but not obscure context completely