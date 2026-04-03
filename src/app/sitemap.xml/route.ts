import { listingsData } from '@/lib/data/seed'
import { newsArticlesData } from '@/lib/data/news'
import { buildingsData } from '@/lib/data/seed'

export const dynamic = 'force-static'

export async function GET() {
  const baseUrl = 'https://difc.property'
  
  const now = new Date().toISOString()

  // Static pages
  const staticPages = [
    '',
    '/listings',
    '/news',
    '/about',
    '/areas/difc',
  ]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
  ${listingsData.map(listing => `
  <url>
    <loc>${baseUrl}/listings/${listing.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `).join('')}
  ${newsArticlesData.map(article => `
  <url>
    <loc>${baseUrl}/news/${article.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  `).join('')}
  ${buildingsData.map(building => `
  <url>
    <loc>${baseUrl}/buildings/${building.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
