'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import BlogCard from './BlogCard'

export interface BlogListItem {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  author: string
  readingTime: number
}

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return date
  return d.toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [query, posts])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search */}
      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-xl" dir="rtl">
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في المقالات..."
            aria-label="ابحث في المقالات"
            className="w-full rounded-full border border-gray-200 bg-white py-3 pr-12 pl-4 text-gray-900 shadow-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <p className="mb-8 text-center text-sm text-gray-500" dir="rtl">
        {query.trim()
          ? `${filtered.length} نتيجة عن "${query.trim()}"`
          : `${posts.length} مقالة`}
      </p>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-600" dir="rtl">
          لا توجد نتائج مطابقة. جرّب كلمة مفتاحية أخرى.
        </div>
      ) : (
        <>
          {/* Featured (latest / top result) */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              dir="rtl"
              className="group mb-12 block overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl md:p-10"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                  مقال مميز
                </span>
                {featured.tags[0] && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200">
                    {featured.tags[0]}
                  </span>
                )}
              </div>
              <h2 className="mt-5 text-3xl font-bold leading-snug text-white group-hover:text-blue-300 md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-loose text-gray-300 line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-400">
                <span>{featured.author}</span>
                <span>{formatDate(featured.date)}</span>
                <span>{featured.readingTime} دقيقة قراءة</span>
                <span className="mr-auto font-semibold text-blue-400 group-hover:underline">
                  اقرأ المقال ←
                </span>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                tags={post.tags}
                author={post.author}
                readingTime={post.readingTime}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
