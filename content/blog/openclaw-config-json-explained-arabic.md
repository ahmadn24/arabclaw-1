---
title: "شرح ملف الإعدادات openclaw.json للمبتدئين: كل خيار وماذا يفعل"
excerpt: "تعلم فهم ملف openclaw.json خطوة بخطوة: شرح كل خيار إعداد وتأثيره العملي على أداء أتمتتك وسلوك الوكلاء الذكيين."
date: "2026-10-20"
author: "فريق ArabClaw"
tags: ["أوبن كلاو","الإعدادات","openclaw.json","الأتمتة","البرمجة"]
language: "ar"
keywords: "openclaw.json، ملف الإعدادات، أوبن كلاو، الأتمتة، إعدادات الوكلاء"
canonical: "https://arabclaw.com/blog/openclaw-config-json-explained-arabic"
---

> **ما ستتعلمه:** ستفهم معنى كل سطر في ملف openclaw.json وكيف يؤثر على عمل الأتمتة، وستتمكن من كتابة وتعديل الملف بنفسك دون الخوف من الأخطاء.

---

## المقدمة

عندما تفتح مشروع أوبن كلاو (OpenClaw) جديد للمرة الأولى، قد تجد نفسك أمام ملف اسمه `openclaw.json` ويبدو وكأنه رموز غريبة ومعقدة. هذا الملف ليس خطيراً كما يبدو. إنه ببساطة طريقة أوبن كلاو في "التحدث" معك وتخزين كل الإعدادات التي تتحكم في سلوك مشروعك.

في هذا الدليل، سنفكك هذا الملف سطراً بسطر، بدون الحشو الممل. ستتعلم ماذا يعني كل جزء، ومتى تحتاج إلى تغييره، وما الذي قد يحدث إذا أخطأت (لا تقلق، الأخطاء لا تحرق مشروعك).

---

## القسم الأول: بنية openclaw.json والمستويات الأساسية

ملف `openclaw.json` مكتوب بصيغة JSON، وهي لغة بسيطة جداً. تتكون من أزواج مفتاح-قيمة: المفتاح هو الاسم (مثل "name")، والقيمة هي البيان (مثل "مشروعي الأول").

الملف الأساسي يبدو هكذا:

```json
{
  "version": "1.0",
  "name": "My First Automation",
  "description": "A simple workflow",
  "agents": [],
  "workflows": []
}
```

كل هذه الأقسام لها دور واضح:

- **version**: رقم إصدار الملف. يساعد أوبن كلاو على معرفة صيغة الملف المستخدمة. إذا كنت تستخدم أوبن كلاو الحديث، ستبقى هذه القيمة ثابتة في معظم الأحيان.
- **name**: اسم مشروعك. وضح هنا ما الذي يفعله مشروعك بكلمات إنسانية بسيطة.
- **description**: وصف موجز عن الغرض من المشروع. سيساعدك وفريقك على تذكر ما يفعله هذا المشروع بعد أسابيع.
- **agents**: قائمة بالوكلاء الذكيين التي ستستخدمها (شاهد [تنسيق وكلاء متعددين مع أوبن كلاو](/blog/2026-03-22-multi-agent-orchestration-openclaw) لفهم متقدم).
- **workflows**: تسلسل العمليات والخطوات التي سيقوم بها الوكيل.

---

## القسم الثاني: خيارات الوكلاء (Agents)

الوكيل هو برنامج ذكي يقوم بالعمل نيابة عنك. كل وكيل له إعدادات خاصة به داخل القسم `agents`.

مثال على وكيل كامل:

```json
{
  "id": "agent_1",
  "name": "Email Assistant",
  "type": "claude",
  "model": "claude-3-5-sonnet",
  "temperature": 0.7,
  "maxTokens": 2048,
  "systemPrompt": "You are a helpful email assistant. Reply professionally.",
  "tools": [
    "send_email",
    "draft_reply"
  ],
  "retryPolicy": {
    "maxAttempts": 3,
    "delayMs": 1000
  }
}
```

فيما يلي شرح كل خيار:

