# Hermes Skill: analyze_leads_and_propose_changes

## Purpose

Analyze lead event data and user behavior patterns to generate actionable recommendations for improving conversion rates, CTA performance, and overall lead generation effectiveness on difc.property.

## Input

- LeadEvent records from `/data/leads/events.json`
- LeadQualification data (implied from events)
- Current page structures and CTAs
- Historical performance data (if available)

## Output

1. **SkillDocuments** → `/hermes/skills/` directory
   - Markdown summaries of what patterns work
   - Before/after metrics when available
   - Reusable patterns for future optimization

2. **Recommendations JSON** → `/data/recommendations/`
   - CTA label and placement changes
   - FAQ block recommendations
   - "Why this property" section improvements
   - Priority scores and expected impact

## Analysis Dimensions

### 1. CTA Performance Analysis

Track and analyze:
- **Click rates by CTA type**: enquire, whatsapp, call, email, view
- **Placement effectiveness**: hero, sidebar, inline, sticky
- **Label optimization**: Which action words drive more clicks ("Call Now" vs "Speak to Agent")
- **Context sensitivity**: Do CTAs perform better on certain page types?
- **Device differences**: Desktop vs mobile CTA behavior

**Key Questions:**
- Which CTA type has highest conversion?
- Are users preferring WhatsApp over phone calls?
- Does "Arrange Viewing" outperform "Contact Agent"?
- Where do users drop off in the conversion funnel?

### 2. FAQ Engagement Analysis

Track and analyze:
- **FAQ view rates**: Which questions get expanded most?
- **FAQ-to-CTA correlation**: Do users who read FAQs convert more?
- **Placement testing**: Does FAQ position on page matter?
- **Content gaps**: What questions are users searching but not finding?

**Key Questions:**
- Which FAQ topics drive the most engagement?
- Do Golden Visa FAQs lead to more enquiries?
- Should we put FAQs higher or lower on the page?
- What questions are missing from our current FAQ set?

### 3. "Why This Property" Block Analysis

Track and analyze:
- **Visibility impact**: Does showing "Why This Property" increase time on page?
- **Content effectiveness**: Which bullet points resonate (views, price, location)?
- **Position testing**: Sidebar vs inline placement
- **Golden Visa mention**: Does eligibility messaging drive enquiries?

**Key Questions:**
- Do users spend more time on listings with "Why This Property" blocks?
- Which selling points are most compelling?
- Should we auto-generate this content or manually curate?

### 4. Page Type Performance

Compare across:
- **Listing detail pages**: Individual property performance
- **Hub pages**: prices, law, golden-visa, living engagement
- **Homepage**: Hero CTA effectiveness
- **Building pages**: (if applicable)

**Key Questions:**
- Which page type generates highest quality leads?
- Do hub pages convert differently than listing pages?
- Are users engaging with educational content (law/golden-visa)?

### 5. Lead Quality Patterns

Analyze qualification signals:
- **High-value listing views**: Do users viewing AED 10M+ properties behave differently?
- **Multiple pageviews**: Correlation with lead quality
- **FAQ engagement depth**: Do users who read multiple FAQs convert better?
- **Source attribution**: Which traffic sources produce qualified leads?

## Analysis Methodology

### Step 1: Data Aggregation

```typescript
// Load and aggregate lead events
const events = await loadLeadEvents()

// Group by dimensions
const byCtaType = groupBy(events, 'ctaType')
const byPageType = groupBy(events, 'pageType')
const bySession = groupBy(events, 'sessionId')
```

### Step 2: Pattern Detection

Identify patterns such as:
- **High-performers**: CTAs with >5% click rate
- **Underperformers**: CTAs with <1% click rate  
- **Opportunity gaps**: Page types with high views but low CTAs
- **Content correlation**: FAQs that precede conversions

### Step 3: Hypothesis Generation

For each pattern, generate hypotheses:
- "WhatsApp CTAs outperform phone CTAs by 40% → hypothesis: users prefer messaging"
- "Golden Visa FAQ gets 3x more views → hypothesis: visa content should be more prominent"
- "Mobile users rarely click sidebar CTAs → hypothesis: need mobile-optimized CTAs"

### Step 4: Recommendation Scoring

Score recommendations by:
- **Impact**: Expected conversion improvement (high/medium/low)
- **Effort**: Implementation complexity (easy/medium/hard)
- **Confidence**: Based on data volume and consistency (high/medium/low)
- **Priority**: Impact × Confidence / Effort

