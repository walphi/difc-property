export const dynamic = 'force-static'

export async function GET() {
  const robots = `# DIFC.property robots.txt
# https://difc.property

User-agent: *
Allow: /

# Sitemap locations
Sitemap: https://difc.property/sitemap.xml
Sitemap: https://difc.property/news-sitemap.xml

# Crawl rate
Crawl-delay: 1

# Disallow patterns (none for this site)
# Disallow: /api/
# Disallow: /admin/
# Disallow: /private/

# Search engine specific directives
User-agent: Googlebot
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# AI crawlers - allow for now as site is content-focused
User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /
`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
