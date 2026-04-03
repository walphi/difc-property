import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ListingCard } from '@/components/listings/ListingCard'
import { ArticleCard } from '@/components/editorial/ArticleCard'
import { HeroCarousel } from '@/components/hero/HeroCarousel'
import { listingsData } from '@/lib/data/seed'
import { newsArticlesData } from '@/lib/data/news'

export default function HomePage() {
  const featuredListings = listingsData.filter(l => l.featured).slice(0, 3)
  const featuredArticles = newsArticlesData.filter(a => a.featured).slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Featured Properties - Editorial Layout */}
      <section className="py-16 lg:py-24 bg-[#FDFCFB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                Current Selection
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#1A1815] leading-tight">
                Exceptional Residences in Dubai&apos;s Financial Heart
              </h2>
            </div>
            <Link
              href="/listings"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#6B5F53] hover:text-[#2D5A4A] transition-colors border-b border-[#B8956B]/30 hover:border-[#2D5A4A] pb-0.5"
            >
              View Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {/* 3-column grid for featured listings */}
          <div className="grid grid-cols-1 gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <ListingCard
                key={listing.slug}
                listing={{
                  ...listing,
                  images: listing.images,
                  building: { name: listing.buildingSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), slug: listing.buildingSlug }
                }}
                variant="featured"
              />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6B5F53] hover:text-[#2D5A4A] transition-colors"
            >
              View Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DIFC Guide Section - Editorial Two Column */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:gap-20 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                Living in DIFC
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#1A1815] leading-tight mb-6">
                An Urban Community Where World-Class Dining, Art, and Residence Converge
              </h2>
              <p className="text-[#6B5F53] leading-relaxed mb-8">
                DIFC offers a unique proposition in Dubai: a genuine walkable urban community where 
                Michelin-starred restaurants, galleries, business, and luxury living exist in harmony. 
                From Gate Village&apos;s European-style piazza to direct metro connectivity, discover 
                why DIFC is Dubai&apos;s premier address.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8 py-8 border-y border-[#EDE9E4]">
                <div>
                  <p className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815]">4,000+</p>
                  <p className="text-sm text-[#6B5F53] mt-1">Active Companies</p>
                </div>
                <div>
                  <p className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815]">15</p>
                  <p className="text-sm text-[#6B5F53] mt-1">Premium Residences</p>
                </div>
                <div>
                  <p className="font-serif text-2xl lg:text-3xl font-normal text-[#1A1815]">AED 100B</p>
                  <p className="text-sm text-[#6B5F53] mt-1">Expansion Plan</p>
                </div>
              </div>

              <Link
                href="/living"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#2D5A4A] hover:text-[#1F3D31] transition-colors border-b border-[#2D5A4A]/30 hover:border-[#1F3D31] pb-0.5"
              >
                Explore the DIFC Lifestyle
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            {/* Image Container - Editorial style */}
            <div className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
              <Image
                src="/images/content/Gate-village-building.jpg"
                alt="DIFC Gate Village and modern architecture"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p className="text-white/80 text-sm mb-1">Gate Village</p>
                <p className="text-white font-serif text-xl lg:text-2xl font-normal">Dubai&apos;s Premier Lifestyle Destination</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News - Editorial Grid */}
      <section className="py-16 lg:py-24 bg-[#F7F5F2]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-3">
                Intelligence
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#1A1815]">
                Latest District News
              </h2>
            </div>
            <Link
              href="/news"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#6B5F53] hover:text-[#2D5A4A] transition-colors border-b border-[#B8956B]/30 hover:border-[#2D5A4A] pb-0.5"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {/* 3-column editorial grid */}
          <div className="grid grid-cols-1 gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={{
                  ...article,
                  category: { name: article.categorySlug, slug: article.categorySlug },
                  publishedAt: new Date().toISOString()
                }}
                variant="default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust/About Section - Full Bleed Image */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/content/A Curated Platform for DIFC Real Estate.webp"
            alt="DIFC Dubai skyline at dusk"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1815]/80" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-6">
              About DIFC.Property
            </p>
            
            <h2 className="font-serif text-3xl lg:text-5xl font-normal text-white leading-tight mb-8">
              A Curated Platform for DIFC Real Estate
            </h2>
            
            <p className="text-lg lg:text-xl leading-relaxed text-white/70 mb-10">
              We provide verified property listings, district intelligence, and market insights 
              exclusively focused on Dubai International Financial Centre.
            </p>
            
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#B8956B] transition-colors border-b border-white/30 hover:border-[#B8956B] pb-0.5"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Refined */}
      <section className="py-16 lg:py-24 bg-[#2D5A4A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-normal text-white leading-tight mb-4">
              Ready to Find Your DIFC Property?
            </h2>
            <p className="text-lg text-white/70 mb-10">
              Browse our curated selection or contact us for personalized assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#2D5A4A] bg-white hover:bg-[#F7F5F2] transition-colors px-6 py-3"
              >
                Browse Properties
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+971562195566"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#B8956B] transition-colors border-b border-white/30 hover:border-[#B8956B] pb-0.5"
              >
                Call +971 56 219 5566
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}