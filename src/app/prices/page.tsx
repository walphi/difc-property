import { loadListings, loadBuildings, loadFAQsForPage, getPriceStatistics, getListingsByBuildingStats } from '@/lib/data/normalized'
import { loadNewsByCategory } from '@/lib/data/normalized'
import { LeadTrackingWrapper } from '@/components/LeadTrackingWrapper'
import { FAQSection } from '@/components/FAQSection'
import { formatPrice } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DIFC Property Prices & Market Trends | DIFC.property',
  description: 'Current DIFC property prices, market analysis, and price trends. Average AED 3,850/sqft. Compare prices across Burj Daman, Index Tower, Limestone House, and Eden House.',
  keywords: ['DIFC property prices', 'DIFC market trends', 'DIFC real estate prices', 'Burj Daman prices', 'Index Tower prices', 'DIFC price per sqft'],
}

export default async function PricesPage() {
  const [stats, buildingStats, faqs, news] = await Promise.all([
    getPriceStatistics(),
    getListingsByBuildingStats(),
    loadFAQsForPage('prices', 4),
    loadNewsByCategory('Market Insights'),
  ])

  return (
    <LeadTrackingWrapper pageType="listings" pageSlug="prices">
      <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
        {/* Header */}
        <div className="border-b border-[#EDE9E4] bg-white">
          <div className="container mx-auto px-4 py-12 lg:py-16 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
              Market Intelligence
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl font-normal text-[#1A1815] leading-tight max-w-3xl">
              Market Perspective
            </h1>
            <p className="mt-4 max-w-2xl text-[#6B5F53] leading-relaxed">
              Current pricing and trends across DIFC&apos;s premier buildings. 
              Average price per sqft AED {stats?.averagePricePerSqft.toLocaleString()}.
            </p>
          </div>
        </div>

        {/* Market Overview - Inline Stats */}
        {stats && (
          <section className="border-b border-[#EDE9E4] bg-white">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-6 lg:gap-10 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[#6B5F53]">Average Price/sqft</span>
                  <span className="font-serif text-xl text-[#1A1815]">AED {stats.averagePricePerSqft.toLocaleString()}</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-[#DDD6CC]" />
                <div className="flex items-center gap-3">
                  <span className="text-[#6B5F53]">Properties</span>
                  <span className="font-serif text-xl text-[#1A1815]">{stats.count}</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-[#DDD6CC]" />
                <div className="flex items-center gap-3">
                  <span className="text-[#6B5F53]">Range</span>
                  <span className="font-serif text-xl text-[#1A1815]">{formatPrice(stats.minPrice, 'AED')} – {formatPrice(stats.maxPrice, 'AED')}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Building Price Comparison - Card Grid */}
        <section className="border-b border-[#EDE9E4]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
              By Building
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-12">
              Price Comparison
            </h2>
            
            <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2">
              {buildingStats.filter((stat): stat is NonNullable<typeof stat> => stat !== null).map((stat) => (
                <div key={stat.building.slug} className="border-b border-[#EDE9E4] pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#1A1815]">{stat.building.name}</h3>
                      <p className="text-sm text-[#6B5F53] mt-1">{stat.building.developer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-lg font-normal text-[#1A1815]">AED {stat.averagePricePerSqft.toLocaleString()}/sqft</p>
                      <p className="text-xs text-[#8B7F71] mt-1">{stat.count} properties</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B5F53]">
                    Range: {formatPrice(stat.minPrice, 'AED')} – {formatPrice(stat.maxPrice, 'AED')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Trends - Editorial Text + Stats */}
        <section className="border-b border-[#EDE9E4] bg-[#F7F5F2]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                  Trends
                </p>
                <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-6">
                  Market Performance
                </h2>
                <p className="text-[#6B5F53] leading-relaxed mb-8">
                  DIFC property values have demonstrated consistent resilience, with prices 
                  appreciating 8% year-on-year in Q4 2023. This growth is driven by limited new 
                  supply entering the market and sustained international demand from institutional 
                  and private investors seeking exposure to Dubai&apos;s premier financial district.
                </p>
                <p className="text-[#6B5F53] leading-relaxed">
                  Rental yields remain attractive at 5.5-6%, positioning DIFC as one of the 
                  stronger performing luxury districts in Dubai for income-focused investors.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                <div className="py-6 border-b border-[#DDD6CC] lg:border-b-0">
                  <p className="font-serif text-4xl lg:text-5xl font-normal text-[#2D5A4A] mb-2">+8%</p>
                  <p className="text-sm text-[#6B5F53]">Year-on-year price growth</p>
                </div>
                <div className="py-6 border-b border-[#DDD6CC] lg:border-b-0">
                  <p className="font-serif text-4xl lg:text-5xl font-normal text-[#2D5A4A] mb-2">5.5-6%</p>
                  <p className="text-sm text-[#6B5F53]">Average rental yield</p>
                </div>
                <div className="py-6">
                  <p className="font-serif text-4xl lg:text-5xl font-normal text-[#2D5A4A] mb-2">+12%</p>
                  <p className="text-sm text-[#6B5F53]">Transaction volume increase</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="border-b border-[#EDE9E4]">
            <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <FAQSection 
                  faqs={faqs}
                />
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Refined */}
        <section className="bg-[#2D5A4A]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-2xl lg:text-3xl font-normal text-white leading-tight mb-4">
                Personalized Market Analysis
              </h2>
              <p className="text-white/70 mb-8">
                Contact our team for detailed pricing insights and investment guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="tel:+971562195566"
                  data-cta="call"
                  data-cta-label="Call for Price Analysis"
                  className="cta-track inline-flex items-center gap-2 text-sm font-medium text-[#2D5A4A] bg-white hover:bg-[#F7F5F2] transition-colors px-6 py-3"
                >
                  Call +971 56 219 5566
                </a>
                <a
                  href="https://wa.me/971562195566?text=I'm interested in DIFC price analysis"
                  data-cta="whatsapp"
                  data-cta-label="WhatsApp Price Inquiry"
                  className="cta-track inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#B8956B] transition-colors border-b border-white/30 hover:border-[#B8956B] pb-0.5"
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LeadTrackingWrapper>
  )
}