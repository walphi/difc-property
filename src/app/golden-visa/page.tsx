import { loadLegalContentByCategory, loadFAQsForPage } from '@/lib/data/normalized'
import { loadListings } from '@/lib/data/normalized'
import { LeadTrackingWrapper } from '@/components/LeadTrackingWrapper'
import { FAQSection } from '@/components/FAQSection'
import { ListingCard } from '@/components/listings/ListingCard'
import { formatPrice } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UAE Golden Visa via DIFC Property Investment | DIFC.property',
  description: 'Get 10-year UAE Golden Visa through DIFC property investment. Minimum AED 2M investment required. Complete guide to eligibility, application process, and benefits.',
  keywords: ['UAE Golden Visa', 'DIFC property investment visa', '10 year visa UAE', 'Golden Visa requirements', 'property residency UAE'],
}

export default async function GoldenVisaPage() {
  const [legalContent, faqs, listings] = await Promise.all([
    loadLegalContentByCategory('golden-visa'),
    loadFAQsForPage('golden-visa', 6),
    loadListings(),
  ])

  // Filter listings that qualify for Golden Visa (AED 2M+)
  const qualifyingListings = listings
    .filter(l => l.price >= 2000000)
    .slice(0, 3)

  return (
    <LeadTrackingWrapper pageType="legal" pageSlug="golden-visa">
      <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
        {/* Hero Section */}
        <div className="bg-[#2D5A4A]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B]">
                UAE Residency Program
              </p>
              <h1 className="mt-4 font-serif text-3xl lg:text-4xl font-normal text-white leading-tight">
                Residency Through Investment
              </h1>
              <p className="mt-6 text-lg text-white/70 leading-relaxed">
                Secure 10-year renewable residency for you and your family through property 
                investment in Dubai International Financial Centre. Minimum investment: AED 2M.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <a
                  href="tel:+971562195566"
                  data-cta="call"
                  data-cta-label="Golden Visa Consultation Call"
                  className="cta-track inline-flex items-center gap-2 text-sm font-medium text-[#2D5A4A] bg-white hover:bg-[#F7F5F2] transition-colors px-6 py-3"
                >
                  Begin Consultation
                </a>
                <a
                  href="#qualifying-properties"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#B8956B] transition-colors border-b border-white/30 hover:border-[#B8956B] pb-0.5"
                >
                  View Qualifying Properties
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits - Editorial Text */}
        <section className="border-b border-[#EDE9E4]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
              Benefits
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-6">
              Golden Visa Benefits
            </h2>
            <p className="text-lg text-[#6B5F53] leading-relaxed mb-8 max-w-3xl">
              The UAE Golden Visa program offers qualifying investors and their families 
              long-term residency with unmatched flexibility. Benefits include ten-year 
              renewable status, extended travel allowances, and the ability to sponsor 
              family members without traditional sponsorship requirements.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-normal text-[#2D5A4A] mb-2">10</p>
                <p className="text-sm text-[#6B5F53]">Year renewable residency</p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-normal text-[#2D5A4A] mb-2">Family</p>
                <p className="text-sm text-[#6B5F53]">Spouse and children sponsorship</p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-normal text-[#2D5A4A] mb-2">100%</p>
                <p className="text-sm text-[#6B5F53]">Business ownership</p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-normal text-[#2D5A4A] mb-2">Flexible</p>
                <p className="text-sm text-[#6B5F53]">Extended stay outside UAE</p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="border-b border-[#EDE9E4]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                  Requirements
                </p>
                <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-6">
                  Investment Requirements
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="font-serif text-2xl text-[#B8956B]">01</span>
                    <div>
                      <h3 className="font-medium text-[#1A1815] mb-1">Minimum Investment</h3>
                      <p className="text-sm text-[#6B5F53]">AED 2,000,000 (approx. USD 545,000) minimum property value</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-serif text-2xl text-[#B8956B]">02</span>
                    <div>
                      <h3 className="font-medium text-[#1A1815] mb-1">Property Registration</h3>
                      <p className="text-sm text-[#6B5F53]">Property must be registered with DIFC Real Property Register</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-serif text-2xl text-[#B8956B]">03</span>
                    <div>
                      <h3 className="font-medium text-[#1A1815] mb-1">Equity Requirement</h3>
                      <p className="text-sm text-[#6B5F53]">Minimum 50% equity required (mortgage permitted for remaining 50%)</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-serif text-2xl text-[#B8956B]">04</span>
                    <div>
                      <h3 className="font-medium text-[#1A1815] mb-1">Property Retention</h3>
                      <p className="text-sm text-[#6B5F53]">Property must be retained for duration of visa period</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                  Process
                </p>
                <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-6">
                  Application Process
                </h2>
                <ol className="space-y-4">
                  <li className="pb-4 border-b border-[#EDE9E4]">
                    <span className="font-serif text-lg text-[#2D5A4A]">1.</span>
                    <p className="inline ml-3 text-[#1A1815]">Purchase qualifying property (minimum AED 2M)</p>
                  </li>
                  <li className="pb-4 border-b border-[#EDE9E4]">
                    <span className="font-serif text-lg text-[#2D5A4A]">2.</span>
                    <p className="inline ml-3 text-[#1A1815]">Obtain title deed from DIFC Real Property Register</p>
                  </li>
                  <li className="pb-4 border-b border-[#EDE9E4]">
                    <span className="font-serif text-lg text-[#2D5A4A]">3.</span>
                    <p className="inline ml-3 text-[#1A1815]">Submit application through ICP or approved typing centers</p>
                  </li>
                  <li className="pb-4 border-b border-[#EDE9E4]">
                    <span className="font-serif text-lg text-[#2D5A4A]">4.</span>
                    <p className="inline ml-3 text-[#1A1815]">Complete medical fitness test</p>
                  </li>
                  <li>
                    <span className="font-serif text-lg text-[#2D5A4A]">5.</span>
                    <p className="inline ml-3 text-[#1A1815]">Receive visa within 7-10 business days</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifying Properties */}
        {qualifyingListings.length > 0 && (
          <section id="qualifying-properties" className="border-b border-[#EDE9E4]">
            <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                Qualifying Properties
              </p>
              <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-4">
                AED 2M+ Investment Options
              </h2>
              <p className="text-[#6B5F53] mb-12 max-w-2xl">
                These properties meet the minimum investment threshold for the UAE Golden Visa program.
              </p>
              <div className="grid grid-cols-1 gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {qualifyingListings.map((listing) => (
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

        {/* Disclaimer */}
        <section className="border-b border-[#EDE9E4]">
          <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-sm text-[#8B7F71] max-w-3xl">
              <strong className="text-[#6B5F53]">Disclaimer:</strong> Immigration regulations are subject to change. 
              Always verify current requirements with official UAE government sources or qualified legal advisors 
              before making investment decisions.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#2D5A4A]">
          <div className="container mx-auto px-4 py-16 lg:py-20 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-normal text-white leading-tight mb-4">
              Ready to Start Your Golden Visa Journey?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Our team can guide you through qualifying properties, investment requirements, 
              and the application process.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="tel:+971562195566"
                data-cta="call"
                data-cta-label="Golden Visa Final CTA Call"
                className="cta-track inline-flex items-center gap-2 text-sm font-medium text-[#2D5A4A] bg-white hover:bg-[#F7F5F2] transition-colors px-6 py-3"
              >
                Call +971 56 219 5566
              </a>
              <a
                href="https://wa.me/971562195566?text=I'm interested in UAE Golden Visa through DIFC property"
                data-cta="whatsapp"
                data-cta-label="Golden Visa Final CTA WhatsApp"
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