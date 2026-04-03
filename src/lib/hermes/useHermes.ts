'use client'

import { useCallback, useEffect } from 'react'
import {
  logPageViewLocal,
  logListingViewLocal,
  logCtaClickLocal,
  logWhatsAppClickLocal,
  logPhoneClickLocal,
  logFormSubmitLocal,
  logPropertySaveLocal,
  logSearchLocal,
  getLocalLeadSummary,
} from './leadEvents.local'

/**
 * Hermes Lead Events Hook
 * React hook for logging lead events from the frontend
 * For static export - stores locally, syncs later
 */

export function useHermesLeadEvents() {
  /**
   * Log a page view
   */
  const logPageView = useCallback((params: {
    pageType: 'home' | 'listings' | 'listing_detail' | 'building_detail' | 'news' | 'legal' | 'about'
    pageSlug: string
    source?: string
    referrer?: string
  }) => {
    return logPageViewLocal(params)
  }, [])

  /**
   * Log a listing view
   */
  const logListingView = useCallback((params: {
    listingId: string
    pageSlug: string
    source?: string
  }) => {
    return logListingViewLocal(params)
  }, [])

  /**
   * Log a CTA click
   */
  const logCtaClick = useCallback((params: {
    ctaType: 'enquire' | 'whatsapp' | 'call' | 'email' | 'view' | 'save' | 'share'
    ctaLabel: string
    pageType: 'home' | 'listings' | 'listing_detail' | 'building_detail' | 'news' | 'legal' | 'about'
    pageSlug: string
    listingId?: string
    buildingId?: string
  }) => {
    return logCtaClickLocal(params)
  }, [])

  /**
   * Log WhatsApp click
   */
  const logWhatsAppClick = useCallback((params: {
    pageType: 'home' | 'listings' | 'listing_detail' | 'building_detail' | 'news' | 'legal' | 'about'
    pageSlug: string
    listingId?: string
  }) => {
    return logWhatsAppClickLocal(params)
  }, [])

  /**
   * Log phone click
   */
  const logPhoneClick = useCallback((params: {
    pageType: 'home' | 'listings' | 'listing_detail' | 'building_detail' | 'news' | 'legal' | 'about'
    pageSlug: string
    listingId?: string
  }) => {
    return logPhoneClickLocal(params)
  }, [])

  /**
   * Log form submission
   */
  const logFormSubmit = useCallback((params: {
    formType: 'enquiry' | 'viewing_request' | 'callback'
    pageType: 'home' | 'listings' | 'listing_detail' | 'building_detail' | 'news' | 'legal' | 'about'
    pageSlug: string
    listingId?: string
    buildingId?: string
    formData?: Record<string, any>
  }) => {
    return logFormSubmitLocal(params)
  }, [])

  /**
   * Log property save
   */
  const logPropertySave = useCallback((params: {
    listingId: string
    pageSlug: string
  }) => {
    return logPropertySaveLocal(params)
  }, [])

  /**
   * Log search
   */
  const logSearch = useCallback((params: {
    query: string
    filters?: Record<string, string>
    resultsCount: number
    pageSlug: string
  }) => {
    return logSearchLocal(params)
  }, [])

  /**
   * Get lead summary
   */
  const getLeadSummary = useCallback(() => {
    return getLocalLeadSummary()
  }, [])

  return {
    logPageView,
    logListingView,
    logCtaClick,
    logWhatsAppClick,
    logPhoneClick,
    logFormSubmit,
    logPropertySave,
    logSearch,
    getLeadSummary,
  }
}

/**
 * Hook to track page views automatically
 * Usage: usePageTracking('listing_detail', listing.slug)
 */
export function usePageTracking(
  pageType: 'home' | 'listings' | 'listing_detail' | 'building_detail' | 'news' | 'legal' | 'about',
  pageSlug: string,
  options?: { listingId?: string }
) {
  const { logPageView, logListingView } = useHermesLeadEvents()

  // Log page view on mount
  useEffect(() => {
    const trackPage = async () => {
      await logPageView({ pageType, pageSlug })
      
      // If it's a listing detail page, also log the listing view
      if (pageType === 'listing_detail' && options?.listingId) {
        await logListingView({ 
          listingId: options.listingId, 
          pageSlug 
        })
      }
    }
    
    trackPage()
  }, [pageType, pageSlug, options?.listingId, logPageView, logListingView])
}
