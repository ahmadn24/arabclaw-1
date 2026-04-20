#!/usr/bin/env node
/**
 * generate-article.mjs — ArabClaw blog cron
 * Article quotidien en arabe : 1200-1500 mots, GEO block, FAQ schema.org,
 * tableau structuré, liens internes réels, frontmatter complet.
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

// ── Slugs réels existants pour liens internes ─────────────────────────────
const INTERNAL_LINKS = [
  { slug: "beginners-guide", label: "دليل المبتدئين لأوبن كلاو" },
  { slug: "top-skills-arabe", label: "أفضل 10 Skills للمستخدمين العرب" },
  { slug: "install-macos-visuel", label: "تثبيت OpenClaw على macOS" },
  { slug: "install-openclaw-vps", label: "تثبيت OpenClaw على VPS" },
  { slug: "create-first-skill", label: "إنشاء أول Skill خاص بك" },
  { slug: "2026-02-08-whatsapp-automation-guide", label: "أتمتة واتساب مع أوبن كلاو" },
  { slug: "2026-02-09-openclaw-vs-make-comparison", label: "مقارنة أوبن كلاو مع Make" },
  { slug: "2026-02-09-openclaw-vs-zapier-comparison", label: "مقارنة أوبن كلاو مع Zapier" },
  { slug: "2026-02-10-github-automation-openclaw", label: "أتمتة GitHub مع أوبن كلاو" },
  { slug: "2026-02-14-openclaw-security-privacy-guide", label: "دليل الأمان والخصوصية" },
  { slug: "2026-02-16-email-automation-himalaya", label: "أتمتة البريد الإلكتروني" },
  { slug: "2026-02-17-openclaw-vs-n8n-comparison", label: "مقارنة أوبن كلاو مع n8n" },
  { slug: "2026-02-22-telegram-automation-guide", label: "أتمتة تيليغرام مع أوبن كلاو" },
  { slug: "2026-03-01-customer-service-automation-openclaw", label: "أتمتة خدمة العملاء" },
  { slug: "2026-03-04-openclaw-entrepreneurs-arabes-startup", label: "أوبن كلاو للشركات الناشئة العربية" },
  { slug: "2026-03-22-multi-agent-orchestration-openclaw", label: "تنسيق وكلاء متعددين مع أوبن كلاو" },
  { slug: "openclaw-restaurants-cafes-automation", label: "أوبن كلاو للمطاعم والكافيهات" },
];

// ── 6 catégories — rotation quotidienne ──────────────────────────────────
const CATEGORIES = [
  {
    name: "تعليمي",
    topics: [
      { slug: "openclaw-skills-creation-advanced-guide", title: "إنشاء Skills متقدمة في أوبن كلاو: من الفكرة إلى النشر" },
      { slug: "openclaw-memory-system-explained", title: "كيف يعمل نظام الذاكرة في أوبن كلاو: MEMORY.md وملفات السياق" },
      { slug: "openclaw-cron-jobs-automation-arabic", title: "جدولة المهام التلقائية مع أوبن كلاو: دليل cron الشامل" },
      { slug: "openclaw-subagents-parallel-tasks", title: "تشغيل مهام متوازية مع Sub-agents في أوبن كلاو" },
    ],
  },
  {
    name: "وكلاء الذكاء الاصطناعي",
    topics: [
      { slug: "openclaw-autonomous-agent-vs-chatbot", title: "الوكيل الذكي المستقل مقابل chatbot: ما الفرق الحقيقي؟" },
      { slug: "openclaw-agent-workflow-design-arabic", title: "تصميم سير عمل وكلاء الذكاء الاصطناعي: أفضل الممارسات" },
      { slug: "openclaw-llm-local-vs-cloud-arabic", title: "نماذج اللغة المحلية مقابل السحابية في أوبن كلاو: مقارنة شاملة" },
      { slug: "openclaw-agent-arab-customer-service", title: "بناء وكيل ذكاء اصطناعي لخدمة العملاء العرب من الصفر" },
    ],
  },
  {
    name: "مقارنات الأدوات",
    topics: [
      { slug: "openclaw-vs-langchain-arabic", title: "أوبن كلاو مقابل LangChain: أيهما أنسب للمطوّر العربي؟" },
      { slug: "openclaw-vs-autogen-microsoft", title: "أوبن كلاو مقابل AutoGen: مقارنة إطارات الوكلاء الذكية" },
      { slug: "openclaw-vs-flowise-nocode-arabic", title: "أوبن كلاو مقابل Flowise: البديل المفتوح المصدر للمستخدم العربي" },
      { slug: "openclaw-vs-dify-ai-comparison", title: "أوبن كلاو مقابل Dify: مقارنة منصات الذكاء الاصطناعي التجاري" },
    ],
  },
  {
    name: "الذكاء الاصطناعي في العالم العربي",
    topics: [
      { slug: "ai-arabic-language-models-2026", title: "نماذج اللغة العربية في 2026: هل وصلنا إلى التكافؤ مع الإنجليزية؟" },
      { slug: "digital-sovereignty-arab-world-ai", title: "السيادة الرقمية في العالم العربي: لماذا الحلول المحلية أمر لا بد منه" },
      { slug: "ai-startups-gulf-region-2026", title: "الشركات الناشئة في مجال الذكاء الاصطناعي بمنطقة الخليج: أبرز اللاعبين 2026" },
      { slug: "openclaw-arabic-rtl-interface-guide", title: "دعم اللغة العربية RTL في أوبن كلاو: التخصيص الكامل" },
    ],
  },
  {
    name: "دليل المبتدئين",
    topics: [
      { slug: "what-is-openclaw-complete-guide-ar", title: "ما هو أوبن كلاو؟ الدليل الشامل للمبتدئين بالعربية" },
      { slug: "openclaw-first-week-setup-checklist", title: "قائمة التحقق لأسبوعك الأول مع أوبن كلاو" },
      { slug: "openclaw-common-mistakes-beginners", title: "أشيع 10 أخطاء يقع فيها المبتدئون مع أوبن كلاو وكيف تتجنبها" },
      { slug: "openclaw-telegram-bot-setup-arabic", title: "ربط أوبن كلاو بتيليغرام: خطوات الإعداد الكامل" },
    ],
  },
  {
    name: "حالات الاستخدام التجاري",
    topics: [
      { slug: "openclaw-ecommerce-order-tracking-automation", title: "أتمتة تتبع الطلبات والشحن في التجارة الإلكترونية مع أوبن كلاو" },
      { slug: "openclaw-accounting-invoicing-arab-sme", title: "المحاسبة والفوترة التلقائية للشركات الصغيرة والمتوسطة العربية" },
      { slug: "openclaw-social-media-scheduler-arabic", title: "جدولة منشورات وسائل التواصل الاجتماعي بالعربية مع أوبن كلاو" },
      { slug: "openclaw-lead-generation-crm-arabic", title: "توليد العملاء المحتملين وإدارة CRM تلقائياً مع أوبن كلاو" },
    ],
  },
];

// ── Anti-doublon : lire les slugs et titres existants ────────────────────
const existingSlugs = new Set(
  fs.readdirSync(CONTENT_DIR).map(f => f.replace(/\.md$/, ""))
);

// Rotation de catégorie par jour
const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
const category = CATEGORIES[dayIndex % CATEGORIES.length];

// Choisir un topic non encore publié dans la catégorie (sinon autre catégorie)
let nextTopic = null;
for (let i = 0; i < CATEGORIES.length; i++) {
  const cat = CATEGORIES[(dayIndex + i) % CATEGORIES.length];
  const topic = cat.topics.find(t => !existingSlugs.has(t.slug));
  if (topic) {
    nextTopic = topic;
    break;
  }
}

if (!nextTopic) {
  console.log("⚠️  Tous les sujets sont déjà publiés.");
  process.exit(0);
}

console.log(`📝 Sujet : ${nextTopic.title}`);
console.log(`📂 Catégorie : ${category.name}`);

// ── Appel Anthropic ───────────────────────────────────────────────────────
async function callClaude(prompt, maxTokens = 6000) {
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
    throw new Error(`Anthropic API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

const today = new Date().toISOString().split("T")[0];

// Sélectionner 4 liens internes aléatoires
const shuffled = [...INTERNAL_LINKS].sort(() => Math.random() - 0.5).slice(0, 4);
const internalLinksText = shuffled.map(l => `- [${l.label}](/blog/${l.slug})`).join("\n");

const prompt = `أنت خبير في الذكاء الاصطناعي والأتمتة، تكتب لمدونة ArabClaw — المنصة العربية الرائدة لأوبن كلاو (OpenClaw).

الموضوع: ${nextTopic.title}

═══════════════════════════════════════
قواعد صارمة — لا استثناء
═══════════════════════════════════════

1. اللغة: العربية الفصحى المبسطة. واضح ومباشر.
2. الطول: 1200 كلمة على الأقل من المحتوى الفعلي (احسب الكلمات).
3. البنية الإلزامية بالترتيب:
   أ) بلوك GEO في الأعلى مباشرة (قبل أي محتوى آخر):
      > **ما ستتعلمه:** [جملتان تصفان ما سيكتسبه القارئ بعد قراءة المقال]
   ب) مقدمة (فقرتان)
   ج) على الأقل 4 أقسام ## مع محتوى وافٍ تحت كل منها
   د) جدول واحد على الأقل أو قائمة منظمة (Markdown table أو قائمة مرقمة تفصيلية)
   هـ) قسم ## الأسئلة الشائعة — يحتوي على 5 أسئلة وأجوبة بهذا الشكل الدقيق:
      ### سؤال 1: [السؤال]
      **الجواب:** [جواب كامل من جملتين على الأقل]
   و) خاتمة مع CTA واضح

4. الاسم الرسمي: "أوبن كلاو (OpenClaw)" في أول ذكر، ثم "أوبن كلاو" فقط.
5. ممنوع: الشرطة الطويلة (—)، الإيموجي، البداية بعنوان H1.
6. روابط داخلية — أضف 3-4 من هذه القائمة بشكل طبيعي في النص:
${internalLinksText}
7. رابط خارجي واحد على الأقل: openclaw.ai أو anthropic.com أو github.com/openclaw.

═══════════════════════════════════════
أرجع JSON صحيح فقط (بدون markdown حوله):
═══════════════════════════════════════
{
  "excerpt": "وصف 150-160 حرفاً محسّن لمحركات البحث يحتوي الكلمة المفتاحية الرئيسية",
  "tags": ["تاغ1", "تاغ2", "تاغ3", "تاغ4"],
  "keywords": "كلمة1، كلمة2، كلمة3، كلمة4، كلمة5",
  "wordCount": 1250,
  "titleFr": "Traduction française du titre en une phrase claire",
  "highlights": [
    "Point fort 1 spécifique à cet article",
    "Point fort 2 (ex: nombre d'exemples, tableaux, FAQ)",
    "Point fort 3 (ex: liens internes vérifiés)",
    "Point fort 4 (ex: bloc GEO conforme)",
    "Point fort 5 (ex: aucun tiret cadratin)"
  ],
  "targetAudience": "Description courte du public cible en français",
  "content": "محتوى المقال الكامل بصيغة Markdown..."
}`;

console.log("🤖 Génération article (claude-3-5-sonnet)...");
const raw = await callClaude(prompt, 7000);

// Parser le JSON
let parsed;
try {
  const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, raw];
  const jsonStr = jsonMatch[1].trim();
  parsed = JSON.parse(jsonStr);
} catch (e) {
  // Tentative de récupération si JSON partiel
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    parsed = JSON.parse(raw.slice(start, end + 1));
  } catch (e2) {
    console.error("❌ Erreur parsing JSON:", e2.message);
    console.error("Début de la réponse:", raw.slice(0, 300));
    process.exit(1);
  }
}

const { excerpt, tags, keywords, wordCount, content, titleFr, highlights, targetAudience } = parsed;

// Compter les mots réels
const actualWords = content.replace(/[#*`>\[\]()]/g, "").trim().split(/\s+/).length;

// Construire le frontmatter
const frontmatter = `---
title: "${nextTopic.title.replace(/"/g, '\\"')}"
excerpt: "${(excerpt || "").replace(/"/g, '\\"')}"
date: "${today}"
author: "فريق ArabClaw"
tags: ${JSON.stringify(tags || ["OpenClaw", "ذكاء اصطناعي", "أتمتة"])}
language: "ar"
keywords: "${(keywords || "").replace(/"/g, '\\"')}"
canonical: "https://arabclaw.com/blog/${nextTopic.slug}"
---

`;

const filePath = path.join(CONTENT_DIR, `${nextTopic.slug}.md`);
fs.writeFileSync(filePath, frontmatter + content, "utf8");

console.log(`✅ Article écrit : ${nextTopic.slug}.md`);
console.log(`📊 Mots estimés : ${wordCount || actualWords}`);
console.log(`📄 Titre : ${nextTopic.title}`);
console.log(`PUBLISH_SLUG=${nextTopic.slug}`);
console.log(`PUBLISH_TITLE=${nextTopic.title}`);
console.log(`PUBLISH_WORDS=${wordCount || actualWords}`);
console.log(`PUBLISH_CATEGORY=${category.name}`);
console.log(`PUBLISH_TITLE_FR=${titleFr || ""}`);
console.log(`PUBLISH_HIGHLIGHTS=${(highlights || []).join("|")}`);
console.log(`PUBLISH_TARGET=${targetAudience || ""}`);
