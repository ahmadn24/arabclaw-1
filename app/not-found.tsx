import Link from 'next/link'
import Icon from '@/components/Icon'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <Icon name="search" className="h-12 w-12" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          الصفحة غير موجودة
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all"
          >
            العودة للصفحة الرئيسية
          </Link>
          <Link
            href="/blog"
            className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all"
          >
            تصفح المدونة
          </Link>
        </div>
      </div>
    </div>
  )
}
