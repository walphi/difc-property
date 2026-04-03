# DIFC.property

A premium luxury real estate and district intelligence platform for Dubai International Financial Centre (DIFC).

## 🏢 About

DIFC.property is a curated real estate platform exclusively focused on Dubai International Financial Centre. Unlike generic Dubai property portals, we provide deep expertise, verified listings, and genuine district intelligence for buyers, investors, and residents.

### Key Features

- **Curated Property Listings**: 15+ luxury properties in DIFC's premier buildings (Burj Daman, Index Tower, Limestone House, Eden House Zaabeel, DIFC Heights)
- **District Intelligence**: DIFC-specific content covering developments, legal updates, and lifestyle
- **AI-Search Optimized**: Full JSON-LD structured data, semantic markup, and comprehensive SEO
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
4. **Living** (`/living`) - DIFC lifestyle and community information

### Analyzing Leads

Run the lead analysis to get optimization recommendations:

```bash
# Analyze leads and generate recommendations
npm run hermes:analyze-leads

# Or use the alias
npm run hermes:analyze
```

This will:
- Read lead events from `/data/leads/events.json`
- Analyze CTA performance, FAQ engagement, and conversion patterns
- Generate SkillDocuments in `/hermes/skills/analyze-leads/`
- Output recommendations to `/data/recommendations/latest.json`

### Running Analysis via Cron

To run lead analysis automatically on a schedule:

#### Local Cron (macOS/Linux)

Edit your crontab:

```bash
crontab -e
```

Add a weekly analysis job (Sundays at 9 AM):

```bash
# Weekly Hermes lead analysis
0 9 * * 0 cd /path/to/difc-property && npm run hermes:analyze-leads >> /var/log/hermes-analysis.log 2>&1
```

Or daily at midnight:

```bash
# Daily Hermes lead analysis
0 0 * * * cd /path/to/difc-property && npm run hermes:analyze-leads >> /var/log/hermes-analysis.log 2>&1
```

#### Server Cron (VPS/Cloud Server)

If running on a server:

```bash
# Edit crontab for the deployment user
crontab -e

# Add weekly analysis (Sundays at 6 AM UTC)
0 6 * * 0 cd /var/www/difc-property && /usr/bin/npm run hermes:analyze-leads >> /var/log/hermes-weekly.log 2>&1
```

#### Windows (Task Scheduler)

On Windows, use Task Scheduler:

1. Open Task Scheduler
2. Create Basic Task → Name: "Hermes Lead Analysis"
3. Trigger: Weekly (Sunday at 9:00 AM)
4. Action: Start a program
5. Program: `cmd.exe`
6. Arguments: `/c cd /d C:\path\to\difc-property && npm run hermes:analyze-leads`
7. Finish

### Lead Analysis Output

After running analysis, check:

```bash
# View latest recommendations
cat data/recommendations/latest.json

# View generated skill documents
ls -la hermes/skills/analyze-leads/
```

The recommendations include:
- **CTA Recommendations**: Optimize button labels and placements
- **FAQ Recommendations**: Add/remove/reorder FAQ content
- **Why Property Recommendations**: Improve property selling points
- **Experiment Proposals**: A/B test ideas with expected impact

### Hermes File Structure

```
hermes/
├── difc_property_skill.md       # Main Hermes skill definition
└── skills/
    └── analyze-leads/
        ├── skill.md              # Analysis skill definition
        └── *.md                  # Generated SkillDocuments

data/
├── normalized/                   # Normalized data sources
│   ├── listings.json            # 15 DIFC listings
│   ├── buildings.json           # 6 DIFC buildings
│   ├── news.json                # 5 news articles
│   ├── legal.json               # 4 legal content pieces
│   └── faqs.json                # 10 FAQs
├── leads/                       # Lead tracking data
│   └── events.json              # Captured lead events
└── recommendations/             # Analysis output
    ├── latest.json              # Current recommendations
    └── recommendations-*.json   # Historical analysis
```

