---
title: "مراقبة وصيانة أوبن كلاو (OpenClaw): دليلك الشامل للحفاظ على وكيلك الذكي"
excerpt: "تعلّم كيفية مراقبة أداء أوبن كلاو، تحليل الأخطاء، إدارة الموارد، وضمان استمرارية عمل وكيلك الذكي بكفاءة عالية على مدار الساعة"
date: "2026-04-09"
author: "فريق ArabClaw"
tags: ["أوبن كلاو", "الصيانة التقنية", "مراقبة الأداء", "DevOps", "استقرار النظام"]
language: "ar"
canonical: "https://arabclaw.com/blog/2026-04-09-openclaw-monitoring-maintenance-guide"
---

# مراقبة وصيانة أوبن كلاو (OpenClaw): دليلك الشامل للحفاظ على وكيلك الذكي

> **ما ستتعلمه:** كيفية مراقبة استهلاك الموارد لأوبن كلاو (OpenClaw) بشكل مستمر، تحليل السجلات وكشف الأخطاء قبل تفاقمها، إنشاء نظام نسخ احتياطي آمن لبياناتك، وإعداد تنبيهات تلقائية عبر تيليجرام عند حدوث مشاكل. استراتيجيات مُثبتة من مستخدمين حقيقيين وفّروا أكثر من 15 ساعة شهرياً في إدارة أنظمتهم الذكية.

بعد تثبيت وتشغيل أوبن كلاو (OpenClaw)، تبدأ المرحلة الأهم: كيف تضمن استمرارية عمله بكفاءة؟ كيف تكتشف المشاكل قبل أن تتفاقم؟ كيف تحافظ على أداء مستقر على مدار الأشهر؟

في هذا الدليل الشامل، سنتناول كل جوانب مراقبة وصيانة أوبن كلاو من منظور عملي واقعي، مع أمثلة تطبيقية وسكريبتات جاهزة.

## لماذا تحتاج إلى مراقبة أوبن كلاو؟

على عكس الأدوات التقليدية، أوبن كلاو (OpenClaw) يعمل كوكيل ذكي مستقل يتفاعل مع APIs متعددة، يدير مهام مجدولة، ويستهلك موارد حوسبة متغيرة حسب حجم العمل. بدون مراقبة مناسبة، قد تواجه:

- **استنزاف غير متوقع للـ API credits** (خاصة Claude و OpenAI)
- **توقف المهام المجدولة دون علمك** (Cron jobs فاشلة)
- **امتلاء القرص الصلب** بسبب سجلات متراكمة
- **بطء الأداء** عند تشغيل عدة وكلاء متزامنين
- **فقدان البيانات** عند تعطل مفاجئ

## مراقبة حالة Gateway

### فحص الحالة الأساسي

أبسط طريقة لمراقبة أوبن كلاو:

```bash
openclaw gateway status
```

**الناتج المثالي:**
```
Gateway is running (PID: 12345)
Uptime: 5 days, 3 hours
Sessions: 2 active
Version: 2026.2.17
```

إذا رأيت `Gateway is not running`، أعد تشغيله:

```bash
openclaw gateway restart
```

### مراقبة تلقائية كل 30 دقيقة

أنشئ سكريبت بسيط `/usr/local/bin/check_openclaw.sh`:

```bash
#!/bin/bash
if ! openclaw gateway status > /dev/null 2>&1; then
  echo "🔴 OpenClaw Gateway DOWN - $(date)" >> /var/log/openclaw_monitor.log
  openclaw gateway start
  # إرسال تنبيه تيليجرام (اختياري)
  curl -s "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
    -d chat_id=<YOUR_CHAT_ID> \
    -d text="⚠️ OpenClaw Gateway تم إعادة تشغيله تلقائياً"
fi
```

اجعله قابلاً للتنفيذ وأضفه لـ crontab:

```bash
chmod +x /usr/local/bin/check_openclaw.sh
crontab -e
# أضف:
*/30 * * * * /usr/local/bin/check_openclaw.sh
```

