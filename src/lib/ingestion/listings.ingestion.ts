/**
 * Listings Ingestion Pipeline
 * Reads raw listing data, normalizes to Listing + Building models
 */

import { promises as fs } from 'fs'
import path from 'path'
import { Listing, Building, IngestionLog } from '../models/hermes.types'

// Raw listing input format (from your seed data)
export interface RawListing {
  slug: string
  title: string
  price: number
  currency: string
  bedrooms: number | null
  bathrooms: number | null
  sqft: number
  propertyType: string
  buildingSlug: string
  description: string
  images: string[]
  view?: string
  featured?: boolean
  isNew?: boolean
  sourceAgent?: string
  agentPhone?: string
  sourceUrl?: string
  createdAt?: string
}

export interface ListingsIngestionResult {
  listings: Listing[]
  buildings: Building[]
  log: IngestionLog
}

/**
 * Ingest listings from JSON source
 */
export async function ingestListings(
  sourcePath: string = 'data/listings_difc_seed.json'
): Promise<ListingsIngestionResult> {
  const log: IngestionLog = {
    id: `ingest_listings_${Date.now()}`,
    task: 'ingest_listings',
    source: sourcePath,
    status: 'started',
    itemsRead: 0,
    itemsNew: 0,
    itemsUpdated: 0,
    itemsFailed: 0,
    itemsSkipped: 0,
    startedAt: new Date().toISOString(),
  }

  try {
    // Read raw data
    const rawData = await fs.readFile(
      path.join(process.cwd(), sourcePath),
      'utf-8'
    )
    const rawListings: RawListing[] = JSON.parse(rawData)

    log.itemsRead = rawListings.length

    // Normalize listings
    const listings: Listing[] = rawListings.map((raw, index) => {
      try {
        return normalizeListing(raw)
      } catch (error) {
        log.itemsFailed++
        log.errors = log.errors || []
        log.errors.push(`Failed to normalize listing at index ${index}: ${error}`)
        return null as any
      }
    }).filter(Boolean)

    log.itemsNew = listings.length

    // Extract unique buildings
    const buildings = extractBuildings(listings)
    log.itemsUpdated = buildings.length

    // Write normalized data
    await writeNormalizedData(listings, buildings)

    // Update log
    log.status = log.itemsFailed > 0 ? 'partial' : 'success'
    log.completedAt = new Date().toISOString()
    log.duration = Date.now() - new Date(log.startedAt).getTime()

    return { listings, buildings, log }

  } catch (error) {
    log.status = 'failed'
    log.completedAt = new Date().toISOString()
    log.duration = Date.now() - new Date(log.startedAt).getTime()
    log.errors = log.errors || []
    log.errors.push(`Ingestion failed: ${error}`)
    
    throw error
  }
}

/**
 * Normalize a raw listing to the Listing model
 */
function normalizeListing(raw: RawListing): Listing {
  const now = new Date().toISOString()
  
  return {
    id: `listing_${raw.slug}`,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    price: raw.price,
    currency: raw.currency,
    pricePerSqft: Math.round(raw.price / raw.sqft),
    
    propertyType: normalizePropertyType(raw.propertyType),
    bedrooms: raw.bedrooms,
    bathrooms: raw.bathrooms,
    sqft: raw.sqft,
    view: raw.view,
    
    buildingSlug: raw.buildingSlug,
    
    images: raw.images || [],
    
    features: [], // Can be enriched later
    amenities: [], // Can be enriched later
    
    status: 'available',
    featured: raw.featured || false,
    isNew: raw.isNew || false,
    
    sourceAgent: raw.sourceAgent,
    agentPhone: raw.agentPhone || '+971562195566',
    sourceUrl: raw.sourceUrl,
    
    createdAt: raw.createdAt || now,
    updatedAt: now,
    
    hermesTags: generateHermesTags(raw),
    lastIngestedAt: now,
    enrichmentVersion: 1,
  }
}

/**
 * Normalize property type string
 */
function normalizePropertyType(type: string): 'apartment' | 'penthouse' | 'duplex' | 'townhouse' {
  const normalized = type.toLowerCase()
  if (normalized.includes('penthouse')) return 'penthouse'
  if (normalized.includes('duplex')) return 'duplex'
  if (normalized.includes('townhouse')) return 'townhouse'
  return 'apartment'
}

/**
 * Generate Hermes tags based on listing attributes
 */
function generateHermesTags(listing: RawListing): string[] {
  const tags: string[] = []
  
  // Intent tags
  if (listing.price > 10000000) tags.push('luxury', 'high-value')
  if (listing.propertyType === 'penthouse') tags.push('luxury', 'premium-view')
  if (listing.featured) tags.push('featured-content')
  if (listing.isNew) tags.push('fresh-inventory')
  
  // Transactional intent
  tags.push('transactional-buy')
  
  // Topic tags
  tags.push(listing.buildingSlug)
  tags.push(`bedrooms-${listing.bedrooms || 'studio'}`)
  
  return tags
}

/**
 * Extract unique buildings from listings
 */
function extractBuildings(listings: Listing[]): Building[] {
  const buildingMap = new Map<string, Building>()
  
  for (const listing of listings) {
    if (!buildingMap.has(listing.buildingSlug)) {
      buildingMap.set(listing.buildingSlug, {
        slug: listing.buildingSlug,
        name: formatBuildingName(listing.buildingSlug),
        description: '', // Will be enriched
        developer: 'TBD', // Will be enriched
        address: 'DIFC, Dubai',
        city: 'Dubai',
        district: 'DIFC',
        country: 'UAE',
        latitude: 0, // Will be enriched
        longitude: 0, // Will be enriched
        completionYear: 2014, // Will be enriched
        totalUnits: 0, // Will be enriched
        buildingType: 'mixed-use',
        amenities: [],
        images: [],
        featured: false,
        hermesTags: ['difc-building', 'needs-enrichment'],
        lastIngestedAt: new Date().toISOString(),
        enrichmentVersion: 0,
      })
    }
  }
  
  return Array.from(buildingMap.values())
}

/**
 * Format building slug to display name
 */
function formatBuildingName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Write normalized data to storage
 */
async function writeNormalizedData(
  listings: Listing[],
  buildings: Building[]
): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data', 'normalized')
  
  // Ensure directory exists
  await fs.mkdir(dataDir, { recursive: true })
  
  // Write listings
  await fs.writeFile(
    path.join(dataDir, 'listings.json'),
    JSON.stringify(listings, null, 2),
    'utf-8'
  )
  
  // Write buildings
  await fs.writeFile(
    path.join(dataDir, 'buildings.json'),
    JSON.stringify(buildings, null, 2),
    'utf-8'
  )
}

/**
 * Get normalized listings (for frontend use)
 */
export async function getListings(): Promise<Listing[]> {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), 'data', 'normalized', 'listings.json'),
      'utf-8'
    )
    return JSON.parse(data)
  } catch {
    return []
  }
}

/**
 * Get normalized buildings (for frontend use)
 */
export async function getBuildings(): Promise<Building[]> {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), 'data', 'normalized', 'buildings.json'),
      'utf-8'
    )
    return JSON.parse(data)
  } catch {
    return []
  }
}
