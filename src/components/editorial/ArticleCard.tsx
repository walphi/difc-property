import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

interface ArticleCardProps {
  article: {
    slug: string
    title: string
    excerpt?: string
    summary?: string
    category?: {
      name: string
      slug: string
    }
    featuredImage?: string
    publishedAt: string | Date
    featured?: boolean
  }
  variant?: 'default' | 'featured' | 'compact'
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const publishedDate = typeof article.publishedAt === 'string' 
    ? new Date(article.publishedAt) 
    : article.publishedAt

  if (variant === 'featured') {
    return (
      <Link href={`/news/${article.slug}`} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--warm-200)]">
          {article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[var(--warm-300)]">
              <span className="text-[var(--warm-500)]">No image</span>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          {/* Category - text label style */}
          {article.category && (
            <div className="text-eyebrow">
              {article.category.name}
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-[var(--warm-500)]">
            <Calendar className="h-4 w-4" />
            <time dateTime={publishedDate.toISOString()}>
              {format(publishedDate, 'MMMM d, yyyy')}
            </time>
          </div>
          
          <h3 className="font-serif text-2xl text-[var(--warm-900)] leading-tight group-hover:text-[var(--gold)] transition-colors">
            {article.title}
          </h3>
          
          {(article.excerpt || article.summary) && (
            <p className="text-[var(--warm-600)] line-clamp-2 leading-relaxed">
              {article.excerpt || article.summary}
            </p>
          )}

          <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] group-hover:text-[var(--gold)] group-hover:gap-3 transition-all pt-2 border-b border-[var(--gold)] pb-1">
            Read article
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/news/${article.slug}`} className="group flex gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-[var(--warm-200)]">
          {article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[var(--warm-300)]">
              <span className="text-xs text-[var(--warm-500)]">No image</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <h4 className="font-medium text-[var(--warm-900)] line-clamp-2 group-hover:text-[var(--gold)] transition-colors">
            {article.title}
          </h4>
          <div className="mt-1 flex items-center gap-2 text-xs text-[var(--warm-500)]">
            <Calendar className="h-3 w-3" />
            <time dateTime={publishedDate.toISOString()}>
              {format(publishedDate, 'MMM d, yyyy')}
            </time>
            {article.category && (
              <>
                <span className="text-[var(--warm-400)]">|</span>
                <span className="text-[var(--gold)]">{article.category.name}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--warm-200)]">
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[var(--warm-300)]">
            <span className="text-[var(--warm-500)]">No image</span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {/* Category label */}
        {article.category && (
          <div className="text-eyebrow text-[10px]">
            {article.category.name}
          </div>
        )}
        
        <div className="flex items-center gap-2 text-xs text-[var(--warm-500)]">
          <Calendar className="h-3 w-3" />
          <time dateTime={publishedDate.toISOString()}>
            {format(publishedDate, 'MMM d, yyyy')}
          </time>
        </div>
        
        <h3 className="font-serif text-lg text-[var(--warm-900)] leading-snug group-hover:text-[var(--gold)] transition-colors">
          {article.title}
        </h3>
      </div>
    </Link>
  )
}
