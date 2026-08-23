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
      { slug: "openclaw-hooks-system-deep-dive", title: "نظام Hooks في أوبن كلاو: التخصيص والتحكم الكامل في سلوك الوكيل" },
      { slug: "openclaw-canvas-tool-visual-outputs", title: "أداة Canvas في أوبن كلاو: إنشاء مخرجات بصرية تفاعلية" },
      { slug: "openclaw-browser-automation-arabic", title: "أتمتة المتصفح مع أوبن كلاو: تصفح الويب وسحب البيانات تلقائياً" },
      { slug: "openclaw-context-window-optimization", title: "تحسين نافذة السياق في أوبن كلاو لأقصى أداء ممكن" },
      { slug: "openclaw-tools-md-configuration-guide", title: "ملف TOOLS.md في أوبن كلاو: دليل التخصيص الكامل لأدواتك" },
      { slug: "openclaw-session-management-advanced", title: "إدارة الجلسات المتقدمة في أوبن كلاو: sessions_list وsessions_spawn" },
      { slug: "openclaw-skill-workshop-create-publish", title: "ورشة Skills في أوبن كلاو: من الإنشاء إلى النشر والمشاركة" },
      { slug: "openclaw-gateway-config-optimization", title: "تحسين إعدادات Gateway في أوبن كلاو للأداء الأمثل" },
      { slug: "openclaw-mcp-tools-integration-arabic", title: "دمج أدوات MCP في أوبن كلاو: توسيع قدرات وكيلك الذكي" },
      { slug: "openclaw-workflows-automation-arabic", title: "بناء Workflows متعددة الخطوات في أوبن كلاو: أتمتة العمليات المعقدة" },
      { slug: "openclaw-webhooks-integration-arabic", title: "دمج Webhooks مع أوبن كلاو: ربط وكيلك بالتطبيقات الخارجية" },
      { slug: "openclaw-custom-slash-commands-arabic", title: "إنشاء أوامر Slash مخصصة في أوبن كلاو لتسريع سير عملك" },
      { slug: "openclaw-daily-notes-memory-management", title: "إدارة الملاحظات اليومية والذاكرة في أوبن كلاو: بناء ذاكرة طويلة الأمد" },
      { slug: "openclaw-heartbeat-proactive-agent-arabic", title: "نبضات القلب (Heartbeat) في أوبن كلاو: اجعل وكيلك استباقياً وذكياً" },
      { slug: "openclaw-taskflow-durable-jobs-arabic", title: "TaskFlow في أوبن كلاو: إدارة المهام الطويلة والمتقطعة باحترافية" },
    ],
  },
  {
    name: "وكلاء الذكاء الاصطناعي",
    topics: [
      { slug: "openclaw-autonomous-agent-vs-chatbot", title: "الوكيل الذكي المستقل مقابل chatbot: ما الفرق الحقيقي؟" },
      { slug: "openclaw-agent-workflow-design-arabic", title: "تصميم سير عمل وكلاء الذكاء الاصطناعي: أفضل الممارسات" },
      { slug: "openclaw-llm-local-vs-cloud-arabic", title: "نماذج اللغة المحلية مقابل السحابية في أوبن كلاو: مقارنة شاملة" },
      { slug: "openclaw-agent-arab-customer-service", title: "بناء وكيل ذكاء اصطناعي لخدمة العملاء العرب من الصفر" },
      { slug: "openclaw-multi-model-routing-arabic", title: "توجيه المهام بين نماذج AI متعددة في أوبن كلاو: Opus أم Sonnet أم Haiku؟" },
      { slug: "openclaw-agent-personal-finance-arabic", title: "وكيل ذكاء اصطناعي لإدارة ميزانيتك الشخصية بالعربية" },
      { slug: "openclaw-content-creation-agent-arabic", title: "بناء وكيل إنشاء محتوى عربي احترافي مع أوبن كلاو" },
      { slug: "openclaw-voice-agent-arabic-calls", title: "وكيل صوتي عربي مع أوبن كلاو: الرد التلقائي على المكالمات" },
      { slug: "openclaw-agent-data-analysis-arabic", title: "وكيل تحليل البيانات بالعربية: من الأرقام إلى القرارات مع أوبن كلاو" },
      { slug: "openclaw-research-agent-arabic-web", title: "وكيل البحث الذكي: جمع المعلومات وتلخيصها تلقائياً بالعربية" },
      { slug: "openclaw-agent-email-management-arabic", title: "وكيل إدارة البريد الإلكتروني العربي: الرد التلقائي والتصنيف الذكي" },
      { slug: "openclaw-trading-bot-arabic-markets", title: "بوت التداول الذكي مع أوبن كلاو: مراقبة الأسواق العربية تلقائياً" },
      { slug: "openclaw-agent-arabic-translation-localization", title: "وكيل الترجمة والتعريب التلقائي: نشر محتوى متعدد اللغات مع أوبن كلاو" },
      { slug: "openclaw-agent-social-listening-arabic", title: "وكيل الاستماع الاجتماعي: مراقبة العلامة التجارية على منصات التواصل بالعربية" },
      { slug: "openclaw-agent-inventory-management-arabic", title: "وكيل إدارة المخزون الذكي: تتبع المنتجات والتنبيهات التلقائية مع أوبن كلاو" },
      { slug: "openclaw-agent-news-monitoring-arabic", title: "وكيل رصد الأخبار العربية: متابعة المصادر وتلخيص المستجدات تلقائياً" },
      { slug: "openclaw-agent-document-processing-arabic", title: "وكيل معالجة المستندات: استخراج البيانات من الملفات العربية تلقائياً" },
      { slug: "openclaw-multi-agent-team-collaboration-arabic", title: "فريق من الوكلاء الأذكياء: تنسيق مهام متعددة بالتوازي مع أوبن كلاو" },
      { slug: "openclaw-agent-appointment-scheduling-arabic", title: "وكيل جدولة المواعيد الذكي: تنظيم أجندتك تلقائياً بالعربية" },
    ],
  },
  {
    name: "مقارنات الأدوات",
    topics: [
      { slug: "openclaw-vs-langchain-arabic", title: "أوبن كلاو مقابل LangChain: أيهما أنسب للمطوّر العربي؟" },
      { slug: "openclaw-vs-autogen-microsoft", title: "أوبن كلاو مقابل AutoGen: مقارنة إطارات الوكلاء الذكية" },
      { slug: "openclaw-vs-flowise-nocode-arabic", title: "أوبن كلاو مقابل Flowise: البديل المفتوح المصدر للمستخدم العربي" },
      { slug: "openclaw-vs-dify-ai-comparison", title: "أوبن كلاو مقابل Dify: مقارنة منصات الذكاء الاصطناعي التجاري" },
      { slug: "openclaw-vs-claude-desktop-comparison", title: "أوبن كلاو مقابل Claude Desktop: أيهما يناسب احتياجاتك؟" },
      { slug: "openclaw-vs-chatgpt-plus-arabic", title: "أوبن كلاو مقابل ChatGPT Plus: مقارنة شاملة للمستخدم العربي" },
      { slug: "openclaw-vs-cursor-code-assistant", title: "أوبن كلاو مقابل Cursor: أيهما أفضل لمساعد البرمجة؟" },
      { slug: "openclaw-vs-notion-ai-productivity", title: "أوبن كلاو مقابل Notion AI: الإنتاجية الذكية لرجل الأعمال العربي" },
      { slug: "openclaw-vs-perplexity-research-arabic", title: "أوبن كلاو مقابل Perplexity: أيهما أفضل للبحث باللغة العربية؟" },
      { slug: "openclaw-vs-copilot-microsoft-arabic", title: "أوبن كلاو مقابل Microsoft Copilot: مقارنة لرجل الأعمال العربي" },
      { slug: "openclaw-vs-gemini-google-arabic", title: "أوبن كلاو مقابل Gemini من Google: أيهما يخدم المستخدم العربي أكثر؟" },
      { slug: "openclaw-vs-mistral-ai-arabic", title: "أوبن كلاو مقابل Mistral AI: مقارنة النماذج الأوروبية للسوق العربي" },
      { slug: "openclaw-vs-cohere-enterprise-arabic", title: "أوبن كلاو مقابل Cohere: أيهما أفضل للمؤسسات العربية؟" },
      { slug: "openclaw-vs-crewai-agents-arabic", title: "أوبن كلاو مقابل CrewAI: مقارنة أطر تنسيق الوكلاء الذكية" },
      { slug: "openclaw-vs-relevance-ai-arabic", title: "أوبن كلاو مقابل Relevance AI: أيهما أنسب لبناء وكلاء الأعمال؟" },
      { slug: "openclaw-vs-lindy-ai-arabic", title: "أوبن كلاو مقابل Lindy AI: مقارنة مساعدي الأتمتة الشخصية" },
      { slug: "openclaw-vs-manus-ai-arabic", title: "أوبن كلاو مقابل Manus AI: أيهما أقوى للوكيل المستقل؟" },
      { slug: "openclaw-vs-devin-coding-arabic", title: "أوبن كلاو مقابل Devin: أيهما أفضل لمساعد البرمجة المستقل؟" },
      { slug: "openclaw-vs-n8n-ai-workflows-arabic", title: "أوبن كلاو مقابل n8n: أتمتة سير العمل بالذكاء الاصطناعي للسوق العربي" },
    ],
  },
  {
    name: "الذكاء الاصطناعي في العالم العربي",
    topics: [
      { slug: "ai-arabic-language-models-2026", title: "نماذج اللغة العربية في 2026: هل وصلنا إلى التكافؤ مع الإنجليزية؟" },
      { slug: "digital-sovereignty-arab-world-ai", title: "السيادة الرقمية في العالم العربي: لماذا الحلول المحلية أمر لا بد منه" },
      { slug: "ai-startups-gulf-region-2026", title: "الشركات الناشئة في مجال الذكاء الاصطناعي بمنطقة الخليج: أبرز اللاعبين 2026" },
      { slug: "openclaw-arabic-rtl-interface-guide", title: "دعم اللغة العربية RTL في أوبن كلاو: التخصيص الكامل" },
      { slug: "openclaw-arabic-education-sector-ai", title: "الذكاء الاصطناعي في التعليم العربي: كيف يغير أوبن كلاو قطاع التعليم" },
      { slug: "openclaw-halal-fintech-arabic-market", title: "الذكاء الاصطناعي في التمويل الإسلامي: تطبيقات أوبن كلاو للفينتك الحلال" },
      { slug: "openclaw-arabic-media-newsroom-ai", title: "الذكاء الاصطناعي في غرفة الأخبار العربية: تجربة أوبن كلاو مع وسائل الإعلام" },
      { slug: "openclaw-saudi-vision-2030-ai-tools", title: "أدوات الذكاء الاصطناعي ورؤية 2030: كيف يدعم أوبن كلاو التحول الرقمي السعودي" },
      { slug: "openclaw-egypt-digital-transformation-ai", title: "التحول الرقمي في مصر: دور الذكاء الاصطناعي وأوبن كلاو في الاقتصاد المصري" },
      { slug: "openclaw-morocco-tech-startup-ecosystem", title: "منظومة الشركات الناشئة في المغرب: كيف يدعم أوبن كلاو رواد الأعمال المغاربة" },
      { slug: "openclaw-arabic-dialect-ai-support", title: "اللهجات العربية والذكاء الاصطناعي: كيف يتعامل أوبن كلاو مع التنوع اللغوي" },
      { slug: "openclaw-arab-women-tech-empowerment", title: "تمكين المرأة العربية التقنية: كيف يفتح أوبن كلاو أبواباً جديدة للريادة" },
      { slug: "openclaw-uae-ai-strategy-tools", title: "استراتيجية الإمارات للذكاء الاصطناعي: أوبن كلاو وأجندة الإمارات 2031" },
      { slug: "openclaw-qatar-ai-national-strategy", title: "استراتيجية قطر الوطنية للذكاء الاصطناعي: كيف يدعم أوبن كلاو التحول الرقمي" },
      { slug: "openclaw-jordan-tech-hub-ai", title: "الأردن مركزاً تقنياً صاعداً: دور الذكاء الاصطناعي وأوبن كلاو" },
      { slug: "openclaw-arabic-nlp-challenges-solutions", title: "تحديات معالجة اللغة العربية الطبيعية: كيف يتغلب عليها أوبن كلاو" },
      { slug: "openclaw-gcc-smart-cities-ai", title: "المدن الذكية في الخليج: تطبيقات الذكاء الاصطناعي وأوبن كلاو" },
      { slug: "openclaw-arab-freelancers-ai-tools", title: "المستقلون العرب والذكاء الاصطناعي: كيف يضاعف أوبن كلاو إنتاجيتك ودخلك" },
      { slug: "openclaw-tunisia-startup-ai-ecosystem", title: "منظومة الشركات الناشئة في تونس: الذكاء الاصطناعي وأوبن كلاو محركاً للنمو" },
    ],
  },
  {
    name: "دليل المبتدئين",
    topics: [
      { slug: "what-is-openclaw-complete-guide-ar", title: "ما هو أوبن كلاو؟ الدليل الشامل للمبتدئين بالعربية" },
      { slug: "openclaw-first-week-setup-checklist", title: "قائمة التحقق لأسبوعك الأول مع أوبن كلاو" },
      { slug: "openclaw-common-mistakes-beginners", title: "أشيع 10 أخطاء يقع فيها المبتدئون مع أوبن كلاو وكيف تتجنبها" },
      { slug: "openclaw-telegram-bot-setup-arabic", title: "ربط أوبن كلاو بتيليغرام: خطوات الإعداد الكامل" },
      { slug: "openclaw-install-windows-wsl-arabic", title: "تثبيت أوبن كلاو على Windows عبر WSL: دليل المبتدئين خطوة بخطوة" },
      { slug: "openclaw-api-keys-setup-arabic", title: "إعداد مفاتيح API في أوبن كلاو: دليل مفصل للمبتدئين" },
      { slug: "openclaw-first-agent-tutorial-arabic", title: "إنشاء وكيلك الذكي الأول مع أوبن كلاو في 15 دقيقة" },
      { slug: "openclaw-discord-setup-arabic-guide", title: "ربط أوبن كلاو بـ Discord: دليل الإعداد الكامل بالعربية" },
      { slug: "openclaw-signal-whatsapp-integration-beginners", title: "ربط أوبن كلاو بـ Signal وواتساب: دليل المبتدئين للتواصل الذكي" },
      { slug: "openclaw-linux-ubuntu-install-guide-arabic", title: "تثبيت أوبن كلاو على Linux Ubuntu: دليل خطوة بخطوة بالعربية" },
      { slug: "openclaw-backup-restore-workspace-arabic", title: "النسخ الاحتياطي واستعادة بيئة العمل في أوبن كلاو: دليل المبتدئين" },
      { slug: "openclaw-troubleshooting-common-errors-arabic", title: "حل المشاكل الشائعة في أوبن كلاو: دليل استكشاف الأخطاء وإصلاحها" },
      { slug: "openclaw-update-upgrade-guide-arabic", title: "تحديث أوبن كلاو إلى أحدث إصدار: دليل الترقية الآمنة بالعربية" },
      { slug: "openclaw-macos-install-guide-arabic", title: "تثبيت أوبن كلاو على macOS: دليل المبتدئين الكامل بالعربية" },
      { slug: "openclaw-choosing-right-model-beginners-arabic", title: "كيف تختار النموذج المناسب في أوبن كلاو: Opus أم Sonnet أم Haiku؟" },
      { slug: "openclaw-first-cron-job-setup-arabic", title: "إعداد أول مهمة مجدولة (cron) في أوبن كلاو: دليل المبتدئين خطوة بخطوة" },
      { slug: "openclaw-understanding-agents-workspace-arabic", title: "فهم بيئة عمل الوكيل في أوبن كلاو: ملفات AGENTS وSOUL وMEMORY" },
      { slug: "openclaw-mobile-node-setup-arabic", title: "ربط هاتفك بأوبن كلاو: إعداد Node على iOS وAndroid للمبتدئين" },
      { slug: "openclaw-security-basics-beginners-arabic", title: "أساسيات الأمان في أوبن كلاو: حماية مفاتيحك وبياناتك للمبتدئين" },
    ],
  },
  {
    name: "حالات الاستخدام التجاري",
    topics: [
      { slug: "openclaw-ecommerce-order-tracking-automation", title: "أتمتة تتبع الطلبات والشحن في التجارة الإلكترونية مع أوبن كلاو" },
      { slug: "openclaw-accounting-invoicing-arab-sme", title: "المحاسبة والفوترة التلقائية للشركات الصغيرة والمتوسطة العربية" },
      { slug: "openclaw-social-media-scheduler-arabic", title: "جدولة منشورات وسائل التواصل الاجتماعي بالعربية مع أوبن كلاو" },
      { slug: "openclaw-lead-generation-crm-arabic", title: "توليد العملاء المحتملين وإدارة CRM تلقائياً مع أوبن كلاو" },
      { slug: "openclaw-real-estate-arabic-automation", title: "أتمتة العقارات بالعربية: من إدارة العملاء إلى العقود مع أوبن كلاو" },
      { slug: "openclaw-medical-clinic-appointments-ai", title: "نظام مواعيد العيادة الذكي: أوبن كلاو في القطاع الطبي العربي" },
      { slug: "openclaw-hr-recruitment-automation-arabic", title: "أتمتة الموارد البشرية والتوظيف مع أوبن كلاو للشركات العربية" },
      { slug: "openclaw-legal-contract-review-arabic", title: "مراجعة العقود القانونية تلقائياً مع أوبن كلاو: حالة استخدام المحامين العرب" },
      { slug: "openclaw-restaurant-menu-ordering-bot", title: "بوت الطلبات الذكي للمطاعم: أوبن كلاو يحول تجربة العملاء العرب" },
      { slug: "openclaw-travel-agency-automation-arabic", title: "أتمتة وكالة السفر العربية: الحجوزات والعروض تلقائياً مع أوبن كلاو" },
      { slug: "openclaw-school-admin-automation-arabic", title: "أتمتة الإدارة المدرسية مع أوبن كلاو: من التسجيل إلى التواصل مع الأهالي" },
      { slug: "openclaw-logistics-tracking-arabic-sme", title: "أتمتة اللوجستيات وتتبع الشحنات للشركات العربية الصغيرة مع أوبن كلاو" },
      { slug: "openclaw-insurance-claims-automation-arabic", title: "أتمتة مطالبات التأمين مع أوبن كلاو: تسريع الخدمة وتقليل الأخطاء" },
      { slug: "openclaw-dental-clinic-automation-arabic", title: "أتمتة عيادة الأسنان مع أوبن كلاو: المواعيد والتذكير ومتابعة المرضى" },
      { slug: "openclaw-gym-fitness-membership-automation-arabic", title: "أتمتة الصالات الرياضية مع أوبن كلاو: إدارة الاشتراكات والتذكير بالتجديد" },
      { slug: "openclaw-car-dealership-leads-arabic", title: "أتمتة معارض السيارات مع أوبن كلاو: توليد العملاء ومتابعة الاستفسارات" },
      { slug: "openclaw-pharmacy-inventory-automation-arabic", title: "أتمتة الصيدليات مع أوبن كلاو: إدارة المخزون وتنبيهات نفاد الأدوية" },
      { slug: "openclaw-event-management-automation-arabic", title: "أتمتة تنظيم الفعاليات مع أوبن كلاو: التسجيل والدعوات والتذكير التلقائي" },
      { slug: "openclaw-freelancer-client-management-arabic", title: "أتمتة إدارة العملاء للمستقلين العرب: من العرض إلى الفاتورة مع أوبن كلاو" },
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
  const isOAuth = ANTHROPIC_API_KEY.startsWith("sk-ant-oat");
  const authHeaders = isOAuth
    ? { "Authorization": `Bearer ${ANTHROPIC_API_KEY}`, "anthropic-beta": "oauth-2025-04-20" }
    : { "x-api-key": ANTHROPIC_API_KEY };

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      ...authHeaders,
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
