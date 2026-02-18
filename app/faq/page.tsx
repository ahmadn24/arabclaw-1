import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة — ArabClaw وOpenClaw بالعربية',
  description: 'إجابات شاملة على أكثر من 15 سؤالاً حول ArabClaw وOpenClaw: التثبيت، المنصات المدعومة، الفرق عن ChatGPT، الأسعار، المجتمع، والمزيد.',
  alternates: {
    canonical: 'https://arabclaw.com/faq',
  },
}

const faqCategories = [
  {
    title: 'ما هو OpenClaw وArabClaw؟',
    emoji: '🤔',
    questions: [
      {
        question: 'ما هو OpenClaw؟',
        answer: 'OpenClaw هو إطار عمل مفتوح المصدر يحوّل نماذج الذكاء الاصطناعي الكبيرة — مثل Claude من Anthropic، وGPT-4 من OpenAI، وGemini من Google — إلى وكلاء ذكاء اصطناعي شخصيين. هؤلاء الوكلاء يعملون عبر تطبيقات المراسلة التي تستخدمها يومياً: WhatsApp وTelegram وDiscord وiMessage وSignal وغيرها. OpenClaw هو المشروع الذي يجعل الذكاء الاصطناعي حاضراً في محادثاتك اليومية.',
      },
      {
        question: 'ما هو ArabClaw؟',
        answer: 'ArabClaw هو في آنٍ واحد شيئان: أولاً، المرجع العربي الأول لـ OpenClaw — الموقع الأكثر شمولاً باللغة العربية لتوثيق وشرح وتعليم كيفية استخدام OpenClaw. ثانياً، fork عربي مفتوح المصدر من OpenClaw، صُمِّم خصيصاً لخدمة 400 مليون ناطق بالعربية من خلال إضافة دعم كامل للغة العربية والثقافة العربية والخدمات المحلية.',
      },
      {
        question: 'ما الفرق بين ArabClaw وOpenClaw؟',
        answer: 'OpenClaw هو المشروع الأصلي الدولي. ArabClaw هو الامتداد العربي له، ويختلف في جانبين: من ناحية المحتوى، يوفر ArabClaw الوثائق والأدلة والمدونة التقنية باللغة العربية؛ ومن ناحية البرمجيات، يضيف fork ArabClaw دعماً للعربية (RTL، معالجة النصوص العربية)، وتكاملاً مع الخدمات المحلية العربية، وسلوكيات وكيل مكيّفة ثقافياً.',
      },
      {
        question: 'ما الفرق بين ArabClaw وChatGPT أو Claude؟',
        answer: 'ChatGPT وClaude هما واجهات محادثة مباشرة مع نماذج ذكاء اصطناعي. OpenClaw (وArabClaw) هو إطار عمل يسمح لك ببناء وكيل ذكاء اصطناعي شخصي خاص بك يعمل على نماذج مثل Claude أو GPT-4، لكنه يعيش في تطبيقات المراسلة اليومية كـ WhatsApp وTelegram، ولديه ذاكرة طويلة الأمد، ويمكنه تنفيذ مهام تلقائية، وتكامل مع أدوات خارجية، وتخصيص كامل لشخصيته وقدراته.',
      },
      {
        question: 'من أنشأ ArabClaw؟',
        answer: 'أنشأ ArabClaw فريق Moutarjam عام 2026 بهدف جعل OpenClaw في متناول 400 مليون ناطق بالعربية. الفريق مؤمن بأن الذكاء الاصطناعي يجب أن يكون متاحاً للجميع بلغاتهم الأصلية، وأن المجتمع العربي التقني يستحق مرجعاً متخصصاً يخدم احتياجاته.',
      },
    ],
  },
  {
    title: 'التثبيت والمتطلبات التقنية',
    emoji: '⚙️',
    questions: [
      {
        question: 'ما هي متطلبات تثبيت OpenClaw؟',
        answer: 'المتطلبات الأساسية: Node.js 18 أو أحدث (يُنصح بـ Node.js 22)، واتصال بالإنترنت، ومفتاح API لنموذج الذكاء الاصطناعي الذي تريد استخدامه (Anthropic أو OpenAI أو غيرهما). يعمل OpenClaw على macOS وWindows وLinux وRaspberry Pi. لا تحتاج إلى خادم قوي — يعمل على جهاز عادي أو حتى Raspberry Pi.',
      },
      {
        question: 'كيف أثبّت OpenClaw على macOS؟',
        answer: 'على macOS: ثبّت Node.js عبر الموقع الرسمي أو Homebrew، ثم نفّذ في الطرفية: npx openclaw@latest init. سيقودك OpenClaw خطوة بخطوة لإعداد مفتاح API ومنصة المراسلة. راجع دليل التثبيت التفصيلي على صفحة التثبيت في ArabClaw.',
      },
      {
        question: 'كيف أثبّت OpenClaw على Windows؟',
        answer: 'على Windows: حمّل وثبّت Node.js من nodejs.org، ثم افتح PowerShell أو Command Prompt وأدخل: npx openclaw@latest init. يُنصح باستخدام Windows Terminal للحصول على تجربة أفضل. لدينا دليل مفصّل خطوة بخطوة مع صور توضيحية في مدونة ArabClaw.',
      },
      {
        question: 'كيف أثبّت OpenClaw على Linux؟',
        answer: 'على Linux (Ubuntu/Debian): ثبّت Node.js عبر nvm أو من مستودع NodeSource، ثم نفّذ: npx openclaw@latest init. على Arch Linux استخدم pacman أو yay. يدعم OpenClaw جميع توزيعات Linux الرئيسية. راجع الدليل التفصيلي على مدونة ArabClaw.',
      },
      {
        question: 'هل يعمل OpenClaw على Raspberry Pi؟',
        answer: 'نعم! يعمل OpenClaw بكفاءة على Raspberry Pi 4 وما أحدث. يُعدّ Raspberry Pi خياراً ممتازاً لتشغيل وكيل ذكاء اصطناعي شخصي طوال الوقت بتكلفة منخفضة (10-20 دولار كهرباء سنوياً). ثبّت Raspberry Pi OS، ثم اتبع نفس خطوات Linux.',
      },
      {
        question: 'هل يمكنني تثبيت OpenClaw على VPS أو خادم سحابي؟',
        answer: 'بالتأكيد! التثبيت على VPS هو الخيار الأفضل للحصول على وكيل متاح 24/7. يعمل مع DigitalOcean وHetzner وAWS وغيرها. تحتاج إلى خادم بذاكرة وصول عشوائي لا تقل عن 512MB. راجع دليل التثبيت على VPS في مدونة ArabClaw.',
      },
    ],
  },
  {
    title: 'المنصات والتكاملات',
    emoji: '💬',
    questions: [
      {
        question: 'ما هي منصات المراسلة المدعومة؟',
        answer: 'يدعم OpenClaw حالياً: WhatsApp (شخصي وBusiness API)، Telegram، Discord، iMessage (على macOS)، Signal، SMS، وواجهة ويب مباشرة. يعمل الفريق على إضافة منصات إضافية باستمرار. يمكنك تشغيل نفس الوكيل على عدة منصات في آنٍ واحد.',
      },
      {
        question: 'كيف أربط OpenClaw بـ WhatsApp؟',
        answer: 'لربط OpenClaw بـ WhatsApp الشخصي: بعد التثبيت، اختر WhatsApp كقناة، سيظهر QR Code، امسحه بتطبيق WhatsApp على هاتفك من خلال: الإعدادات ← الأجهزة المرتبطة ← ربط جهاز. لـ WhatsApp Business API تحتاج إلى حساب Meta Business وسيناريو الإعداد مختلف قليلاً.',
      },
      {
        question: 'هل يدعم OpenClaw اللغة العربية بشكل كامل؟',
        answer: 'OpenClaw الأصلي يدعم العربية جزئياً عبر نماذج الذكاء الاصطناعي. أما fork ArabClaw فيضيف دعماً كاملاً للعربية: دعم RTL (الكتابة من اليمين لليسار)، معالجة أفضل للنصوص العربية، وشخصيات وكيل مكيّفة ثقافياً للسياق العربي.',
      },
    ],
  },
  {
    title: 'الأسعار والترخيص',
    emoji: '💰',
    questions: [
      {
        question: 'هل ArabClaw مجاني؟',
        answer: 'نعم، ArabClaw بالكامل — الموقع والوثائق والـ fork — مجاني 100% ومفتوح المصدر تحت رخصة MIT. OpenClaw نفسه أيضاً مجاني ومفتوح المصدر. لن تدفع شيئاً للبرنامج نفسه.',
      },
      {
        question: 'ما التكاليف الفعلية لاستخدام OpenClaw؟',
        answer: 'التكاليف الاختيارية المحتملة: (1) مفتاح API لنماذج AI — Claude من Anthropic يبدأ بـ $3/مليون رمز، GPT-4 من OpenAI بأسعار مشابهة. استخدام عادي يكلّف بضعة دولارات شهرياً. (2) الاستضافة على VPS إن أردت 24/7 — من $5 شهرياً. (3) WhatsApp Business API إن أردتها — مجانية للرسائل المحدودة. معظم المستخدمين ينفقون أقل من $10 شهرياً.',
      },
    ],
  },
  {
    title: 'المجتمع والـ Fork العربي',
    emoji: '🌍',
    questions: [
      {
        question: 'كيف أشارك في مجتمع ArabClaw؟',
        answer: 'يمكنك المشاركة عبر: GitHub لتقديم التقارير والمساهمات البرمجية (github.com/arabclaw/arabclaw)، والتواصل عبر البريد الإلكتروني community@arabclaw.com. نرحب بجميع أشكال المساهمة: تقارير الأخطاء، اقتراح الميزات، كتابة الوثائق، ترجمة المحتوى، واختبار النسخ الجديدة.',
      },
      {
        question: 'ما الفرق بين fork ArabClaw وOpenClaw الرسمي؟',
        answer: 'fork ArabClaw يضيف على OpenClaw الرسمي: (1) دعم كامل للغة العربية وRTL، (2) تكاملات مع خدمات عربية محلية، (3) شخصيات وكيل مصمّمة للسياق العربي والإسلامي، (4) تحسينات في معالجة اللهجات العربية المختلفة. جميع هذه الإضافات مفتوحة المصدر ومتاحة للجميع.',
      },
    ],
  },
  {
    title: 'استكشاف الأخطاء',
    emoji: '🔧',
    questions: [
      {
        question: 'لا يستجيب الوكيل في WhatsApp، ما الحل؟',
        answer: 'أولاً تحقق من: (1) هل عملية OpenClaw تعمل؟ نفّذ openclaw status في الطرفية. (2) هل اتصال WhatsApp نشط؟ جرّب openclaw restart. (3) هل مفتاح API صحيح ولديه رصيد كافٍ؟ (4) هل الاتصال بالإنترنت يعمل؟ إن استمرت المشكلة، افتح تقريراً في GitHub مع سجلات الأخطاء.',
      },
      {
        question: 'كيف أحدّث OpenClaw إلى آخر إصدار؟',
        answer: 'لتحديث OpenClaw: في مجلد المشروع نفّذ npm update openclaw@latest أو npx openclaw@latest upgrade. يُنصح بالاحتفاظ بنسخة احتياطية من ملف الإعدادات (.env) قبل التحديث. راجع CHANGELOG على GitHub لمعرفة التغييرات.',
      },
    ],
  },
]

