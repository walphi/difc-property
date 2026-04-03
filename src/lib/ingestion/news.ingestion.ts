/**
 * News Ingestion Pipeline
 * Reads DIFC news data, normalizes to NewsArticle model
 */

import { promises as fs } from 'fs'
import path from 'path'
import { NewsArticle, IngestionLog } from '../models/hermes.types'

// Raw news input format
export interface RawNewsArticle {
  slug: string
  title: string
  excerpt: string
  content?: string
  category: string
  tags?: string[]
  featuredImage?: string
  featured?: boolean
  publishedAt: string
  author?: string
  sourceUrl?: string
}

export interface NewsIngestionResult {
  articles: NewsArticle[]
  log: IngestionLog
}

/**
 * Ingest news from JSON source
 */
export async function ingestNews(
  sourcePath: string = 'data/news_difc_seed.json'
): Promise<NewsIngestionResult> {
  const log: IngestionLog = {
    id: `ingest_news_${Date.now()}`,
    task: 'ingest_news',
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
    const rawArticles: RawNewsArticle[] = JSON.parse(rawData)

    log.itemsRead = rawArticles.length

    // Normalize articles
    const articles: NewsArticle[] = rawArticles.map((raw, index) => {
      try {
        return normalizeNewsArticle(raw)
      } catch (error) {
        log.itemsFailed++
        log.errors = log.errors || []
        log.errors.push(`Failed to normalize article at index ${index}: ${error}`)
        return null as any
      }
    }).filter(Boolean)

    log.itemsNew = articles.length

    // Write normalized data
    await writeNormalizedNews(articles)

    // Update log
    log.status = log.itemsFailed > 0 ? 'partial' : 'success'
    log.completedAt = new Date().toISOString()
    log.duration = Date.now() - new Date(log.startedAt).getTime()

    return { articles, log }

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
 * Normalize a raw news article to the NewsArticle model
 */
function normalizeNewsArticle(raw: RawNewsArticle): NewsArticle {
  const now = new Date().toISOString()
  
  return {
    id: `news_${raw.slug}`,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    content: raw.content || raw.excerpt,
    
    category: raw.category,
    categorySlug: slugify(raw.category),
    tags: raw.tags || [],
    
    // DIFC relevance scoring
    difcRelevance: calculateDifcRelevance(raw),
    relatedBuildings: extractBuildingReferences(raw),
    relatedTopics: extractRelatedTopics(raw),
    
    featuredImage: raw.featuredImage,
    
    featured: raw.featured || false,
    isBreaking: false,
    
    publishedAt: raw.publishedAt,
    author: raw.author,
    sourceUrl: raw.sourceUrl,
    
    hermesTags: generateNewsHermesTags(raw),
    lastIngestedAt: now,
    enrichmentVersion: 1,
  }
}

/**
 * Calculate DIFC relevance score
 */
function calculateDifcRelevance(raw: RawNewsArticle): 'high' | 'medium' | 'low' {
  const text = (raw.title + ' ' + raw.excerpt).toLowerCase()
  
  // High relevance keywords
  const highKeywords = ['difc', 'dubai international financial centre', 'gate village', 'burj daman', 'index tower']
  if (highKeywords.some(kw => text.includes(kw))) return 'high'
  
  // Medium relevance keywords
  const mediumKeywords = ['dubai property', 'dubai real estate', 'dubai financial', 'dubai luxury']
  if (mediumKeywords.some(kw => text.includes(kw))) return 'medium'
  
  return 'low'
}

/**
 * Extract building references from article text
 */
function extractBuildingReferences(raw: RawNewsArticle): string[] {
  const text = (raw.title + ' ' + raw.excerpt).toLowerCase()
  const buildings: string[] = []
  
  const buildingKeywords = [
    { slug: 'burj-daman', keywords: ['burj daman', 'burj damac'] },
    { slug: 'index-tower', keywords: ['index tower'] },
    { slug: 'limestone-house', keywords: ['limestone house'] },
    { slug: 'eden-house-zaabeel', keywords: ['eden house', 'eden zaabeel'] },
    { slug: 'central-park-towers', keywords: ['central park towers', 'cpt'] },
  ]
  
  for (const building of buildingKeywords) {
    if (building.keywords.some(kw => text.includes(kw))) {
      buildings.push(building.slug)
    }
  }
  
  return buildings
}

/**
 * Extract related topics from article
 */
function extractRelatedTopics(raw: RawNewsArticle): string[] {
  const text = (raw.title + ' ' + raw.excerpt).toLowerCase()
  const topics: string[] = []
  
  const topicKeywords: Record<string, string[]> = {
    'golden-visa': ['golden visa', 'residency', 'visa'],
    'property-law': ['property law', 'real estate law', 'legal'],
    'market-trends': ['market', 'price', 'trends', 'growth'],
    'development': ['development', 'project', 'construction', 'new building'],
    'investment': ['investment', 'investor', 'roi', 'returns'],
    'luxury': ['luxury', 'penthouse', 'high-end', 'premium'],
  }
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(kw => text.includes(kw))) {
      topics.push(topic)
    }
  }
  
  return topics
}

/**
 * Generate Hermes tags for news article
 */
function generateNewsHermesTags(raw: RawNewsArticle): string[] {
  const tags: string[] = []
  
  // Content type
  tags.push('news')
  tags.push(`category-${slugify(raw.category)}`)
  
  // DIFC relevance
  const relevance = calculateDifcRelevance(raw)
  tags.push(`relevance-${relevance}`)
  
  // Featured content
  if (raw.featured) tags.push('featured-content')
  
  // Intent tags
  tags.push('informational')
  if (relevance === 'high') tags.push('high-priority')
  
  // Add explicit tags
  if (raw.tags) {
    tags.push(...raw.tags)
  }
  
  return [...new Set(tags)] // Remove duplicates
}

/**
 * Create a URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Write normalized news to storage
 */
async function writeNormalizedNews(articles: NewsArticle[]): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data', 'normalized')
  
  // Ensure directory exists
  await fs.mkdir(dataDir, { recursive: true })
  
  // Write articles
  await fs.writeFile(
    path.join(dataDir, 'news.json'),
    JSON.stringify(articles, null, 2),
    'utf-8'
  )
}

/**
 * Get normalized news articles (for frontend use)
 */
export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), 'data', 'normalized', 'news.json'),
      'utf-8'
    )
    return JSON.parse(data)
  } catch {
    return []
  }
}

/**
 * Get featured news articles
 */
export async function getFeaturedNews(): Promise<NewsArticle[]> {
  const articles = await getNewsArticles()
  return articles.filter(a => a.featured)
}

/**
 * Get news by DIFC relevance
 */
export async function getNewsByRelevance(
  relevance: 'high' | 'medium' | 'low'
): Promise<NewsArticle[]> {
  const articles = await getNewsArticles()
  return articles.filter(a => a.difcRelevance === relevance)
}
