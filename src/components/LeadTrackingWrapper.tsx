'use client'

import { ReactNode } from 'react'
import { usePageTracking } from '@/lib/hermes/useHermes'

interface LeadTrackingWrapperProps {
  children: ReactNode
  pageType: 'home' | 'listings' | 'listing_detail' | 'building_detail' | 'news' | 'legal' | 'about'
  pageSlug: string
  listingId?: string
}

export function LeadTrackingWrapper({ 
  children, 
  pageType, 
  pageSlug, 
  listingId 
}: LeadTrackingWrapperProps) {
  // Track page views automatically
  usePageTracking(pageType, pageSlug, { listingId })

  return <>{children}</>
}