## تحليل السجلات (Logs)

### مسارات السجلات الأساسية

أوبن كلاو يخزن السجلات في:

```bash
~/.openclaw/logs/gateway.log       # سجلات Gateway الرئيسية
~/.openclaw/logs/sessions/         # سجلات الجلسات الفردية
~/.openclaw/logs/cron/              # سجلات المهام المجدولة
```

### فحص الأخطاء الأخيرة

لعرض آخر 50 خطأ:

```bash
tail -n 1000 ~/.openclaw/logs/gateway.log | grep -i "error\|fail\|exception"
```

لعرض الأخطاء في آخر 24 ساعة:

```bash
find ~/.openclaw/logs -name "*.log" -mtime -1 -exec grep -i "error" {} + | tail -50
```

### مراقبة استهلاك API

استخراج إحصاءات استخدام النماذج:

```bash
grep "model=" ~/.openclaw/logs/gateway.log | \
  sed 's/.*model=\([^ ]*\).*/\1/' | \
  sort | uniq -c | sort -rn
```

**مثال ناتج:**
```
  245 claude-sonnet-4-6
   89 gpt-4o
   12 gpt-4o-mini
```

هذا يساعدك على تحسين التكاليف.

## إدارة المساحة والموارد

### فحص استهلاك القرص

```bash
du -sh ~/.openclaw
du -sh ~/.openclaw/logs
du -sh ~/.openclaw/sessions
```

### تنظيف السجلات القديمة

احذف السجلات الأقدم من 30 يوماً:

```bash
find ~/.openclaw/logs -name "*.log" -mtime +30 -delete
```

للأتمتة، أضف لـ crontab:

```bash
# تشغيل كل يوم أحد الساعة 2 صباحاً
0 2 * * 0 find ~/.openclaw/logs -name "*.log" -mtime +30 -delete
```

### ضغط السجلات الكبيرة

```bash
cd ~/.openclaw/logs
for file in *.log; do
  if [ $(stat -f%z "$file" 2>/dev/null || stat -c%s "$file") -gt 10485760 ]; then
    gzip "$file"
    echo "ضُغط: $file"
  fi
done
```

## مراقبة الأداء في الوقت الفعلي

### استهلاك CPU والذاكرة

لـ macOS:

```bash
ps aux | grep -i openclaw | grep -v grep
```

لـ Linux:

```bash
ps aux | grep -i node.*openclaw | grep -v grep | awk '{print $3, $4, $11}'
# العمود الأول: CPU%، الثاني: Memory%
```

### مراقبة اتصالات الشبكة

تحقق من الاتصالات النشطة:

```bash
lsof -i -P | grep node | grep openclaw
```

## مراقبة Cron Jobs

### عرض جميع المهام المجدولة

```bash
openclaw cron list
```

### فحص المهام الفاشلة

```bash
openclaw cron list | grep -i "fail\|error"
```

### عرض تاريخ تنفيذ مهمة معينة

```bash
openclaw cron runs --job-id <JOB_ID>
```

### تنبيهات فشل Cron Jobs

أضف delivery mode لكل cron job مهم:

```javascript
{
  "schedule": { "kind": "every", "everyMs": 3600000 },
  "payload": { "kind": "agentTurn", "message": "تحقق من البريد الإلكتروني" },
  "failureAlert": {
    "mode": "announce",
    "channel": "telegram",
    "after": 2,
    "cooldownMs": 3600000
  }
}
```

بذلك تُخطر تلقائياً عند فشل المهمة مرتين متتاليتين.

## النسخ الاحتياطي (Backup)

### ما الذي يجب نسخه احتياطياً؟

الملفات الحرجة:

```bash
~/.openclaw/openclaw.json          # التكوين الرئيسي
~/.openclaw/.env                   # المفاتيح السرية (API keys)
~/clawd/                           # workspace ملفاتك
~/.openclaw/sessions/*.json        # بيانات الجلسات
```

