import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cairo = Cairo({ 
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ArabClaw - المرجع العربي الأول لـ OpenClaw",
    template: "%s | ArabClaw"
  },
  description: "ArabClaw هو المرجع العربي الأول لـ OpenClaw — أدلة التثبيت، الوثائق، والـ fork العربي مفتوح المصدر لخدمة 400 مليون ناطق بالعربية",
  keywords: [
    "OpenClaw", "أوبن كلاو", "Arabic", "AI", "عربي", "ذكاء اصطناعي", 
    "Claude", "ChatGPT", "تثبيت OpenClaw", "ArabClaw", "وكيل ذكاء اصطناعي", 
    "مرجع عربي", "WhatsApp bot", "Telegram bot", "أتمتة", "automation"
  ],
  authors: [{ name: "ArabClaw Team" }, { name: "Moutarjam" }],
  creator: "ArabClaw",
  publisher: "ArabClaw",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://arabclaw.com",
    siteName: "ArabClaw",
    title: "ArabClaw - المرجع العربي الأول لـ OpenClaw",
    description: "أكبر مجتمع عربي حول OpenClaw — دليل التثبيت، الوثائق، والـ fork العربي",
    images: [
      {
        url: "/mascot.jpg",
        width: 1200,
        height: 630,
        alt: "ArabClaw - المرجع العربي لـ OpenClaw",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArabClaw - المرجع العربي الأول لـ OpenClaw",
    description: "أكبر مجتمع عربي حول OpenClaw — دليل التثبيت، الوثائق، والـ fork العربي",
    images: ["/mascot.jpg"],
    creator: "@ArabClaw",
  },
  alternates: {
    canonical: "https://arabclaw.com",
    languages: {
      'ar': 'https://arabclaw.com',
      'en': 'https://arabclaw.com/en',
      'x-default': 'https://arabclaw.com/en',
    },
  },
  verification: {
    // google: 'your-google-verification-code', // Add when available
    // yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
  metadataBase: new URL("https://arabclaw.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://arabclaw.com/#organization",
        "name": "ArabClaw",
        "alternateName": ["عرب كلاو", "ArabClaw.com"],
        "url": "https://arabclaw.com",
        "description": "المرجع العربي الأول لـ OpenClaw ومجتمع المطورين العرب للذكاء الاصطناعي",
        "foundingDate": "2026",
        "founder": {
          "@type": "Organization",
          "name": "Moutarjam"
        },
        "areaServed": {
          "@type": "GeoCircle",
          "name": "Arab World",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "25.0",
            "longitude": "45.0"
          }
        },
        "audience": {
          "@type": "Audience",
          "audienceType": "Arabic-speaking developers and AI enthusiasts",
          "geographicArea": {
            "@type": "AdministrativeArea",
            "name": "Arab World"
          }
        },
        "sameAs": [
          "https://github.com/arabclaw/arabclaw",
          "https://twitter.com/ArabClaw"
        ],
        "logo": {
          "@type": "ImageObject",
          "url": "https://arabclaw.com/mascot.jpg",
          "width": 512,
          "height": 512
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "community@arabclaw.com",
          "availableLanguage": ["Arabic", "English"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://arabclaw.com/#website",
        "url": "https://arabclaw.com",
        "name": "ArabClaw - OpenClaw بالعربية",
        "alternateName": "المرجع العربي لـ OpenClaw",
        "description": "أكبر مجتمع عربي حول OpenClaw — دليل التثبيت، الوثائق، والـ fork العربي",
        "inLanguage": "ar",
        "publisher": { "@id": "https://arabclaw.com/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://arabclaw.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://arabclaw.com/#openclaw-software",
        "name": "OpenClaw",
        "alternateName": ["أوبن كلاو", "openclaw", "Open Claw"],
        "url": "https://openclaw.ai",
        "applicationCategory": "DeveloperApplication",
        "applicationSubCategory": "Personal AI Agent Framework",
        "operatingSystem": ["macOS", "Windows", "Linux", "Raspberry Pi OS"],
        "softwareVersion": "latest",
        "downloadUrl": "https://www.npmjs.com/package/openclaw",
        "installUrl": "https://arabclaw.com/install",
        "releaseNotes": "https://github.com/openclaw/openclaw/releases",
        "softwareRequirements": "Node.js 18+",
        "memoryRequirements": "512MB RAM",
        "permissions": "Internet access, file system access",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "description": "إطار عمل مفتوح المصدر يحوّل نماذج الذكاء الاصطناعي الكبيرة إلى وكلاء شخصيين يعملون عبر WhatsApp وTelegram وDiscord.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "342",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": [
          "Personal AI agent for WhatsApp and Telegram",
          "Long-term memory storage",
          "Browser automation",
          "Cron job scheduling",
          "Multi-model support: Claude, GPT-4, Gemini",
          "Skills marketplace",
          "Open source MIT license"
        ],
        "screenshot": "https://arabclaw.com/mascot.jpg",
        "isRelatedTo": { "@id": "https://arabclaw.com/#organization" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://arabclaw.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "الرئيسية",
            "item": "https://arabclaw.com"
          }
        ]
      }
    ]
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CMHFRP959S"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CMHFRP959S', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
      </head>
      <body className={`${cairo.className} antialiased bg-white text-gray-900`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
