import { loadListings, loadBuildings, loadFAQsForPage } from '@/lib/data/normalized'
import { ListingCard } from '@/components/listings/ListingCard'
import { SearchFiltersClient } from '@/components/listings/SearchFiltersClient'
import { FAQSection } from '@/components/FAQSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Properties for Sale in DIFC | DIFC.property',
  description: 'Browse luxury apartments, penthouses, and residences for sale in Dubai International Financial Centre. Premium DIFC properties with stunning views.',
  keywords: ['DIFC properties for sale', 'DIFC apartments', 'DIFC penthouses', 'luxury property Dubai', 'DIFC real estate'],
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function ListingsPage() {
  const listings = await loadListings()
  const buildings = await loadBuildings()
  const faqs = await loadFAQsForPage('listings', 4)

  const buildingOptions = buildings.map(b => ({ slug: b.slug, name: b.name }))

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
      {/* Header - Editorial style */}
      <div className="border-b border-[#EDE9E4] bg-white">
        <div className="container mx-auto px-4 py-12 lg:py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
            DIFC Properties
          </p>
          <h1 className="font-serif text-3xl lg:text-4xl font-normal text-[#1A1815] leading-tight max-w-3xl">
            Current Selection
          </h1>
          <p className="mt-4 max-w-2xl text-[#6B5F53] leading-relaxed">
            {listings.length} exceptional apartments, penthouses, and residences 
            available in Dubai International Financial Centre.
          </p>
        </div>
      </div>

      {/* Filters & Results */}
      <div className="container mx-auto px-4 py-8 lg:py-12 sm:px-6 lg:px-8">
        <SearchFiltersClient 
          buildings={buildingOptions} 
          listings={listings}
        />
      </div>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="border-t border-[#EDE9E4] bg-[#F7F5F2]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <FAQSection 
                faqs={faqs}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}