### سكريبت نسخ احتياطي بسيط

أنشئ `/usr/local/bin/backup_openclaw.sh`:

```bash
#!/bin/bash
BACKUP_DIR="$HOME/openclaw_backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p "$BACKUP_DIR"

# نسخ الملفات
tar -czf "$BACKUP_DIR/openclaw_$DATE.tar.gz" \
  ~/.openclaw/openclaw.json \
  ~/.openclaw/.env \
  ~/.openclaw/sessions \
  ~/clawd

# حذف النسخ الأقدم من 14 يوماً
find "$BACKUP_DIR" -name "openclaw_*.tar.gz" -mtime +14 -delete

echo "✅ Backup completed: openclaw_$DATE.tar.gz"
```

جدولته:

```bash
crontab -e
# نسخ احتياطي يومياً الساعة 3 صباحاً
0 3 * * * /usr/local/bin/backup_openclaw.sh
```

### نسخ احتياطي سحابي (Cloud)

للنسخ على AWS S3:

```bash
aws s3 sync ~/openclaw_backups s3://my-openclaw-backups/ --delete
```

أو Google Drive باستخدام `rclone`:

```bash
rclone sync ~/openclaw_backups gdrive:openclaw_backups
```

## استراتيجيات الصيانة الوقائية

### جدول صيانة أسبوعي

| اليوم | المهمة | الوقت المقدّر |
|------|--------|---------------|
| الأحد | فحص السجلات للأسبوع الماضي | 10 دقائق |
| الاثنين | مراجعة استهلاك API credits | 5 دقائق |
| الأربعاء | فحص Cron Jobs الفاشلة | 5 دقائق |
| الجمعة | تحديث أوبن كلاو إذا توفرت نسخة جديدة | 15 دقيقة |
| يومياً | فحص Gateway status (آلي) | 0 دقيقة |

### تحديثات أوبن كلاو

تحقق من الإصدارات الجديدة:

```bash
npm view openclaw version
openclaw --version
```

للتحديث:

```bash
npm install -g openclaw@latest
openclaw gateway restart
```

