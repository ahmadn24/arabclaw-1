import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'أدلة OpenClaw وArabClaw — تثبيت، استخدام، وتكامل',
  description: 'مركز أدلة ArabClaw: تثبيت OpenClaw على macOS وWindows وLinux وRaspberry Pi وVPS، أدلة الاستخدام، وتكامل WhatsApp وTelegram وDiscord.',
  alternates: {
    canonical: 'https://arabclaw.com/guides',
  },
}

const installGuides = [
  {
    title: 'تثبيت OpenClaw على macOS',
    description: 'دليل تفصيلي مع صور توضيحية لتثبيت OpenClaw على Mac — Apple Silicon وIntel',
    href: '/blog/install-macos-visuel',
    emoji: '🍎',
    level: 'مبتدئ',
    time: '15 دقيقة',
  },
  {
    title: 'تثبيت OpenClaw على Windows',
    description: 'خطوة بخطوة لتثبيت وتشغيل OpenClaw على Windows 10 و11',
    href: '/blog/2026-02-18-install-openclaw-windows',
    emoji: '🪟',
    level: 'مبتدئ',
    time: '20 دقيقة',
  },
  {
    title: 'تثبيت OpenClaw على Linux (Ubuntu)',
    description: 'دليل شامل لتثبيت OpenClaw على Ubuntu وDebian وغيرهما من توزيعات Linux',
    href: '/blog/2026-02-11-install-openclaw-linux-ubuntu',
    emoji: '🐧',
    level: 'متوسط',
    time: '20 دقيقة',
  },
  {
    title: 'تثبيت OpenClaw على VPS',
    description: 'شغّل وكيلك الذكي 24/7 على خادم سحابي — DigitalOcean أو Hetzner أو غيرهما',
    href: '/blog/install-openclaw-vps',
    emoji: '☁️',
    level: 'متقدم',
    time: '30 دقيقة',
  },
  {
    title: 'تثبيت OpenClaw على Raspberry Pi',
    description: 'حوّل Raspberry Pi إلى وكيل ذكاء اصطناعي شخصي يعمل طوال الوقت بتكلفة زهيدة',
    href: '/install',
    emoji: '🍓',
    level: 'متوسط',
    time: '25 دقيقة',
  },
]

const usageGuides = [
  {
    title: 'دليل المبتدئين — أول 30 دقيقة مع OpenClaw',
    description: 'من الصفر إلى وكيل ذكاء اصطناعي شخصي يعمل معك — دليل الانطلاق السريع',
    href: '/blog/beginners-guide',
    emoji: '🚀',
    level: 'مبتدئ',
  },
  {
    title: 'إنشاء أول Skill لوكيلك',
    description: 'تعلّم كيف تبني قدرة جديدة لوكيلك الذكي — مقدمة في Skills API',
    href: '/blog/create-first-skill',
    emoji: '🔧',
    level: 'متوسط',
  },
  {
    title: 'أفضل Skills للمستخدمين العرب',
    description: 'قائمة مختارة بأفضل Skills لـ OpenClaw تناسب الاحتياجات العربية',
    href: '/blog/best-skills-arabic',
    emoji: '⭐',
    level: 'مبتدئ',
  },
  {
    title: 'أتمتة المهام مع Cron Jobs',
    description: 'جدوَل مهاماً تلقائية تُنفَّذ في أوقات محددة — تقارير يومية، تذكيرات، وأكثر',
    href: '/blog/2026-02-15-cron-jobs-automation-guide',
    emoji: '⏰',
    level: 'متوسط',
  },
  {
    title: 'إنشاء مساعد ذكاء اصطناعي شخصي',
    description: 'صمّم شخصية وكيلك وذاكرته وأسلوبه ليناسب احتياجاتك تماماً',
    href: '/blog/2026-02-13-create-personal-ai-assistant',
    emoji: '🤖',
    level: 'متوسط',
  },
  {
    title: 'أتمتة البريد الإلكتروني',
    description: 'اجعل وكيلك يقرأ بريدك ويردّ عليه ويصنّفه بذكاء',
    href: '/blog/email-automation-openclaw',
    emoji: '📧',
    level: 'متقدم',
  },
  {
    title: 'أتمتة المنزل الذكي',
    description: 'ربط OpenClaw بأجهزة المنزل الذكي والتحكم فيها بالأوامر الطبيعية',
    href: '/blog/2026-02-12-smart-home-automation-openclaw',
    emoji: '🏠',
    level: 'متقدم',
  },
]

const integrationGuides = [
  {
    title: 'OpenClaw مع WhatsApp',
    description: 'ربط وكيلك بـ WhatsApp الشخصي أو Business — خطوة بخطوة',
    href: '/blog/2026-02-08-whatsapp-automation-guide',
    emoji: '💚',
    platform: 'WhatsApp',
  },
  {
    title: 'OpenClaw مع Telegram',
    description: 'إنشاء بوت Telegram متكامل مع وكيل OpenClaw الذكي',
    href: '/blog/openclaw-telegram',
    emoji: '✈️',
    platform: 'Telegram',
  },
  {
    title: 'OpenClaw مع Himalaya (البريد)',
    description: 'تكامل OpenClaw مع Himalaya لأتمتة البريد الإلكتروني من سطر الأوامر',
    href: '/blog/2026-02-16-email-automation-himalaya',
    emoji: '📬',
    platform: 'Email',
  },
]

