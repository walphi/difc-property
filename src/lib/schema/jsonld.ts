export interface SchemaOrganization {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  address?: {
    '@type': 'PostalAddress'
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  contactPoint?: {
    '@type': 'ContactPoint'
    contactType: string
    telephone?: string
    email?: string
  }
  sameAs?: string[]
}

export interface SchemaRealEstateListing {
  '@context': 'https://schema.org'
  '@type': 'RealEstateListing'
  name: string
  description: string
  url: string
  image: string[]
  datePosted: string
  price: string
  priceCurrency: string
  floorSize?: {
    '@type': 'QuantitativeValue'
    value: number
    unitText: string
  }
  numberOfRooms?: number
  numberOfBedrooms?: number
  numberOfBathrooms?: number
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  provider: {
    '@type': 'Organization' | 'RealEstateAgent'
    name: string
    url?: string
    telephone?: string
  }
}

export interface SchemaBlogPosting {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting' | 'NewsArticle'
  headline: string
  description: string
  image: string[]
  datePublished: string
  dateModified: string
  author: {
    '@type': 'Organization' | 'Person'
    name: string
    url?: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  articleSection?: string
  keywords?: string[]
}

export interface SchemaBreadcrumbList {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: {
    '@type': 'ListItem'
    position: number
    name: string
    item?: string
  }[]
}

export interface SchemaFAQPage {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: {
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }[]
}

export interface SchemaPlace {
  '@context': 'https://schema.org'
  '@type': 'Place' | 'LandmarksOrHistoricalBuildings' | 'Residence'
  name: string
  description: string
  image: string[]
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  amenityFeature?: {
    '@type': 'LocationFeatureSpecification'
    name: string
    value: boolean
  }[]
}

export function generateOrganizationSchema(): SchemaOrganization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DIFC.property',
    url: 'https://difc.property',
    logo: 'https://difc.property/logo.png',
    description: 'DIFC.property is a curated luxury real estate and district intelligence platform for Dubai International Financial Centre, featuring premium properties for sale, DIFC news, and market insights.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Real Estate Agent',
      telephone: '+971562195566',
      email: 'contact@difc.property'
    },
    sameAs: [
      'https://www.linkedin.com/company/difc-property',
      'https://twitter.com/difcproperty'
    ]
  }
}

export function generateRealEstateListingSchema(listing: any): SchemaRealEstateListing {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description || listing.title,
    url: `https://difc.property/listings/${listing.slug}`,
    image: listing.images || [],
    datePosted: listing.listedAt || listing.createdAt,
    price: listing.price.toString(),
    priceCurrency: listing.currency,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.sqft,
      unitText: 'SQFT'
    },
    numberOfRooms: listing.bedrooms ? listing.bedrooms + 1 : undefined,
    numberOfBedrooms: listing.bedrooms || undefined,
    numberOfBathrooms: listing.bathrooms || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.building?.address || listing.address,
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE'
    },
    provider: {
      '@type': 'RealEstateAgent',
      name: listing.sourceName || 'Edifice Brokerage',
      telephone: listing.agentPhone || '+971562195566'
    }
  }
}

export function generateBlogPostingSchema(article: any, type: 'BlogPosting' | 'NewsArticle' = 'BlogPosting'): SchemaBlogPosting {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: article.title,
    description: article.excerpt || article.summary,
    image: article.featuredImage ? [article.featuredImage] : ['https://difc.property/og-image.jpg'],
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      '@type': 'Organization',
      name: article.author || 'DIFC.property Editorial Team',
      url: 'https://difc.property/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'DIFC.property',
      logo: {
        '@type': 'ImageObject',
        url: 'https://difc.property/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://difc.property/news/${article.slug}`
    },
    articleSection: article.category?.name,
    keywords: article.tags
  }
}

export function generateBreadcrumbSchema(items: { name: string; url?: string }[]): SchemaBreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): SchemaFAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function generateBuildingSchema(building: any): SchemaPlace {
  return {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: building.name,
    description: building.description,
    image: building.images || ['https://difc.property/og-image.jpg'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: building.address,
      addressLocality: building.city,
      addressRegion: building.district,
      addressCountry: building.country
    },
    geo: building.latitude && building.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: building.latitude,
      longitude: building.longitude
    } : undefined,
    amenityFeature: building.amenities?.map((amenity: string) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true
    }))
  }
}
