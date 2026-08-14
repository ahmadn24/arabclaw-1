import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <img src="/mascot.jpg" alt="ArabClaw" className="w-12 h-12 rounded-full" />
              <span className="text-xl font-bold text-gray-900">
                ArabClaw
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              أسهل طريقة لاستخدام الذكاء الاصطناعي بالعربية
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://docs.arabclaw.com" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  التوثيق
                </Link>
              </li>
              <li>
                <Link href="https://marketplace.arabclaw.com" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  المدونة
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">المجتمع</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/openclaw" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.gg/openclaw" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>© 2025 ArabClaw. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
