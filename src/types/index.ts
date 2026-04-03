export interface PropertyListing {
  id: string
  slug: string
  title: string
  description?: string
  price: number
  currency: string
  pricePerSqft?: number
  bedrooms: number | null
  bathrooms: number | null
  sqft: number
  propertyType: string
  floor?: string
  unit?: string
  status: 'available' | 'under_offer' | 'sold' | 'rented'
  featured: boolean
  isNew: boolean
  amenities: string[]
  images: string[]
  floorPlans: string[]
  view?: string
  features: string[]
  buildingId: string
  building: Building
  sourceName: string
  sourceUrl?: string
  sourceAgent?: string
  agentPhone?: string
  metaTitle?: string
  metaDescription?: string
  createdAt: Date
  updatedAt: Date
  listedAt: Date
}

export interface Building {
  id: string
  slug: string
  name: string
  description?: string
  developer?: string
  address: string
  city: string
  district: string
  country: string
  latitude?: number
  longitude?: number
  completionYear?: number
  totalUnits?: number
  buildingType: string
  amenities: string[]
  images: string[]
  featured: boolean
  listings?: PropertyListing[]
  createdAt: Date
  updatedAt: Date
}

export interface NewsArticle {
  id: string
  slug: string
  title: string
  content: string
  summary?: string
  excerpt?: string
  categoryId: string
  category: Category
  tags: string[]
  source?: string
  sourceUrl?: string
  author?: string
  featuredImage?: string
  images: string[]
  metaTitle?: string
  metaDescription?: string
  published: boolean
  publishedAt: Date
  featured: boolean
  relatedListings: string[]
  relatedBuildings: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  type: 'news' | 'listing' | 'area'
  color?: string
  articles?: NewsArticle[]
  createdAt: Date
  updatedAt: Date
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  message?: string
  source: string
  listingId?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted'
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  createdAt: Date
  updatedAt: Date
}

export interface SEOMetadata {
  id: string
  pagePath: string
  pageType: string
  title: string
  description: string
  keywords: string[]
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  schemaType?: string
  schemaData?: Record<string, unknown>
  faqs?: Array<{ question: string; answer: string }>
  updatedAt: Date
}

export interface SearchFilters {
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  propertyType?: string
  building?: string
  status?: string
  featured?: boolean
}
