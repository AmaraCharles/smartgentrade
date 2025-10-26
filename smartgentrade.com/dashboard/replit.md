# smartgentrade - Copy Trading & Investment Platform

## Overview

smartgentrade is a copy trading and investment platform that enables users to trade forex, CFD, crypto, stocks, futures, and options. The platform features social trading capabilities where users can follow and mirror trades from master traders. Built with a modern TypeScript stack, it provides real-time market data visualization, account management, and automated copy trading functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**UI Component System**: Shadcn/ui components built on Radix UI primitives, providing a comprehensive set of accessible, customizable components. The design follows a trading platform pattern inspired by Robinhood, Coinbase, and TradingView, prioritizing information hierarchy and functional efficiency.

**Styling**: Tailwind CSS with a custom design system defined in `design_guidelines.md`. The application uses a dark-first color scheme (220 25% 8% background) optimized for financial data visualization, with HSL color variables for theming support.

**State Management**: TanStack Query (React Query) for server state management and data fetching. Custom query client configured with credentials-based authentication and error handling.

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router.

**Key Pages**:
- Market: Trading pairs display with real-time price data and buy/sell actions
- Social Trading: Master trader profiles with copy trading functionality
- Fund Account: Deposit interface for multiple wallet types
- Profile: User account management and KYC status
- Investment: Active trades and copy trading portfolio view
- Withdrawal: Withdrawal request interface

### Backend Architecture

**Server Framework**: Express.js with TypeScript, configured for ESM modules.

**Development Setup**: Custom Vite middleware integration for hot module replacement during development. The server proxies requests to Vite's dev server while handling API routes separately.

**API Structure**: RESTful API design with routes prefixed under `/api`. Currently implements placeholder routes with storage interface ready for implementation.

**Session Management**: Express session configuration prepared (connect-pg-simple for PostgreSQL session storage).

**Storage Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation (`MemStorage`) for development. Designed to be swapped with database-backed implementation for production.

### Database Architecture

**ORM**: Drizzle ORM for type-safe database operations and schema management.

**Database**: PostgreSQL (via Neon serverless driver), configured through environment variable `DATABASE_URL`.

**Schema Design**:
- `users`: Core user data with authentication, profile information, KYC status, account level, and balance
- `tradingPairs`: Market data for trading symbols across multiple asset categories
- `masterTraders`: Profiles for experienced traders available for copy trading
- `trades`: Transaction records for user trading activity

**Migration Strategy**: Drizzle Kit manages schema migrations with outputs in `./migrations` directory.

### Design System

**Typography**: Inter font family from Google Fonts with specific weight and size scales for different UI elements (display, headings, body, captions, data/prices).

**Color Palette**: 
- Dark mode primary with neutral base colors
- Accent colors for success (green), danger (red), warning (amber), and primary actions (blue)
- HSL-based color system with alpha channel support for transparency

**Layout Principles**:
- Fixed sidebar (240px, collapsible to 64px)
- Fluid main content with max-width constraint (max-w-7xl)
- Consistent spacing using Tailwind's spacing scale
- Card-based component architecture

**Component Patterns**: Trading platform-specific components including trading pair cards with mini charts (Recharts), master trader profiles, modal-based trade execution, and copy trading configuration.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (accordion, dialog, dropdown, popover, select, tabs, toast, tooltip, etc.)
- **Shadcn/ui**: Pre-built component implementations using Radix UI and Tailwind CSS
- **Recharts**: Chart library for financial data visualization (area charts, line charts)
- **Embla Carousel**: Touch-enabled carousel component
- **cmdk**: Command palette/search component

### Data Fetching & State
- **TanStack Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation library
- **Drizzle-Zod**: Integration between Drizzle ORM and Zod for type-safe validation

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **Drizzle Kit**: Schema migration and management tool

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Utility class name merging (via `cn` helper)
- **class-variance-authority**: Type-safe component variant management
- **Wouter**: Lightweight client-side routing

### Development Tools
- **Vite**: Fast build tool and dev server with HMR
- **TypeScript**: Type safety across frontend and backend
- **PostCSS & Autoprefixer**: CSS processing
- **ESBuild**: Fast JavaScript bundler for production server build
- **TSX**: TypeScript execution for development server

### Potential Future Integrations
- **TradingView**: Currently included as script reference for advanced charting (tv.js)
- **Real-time market data providers**: For live price feeds
- **Payment gateways**: For deposit/withdrawal processing (crypto wallets: BTC, ETH, LTC, USDT)
- **KYC verification services**: For user identity verification
- **Email services**: For notifications and alerts