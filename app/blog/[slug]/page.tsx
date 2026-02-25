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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

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
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {post.title}
          </h1>
          <time className="text-gray-600 dark:text-gray-400 text-lg">
            {post.date}
          </time>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none" dir="rtl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <a 
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← العودة للمدونة
          </a>
        </footer>
      </article>
    </>
  )
}
