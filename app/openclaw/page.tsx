import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ما هو OpenClaw (أوبن كلاو)؟ — الدليل العربي الشامل 2026',
  description: 'شرح شامل لـ OpenClaw (أوبن كلاو): ما هو، كيف يعمل، الفرق عن ChatGPT وMake وZapier، كيف تثبته، وكيف يغير حياتك اليومية. أكثر من 2000 كلمة باللغة العربية.',
  keywords: [
    'ما هو OpenClaw', 'أوبن كلاو', 'OpenClaw بالعربي', 'شرح OpenClaw',
    'وكيل ذكاء اصطناعي شخصي', 'OpenClaw مقابل ChatGPT', 'تثبيت OpenClaw',
    'أتمتة WhatsApp', 'وكيل ذكي', 'ArabClaw'
  ],
  alternates: {
    canonical: 'https://arabclaw.com/openclaw',
  },
  openGraph: {
    title: 'ما هو OpenClaw (أوبن كلاو)؟ — الدليل العربي الشامل 2026',
    description: 'شرح شامل لـ OpenClaw: ما هو، كيف يعمل، وكيف يغير حياتك اليومية بالذكاء الاصطناعي.',
    url: 'https://arabclaw.com/openclaw',
    type: 'article',
  },
}

const stats = [
  { number: '40,000+', label: 'مستخدم نشط حول العالم', emoji: '👥' },
  { number: '10+', label: 'نموذج ذكاء اصطناعي مدعوم', emoji: '🤖' },
  { number: '6+', label: 'منصات مراسلة: WhatsApp، Telegram، Discord...', emoji: '💬' },
  { number: '100%', label: 'مفتوح المصدر — مجاني تماماً', emoji: '🔓' },
]

const features = [
  {
    title: 'وكيل ذكي دائم التشغيل',
    desc: 'OpenClaw يعمل 24/7 على خادمك أو حاسوبك، ويستقبل رسائلك في WhatsApp وTelegram وDiscord ويرد عليها بذكاء.',
    emoji: '⚡',
  },
  {
    title: 'ذاكرة دائمة وشخصية',
    desc: 'يتذكر OpenClaw تفضيلاتك، قراراتك، مشاريعك — كل شيء محفوظ في ملفات على جهازك لا على خوادم خارجية.',
    emoji: '🧠',
  },
  {
    title: 'يتحكم في متصفحك وتطبيقاتك',
    desc: 'يمكن لـ OpenClaw فتح المواقع، قراءة الإيميلات، ملء النماذج، ونشر التغريدات — كل ذلك بأوامر لغة طبيعية.',
    emoji: '🖥️',
  },
  {
    title: 'أتمتة المهام المتكررة',
    desc: 'جدول مهام تلقائية: "أرسل لي ملخص الأخبار كل صباح الساعة 8"، "ذكرني بموعد الاجتماع قبل ساعة".',
    emoji: '⏰',
  },
  {
    title: 'أدوات قابلة للتوسعة — Skills',
    desc: 'أضف مهارات جديدة لوكيلك: البريد الإلكتروني، الأخبار، الطقس، GitHub، الأسواق المالية، وأكثر.',
    emoji: '🧩',
  },
  {
    title: 'محلي أولاً — بياناتك آمنة',
    desc: 'OpenClaw يعمل على جهازك. بياناتك لا تُرسل لأي شركة — فقط لنموذج الذكاء الاصطناعي الذي تختاره.',
    emoji: '🔐',
  },
]

const comparisons = [
  {
    tool: 'ChatGPT',
    openclaw: 'وكيل شخصي دائم بذاكرة طويلة، يعمل في WhatsApp وTelegram',
    other: 'محادثة عبر المتصفح، بدون ذاكرة طويلة، لا يعمل في تطبيقات المراسلة',
    winner: 'openclaw',
  },
  {
    tool: 'Make / Zapier',
    openclaw: 'وكيل ذكي يفهم اللغة الطبيعية ويتخذ قرارات ذاتية',
    other: 'أتمتة جامدة بقواعد صارمة، بدون فهم لغوي حقيقي',
    winner: 'openclaw',
  },
  {
    tool: 'Siri / Google Assistant',
    openclaw: 'قابل للتخصيص الكامل، يعمل مع أي نموذج AI، مفتوح المصدر',
    other: 'مغلق المصدر، محدود القدرات، لا يمكن برمجته',
    winner: 'openclaw',
  },
  {
    tool: 'AutoGPT / AgentGPT',
    openclaw: 'مستقر، موثوق، مع تحكم بشري واضح وتكامل مع تطبيقاتك الفعلية',
    other: 'تجريبي، غير مستقر، يصعب دمجه في حياتك اليومية',
    winner: 'openclaw',
  },
]