**نصيحة:** اقرأ [release notes](https://github.com/anthropics/openclaw/releases) قبل التحديث للتعرف على التغييرات الجوهرية.

## مراقبة متقدمة مع Prometheus & Grafana

للمؤسسات الكبيرة، يمكن دمج أوبن كلاو مع Prometheus:

### إنشاء exporter بسيط

```javascript
// openclaw_exporter.js
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/metrics', (req, res) => {
  exec('openclaw gateway status', (error, stdout) => {
    const isRunning = !error ? 1 : 0;
    res.send(`openclaw_gateway_up ${isRunning}\n`);
  });
});

app.listen(9100, () => console.log('Exporter running on :9100'));
```

### Prometheus config

```yaml
scrape_configs:
  - job_name: 'openclaw'
    static_configs:
      - targets: ['localhost:9100']
```

### Dashboard Grafana

قم بإنشاء لوحة تحكم تعرض:
- Gateway uptime
- عدد الجلسات النشطة
- معدل الأخطاء في الساعة
- استهلاك API tokens

## تشخيص المشاكل الشائعة

### Gateway لا يعمل بعد إعادة التشغيل

**الحل:**

```bash
# فحص البورت
lsof -i :3000  # أو البورت المحدد في openclaw.json
# إذا كان مشغولاً، أوقف العملية:
kill -9 <PID>
openclaw gateway start
```

### Cron Jobs متوقفة

**الحل:**

```bash
openclaw cron list
# ابحث عن enabled: false
openclaw cron update --job-id <ID> --patch '{"enabled": true}'
```

### استهلاك ذاكرة مرتفع

**الحل:**

```bash
# إعادة تشغيل Gateway
openclaw gateway restart
# حد استهلاك الذاكرة (في systemd أو launchd)
# أضف NODE_OPTIONS="--max-old-space-size=2048"
```

### بطء في الاستجابة

**الأسباب المحتملة:**
- كثرة الوكلاء المتزامنين → قلل عدد `sessions_spawn`
- سجلات ضخمة → نظّف `~/.openclaw/logs`
- ذاكرة منخفضة → راقب `free -h` (Linux) أو `vm_stat` (macOS)

## إعداد لوحة تحكم Telegram

أنشئ بوت تيليجرام للمراقبة السريعة:

```bash
# أرسل إشعار يومي بالحالة
openclaw cron add --schedule '{"kind": "cron", "expr": "0 9 * * *", "tz": "Asia/Riyadh"}' \
  --payload '{"kind": "agentTurn", "message": "أرسل تقرير حالة OpenClaw (uptime, logs errors count, disk space) إلى تيليجرام"}' \
  --delivery '{"mode": "announce", "channel": "telegram"}'
```

## أفضل الممارسات

✅ **افعل:**
- فعّل auto-restart عبر systemd (Linux) أو launchd (macOS)
- احتفظ بنسخ احتياطية أسبوعية على الأقل
- راقب استهلاك API credits شهرياً
- اقرأ السجلات مرة أسبوعياً
- حدّث أوبن كلاو خلال أسبوع من الإصدار الجديد

❌ **لا تفعل:**
- تترك السجلات تتراكم بلا حد
- تتجاهل رسائل الأخطاء المتكررة
- تشغّل أوبن كلاو بصلاحيات root إلا للضرورة
- تحذف `~/.openclaw/.env` دون نسخة احتياطية
- تعدّل `openclaw.json` يدوياً أثناء عمل Gateway

## الخطوات التالية

بعد إتقان المراقبة والصيانة، استكشف:
- [دليل أمان أوبن كلاو](/blog/2026-02-14-openclaw-security-privacy-guide) لتأمين وكيلك
- [أتمتة المهام الزمنية مع Cron](/blog/2026-02-15-cron-jobs-automation-guide) للمهام المتقدمة
- [بناء فريق ذكي متعدد الوكلاء](/blog/2026-03-22-multi-agent-orchestration-openclaw) للمشاريع الكبيرة

## الأسئلة الشائعة

**كم مرة يجب أن أفحص حالة OpenClaw؟**
للاستخدام الشخصي، فحص يومي يدوي كافٍ. للأعمال، استخدم مراقبة آلية كل 30 دقيقة عبر crontab. للشركات، دمج مع Prometheus يوفر مراقبة مستمرة ولوحة تحكم مرئية.

**ما حجم المساحة المطلوبة لتشغيل OpenClaw؟**
الحد الأدنى 500 ميجابايت، لكن يُنصح بـ 5 جيجابايت على الأقل لاستيعاب السجلات والنسخ الاحتياطية. إذا كنت تستخدم نماذج محلية مع Ollama، قد تحتاج 20-50 جيجابايت إضافية.

**هل يمكن تشغيل OpenClaw على VPS صغير؟**
نعم، VPS بمواصفات 2 CPU cores و 2GB RAM كافٍ للاستخدام الشخصي أو الفرق الصغيرة. راجع [دليل التثبيت على VPS](/blog/install-openclaw-vps) للتفاصيل.

**كيف أعرف إذا كانت API keys معرضة للخطر؟**
راقب استهلاك غير متوقع في لوحة تحكم OpenAI أو Anthropic. إذا رأيت طلبات من IPs غريبة أو استهلاك مفاجئ، جدّد المفاتيح فوراً وفعّل IP whitelisting إن متاح.

**ماذا أفعل عند فشل النسخ الاحتياطي؟**
تحقق من أذونات الملفات، المساحة المتاحة على القرص، واتصال الشبكة إذا كنت تستخدم نسخاً سحابياً. احتفظ دائماً بنسخة محلية احتياطية حتى لو كنت تستخدم السحابة، لضمان التعافي السريع.
