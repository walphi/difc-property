import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User, ExternalLink, Tag } from 'lucide-react'
import { newsArticlesData, categoriesData } from '@/lib/data/news'
import { listingsData } from '@/lib/data/seed'
import { buildingsData } from '@/lib/data/seed'
import { ArticleCard } from '@/components/editorial/ArticleCard'
import { ListingCard } from '@/components/listings/ListingCard'
import { generateBlogPostingSchema, generateBreadcrumbSchema } from '@/lib/schema/jsonld'
import { format } from 'date-fns'
import type { Metadata } from 'next'

interface NewsArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = newsArticlesData.find(a => a.slug === slug)
  
  if (!article) {
    return {
      title: 'Article Not Found | DIFC.property',
    }
  }

  return {
    title: `${article.title} | DIFC News | DIFC.property`,
    description: article.excerpt || article.summary,
    keywords: [...article.tags, 'DIFC news', 'Dubai International Financial Centre', article.categorySlug],
    openGraph: {
      title: article.title,
      description: article.excerpt || article.summary,
      url: `https://difc.property/news/${article.slug}`,
      images: article.featuredImage ? [{ url: article.featuredImage }] : undefined,
    },
  }
}

export async function generateStaticParams() {
  return newsArticlesData.map((article) => ({
    slug: article.slug,
  }))
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = newsArticlesData.find(a => a.slug === slug)
  
  if (!article) {
    notFound()
  }

  const category = categoriesData.find(c => c.slug === article.categorySlug)
  
  // Get related listings
  const relatedListings = listingsData
    .filter(l => article.relatedBuildings?.includes(l.buildingSlug))
    .slice(0, 3)

  // Get related articles
  const relatedArticles = newsArticlesData
    .filter(a => a.slug !== article.slug && a.categorySlug === article.categorySlug)
    .slice(0, 3)

  // Schema data
  const articleSchema = generateBlogPostingSchema({
    ...article,
    category: category ? { name: category.name } : undefined
  }, 'NewsArticle')

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://difc.property' },
    { name: 'News', url: 'https://difc.property/news' },
    { name: article.title }
  ])

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
        {/* Back Link */}
        <div className="border-b border-[#EDE9E4]">
          <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6B5F53] hover:text-[#1A1815] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to news
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Category */}
            {category && (
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B] mb-4">
                {category.name}
              </span>
            )}

            {/* Title */}
            <h1 className="font-serif text-3xl font-normal text-[#1A1815] sm:text-4xl lg:text-5xl leading-[1.15]">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#6B5F53]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={new Date().toISOString()}>
                  {format(new Date(), 'MMMM d, yyyy')}
                </time>
              </div>
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
              {article.source && (
                <div className="flex items-center gap-2">
                  <span>Source:</span>
                  {article.sourceUrl ? (
                    <a 
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#2D5A4A] hover:text-[#1F3D31] transition-colors"
                    >
                      {article.source}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span>{article.source}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Summary */}
            {(article.summary || article.excerpt) && (
              <p className="mb-8 text-xl leading-relaxed text-[#6B5F53]">
                {article.summary || article.excerpt}
              </p>
            )}

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#EDE9E4]">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-[#8B7F71]" />
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm text-[#6B5F53]"
                    >
                      {tag}{index < article.tags.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Listings */}
        {relatedListings.length > 0 && (
          <div className="border-t border-[#EDE9E4] bg-[#F7F5F2]">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-8">
                Related Properties
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedListings.map((listing) => (
                  <ListingCard
                    key={listing.slug}
                    listing={{
                      ...listing,
                      images: listing.images,
                      building: { name: listing.buildingSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), slug: listing.buildingSlug }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-[#EDE9E4]">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-8">
                More {category?.name} News
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={{
                      ...article,
                      category: { name: article.categorySlug, slug: article.categorySlug },
                      publishedAt: new Date().toISOString()
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
