import Link from 'next/link'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  tags?: string[]
  author?: string
  readingTime?: number
}

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return date
  return d.toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogCard({ slug, title, excerpt, date, tags = [], author, readingTime }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      dir="rtl"
      className="group flex flex-col h-full rounded-2xl bg-white border border-gray-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 overflow-hidden"
    >
      <div className="h-1.5 w-full bg-gradient-to-l from-blue-500 to-blue-400 opacity-80 group-hover:opacity-100" />
      <div className="flex flex-col gap-3 p-6 flex-1">
        {tags.length > 0 && (
          <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {tags[0]}
          </span>
        )}
        <h3
          className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
          style={{ lineHeight: '1.6' }}
        >
          {title}
        </h3>
        <p className="text-gray-600 line-clamp-3 flex-1" style={{ lineHeight: '1.9' }}>
          {excerpt}
        </p>
        <div className="mt-2 flex items-center gap-4 border-t border-gray-100 pt-3 text-sm text-gray-500">
          <time className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {formatDate(date)}
          </time>
          {readingTime ? (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {readingTime} دقيقة قراءة
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