## Output Format

### SkillDocument Template

```markdown
# Skill: [Pattern Name]

## Context
[What we observed in the data]

## Hypothesis
[Why we think this pattern works]

## Implementation
[How to apply this pattern]

## Results
- Before: [metric]
- After: [metric]  
- Improvement: [percentage]

## Applies To
[Page types, listing types, etc.]

## Reusable Pattern
[Generic guidance for similar situations]

## Status: [draft/approved/implemented/deprecated]
```

### Recommendations JSON Structure

```typescript
interface LeadAnalysisRecommendations {
  generatedAt: string
  analysisPeriod: {
    start: string
    end: string
    eventCount: number
  }
  
  ctaRecommendations: {
    type: string
    currentLabel: string
    proposedLabel: string
    rationale: string
    priority: 'high' | 'medium' | 'low'
    expectedImpact: string
    affectedPages: string[]
  }[]
  
  faqRecommendations: {
    pageType: string
    currentFaqs: string[]
    proposedAdditions: string[]
    proposedRemovals: string[]
    reordering: number[]
    rationale: string
    priority: 'high' | 'medium' | 'low'
  }[]
  
  whyPropertyRecommendations: {
    listingId?: string
    buildingSlug?: string
    currentBullets: string[]
    proposedBullets: string[]
    rationale: string
    priority: 'high' | 'medium' | 'low'
  }[]
  
  experiments: {
    name: string
    description: string
    targetPages: string[]
    hypothesis: string
    successMetric: string
    duration: string
  }[]
  
  skillDocuments: string[] // paths to generated skill docs
}
```

## Example Recommendations

### CTA Recommendation Example

```json
{
  "type": "whatsapp",
  "currentLabel": "WhatsApp",
  "proposedLabel": "Get Details on WhatsApp",
  "rationale": "WhatsApp CTAs have 2.3x higher click rate than phone CTAs. More descriptive label may improve clarity.",
  "priority": "high",
  "expectedImpact": "15-20% increase in WhatsApp enquiries",
  "affectedPages": ["listing_detail", "home", "prices"]
}
```

### FAQ Recommendation Example

```json
{
  "pageType": "listing_detail",
  "currentFaqs": ["Price FAQ", "Viewing FAQ"],
  "proposedAdditions": ["Golden Visa Eligibility FAQ"],
  "proposedRemovals": [],
  "reordering": [0, 2, 1], // Move Golden Visa to position 1
  "rationale": "Properties >AED 2M get 40% more engagement when Golden Visa eligibility is mentioned upfront",
  "priority": "high"
}
```

### Why Property Recommendation Example

```json
{
  "buildingSlug": "burj-daman",
  "currentBullets": ["Featured listing", "Prime location", "Golden Visa eligible"],
  "proposedBullets": [
    "Direct Gate Village access - Dubai's premier dining district",
    "Panoramic Zabeel Park and skyline views",
    "AED 6.5M investment qualifies for 10-year UAE Golden Visa",
    "Rare full-floor layout with premium finishes"
  ],
  "rationale": "Specific lifestyle benefits and exact Golden Visa threshold drive 25% more enquiries than generic benefits",
  "priority": "medium"
}
```

## Guardrails

- **Never recommend**: Removing all CTAs from a page
- **Never recommend**: FAQ spam (more than 8 FAQs on one page)
- **Never recommend**: Misleading CTA labels that don't match action
- **Always include**: Disclaimer that changes should be A/B tested
- **Always validate**: Data has minimum 100 events before generating recommendations

## Success Metrics

Track these KPIs over time:
- **Conversion rate**: CTA clicks / page views
- **Lead quality score**: Average qualification level
- **Time to convert**: Sessions from first view to CTA click
- **Revenue impact**: Property values from converted leads
- **FAQ helpfulness**: Correlation between FAQ views and conversions

## Execution Frequency

- **Weekly**: Quick scan for anomalies or major shifts
- **Bi-weekly**: Generate fresh recommendations
- **Monthly**: Create new SkillDocuments from validated patterns
- **Quarterly**: Full analysis and strategy review

## Tool Integration

This skill works with:
- Lead event data from `leadEvents.ts`
- Normalized data from `normalized.ts`
- Recommendation output to `/data/recommendations/`
- Skill document output to `/hermes/skills/`

## Version

- Created: 2024-01
- Version: 1.0
- Status: Active