const faqs = [
  {
    q: 'ما هو OpenClaw (أوبن كلاو) بالضبط؟',
    a: 'OpenClaw (أوبن كلاو) هو إطار عمل مفتوح المصدر يحوّل نماذج الذكاء الاصطناعي الكبيرة — مثل كلود (Claude) من Anthropic، وGPT-4 من OpenAI، وGemini من Google — إلى وكلاء ذكاء اصطناعي شخصيين يعملون عبر WhatsApp وTelegram وDiscord وغيرها. الوكيل يعمل 24/7 على جهازك، ويتذكر كل شيء، ويمكنه التحكم في متصفحك وإرسال إيميلات ونشر تغريدات بأوامر لغة طبيعية.',
  },
  {
    q: 'كيف يختلف OpenClaw عن ChatGPT؟',
    a: 'ChatGPT هو موقع للمحادثة تفتحه في المتصفح. OpenClaw (أوبن كلاو) هو وكيل شخصي يعمل في تطبيقاتك اليومية مثل WhatsApp وTelegram، لديه ذاكرة طويلة الأمد، ويمكنه تنفيذ مهام تلقائية بدون تدخل منك. كما أن OpenClaw مفتوح المصدر وتتحكم أنت في بياناتك.',
  },
  {
    q: 'هل OpenClaw مجاني؟',
    a: 'نعم، OpenClaw (أوبن كلاو) مفتوح المصدر ومجاني 100%. أنت فقط تدفع مقابل مفاتيح API لنماذج الذكاء الاصطناعي التي تختار استخدامها (مثل Anthropic API أو OpenAI API)، وهذه تكاليف منخفضة جداً — أقل من دولار في اليوم للاستخدام المعتاد.',
  },
  {
    q: 'على أي أنظمة تشغيل يعمل OpenClaw؟',
    a: 'OpenClaw (أوبن كلاو) يعمل على macOS وWindows وLinux وRaspberry Pi وأي VPS. يتطلب Node.js v18 أو أحدث.',
  },
  {
    q: 'هل بياناتي آمنة مع OpenClaw؟',
    a: 'OpenClaw (أوبن كلاو) مصمم محلياً أولاً. ذاكرة الوكيل مخزنة في ملفات على جهازك، لا في خوادم خارجية. البيانات الوحيدة التي تخرج هي الرسائل التي ترسلها لنموذج الذكاء الاصطناعي الذي اخترته (Anthropic أو OpenAI...)، وهذا يخضع لسياسة خصوصية تلك الشركة.',
  },
  {
    q: 'ما الفرق بين OpenClaw وArabClaw؟',
    a: 'OpenClaw (أوبن كلاو) هو المشروع الأصلي مفتوح المصدر. ArabClaw هو المرجع العربي الأول لتوثيق OpenClaw وشرحه بالعربية، بالإضافة إلى كونه fork (نسخة مشتقة) من OpenClaw مُحسَّنة للعالم العربي.',
  },
]

