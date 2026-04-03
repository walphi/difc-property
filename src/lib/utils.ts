import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = 'AED') {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatSqft(sqft: number) {
  return new Intl.NumberFormat('en-AE').format(sqft)
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function estimateBedrooms(sqft: number, title: string): number | null {
  // Check title for bedroom hints
  const match = title.match(/(\d+)\s*(?:BR|Bedroom|Bed)/i)
  if (match) {
    return parseInt(match[1], 10)
  }
  
  // Estimate based on sqft
  if (sqft < 800) return 0 // Studio
  if (sqft < 1200) return 1
  if (sqft < 1800) return 2
  if (sqft < 2500) return 3
  if (sqft < 4000) return 4
  return 5 // Penthouse
}

export function estimateBathrooms(bedrooms: number | null, sqft: number): number | null {
  if (bedrooms === null) {
    // Estimate based on sqft
    if (sqft < 800) return 1
    if (sqft < 1500) return 2
    if (sqft < 2500) return 3
    return 4
  }
  
  // Typical bathroom to bedroom ratio in luxury properties
  if (bedrooms === 0) return 1
  if (bedrooms <= 2) return bedrooms
  return bedrooms + 1 // Master + en-suites
}