const comparisons = [
  {
    title: 'OpenClaw مقابل Zapier',
    description: 'مقارنة شاملة: متى تستخدم OpenClaw ومتى تستخدم Zapier؟',
    href: '/blog/2026-02-09-openclaw-vs-zapier-comparison',
    emoji: '⚡',
  },
  {
    title: 'OpenClaw مقابل Make (Integromat)',
    description: 'الفروق الجوهرية بين OpenClaw وMake، وأيهما أنسب لك',
    href: '/blog/2026-02-09-openclaw-vs-make-comparison',
    emoji: '🔄',
  },
  {
    title: 'OpenClaw مقابل n8n',
    description: 'مقارنة بين حلَّين مفتوحَي المصدر للأتمتة — OpenClaw ضد n8n',
    href: '/blog/2026-02-17-openclaw-vs-n8n-comparison',
    emoji: '🔀',
  },
]

const levelColors: Record<string, string> = {
  'مبتدئ': 'bg-green-100 text-green-800',
  'متوسط': 'bg-yellow-100 text-yellow-800',
  'متقدم': 'bg-red-100 text-red-800',
}

export default function GuidesPage() {
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'أدلة OpenClaw بالعربية',
    description: 'مجموعة شاملة من أدلة تثبيت واستخدام وتكامل OpenClaw باللغة العربية',
    url: 'https://arabclaw.com/guides',
    numberOfItems: installGuides.length + usageGuides.length + integrationGuides.length + comparisons.length,
    itemListElement: [
      ...installGuides.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: g.title,
        description: g.description,
        url: `https://arabclaw.com${g.href}`,
      })),
      ...usageGuides.map((g, i) => ({
        '@type': 'ListItem',
        position: installGuides.length + i + 1,
        name: g.title,
        description: g.description,
        url: `https://arabclaw.com${g.href}`,
      })),
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16" dir="rtl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🗺️</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            مركز الأدلة
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            جميع أدلة تثبيت واستخدام وتكامل OpenClaw باللغة العربية — من المبتدئ إلى المتقدم
          </p>
        </div>

        {/* Stats bar */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-16 flex flex-wrap gap-6 justify-center text-center">
          <div>
            <div className="text-3xl font-bold text-blue-700">{installGuides.length}</div>
            <div className="text-gray-600 text-sm">أدلة تثبيت</div>
          </div>
          <div className="border-r border-blue-200"></div>
          <div>
            <div className="text-3xl font-bold text-blue-700">{usageGuides.length}</div>
            <div className="text-gray-600 text-sm">أدلة استخدام</div>
          </div>
          <div className="border-r border-blue-200"></div>
          <div>
            <div className="text-3xl font-bold text-blue-700">{integrationGuides.length}</div>
            <div className="text-gray-600 text-sm">أدلة تكامل</div>
          </div>
          <div className="border-r border-blue-200"></div>
          <div>
            <div className="text-3xl font-bold text-blue-700">{comparisons.length}</div>
            <div className="text-gray-600 text-sm">مقارنات</div>
          </div>
        </div>

        {/* Section 1: Installation Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3 border-b-2 border-blue-100 pb-4">
            <span>⚙️</span>
            <span>أدلة التثبيت</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {installGuides.map((guide, index) => (
              <Link
                key={index}
                href={guide.href}
                className="border border-gray-200 rounded-xl p-6 bg-white hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{guide.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 mb-2 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {guide.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[guide.level]}`}>
                        {guide.level}
                      </span>
                      <span className="text-gray-400 text-xs">⏱ {guide.time}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Usage Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3 border-b-2 border-green-100 pb-4">
            <span>📖</span>
            <span>أدلة الاستخدام</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {usageGuides.map((guide, index) => (
              <Link
                key={index}
                href={guide.href}
                className="border border-gray-200 rounded-xl p-6 bg-white hover:border-green-400 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{guide.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 mb-2 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {guide.description}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[guide.level]}`}>
                      {guide.level}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: Integration Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3 border-b-2 border-purple-100 pb-4">
            <span>🔌</span>
            <span>أدلة التكامل</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {integrationGuides.map((guide, index) => (
              <Link
                key={index}
                href={guide.href}
                className="border border-gray-200 rounded-xl p-6 bg-white hover:border-purple-400 hover:shadow-lg transition-all group text-center"
              >
                <span className="text-5xl block mb-4">{guide.emoji}</span>
                <div className="text-xs font-medium text-purple-600 mb-2 bg-purple-50 px-2 py-1 rounded-full inline-block">
                  {guide.platform}
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-700 mb-2 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: Comparisons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3 border-b-2 border-orange-100 pb-4">
            <span>⚖️</span>
            <span>مقارنات</span>
          </h2>
          <p className="text-gray-600 mb-6">
            هل تتساءل كيف يقارن OpenClaw بأدوات الأتمتة الأخرى؟ إليك مقارنات موضوعية:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisons.map((guide, index) => (
              <Link
                key={index}
                href={guide.href}
                className="border border-gray-200 rounded-xl p-6 bg-white hover:border-orange-400 hover:shadow-lg transition-all group text-center"
              >
                <span className="text-5xl block mb-4">{guide.emoji}</span>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-700 mb-2 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="border-2 border-blue-500 rounded-xl p-10 bg-blue-50 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            جاهز للانطلاق؟
          </h2>
          <p className="text-gray-700 mb-6">
            ابدأ بدليل التثبيت المناسب لنظامك، أو تصفّح مدونتنا للمزيد من المقالات
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/install"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              ابدأ التثبيت
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              تصفّح المدونة
            </Link>
            <Link
              href="/faq"
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              الأسئلة الشائعة
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
