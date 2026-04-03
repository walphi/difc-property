import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, Building, ArrowRight, Check } from 'lucide-react'
import { buildingsData } from '@/lib/data/seed'
import { listingsData } from '@/lib/data/seed'
import { ListingCard } from '@/components/listings/ListingCard'
import { generateBuildingSchema, generateBreadcrumbSchema } from '@/lib/schema/jsonld'
import type { Metadata } from 'next'

interface BuildingPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BuildingPageProps): Promise<Metadata> {
  const { slug } = await params
  const building = buildingsData.find(b => b.slug === slug)
  
  if (!building) {
    return {
      title: 'Building Not Found | DIFC.property',
    }
  }

  return {
    title: `${building.name} | DIFC Properties & Residences | DIFC.property`,
    description: `${building.name} in DIFC, Dubai. ${building.description?.slice(0, 150)}... Find available properties for sale in ${building.name}.`,
    keywords: [building.name, 'DIFC', building.buildingType, 'properties for sale', 'Dubai real estate'],
    openGraph: {
      title: building.name,
      description: building.description,
      url: `https://difc.property/buildings/${building.slug}`,
      images: building.images[0] ? [{ url: building.images[0] }] : undefined,
    },
  }
}

export async function generateStaticParams() {
  return buildingsData.map((building) => ({
    slug: building.slug,
  }))
}

export default async function BuildingPage({ params }: BuildingPageProps) {
  const { slug } = await params
  const building = buildingsData.find(b => b.slug === slug)
  
  if (!building) {
    notFound()
  }

  // Get listings in this building
  const buildingListings = listingsData.filter(l => l.buildingSlug === slug)

  // Schema data
  const buildingSchema = generateBuildingSchema(building)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://difc.property' },
    { name: 'Buildings', url: 'https://difc.property/buildings' },
    { name: building.name }
  ])

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
        {/* Hero */}
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          {building.images[0] ? (
            <Image
              src={building.images[0]}
              alt={building.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#EDE9E4]">
              <span className="text-[#8B7F71]">{building.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815]/80 via-[#1A1815]/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to properties
              </Link>
              <h1 className="font-serif text-4xl font-normal text-white sm:text-5xl lg:text-6xl leading-[1.15]">
                {building.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-white/80">
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {building.address}
                </span>
                <span className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {building.buildingType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Completed {building.completionYear}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Left Column - Building Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                  About {building.name}
                </h2>
                <p className="text-[#6B5F53] leading-relaxed text-lg">
                  {building.description}
                </p>
              </div>

              {/* Building Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="bg-[#F7F5F2] p-4">
                  <p className="text-sm text-[#8B7F71]">Developer</p>
                  <p className="font-medium text-[#1A1815]">{building.developer}</p>
                </div>
                <div className="bg-[#F7F5F2] p-4">
                  <p className="text-sm text-[#8B7F71]">Completed</p>
                  <p className="font-medium text-[#1A1815]">{building.completionYear}</p>
                </div>
                <div className="bg-[#F7F5F2] p-4">
                  <p className="text-sm text-[#8B7F71]">Total Units</p>
                  <p className="font-medium text-[#1A1815]">{building.totalUnits}</p>
                </div>
                <div className="bg-[#F7F5F2] p-4">
                  <p className="text-sm text-[#8B7F71]">Type</p>
                  <p className="font-medium text-[#1A1815] capitalize">{building.buildingType.replace('-', ' ')}</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                  Building Amenities
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {building.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-[#6B5F53]">
                      <Check className="h-4 w-4 text-[#B8956B]" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              {building.latitude && building.longitude && (
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-4">
                    Location
                  </h2>
                  <div className="aspect-video bg-[#F7F5F2] overflow-hidden">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.5!2d${building.longitude}!3d${building.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzQwLjAiTiA1NcKwMTYnNDEuMCJF!5e0!3m2!1sen!2sae!4v1`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - CTA */}
            <div className="space-y-6">
              <div className="border border-[#EDE9E4] bg-[#FDFCFB] p-6 sticky top-24">
              <h3 className="font-serif text-lg font-normal text-[#1A1815] mb-2">
                Properties in {building.name}
              </h3>
              <p className="text-sm text-[#6B5F53] mb-6">
                {buildingListings.length} properties currently available for sale
              </p>
                
                <a
                  href="#listings"
                  className="flex w-full items-center justify-center gap-2 bg-[#1A1815] px-4 py-3 text-sm font-medium text-white hover:bg-[#2D2924] transition-colors"
                >
                  View Available Properties
                  <ArrowRight className="h-5 w-5" />
                </a>

                <div className="mt-6 pt-6 border-t border-[#EDE9E4] text-center">
                  <p className="text-sm text-[#8B7F71]">
                    Want to sell your property?<br />
                    <a href="mailto:contact@difc.property" className="text-[#B8956B] hover:text-[#2D5A4A]">
                      Contact our team
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Available Listings */}
          <div id="listings" className="mt-16">
            <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-8">
              Available Properties in {building.name}
            </h2>
            
            {buildingListings.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {buildingListings.map((listing) => (
                  <ListingCard
                    key={listing.slug}
                    listing={{
                      ...listing,
                      images: listing.images,
                      building: { name: building.name, slug: building.slug }
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#F7F5F2] p-8 text-center">
                <p className="text-lg text-[#6B5F53]">No properties currently available in {building.name}.</p>
                <p className="mt-2 text-sm text-[#8B7F71]">
                  <Link href="/listings" className="text-[#B8956B] hover:text-[#2D5A4A]">
                    View all DIFC properties
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
