# 🇱🇰 Visit Sri Lanka - Tourism Portal

A comprehensive Sri Lanka travel portal with AI-enabled services for worldwide travelers, featuring personalized trip planning, medical tourism, and complete booking management.

## ✨ Features

- 🤖 **AI-Powered Trip Planner** - 7-step personalized itinerary generation
- 🏥 **Medical Tourism Integration** - Healthcare information and booking
- 🗺️ **Interactive Destination Explorer** - Explore cities, beaches, wildlife, and culture
- 📅 **Complete Booking System** - Hotels, tours, and activities
- 👤 **User Authentication** - Secure login with NextAuth
- 📊 **Admin Dashboard** - Booking and user management
- 🌐 **Multi-language Support** - Accessible to international travelers
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL database (for full features)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/visitsrilanka.git

# Navigate to project directory
cd visitsrilanka

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Push database schema
npx prisma db push

# Seed database with sample data
npx prisma db seed

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the app!

## 📦 Deployment

### **Option 1: No SSH Access? (Shared Hosting)**
👉 **[Quick Vercel Deploy Guide (15 minutes)](./QUICK_VERCEL_DEPLOY.md)**

Perfect for:
- ✅ Shared hosting without root/SSH access
- ✅ Quick deployment to production
- ✅ Zero server management
- ✅ **100% FREE hosting**

### **Option 2: Full Server Access**
👉 **[Complete Deployment Guide](./DEPLOYMENT_GUIDE.md)**

For VPS/dedicated servers with:
- Node.js
- PM2 process manager
- Nginx reverse proxy
- Full control

### **Option 3: Shared Hosting Solutions**
👉 **[Shared Hosting Deployment Guide](./SHARED_HOSTING_DEPLOYMENT.md)**

Covers:
- cPanel Node.js apps
- FTP deployment methods
- Static export options
- Cloud platform alternatives

## 🗄️ Database Setup

This project uses MySQL with Prisma ORM.

**Local Development:**
```bash
# Using MySQL (preferred)
DATABASE_URL="mysql://user:password@localhost:3306/srilanka_tourism"

# Push schema
npx prisma db push

# Seed data
npx prisma db seed

# Open Prisma Studio to view data
npx prisma studio
```

**Production:**
- [PlanetScale](https://planetscale.com) - Free tier, MySQL compatible
- [Aiven](https://aiven.io) - Free tier available
- Your shared hosting MySQL (with external access enabled)

See [Database Setup Guide](./DATABASE_SETUP.md) for detailed instructions.

## 🔧 Configuration

### Environment Variables

Create `.env.local` for development:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/srilanka_tourism"

# NextAuth
NEXTAUTH_SECRET="generate-using: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Unsplash API for images
UNSPLASH_ACCESS_KEY="your-unsplash-access-key"

# Environment
NODE_ENV="development"
```

For production, use `.env` in `.next/standalone/` folder.

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Quick Vercel Deploy](./QUICK_VERCEL_DEPLOY.md) | 15-minute deployment for shared hosting |
| [Shared Hosting Guide](./SHARED_HOSTING_DEPLOYMENT.md) | Complete shared hosting solutions |
| [Deployment Guide](./DEPLOYMENT_GUIDE.md) | Full VPS/server deployment |
| [Database Setup](./DATABASE_SETUP.md) | Database configuration |
| [API Documentation](./API_DOCUMENTATION.md) | API endpoints reference |
| [Booking System](./BOOKING_SYSTEM_SUMMARY.md) | Booking features overview |
| [Environment Setup](./ENVIRONMENT_SETUP.md) | Development environment |

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.5 (React 19)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Headless UI
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** Zustand

### Backend
- **API:** Next.js API Routes
- **Authentication:** NextAuth.js
- **Database:** MySQL with Prisma ORM
- **Image Optimization:** Next.js Image

### Development
- **Language:** TypeScript
- **Linting:** ESLint
- **Package Manager:** npm

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run dev:webpack      # Start dev server with Webpack
npm run dev:mock         # Start with mock APIs

# Build
npm run build            # Production build
npm run build:turbo      # Build with Turbopack
npm run build:mock       # Build with mock data

# Production
npm start                # Start production server
node .next/standalone/server.js  # Start standalone build (recommended)

# Database
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with data
npm run db:studio        # Open Prisma Studio

# Linting
npm run lint             # Run ESLint
```

## 🏗️ Project Structure

```
visitsrilanka/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── (auth)/         # Authentication pages
│   ├── destinations/   # Destination pages
│   └── trip-planner/   # Trip planner flow
├── components/         # React components
├── lib/               # Utility functions
├── prisma/            # Database schema & migrations
├── public/            # Static assets
├── stores/            # Zustand state stores
├── hooks/             # Custom React hooks
├── data/              # Static data files
└── docs/              # Documentation
```

## 🎯 Key Features Detail

### Trip Planner (7 Steps)
1. Destination selection
2. Duration & dates
3. Travel preferences
4. Activities & interests
5. Budget planning
6. Accommodation preferences
7. Medical information & requirements

### Booking System
- Hotel reservations
- Tour bookings
- Activity scheduling
- Medical appointments
- Payment integration ready
- Booking management dashboard

### Medical Tourism
- Hospital information
- Specialized treatment details
- Medical visa assistance
- Healthcare provider connections

## 🔒 Security

- ✅ NextAuth authentication
- ✅ Secure password hashing (bcrypt)
- ✅ CSRF protection
- ✅ Security headers configured
- ✅ Environment variable protection
- ✅ SQL injection prevention (Prisma)

## 🌍 Internationalization

The app is ready for multi-language support using `next-intl`:
- English (primary)
- Easy to add: Sinhala, Tamil, Chinese, Japanese, etc.

## 📱 PWA Ready

The application is Progressive Web App ready:
- Offline support capabilities
- Mobile installation
- Fast loading
- Responsive design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Manish**
- Project: Sri Lanka Tourism Portal
- Location: E:\manish\srilanka-presentation\visitsrilanka

## 🆘 Support & Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

**Database Connection Issues:**
```bash
# Test connection
npx prisma db push
npx prisma studio
```

**Module Not Found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Port Already in Use:**
```bash
# Use different port
PORT=3001 npm run dev
```

### Getting Help

1. Check the [documentation](./docs/)
2. Review [deployment guides](./DEPLOYMENT_GUIDE.md)
3. Check [API documentation](./API_DOCUMENTATION.md)
4. Search existing issues

## 🎉 Deployment Status

- ✅ Development environment configured
- ✅ Production build optimized
- ✅ Standalone deployment ready
- ✅ Database schema defined
- ✅ API routes implemented
- ✅ Authentication configured
- ✅ Multiple deployment options available

## 🚀 Deploy Now

**For shared hosting without SSH access:**
```bash
# Just follow this guide:
See: QUICK_VERCEL_DEPLOY.md
Time: 15 minutes
Cost: FREE
```

**Your Sri Lanka Tourism Portal will be live at:**
`https://visitsrilanka.vercel.app`

---

**Ready to showcase Sri Lanka to the world! 🇱🇰🌍**