## 📁 Project Structure

```
difc-property/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Root layout
│   │   ├── listings/            # Property listings
│   │   ├── listings/[slug]/       # Property detail pages
│   │   ├── buildings/[slug]/     # Building pages
│   │   ├── news/                # News articles
│   │   ├── prices/              # Price analysis hub
│   │   ├── law/                 # Legal framework hub
│   │   ├── golden-visa/         # Golden Visa hub
│   │   ├── living/              # Lifestyle hub
│   │   └── api/                 # API routes
│   ├── components/
│   │   ├── listings/            # ListingCard, SearchFilters
│   │   ├── LeadTrackingWrapper.tsx  # Lead tracking component
│   │   └── FAQSection.tsx       # FAQ display component
│   └── lib/
│       ├── data/
│       │   ├── seed.ts          # Legacy seed data
│       │   └── normalized.ts    # Normalized data loader
│       ├── hermes/
│       │   ├── leadEvents.ts    # Server-side lead tracking
│       │   ├── leadEvents.local.ts  # Client-side lead tracking
│       │   └── useHermes.ts     # React hook for lead events
│       └── models/
│           └── hermes.types.ts  # TypeScript types for Hermes
├── hermes/                      # Hermes skills & analysis
├── data/                        # Normalized data & recommendations
├── scripts/                     # Analysis scripts
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 20+
- npm or yarn
- Git

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/difc-property.git
cd difc-property
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
NEXT_PUBLIC_SITE_URL=https://difc.property
NEXT_PUBLIC_CONTACT_PHONE="+971562195566"
```

### 3. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
```

Generates static export in `dist/` folder.

### 5. Run Lead Analysis

```bash
# Generate lead optimization recommendations
npm run hermes:analyze-leads

# View results
cat data/recommendations/latest.json
```

## 🚀 Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository in Netlify dashboard
3. Build settings auto-detected from `netlify.toml`
4. Deploy!

### Cron Job Setup (Production)

On your production server, set up weekly lead analysis:

```bash
# SSH into server
ssh user@your-server

# Edit crontab
crontab -e

# Add weekly analysis
0 6 * * 0 cd /var/www/difc-property && npm run hermes:analyze-leads
```

## 📊 SEO Features

- ✅ JSON-LD structured data (RealEstateListing, BlogPosting, Organization, BreadcrumbList, FAQPage)
- ✅ Dynamic sitemap.xml
- ✅ News sitemap.xml
- ✅ robots.txt with crawler directives
- ✅ OpenGraph and Twitter Cards
- ✅ Canonical URLs
- ✅ Semantic HTML markup

## 📝 Content Architecture

### Property Listings (15 Properties)

- **Burj Daman**: 4 apartments (AED 5.2M - 12.5M)
- **Index Tower**: 3 apartments (AED 2.8M - 5.1M)
- **Limestone House**: 6 apartments (AED 3.35M - 15M)
- **Eden House Zaabeel**: 4 properties including penthouse (AED 4.7M - 36.5M)

### Hub Pages

1. **Prices** - Market analysis, price trends, building comparisons
2. **Law** - DIFC Real Property Law, ownership rights, legal framework
3. **Golden Visa** - Investment requirements, application process, benefits
4. **Living** - Lifestyle guide, amenities, Gate Village, community

## 🔄 Future Enhancements

### Phase 2: Advanced Lead Intelligence

- Lead scoring and qualification
- Automated lead routing
- CRM integration
- Email nurture sequences

### Phase 3: Content Ingestion

- Automated listing updates
- News aggregation
- Legal update monitoring
- Market data integration

### Phase 4: Advanced Features

- Property comparison tool
- Mortgage calculator
- Virtual tours
- Multi-language support

## 📄 License

Private - All rights reserved.

## 🤝 Contact

- **Email**: contact@difc.property
- **Phone**: +971 56 219 5566
- **Address**: DIFC, Dubai, UAE

---

Built with ❤️ for DIFC Dubai
