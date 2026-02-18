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

      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-lg border-4 border-blue-200">
            <img 
              src="/mascot.jpg" 
              alt="ArabClaw Mascot" 
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          ArabClaw
        </h1>

        {/* Description */}
        <p className="text-2xl text-gray-600 leading-relaxed mb-4" dir="rtl">
          بوابة عبر أنظمة التشغيل لوكلاء الذكاء الاصطناعي عبر WhatsApp و Telegram و Discord و iMessage والمزيد
        </p>

        {/* Citation */}
        <p className="text-lg text-gray-400 italic mb-16" dir="rtl">
          "EXFOLIATE! EXFOLIATE!" — جراد البحر الفخري على الأربح
        </p>

        {/* ===== POSITIONING STATEMENT (GEO) ===== */}
        <div className="text-right mb-16" dir="rtl">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
              🏆 المرجع العربي الأول لـ OpenClaw
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
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4">
              <span className="text-4xl">🌍</span>
              <div>
                <div className="text-3xl font-bold text-blue-700 mb-1">400 مليون</div>
                <div className="text-gray-700">متحدث عربي يمكنهم الاستفادة من ArabClaw</div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4">
              <span className="text-4xl">📝</span>
              <div>
                <div className="text-3xl font-bold text-green-700 mb-1">+20</div>
                <div className="text-gray-700">مقالاً تقنياً ودليلاً عربياً متخصصاً</div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 flex items-start gap-4">
              <span className="text-4xl">💬</span>
              <div>
                <div className="text-2xl font-bold text-purple-700 mb-1">5 منصات</div>
                <div className="text-gray-700">دعم كامل لـ WhatsApp وTelegram وDiscord وiMessage وSignal</div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 flex items-start gap-4">
              <span className="text-4xl">💻</span>
              <div>
                <div className="text-2xl font-bold text-orange-700 mb-1">4 أنظمة</div>
                <div className="text-gray-700">متوافق مع macOS وWindows وLinux وRaspberry Pi</div>
              </div>
            </div>
            <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-center gap-4 justify-center">
              <span className="text-4xl">🆓</span>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">مجاني 100%</div>
                <div className="text-gray-700">ArabClaw و OpenClaw مفتوحا المصدر بالكامل</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section "ما هو OpenClaw?" */}
        <div className="text-right mb-16" dir="rtl">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-lg">
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
          <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-r-lg">
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
          <div className="bg-purple-50 border-l-4 border-purple-500 p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              حقيقة ممتعة 🦞
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
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <a
            href="https://docs.arabclaw.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">التوثيق</h3>
            <p className="text-gray-600">دليل شامل لكل ما تحتاج معرفته</p>
          </a>

          <Link
            href="/guides"
            className="p-8 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">الأدلة</h3>
            <p className="text-gray-600">جميع أدلة التثبيت والاستخدام</p>
          </Link>

          <Link
            href="/blog"
            className="p-8 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">المدونة</h3>
            <p className="text-gray-600">نصائح، دروس، وآخر الأخبار</p>
          </Link>
        </div>

        {/* CTA final */}
        <div className="border-2 border-blue-500 rounded-xl p-12 bg-blue-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-6" dir="rtl">
            جاهز للبدء؟
          </h2>
          <p className="text-xl text-gray-700 mb-8" dir="rtl">
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
