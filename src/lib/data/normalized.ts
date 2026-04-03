/**
 * Normalized Data Loader
 * Loads data from /data/normalized/ directory
 * Provides type-safe access to Hermes-normalized data
 */

import { promises as fs } from 'fs'
import path from 'path'
import type { Listing, Building, NewsArticle, LegalContent, FAQ } from '../models/hermes.types'

const DATA_DIR = path.join(process.cwd(), 'data', 'normalized')

/**
 * Load all listings from normalized data
 */
export async function loadListings(): Promise<Listing[]> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'listings.json'), 'utf-8')
    return JSON.parse(data) as Listing[]
  } catch (error) {
    console.error('Failed to load listings:', error)
    return []
  }
}

/**
 * Load a single listing by slug
 */
export async function loadListingBySlug(slug: string): Promise<Listing | null> {
  const listings = await loadListings()
  return listings.find(l => l.slug === slug) || null
}

/**
 * Load listings by building
 */
export async function loadListingsByBuilding(buildingSlug: string): Promise<Listing[]> {
  const listings = await loadListings()
  return listings.filter(l => l.buildingSlug === buildingSlug)
}

/**
 * Load featured listings
 */
export async function loadFeaturedListings(limit?: number): Promise<Listing[]> {
  const listings = await loadListings()
  const featured = listings.filter(l => l.featured)
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Load new listings
 */
export async function loadNewListings(limit?: number): Promise<Listing[]> {
  const listings = await loadListings()
  const newListings = listings.filter(l => l.isNew)
  return limit ? newListings.slice(0, limit) : newListings
}

/**
 * Load all buildings
 */
export async function loadBuildings(): Promise<Building[]> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'buildings.json'), 'utf-8')
    return JSON.parse(data) as Building[]
  } catch (error) {
    console.error('Failed to load buildings:', error)
    return []
  }
}

/**
 * Load a single building by slug
 */
export async function loadBuildingBySlug(slug: string): Promise<Building | null> {
  const buildings = await loadBuildings()
  return buildings.find(b => b.slug === slug) || null
}

/**
 * Load featured buildings
 */
export async function loadFeaturedBuildings(limit?: number): Promise<Building[]> {
  const buildings = await loadBuildings()
  const featured = buildings.filter(b => b.featured)
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Load all news articles
 */
export async function loadNews(): Promise<NewsArticle[]> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'news.json'), 'utf-8')
    return JSON.parse(data) as NewsArticle[]
  } catch (error) {
    console.error('Failed to load news:', error)
    return []
  }
}

/**
 * Load a single news article by slug
 */
export async function loadNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const articles = await loadNews()
  return articles.find(a => a.slug === slug) || null
}

/**
 * Load featured news
 */
export async function loadFeaturedNews(limit?: number): Promise<NewsArticle[]> {
  const articles = await loadNews()
  const featured = articles.filter(a => a.featured)
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Load news by category
 */
export async function loadNewsByCategory(category: string): Promise<NewsArticle[]> {
  const articles = await loadNews()
  return articles.filter(a => a.category.toLowerCase() === category.toLowerCase())
}

/**
 * Load high DIFC relevance news
 */
export async function loadHighRelevanceNews(limit?: number): Promise<NewsArticle[]> {
  const articles = await loadNews()
  const relevant = articles.filter(a => a.difcRelevance === 'high')
  return limit ? relevant.slice(0, limit) : relevant
}

/**
 * Load all legal content
 */
export async function loadLegalContent(): Promise<LegalContent[]> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'legal.json'), 'utf-8')
    return JSON.parse(data) as LegalContent[]
  } catch (error) {
    console.error('Failed to load legal content:', error)
    return []
  }
}

/**
 * Load legal content by slug
 */
export async function loadLegalContentBySlug(slug: string): Promise<LegalContent | null> {
  const content = await loadLegalContent()
  return content.find(c => c.slug === slug) || null
}

/**
 * Load legal content by category
 */
export async function loadLegalContentByCategory(category: string): Promise<LegalContent[]> {
  const content = await loadLegalContent()
  return content.filter(c => c.category === category)
}

/**
 * Load all FAQs
 */
export async function loadFAQs(): Promise<FAQ[]> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'faqs.json'), 'utf-8')
    return JSON.parse(data) as FAQ[]
  } catch (error) {
    console.error('Failed to load FAQs:', error)
    return []
  }
}

/**
 * Load FAQs by category
 */
export async function loadFAQsByCategory(category: string): Promise<FAQ[]> {
  const faqs = await loadFAQs()
  return faqs.filter(f => f.category === category)
}

/**
 * Load FAQs for specific page
 */
export async function loadFAQsForPage(page: string, limit?: number): Promise<FAQ[]> {
  const faqs = await loadFAQs()
  const pageFaqs = faqs.filter(f => f.displayOnPages?.includes(page))
    .sort((a, b) => a.priority - b.priority)
  return limit ? pageFaqs.slice(0, limit) : pageFaqs
}

/**
 * Load high priority FAQs
 */
export async function loadHighPriorityFAQs(limit = 5): Promise<FAQ[]> {
  const faqs = await loadFAQs()
  return faqs
    .filter(f => f.priority <= 2)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit)
}

/**
 * Get price statistics for DIFC properties
 */
export async function getPriceStatistics() {
  const listings = await loadListings()
  
  if (listings.length === 0) {
    return null
  }

  const prices = listings.map(l => l.price)
  const sqft = listings.map(l => l.sqft)
  const pricePerSqft = listings.map(l => l.pricePerSqft || l.price / l.sqft)

  return {
    count: listings.length,
    averagePrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    averageSqft: Math.round(sqft.reduce((a, b) => a + b, 0) / sqft.length),
    averagePricePerSqft: Math.round(pricePerSqft.reduce((a, b) => a + b, 0) / pricePerSqft.length),
    minPricePerSqft: Math.min(...pricePerSqft),
    maxPricePerSqft: Math.max(...pricePerSqft),
  }
}

/**
 * Get listings grouped by building with stats
 */
export async function getListingsByBuildingStats() {
  const listings = await loadListings()
  const buildings = await loadBuildings()
  
  const stats = buildings.map(building => {
    const buildingListings = listings.filter(l => l.buildingSlug === building.slug)
    if (buildingListings.length === 0) return null
    
    const prices = buildingListings.map(l => l.price)
    const pricePerSqft = buildingListings.map(l => l.pricePerSqft || l.price / l.sqft)
    
    return {
      building,
      count: buildingListings.length,
      averagePrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      averagePricePerSqft: Math.round(pricePerSqft.reduce((a, b) => a + b, 0) / pricePerSqft.length),
      listings: buildingListings,
    }
  }).filter(Boolean)
  
  return stats
}

/**
 * Get market summary data
 */
export async function getMarketSummary() {
  const [stats, buildings, news] = await Promise.all([
    getPriceStatistics(),
    loadBuildings(),
    loadNews(),
  ])

  const marketNews = news.filter(n => n.category === 'Market Insights' || n.hermesTags?.includes('market-insights'))
  
  return {
    stats,
    totalBuildings: buildings.length,
    featuredBuildings: buildings.filter(b => b.featured).length,
    recentNews: marketNews.slice(0, 3),
  }
}