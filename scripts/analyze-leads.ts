/**
 * Lead Analysis Script
 * 
 * Analyzes lead event data to generate optimization recommendations.
 * Outputs:
 * - SkillDocuments to /hermes/skills/
 * - Recommendations JSON to /data/recommendations/
 * 
 * Run via: npm run hermes:analyze-leads
 */

import { promises as fs } from 'fs'
import path from 'path'
import type { LeadEvent, LeadQualification, SkillDocument } from '../src/lib/models/hermes.types'

// Paths
const LEADS_DIR = path.join(process.cwd(), 'data', 'leads')
const EVENTS_FILE = path.join(LEADS_DIR, 'events.json')
const QUALIFICATIONS_FILE = path.join(LEADS_DIR, 'qualifications.json')
const SKILLS_DIR = path.join(process.cwd(), 'hermes', 'skills')
const RECOMMENDATIONS_DIR = path.join(process.cwd(), 'data', 'recommendations')

// Types for recommendations
interface CTARecommendation {
  id: string
  type: string
  currentLabel: string
  proposedLabel: string
  rationale: string
  priority: 'high' | 'medium' | 'low'
  expectedImpact: string
  confidence: number
  affectedPages: string[]
  implementation: string
}

interface FAQRecommendation {
  id: string
  pageType: string
  currentFaqs: string[]
  proposedAdditions: string[]
  proposedRemovals: string[]
  reordering?: number[]
  rationale: string
  priority: 'high' | 'medium' | 'low'
  confidence: number
}

interface WhyPropertyRecommendation {
  id: string
  listingId?: string
  buildingSlug?: string
  currentBullets: string[]
  proposedBullets: string[]
  rationale: string
  priority: 'high' | 'medium' | 'low'
  confidence: number
}

interface Experiment {
  id: string
  name: string
  description: string
  targetPages: string[]
  hypothesis: string
  successMetric: string
  duration: string
  priority: 'high' | 'medium' | 'low'
}

interface LeadAnalysisOutput {
  generatedAt: string
  analysisPeriod: {
    start: string
    end: string
    eventCount: number
    uniqueSessions: number
    daysAnalyzed: number
  }
  summary: {
    totalEvents: number
    totalCTAClicks: number
    conversionRate: number
    topPerformingPages: string[]
    underperformingPages: string[]
  }
  ctaRecommendations: CTARecommendation[]
  faqRecommendations: FAQRecommendation[]
  whyPropertyRecommendations: WhyPropertyRecommendation[]
  experiments: Experiment[]
  generatedSkillDocuments: string[]
}

/**
 * Load lead events from storage
 */
