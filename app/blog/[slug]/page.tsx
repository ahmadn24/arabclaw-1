import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const baseUrl = 'https://arabclaw.com'

  if (!post) {
    return {
      title: 'مقال غير موجود',
      description: 'المقال المطلوب غير موجود',
    }
  }

  const articleUrl = `${baseUrl}/blog/${slug}`
  const description = post.excerpt || `${post.title} — مقال من مدونة ArabClaw حول OpenClaw بالعربية`

  return {
    title: post.title,
    description: description,
    authors: [{ name: 'ArabClaw Team' }],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: post.title,
      description: description,
      url: articleUrl,
      siteName: 'ArabClaw',
      locale: 'ar_SA',
      type: 'article',
      publishedTime: post.date,
      authors: ['ArabClaw Team'],
      images: [
        {
          url: '/mascot.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: ['/mascot.jpg'],
      creator: '@ArabClaw',
    },
  }
}

function formatArabicDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Related posts: prefer shared tags, then fill with recent
  const allPosts = getAllPosts()
  const others = allPosts.filter((p) => p.slug !== slug)
  const withShared = others.filter((p) => (p.tags || []).some((t) => (post.tags || []).includes(t)))
  const relatedSeen = new Set<string>()
  const related = [...withShared, ...others]
    .filter((p) => (relatedSeen.has(p.slug) ? false : (relatedSeen.add(p.slug), true)))
    .slice(0, 3)

  // JSON-LD structured data for blog post
  const articleUrl = `https://arabclaw.com/blog/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": articleUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "headline": post.title,
    "description": post.excerpt || `${post.title} — مقال من مدونة ArabClaw`,
    "image": {
      "@type": "ImageObject",
      "url": "https://arabclaw.com/mascot.jpg",
      "width": 1200,
      "height": 630
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "ArabClaw Team",
      "url": "https://arabclaw.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://arabclaw.com/#organization",
      "name": "ArabClaw",
      "url": "https://arabclaw.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://arabclaw.com/mascot.jpg",
        "width": 512,
        "height": 512
      }
    },
    "inLanguage": "ar",
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://arabclaw.com/blog",
      "name": "مدونة ArabClaw",
      "description": "مقالات ودروس OpenClaw بالعربية"
    },
    "about": {
      "@type": "SoftwareApplication",
      "name": "OpenClaw",
      "url": "https://openclaw.ai"
    },
    "wordCount": post.content ? post.content.split(/\s+/).length : 0
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container mx-auto px-4 py-12 max-w-3xl" dir="rtl">
        <header className="mb-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="مسار التنقل">
            <a href="/" className="hover:text-blue-600 transition-colors">الرئيسية</a>
            <span className="text-gray-300">/</span>
            <a href="/blog" className="hover:text-blue-600 transition-colors">المدونة</a>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-bold">A</span>
              <span className="font-medium text-gray-700">{post.author || 'فريق ArabClaw'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <time>{formatArabicDate(post.date)}</time>
            </span>
            {post.readingTime ? (
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                <span>{post.readingTime} دقيقة قراءة</span>
              </span>
            ) : null}
          </div>
          <div className="mt-8 h-px bg-gradient-to-l from-blue-500/40 via-gray-200 to-transparent" />
        </header>

        <div className="prose prose-lg max-w-none" dir="rtl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-14 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-t-4 border-blue-500 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">جاهز لتجربة OpenClaw؟</h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">ابدأ الآن مع دليل التثبيت الكامل بالعربية وابنِ أول وكيل ذكاء اصطناعي خاص بك.</p>
          <a href="/install" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-600 transition-colors">
            دليل التثبيت
            <span aria-hidden>←</span>
          </a>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <a
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col h-full rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
                >
                  <span className="h-1.5 bg-gradient-to-l from-blue-500 to-blue-400" />
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-3">{p.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{p.excerpt}</p>
                    <span className="mt-auto text-sm font-semibold text-blue-600 inline-flex items-center gap-1">اقرأ المزيد <span aria-hidden>←</span></span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span aria-hidden>←</span> العودة للمدونة
          </a>
        </footer>
      </article>
    </>
  )
}
