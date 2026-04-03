import { ArrowLeft, Building2, Bed, Bath, Maximize } from 'lucide-react'

export default function ListingDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Link Skeleton */}
      <div className="border-b border-stone-200">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 text-stone-300" />
            <div className="h-4 w-32 bg-stone-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery Skeleton */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-stone-200 animate-pulse" />

            {/* Property Title & Price Skeleton */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 w-full">
                <div className="h-8 w-3/4 bg-stone-200 rounded animate-pulse" />
                <div className="h-5 w-1/3 bg-stone-200 rounded animate-pulse" />
              </div>
              <div className="text-right space-y-2">
                <div className="h-8 w-48 bg-stone-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-stone-200 rounded animate-pulse ml-auto" />
              </div>
            </div>

            {/* Property Specs Skeleton */}
            <div className="flex flex-wrap gap-6 border-y border-stone-200 py-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-stone-200 rounded animate-pulse" />
                  <div className="space-y-1">
                    <div className="h-4 w-8 bg-stone-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-stone-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Description Skeleton */}
            <div className="space-y-3">
              <div className="h-6 w-48 bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-stone-200 rounded animate-pulse" />
            </div>

            {/* Features Skeleton */}
            <div className="space-y-3">
              <div className="h-6 w-32 bg-stone-200 rounded animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 w-24 bg-stone-200 rounded-full animate-pulse" />
                ))}
              </div>
            </div>

            {/* Building Info Skeleton */}
            <div className="rounded-lg bg-stone-50 p-6 space-y-4">
              <div className="h-6 w-64 bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-stone-200 rounded animate-pulse" />
              <div className="flex flex-wrap gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 w-32 bg-stone-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Enquiry Form Skeleton */}
          <div className="space-y-6">
            <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm space-y-4">
              <div className="h-6 w-48 bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
              
              <div className="space-y-4">
                <div className="h-12 w-full bg-stone-200 rounded animate-pulse" />
                <div className="h-12 w-full bg-stone-200 rounded animate-pulse" />
              </div>

              <div className="pt-6 border-t border-stone-200 space-y-2">
                <div className="h-3 w-full bg-stone-200 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-stone-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Skeleton */}
        <div className="mt-16 border-t border-stone-200 pt-16">
          <div className="h-8 w-64 bg-stone-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/3] bg-stone-200 rounded-xl animate-pulse" />
                <div className="h-6 w-3/4 bg-stone-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-stone-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-stone-200">
        <Building2 className="h-5 w-5 text-[#047857] animate-bounce" />
        <span className="text-sm font-medium text-stone-600">Loading property details...</span>
      </div>
    </div>
  )
}
