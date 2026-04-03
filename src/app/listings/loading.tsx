import { Building2 } from 'lucide-react'

export default function ListingsLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="border-b border-stone-200 bg-stone-50">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-4 w-32 bg-stone-200 rounded animate-pulse mb-4" />
          <div className="h-10 w-96 bg-stone-200 rounded animate-pulse mb-4" />
          <div className="h-6 w-full max-w-2xl bg-stone-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Filters & Results Skeleton */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Filters Skeleton */}
        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 bg-stone-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-stone-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Results Count Skeleton */}
        <div className="mt-6 flex items-center justify-between">
          <div className="h-4 w-40 bg-stone-200 rounded animate-pulse" />
        </div>

        {/* Listings Grid Skeleton */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="group animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-200" />

              {/* Content Skeleton */}
              <div className="mt-4 space-y-2">
                <div className="h-7 w-3/4 bg-stone-200 rounded" />
                <div className="h-4 w-1/2 bg-stone-200 rounded" />
                <div className="flex items-center gap-3 pt-2">
                  <div className="h-4 w-12 bg-stone-200 rounded" />
                  <div className="h-4 w-12 bg-stone-200 rounded" />
                  <div className="h-4 w-16 bg-stone-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="mt-12 flex items-center justify-center gap-3 text-stone-400">
          <Building2 className="h-5 w-5 animate-bounce" />
          <span className="text-sm font-medium">Loading properties...</span>
        </div>
      </div>

      {/* FAQ Section Skeleton */}
      <section className="border-t border-stone-200 bg-stone-50 mt-8">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-8 w-80 bg-stone-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="h-5 w-full bg-stone-200 rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-stone-200 rounded animate-pulse mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
