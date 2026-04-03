'use client'

import { useState } from 'react'
import { ArticleCard } from '@/components/editorial/ArticleCard'
import { Search } from 'lucide-react'
import { newsArticlesData } from '@/lib/data/news'
import { categoriesData } from '@/lib/data/news'

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = newsArticlesData.filter((article) => {
    if (selectedCategory && article.categorySlug !== selectedCategory) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        article.title.toLowerCase().includes(query) ||
        article.summary?.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    return true
  })

  const featuredArticles = filteredArticles.filter(a => a.featured)
  const regularArticles = filteredArticles.filter(a => !a.featured)

  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20">
      {/* Header */}
      <div className="border-b border-stone-200 bg-stone-50">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-amber-700">
            DIFC Intelligence
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Latest News from DIFC
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            Stay informed with the latest developments, business updates, and district intelligence 
            from Dubai International Financial Centre.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-stone-200">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All News
              </button>
              {categoriesData.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white pl-10 pr-4 py-2 text-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 sm:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-stone-600">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory(null)
                setSearchQuery('')
              }}
              className="mt-4 text-sm text-amber-700 hover:text-amber-800"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Articles */}
            {featuredArticles.length > 0 && !selectedCategory && !searchQuery && (
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">Featured Stories</h2>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {featuredArticles.slice(0, 2).map((article) => (
                    <ArticleCard
                      key={article.slug}
                      article={{
                        ...article,
                        category: { name: article.categorySlug, slug: article.categorySlug },
                        publishedAt: new Date().toISOString()
                      }}
                      variant="featured"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
                {selectedCategory ? categoriesData.find(c => c.slug === selectedCategory)?.name : 'All Articles'}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(selectedCategory || searchQuery ? filteredArticles : regularArticles).map((article) => (
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
          </>
        )}
      </div>
    </div>
  )
}
