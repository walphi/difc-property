'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize, ArrowUpRight } from 'lucide-react'
import { formatPrice, formatSqft } from '@/lib/utils'

interface ListingCardProps {
  listing: {
    slug: string
    title: string
    price: number
    currency: string
    bedrooms: number | null
    bathrooms: number | null
    sqft: number
    propertyType: string
    images: string[]
    view?: string
    featured?: boolean
    isNew?: boolean
    building?: {
      name: string
      slug: string
    }
  }
  variant?: 'default' | 'featured' | 'compact'
}

export function ListingCard({ listing, variant = 'default' }: ListingCardProps) {
  if (variant === 'featured') {
    return (
      <div className="group block">
        <Link href={`/listings/${listing.slug}`}>
          <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE9E4]">
            {listing.images[0] ? (
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#EDE9E4]">
                <span className="text-[#8B7F71]">No image</span>
              </div>
            )}
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815]/70 via-transparent to-transparent" />
            
            {/* Label badges - refined, not rounded */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {listing.featured && (
                <span className="text-xs font-medium uppercase tracking-widest text-[#ededed]">
                  Featured
                </span>
              )}
              {listing.isNew && (
                <span className="text-xs font-medium uppercase tracking-widest text-[#FDFCFB]/80">
                  New to Market
                </span>
              )}
            </div>

            {/* Price overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-serif text-2xl font-medium text-white">
                {formatPrice(listing.price, listing.currency)}
              </p>
              <p className="text-sm text-white/70 mt-1">
                {formatPrice(Math.round(listing.price / listing.sqft), listing.currency)}/sqft
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            {listing.building && (
              <p className="text-xs font-medium uppercase tracking-widest text-[#B8956B]">
                {listing.building.name}
              </p>
            )}
            <h3 className="font-serif text-lg font-medium text-[#1A1815] line-clamp-2 group-hover:text-[#2D5A4A] transition-colors">
              {listing.title}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-[#6B5F53] pt-1">
              {listing.bedrooms !== null && (
              <span className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-[#B8956B]" />
                {listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}
              </span>
              )}
              {listing.bathrooms !== null && (
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-[#B8956B]" />
                {listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}
              </span>
              )}
              <span className="flex items-center gap-1.5">
                <Maximize className="h-4 w-4 text-[#B8956B]" />
                {formatSqft(listing.sqft)} sqft
              </span>
            </div>

            {listing.view && (
              <p className="text-sm text-[#6B5F53] pt-1">{listing.view}</p>
            )}
          </div>
        </Link>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/listings/${listing.slug}`} className="group flex gap-4 py-3 border-b border-[#EDE9E4] last:border-b-0">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden bg-[#EDE9E4]">
          {listing.images[0] ? (
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#EDE9E4]">
              <span className="text-xs text-[#8B7F71]">No image</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center">
          {listing.building && (
            <p className="text-xs font-medium uppercase tracking-widest text-[#B8956B] mb-1">
              {listing.building.name}
            </p>
          )}
          <h4 className="font-serif text-base font-medium text-[#1A1815] line-clamp-2 group-hover:text-[#2D5A4A] transition-colors">
            {listing.title}
          </h4>
          <p className="font-serif text-lg font-medium text-[#1A1815] mt-1">
            {formatPrice(listing.price, listing.currency)}
          </p>
          <p className="text-xs text-[#6B5F53] mt-1">
            {listing.bedrooms !== null && `${listing.bedrooms} bed`}
            {listing.bedrooms !== null && listing.bathrooms !== null && ' • '}
            {listing.bathrooms !== null && `${listing.bathrooms} bath`}
            {' • '}{formatSqft(listing.sqft)} sqft
          </p>
        </div>
      </Link>
    )
  }

  // Default variant - refined, editorial style
  return (
    <div className="group">
      <Link href={`/listings/${listing.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE9E4]">
          {listing.images[0] ? (
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#EDE9E4]">
              <span className="text-[#8B7F71]">No image</span>
            </div>
          )}
          
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Label badges - refined text labels, not rounded pills */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {listing.propertyType === 'penthouse' && (
              <span className="text-xs font-medium uppercase tracking-widest text-[#B8956B]">
                Penthouse
              </span>
            )}
            {listing.isNew && (
              <span className="text-xs font-medium uppercase tracking-widest text-[#FDFCFB]/90">
                New to Market
              </span>
            )}
          </div>
          
          {/* Hover indicator */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 p-2">
              <ArrowUpRight className="h-4 w-4 text-[#1A1815]" />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="font-serif text-xl font-medium text-[#1A1815]">
            {formatPrice(listing.price, listing.currency)}
          </p>
          {listing.building && (
            <p className="text-xs font-medium uppercase tracking-widest text-[#B8956B]">
              {listing.building.name}
            </p>
          )}
          <h3 className="font-medium text-[#2D2924] line-clamp-1 group-hover:text-[#2D5A4A] transition-colors">
            {listing.title}
          </h3>
          
          <div className="flex items-center gap-3 pt-2 text-sm text-[#6B5F53]">
            {listing.bedrooms !== null && (
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4 text-[#B8956B]" />
                {listing.bedrooms}
              </span>
            )}
            {listing.bathrooms !== null && (
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4 text-[#B8956B]" />
                {listing.bathrooms}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize className="h-4 w-4 text-[#B8956B]" />
              {formatSqft(listing.sqft)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}