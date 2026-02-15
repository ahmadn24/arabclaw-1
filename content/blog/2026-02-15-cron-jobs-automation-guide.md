---
title: "أتمتة المهام الزمنية مع OpenClaw: دليل شامل لـ Cron Jobs"
excerpt: "تعلم كيفية جدولة المهام التلقائية، إنشاء التذكيرات الذكية، وأتمتة سير العمل اليومي باستخدام نظام Cron في OpenClaw - من المبتدئين إلى المتقدمين"
date: "2026-02-15"
---

# أتمتة المهام الزمنية مع OpenClaw: دليل شامل لـ Cron Jobs

هل سبق لك أن تمنيت لو كان لديك مساعد شخصي يذكرك بالمواعيد، يفحص بريدك الإلكتروني تلقائياً، أو ينشر محتوى على وسائل التواصل في أوقات محددة؟ مع نظام **Cron Jobs** في OpenClaw، كل هذا ممكن وأكثر.

في هذا الدليل الشامل، سنستكشف كيفية استخدام ميزة الجدولة الزمنية القوية في OpenClaw لأتمتة حياتك الرقمية بالكامل.

## ما هي Cron Jobs في OpenClaw؟

**Cron Jobs** هي مهام مجدولة تعمل تلقائياً في أوقات محددة أو بفترات متكررة. على عكس الأوامر اليدوية، تعمل هذه المهام في الخلفية دون تدخل بشري.

### الفرق بين Cron و Heartbeat

OpenClaw يوفر آليتين للمهام الدورية:

- **Heartbeat**: فحوصات خفيفة متكررة (كل 30 دقيقة تقريباً) للمهام البسيطة
- **Cron Jobs**: جدولة دقيقة بالوقت المحدد للمهام المعقدة أو الحرجة

**استخدم Heartbeat عندما:**
- التوقيت يمكن أن يختلف قليلاً (±5-10 دقائق مقبول)
- تريد دمج فحوصات متعددة في دورة واحدة
- تحتاج سياق المحادثة الأخيرة

**استخدم Cron عندما:**
- التوقيت الدقيق مهم ("الساعة 9:00 صباحاً بالضبط كل إثنين")
- المهمة تحتاج عزل عن سجل الجلسة الرئيسية
- تريد استخدام نموذج AI مختلف أو مستوى تفكير خاص
- تذكيرات لمرة واحدة ("ذكرني بعد 20 دقيقة")

## أنواع الجدولة في OpenClaw

OpenClaw يدعم ثلاثة أنماط جدولة قوية:

### 1. الجدولة بوقت محدد (At Schedule)

لتنفيذ مهمة **مرة واحدة** في وقت محدد:

```json
{
  "kind": "at",
  "at": "2026-02-16T09:00:00Z"
}
```

**أمثلة عملية:**
- إرسال بريد إلكتروني في وقت محدد
- نشر تغريدة في وقت الذروة
- تذكير قبل اجتماع بساعة

### 2. الجدولة المتكررة (Every Schedule)

للمهام المتكررة بفترات زمنية ثابتة:

```json
{
  "kind": "every",
  "everyMs": 3600000,
  "anchorMs": 1739696400000
}
```

**أمثلة:**
- فحص البريد كل 30 دقيقة: `everyMs: 1800000`
- تقرير يومي كل 24 ساعة: `everyMs: 86400000`
- مراقبة مستمرة كل 5 دقائق: `everyMs: 300000`

### 3. تعبيرات Cron (Cron Expression)

للجدولة المعقدة باستخدام صيغة Cron الكلاسيكية:

```json
{
  "kind": "cron",
  "expr": "0 9 * * 1-5",
  "tz": "Europe/Paris"
}
```

**أمثلة شائعة:**

| التعبير | الوصف |
|---------|--------|
| `0 9 * * *` | يومياً الساعة 9:00 صباحاً |
| `0 9 * * 1-5` | أيام العمل (إثنين-جمعة) 9:00 ص |
| `*/30 * * * *` | كل 30 دقيقة |
| `0 0 1 * *` | أول يوم من كل شهر منتصف الليل |
| `0 18 * * 5` | كل جمعة الساعة 6:00 مساءً |

