# DIFC.property

A premium luxury real estate and district intelligence platform for Dubai International Financial Centre (DIFC).

## 🏢 About

DIFC.property is a curated real estate platform exclusively focused on Dubai International Financial Centre. Unlike generic Dubai property portals, we provide deep expertise, verified listings, and genuine district intelligence for buyers, investors, and residents.

### Key Features

- **Curated Property Listings**: 15+ luxury properties in DIFC's premier buildings (Burj Daman, Index Tower, Limestone House, Eden House Zaabeel, DIFC Heights)
- **District Intelligence**: DIFC-specific content covering developments, legal updates, and lifestyle
- **AI Search Chat**: Intelligent property search with inline property cards
- **Luxury Editorial Design**: Sotheby's-inspired aesthetic with serif headlines and refined typography
- **Lead Intelligence**: Hermes-powered lead tracking and conversion optimization
- **Fast Performance**: Next.js 16 with static generation for optimal SEO and user experience

## 🚀 Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Playfair Display (serif) + Inter (sans-serif)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Lead Tracking**: Hermes Agent Integration
- **AI Chat**: OpenRouter API (openrouter/free model)
- **Deployment**: Netlify (static export)

## 🎯 Hermes Lead Intelligence System

DIFC.property includes a sophisticated lead tracking and optimization system powered by Hermes:

### Lead Tracking

Every user interaction is tracked to understand behavior and optimize conversion:

- **Page Views**: Track which pages users visit and how long they stay
- **CTA Clicks**: Monitor clicks on WhatsApp, Phone, Email, and enquiry buttons
- **Listing Engagement**: Track which properties users view and engage with
- **FAQ Interactions**: Understand which questions users care about
- **Session Analysis**: Track complete user journeys across the site

### Hub Pages with Lead Tracking

Four specialized hub pages with full lead tracking:

1. **Prices** (`/prices`) - DIFC property prices and market trends
2. **Law** (`/law`) - DIFC Real Property Law and legal framework  
3. **Golden Visa** (`/golden-visa`) - UAE Golden Visa through property investment
4. **Living** (`/living`) - Life in DIFC guide

### Analyzing Lead Data

Run lead analysis to understand conversion patterns:

```bash
npm run hermes:analyze-leads
```

This generates detailed reports on:
- Top converting pages
- Most engaged listings
- CTA performance
- Geographic patterns
- Device and browser analytics

## 🎨 Design System

### Typography

- **Headlines**: Playfair Display (serif) - elegant, editorial
- **Body**: Inter (sans-serif) - clean, readable
- **Monospace**: JetBrains Mono - for numbers and technical data

### Color Palette

- **Primary**: `#2D5A4A` (deep green)
- **Accent**: `#B8956B` (warm gold)
- **Background**: `#FDFCFB` (warm white)
- **Surface**: `#F7F5F3` (subtle cream)
- **Border**: `#EDE9E4` (warm gray)
- **Text Primary**: `#1A1815` (near black)
- **Text Secondary**: `#6B5F53` (warm brown)

### Animations

- **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - smooth, refined
- **Page transitions**: 400-600ms
- **Micro-interactions**: 200-300ms

## 🤖 AI Chat Feature

The AI chat interface provides intelligent property search and recommendations:

- **Property Search**: "Show me 3-bedroom apartments under AED 6M"
- **Building Info**: "Tell me about Burj Daman building"
- **ROI Calculator**: "What's the ROI on a AED 7M property?"
- **Golden Visa**: "How do I get a Golden Visa?"
- **Voice Input**: Web Speech API integration

Property cards display inline in chat responses with actual listing images and details.

## 🛠️ Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL="postgresql://postgres:password@db.your-project.supabase.co:5432/postgres"

# OpenRouter AI (for chat feature)
NEXT_PUBLIC_OPENROUTER_API_KEY=your-openrouter-key

# Site
NEXT_PUBLIC_SITE_URL=https://difc.property
NEXT_PUBLIC_SITE_NAME="DIFC.property"

# Contact
NEXT_PUBLIC_CONTACT_PHONE="+971562195566"
NEXT_PUBLIC_CONTACT_EMAIL="contact@difc.property"
```

### Development Server

```bash
# Standard dev server (uses webpack - more stable)
npm run dev

# Alternative port
npm run dev:5555
```

### Build for Production

```bash
# Static export for Netlify
npm run build
```

## 📦 Deployment

### Netlify Setup

1. Connect your GitHub repository to Netlify
2. Build settings are pre-configured in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20
3. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_OPENROUTER_API_KEY` (required for AI chat)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `DATABASE_URL` (if using Supabase backend)
4. Deploy!

### Environment Variables for Netlify

Required for deployment:

```
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxx
DATABASE_URL=postgresql://...
```

## 📁 Project Structure

```
difc-property/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── search/         # AI chat interface
│   │   ├── listings/       # Property listings
│   │   ├── prices/         # Prices hub
│   │   ├── golden-visa/    # Golden Visa hub
│   │   ├── law/            # Law hub
│   │   └── living/         # Living hub
│   ├── components/         # React components
│   │   ├── chat/          # Chat components
│   │   ├── listings/      # Listing components
│   │   ├── layout/        # Header, Footer, Layout
│   │   └── hero/          # Hero components
│   └── lib/               # Utilities and libraries
│       ├── ai/            # AI chat logic
│       ├── data/          # Data and seed files
│       └── supabase/      # Supabase clients
├── public/                 # Static assets
│   └── images/            # Images (hero, content)
├── data/                   # JSON data files
├── netlify.toml           # Netlify configuration
└── next.config.ts         # Next.js configuration
```

## 🔒 Security

- **API Keys**: Store sensitive keys in Netlify environment variables, never commit to repo
- **CORS**: Configured in `next.config.ts` for allowed image domains
- **Headers**: Security headers configured in `netlify.toml`
- **Rate Limiting**: Built-in rate limiting for AI chat to prevent abuse

## 📝 License

© 2025 DIFC.property. All rights reserved.