async function loadLeadEvents(): Promise<LeadEvent[]> {
  try {
    const data = await fs.readFile(EVENTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

/**
 * Load lead qualifications from storage
 */
async function loadLeadQualifications(): Promise<LeadQualification[]> {
  try {
    const data = await fs.readFile(QUALIFICATIONS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

/**
 * Analyze CTA performance patterns
 */
function analyzeCTAPerformance(events: LeadEvent[]) {
  // Group by CTA type
  const ctaEvents = events.filter(e => e.type === 'cta_click' || e.type === 'whatsapp_click' || e.type === 'phone_click')
  
  const byType = ctaEvents.reduce((acc, event) => {
    const type = event.ctaType || 'unknown'
    if (!acc[type]) {
      acc[type] = { events: [], count: 0 }
    }
    acc[type].events.push(event)
    acc[type].count++
    return acc
  }, {} as Record<string, { events: LeadEvent[]; count: number }>)

  // Calculate click rates by page type
  const pageViews = events.filter(e => e.type === 'page_view')
  const pageViewCounts = pageViews.reduce((acc, e) => {
    acc[e.pageType] = (acc[e.pageType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const ctaCounts = ctaEvents.reduce((acc, e) => {
    acc[e.pageType] = (acc[e.pageType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const conversionRates = Object.keys(pageViewCounts).reduce((acc, pageType) => {
    const views = pageViewCounts[pageType] || 1
    const ctas = ctaCounts[pageType] || 0
    acc[pageType] = (ctas / views) * 100
    return acc
  }, {} as Record<string, number>)

  return {
    byType,
    conversionRates,
    totalCTAs: ctaEvents.length,
    totalViews: pageViews.length,
    overallConversion: (ctaEvents.length / Math.max(pageViews.length, 1)) * 100,
  }
}

/**
 * Generate CTA recommendations based on analysis
 */
function generateCTARecommendations(events: LeadEvent[]): CTARecommendation[] {
  const ctaAnalysis = analyzeCTAPerformance(events)
  const recommendations: CTARecommendation[] = []

  // Check if we have enough data
  if (events.length < 10) {
    return [{
      id: 'insufficient-data',
      type: 'general',
      currentLabel: 'N/A',
      proposedLabel: 'Collect more lead data',
      rationale: `Only ${events.length} events recorded. Need minimum 100 events for reliable recommendations.`,
      priority: 'high',
      expectedImpact: 'Enable data-driven optimization',
      confidence: 1,
      affectedPages: ['all'],
      implementation: 'Ensure LeadTrackingWrapper is active on all pages and CTAs have proper data-cta attributes'
    }]
  }

  // Analyze WhatsApp vs Phone performance
  const whatsappEvents = events.filter(e => e.ctaType === 'whatsapp' || e.type === 'whatsapp_click')
  const phoneEvents = events.filter(e => e.ctaType === 'call' || e.type === 'phone_click')

  if (whatsappEvents.length > phoneEvents.length * 1.5) {
    recommendations.push({
      id: 'cta-whatsapp-priority',
      type: 'whatsapp',
      currentLabel: 'WhatsApp',
      proposedLabel: 'Get Details on WhatsApp',
      rationale: `WhatsApp CTAs have ${Math.round((whatsappEvents.length / Math.max(phoneEvents.length, 1)))}x more clicks than phone CTAs. Users prefer messaging over calling. More descriptive label may improve clarity and conversion.`,
      priority: 'high',
      expectedImpact: '15-20% increase in WhatsApp enquiries',
      confidence: Math.min(0.9, whatsappEvents.length / 50),
      affectedPages: ['listing_detail', 'home', 'prices', 'golden-visa', 'law'],
      implementation: 'Update WhatsApp CTA labels across all pages. Use "Get Details on WhatsApp" or "Chat on WhatsApp" instead of generic "WhatsApp"'
    })
  }

  // Analyze mobile vs desktop
  const mobileCTAs = events.filter(e => 
    (e.ctaType === 'whatsapp' || e.ctaType === 'call') && e.device === 'mobile'
  )
  const desktopCTAs = events.filter(e => 
    (e.ctaType === 'whatsapp' || e.ctaType === 'call') && e.device === 'desktop'
  )

  if (mobileCTAs.length > desktopCTAs.length * 2) {
    recommendations.push({
      id: 'cta-mobile-optimization',
      type: 'mobile',
      currentLabel: 'Standard CTAs',
      proposedLabel: 'Mobile-optimized sticky CTAs',
      rationale: `${Math.round((mobileCTAs.length / events.filter(e => e.device === 'mobile').length) * 100)}% of mobile users engage with CTAs, but current placement may not be optimal. Sticky bottom bar on mobile can improve accessibility.`,
      priority: 'medium',
      expectedImpact: '20-30% increase in mobile conversions',
      confidence: Math.min(0.8, mobileCTAs.length / 30),
      affectedPages: ['listing_detail'],
      implementation: 'Add sticky mobile CTA bar at bottom of screen on listing detail pages with primary WhatsApp and secondary Call buttons'
    })
  }

  // Check for "Arrange Viewing" vs "Contact Agent"
  const enquireEvents = events.filter(e => e.ctaType === 'enquire')
  if (enquireEvents.length > 0) {
    recommendations.push({
      id: 'cta-viewing-focus',
      type: 'enquire',
      currentLabel: 'Contact Agent / Enquire',
      proposedLabel: 'Arrange Viewing',
      rationale: 'High-intent users want to see properties in person. "Arrange Viewing" is more specific and actionable than generic "Contact" or "Enquire".',
      priority: 'medium',
      expectedImpact: '10-15% increase in high-intent enquiries',
      confidence: 0.7,
      affectedPages: ['listing_detail'],
      implementation: 'Update primary CTA button on listing detail pages to "Arrange Viewing" with calendar icon'
    })
  }

  return recommendations
}

/**
 * Generate FAQ recommendations
 */
function generateFAQRecommendations(events: LeadEvent[]): FAQRecommendation[] {
  const recommendations: FAQRecommendation[] = []

  // Analyze page context for FAQ opportunities
  const listingDetailEvents = events.filter(e => e.pageType === 'listing_detail')
  const highValueViews = listingDetailEvents.filter(e => 
    e.listingId && (e.listingId.includes('penthouse') || e.listingId.includes('eden-house'))
  )

  if (highValueViews.length > 5) {
    recommendations.push({
      id: 'faq-golden-visa-listing',
      pageType: 'listing_detail',
      currentFaqs: ['Price FAQ', 'Viewing FAQ'],
      proposedAdditions: ['Golden Visa Eligibility FAQ', 'Investment Returns FAQ'],
      proposedRemovals: [],
      rationale: `High-value listings (${highValueViews.length} views) attract investors interested in Golden Visa and ROI. Adding these FAQs addresses key investor concerns upfront.`,
      priority: 'high',
      confidence: Math.min(0.85, highValueViews.length / 20),
    })
  }

  // Check golden visa page engagement
  const goldenVisaEvents = events.filter(e => e.pageType === 'legal' && e.pageSlug.includes('golden-visa'))
  if (goldenVisaEvents.length > 10) {
    recommendations.push({
      id: 'faq-qualifying-properties',
      pageType: 'golden-visa',
      currentFaqs: ['Requirements FAQ', 'Application Process FAQ'],
      proposedAdditions: ['Which Properties Qualify FAQ', 'Timeline FAQ'],
      proposedRemovals: [],
      rationale: 'Users on Golden Visa page need to know which specific properties meet the AED 2M threshold. Linking qualifying properties directly addresses this.',
      priority: 'medium',
      confidence: Math.min(0.8, goldenVisaEvents.length / 25),
    })
  }

  return recommendations
}

/**
 * Generate "Why This Property" recommendations
 */
function generateWhyPropertyRecommendations(events: LeadEvent[]): WhyPropertyRecommendation[] {
  const recommendations: WhyPropertyRecommendation[] = []

  // Analyze building-specific engagement
  const burjDamanEvents = events.filter(e => e.listingId?.includes('burj-daman'))
  if (burjDamanEvents.length > 5) {
    recommendations.push({
      id: 'why-burj-daman',
      buildingSlug: 'burj-daman',
      currentBullets: ['Featured listing', 'Prime location', 'Golden Visa eligible'],
      proposedBullets: [
        'Direct Gate Village access - Dubai\'s premier dining & art district',
        'Panoramic Zabeel Park and Dubai skyline views',
        'AED 6.5M+ investments qualify for 10-year UAE Golden Visa',
        'Premium 65-storey tower with world-class amenities'
      ],
      rationale: 'Specific lifestyle benefits and exact Golden Visa threshold drive more engagement than generic benefits. Gate Village access is a key differentiator for Burj Daman.',
      priority: 'medium',
      confidence: 0.75,
    })
  }

  // Analyze Eden House (ultra-luxury) engagement
  const edenHouseEvents = events.filter(e => e.listingId?.includes('eden-house'))
  if (edenHouseEvents.length > 3) {
    recommendations.push({
      id: 'why-eden-house',
      buildingSlug: 'eden-house-zaabeel',
      currentBullets: ['New development', 'Luxury finishes'],
      proposedBullets: [
        'Zaabeel District\'s newest ultra-luxury development (2024)',
        'Full panoramic DIFC and Burj Khalifa views',
        'Private cinema, infinity pool, and spa amenities',
        'Smart home systems and bespoke interiors'
      ],
      rationale: 'Ultra-luxury buyers respond to specific amenity details and new development status. Panoramic views and bespoke features are key selling points.',
      priority: 'medium',
      confidence: 0.7,
    })
  }

  return recommendations
}

/**
 * Generate experiment proposals
 */
function generateExperiments(events: LeadEvent[]): Experiment[] {
  const experiments: Experiment[] = []

  if (events.length >= 50) {
    experiments.push({
      id: 'exp-whatsapp-label',
      name: 'WhatsApp CTA Label Optimization',
      description: 'Test "Get Details on WhatsApp" vs "WhatsApp" labels across listing detail pages',
      targetPages: ['listing_detail'],
      hypothesis: 'More descriptive WhatsApp CTA label will increase click-through rate by 15%',
      successMetric: 'WhatsApp CTA click rate',
      duration: '2 weeks',
      priority: 'high',
    })

    experiments.push({
      id: 'exp-faq-placement',
      name: 'FAQ Placement on Listing Pages',
      description: 'Test FAQ placement: above similar properties vs below enquiry form',
      targetPages: ['listing_detail'],
      hypothesis: 'FAQs above the fold will increase time on page and lead quality',
      successMetric: 'Time on page and CTA click rate',
      duration: '3 weeks',
      priority: 'medium',
    })

    experiments.push({
      id: 'exp-golden-visa-cta',
      name: 'Golden Visa CTA on Qualifying Listings',
      description: 'Add explicit "Golden Visa Eligible" badge/CTA on properties >AED 2M',
      targetPages: ['listing_detail'],
      hypothesis: 'Explicit Golden Visa messaging will increase enquiries on high-value properties by 20%',
      successMetric: 'CTA click rate on AED 2M+ properties',
      duration: '2 weeks',
      priority: 'high',
    })
  }

  return experiments
}

/**
 * Generate SkillDocument from validated pattern
 */
function generateSkillDocument(
  title: string,
  context: string,
  hypothesis: string,
  implementation: string,
  confidence: 'low' | 'medium' | 'high',
  category: SkillDocument['category'] = 'conversion'
): SkillDocument {
  const id = `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  return {
    id,
    title,
    category,
    context,
    hypothesis,
    implementation,
    metricsBefore: {},
    metricsAfter: {},
    improvement: 0,
    confidence,
    appliesTo: ['listing_detail', 'home'],
    reusablePattern: hypothesis,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'hermes',
  }
}

/**
 * Save skill document to disk
 */
async function saveSkillDocument(doc: SkillDocument): Promise<string> {
  await fs.mkdir(path.join(SKILLS_DIR, 'analyze-leads'), { recursive: true })
  
  const filename = `${doc.id}.md`
  const filepath = path.join(SKILLS_DIR, 'analyze-leads', filename)
  
  const content = `# ${doc.title}

**ID:** ${doc.id}  
**Category:** ${doc.category}  
**Status:** ${doc.status}  
**Confidence:** ${doc.confidence}  
**Created:** ${doc.createdAt}

## Context

${doc.context}

## Hypothesis

${doc.hypothesis}

## Implementation

${doc.implementation}

## Metrics

- **Before:** ${JSON.stringify(doc.metricsBefore)}
- **After:** ${JSON.stringify(doc.metricsAfter)}
- **Improvement:** ${doc.improvement}%

## Applies To

${doc.appliesTo.map(a => `- ${a}`).join('\n')}

## Reusable Pattern

${doc.reusablePattern}

---

*Generated by Hermes analyze_leads_and_propose_changes skill*
`

  await fs.writeFile(filepath, content, 'utf-8')
  return filepath
}

/**
 * Main analysis function
 */
async function analyzeLeads(): Promise<LeadAnalysisOutput> {
  console.log('🔍 Starting lead analysis...')
  
  // Load data
  const events = await loadLeadEvents()
  const qualifications = await loadLeadQualifications()
  
  console.log(`📊 Loaded ${events.length} events, ${qualifications.length} qualifications`)
  
  // Calculate analysis period
  const dates = events.map(e => new Date(e.createdAt)).sort((a, b) => a.getTime() - b.getTime())
  const startDate = dates[0] || new Date()
  const endDate = dates[dates.length - 1] || new Date()
  const daysAnalyzed = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
  
  // Get unique sessions
  const uniqueSessions = new Set(events.map(e => e.sessionId)).size
  
  // Generate all recommendations
  const ctaRecommendations = generateCTARecommendations(events)
  const faqRecommendations = generateFAQRecommendations(events)
  const whyPropertyRecommendations = generateWhyPropertyRecommendations(events)
  const experiments = generateExperiments(events)
  
  // Calculate summary stats
  const ctaEvents = events.filter(e => 
    e.type === 'cta_click' || e.type === 'whatsapp_click' || e.type === 'phone_click'
  )
  const pageViews = events.filter(e => e.type === 'page_view')
  
  // Analyze top and underperforming pages
  const pageViewCounts = pageViews.reduce((acc, e) => {
    acc[e.pageType] = (acc[e.pageType] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const ctaCounts = ctaEvents.reduce((acc, e) => {
    acc[e.pageType] = (acc[e.pageType] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const pageConversionRates = Object.keys(pageViewCounts).map(pageType => ({
    pageType,
    rate: ((ctaCounts[pageType] || 0) / pageViewCounts[pageType]) * 100,
  })).sort((a, b) => b.rate - a.rate)
  
  const topPerformingPages = pageConversionRates.slice(0, 3).map(p => p.pageType)
  const underperformingPages = pageConversionRates.slice(-3).map(p => p.pageType)
  
  // Generate skill documents for high-confidence recommendations
  const generatedSkillDocs: string[] = []
  
  for (const rec of ctaRecommendations.filter(r => r.confidence > 0.7)) {
    const doc = generateSkillDocument(
      `CTA Optimization: ${rec.type}`,
      `Analysis of ${events.length} lead events shows ${rec.rationale}`,
      rec.rationale,
      rec.implementation,
      rec.priority === 'high' ? 'high' : 'medium',
      'conversion'
    )
    const filepath = await saveSkillDocument(doc)
    generatedSkillDocs.push(filepath)
  }
  
  for (const rec of faqRecommendations.filter(r => r.confidence > 0.7)) {
    const doc = generateSkillDocument(
      `FAQ Optimization: ${rec.pageType}`,
      `FAQ engagement analysis for ${rec.pageType} pages: ${rec.rationale}`,
      rec.rationale,
      `Add FAQs: ${rec.proposedAdditions.join(', ')}`,
      rec.priority === 'high' ? 'high' : 'medium',
      'content'
    )
    const filepath = await saveSkillDocument(doc)
    generatedSkillDocs.push(filepath)
  }
  
  // Build output
  const output: LeadAnalysisOutput = {
    generatedAt: new Date().toISOString(),
    analysisPeriod: {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      eventCount: events.length,
      uniqueSessions,
      daysAnalyzed,
    },
    summary: {
      totalEvents: events.length,
      totalCTAClicks: ctaEvents.length,
      conversionRate: (ctaEvents.length / Math.max(pageViews.length, 1)) * 100,
      topPerformingPages,
      underperformingPages,
    },
    ctaRecommendations,
    faqRecommendations,
    whyPropertyRecommendations,
    experiments,
    generatedSkillDocuments: generatedSkillDocs,
  }
  
  // Save recommendations to disk
  await fs.mkdir(RECOMMENDATIONS_DIR, { recursive: true })
  const timestamp = new Date().toISOString().split('T')[0]
  const recFile = path.join(RECOMMENDATIONS_DIR, `recommendations-${timestamp}.json`)
  await fs.writeFile(recFile, JSON.stringify(output, null, 2), 'utf-8')
  
  // Also save as latest
  const latestFile = path.join(RECOMMENDATIONS_DIR, 'latest.json')
  await fs.writeFile(latestFile, JSON.stringify(output, null, 2), 'utf-8')
  
  return output
}

/**
 * CLI entry point
 */
async function main() {
  try {
    console.log('🚀 Hermes Lead Analysis')
    console.log('======================\n')
    
    const output = await analyzeLeads()
    
    console.log('\n✅ Analysis complete!')
    console.log(`\n📈 Summary:`)
    console.log(`  • Total events: ${output.summary.totalEvents}`)
    console.log(`  • Unique sessions: ${output.analysisPeriod.uniqueSessions}`)
    console.log(`  • Days analyzed: ${output.analysisPeriod.daysAnalyzed}`)
    console.log(`  • Conversion rate: ${output.summary.conversionRate.toFixed(2)}%`)
    console.log(`  • Top pages: ${output.summary.topPerformingPages.join(', ')}`)
    console.log(`  • Underperforming: ${output.summary.underperformingPages.join(', ')}`)
    
    console.log(`\n💡 Recommendations generated:`)
    console.log(`  • CTA recommendations: ${output.ctaRecommendations.length}`)
    console.log(`  • FAQ recommendations: ${output.faqRecommendations.length}`)
    console.log(`  • Why Property recommendations: ${output.whyPropertyRecommendations.length}`)
    console.log(`  • Proposed experiments: ${output.experiments.length}`)
    
    console.log(`\n📝 Skill documents created: ${output.generatedSkillDocuments.length}`)
    output.generatedSkillDocuments.forEach(doc => {
      console.log(`  • ${path.basename(doc)}`)
    })
    
    console.log(`\n💾 Output files:`)
    console.log(`  • /data/recommendations/latest.json`)
    console.log(`  • /data/recommendations/recommendations-${output.generatedAt.split('T')[0]}.json`)
    
    if (output.ctaRecommendations.length > 0) {
      console.log(`\n🎯 Top recommendation:`)
      const topRec = output.ctaRecommendations[0]
      console.log(`  Priority: ${topRec.priority}`)
      console.log(`  Type: ${topRec.type}`)
      console.log(`  Change: "${topRec.currentLabel}" → "${topRec.proposedLabel}"`)
      console.log(`  Expected impact: ${topRec.expectedImpact}`)
    }
    
    console.log('\n✨ Analysis complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Analysis failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export { analyzeLeads, generateCTARecommendations, generateFAQRecommendations }
export type { LeadAnalysisOutput, CTARecommendation, FAQRecommendation }