export default function OpenClawPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://arabclaw.com/openclaw',
    'headline': 'ما هو OpenClaw (أوبن كلاو)؟ — الدليل العربي الشامل 2026',
    'description': 'شرح شامل لـ OpenClaw: ما هو، كيف يعمل، الفرق عن ChatGPT، وكيف يغير حياتك.',
    'inLanguage': 'ar',
    'datePublished': '2026-02-18',
    'dateModified': '2026-02-18',
    'author': { '@type': 'Organization', 'name': 'ArabClaw', 'url': 'https://arabclaw.com' },
    'publisher': { '@type': 'Organization', 'name': 'ArabClaw', 'url': 'https://arabclaw.com' },
    'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://arabclaw.com/openclaw' },
    'about': {
      '@type': 'SoftwareApplication',
      'name': 'OpenClaw',
      'alternateName': 'أوبن كلاو',
      'url': 'https://openclaw.ai',
      'applicationCategory': 'AIApplication',
      'operatingSystem': 'macOS, Windows, Linux, Raspberry Pi',
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
      'description': 'Open source framework to build personal AI agents for WhatsApp, Telegram, Discord and more.',
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((f) => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
    })),
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            الدليل العربي الشامل — 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            ما هو <span className="text-blue-600">OpenClaw</span> (أوبن كلاو)؟
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            أوبن كلاو (OpenClaw) هو إطار عمل مفتوح المصدر يحوّل نماذج الذكاء الاصطناعي الكبيرة إلى
            وكلاء شخصيين يعملون في WhatsApp وTelegram وDiscord — يتذكرون كل شيء، ويتصرفون نيابةً عنك.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/install" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              ابدأ التثبيت مجاناً ←
            </Link>
            <Link href="/faq" className="bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              الأسئلة الشائعة
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-2">{s.emoji}</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">{s.number}</div>
              <div className="text-sm text-gray-500 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What is OpenClaw — Dense explanation */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            شرح تفصيلي: ماذا يفعل أوبن كلاو (OpenClaw)؟
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              <strong>أوبن كلاو (OpenClaw)</strong> هو برنامج مفتوح المصدر تثبّته على حاسوبك أو خادمك،
              فيصبح لديك "موظف رقمي" دائم التشغيل يستقبل رسائلك في تطبيقات المراسلة التي تستخدمها
              يومياً — WhatsApp وTelegram وDiscord وSignal وiMessage وSlack — ويرد عليها بذكاء حقيقي.
            </p>

            <p className="text-lg leading-relaxed">
              عكس ChatGPT الذي تفتحه في المتصفح وتبدأ كل مرة من الصفر، <strong>أوبن كلاو (OpenClaw)</strong> يتذكر
              تاريخك الكامل معه: مشاريعك، تفضيلاتك، قراراتك، مواعيدك — كل شيء محفوظ في ملفات على
              جهازك أنت، لا على خوادم شركات أجنبية.
            </p>

            <p className="text-lg leading-relaxed">
              يعمل <strong>أوبن كلاو (OpenClaw)</strong> مع أقوى نماذج الذكاء الاصطناعي في العالم: كلود (Claude)
              من Anthropic، GPT-4 وGPT-4o من OpenAI، Gemini من Google، وغيرها. أنت تختار النموذج
              الذي تثق به أو الأرخص بالنسبة لك.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">كيف يعمل أوبن كلاو تقنياً؟</h3>
            <p className="text-lg leading-relaxed">
              يعمل <strong>أوبن كلاو (OpenClaw)</strong> كـ"gateway" (بوابة ذكية) بين تطبيقات مراسلتك ونموذج
              الذكاء الاصطناعي. عندما ترسل رسالة في WhatsApp، تصل إلى OpenClaw على جهازك، يُغني
              النموذج بسياق ذاكرتك الشخصية ثم يرسل الطلب لـ API الذكاء الاصطناعي، ويعيد الرد إليك
              في ثوانٍ. كل هذا مع إمكانية تنفيذ "actions" حقيقية: إرسال إيميل، فتح موقع، إنشاء ملف.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">من يستخدم أوبن كلاو؟</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { emoji: '👨‍💼', title: 'رجال الأعمال', desc: 'يستخدمونه لمعالجة الإيميلات، متابعة المشاريع، إعداد التقارير — كل ذلك بأوامر WhatsApp.' },
                { emoji: '👩‍💻', title: 'المطورون', desc: 'يبنون أدوات مخصصة، يراجعون الكود، يتتبعون GitHub — بدون مغادرة تطبيقات المراسلة.' },
                { emoji: '📝', title: 'كتّاب المحتوى', desc: 'يكتبون، يترجمون، ينشرون تغريدات — بوكيل يتعلم أسلوبهم مع الوقت.' },
                { emoji: '🏥', title: 'المهنيون الصحيون', desc: 'يديرون مواعيدهم، يسجلون ملاحظات المرضى، يتتبعون الوصفات — بذكاء اصطناعي متخصص.' },
              ].map((u) => (
                <div key={u.title} className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl mb-2">{u.emoji}</div>
                  <div className="font-bold text-gray-900 mb-1">{u.title}</div>
                  <div className="text-sm text-gray-600">{u.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            أبرز ميزات أوبن كلاو (OpenClaw)
          </h2>
          <p className="text-center text-gray-500 mb-10">ما يميّزه عن كل أدوات الذكاء الاصطناعي الأخرى</p>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            أوبن كلاو (OpenClaw) مقابل البدائل
          </h2>
          <p className="text-gray-500 mb-8">مقارنة موضوعية مع الأدوات الأكثر شيوعاً</p>

          <div className="space-y-4">
            {comparisons.map((c) => (
              <div key={c.tool} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 font-bold text-gray-700 text-lg border-b border-gray-200">
                  OpenClaw مقابل {c.tool}
                </div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-6 border-l border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600 font-bold text-sm">✅ OpenClaw (أوبن كلاو)</span>
                    </div>
                    <p className="text-sm text-gray-700">{c.openclaw}</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500 font-bold text-sm">⚪ {c.tool}</span>
                    </div>
                    <p className="text-sm text-gray-600">{c.other}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to install */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            كيف تثبّت أوبن كلاو (OpenClaw)؟
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            التثبيت يستغرق أقل من 5 دقائق. متطلبات بسيطة: Node.js v18+ ومفتاح API لنموذج الذكاء الاصطناعي الذي تختاره.
          </p>
          <div className="bg-white rounded-xl p-6 text-right mb-8 border border-blue-100">
            <div className="font-mono text-sm text-gray-800 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-green-500 font-bold">$</span>
                <code>npm install -g openclaw</code>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500 font-bold">$</span>
                <code>openclaw setup</code>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500 font-bold">$</span>
                <code>openclaw gateway start</code>
              </div>
            </div>
          </div>
          <Link href="/install" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors">
            دليل التثبيت التفصيلي ←
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            أسئلة شائعة عن أوبن كلاو (OpenClaw)
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="border border-gray-200 rounded-xl overflow-hidden group">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-gray-900 hover:bg-gray-50">
                  <span>{f.q}</span>
                  <span className="text-blue-500 text-xl">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {f.a}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/faq" className="text-blue-600 hover:underline font-semibold">
              المزيد من الأسئلة الشائعة ←
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">جرّب أوبن كلاو (OpenClaw) اليوم</h2>
          <p className="text-blue-100 mb-8 text-lg">
            مجاني، مفتوح المصدر، يعمل في دقائق. انضم لأكثر من 40,000 مستخدم حول العالم.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/install" className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              ابدأ مجاناً ←
            </Link>
            <Link href="/blog" className="border border-blue-300 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              اقرأ المدونة
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