export default function FAQPage() {
  const allQuestions = faqCategories.flatMap((cat) =>
    cat.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    }))
  )

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQuestions,
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6 py-16" dir="rtl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">❓</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            الأسئلة الشائعة
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            كل ما تريد معرفته عن ArabClaw وOpenClaw — من التثبيت إلى الاستخدام المتقدم
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-blue-800 mb-4">المحتويات</h2>
          <ul className="space-y-2">
            {faqCategories.map((cat, index) => (
              <li key={index}>
                <a
                  href={`#cat-${index}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.title}</span>
                  <span className="text-blue-400 text-sm">({cat.questions.length} أسئلة)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-16">
          {faqCategories.map((category, catIndex) => (
            <section key={catIndex} id={`cat-${catIndex}`}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3 border-b-2 border-blue-100 pb-4">
                <span>{category.emoji}</span>
                <span>{category.title}</span>
              </h2>
              <div className="space-y-6">
                {category.questions.map((item, qIndex) => (
                  <div
                    key={qIndex}
                    className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-blue-700 mb-3">
                        {item.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 border-2 border-blue-500 rounded-xl p-10 bg-blue-50 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            لم تجد إجابتك؟
          </h2>
          <p className="text-gray-700 mb-6">
            تواصل مع مجتمع ArabClaw أو راجع الوثائق الكاملة
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/install"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              دليل التثبيت
            </Link>
            <a
              href="mailto:community@arabclaw.com"
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              تواصل معنا
            </a>
            <a
              href="https://docs.arabclaw.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              الوثائق الكاملة ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
