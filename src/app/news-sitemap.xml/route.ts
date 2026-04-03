import { newsArticlesData } from '@/lib/data/news'

export const dynamic = 'force-static'

export async function GET() {
  const baseUrl = 'https://difc.property'
  const now = new Date().toISOString()

  // Generate news sitemap XML
  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsArticlesData.map(article => `
  <url>
    <loc>${baseUrl}/news/${article.slug}</loc>
    <lastmod>${now}</lastmod>
    <news:news>
      <news:publication>
        <news:name>DIFC.property</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${now}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>${article.tags.join(', ')}</news:keywords>
    </news:news>
  </url>
  `).join('')}
</urlset>`

  return new Response(newsSitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
