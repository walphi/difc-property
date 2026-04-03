import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building2, MapPin, TrendingUp, Check, Award, Users, Shield } from 'lucide-react'
import { buildingsData } from '@/lib/data/seed'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About DIFC.property | Curated Real Estate Platform for Dubai International Financial Centre',
  description: 'Learn about DIFC.property, a curated luxury real estate and district intelligence platform exclusively focused on Dubai International Financial Centre. Verified listings, market insights, and DIFC expertise.',
  keywords: ['About DIFC.property', 'DIFC real estate platform', 'DIFC property experts', 'Dubai property guide', 'DIFC Dubai'],
  openGraph: {
    title: 'About DIFC.property',
    description: 'A curated luxury real estate platform exclusively focused on Dubai International Financial Centre.',
    url: 'https://difc.property/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
            alt="DIFC Dubai"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/70" />
        </div>
        
        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About DIFC.property
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-stone-200">
              A curated luxury real estate and district intelligence platform exclusively focused on 
              Dubai International Financial Centre.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Mission */}
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-stone-600 mb-6">
            DIFC.property was created to serve as the definitive resource for DIFC real estate—a curated platform 
            that connects discerning buyers, investors, and residents with premium properties in Dubai's most 
            prestigious financial district.
          </p>
          <p className="text-lg leading-relaxed text-stone-600">
            Unlike generic Dubai property portals, we focus exclusively on DIFC, providing deep expertise, 
            verified listings, and genuine district intelligence that helps our users make informed decisions 
            about buying, selling, and living in Dubai International Financial Centre.
          </p>
        </div>

        {/* What Sets Us Apart */}
        <div className="mt-16">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8 text-center">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-stone-50 p-6">
              <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
                <MapPin className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">DIFC Exclusive</h3>
              <p className="text-stone-600">
                We focus exclusively on DIFC real estate, providing deep local knowledge and expertise 
                that generic platforms cannot match.
              </p>
            </div>
            
            <div className="rounded-lg bg-stone-50 p-6">
              <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
                <Shield className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Verified Listings</h3>
              <p className="text-stone-600">
                All property listings are verified and sourced from reputable brokers. We provide 
                transparent information including source attribution and agent details.
              </p>
            </div>
            
            <div className="rounded-lg bg-stone-50 p-6">
              <div className="mb-4 inline-flex rounded-full bg-amber-100 p-3">
                <TrendingUp className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Market Intelligence</h3>
              <p className="text-stone-600">
                Beyond listings, we provide DIFC news, market insights, and district intelligence 
                to help you understand the broader context of your investment.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
              alt="DIFC Dubai Architecture"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">
              Our Approach
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-stone-900">Editorial Integrity</h4>
                  <p className="text-stone-600">We provide objective, informative content without commercial pressure or bias.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-stone-900">Data Transparency</h4>
                  <p className="text-stone-600">All listing data is clearly attributed to source brokers with direct contact information.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-stone-900">AI-Search Ready</h4>
                  <p className="text-stone-600">Our structured data and schema markup ensure DIFC information is easily discoverable by AI systems.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-6 w-6 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-stone-900">Continuous Updates</h4>
                  <p className="text-stone-600">We continuously monitor DIFC news, developments, and market changes to keep information current.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Buildings Section */}
        <div className="mt-16">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8 text-center">
            DIFC Buildings We Cover
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {buildingsData.map((building) => (
              <Link
                key={building.slug}
                href={`/buildings/${building.slug}`}
                className="group flex items-center gap-4 rounded-lg border border-stone-200 p-4 hover:border-amber-700 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 group-hover:bg-amber-100 transition-colors">
                  <Building2 className="h-6 w-6 text-stone-600 group-hover:text-amber-700" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
                    {building.name}
                  </h3>
                  <p className="text-sm text-stone-500">{building.buildingType}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-16 rounded-lg bg-stone-900 p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-stone-300 mb-8">
              Have questions about DIFC real estate? Our team is here to help you navigate 
              the market and find the perfect property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+971562195566"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Call +971 56 219 5566
              </a>
              <a
                href="mailto:contact@difc.property"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-base font-medium text-white hover:bg-white/20 transition-colors"
              >
                Email Us
              </a>
            </div>
            <p className="mt-6 text-sm text-stone-400">
              Office: Al Saqr Business Tower, DIFC, Dubai, UAE
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
