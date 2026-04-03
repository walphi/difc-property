import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Bed, Bath, Maximize, Building, ArrowLeft, Phone, Mail, MapPin, Check, MessageCircle, Calendar } from 'lucide-react'
import { loadListingBySlug, loadBuildingBySlug, loadListings } from '@/lib/data/normalized'
import { formatPrice, formatSqft } from '@/lib/utils'
import { ListingCard } from '@/components/listings/ListingCard'
import { FAQSection } from '@/components/FAQSection'
import { LeadTrackingWrapper } from '@/components/LeadTrackingWrapper'
import { generateRealEstateListingSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema/jsonld'
import type { Metadata } from 'next'

interface ListingPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await loadListingBySlug(slug)
  
  if (!listing) {
    return {
      title: 'Property Not Found | DIFC.property',
    }
  }

  const seo = listing.seoMetadata

  return {
    title: seo?.title || `${listing.title} | DIFC Property for Sale`,
    description: seo?.description || `${listing.title} for sale in DIFC. ${listing.bedrooms || 'Luxury'} apartment priced at ${formatPrice(listing.price, listing.currency)}.`,
    keywords: seo?.keywords || [listing.title, 'DIFC property for sale', listing.propertyType, 'DIFC Dubai'],
    openGraph: {
      title: seo?.ogTitle || listing.title,
      description: seo?.ogDescription || `${listing.title} for sale in DIFC. ${formatPrice(listing.price, listing.currency)} - ${formatSqft(listing.sqft)} sqft`,
      url: seo?.canonicalUrl || `https://difc.property/listings/${listing.slug}`,
      images: listing.images[0] ? [{ url: listing.images[0] }] : undefined,
    },
    alternates: {
      canonical: seo?.canonicalUrl || `https://difc.property/listings/${listing.slug}`,
    },
  }
}