**💡 نصيحة:** استخدم [crontab.guru](https://crontab.guru) لبناء واختبار تعبيرات Cron.

## أنواع المهام (Payload Types)

### System Event

حقن رسالة نصية في الجلسة الرئيسية:

```json
{
  "kind": "systemEvent",
  "text": "تذكير: اجتماع الفريق بعد 15 دقيقة"
}
```

**الاستخدام:** تذكيرات بسيطة، إشعارات، أحداث النظام.

### Agent Turn

تشغيل وكيل AI في جلسة معزولة:

```json
{
  "kind": "agentTurn",
  "message": "افحص البريد الإلكتروني وأرسل ملخص الرسائل المهمة",
  "model": "sonnet",
  "thinking": "high",
  "timeoutSeconds": 300
}
```

**الاستخدام:** مهام معقدة، تقارير آلية، تحليل بيانات.

## أمثلة عملية: 10 سيناريوهات حقيقية

### 1. تذكير يومي بفحص البريد

```bash
openclaw cron add \
  --name "فحص البريد الصباحي" \
  --schedule-cron "0 9 * * 1-5" \
  --schedule-tz "Europe/Paris" \
  --payload-agent "افحص بريدي الإلكتروني وأرسل ملخص الرسائل غير المقروءة المهمة" \
  --session isolated
```

### 2. تقرير أسبوعي تلقائي

```bash
openclaw cron add \
  --name "تقرير أسبوعي" \
  --schedule-cron "0 18 * * 5" \
  --payload-agent "اجمع إحصائيات الأسبوع من GitHub وأرسل تقرير عبر Telegram" \
  --delivery-mode announce \
  --delivery-channel telegram
```

### 3. تذكير لمرة واحدة

```bash
openclaw cron add \
  --name "تذكير اجتماع" \
  --schedule-at "2026-02-16T14:45:00+01:00" \
  --payload-system "🔔 تذكير: اجتماع مع العميل بعد 15 دقيقة" \
  --session main
```

### 4. نسخ احتياطي يومي

```bash
openclaw cron add \
  --name "نسخ احتياطي" \
  --schedule-cron "0 2 * * *" \
  --payload-agent "قم بنسخ احتياطي للمشاريع في ~/projets إلى Google Drive" \
  --session isolated
```

### 5. مراقبة الأسعار

```bash
openclaw cron add \
  --name "مراقبة أسعار العملات" \
  --schedule-every 3600000 \
  --payload-agent "افحص سعر BTC/USD، إذا تجاوز $100,000 أرسل تنبيه فوري" \
  --session isolated
```

### 6. تنظيف الملفات المؤقتة

```bash
openclaw cron add \
  --name "تنظيف أسبوعي" \
  --schedule-cron "0 3 * * 0" \
  --payload-agent "احذف الملفات المؤقتة الأقدم من 30 يوم في ~/Downloads و ~/tmp" \
  --session isolated
```

### 7. متابعة وسائل التواصل

```bash
openclaw cron add \
  --name "فحص Twitter" \
  --schedule-cron "0 */3 * * *" \
  --payload-agent "افحص التنويهات والرسائل الجديدة على Twitter وأرسل ملخص" \
  --delivery-mode announce \
  --session isolated
```

### 8. تحديثات النظام التلقائية

```bash
openclaw cron add \
  --name "تحديث النظام" \
  --schedule-cron "0 4 * * 2" \
  --payload-agent "فحص تحديثات النظام باستخدام brew update && brew upgrade، أرسل تقرير" \
  --session isolated
```

### 9. تقرير صحي يومي

```bash
openclaw cron add \
  --name "تقرير صحة النظام" \
  --schedule-cron "0 20 * * *" \
  --payload-agent "افحص مساحة القرص، استخدام CPU، الذاكرة، حالة الخدمات وأرسل تقرير" \
  --delivery-mode announce \
  --session isolated
```

### 10. منشورات مجدولة

```bash
openclaw cron add \
  --name "نشر مقال يومي" \
  --schedule-cron "0 10 * * *" \
  --payload-agent "اكتب وانشر مقال جديد على المدونة عن OpenClaw" \
  --session isolated \
  --delivery-mode announce
```

## إدارة Cron Jobs

### عرض جميع المهام

```bash
openclaw cron list
```

للمهام المعطلة أيضاً:

```bash
openclaw cron list --include-disabled
```

### تشغيل مهمة يدوياً

```bash
openclaw cron run --job-id abc123
```

### تحديث مهمة موجودة

```bash
openclaw cron update \
  --job-id abc123 \
  --patch '{"enabled": false}'
```

### حذف مهمة

```bash
openclaw cron remove --job-id abc123
```

### عرض سجل التنفيذ

```bash
openclaw cron runs --job-id abc123
```

## نصائح متقدمة

### 1. التسليم الذكي (Delivery)

للمهام المعزولة، يمكنك تحديد كيفية إرسال النتائج:

```json
{
  "delivery": {
    "mode": "announce",
    "channel": "telegram",
    "to": "@BobDegen",
    "bestEffort": true
  }
}
```

### 2. استخدام نماذج مختلفة

للمهام البسيطة، استخدم نموذج أقل تكلفة:

```json
{
  "payload": {
    "kind": "agentTurn",
    "message": "فحص سريع للبريد",
    "model": "haiku"
  }
}
```

للمهام المعقدة:

```json
{
  "payload": {
    "kind": "agentTurn",
    "message": "تحليل معقد للبيانات",
    "model": "opus",
    "thinking": "high"
  }
}
```

### 3. المناطق الزمنية

**مهم جداً:** التواريخ ISO-8601 بدون منطقة زمنية تعامل كـ UTC!

```javascript
// ❌ خطأ (سيكون UTC)
"at": "2026-02-16T09:00:00"

// ✅ صحيح
"at": "2026-02-16T09:00:00+01:00"  // باريس شتاء
"at": "2026-06-16T09:00:00+02:00"  // باريس صيف
```

للـ Cron، استخدم `tz`:

```json
{
  "kind": "cron",
  "expr": "0 9 * * *",
  "tz": "Europe/Paris"
}
```

### 4. إدارة السياق

للمهام التي تحتاج سياق المحادثة الأخيرة:

```bash
openclaw cron wake \
  --text "افحص آخر 5 رسائل وأرسل ملخص" \
  --context-messages 5
```

## حالات استخدام متقدمة

### مراقبة موقع ويب

```bash
openclaw cron add \
  --name "مراقبة موقع" \
  --schedule-every 300000 \
  --payload-agent "افحص https://mysite.com، إذا كان down أو بطيء (>3s) أرسل تنبيه فوري" \
  --session isolated
```

### نشر محتوى متعدد المنصات

```bash
openclaw cron add \
  --name "نشر صباحي" \
  --schedule-cron "0 8 * * *" \
  --payload-agent "اكتب منشور ملهم عن AI، انشره على Twitter و LinkedIn و Telegram" \
  --session isolated \
  --delivery-mode announce
```

### تقارير مالية

```bash
openclaw cron add \
  --name "تقرير مالي شهري" \
  --schedule-cron "0 9 1 * *" \
  --payload-agent "اجمع المعاملات المالية من آخر شهر، احسب الإحصائيات، أرسل تقرير PDF" \
  --session isolated \
  --delivery-channel telegram
```

## الأخطاء الشائعة وحلولها

### خطأ: المهمة لا تعمل

**الأسباب الشائعة:**
1. المهمة معطلة (`enabled: false`)
2. خطأ في تعبير Cron
3. المنطقة الزمنية خاطئة
4. نوع payload غير متوافق مع sessionTarget

**الحل:**
```bash
# فحص حالة المهمة
openclaw cron list --include-disabled

# تحديث وتفعيل
openclaw cron update --job-id abc123 --patch '{"enabled": true}'
```

### خطأ: "sessionTarget=main requires systemEvent"

**السبب:** جلسات `main` تقبل فقط `systemEvent`، ليس `agentTurn`.

**الحل:**
```bash
# استخدم isolated للمهام المعقدة
--session isolated --payload-agent "..."

# أو استخدم main للتذكيرات البسيطة
--session main --payload-system "تذكير: ..."
```

## الربط مع مهارات OpenClaw الأخرى

Cron Jobs تعمل بشكل رائع مع:

- **[GitHub Automation](/blog/2026-02-10-github-automation-openclaw)**: نشر تقارير CI/CD تلقائية
- **[Email Automation](/blog/email-automation-openclaw)**: فحص وردّ على الرسائل المهمة
- **[WhatsApp Automation](/blog/2026-02-08-whatsapp-automation-guide)**: إرسال رسائل مجدولة
- **[Smart Home](/blog/2026-02-12-smart-home-automation-openclaw)**: أتمتة الأجهزة بجداول زمنية
- **[Security Guide](/blog/2026-02-14-openclaw-security-privacy-guide)**: فحوصات أمنية دورية

## الخلاصة

نظام Cron Jobs في OpenClaw يحول مساعدك الشخصي من أداة تفاعلية إلى **نظام أتمتة كامل يعمل 24/7**.

**الفوائد الرئيسية:**
- ⏰ جدولة دقيقة بالثانية
- 🤖 تشغيل مهام AI معقدة تلقائياً
- 📊 تقارير وإشعارات آلية
- 🔄 أتمتة كاملة لسير العمل
- 💰 توفير الوقت والجهد

### الخطوات التالية

1. **ابدأ بسيط:** جرّب تذكير بسيط باستخدام `schedule-at`
2. **اكتشف الأنماط:** تعلم تعبيرات Cron للجدولة المعقدة
3. **ادمج المهارات:** اربط Cron مع GitHub، Email، WhatsApp
4. **راقب وحسّن:** استخدم `cron runs` لتحسين المهام
5. **شارك تجربتك:** انضم لمجتمع [OpenClaw Discord](https://discord.com/invite/clawd)

هل أنت مستعد لأتمتة حياتك الرقمية؟ ابدأ الآن مع OpenClaw Cron Jobs! 🚀

---

**موارد إضافية:**
- [دليل المبتدئين لـ OpenClaw](/blog/beginners-guide)
- [تثبيت OpenClaw على Linux](/blog/2026-02-11-install-openclaw-linux-ubuntu)
- [إنشاء مساعد AI شخصي](/blog/2026-02-13-create-personal-ai-assistant)
- [التوثيق الرسمي](https://docs.openclaw.ai)

*هل كان هذا المقال مفيداً؟ شاركه مع أصدقائك المهتمين بالأتمتة!* 💙
