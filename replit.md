# replit.md

## Overview

This is a full-stack project management and campaign management application built for handling client project requests, campaigns, messaging, and team collaboration. The application features dual login portals (Admin and Client), allowing admins to manage campaigns, approve/reject project requests, and communicate with team members, while clients can submit project requests and view their dashboard.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with React plugin

The frontend follows a page-based architecture with components organized in:
- `client/src/pages/` - Route-level components
- `client/src/components/ui/` - Reusable UI primitives from shadcn/ui
- `client/src/hooks/` - Custom React hooks
- `client/src/lib/` - Utility functions and configurations

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: Node.js with HTTP server
- **API Design**: RESTful endpoints prefixed with `/api`
- **Development Server**: Vite middleware for HMR in development

The backend uses a clean separation:
- `server/index.ts` - Express app setup and middleware
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Data access layer with storage interface
- `server/vite.ts` - Vite development server integration

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` - Contains database table definitions
- **Validation**: Zod schemas generated from Drizzle schema using drizzle-zod
- **Current Storage**: In-memory storage implementation (MemStorage class) with interface for easy database migration

The storage layer uses an interface pattern (`IStorage`) allowing easy swapping between in-memory storage and PostgreSQL.

### External Services Integration
- **Firebase**: Used for Firestore database and Firebase Storage on the client side
  - Firestore for storing project requests
  - Firebase Storage for file uploads/attachments
  - Configuration in `client/lib/firebase.ts`

### Shared Code
- `shared/schema.ts` - Database schema and TypeScript types shared between frontend and backend
- Path aliases configured: `@shared/*` maps to `./shared/*`

### Build Configuration
- TypeScript configured for ESNext modules with bundler resolution
- Vite builds frontend to `dist/public`
- esbuild bundles server to `dist/index.js`
- Path aliases: `@/*` for client source, `@shared/*` for shared code

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Neon Database**: Serverless PostgreSQL client (`@neondatabase/serverless`)
- **Drizzle Kit**: Database migrations and schema management

### Firebase Services
- **Firestore**: NoSQL database for project requests
- **Firebase Storage**: File storage for attachments
- Project ID: `kobodatabase-backend`

### Key Frontend Libraries
- **Recharts**: Data visualization for dashboards
- **Embla Carousel**: Carousel component
- **React Day Picker**: Calendar/date picker
- **React Hook Form**: Form handling with Zod resolver
- **Vaul**: Drawer component
- **cmdk**: Command menu component

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions