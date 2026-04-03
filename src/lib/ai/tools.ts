import { ToolDefinition, ToolName, Property, ToolCall } from './types'
import { listingsData, buildingsData } from '@/lib/data/seed'

// Tool Definitions for AI
export const toolDefinitions: ToolDefinition[] = [
  {
    name: 'searchProperties',
    description: 'Search for properties in DIFC based on criteria like bedrooms, price range, building, or property type',
    parameters: {
      type: 'object',
      properties: {
        bedrooms: {
          type: 'number',
          description: 'Number of bedrooms (1-4)'
        },
        maxPrice: {
          type: 'number',
          description: 'Maximum price in AED'
        },
        minPrice: {
          type: 'number',
          description: 'Minimum price in AED'
        },
        building: {
          type: 'string',
          description: 'Building name or slug (e.g., "burj-daman", "index-tower", "limestone-house", "eden-house-zaabeel")'
        },
        propertyType: {
          type: 'string',
          description: 'Property type: "apartment", "penthouse", or "duplex"',
          enum: ['apartment', 'penthouse', 'duplex']
        },
        view: {
          type: 'string',
          description: 'View type: "Burj Khalifa", "Zabeel", "DIFC", "Garden", or "Panoramic"'
        }
      }
    }
  },
  {
    name: 'getBuildingInfo',
    description: 'Get detailed information about a specific building in DIFC including amenities, location, and features',
    parameters: {
      type: 'object',
      properties: {
        buildingName: {
          type: 'string',
          description: 'Name of the building (e.g., "Burj Daman", "Index Tower", "Limestone House", "Eden House Zaabeel")'
        }
      },
      required: ['buildingName']
    }
  },
  {
    name: 'getDIFCContent',
    description: 'Get information about DIFC lifestyle, amenities, dining, or general area information',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Topic to get information about: "lifestyle", "dining", "amenities", "transportation", "golden-visa"',
          enum: ['lifestyle', 'dining', 'amenities', 'transportation', 'golden-visa']
        }
      },
      required: ['topic']
    }
  },
  {
    name: 'calculateROI',
    description: 'Calculate return on investment for a property including rental yield and appreciation estimates',
    parameters: {
      type: 'object',
      properties: {
        price: {
          type: 'number',
          description: 'Property price in AED'
        },
        rentalIncome: {
          type: 'number',
          description: 'Estimated monthly rental income in AED'
        },
        years: {
          type: 'number',
          description: 'Investment period in years (default: 5)'
        }
      },
      required: ['price', 'rentalIncome']
    }
  }
]

// Mock tool execution (will be replaced with real database queries in Phase 2)
export async function executeTool(toolCall: ToolCall): Promise<any> {
  const { name, args } = toolCall
  
  switch (name as ToolName) {
    case 'searchProperties':
      return searchProperties(args)
    case 'getBuildingInfo':
      return getBuildingInfo(args.buildingName)
    case 'getDIFCContent':
      return getDIFCContent(args.topic)
    case 'calculateROI':
      return calculateROI(args.price, args.rentalIncome, args.years || 5)
    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}

async function searchProperties(criteria: {
  bedrooms?: number
  maxPrice?: number
  minPrice?: number
  building?: string
  propertyType?: string
  view?: string
}): Promise<Property[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Create a map of building data for quick lookup
  const buildingMap = new Map(buildingsData.map(b => [b.slug, b]))
  
  let results = listingsData.map(listing => {
    const building = buildingMap.get(listing.buildingSlug)
    return {
      slug: listing.slug,
      title: listing.title,
      price: listing.price,
      currency: listing.currency,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      sqft: listing.sqft,
      propertyType: listing.propertyType,
      images: listing.images,
      view: listing.view,
      building: building ? { name: building.name, slug: building.slug } : undefined
    }
  })
  
  // Apply filters
  if (criteria.bedrooms !== undefined) {
    results = results.filter(p => p.bedrooms === criteria.bedrooms)
  }
  if (criteria.maxPrice !== undefined && criteria.maxPrice !== null) {
    results = results.filter(p => p.price <= criteria.maxPrice!)
  }
  if (criteria.minPrice !== undefined && criteria.minPrice !== null) {
    results = results.filter(p => p.price >= criteria.minPrice!)
  }
  if (criteria.building) {
    const buildingSlug = criteria.building.toLowerCase().replace(/\s+/g, '-')
    results = results.filter(p => 
      p.building?.slug?.toLowerCase().includes(buildingSlug) ||
      p.building?.name?.toLowerCase().includes(criteria.building!.toLowerCase())
    )
  }
  if (criteria.propertyType) {
    results = results.filter(p => p.propertyType.toLowerCase() === criteria.propertyType!.toLowerCase())
  }
  if (criteria.view) {
    results = results.filter(p => p.view?.toLowerCase().includes(criteria.view!.toLowerCase()))
  }
  
  return results.slice(0, 4) // Limit to 4 results
}

async function getBuildingInfo(buildingName: string): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const buildings: Record<string, any> = {
    'burj daman': {
      name: 'Burj Daman',
      description: 'A prestigious 65-storey mixed-use tower in the heart of DIFC, offering luxury residential apartments with stunning views of Zabeel and the Dubai skyline.',
      developer: 'DAMAC Properties',
      completionYear: 2014,
      totalUnits: 273,
      amenities: ['Swimming Pool', 'Gym', 'Concierge', 'Retail Access', 'Secure Parking', '24/7 Security', 'High-Speed Elevators', 'Meeting Rooms'],
      priceRange: 'AED 5.5M - 18M',
      highlights: ['Direct access to DIFC retail promenade', 'Premium finishes throughout', 'High-floor residences available']
    },
    'index tower': {
      name: 'Index Tower',
      description: 'An iconic 80-storey skyscraper in DIFC, featuring luxury residential apartments and premium commercial spaces. Designed by Foster + Partners.',
      developer: 'Ithra Dubai',
      completionYear: 2011,
      totalUnits: 556,
      amenities: ['Sky Lounge', 'Fitness Center', 'Swimming Pool', 'Business Center', 'Concierge', 'Underground Parking', 'Retail Access', 'Conference Facilities'],
      priceRange: 'AED 2.8M - 9.8M',
      highlights: ['Panoramic views of Burj Khalifa and Arabian Gulf', 'World-class architecture', 'Mixed-use development']
    },
    'limestone house': {
      name: 'Limestone House',
      description: 'An exclusive low-rise residential development in DIFC, offering spacious apartments with contemporary design and premium finishes.',
      developer: 'DIFC Investments',
      completionYear: 2010,
      totalUnits: 88,
      amenities: ['Private Garden', 'Fitness Center', 'Concierge', 'Secure Parking', 'Maid Service', 'Valet Parking', 'Storage', 'Close to Gate Village'],
      priceRange: 'AED 6.2M - 11.5M',
      highlights: ['Boutique building with only 88 units', 'Tranquil garden setting', 'Privacy and exclusivity', 'Steps from Gate Village']
    },
    'eden house zaabeel': {
      name: 'Eden House Zaabeel',
      description: 'The pinnacle of luxury living in DIFC, featuring ultra-premium apartments and penthouses with breathtaking panoramic views.',
      developer: 'H&H Development',
      completionYear: 2024,
      totalUnits: 143,
      amenities: ['Infinity Pool', 'Private Cinema', 'Spa & Wellness', 'Sky Lounge', 'Concierge', 'Private Parking', 'Smart Home Systems', 'Chef Kitchen'],
      priceRange: 'AED 4.8M - 12.5M',
      highlights: ['Brand new development', 'Ultra-premium finishes', 'Smart home technology', 'Panoramic Dubai skyline views']
    }
  }
  
  const key = buildingName.toLowerCase()
  const building = buildings[key] || Object.values(buildings).find(b => 
    b.name.toLowerCase().includes(key)
  )
  
  if (!building) {
    return {
      error: `Building "${buildingName}" not found. Available buildings: Burj Daman, Index Tower, Limestone House, Eden House Zaabeel`
    }
  }
  
  return building
}