| الخيار | الهدف | القيمة الافتراضية | ملاحظات |
|--------|-------|-------------------|----------|
| `id` | معرف فريد للوكيل | (لا يوجد) | استخدم أسماء واضحة مثل "email_bot" بدلاً من "agent_1" |
| `name` | الاسم الظاهري | (لا يوجد) | ما ستقرأه أنت وزملاؤك في التقارير |
| `type` | نوع الوكيل | "claude" | حالياً، أوبن كلاو يدعم "claude" بشكل أساسي |
| `model` | نموذج الذكاء الاصطناعي | "claude-3-5-sonnet" | يمكنك اختيار نماذج أخرى مثل claude-3-opus (أقوى لكن أغلى) |
| `temperature` | مستوى الإبداع | 0.7 | من 0 (حرفي جداً) إلى 1 (عشوائي). استخدم 0 للعمليات الدقيقة مثل الترجمة |
| `maxTokens` | الحد الأقصى لكلمات الرد | 2048 | زد هذا إذا كنت تتوقع ردوداً طويلة |
| `systemPrompt` | تعليمات الوكيل الأساسية | (مخصص) | هنا تخبر الوكيل "من أنت" و"ماذا تفعل" |
| `tools` | الأدوات المتاحة | [] | قائمة بالأشياء التي يمكن للوكيل فعلها (إرسال بريد، استعلام قاعدة بيانات، إلخ) |
| `retryPolicy` | إعادة المحاولة عند الفشل | (مخصص) | كم مرة سيحاول الوكيل إذا حدث خطأ، وكم ثانية ينتظر بين المحاولات |

---

## القسم الثالث: الأسلوب Workflows (تدفقات العمل)

الـ Workflow هو الخريطة التي تخبر أوبن كلاو بالترتيب الذي يجب أن تحدث الأشياء فيه. إذا كان الوكيل هو العامل، فالـ Workflow هو خطة العمل.

مثال على Workflow بسيط:

```json
{
  "id": "workflow_email_processor",
  "name": "Email Processing Pipeline",
  "trigger": {
    "type": "webhook",
    "path": "/incoming-email"
  },
  "steps": [
    {
      "id": "step_1",
      "name": "Receive Email",
      "agent": "email_reader",
      "action": "read_email",
      "input": "${trigger.body}"
    },
    {
      "id": "step_2",
      "name": "Classify Email",
      "agent": "email_classifier",
      "action": "classify",
      "input": "${step_1.output}"
    },
    {
      "id": "step_3",
      "name": "Send Response",
      "agent": "email_responder",
      "action": "send_email",
      "input": "${step_2.classification}"
    }
  ],
  "errorHandler": {
    "type": "log_and_notify",
    "notifyEmail": "admin@example.com"
  }
}
```

شرح الأجزاء الرئيسية:

- **trigger**: متى يبدأ هذا الـ Workflow؟ هنا استخدمنا webhook، وهو عنوان ويب يمكنك إرسال البيانات إليه. أنواع triggers أخرى: `schedule` (توقيت معين)، `event` (حدث معين).
- **steps**: قائمة الخطوات بالترتيب. كل خطوة تستدعي وكيلاً محدداً لتنفيذ إجراء معين.
- **input**: ماذا نعطي الوكيل؟ لاحظ الرمز `${}` — هذا يعني "خذ النتيجة من خطوة سابقة". مثلاً `${step_1.output}` معناه "استخدم ناتج الخطوة الأولى".
- **errorHandler**: ماذا نفعل إذا حدث خطأ؟ يمكن تسجيله فقط، أو إرسال تنبيه، أو إيقاف العملية برمتها.

أنواع الـ Triggers الشائعة:

1. **webhook**: يتم تفعيل الـ Workflow عندما يرسل شيء طلب HTTP إلى عنوان معين
2. **schedule**: يعمل في وقت معين (كل يوم في الساعة 9 صباحاً مثلاً)
3. **event**: ينتظر حدثاً معيناً (مثل: عند استقبال بريد جديد، أو عند التعليق على منشور)

---

## القسم الرابع: الإعدادات العامة والمتقدمة

بعض الخيارات لا تندرج تحت agents أو workflows، بل توجد في المستوى الأعلى من الملف:

```json
{
  "version": "1.0",
  "name": "My Automation",
  "environment": "production",
  "timeout": 30000,
  "logging": {
    "level": "info",
    "destination": "console"
  },
  "authentication": {
    "type": "apikey",
    "key": "${OPENCLAW_API_KEY}"
  }
}
```

إليك ما تفعله هذه الخيارات:

