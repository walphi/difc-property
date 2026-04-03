import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building2, MapPin, TrendingUp, Check, Train, ShoppingBag, Utensils, TreePine } from 'lucide-react'
import { buildingsData } from '@/lib/data/seed'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Living in DIFC | Dubai International Financial Centre Area Guide | DIFC.property',
  description: 'Complete guide to living in DIFC Dubai. Discover luxury apartments, world-class dining at Gate Village, walkable urban lifestyle, and investment opportunities in Dubai International Financial Centre.',
  keywords: ['Living in DIFC', 'DIFC lifestyle', 'DIFC area guide', 'Dubai International Financial Centre', 'Gate Village', 'DIFC apartments', 'DIFC investment'],
  openGraph: {
    title: 'Living in DIFC | Complete Area Guide',
    description: 'Your comprehensive guide to living, working, and investing in Dubai International Financial Centre.',
    url: 'https://difc.property/areas/difc',
  },
}

export default function DIFCAreaPage() {
  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
            alt="DIFC Dubai skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/40" />
        </div>
        
        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-amber-400">
              Area Guide
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Living in DIFC: Dubai's Premier Financial & Residential District
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-200">
              Discover why Dubai International Financial Centre is one of the most desirable addresses 
              in the UAE. From luxury residences to world-class dining, DIFC offers a unique 
              walkable urban lifestyle in the heart of Dubai.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="border-b border-stone-200 bg-stone-50">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-amber-700">4,000+</p>
              <p className="mt-1 text-sm text-stone-600">Active Companies</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-amber-700">AED 1.48B</p>
              <p className="mt-1 text-sm text-stone-600">DIFC Net Profit (2025)</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-amber-700">100+</p>
              <p className="mt-1 text-sm text-stone-600">Countries Represented</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-amber-700">AED 100B</p>
              <p className="mt-1 text-sm text-stone-600">Expansion Investment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="mx-auto max-w-3xl mb-16">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">
            Why Choose DIFC?
          </h2>
          <p className="text-lg leading-relaxed text-stone-600 mb-6">
            Dubai International Financial Centre (DIFC) is more than a business district—it's a vibrant, 
            walkable urban community that combines the energy of a global financial hub with the sophistication 
            of luxury living. As the leading financial center in the Middle East, Africa, and South Asia (MEASA) 
            region, DIFC offers residents an unmatched lifestyle proposition.
          </p>
          <p className="text-lg leading-relaxed text-stone-600">
            Whether you're a finance professional seeking a short commute, an investor looking for strong rental 
            yields, or a family seeking an urban lifestyle with world-class amenities, DIFC delivers an 
            extraordinary living experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <div className="rounded-lg border border-stone-200 p-6">
            <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
              <Building2 className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">World-Class Residences</h3>
            <p className="text-stone-600">
              Premium apartments and penthouses in iconic buildings like Burj Daman, Index Tower, 
              Limestone House, and Eden House Zaabeel. Each residence offers luxury finishes and stunning views.
            </p>
          </div>
          
          <div className="rounded-lg border border-stone-200 p-6">
            <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
              <Utensils className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Exceptional Dining</h3>
            <p className="text-stone-600">
              Gate Village and the surrounding district host world-renowned restaurants including Zuma, 
              L'Atelier de Joël Robuchon, Coya, and Roberto's—all within walking distance.
            </p>
          </div>
          
          <div className="rounded-lg border border-stone-200 p-6">
            <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
              <Train className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Metro Connectivity</h3>
            <p className="text-stone-600">
              Direct access to Dubai Metro's Red Line at Financial Centre Station connects you to 
              Dubai Airport, Downtown Dubai, and the entire city within minutes.
            </p>
          </div>
          
          <div className="rounded-lg border border-stone-200 p-6">
            <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
              <ShoppingBag className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Retail & Culture</h3>
            <p className="text-stone-600">
              Boutique shopping, art galleries, and cultural venues at Gate Village create a sophisticated 
              European-style piazza atmosphere unique to Dubai.
            </p>
          </div>
          
          <div className="rounded-lg border border-stone-200 p-6">
            <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
              <TrendingUp className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Strong Investment Returns</h3>
            <p className="text-stone-600">
              DIFC properties consistently deliver 6-8% rental yields with strong capital appreciation 
              driven by limited supply and growing demand from finance professionals.
            </p>
          </div>
          
          <div className="rounded-lg border border-stone-200 p-6">
            <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
              <MapPin className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Prime Location</h3>
            <p className="text-stone-600">
              Centrally located on Sheikh Zayed Road, DIFC provides easy access to Downtown Dubai, 
              Business Bay, and Dubai International Airport within 15-20 minutes.
            </p>
          </div>
        </div>

        {/* Buildings Section */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8 text-center">
            Premium Residential Buildings in DIFC
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {buildingsData.filter(b => b.featured).map((building) => (
              <Link
                key={building.slug}
                href={`/buildings/${building.slug}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={building.images[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'}
                    alt={building.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {building.name}
                  </h3>
                  <p className="text-sm text-white/80 mt-1">{building.buildingType}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 text-base font-medium text-amber-700 hover:text-amber-800 transition-colors"
            >
              View all DIFC properties
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Investment Section */}
        <div className="mb-16 rounded-lg bg-stone-900 p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-white mb-4">
                Investing in DIFC Real Estate
              </h2>
              <p className="text-stone-300 mb-6">
                DIFC represents one of Dubai's most compelling real estate investment propositions. 
                With the district's AED 100 billion expansion plan and record business growth, 
                demand for premium residential space continues to strengthen.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-stone-300">
                  <Check className="h-5 w-5 text-amber-400" />
                  <span>Rental yields of 6-8% annually</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300">
                  <Check className="h-5 w-5 text-amber-400" />
                  <span>Strong capital appreciation potential</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300">
                  <Check className="h-5 w-5 text-amber-400" />
                  <span>Qualifies for UAE Golden Visa (AED 2M+)</span>
                </li>
                <li className="flex items-center gap-3 text-stone-300">
                  <Check className="h-5 w-5 text-amber-400" />
                  <span>Limited supply within original DIFC boundary</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
                alt="DIFC Investment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8 text-center">
            Frequently Asked Questions about DIFC
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 mb-2">What makes DIFC different from other Dubai districts?</h3>
              <p className="text-stone-600 text-sm">
                DIFC offers a unique walkable urban lifestyle with European-style piazzas, direct metro access, 
                world-class dining at your doorstep, and a cosmopolitan community of finance professionals. 
                Unlike typical Dubai neighborhoods, you can live car-free in DIFC.
              </p>
            </div>
            <div className="rounded-lg border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 mb-2">Is DIFC suitable for families?</h3>
              <p className="text-stone-600 text-sm">
                While DIFC is primarily business-focused, families enjoy access to nearby premium schools, 
                healthcare facilities, and the safety of a well-managed district. Larger apartments in 
                buildings like Eden House Zaabeel accommodate family needs.
              </p>
            </div>
            <div className="rounded-lg border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 mb-2">What are DIFC property prices?</h3>
              <p className="text-stone-600 text-sm">
                DIFC properties range from AED 2.8M for 1-bedroom apartments to over AED 36M for penthouses. 
                The average price per sqft is approximately AED 3,000-4,500, reflecting the district's 
                premium positioning and limited supply.
              </p>
            </div>
            <div className="rounded-lg border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 mb-2">How is DIFC expanding?</h3>
              <p className="text-stone-600 text-sm">
                DIFC has announced a landmark AED 100 billion expansion plan to double in size by 2030. 
                This includes new commercial towers, residential developments like DIFC Heights Tower, 
                and expanded retail and hospitality offerings.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-lg bg-amber-700 p-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Ready to Find Your DIFC Property?
          </h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
            Browse our curated selection of luxury properties in Dubai International Financial Centre, 
            from apartments to penthouses in the district's most prestigious buildings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-amber-700 hover:bg-stone-100 transition-colors"
            >
              Browse Properties
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:+971562195566"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-base font-medium text-white hover:bg-white/20 transition-colors"
            >
              Call +971 56 219 5566
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