export async function generateStaticParams() {
  const listings = await loadListings()
  return listings.map((listing) => ({
    slug: listing.slug,
  }))
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params
  const listing = await loadListingBySlug(slug)
  
  if (!listing) {
    notFound()
  }

  const building = await loadBuildingBySlug(listing.buildingSlug)
  
  // Find similar listings
  const allListings = await loadListings()
  const similarListings = allListings
    .filter(l => l.slug !== listing.slug && l.buildingSlug === listing.buildingSlug)
    .slice(0, 2)

  // Schema data
  const listingSchema = generateRealEstateListingSchema({
    ...listing,
    building: building ? { address: building.address } : { address: `${listing.buildingName || listing.buildingSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}, DIFC, Dubai` }
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://difc.property' },
    { name: 'Properties', url: 'https://difc.property/listings' },
    { name: listing.title }
  ])

  const faqSchema = generateFAQSchema([
    {
      question: `What is the price of this ${listing.propertyType} in ${listing.buildingName || listing.buildingSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}?`,
      answer: `This ${listing.propertyType} is listed at ${formatPrice(listing.price, listing.currency)} (${formatPrice(Math.round(listing.price / listing.sqft), listing.currency)} per sqft).`
    },
    {
      question: `How many bedrooms does this ${listing.buildingName || listing.buildingSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} property have?`,
      answer: listing.bedrooms 
        ? `This property features ${listing.bedrooms} bedrooms and ${listing.bathrooms} bathrooms across ${formatSqft(listing.sqft)} sqft.`
        : `This property offers spacious accommodation across ${formatSqft(listing.sqft)} sqft.`
    },
    {
      question: `Is this DIFC property available for immediate viewing?`,
      answer: `Yes, this property is available for viewing. Contact ${listing.sourceAgent || 'our team'} at ${listing.agentPhone || '+971562195566'} to arrange a viewing.`
    }
  ])

  return (
    <LeadTrackingWrapper 
      pageType="listing_detail" 
      pageSlug={`listings/${slug}`}
      listingId={listing.id}
    >
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
        {/* Back Link */}
        <div className="border-b border-[#EDE9E4] bg-white">
          <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6B5F53] hover:text-[#2D5A4A] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to properties
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-8 space-y-8">
              {/* Image Gallery */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EDE9E4]">
                {listing.images[0] ? (
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[#EDE9E4]">
                    <span className="text-[#8B7F71]">No image available</span>
                  </div>
                )}
                
                {/* Label badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {listing.featured && (
                    <span className="text-xs font-medium uppercase tracking-widest text-[#B8956B]">
                      Featured
                    </span>
                  )}
                  {listing.isNew && (
                    <span className="text-xs font-medium uppercase tracking-widest text-white/90">
                      New to Market
                    </span>
                  )}
                </div>
              </div>

              {/* Property Title & Price */}
              <div>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    {building && (
                      <p className="text-xs font-medium uppercase tracking-widest text-[#B8956B] mb-2">
                        {building.name}
                      </p>
                    )}
                    <h1 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] leading-tight">
                      {listing.title}
                    </h1>
                  </div>
                  <div className="lg:text-right">
                    <p className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815]">
                      {formatPrice(listing.price, listing.currency)}
                    </p>
                    <p className="text-sm text-[#6B5F53]">
                      {formatPrice(listing.pricePerSqft || Math.round(listing.price / listing.sqft), listing.currency)}/sqft
                    </p>
                  </div>
                </div>
              </div>

              {/* Property Specs - Inline text */}
              <div className="flex flex-wrap gap-6 text-sm text-[#6B5F53] border-y border-[#EDE9E4] py-4">
                {listing.bedrooms !== null && (
                  <span className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-[#B8956B]" />
                    {listing.bedrooms} {listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </span>
                )}
                {listing.bathrooms !== null && (
                  <span className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-[#B8956B]" />
                    {listing.bathrooms} {listing.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Maximize className="h-4 w-4 text-[#B8956B]" />
                  {formatSqft(listing.sqft)} sqft
                </span>
                <span className="flex items-center gap-2 capitalize">
                  <Building className="h-4 w-4 text-[#B8956B]" />
                  {listing.propertyType}
                </span>
                {listing.view && (
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#B8956B]" />
                    {listing.view}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <p className="text-[#6B5F53] leading-relaxed text-lg">
                  {listing.description}
                </p>
              </div>

              {/* Features */}
              {listing.features.length > 0 && (
                <div>
                  <h2 className="font-serif text-lg font-normal text-[#1A1815] mb-4">Key Features</h2>
                  <div className="flex flex-wrap gap-3">
                    {listing.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-sm text-[#6B5F53]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {listing.amenities.length > 0 && (
                <div>
                  <h2 className="font-serif text-lg font-normal text-[#1A1815] mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {listing.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-[#6B5F53]">
                        <Check className="h-4 w-4 text-[#B8956B]" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Building Info */}
              {building && (
                <div className="border-t border-[#EDE9E4] pt-8">
                  <h2 className="font-serif text-lg font-normal text-[#1A1815] mb-4">About {building.name}</h2>
                  <p className="text-[#6B5F53] mb-4">{building.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#6B5F53]">
                    <span>
                      <strong className="text-[#1A1815]">Developer:</strong> {building.developer}
                    </span>
                    <span>
                      <strong className="text-[#1A1815]">Completed:</strong> {building.completionYear}
                    </span>
                  </div>
                  <Link
                    href={`/buildings/${building.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#2D5A4A] hover:text-[#1F3D31] transition-colors"
                  >
                    View all properties in {building.name}
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column - Enquiry Form - Refined */}
            <div className="lg:col-span-4">
              <div className="border border-[#EDE9E4] bg-white p-6 lg:p-8 sticky top-24">
                <p className="font-serif text-xl font-normal text-[#1A1815] mb-6">
                  {formatPrice(listing.price, listing.currency)}
                </p>
                
                <div className="space-y-4">
                  <a
                    href={`tel:${listing.agentPhone || '+971562195566'}`}
                    data-cta="call"
                    data-cta-label="Call Agent"
                    className="cta-track flex w-full items-center justify-center gap-2 bg-[#2D5A4A] px-4 py-3 text-sm font-medium text-white hover:bg-[#1F3D31] transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call {listing.agentPhone || '+971 56 219 5566'}
                  </a>
                  
                  <a
                    href={`https://wa.me/${(listing.agentPhone || '+971562195566').replace(/\+/g, '').replace(/\s/g, '')}?text=I'm interested in ${encodeURIComponent(listing.title)} (${encodeURIComponent(listing.slug)})`}
                    data-cta="whatsapp"
                    data-cta-label="WhatsApp Enquiry"
                    className="cta-track flex w-full items-center justify-center gap-2 border border-[#2D5A4A] px-4 py-3 text-sm font-medium text-[#2D5A4A] hover:bg-[#F7F5F2] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  
                  <a
                    href={`mailto:contact@difc.property?subject=Inquiry: ${encodeURIComponent(listing.title)}`}
                    data-cta="email"
                    data-cta-label="Email Enquiry"
                    className="cta-track flex w-full items-center justify-center gap-2 text-sm font-medium text-[#6B5F53] hover:text-[#2D5A4A] transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Send Email
                  </a>

                  <button
                    data-cta="enquire"
                    data-cta-label="Arrange Viewing"
                    className="cta-track flex w-full items-center justify-center gap-2 text-sm font-medium text-[#B8956B] hover:text-[#8B7355] transition-colors pt-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Arrange Viewing
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-[#EDE9E4]">
                  <p className="text-xs text-[#8B7F71] text-center">
                    Listed by {listing.sourceAgent || 'Edifice Brokerage'}
                  </p>
                </div>
              </div>

              {/* Why This Property - Refined */}
              <div className="mt-6 border-l-2 border-[#B8956B] pl-4 py-2">
                <h4 className="font-serif text-sm font-normal text-[#1A1815] mb-3">
                  Why This Property
                </h4>
                <ul className="space-y-2 text-sm text-[#6B5F53]">
                  {listing.pricePerSqft && listing.pricePerSqft < 3500 && (
                    <li>• Competitive price per sqft</li>
                  )}
                  {listing.featured && (
                    <li>• Featured premium listing</li>
                  )}
                  {listing.view?.toLowerCase().includes('burj khalifa') && (
                    <li>• Iconic Burj Khalifa views</li>
                  )}
                  <li>• Prime {listing.buildingName || 'DIFC'} location</li>
                  {listing.price >= 2000000 && (
                    <li>• Golden Visa eligible</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarListings.length > 0 && (
            <div className="mt-16 lg:mt-20 pt-16 lg:pt-20 border-t border-[#EDE9E4]">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                Similar
              </p>
              <h2 className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815] mb-8">
                Properties in {building?.name || 'DIFC'}
              </h2>
              <div className="grid grid-cols-1 gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {similarListings.map((similarListing) => (
                  <ListingCard
                    key={similarListing.slug}
                    listing={{
                      ...similarListing,
                      images: similarListing.images,
                      building: { name: similarListing.buildingName || similarListing.buildingSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), slug: similarListing.buildingSlug }
                    }}
                    variant="featured"
                  />
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-16 lg:mt-20 pt-16 lg:pt-20 border-t border-[#EDE9E4]">
            <FAQSection 
              faqs={[
                {
                  id: `faq-${listing.slug}-price`,
                  question: `What is the price of this ${listing.propertyType} in ${listing.buildingName || listing.buildingSlug}?`,
                  answer: `This ${listing.propertyType} is listed at ${formatPrice(listing.price, listing.currency)} (${formatPrice(listing.pricePerSqft || Math.round(listing.price / listing.sqft), listing.currency)} per sqft).`,
                  category: 'buying',
                  intentTags: ['pricing', 'specific-property'],
                  priority: 1,
                  hermesTags: [],
                  lastIngestedAt: new Date().toISOString()
                },
                {
                  id: `faq-${listing.slug}-viewing`,
                  question: `Can I arrange a viewing for this ${listing.title}?`,
                  answer: `Yes, this property is available for viewing. Contact ${listing.sourceAgent || 'our team'} at ${listing.agentPhone || '+971562195566'} or arrange through WhatsApp or email.`,
                  category: 'buying',
                  intentTags: ['viewing', 'contact'],
                  priority: 1,
                  hermesTags: [],
                  lastIngestedAt: new Date().toISOString()
                },
                {
                  id: `faq-${listing.slug}-golden-visa`,
                  question: `Does this property qualify for the UAE Golden Visa?`,
                  answer: listing.price >= 2000000 
                    ? `Yes! This property is valued at ${formatPrice(listing.price, listing.currency)}, which exceeds the AED 2M minimum required for the UAE Golden Visa program.`
                    : `The UAE Golden Visa requires a minimum property investment of AED 2M. This property is listed at ${formatPrice(listing.price, listing.currency)}. We can help you explore options to meet the threshold or discuss other residency pathways.`,
                  category: 'golden-visa',
                  intentTags: ['golden-visa', 'residency'],
                  priority: 2,
                  hermesTags: [],
                  lastIngestedAt: new Date().toISOString()
                },
              ]}
            />
          </div>
        </div>
      </div>
    </LeadTrackingWrapper>
  )
}