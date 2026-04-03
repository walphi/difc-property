import { loadBuildings, loadFeaturedListings, loadFAQsForPage } from '@/lib/data/normalized'
import { LeadTrackingWrapper } from '@/components/LeadTrackingWrapper'
import { FAQSection } from '@/components/FAQSection'
import { ListingCard } from '@/components/listings/ListingCard'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Living in DIFC | Lifestyle, Community & Amenities | DIFC.property',
  description: 'Discover the DIFC lifestyle. World-class dining, art galleries, luxury residences, and vibrant community in Dubai International Financial Centre. Experience premium urban living.',
  keywords: ['living in DIFC', 'DIFC lifestyle', 'DIFC community', 'Gate Village', 'DIFC amenities', 'DIFC dining'],
}

export default async function LivingPage() {
  const [buildings, featuredListings, faqs] = await Promise.all([
    loadBuildings(),
    loadFeaturedListings(3),
    loadFAQsForPage('living', 4),
  ])

  return (
    <LeadTrackingWrapper pageType="listings" pageSlug="living">
      <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
        {/* Hero Section */}
        <div className="relative bg-[#1A1815]">
          <div className="absolute inset-0">
            <Image
              src="/images/content/Living-difc.avif"
              alt="Living in DIFC"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1815]/90 via-[#1A1815]/70 to-[#1A1815]/50" />
          </div>
          <div className="relative container mx-auto px-4 py-16 lg:py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B]">
                Lifestyle & Community
              </p>
              <h1 className="mt-4 font-serif text-3xl lg:text-5xl font-normal text-white leading-tight">
                Living in DIFC
              </h1>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                An urban community where world-class dining, art, and luxury residence converge.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <a
                  href="/listings"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1815] bg-white hover:bg-[#F7F5F2] transition-colors px-6 py-3"
                >
                  Explore Residences
                </a>
                <a
                  href="tel:+971562195566"
                  data-cta="call"
                  data-cta-label="Living Page Consultation"
                  className="cta-track inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#B8956B] transition-colors border-b border-white/30 hover:border-[#B8956B] pb-0.5"
                >
                  Schedule a Tour
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Features - Editorial Cards */}
        <section className="border-b border-[#EDE9E4]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
              Lifestyle
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-12">
              The DIFC Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div>
                <h3 className="font-serif text-lg font-normal text-[#1A1815] mb-3">World-Class Dining</h3>
                <p className="text-[#6B5F53] leading-relaxed">
                  Gate Village and surrounding areas feature internationally acclaimed restaurants, 
                  including Michelin-starred concepts and fine dining establishments.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-normal text-[#1A1815] mb-3">Art & Culture</h3>
                <p className="text-[#6B5F53] leading-relaxed">
                  DIFC is home to Dubai&apos;s premier art galleries, with regular exhibitions and 
                  cultural events throughout the financial district.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-normal text-[#1A1815] mb-3">Prime Location</h3>
                <p className="text-[#6B5F53] leading-relaxed">
                  Heart of Dubai with seamless connectivity to Downtown, Business Bay, and 
                  Dubai International Airport. Metro access nearby.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Residential Buildings */}
        <section className="border-b border-[#EDE9E4] bg-[#F7F5F2]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
              Buildings
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-8">
              Residential Buildings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {buildings.filter(b => b.featured).map((building) => (
                <div key={building.slug} className="border-b border-[#DDD6CC] pb-6">
                  <h3 className="font-serif text-xl font-normal text-[#1A1815] mb-2">
                    {building.name}
                  </h3>
                  <p className="text-sm text-[#6B5F53] mb-3">
                    {building.developer} • Completed {building.completionYear}
                  </p>
                  <p className="text-sm text-[#8B7F71] line-clamp-2 mb-4">
                    {building.description}
                  </p>
                  <a
                    href={`/buildings/${building.slug}`}
                    className="text-sm font-medium text-[#2D5A4A] hover:text-[#1F3D31] transition-colors"
                  >
                    View properties →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Residences */}
        {featuredListings.length > 0 && (
          <section className="border-b border-[#EDE9E4]">
            <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                Properties
              </p>
              <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-8">
                Featured Residences
              </h2>
              <div className="grid grid-cols-1 gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {featuredListings.map((listing) => (
                  <ListingCard
                    key={listing.slug}
                    listing={{
                      ...listing,
                      images: listing.images,
                      building: { name: listing.buildingName || listing.buildingSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), slug: listing.buildingSlug }
                    }}
                    variant="featured"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gate Village Highlight */}
        <section className="border-b border-[#EDE9E4] bg-[#2D5A4A]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                  Lifestyle
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl font-normal text-white mb-6">
                  Gate Village
                </h2>
                <p className="text-white/70 leading-relaxed mb-6">
                  The social heart of DIFC. An open-air promenade featuring world-class dining, 
                  art galleries, boutiques, and seasonal events. Residents enjoy immediate access 
                  to Dubai&apos;s most sophisticated social scene.
                </p>
                <ul className="space-y-2 text-white/70 mb-8">
                  <li>• 20+ international restaurants and cafes</li>
                  <li>• Art galleries and cultural exhibitions</li>
                  <li>• Seasonal food and art festivals</li>
                  <li>• Walking distance from all residential towers</li>
                </ul>
              </div>
              <div className="bg-[#1F3D31] p-6 lg:p-8">
                <h3 className="font-serif text-lg font-normal text-white mb-6">
                  Upcoming
                </h3>
                <div className="space-y-6">
                  <div className="pb-4 border-b border-[#3D7A5F]/30">
                    <p className="text-sm text-[#B8956B] mb-1">March 2024</p>
                    <p className="text-white font-medium">DIFC Art Nights</p>
                    <p className="text-sm text-white/60 mt-1">Monthly art walk through Gate Village galleries</p>
                  </div>
                  <div className="pb-4 border-b border-[#3D7A5F]/30">
                    <p className="text-sm text-[#B8956B] mb-1">April 2024</p>
                    <p className="text-white font-medium">Spring Food Festival</p>
                    <p className="text-sm text-white/60 mt-1">Culinary showcases from DIFC restaurants</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#B8956B] mb-1">May 2024</p>
                    <p className="text-white font-medium">Gate Avenue Market</p>
                    <p className="text-sm text-white/60 mt-1">Artisan market featuring local designers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="border-b border-[#EDE9E4] bg-[#F7F5F2]">
            <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <FAQSection 
                  faqs={faqs}
                />
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-[#1A1815]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-normal text-white leading-tight mb-4">
              Experience the DIFC Lifestyle
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Schedule a private tour to experience DIFC living firsthand.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="tel:+971562195566"
                data-cta="call"
                data-cta-label="Living Page Final CTA Call"
                className="cta-track inline-flex items-center gap-2 text-sm font-medium text-[#1A1815] bg-white hover:bg-[#F7F5F2] transition-colors px-6 py-3"
              >
                Call +971 56 219 5566
              </a>
              <a
                href="https://wa.me/971562195566?text=I'd like to schedule a tour of DIFC properties"
                data-cta="whatsapp"
                data-cta-label="Living Page Final CTA WhatsApp"
                className="cta-track inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#B8956B] transition-colors border-b border-white/30 hover:border-[#B8956B] pb-0.5"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </section>
      </div>
    </LeadTrackingWrapper>
  )
}