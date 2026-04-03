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
    <div className="min-h-screen bg-[#FDFCFB] pt-16 lg:pt-20">
      {/* Header */}
      <div className="border-b border-[#EDE9E4] bg-[#F7F5F2]">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B8956B]">
            DIFC Intelligence
          </p>
          <h1 className="mt-2 font-serif text-3xl font-normal text-[#1A1815] sm:text-4xl">
            Latest News from DIFC
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#6B5F53]">
            Stay informed with the latest developments, business updates, and district intelligence 
            from Dubai International Financial Centre.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#EDE9E4]">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-[#1A1815] text-white'
                    : 'bg-[#F7F5F2] text-[#6B5F53] hover:bg-[#EDE9E4]'
                }`}
              >
                All News
              </button>
              {categoriesData.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-[#1A1815] text-white'
                      : 'bg-[#F7F5F2] text-[#6B5F53] hover:bg-[#EDE9E4]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7F71]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#EDE9E4] bg-[#FDFCFB] pl-10 pr-4 py-2 text-sm focus:border-[#B8956B] focus:outline-none focus:ring-1 focus:ring-[#B8956B] sm:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#6B5F53]">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory(null)
                setSearchQuery('')
              }}
              className="mt-4 text-sm text-[#B8956B] hover:text-[#2D5A4A]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Articles */}
            {featuredArticles.length > 0 && !selectedCategory && !searchQuery && (
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-6">Featured Stories</h2>
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
              <h2 className="font-serif text-2xl font-normal text-[#1A1815] mb-6">
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
