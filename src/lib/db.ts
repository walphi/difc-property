// Database client setup
// For static export builds, this module handles gracefully when Prisma is not available

let prisma: any;

try {
  // Try to import PrismaClient
  const { PrismaClient } = require('@prisma/client');
  
  const globalForPrisma = globalThis as unknown as {
    prisma: typeof PrismaClient | undefined
  }
  
  prisma = globalForPrisma.prisma ?? new PrismaClient()
  
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch (error) {
  // If Prisma client is not available (during static export), create a mock
  console.warn('Prisma client not available, using mock for static export')
  
  prisma = {
    building: { findMany: async () => [], findUnique: async () => null },
    listing: { findMany: async () => [], findUnique: async () => null },
    newsArticle: { findMany: async () => [], findUnique: async () => null },
    category: { findMany: async () => [], findUnique: async () => null },
    lead: { create: async () => ({}) },
    sEOMetadata: { findUnique: async () => null },
  }
}

export { prisma }
