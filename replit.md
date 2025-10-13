# Pass Generator Application

## Overview

A modern web application for generating digital passes that can be added to Google Wallet or Apple Wallet. Built with React frontend and Express backend, the application allows users to create personalized passes with real-time preview, featuring a clean Material Design-inspired interface with dark mode support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized builds
- **Wouter** for lightweight client-side routing (instead of React Router)
- **TanStack Query** (React Query) for server state management and data fetching

**UI Framework & Design System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Material Design principles** for form patterns and card components
- Custom color palette supporting both light and dark modes (HSL-based)
- Typography: Inter for primary text, JetBrains Mono for monospaced content (pass IDs)

**Form Management**
- **React Hook Form** for performant form state management
- **Zod** for schema validation
- **@hookform/resolvers** for Zod integration with React Hook Form
- Real-time form watching for live preview updates

**Key Design Decisions**
- Component composition pattern using shadcn/ui for maximum flexibility
- Real-time preview using `useWatch` hook to track form changes
- Sidebar layout with `SidebarProvider` for responsive pass preview
- Motion animations using Framer Motion for enhanced UX

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for REST API endpoints
- **Node.js** runtime with ES modules (`"type": "module"`)
- Development and production build pipelines using tsx and esbuild

**Development Tooling**
- **Vite middleware mode** in development for seamless frontend integration
- Custom logging middleware for API request/response tracking
- Hot module replacement (HMR) with WebSocket support

**Architectural Patterns**
- Storage abstraction layer with `IStorage` interface for database operations
- In-memory storage implementation (`MemStorage`) as default, designed to be swapped with persistent storage
- Route registration pattern separating HTTP server setup from route definitions
- Error handling middleware for centralized error responses

### Data Layer

**ORM & Database**
- **Drizzle ORM** configured for PostgreSQL (via `@neondatabase/serverless`)
- Schema-first approach with TypeScript type inference
- Migration system using `drizzle-kit` for schema evolution

**Data Models**
- **Users Table**: Basic authentication structure (id, username, password)
- **Passes Table**: Core pass entity with firstName, lastName, email, points
- Zod schemas derived from Drizzle schemas for runtime validation

**Design Decisions**
- UUID-based primary keys using `gen_random_uuid()`
- Separation of insert schemas (validation) from select schemas (TypeScript types)
- Email validation at schema level for data integrity
- Points system with default value of 0 and non-negative constraint

### External Dependencies

**UI Component Libraries**
- **Radix UI** primitives for accessible, unstyled components (dialogs, dropdowns, accordions, etc.)
- **Lucide React** for icon system
- **React Icons** (specifically `react-icons/si`) for brand icons (Google, Apple)
- **QR Code generation** via `react-qr-code` for pass encoding
- **Framer Motion** for animation and transitions
- **embla-carousel-react** for carousel functionality
- **date-fns** for date manipulation and formatting

**Development Tools**
- **Replit-specific plugins**: runtime error overlay, cartographer, dev banner
- **PostCSS** with Tailwind CSS and Autoprefixer for CSS processing

**Database & Storage**
- **Neon Database** serverless PostgreSQL (@neondatabase/serverless)
- **connect-pg-simple** for PostgreSQL session storage (prepared for session management)

**Build & Type System**
- **TypeScript** with strict mode enabled
- **esbuild** for production server bundling
- Path aliases configured for clean imports (@/, @shared/, @assets/)

**QR Code Integration**
- Pass data encoded as JSON including id, name, email, points, and URL
- Draft mode for preview before pass generation
- Ready for wallet integration endpoints (Google Wallet, Apple Wallet)