/**
 * Data Models for Hermes Agent - difc.property
 * Core schemas for ingestion, normalization, and enrichment
 */

// ============================================================================
// LISTING MODEL
// ============================================================================

export interface Listing {
  id: string
  slug: string
  title: string
  description: string
  price: number
  currency: string
  pricePerSqft?: number
  
  // Property details
  propertyType: 'apartment' | 'penthouse' | 'duplex' | 'townhouse'
  bedrooms: number | null
  bathrooms: number | null
  sqft: number
  view?: string
  
  // Location
  buildingSlug: string
  buildingName?: string
  floor?: number
  unit?: string
  
  // Media
  images: string[]
  floorPlan?: string
  videoUrl?: string
  
  // Features
  features: string[]
  amenities: string[]
  
  // Status
  status: 'available' | 'under-offer' | 'sold' | 'rented'
  featured: boolean
  isNew: boolean
  
  // Source & Agent
  sourceAgent?: string
  agentPhone?: string
  agentEmail?: string
  sourceUrl?: string
  
  // Metadata
  createdAt: string
  updatedAt: string
  publishedAt?: string
  
  // SEO & Enrichment
  seoMetadata?: SeoMetadata
  jsonLd?: object
  internalLinks?: string[]
  
  // Hermes tracking
  hermesTags: string[]
  lastIngestedAt: string
  enrichmentVersion: number
}

// ============================================================================
// BUILDING MODEL
// ============================================================================

export interface Building {
  slug: string
  name: string
  description: string
  
  // Developer info
  developer: string
  architect?: string
  
  // Location
  address: string
  city: string
  district: string
  country: string
  latitude: number
  longitude: number
  
  // Building specs
  completionYear: number
  totalUnits: number
  totalFloors?: number
  buildingType: 'residential' | 'commercial' | 'mixed-use' | 'hotel'
  
  // Features
  amenities: string[]
  nearbyAmenities?: string[]
  
  // Media
  images: string[]
  featured: boolean
  
  // SEO & Enrichment
  seoMetadata?: SeoMetadata
  jsonLd?: object
  
  // Hermes tracking
  hermesTags: string[]
  lastIngestedAt: string
  enrichmentVersion: number
}

// ============================================================================
// NEWS ARTICLE MODEL
// ============================================================================

export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  
  // Categorization
  category: string
  categorySlug: string
  tags: string[]
  
  // DIFC relevance
  difcRelevance: 'high' | 'medium' | 'low'
  relatedBuildings?: string[]
  relatedTopics?: string[]
  
  // Media
  featuredImage?: string
  images?: string[]
  
  // Status
  featured: boolean
  isBreaking?: boolean
  
  // Metadata
  publishedAt: string
  updatedAt?: string
  author?: string
  sourceUrl?: string
  
  // SEO & Enrichment
  seoMetadata?: SeoMetadata
  jsonLd?: object
  
  // Hermes tracking
  hermesTags: string[]
  lastIngestedAt: string
  enrichmentVersion: number
}

// ============================================================================
// LEGAL CONTENT MODEL
// ============================================================================

export interface LegalContent {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  
  // Categorization
  category: 'real-property-law' | 'personal-property-law' | 'golden-visa' | 'regulation' | 'tax'
  jurisdiction: 'DIFC' | 'UAE' | 'Dubai'
  
  // Applicability
  appliesTo?: string[] // e.g., ['buyers', 'investors', 'residents']
  effectiveDate?: string
  lastUpdated?: string
  
  // Legal context
  relatedLaws?: string[]
  officialSource?: string
  
  // Disclaimers
  requiresDisclaimer: boolean
  disclaimerText?: string
  
  // SEO & Enrichment
  seoMetadata?: SeoMetadata
  jsonLd?: object
  
  // Hermes tracking
  hermesTags: string[]
  lastIngestedAt: string
  enrichmentVersion: number
}

// ============================================================================
// FAQ MODEL
// ============================================================================

export interface FAQ {
  id: string
  question: string
  answer: string
  
  // Categorization
  category: 'general' | 'buying' | 'selling' | 'renting' | 'legal' | 'golden-visa' | 'building'
  
  // Intent targeting
  intentTags: string[]
  relatedListings?: string[]
  relatedBuildings?: string[]
  relatedLegalContent?: string[]
  