async function getDIFCContent(topic: string): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const content: Record<string, any> = {
    'lifestyle': {
      title: 'Living in DIFC',
      description: 'DIFC offers a unique walkable urban lifestyle where world-class dining, art galleries, and luxury residences converge.',
      highlights: [
        '25,000+ professionals working in the district',
        'Gate Village - European-style piazza with outdoor dining',
        'Art galleries and cultural venues',
        'Walkable environment with covered walkways',
        'Direct Dubai Metro connectivity'
      ],
      familyFriendly: 'Yes - Several buildings offer family amenities and are close to schools',
      nightlife: 'World-renowned restaurants including Zuma, Coya, and La Petite Maison'
    },
    'dining': {
      title: 'Dining at Gate Village',
      description: 'Gate Village and surrounding areas feature internationally acclaimed restaurants.',
      restaurants: [
        { name: 'Zuma', cuisine: 'Japanese', price: 'High-end' },
        { name: 'Coya', cuisine: 'Peruvian', price: 'High-end' },
        { name: 'La Petite Maison', cuisine: 'French', price: 'High-end' },
        { name: 'Gaia', cuisine: 'Greek', price: 'High-end' },
        { name: 'Amazonico', cuisine: 'Latin American', price: 'Mid to High' }
      ],
      casualOptions: 'Numerous cafes and casual dining options throughout the district',
      delivery: 'Wide variety of delivery options available to all residences'
    },
    'amenities': {
      title: 'DIFC Amenities',
      description: 'All premium DIFC residences feature world-class amenities.',
      standardAmenities: ['Swimming pools', 'Fitness centers', '24/7 concierge', 'Secure parking', 'High-speed elevators'],
      luxuryAmenities: ['Private cinemas', 'Spa & wellness centers', 'Sky lounges', 'Chef kitchens', 'Smart home systems'],
      services: ['Maid service available', 'Valet parking', 'Dry cleaning', 'Grocery delivery']
    },
    'transportation': {
      title: 'Getting Around DIFC',
      metro: 'Financial Centre Metro Station (Red Line) - Direct access from DIFC',
      parking: 'Underground parking available in all buildings',
      taxi: 'Easy taxi availability with dedicated stands',
      airports: '25 minutes to DXB Airport, 35 minutes to DWC Airport',
      walkability: 'Excellent - Covered walkways connect all buildings and Gate Village'
    },
    'golden-visa': {
      title: 'Golden Visa via Property Investment',
      description: 'Secure 10-year renewable residency through property investment in DIFC.',
      requirements: [
        'Minimum investment: AED 2,000,000',
        'Property must be residential (not commercial)',
        'Investment can be in one or multiple properties',
        'Property can be mortgaged (minimum 50% paid)'
      ],
      benefits: [
        '10-year renewable residency visa',
        'No sponsor required',
        'Can sponsor family members',
        'Can sponsor domestic workers',
        'Can stay outside UAE for more than 6 months'
      ],
      application: 'Apply through Dubai Land Department or Amer Centers'
    }
  }
  
  return content[topic] || {
    error: `Topic "${topic}" not found. Available topics: lifestyle, dining, amenities, transportation, golden-visa`
  }
}

async function calculateROI(price: number, rentalIncome: number, years: number): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const annualRentalIncome = rentalIncome * 12
  const grossRentalYield = (annualRentalIncome / price) * 100
  
  // Estimate appreciation (conservative 3% annually for DIFC)
  const appreciationRate = 0.03
  const futureValue = price * Math.pow(1 + appreciationRate, years)
  const totalAppreciation = futureValue - price
  
  // Estimate expenses (maintenance, service charges, etc.)
  const annualExpenses = price * 0.015 // ~1.5% annually for service charges
  const totalExpenses = annualExpenses * years
  
  // Net rental income
  const netAnnualIncome = annualRentalIncome - annualExpenses
  const totalRentalIncome = netAnnualIncome * years
  
  // Total return
  const totalReturn = totalRentalIncome + totalAppreciation
  const roi = (totalReturn / price) * 100
  
  return {
    investment: {
      price: price,
      currency: 'AED',
      formattedPrice: `AED ${price.toLocaleString()}`
    },
    rental: {
      monthlyIncome: rentalIncome,
      annualIncome: annualRentalIncome,
      grossYield: grossRentalYield.toFixed(2) + '%',
      netYield: ((netAnnualIncome / price) * 100).toFixed(2) + '%'
    },
    projection: {
      years: years,
      appreciationRate: (appreciationRate * 100).toFixed(1) + '%',
      futureValue: Math.round(futureValue),
      totalAppreciation: Math.round(totalAppreciation),
      totalRentalIncome: Math.round(totalRentalIncome),
      totalExpenses: Math.round(totalExpenses)
    },
    returns: {
      totalReturn: Math.round(totalReturn),
      roi: roi.toFixed(2) + '%',
      annualizedRoi: ((roi / years)).toFixed(2) + '%'
    },
    note: 'These are estimates. Actual returns may vary based on market conditions, property management, and other factors.'
  }
}