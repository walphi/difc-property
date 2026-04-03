/**
 * Client-side Lead Event Storage
 * For static export - stores events in localStorage for later sync
 */

import { LeadEvent, LeadEventType } from '../models/hermes.types'

const STORAGE_KEY = 'difc_lead_events'
const SESSION_KEY = 'difc_session_id'

// Generate ID
function generateId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr-session'
  
  let sessionId = sessionStorage.getItem(SESSION_KEY)
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem(SESSION_KEY, sessionId)
  }
  return sessionId
}

// Detect device
function getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop'
  
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/**
 * Store lead event locally (for static export sites)
 */
export function storeLeadEventLocal(event: Omit<LeadEvent, 'id' | 'createdAt'>): LeadEvent {
  const fullEvent: LeadEvent = {
    ...event,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }

  try {
    // Get existing events
    const existing = localStorage.getItem(STORAGE_KEY)
    const events: LeadEvent[] = existing ? JSON.parse(existing) : []
    
    // Add new event
    events.push(fullEvent)
    
    // Store back (limit to last 100 events to prevent storage issues)
    const trimmed = events.slice(-100)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
    
    // Also log to console for debugging
    console.log('[Hermes Lead Event]', fullEvent)
    
    return fullEvent
  } catch (error) {
    console.error('Failed to store lead event:', error)
    return fullEvent
  }
}

/**
 * Convenience functions for common events
 */

export function logPageViewLocal(params: {
  pageType: LeadEvent['pageType']
  pageSlug: string
  source?: string
  referrer?: string
}): LeadEvent {
  return storeLeadEventLocal({
    type: 'page_view',
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    sessionId: getSessionId(),
    device: getDeviceType(),
    source: (params.source as any) || 'direct',
    referrer: params.referrer,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
  })
}

export function logListingViewLocal(params: {
  listingId: string
  pageSlug: string
  source?: string
}): LeadEvent {
  return storeLeadEventLocal({
    type: 'listing_view',
    pageType: 'listing_detail',
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    sessionId: getSessionId(),
    device: getDeviceType(),
    source: (params.source as any) || 'direct',
  })
}

export function logCtaClickLocal(params: {
  ctaType: 'enquire' | 'whatsapp' | 'call' | 'email' | 'view' | 'save' | 'share'
  ctaLabel: string
  pageType: LeadEvent['pageType']
  pageSlug: string
  listingId?: string
  buildingId?: string
}): LeadEvent {
  return storeLeadEventLocal({
    type: 'cta_click',
    ctaType: params.ctaType,
    ctaLabel: params.ctaLabel,
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    buildingId: params.buildingId,
    sessionId: getSessionId(),
    device: getDeviceType(),
    source: 'direct',
  })
}

export function logWhatsAppClickLocal(params: {
  pageType: LeadEvent['pageType']
  pageSlug: string
  listingId?: string
}): LeadEvent {
  return storeLeadEventLocal({
    type: 'whatsapp_click',
    ctaType: 'whatsapp',
    ctaLabel: 'WhatsApp Contact',
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    sessionId: getSessionId(),
    device: getDeviceType(),
    source: 'direct',
  })
}

export function logPhoneClickLocal(params: {
  pageType: LeadEvent['pageType']
  pageSlug: string
  listingId?: string
}): LeadEvent {
  return storeLeadEventLocal({
    type: 'phone_click',
    ctaType: 'call',
    ctaLabel: 'Call Agent',
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    sessionId: getSessionId(),
    device: getDeviceType(),
    source: 'direct',
  })
}

export function logFormSubmitLocal(params: {
  formType: 'enquiry' | 'viewing_request' | 'callback'
  pageType: LeadEvent['pageType']
  pageSlug: string
  listingId?: string
  buildingId?: string
  formData?: Record<string, any>
}): LeadEvent {
  return storeLeadEventLocal({
    type: 'form_submit',
    ctaType: 'enquire',
    ctaLabel: params.formType,
    pageType: params.pageType,
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    buildingId: params.buildingId,
    sessionId: getSessionId(),
    device: getDeviceType(),
    source: 'direct',
  })
}

export function logPropertySaveLocal(params: {
  listingId: string
  pageSlug: string
}): LeadEvent {
  return storeLeadEventLocal({
    type: 'property_save',
    pageType: 'listing_detail',
    pageSlug: params.pageSlug,
    listingId: params.listingId,
    sessionId: getSessionId(),
    device: getDeviceType(),
    source: 'direct',
  })
}

export function logSearchLocal(params: {
  query: string
  filters?: Record<string, string>
  resultsCount: number
  pageSlug: string
}): LeadEvent {
  return storeLeadEventLocal({
    type: 'search_perform',
    searchQuery: params.query,
    filters: params.filters,
    pageType: 'listings',
    pageSlug: params.pageSlug,
    sessionId: getSessionId(),
    device: getDeviceType(),
    source: 'direct',
  })
}

/**
 * Get all stored lead events
 */
export function getStoredLeadEvents(): LeadEvent[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

/**
 * Get lead summary from local storage
 */
export function getLocalLeadSummary(): {
  totalEvents: number
  uniqueSessions: number
  eventsByType: Partial<Record<LeadEventType, number>>
  topListings: Array<{ listingId: string; eventCount: number }>
} {
  const events = getStoredLeadEvents()
  
  // Count by type
  const eventsByType = events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1
    return acc
  }, {} as Partial<Record<LeadEventType, number>>)
  
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
  
  return {
    totalEvents: events.length,
    uniqueSessions,
    eventsByType,
    topListings,
  }
}

/**
 * Clear stored events (after sync)
 */
export function clearStoredLeadEvents(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Export events for sync to backend
 */
export function exportLeadEventsForSync(): LeadEvent[] {
  const events = getStoredLeadEvents()
  // Mark as exported
  const marked = events.map(e => ({ ...e, processedAt: new Date().toISOString() }))
  return marked
}
