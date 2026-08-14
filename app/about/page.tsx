import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'من نحن — ArabClaw: المرجع العربي الأول لـ OpenClaw',
  description: 'تعرّف على ArabClaw — المرجع العربي الأول لـ OpenClaw. مشروعنا لجعل الذكاء الاصطناعي متاحاً لـ 400 مليون ناطق بالعربية. توثيق كامل، مجتمع نشط، ومحتوى عربي متخصص.',
  keywords: ['ArabClaw', 'من نحن', 'OpenClaw بالعربي', 'مجتمع OpenClaw العربي', 'Moutarjam'],
  alternates: {
    canonical: 'https://arabclaw.com/about',
  },
  openGraph: {
    title: 'من نحن — ArabClaw',
    description: 'المرجع العربي الأول لـ OpenClaw. مشروعنا لجعل الذكاء الاصطناعي متاحاً للعرب.',
    url: 'https://arabclaw.com/about',
    type: 'website',
    images: ['/mascot.jpg'],
  },
  twitter: {
    card: 'summary',
    title: 'من نحن — ArabClaw',
    description: 'المرجع العربي الأول لـ OpenClaw',
    images: ['/mascot.jpg'],
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl" dir="rtl">
      <div className="text-center mb-16">
        <div className="relative inline-block mb-8">
          <span className="absolute inset-0 -m-2 rounded-full bg-gradient-to-br from-blue-500/25 to-blue-400/10 blur-lg" aria-hidden />
          <img
            src="/mascot.jpg"
            alt="ArabClaw Mascot"
            className="relative w-40 h-40 rounded-full shadow-2xl ring-4 ring-blue-500/30 mx-auto"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent">
          من نحن
        </h1>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-r-4 border-blue-500 pr-4">ما هو ArabClaw؟</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            ArabClaw هو المركز الرئيسي للمحتوى العربي حول OpenClaw - أقوى أداة لاستخدام الذكاء الاصطناعي من سطر الأوامر.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            نحن نؤمن بأن الذكاء الاصطناعي يجب أن يكون متاحاً للجميع، بلغتهم الأم. لذلك أنشأنا ArabClaw - لنجعل OpenClaw سهل الاستخدام والفهم للمستخدمين العرب.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-r-4 border-blue-500 pr-4">مهمتنا</h2>
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 shadow-sm">
            <p className="text-xl font-semibold text-gray-900 mb-6">
              جعل OpenClaw متاحاً وسهل الاستخدام لكل مستخدم عربي
            </p>
            <ul className="space-y-4">
              {[
                'توفير توثيق كامل بالعربية',
                'دروس وشروحات بالعربية',
                'بناء مجتمع عربي نابض بالحياة',
                'تطوير Skills مصممة للمستخدمين العرب',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-800">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-r-4 border-blue-500 pr-4">ما نقدمه</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'توثيق شامل',
                desc: 'دليل كامل بالعربية لكل ميزات OpenClaw، من التثبيت حتى الاحتراف',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.5 5.5 8 5 4 5v13c4 0 6.5.5 8 1.5M12 6.5C13.5 5.5 16 5 20 5v13c-4 0-6.5.5-8 1.5M12 6.5v13" />,
              },
              {
                title: 'Marketplace عربي',
                desc: 'اكتشف وشارك Skills مصممة خصيصاً للمستخدمين العرب',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 5h12M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />,
              },
              {
                title: 'مدونة نشطة',
                desc: 'مقالات، دروس، نصائح، وآخر الأخبار حول OpenClaw',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4v16h16v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />,
              },
              {
                title: 'مجتمع داعم',
                desc: 'انضم لمجتمع من المستخدمين والمطورين العرب المتحمسين',
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
              },
            ].map((card) => (
              <div key={card.title} className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-300">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">{card.icon}</svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-r-4 border-blue-500 pr-4">انضم إلينا</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            ArabClaw مشروع مفتوح المصدر ومجاني بالكامل. نرحب بالمساهمات من الجميع!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full text-center hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all"
            >
              GitHub <span aria-hidden>←</span>
            </a>
            <a
              href="https://discord.gg/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white font-bold rounded-full text-center hover:bg-blue-600 hover:shadow-xl hover:scale-105 transition-all"
            >
              Discord <span aria-hidden>←</span>
            </a>
          </div>
        </section>

        <section className="text-center pt-4">
          <div className="p-10 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-t-4 border-blue-500">
            <p className="text-2xl font-bold text-white mb-3">
              معاً نجعل الذكاء الاصطناعي متاحاً للجميع
            </p>
            <p className="text-lg text-gray-300">
              شكراً لكونك جزءاً من هذه الرحلة
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
