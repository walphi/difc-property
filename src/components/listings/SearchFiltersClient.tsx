'use client'

import { useState, useMemo } from 'react'
import { ListingCard } from '@/components/listings/ListingCard'
import type { Listing } from '@/lib/models/hermes.types'

interface SearchFiltersClientProps {
  buildings: { slug: string; name: string }[]
  listings: Listing[]
}

export function SearchFiltersClient({ buildings, listings }: SearchFiltersClientProps) {
  const [filters, setFilters] = useState({
    query: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
    building: ''
  })

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // Search query
      if (filters.query) {
        const query = filters.query.toLowerCase()
        const matchesSearch = 
          listing.title.toLowerCase().includes(query) ||
          listing.buildingSlug.toLowerCase().includes(query) ||
          (listing.view && listing.view.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Price range
      if (filters.minPrice && listing.price < parseInt(filters.minPrice)) return false
      if (filters.maxPrice && listing.price > parseInt(filters.maxPrice)) return false

      // Bedrooms
      if (filters.bedrooms) {
        const bedrooms = listing.bedrooms || Math.round(listing.sqft / 800)
        if (filters.bedrooms === '4') {
          if (bedrooms < 4) return false
        } else {
          if (bedrooms !== parseInt(filters.bedrooms)) return false
        }
      }

      // Property type
      if (filters.propertyType && listing.propertyType !== filters.propertyType) return false

      // Building
      if (filters.building && listing.buildingSlug !== filters.building) return false

      return true
    })
  }, [filters, listings])

  return (
    <>
      {/* Filters - Minimal, refined */}
      <div className="border-b border-[#EDE9E4] pb-6 mb-8">
        <div className="flex flex-wrap items-end gap-4 lg:gap-6">
          {/* Search */}
          <div className="flex-1 min-w-[200px] max-w-md">
            <label htmlFor="search" className="block text-xs font-medium uppercase tracking-widest text-[#6B5F53] mb-2">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              placeholder="Property name, building, view..."
              className="block w-full border-0 border-b border-[#DDD6CC] bg-transparent px-0 py-2 text-[#1A1815] placeholder:text-[#B5A99B] focus:border-[#B8956B] focus:outline-none focus:ring-0"
            />
          </div>

          {/* Building */}
          <div className="min-w-[140px]">
            <label htmlFor="building" className="block text-xs font-medium uppercase tracking-widest text-[#6B5F53] mb-2">
              Building
            </label>
            <select
              id="building"
              value={filters.building}
              onChange={(e) => setFilters({ ...filters, building: e.target.value })}
              className="block w-full border-0 border-b border-[#DDD6CC] bg-transparent px-0 py-2 text-[#1A1815] focus:border-[#B8956B] focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option value="">All Buildings</option>
              {buildings.map((building) => (
                <option key={building.slug} value={building.slug}>
                  {building.name}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="min-w-[120px]">
            <label htmlFor="type" className="block text-xs font-medium uppercase tracking-widest text-[#6B5F53] mb-2">
              Type
            </label>
            <select
              id="type"
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              className="block w-full border-0 border-b border-[#DDD6CC] bg-transparent px-0 py-2 text-[#1A1815] focus:border-[#B8956B] focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="penthouse">Penthouse</option>
              <option value="duplex">Duplex</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div className="min-w-[100px]">
            <label htmlFor="bedrooms" className="block text-xs font-medium uppercase tracking-widest text-[#6B5F53] mb-2">
              Bedrooms
            </label>
            <select
              id="bedrooms"
              value={filters.bedrooms}
              onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
              className="block w-full border-0 border-b border-[#DDD6CC] bg-transparent px-0 py-2 text-[#1A1815] focus:border-[#B8956B] focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Price Range - Inline */}
          <div className="min-w-[200px]">
            <label className="block text-xs font-medium uppercase tracking-widest text-[#6B5F53] mb-2">
              Price Range (AED)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                placeholder="Min"
                className="w-24 border-0 border-b border-[#DDD6CC] bg-transparent px-0 py-2 text-[#1A1815] placeholder:text-[#B5A99B] focus:border-[#B8956B] focus:outline-none focus:ring-0"
              />
              <span className="text-[#B5A99B]">—</span>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                placeholder="Max"
                className="w-24 border-0 border-b border-[#DDD6CC] bg-transparent px-0 py-2 text-[#1A1815] placeholder:text-[#B5A99B] focus:border-[#B8956B] focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Count - Minimal */}
      <div className="mb-8">
        <p className="text-sm text-[#6B5F53]">
          {filteredListings.length} properties
        </p>
      </div>

      {/* Listings Grid - 3 columns, generous spacing */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
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
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-[#6B5F53]">No properties match your criteria.</p>
          <p className="mt-2 text-sm text-[#8B7F71]">Adjust your filters to see more results.</p>
        </div>
      )}
    </>
  )
}