  // Page placement
  priority: number
  displayOnPages?: string[]
  
  // SEO
  targetKeywords?: string[]
  
  // Hermes tracking
  performance?: {
    views: number
    helpfulClicks: number
    lastUpdated: string
  }
  hermesTags: string[]
  lastIngestedAt: string
}

// ============================================================================
// SEO METADATA MODEL
// ============================================================================

export interface SeoMetadata {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
  structuredData?: object
}

// ============================================================================
// LEAD EVENT MODEL
// ============================================================================

export type LeadEventType = 
  | 'page_view'
  | 'listing_view'
  | 'building_view'
  | 'cta_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'form_start'
  | 'form_submit'
  | 'property_save'
  | 'search_perform'
  | 'filter_apply'

export interface LeadEvent {
  id: string
  type: LeadEventType
  
  // Page context
  pageType: 'home' | 'listings' | 'listing_detail' | 'building_detail' | 'news' | 'legal' | 'about'
  pageSlug: string
  
  // Content context (optional)
  listingId?: string
  buildingId?: string
  articleId?: string
  searchQuery?: string
  filters?: Record<string, string>
  
  // CTA context
  ctaType?: 'enquire' | 'whatsapp' | 'call' | 'email' | 'view' | 'save' | 'share'
  ctaLabel?: string
  
  // Traffic source
  source: 'organic' | 'direct' | 'referral' | 'social' | 'email' | 'paid'
  referrer?: string
  utmCampaign?: string
  utmSource?: string
  utmMedium?: string
  
  // User context
  sessionId: string
  userAgent?: string
  device: 'desktop' | 'mobile' | 'tablet'
  
  // Location
  ip?: string
  country?: string
  city?: string
  
  // Qualification signals
  timeOnPage?: number
  scrollDepth?: number
  pagesViewed?: number
  
  // Metadata
  createdAt: string
  processedAt?: string
}

// ============================================================================
// LEAD QUALIFICATION MODEL
// ============================================================================

export interface LeadQualification {
  leadEventId: string
  
  // Basic info
  budget?: {
    min?: number
    max?: number
    currency: string
  }
  propertyType?: string[]
  bedrooms?: number
  urgency?: 'immediate' | '3-months' | '6-months' | '12-months' | 'researching'
  
  // Intent signals
  goldenVisaInterest: boolean
  investmentPurpose: 'primary-residence' | 'investment' | 'rental-income' | 'not-sure'
  
  // Contact info (if provided)
  name?: string
  email?: string
  phone?: string
  preferredContact: 'phone' | 'whatsapp' | 'email'
  
  // Scoring
  leadScore: number // 0-100
  qualificationLevel: 'cold' | 'warm' | 'hot' | 'qualified'
  
  // Routing
  assignedAgent?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  
  createdAt: string
}

// ============================================================================
// INGESTION LOG MODEL
// ============================================================================

export interface IngestionLog {
  id: string
  task: 'ingest_listings' | 'ingest_news' | 'ingest_legal'
  source: string
  status: 'started' | 'success' | 'failed' | 'partial'
  
  // Stats
  itemsRead: number
  itemsNew: number
  itemsUpdated: number
  itemsFailed: number
  itemsSkipped: number
  
  // Details
  errors?: string[]
  warnings?: string[]
  
  // Timing
  startedAt: string
  completedAt?: string
  duration?: number
  
  // Metadata
  metadata?: Record<string, any>
}

// ============================================================================
// SKILL DOCUMENT MODEL
// ============================================================================

export interface SkillDocument {
  id: string
  title: string
  category: 'content' | 'ux' | 'seo' | 'conversion' | 'experiment'
  
  // What was learned
  context: string
  hypothesis: string
  implementation: string
  
  // Results
  metricsBefore: Record<string, number>
  metricsAfter: Record<string, number>
  improvement: number // percentage
  confidence: 'low' | 'medium' | 'high'
  
  // Application
  appliesTo: string[] // page types, listing types, etc.
  reusablePattern: string
  
  // Status
  status: 'draft' | 'approved' | 'implemented' | 'deprecated'
  
  // Metadata
  createdAt: string
  updatedAt: string
  createdBy: 'hermes' | 'manual'
}