- **environment**: هل أنت في بيئة اختبار أم الإنتاج الفعلي؟ في الاختبار، قد تستخدم بيانات وهمية. في الإنتاج، تستخدم البيانات الحقيقية.
- **timeout**: كم ثانية ننتظر قبل أن نستسلم؟ القيمة 30000 تعني 30 ثانية. إذا كان الوكيل يحتاج وقتاً أطول، زد هذا الرقم.
- **logging**: سجل كل ما يحدث. هذا مفيد جداً عند البحث عن مشاكل. `level: "info"` يعني سجل المعلومات المهمة فقط. `level: "debug"` سيسجل كل شيء (مفيد عند البحث عن خطأ).
- **authentication**: كيف تثبت أنك تملك هذا المشروع؟ عادة تستخدم مفتاح API. لاحظ `${OPENCLAW_API_KEY}` — هذا يعني "خذ هذا المفتاح من متغيرات البيئة" (ملف مخفي على جهازك).

---

## التطبيق العملي: بناء أتمتة بريد بسيطة من الصفر

فلنفترض أنك تشتغل في شركة بيع كتب صغيرة باسم "مكتبة الشرق". تستقبل 20-30 بريد يومي من عملاء يسألون عن توفر كتاب معين. تريد وكيلاً ذكياً يرد على هذه الرسائل تلقائياً.

هذا ملف `openclaw.json` كامل لهذه المشكلة:

```json
{
  "version": "1.0",
  "name": "Bookstore Email Responder",
  "description": "Automated system to reply to customer inquiries about book availability at Bookstore Al-Sharq",
  "environment": "production",
  "timeout": 20000,
  "logging": {
    "level": "info",
    "destination": "file",
    "filePath": "./logs/bookstore.log"
  },
  "agents": [
    {
      "id": "book_inquiry_bot",
      "name": "Book Inquiry Responder",
      "type": "claude",
      "model": "claude-3-5-sonnet",
      "temperature": 0.5,
      "maxTokens": 1024,
      "systemPrompt": "You are a helpful customer service assistant for Bookstore Al-Sharq, a traditional bookstore in the Arab region. You answer questions about book availability in Arabic. Be professional, warm, and always ask for the customer's preferred contact method if they want to order. If you don't have the book information, suggest they visit our store or call us.",
      "tools": [
        "query_inventory",
        "send_email_reply"
      ],
      "retryPolicy": {
        "maxAttempts": 2,
        "delayMs": 2000
      }
    }
  ],
  "workflows": [
    {
      "id": "email_intake_workflow",
      "name": "Customer Email Processing",
      "description": "Receives customer emails and routes them to the appropriate handler",
      "trigger": {
        "type": "email",
        "service": "gmail",
        "account": "info@bookstore-sharq.com",
        "filter": "subject:availability OR subject:توفر"
      },
      "steps": [
        {
          "id": "step_receive",
          "name": "Extract Email Details",
          "agent": "book_inquiry_bot",
          "action": "parse_email",
          "input": "${trigger.email_body}"
        },
        {
          "id": "step_check_inventory",
          "name": "Check Book Inventory",
          "agent": "book_inquiry_bot",
          "action": "query_inventory",
          "input": "${step_receive.book_title}"
        },
        {
          "id": "step_compose",
          "name": "Compose Response",
          "agent": "book_inquiry_bot",
          "action": "compose_response",
          "input": {
            "customer_email": "${trigger.sender}",
            "book_title": "${step_receive.book_title}",
            "inventory_status": "${step_check_inventory.availability}"
          }
        },
        {
          "id": "step_send",
          "name": "Send Reply",
          "agent": "book_inquiry_bot",
          "action": "send_email_reply",
          "input": {
            "to": "${trigger.sender}",
            "subject": "رد: ${trigger.subject}",
            "body": "${step_compose.response}"
          }
        }
      ],
      "errorHandler": {
        "type": "escalate_to_human",
        "notifyEmail": "manager@bookstore-sharq.com",
        "assignLabel": "needs_manual_review"
      }
    }
  ]
}
```

**ماذا يحدث هنا، خطوة بخطوة:**

1. يصل بريد من عميل إلى `info@bookstore-sharq.com`
2. أوبن كلاو يتقبل البريد (trigger من نوع email)
3. الوكيل "book_inquiry_bot" يقرأ البريد ويستخرج اسم الكتاب المطلوب
4. ينادي قاعدة البيانات: "هل هذا الكتاب موجود عندنا؟"
5. بناءً على النتيجة، ينشئ رد ودود وتلقائي
6. يرسل الرد للعميل
7. إذا حدث أي خطأ (مثل: لا يمكن الوصول لقاعدة البيانات)، يرسل تنبيهاً للمدير بدلاً من أن تتعطل العملية برمتها

---

## الأسئلة الشائعة

### سؤال 1: ماذا يعني "temperature" تماماً؟ ولماذا قد أغيره؟

