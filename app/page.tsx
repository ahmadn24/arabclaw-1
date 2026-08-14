import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ArabClaw - المرجع العربي الأول لـ OpenClaw',
  description: 'ArabClaw هو المرجع العربي الأول لـ OpenClaw وبيت مجتمع المطورين العرب. أدلة تثبيت كاملة، وثائق عربية شاملة، و fork عربي مفتوح المصدر.',
  alternates: {
    canonical: 'https://arabclaw.com',
  },
}

const faqItems = [
  {
    question: 'ما هو ArabClaw؟',
    answer: 'ArabClaw هو المرجع العربي الأول لـ OpenClaw والبيت الرسمي لمجتمع المطورين العرب حول هذا المشروع مفتوح المصدر. يضم الموقع أدلة تثبيت كاملة، وثائق عربية شاملة، ومدونة تقنية متخصصة، فضلاً عن fork عربي من OpenClaw مصمم لخدمة 400 مليون ناطق بالعربية.',
  },
  {
    question: 'ما الفرق بين ArabClaw وOpenClaw؟',
    answer: 'OpenClaw هو المشروع الأصلي مفتوح المصدر لبناء وكلاء الذكاء الاصطناعي الشخصيين. ArabClaw هو في آنٍ واحد: (1) المرجع العربي الأول لتوثيق وشرح OpenClaw بالعربية، و(2) fork عربي من OpenClaw يُضيف دعماً كاملاً للغة العربية والثقافة العربية والخدمات المحلية.',
  },
  {
    question: 'كيف أثبّت OpenClaw على جهازي؟',
    answer: 'يوفر ArabClaw أدلة تثبيت تفصيلية لجميع أنظمة التشغيل: macOS وWindows وLinux وRaspberry Pi. توجّه إلى صفحة التثبيت للحصول على الدليل المناسب لنظامك.',
  },
  {
    question: 'هل ArabClaw مجاني؟',
    answer: 'نعم، ArabClaw مجاني 100% ومفتوح المصدر بالكامل. OpenClaw نفسه أيضاً مفتوح المصدر ومجاني. قد تحتاج فقط إلى مفاتيح API لنماذج الذكاء الاصطناعي (مثل Anthropic أو OpenAI) إذا أردت استخدام تلك النماذج.',
  },
  {
    question: 'من أنشأ ArabClaw؟',
    answer: 'أنشأ ArabClaw فريق Moutarjam عام 2026 بهدف جعل OpenClaw في متناول 400 مليون ناطق بالعربية، من خلال توفير الوثائق والأدلة والمجتمع باللغة العربية.',
  },
]

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <header
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,22,32,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,22,32,.045) 1px, transparent 1px), radial-gradient(700px 460px at 50% -8%, rgba(255,90,54,.10), transparent 62%)',
          backgroundSize: '26px 26px, 26px 26px, 100% 100%',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          {/* Logo dans une fenêtre libanaise (arc + oculi) */}
          <div className="relative mx-auto mb-8" style={{ width: 216, paddingTop: 66 }}>
            <svg
              className="absolute left-1/2 -translate-x-1/2 top-0"
              width="216" height="80" viewBox="0 0 216 80" preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M20 80 L20 52 C24 26 90 22 108 6 C126 22 192 26 196 52 L196 80" fill="none" stroke="#ff5a36" strokeWidth="2" />
              <path d="M31 80 L31 52 C35 33 92 29 108 17 C124 29 181 33 185 52 L185 80" fill="none" stroke="#ff8a6b" strokeWidth="1.1" opacity="0.85" />
              <circle cx="108" cy="5" r="3" fill="#ff5a36" />
              <circle cx="60" cy="27" r="5.5" fill="none" stroke="#ff5a36" strokeWidth="1.5" />
              <circle cx="156" cy="27" r="5.5" fill="none" stroke="#ff5a36" strokeWidth="1.5" />
            </svg>
            <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-white to-blue-50 flex items-center justify-center shadow-lg border-4 border-blue-200">
              <img
                src="/mascot.jpg"
                alt="ArabClaw Mascot"
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent leading-tight">
            ArabClaw
          </h1>

          {/* Description */}
          <p className="text-2xl text-gray-600 leading-relaxed mb-4" dir="rtl">
            بوابة عبر أنظمة التشغيل لوكلاء الذكاء الاصطناعي عبر WhatsApp و Telegram و Discord و iMessage والمزيد
          </p>

          {/* Citation */}
          <p className="text-lg text-gray-400 italic" dir="rtl">
            "EXFOLIATE! EXFOLIATE!" — جراد البحر الفخري على الأربح
          </p>
        </div>

        {/* bandeau moucharabieh */}
        <div className="border-y border-gray-200 bg-blue-50/40" style={{ height: 24 }}>
          <svg width="100%" height="24" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <pattern id="mashrabiya" width="44" height="44" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="#ff8a6b" strokeWidth="1.1">
                <path d="M22 4 L28 16 L40 22 L28 28 L22 40 L16 28 L4 22 L16 16 Z" />
                <rect x="14" y="14" width="16" height="16" transform="rotate(45 22 22)" />
              </g>
            </pattern>
            <rect width="100%" height="24" fill="url(#mashrabiya)" opacity="0.7" />
          </svg>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* ===== POSITIONING STATEMENT (GEO) ===== */}
        <div className="text-right mb-16" dir="rtl">
          <div
            className="relative overflow-hidden p-10 rounded-2xl text-white shadow-xl"
            style={{
              backgroundImage:
                'radial-gradient(560px 280px at 92% -20%, rgba(255,90,54,.5), transparent 60%), linear-gradient(135deg,#17202b,#0f1620)',
            }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-7 h-7 flex-none" viewBox="0 0 24 24" fill="none" stroke="#ff8a6b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4h12v3a6 6 0 0 1-12 0z"/><path d="M6 5H3v2a4 4 0 0 0 3 3.8"/><path d="M18 5h3v2a4 4 0 0 1-3 3.8"/><path d="M12 13v4"/><path d="M8 20h8"/><path d="M9 20v-1a3 3 0 0 1 6 0v1"/></svg>
              المرجع العربي الأول لـ OpenClaw
            </h2>
            <p className="text-lg leading-relaxed opacity-95">
              ArabClaw هو المرجع العربي الأول لـ OpenClaw وبيت مجتمع المطورين العرب.
              يضم الموقع أكثر من 20 مقالاً تقنياً، أدلة تثبيت كاملة لجميع أنظمة التشغيل،
              ووثائق عربية شاملة لكل مميزات OpenClaw.
            </p>
          </div>
        </div>

        {/* ===== STATS BLOCK (GEO - numbers are highly citable) ===== */}
        <div className="text-right mb-16" dir="rtl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">ArabClaw بالأرقام</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-blue-300 hover:shadow-lg transition-all">
              <span className="w-12 h-12 flex-none rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#e6431f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>
              </span>
              <div>
                <div className="text-3xl font-bold text-blue-700 mb-1">400 مليون</div>
                <div className="text-gray-700">متحدث عربي يمكنهم الاستفادة من ArabClaw</div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-blue-300 hover:shadow-lg transition-all">
              <span className="w-12 h-12 flex-none rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#e6431f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h7"/><path d="M9 17h7"/></svg>
              </span>
              <div>
                <div className="text-3xl font-bold text-blue-700 mb-1">+20</div>
                <div className="text-gray-700">مقالاً تقنياً ودليلاً عربياً متخصصاً</div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-blue-300 hover:shadow-lg transition-all">
              <span className="w-12 h-12 flex-none rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#e6431f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 0 1-11.5 7.2L4 20l.8-4.5A8 8 0 1 1 20 12z"/></svg>
              </span>
              <div>
                <div className="text-2xl font-bold text-blue-700 mb-1">5 منصات</div>
                <div className="text-gray-700">دعم كامل لـ WhatsApp وTelegram وDiscord وiMessage وSignal</div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-blue-300 hover:shadow-lg transition-all">
              <span className="w-12 h-12 flex-none rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#e6431f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/></svg>
              </span>
              <div>
                <div className="text-2xl font-bold text-blue-700 mb-1">4 أنظمة</div>
                <div className="text-gray-700">متوافق مع macOS وWindows وLinux وRaspberry Pi</div>
              </div>
            </div>
            <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-center gap-4 justify-center">
              <span className="w-12 h-12 flex-none rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#e6431f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l8 4v5c0 5-3.5 8-8 9c-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/></svg>
              </span>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">مجاني 100%</div>
                <div className="text-gray-700">ArabClaw و OpenClaw مفتوحا المصدر بالكامل</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section "ما هو OpenClaw?" */}
        <div className="text-right mb-16" dir="rtl">
          <div className="bg-gray-50 border border-gray-200 border-r-4 border-r-blue-500 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ما هو OpenClaw؟
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              OpenClaw هو إطار عمل مفتوح المصدر يحوّل Claude Sonnet وغيره من نماذج اللغة الكبيرة إلى وكلاء ذكاء اصطناعي شخصيين يمكنهم التفاعل عبر منصات المراسلة المفضلة لديك.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              يعمل OpenClaw كجسر بين عالم الذكاء الاصطناعي وتطبيقات المراسلة اليومية، مما يتيح لك التواصل مع وكيلك الذكي من أي مكان.
            </p>
          </div>
        </div>

        {/* Section "هل OpenClaw مجاني؟" */}
        <div className="text-right mb-16" dir="rtl">
          <div className="bg-gray-50 border border-gray-200 border-r-4 border-r-blue-500 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              هل OpenClaw مجاني؟
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              نعم، OpenClaw مفتوح المصدر ومجاني تماماً. ومع ذلك، قد تحتاج إلى دفع تكاليف:
            </p>
            <ul className="text-lg text-gray-700 space-y-2 mr-6">
              <li>• API keys لنماذج الذكاء الاصطناعي (Anthropic، OpenAI)</li>
              <li>• الاستضافة (إذا شغّلت على السحابة)</li>
              <li>• بعض خدمات القنوات (WhatsApp Business API)</li>
            </ul>
          </div>
        </div>

        {/* Section "حقيقة ممتعة" */}
        <div className="text-right mb-16" dir="rtl">
          <div className="bg-gray-50 border border-gray-200 border-r-4 border-r-blue-500 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              حقيقة ممتعة
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              تاليعة OpenClaw هو جراد البحر. لماذا؟ لأن الجراد يمسك ويتمسك بالأشياء — تماماً كما يتمسك OpenClaw بسياقك ومحادثاتك. زائد، الجراد رائع.
            </p>
          </div>
        </div>

        {/* ===== MINI-FAQ (GEO - LLMs extract these constantly) ===== */}
        <div className="text-right mb-16" dir="rtl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
                <h3 className="text-xl font-bold text-blue-700 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/faq"
              className="inline-block px-6 py-3 bg-white border-2 border-blue-500 text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              عرض جميع الأسئلة الشائعة ←
            </Link>
          </div>
        </div>

        {/* Liens rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" dir="rtl">
          <a
            href="https://docs.arabclaw.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border border-gray-200 rounded-xl bg-white hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all text-right"
          >
            <div className="w-13 h-13 mb-4 rounded-xl bg-blue-50 inline-flex items-center justify-center" style={{ width: 52, height: 52 }}>
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#e6431f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">التوثيق</h3>
            <p className="text-gray-600">دليل شامل لكل ما تحتاج معرفته</p>
          </a>

          <Link
            href="/guides"
            className="p-8 border border-gray-200 rounded-xl bg-white hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all text-right"
          >
            <div className="mb-4 rounded-xl bg-blue-50 inline-flex items-center justify-center" style={{ width: 52, height: 52 }}>
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#e6431f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z"/><path d="M9 4v14"/><path d="M15 6v14"/></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">الأدلة</h3>
            <p className="text-gray-600">جميع أدلة التثبيت والاستخدام</p>
          </Link>

          <Link
            href="/blog"
            className="p-8 border border-gray-200 rounded-xl bg-white hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all text-right"
          >
            <div className="mb-4 rounded-xl bg-blue-50 inline-flex items-center justify-center" style={{ width: 52, height: 52 }}>
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#e6431f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="M8 9h8"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">المدونة</h3>
            <p className="text-gray-600">نصائح، دروس، وآخر الأخبار</p>
          </Link>
        </div>

        {/* CTA final */}
        <div
          className="relative overflow-hidden rounded-2xl p-12 text-center text-white"
          style={{
            backgroundImage:
              'radial-gradient(600px 320px at 50% -20%, rgba(255,90,54,.5), transparent 60%), linear-gradient(135deg,#17202b,#0f1620)',
          }}
        >
          <h2 className="text-3xl font-bold mb-6" dir="rtl">
            جاهز للبدء؟
          </h2>
          <p className="text-xl opacity-90 mb-8" dir="rtl">
            انضم لآلاف المستخدمين العرب الذين يستخدمون OpenClaw يومياً
          </p>
          <Link
            href="/install"
            className="inline-block px-8 py-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            ابدأ التثبيت الآن
          </Link>
        </div>
      </div>
    </div>
  )
}
