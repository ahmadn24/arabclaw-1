#!/usr/bin/env node
/**
 * generate-article.mjs
 * Génère un article de blog SEO en arabe pour arabclaw via Anthropic
 * et le sauvegarde dans content/blog/
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(REPO_ROOT, "content/blog");

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("❌ ANTHROPIC_API_KEY manquante");
  process.exit(1);
}

const TOPICS = [
  { slug: "openclaw-restaurants-cafes-automation", title: "كيف يساعد OpenClaw أصحاب المطاعم والكافيهات على أتمتة العمليات", tags: ["أتمتة", "مطاعم", "كافيهات", "OpenClaw"] },
  { slug: "openclaw-ecommerce-arab-world", title: "OpenClaw للتجارة الإلكترونية العربية: أتمتة الطلبات والمتابعة والدعم", tags: ["تجارة إلكترونية", "أتمتة", "دعم عملاء", "OpenClaw"] },
  { slug: "openclaw-vs-chatgpt-arabic-business", title: "OpenClaw مقابل ChatGPT: أيهما أفضل للأعمال العربية في 2026؟", tags: ["مقارنة", "ChatGPT", "OpenClaw", "ذكاء اصطناعي"] },
  { slug: "openclaw-arabic-startups-guide", title: "دليل الشركات الناشئة العربية: كيف تبني وكيل ذكاء اصطناعي بـ OpenClaw", tags: ["شركات ناشئة", "ريادة أعمال", "OpenClaw", "دليل"] },
  { slug: "openclaw-data-privacy-local-solution", title: "حماية البيانات والخصوصية مع OpenClaw: لماذا الحل المحلي أفضل؟", tags: ["أمن", "خصوصية", "بيانات", "OpenClaw"] },
  { slug: "openclaw-real-estate-arab-automation", title: "وكيل ذكاء اصطناعي للعقارات: كيف يؤتمت OpenClaw المبيعات والاستفسارات", tags: ["عقارات", "أتمتة", "مبيعات", "OpenClaw"] },
  { slug: "openclaw-raspberry-pi-arabic-guide", title: "تشغيل OpenClaw على Raspberry Pi: الدليل الكامل بالعربية", tags: ["Raspberry Pi", "لينكس", "تثبيت", "OpenClaw"] },
  { slug: "openclaw-digital-marketing-arab", title: "وكيل ذكاء اصطناعي للتسويق الرقمي: نشر المحتوى وتحليل البيانات تلقائياً", tags: ["تسويق رقمي", "وسائل تواصل", "محتوى", "OpenClaw"] },
  { slug: "openclaw-lawyers-arab-legal-automation", title: "OpenClaw للمحامين العرب: أتمتة إدارة القضايا والوثائق", tags: ["محامون", "قانون", "أتمتة", "OpenClaw"] },
  { slug: "openclaw-education-training-arab-world", title: "كيف يغير OpenClaw قطاع التعليم والتدريب في العالم العربي", tags: ["تعليم", "تدريب", "ذكاء اصطناعي", "OpenClaw"] },
  { slug: "openclaw-project-management-automation", title: "أتمتة إدارة المشاريع بالكامل مع OpenClaw: من الجدولة إلى التقارير", tags: ["إدارة مشاريع", "أتمتة", "إنتاجية", "OpenClaw"] },
  { slug: "openclaw-healthcare-clinics-automation", title: "OpenClaw في القطاع الصحي: أتمتة المواعيد والمتابعة مع حماية البيانات", tags: ["صحة", "عيادات", "أتمتة", "OpenClaw"] },
  { slug: "openclaw-whatsapp-bot-step-by-step", title: "بناء روبوت واتساب ذكي مع OpenClaw: دليل خطوة بخطوة", tags: ["واتساب", "روبوت", "تعليمي", "OpenClaw"] },
  { slug: "openclaw-arabic-journalism-news-monitoring", title: "وكيل ذكاء اصطناعي للصحافة العربية: مراقبة الأخبار وتلخيصها تلقائياً", tags: ["صحافة", "إعلام", "أتمتة", "OpenClaw"] },
  { slug: "openclaw-vs-make-n8n-arab-comparison", title: "OpenClaw مقابل Make و n8n: المقارنة الشاملة للمستخدم العربي", tags: ["مقارنة", "Make", "n8n", "OpenClaw"] },
  { slug: "openclaw-performance-tips-10", title: "10 نصائح لتحسين أداء OpenClaw وتسريع ردود الوكيل الذكي", tags: ["أداء", "تحسين", "نصائح", "OpenClaw"] },
  { slug: "openclaw-banking-financial-services", title: "OpenClaw في الخدمات المالية: أتمتة دعم العملاء مع الامتثال الكامل", tags: ["بنوك", "خدمات مالية", "أتمتة", "OpenClaw"] },
  { slug: "openclaw-multi-agent-team-building", title: "كيف تبني فريقاً من وكلاء الذكاء الاصطناعي مع OpenClaw", tags: ["فريق", "وكلاء", "ذكاء اصطناعي", "OpenClaw"] },
  { slug: "openclaw-hotels-tourism-arabic", title: "OpenClaw للفنادق والسياحة: أتمتة الحجوزات والاستفسارات بالعربية", tags: ["سياحة", "فنادق", "أتمتة", "OpenClaw"] },
  { slug: "ai-future-arab-world-2026", title: "مستقبل الذكاء الاصطناعي في العالم العربي: توقعات 2026 وما بعدها", tags: ["مستقبل", "ذكاء اصطناعي", "عالم عربي", "توقعات"] },
];

// Trouver un topic non encore publié
const existingSlugs = fs.readdirSync(CONTENT_DIR).map(f => f.replace(/\.md$/, ""));
const nextTopic = TOPICS.find(t => !existingSlugs.includes(t.slug));

if (!nextTopic) {
  console.log("⚠️ Tous les sujets programmés sont déjà publiés.");
  process.exit(0);
}

console.log(`📝 Sujet : ${nextTopic.title}`);

async function callClaude(prompt, maxTokens = 4000) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error: ${res.status} — ${err}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

const today = new Date().toISOString().split("T")[0];

const prompt = `أنت خبير في الذكاء الاصطناعي والأتمتة تكتب لمدونة ArabClaw، المنصة العربية الرائدة لـ OpenClaw.

الموضوع: ${nextTopic.title}

تعليمات صارمة:
- اكتب بالعربية الفصحى المبسطة، واضحة ومباشرة
- الطول: 1000-1500 كلمة من المحتوى الحقيقي (لا حشو)
- استخدم ## للعناوين الرئيسية و### للعناوين الفرعية
- أضف 3-5 روابط داخلية من هذه القائمة:
  * [دليل التثبيت](/install)
  * [أفضل Skills للمستخدمين العرب](/blog/top-skills-arabe)
  * [دليل المبتدئين](/blog/beginners-guide)
  * [مقارنة OpenClaw مع Zapier](/blog/openclaw-vs-zapier-comparison)
  * [مقارنة OpenClaw مع Make](/blog/openclaw-vs-make-comparison)
  * [تثبيت OpenClaw على macOS](/blog/install-macos-visuel)
  * [من نحن](/about)
- أضف 1-2 رابط خارجي ذا صلة (openclaw.ai، anthropic.com، إلخ)
- اذكر OpenClaw بـ "أوبن كلاو (OpenClaw)" في أول ذكر
- لا تستخدم الإيموجي في النص
- لا تبدأ بعنوان H1 (سيُعرض تلقائياً)
- اختتم بـ CTA للتثبيت أو التواصل

أرجع JSON صحيح فقط (بدون markdown حوله):
{
  "excerpt": "وصف مختصر للمقال (150-160 حرف) محسّن لمحركات البحث",
  "keywords": "كلمات مفتاحية مفصولة بفاصلة (5-7 كلمات)",
  "content": "محتوى المقال الكامل بصيغة Markdown..."
}`;

console.log("🤖 Génération de l'article en arabe...");
const raw = await callClaude(prompt, 5000);

let parsed;
try {
  // Extract JSON if wrapped in code block
  const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, raw];
  parsed = JSON.parse(jsonMatch[1].trim());
} catch (e) {
  console.error("❌ Erreur parsing JSON:", e.message);
  console.error("Raw output:", raw.slice(0, 500));
  process.exit(1);
}

const { excerpt, keywords, content } = parsed;

const frontmatter = `---
title: "${nextTopic.title.replace(/"/g, '\\"')}"
excerpt: "${(excerpt || "").replace(/"/g, '\\"')}"
date: "${today}"
author: "فريق ArabClaw"
tags: ${JSON.stringify(nextTopic.tags)}
language: "ar"
keywords: "${(keywords || "").replace(/"/g, '\\"')}"
---

`;

const filePath = path.join(CONTENT_DIR, `${nextTopic.slug}.md`);
fs.writeFileSync(filePath, frontmatter + content, "utf8");

console.log(`✅ Article écrit : ${filePath}`);
console.log(`📄 Titre : ${nextTopic.title}`);
