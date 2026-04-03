/**
 * Lead Event Logging System
 * Captures and stores user interactions for lead tracking
 */

import { promises as fs } from 'fs'
import path from 'path'
import { LeadEvent, LeadEventType, LeadQualification } from '../models/hermes.types'

// Simple UUID generator for Node.js
function generateId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Storage path
const LEADS_DIR = path.join(process.cwd(), 'data', 'leads')
const EVENTS_FILE = path.join(LEADS_DIR, 'events.json')

/**
 * Log a lead event
 * Call this from the frontend when user interactions occur
 */
export async function logLeadEvent(event: Omit<LeadEvent, 'id' | 'createdAt'>): Promise<LeadEvent> {
  const fullEvent: LeadEvent = {
    ...event,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }

  try {
    // Ensure directory exists
    await fs.mkdir(LEADS_DIR, { recursive: true })

    // Read existing events
    let events: LeadEvent[] = []
    try {
      const data = await fs.readFile(EVENTS_FILE, 'utf-8')
      events = JSON.parse(data)
    } catch {
      // File doesn't exist yet
    }

    // Add new event
    events.push(fullEvent)

    // Write back (in production, consider using a database instead)
    await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf-8')

    return fullEvent
  } catch (error) {
    console.error('Failed to log lead event:', error)
    throw error
  }
}

/**
 * Convenience functions for common lead events
 * Use these from React components or API routes
 */

export async function logPageView(params: {
  pageType: LeadEvent['pageType']
  pageSlug: string
  sessionId: string
  device?: 'desktop' | 'mobile' | 'tablet'
  source?: string
  referrer?: string
  userAgent?: string
}): Promise<LeadEvent> {
  return logLeadEvent({
    type: 'page_view',
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    sessionId: params.sessionId,
    device: params.device || 'desktop',
    source: (params.source as any) || 'direct',
    referrer: params.referrer,
    userAgent: params.userAgent,
  })
}

export async function logListingView(params: {
  listingId: string
  pageSlug: string
  sessionId: string
  device?: 'desktop' | 'mobile' | 'tablet'
  source?: string
}): Promise<LeadEvent> {
  return logLeadEvent({
    type: 'listing_view',
    pageType: 'listing_detail',
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    sessionId: params.sessionId,
    device: params.device || 'desktop',
    source: (params.source as any) || 'direct',
  })
}

export async function logCtaClick(params: {
  ctaType: 'enquire' | 'whatsapp' | 'call' | 'email' | 'view' | 'save' | 'share'
  ctaLabel: string
  pageType: LeadEvent['pageType']
  pageSlug: string
  listingId?: string
  buildingId?: string
  sessionId: string
  device?: 'desktop' | 'mobile' | 'tablet'
}): Promise<LeadEvent> {
  return logLeadEvent({
    type: 'cta_click',
    ctaType: params.ctaType,
    ctaLabel: params.ctaLabel,
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    buildingId: params.buildingId,
    sessionId: params.sessionId,
    device: params.device || 'desktop',
    source: 'direct',
  })
}

export async function logWhatsAppClick(params: {
  pageType: LeadEvent['pageType']
  pageSlug: string
  listingId?: string
  sessionId: string
  device?: 'desktop' | 'mobile' | 'tablet'
}): Promise<LeadEvent> {
  return logLeadEvent({
    type: 'whatsapp_click',
    ctaType: 'whatsapp',
    ctaLabel: 'WhatsApp Contact',
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    sessionId: params.sessionId,
    device: params.device || 'desktop',
    source: 'direct',
  })
}

export async function logPhoneClick(params: {
  pageType: LeadEvent['pageType']
  pageSlug: string
  listingId?: string
  sessionId: string
  device?: 'desktop' | 'mobile' | 'tablet'
}): Promise<LeadEvent> {
  return logLeadEvent({
    type: 'phone_click',
    ctaType: 'call',
    ctaLabel: 'Call Agent',
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    sessionId: params.sessionId,
    device: params.device || 'desktop',
    source: 'direct',
  })
}

export async function logFormSubmit(params: {
  formType: 'enquiry' | 'viewing_request' | 'callback'
  pageType: LeadEvent['pageType']
  pageSlug: string
  listingId?: string
  buildingId?: string
  sessionId: string
  device?: 'desktop' | 'mobile' | 'tablet'
  formData?: Record<string, any>
}): Promise<LeadEvent> {
  return logLeadEvent({
    type: 'form_submit',
    ctaType: 'enquire',
    ctaLabel: params.formType,
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    buildingId: params.buildingId,
    sessionId: params.sessionId,
    device: params.device || 'desktop',
    source: 'direct',
  })
}

export async function logPropertySave(params: {
  listingId: string
  pageSlug: string
  sessionId: string
  device?: 'desktop' | 'mobile' | 'tablet'
}): Promise<LeadEvent> {
  return logLeadEvent({
    type: 'property_save',
    pageType: 'listing_detail',
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    sessionId: params.sessionId,
    device: params.device || 'desktop',
    source: 'direct',
  })
}