**الجواب:** الـ temperature تتحكم في "عشوائية" الرد. إذا قلتها إلى 0، الوكيل سيعطيك دائماً نفس الرد لنفس السؤال (حرفي جداً). إذا رفعتها إلى 1، قد يعطيك ردوداً مختلفة ومبتكرة حتى لنفس السؤال. استخدم 0 أو 0.3 عندما تريد دقة (مثل: ترجمة أو استخراج بيانات)، واستخدم 0.7-0.9 عندما تريد إبداعاً (مثل: كتابة محتوى أو صياغة أفكار جديدة).

### سؤال 2: هل يجب أن أشرح كل شيء في systemPrompt؟

**الجواب:** نعم، وكلما كنت أوضح، كلما أعطاك الوكيل ما تريد بالضبط. تجنب الكلام الغامض. بدلاً من "كن مساعداً"، قل "أنت مساعد خدمة عملاء متخصص في المنتجات الإلكترونية. رد باللغة العربية فقط. إذا لم تعرف الإجابة، قل: 'سأتواصل معك قريباً'."

### سؤال 3: ماذا لو أخطأت في كتابة JSON؟

**الجواب:** أوبن كلاو سيرفع خطأ ويخبرك بالسطر الذي فيه المشكلة. الأخطاء الشائعة: نسيان فاصلة بين الأقسام، أو علامات اقتباس غير متطابقة، أو قوس ناقص. استخدم موقع مثل [JSONLint.com](https://jsonlint.com) لفحص الملف قبل تحميله. لا داعي للخوف، أسوأ ما يحدث أن لا يعمل المشروع حتى تصلح الملف.

### سؤال 4: هل يمكن لـ workflow واحد أن يستخدم أكثر من وكيل؟

**الجواب:** بالتأكيد، نعم. في الواقع، هذا هو الأفضل في كثير من الحالات. يمكن لخطوة واحدة أن تستدعي وكيلاً متخصصاً في قراءة البريد، والخطوة التالية تستدعي وكيلاً آخر متخصصاً في الترجمة، والخطوة الثالثة تستدعي وكيلاً في الإرسال. هذا يسمى "تنسيق وكلاء متعددين" وهو سر القوة الحقيقية لأوبن كلاو (اقرأ [تنسيق وكلاء متعددين مع أوبن كلاو](/blog/2026-03-22-multi-agent-orchestration-openclaw) لفهم أعمق).

### سؤال 5: أين أضع المفاتيح السرية مثل API keys؟

**الجواب:** **أبداً** لا تضعها مباشرة في openclaw.json. استخدم متغيرات البيئة (Environment Variables). أنشئ ملف `.env` في نفس المجلد (لكن أضفه إلى `.gitignore` حتى لا يتم تحميله للإنترنت)، ثم استخدم الصيغة `${VARIABLE_NAME}` في openclaw.json. مثال:

```
# ملف .env
GMAIL_PASSWORD=your_actual_password_here
OPENCLAW_API_KEY=your_api_key_here
```

ثم في openclaw.json:
```json
"email_password": "${GMAIL_PASSWORD}"
```

---

## الخلاصة والخطوات التالية

ملف `openclaw.json` ليس شيئاً معقداً أو مخيفاً. إنه ببساطة لغة منظمة تخبر أوبن كلاو بماذا تريد. كل جزء له دور واضح: الوكلاء هم العمال، والـ Workflows هي خطط العمل، والإعدادات تتحكم في التفاصيل الدقيقة.

الآن أن فهمت الأساسيات، جرب بنفسك:

1. اخلق ملف `openclaw.json` بسيط مع وكيل واحد و workflow واحد
2. ابدأ بحالة استخدام صغيرة وحقيقية (مثل: إرسال تنبيه يومي، أو ترجمة نص)
3. اختبره في بيئة الاختبار أولاً قبل الإنتاج
4. اقرأ [ما هو أوبن كلاو؟ الدليل الشامل](/blog/what-is-openclaw-complete-guide-ar) لفهم أعمق

إذا لم تكن تريد الدخول في البرمجة من الآن، يمكنك أيضاً استخدام [فارس، المساعد الذكي العربي على تيليجرام](https://fares.arabclaw.com) — وهو منتج جاهز مبني على أوبن كلاو يوفر الكثير من الوظائف الشائعة بدون الحاجة لكتابة JSON.

استكشف المزيد في [GitHub الرسمي](https://github.com/openclaw) وتصفح الأمثلة الحقيقية. وإذا واجهتك مشكلة، تذكر: كل خطأ هو درس، وليس انتهاية العالم.

**ابدأ الآن. لا تؤجل.**