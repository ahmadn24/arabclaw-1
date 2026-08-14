import { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'

export const metadata: Metadata = {
  title: 'تثبيت OpenClaw — دليل التثبيت الكامل بالعربية 2026',
  description: 'دليل تثبيت OpenClaw الكامل بالعربية: ثلاث طرق سهلة (سكريبت تلقائي، npm، Docker). متوافق مع macOS وWindows وLinux وRaspberry Pi. ابدأ في 5 دقائق!',
  keywords: ['تثبيت OpenClaw', 'install OpenClaw', 'OpenClaw npm', 'OpenClaw Docker', 'تثبيت أوبن كلاو'],
  alternates: {
    canonical: 'https://arabclaw.com/install',
  },
  openGraph: {
    title: 'تثبيت OpenClaw — دليل التثبيت الكامل بالعربية',
    description: 'دليل تثبيت OpenClaw الكامل بالعربية: ثلاث طرق سهلة. ابدأ في 5 دقائق!',
    url: 'https://arabclaw.com/install',
    type: 'article',
    images: ['/mascot.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تثبيت OpenClaw بالعربية',
    description: 'ثلاث طرق سهلة لتثبيت OpenClaw. ابدأ في 5 دقائق!',
    images: ['/mascot.jpg'],
  },
}

export default function InstallPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent leading-tight">
        تثبيت OpenClaw
      </h1>
      
      <p className="text-xl text-center text-gray-600 mb-16">
        اختر الطريقة الأنسب لك - كلها سهلة وسريعة!
      </p>

      {/* Method 1: Automatic Script */}
      <section className="mb-16">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-500 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                الطريقة الأولى: التثبيت التلقائي (موصى به)
              </h2>
              <p className="text-blue-300">الأسهل والأسرع - أمر واحد فقط!</p>
            </div>
          </div>

          <div className="bg-black/40 ring-1 ring-white/10 rounded-lg p-6 mb-6 overflow-x-auto">
            <code className="text-blue-400 font-mono text-lg">
              curl -fsSL https://openclaw.com/install.sh | bash
            </code>
          </div>

          <div className="space-y-4 text-gray-200">
            <h3 className="font-bold text-xl mb-4">الخطوات:</h3>
            <ol className="space-y-3 mr-6">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">1.</span>
                <span>افتح Terminal (الطرفية)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">2.</span>
                <span>انسخ الأمر أعلاه والصقه</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">3.</span>
                <span>اضغط Enter وانتظر حتى ينتهي التثبيت</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">4.</span>
                <span>جاهز! اكتب <code className="px-2 py-1 bg-gray-800 rounded text-blue-400">openclaw</code> للبدء</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Method 2: npm */}
      <section className="mb-16">
        <div className="p-8 rounded-2xl bg-white border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold">الطريقة الثانية: عبر npm</h2>
              <p className="text-gray-600">للذين يفضلون Node.js</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-6 overflow-x-auto">
            <code className="text-blue-400 font-mono text-lg">
              npm install -g openclaw
            </code>
          </div>

          <div className="space-y-4 text-gray-800">
            <h3 className="font-bold text-xl mb-4">المتطلبات:</h3>
            <ul className="space-y-2 mr-6">
              <li className="flex gap-3">
                <span>•</span>
                <span>Node.js 18 أو أحدث</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>npm أو pnpm أو yarn</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Method 3: Docker */}
      <section className="mb-16">
        <div className="p-8 rounded-2xl bg-white border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold">الطريقة الثالثة: عبر Docker</h2>
              <p className="text-gray-600">للعزل الكامل والنشر السريع</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-6 overflow-x-auto">
            <code className="text-blue-400 font-mono text-lg block mb-2">
              docker pull openclaw/openclaw:latest
            </code>
            <code className="text-blue-400 font-mono text-lg block">
              docker run -it openclaw/openclaw
            </code>
          </div>

          <div className="space-y-4 text-gray-800">
            <h3 className="font-bold text-xl mb-4">المتطلبات:</h3>
            <ul className="space-y-2 mr-6">
              <li className="flex gap-3">
                <span>•</span>
                <span>Docker Desktop مثبت</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-16">
        <div className="p-8 rounded-2xl bg-gray-50 border-2 border-gray-200 border-r-4 border-r-blue-500">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-blue-600"><Icon name="warning" className="h-7 w-7" /></span>
            حل المشاكل الشائعة
          </h2>

          <div className="space-y-6 text-gray-800">
            <div>
              <h3 className="font-bold text-xl mb-2">المشكلة: "command not found"</h3>
              <p className="mb-2">الحل:</p>
              <ul className="mr-6 space-y-1">
                <li>• أعد فتح Terminal</li>
                <li>• تأكد من إضافة OpenClaw للـ PATH</li>
                <li>• جرب: <code className="px-2 py-1 bg-gray-800 rounded text-sm text-blue-300 font-mono" dir="ltr">source ~/.bashrc</code></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-2">المشكلة: أخطاء في الصلاحيات</h3>
              <p className="mb-2">الحل:</p>
              <ul className="mr-6 space-y-1">
                <li>• استخدم <code className="px-2 py-1 bg-gray-800 rounded text-sm text-blue-300 font-mono" dir="ltr">sudo</code> إذا لزم الأمر</li>
                <li>• أو ثبّت في مجلد المستخدم بدلاً من النظام</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-2">المشكلة: بطء في التثبيت</h3>
              <p className="mb-2">الحل:</p>
              <ul className="mr-6 space-y-1">
                <li>• تأكد من اتصال الإنترنت</li>
                <li>• جرب mirror آخر إذا كنت تستخدم npm</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="text-center py-12">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-t-4 border-blue-500">
          <h2 className="text-3xl font-bold text-white mb-4">نجح التثبيت؟</h2>
          <p className="text-xl text-white/90 mb-6">
            رائع! الآن اذهب للتوثيق لتتعلم كيف تستخدم OpenClaw
          </p>
          <a 
            href="https://docs.arabclaw.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            اذهب للتوثيق
          </a>
        </div>
      </section>
    </div>
  )
}