export async function logSearch(params: {
  query: string
  filters?: Record<string, string>
  resultsCount: number
  pageSlug: string
  sessionId: string
  device?: 'desktop' | 'mobile' | 'tablet'
}): Promise<LeadEvent> {
  return logLeadEvent({
    type: 'search_perform',
    searchQuery: params.query,
    filters: params.filters,
    pageType: 'listings',
    pageSlug: params.pageSlug,
    sessionId: params.sessionId,
    device: params.device || 'desktop',
    source: 'direct',
  })
}

/**
 * Get all lead events
 */
export async function getLeadEvents(): Promise<LeadEvent[]> {
  try {
    const data = await fs.readFile(EVENTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

/**
 * Get lead events by session ID
 */
export async function getLeadEventsBySession(sessionId: string): Promise<LeadEvent[]> {
  const events = await getLeadEvents()
  return events.filter(e => e.sessionId === sessionId)
}

/**
 * Get lead events by listing ID
 */
export async function getLeadEventsByListing(listingId: string): Promise<LeadEvent[]> {
  const events = await getLeadEvents()
  return events.filter(e => e.listingId === listingId)
}

/**
 * Get lead events by type
 */
export async function getLeadEventsByType(type: LeadEventType): Promise<LeadEvent[]> {
  const events = await getLeadEvents()
  return events.filter(e => e.type === type)
}

/**
 * Get lead events within a time range
 */
export async function getLeadEventsByDateRange(
  startDate: string,
  endDate: string
): Promise<LeadEvent[]> {
  const events = await getLeadEvents()
  return events.filter(e => {
    const date = new Date(e.createdAt)
    return date >= new Date(startDate) && date <= new Date(endDate)
  })
}

/**
 * Get lead performance summary
 */
export async function getLeadPerformanceSummary(): Promise<{
  totalEvents: number
  uniqueSessions: number
  eventsByType: Record<LeadEventType, number>
  topListings: Array<{ listingId: string; eventCount: number }>
  conversionRate: number // form submits / total page views
}> {
  const events = await getLeadEvents()
  
  // Count by type
  const eventsByType = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1
    return acc
  }, {} as Record<LeadEventType, number>)
  
  // Unique sessions
  const uniqueSessions = new Set(events.map(e => e.sessionId)).size
  
  // Top listings
  const listingCounts: Record<string, number> = {}
  events.forEach(e => {
    if (e.listingId) {
      listingCounts[e.listingId] = (listingCounts[e.listingId] || 0) + 1
    }
  })
  
  const topListings = Object.entries(listingCounts)
    .map(([listingId, eventCount]) => ({ listingId, eventCount }))
    .sort((a, b) => b.eventCount - a.eventCount)
    .slice(0, 10)
  
  // Conversion rate
  const pageViews = eventsByType['page_view'] || 0
  const formSubmits = eventsByType['form_submit'] || 0
  const conversionRate = pageViews > 0 ? (formSubmits / pageViews) * 100 : 0
  
  return {
    totalEvents: events.length,
    uniqueSessions,
    eventsByType,
    topListings,
    conversionRate,
  }
}

/**
 * Lead qualification helper
 * Analyze lead events to determine qualification level
 */
export function qualifyLead(events: LeadEvent[]): LeadQualification {
  // Score based on events
  let score = 0
  
  // Page views (max 20 points)
  const pageViews = events.filter(e => e.type === 'page_view').length
  score += Math.min(pageViews * 2, 20)
  
  // Listing views (max 20 points)
  const listingViews = events.filter(e => e.type === 'listing_view').length
  score += Math.min(listingViews * 5, 20)
  
  // High-intent events (max 60 points)
  const highIntentEvents = events.filter(e => 
    ['form_submit', 'whatsapp_click', 'phone_click', 'property_save'].includes(e.type)
  )
  score += highIntentEvents.length * 15
  
  // Cap at 100
  score = Math.min(score, 100)
  
  // Determine qualification level
  let qualificationLevel: LeadQualification['qualificationLevel'] = 'cold'
  if (score >= 80) qualificationLevel = 'qualified'
  else if (score >= 60) qualificationLevel = 'hot'
  else if (score >= 30) qualificationLevel = 'warm'
  
  return {
    leadEventId: events[0]?.id || '',
    leadScore: score,
    qualificationLevel,
    goldenVisaInterest: events.some(e => 
      e.searchQuery?.toLowerCase().includes('visa') || 
      e.pageSlug?.includes('golden-visa')
    ),
    investmentPurpose: 'not-sure',
    preferredContact: 'email',
    priority: score >= 60 ? 'high' : score >= 30 ? 'medium' : 'low',
    createdAt: new Date().toISOString(),
  }
}
