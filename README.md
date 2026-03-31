# Sri Lanka Tourism Portal

A comprehensive Sri Lanka travel portal with AI-enabled services for worldwide travelers, featuring personalized trip planning, medical tourism, and complete booking management.

## Features

- **Destinations** — Browse and explore Sri Lankan destinations with filters and detail pages
- **Trip Planner** — Multi-step planner: preferences → itinerary → transport → hotels → tours → summary → confirmation
- **Experiences** — Adventure activities, luxury experiences, and local tours
- **Medical Tourism** — Hospitals, procedures, and medical service information
- **Booking** — Flights, hotels, transport, and package bookings
- **User Portals** — Role-based dashboards (Tourist, Host, Operator, Government Admin)
- **Support** — Tickets and complaints
- **Visa** — Visa information and guidance
- **Multi-language & Currency** — Language and currency context providers
- **Accessibility** — Skip links, ARIA labels, and keyboard-friendly navigation

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, TypeScript, Vite, React Router, TanStack Query, Zustand, Framer Motion |
| **UI** | Tailwind CSS, Radix UI, Lucide React, class-variance-authority |
| **Backend** | Express (Node.js), REST API serving JSON data |
| **Database** | Prisma ORM, MySQL (optional; app can run with JSON data only) |

## Prerequisites

- **Node.js** 18+ and npm
- **MySQL** (optional) — only if you use Prisma/DB features

## Getting Started

### 1. Clone and install

```bash
git clone <repository-url>
cd visitsrilanka-dev
npm install
```

### 2. Environment (optional)

Create `.env` in the project root if you use the database or auth:

```env
# Optional: for Prisma
DATABASE_URL="mysql://user:password@localhost:3306/srilanka_tourism"

# Optional: for auth (e.g. NextAuth)
NEXTAUTH_URL=http://localhost:5173
NEXTAUTH_SECRET=your-secret
NODE_ENV=development
```

See [docs/ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md) for full details.

### 3. Run the app

**Frontend only (Vite dev server, port 5173):**

```bash
npm run dev
```

**API server only (Express, port 3001):**

```bash
npm run dev:server
```

**Frontend + API together (recommended for full features):**

```bash
npm run dev:all
```

Then open:

- **App:** [http://localhost:5173](http://localhost:5173)
- **API:** [http://localhost:3001](http://localhost:3001) (e.g. `/api/destinations`)

### 4. Build for production

```bash
npm run build
npm run preview   # preview production build
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (frontend) |
| `npm run dev:server` | Start Express API server |
| `npm run dev:all` | Start both frontend and API |
| `npm run build` | TypeScript check + Vite build |
| `npm run preview` | Preview production build |
| `npm run start` | Run API server only |
| `npm run db:push` | Prisma: push schema to DB |
| `npm run db:seed` | Prisma: run seed script |
| `npm run db:studio` | Open Prisma Studio |

## Project Structure

```
visitsrilanka-dev/
├── data/                 # JSON data (destinations, hotels, packages, etc.)
├── docs/                 # Documentation (API, deployment, migration, etc.)
├── prisma/               # Prisma schema and seed
├── public/               # Static assets and images
├── server/               # Express API (index.js)
├── src/
│   ├── components/       # Reusable UI and sections
│   ├── context/          # Auth, Booking, Language, Currency
│   ├── lib/              # Utilities (e.g. imageUtils, utils)
│   ├── pages/            # Route pages
│   ├── store/            # Zustand stores (e.g. bookingStore)
│   ├── App.tsx           # Routes and providers
│   └── main.tsx          # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## API

The Express server in `server/index.js` serves REST endpoints from the `data/` folder, for example:

- `GET /api/destinations` — destinations with optional query params
- Other endpoints for hotels, packages, flights, transport, etc.

See [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) (if present) for a full API reference.

## Documentation

Additional guides are in the `docs/` folder, including:

- [ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md) — Environment variables and auth
- [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) — API reference
- [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) — Deployment options
- [MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md) — Migration notes

## License

ISC
