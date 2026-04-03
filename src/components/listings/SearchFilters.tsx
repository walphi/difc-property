'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'

interface SearchFiltersProps {
  onFiltersChange: (filters: {
    query: string
    minPrice: string
    maxPrice: string
    bedrooms: string
    propertyType: string
    building: string
  }) => void
  buildings: { slug: string; name: string }[]
}

export function SearchFilters({ onFiltersChange, buildings }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    query: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
    building: ''
  })

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const cleared = {
      query: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      propertyType: '',
      building: ''
    }
    setFilters(cleared)
    onFiltersChange(cleared)
  }

  const hasActiveFilters = Object.values(filters).some(v => v !== '')

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search properties..."
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
              {Object.values(filters).filter(v => v !== '').length}
            </span>
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {isOpen && (
        <div className="rounded-lg border border-stone-200 bg-white p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Min Price (AED)</label>
              <select
                value={filters.minPrice}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
                className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="">No minimum</option>
                <option value="2000000">AED 2M</option>
                <option value="3000000">AED 3M</option>
                <option value="5000000">AED 5M</option>
                <option value="7000000">AED 7M</option>
                <option value="10000000">AED 10M</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Max Price (AED)</label>
              <select
                value={filters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="">No maximum</option>
                <option value="5000000">AED 5M</option>
                <option value="7000000">AED 7M</option>
                <option value="10000000">AED 10M</option>
                <option value="15000000">AED 15M</option>
                <option value="20000000">AED 20M+</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Bedrooms</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => updateFilter('bedrooms', e.target.value)}
                className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Property Type</label>
              <select
                value={filters.propertyType}
                onChange={(e) => updateFilter('propertyType', e.target.value)}
                className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="penthouse">Penthouse</option>
                <option value="duplex">Duplex</option>
              </select>
            </div>

            {/* Building */}
            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-medium text-stone-700">Building</label>
              <select
                value={filters.building}
                onChange={(e) => updateFilter('building', e.target.value)}
                className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="">All Buildings</option>
                {buildings.map((building) => (
                  <option key={building.slug} value={building.slug}>
                    {building.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
