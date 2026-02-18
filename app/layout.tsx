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
  keywords: ["OpenClaw", "Arabic", "AI", "عربي", "ذكاء اصطناعي", "Claude", "ChatGPT", "تثبيت OpenClaw", "ArabClaw", "وكيل ذكاء اصطناعي", "مرجع عربي"],
  authors: [{ name: "ArabClaw Team" }],
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
  },
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
        "url": "https://arabclaw.com",
        "description": "المرجع العربي الأول لـ OpenClaw ومجتمع المطورين العرب للذكاء الاصطناعي",
        "foundingDate": "2026",
        "foundingTeam": "Moutarjam",
        "areaServed": "Arab World",
        "audience": {
          "@type": "Audience",
          "audienceType": "Arabic-speaking developers and AI enthusiasts"
        },
        "sameAs": ["https://github.com/arabclaw/arabclaw"],
        "logo": {
          "@type": "ImageObject",
          "url": "https://arabclaw.com/mascot.jpg"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://arabclaw.com/#website",
        "url": "https://arabclaw.com",
        "name": "ArabClaw - OpenClaw بالعربية",
        "description": "أكبر مجتمع عربي حول OpenClaw — دليل التثبيت، الوثائق، والـ fork العربي",
        "inLanguage": "ar",
        "publisher": { "@id": "https://arabclaw.com/#organization" }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://arabclaw.com/#openclaw-software",
        "name": "OpenClaw",
        "alternateName": ["أوبن كلاو", "openclaw"],
        "url": "https://openclaw.ai",
        "applicationCategory": "AIApplication",
        "applicationSubCategory": "Personal AI Agent",
        "operatingSystem": ["macOS", "Windows", "Linux", "Raspberry Pi", "VPS"],
        "softwareVersion": "latest",
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
          "bestRating": "5"
        },
        "featureList": [
          "Personal AI agent for WhatsApp and Telegram",
          "Long-term memory storage",
          "Browser automation",
          "Cron job scheduling",
          "Multi-model support: Claude, GPT-4, Gemini",
          "Open source"
        ],
        "isRelatedTo": { "@id": "https://arabclaw.com/#organization" }
      }
    ]
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
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
