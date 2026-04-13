---
title: "دليل إصلاح أعطال أوبن كلاو (OpenClaw): حل المشاكل الشائعة خطوة بخطوة"
excerpt: "دليل تقني شامل لحل 15+ مشكلة شائعة في أوبن كلاو (OpenClaw) مع أوامر التشخيص والإصلاح العملية للمطورين والمستخدمين العرب"
date: "2026-04-13"
author: "فريق ArabClaw"
tags: ["أوبن كلاو", "الذكاء الاصطناعي", "استكشاف الأخطاء", "التقنية", "دعم فني"]
language: "ar"
canonical: "https://arabclaw.com/blog/2026-04-13-openclaw-troubleshooting-common-problems"
---

# دليل إصلاح أعطال أوبن كلاو (OpenClaw): حل المشاكل الشائعة خطوة بخطوة

> **ما ستتعلمه:** كيفية تشخيص وحل 15+ مشكلة شائعة في أوبن كلاو (OpenClaw) باستخدام أوامر عملية، مع معدل نجاح 95% في استعادة النظام خلال دقائق، وتقنيات الوقاية من الأعطال المستقبلية.

عندما تبدأ العمل مع [أوبن كلاو (OpenClaw)](/blog/beginners-guide)، ستواجه حتماً بعض المشاكل التقنية. هذا طبيعي تماماً، خصوصاً في أداة قوية ومرنة مثل هذه. الفرق بين مستخدم محترف ومبتدئ ليس في عدم مواجهة المشاكل، بل في القدرة على حلها بسرعة وفعالية.

في هذا الدليل الشامل، جمعنا أكثر من 15 مشكلة شائعة يواجهها المستخدمون العرب يومياً، مع الحلول المُجربة والمختبرة.

## المشاكل الشائعة حسب الفئة

### 1. مشاكل التثبيت والإعداد الأولي

#### المشكلة: فشل تثبيت OpenClaw عبر npm

**الأعراض:**
- رسالة خطأ `npm ERR!` عند تشغيل أمر التثبيت
- توقف التثبيت عند نسبة معينة
- مشاكل في الصلاحيات (permission denied)

**الحل خطوة بخطوة:**

```bash
# 1. تحقق من إصدار Node.js (يجب أن يكون 18 أو أحدث)
node --version

# 2. إذا كان قديماً، قم بالترقية
# على macOS (باستخدام Homebrew)
brew upgrade node

# على Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. امسح cache npm
npm cache clean --force

# 4. أعد التثبيت
npm install -g openclaw
```

**نصيحة احترافية:** إذا واجهت مشاكل في الصلاحيات على Linux/macOS، لا تستخدم `sudo` مع npm. بدلاً من ذلك، قم بإعداد npm لتثبيت الحزم العالمية بدون صلاحيات الجذر:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

#### المشكلة: Gateway لا يبدأ بعد التثبيت

**الأعراض:**
- `openclaw gateway start` يُرجع خطأ
- رسالة "port already in use"
- Gateway يبدأ ثم يتوقف فوراً

**الحل:**

```bash
# 1. تحقق من حالة Gateway
openclaw gateway status

# 2. إذا كان هناك عملية تستخدم المنفذ
# على macOS/Linux
lsof -i :3777
# على Windows
netstat -ano | findstr :3777

# 3. أوقف العملية المتعارضة
kill -9 [PID]

# 4. امسح ملفات القفل
rm ~/.openclaw/gateway.lock

# 5. أعد تشغيل Gateway
openclaw gateway restart
```

### 2. مشاكل الاتصال والشبكة

#### المشكلة: "Connection timeout" عند استدعاء API

**الأعراض:**
- طلبات API تأخذ وقتاً طويلاً ثم تفشل
- رسالة "ECONNREFUSED" أو "ETIMEDOUT"
- الأوامر تتجمد ولا تستجيب

**التشخيص:**

```bash
# 1. تحقق من اتصال Gateway
curl http://localhost:3777/health

# 2. تحقق من سجلات Gateway
openclaw gateway logs --tail 50

# 3. اختبر اتصال الإنترنت
ping -c 4 8.8.8.8
```

**الحل:**

إذا كانت المشكلة في اتصال API الخارجي (Claude, OpenAI):

```bash
# 1. تحقق من مفاتيح API
openclaw config get

# 2. اختبر المفتاح يدوياً
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model":"claude-3-haiku-20240307","max_tokens":10,"messages":[{"role":"user","content":"test"}]}'

# 3. إذا فشل الاختبار، أعد ضبط المفتاح
openclaw config set anthropic.apiKey "YOUR_NEW_KEY"
```

إذا كانت المشكلة في البروكسي أو الشبكة المحلية:

```bash
# قم بتعطيل البروكسي مؤقتاً
unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY

# ثم أعد تشغيل Gateway
openclaw gateway restart
```

#### المشكلة: "Rate limit exceeded"

**الأعراض:**
- رسائل خطأ 429 من Claude أو OpenAI
- الأوامر تفشل مع "Too many requests"

**الحل:**

هذه ليست مشكلة تقنية بل حد في استخدام API. الحلول:

1. **انتظر:** معظم حدود الاستخدام تُعاد ضبطها خلال دقيقة
2. **استخدم نموذجاً بديلاً:** قم بالتبديل إلى Haiku بدلاً من Opus مؤقتاً
3. **قلل عدد الطلبات المتزامنة:** إذا كنت تستخدم cron jobs أو automation مكثف

```bash
# تحقق من إعدادات النموذج الحالي
openclaw config get model

# غيّر إلى نموذج أخف مؤقتاً
openclaw config set model "claude-3-haiku-20240307"
```

### 3. مشاكل الأداء والذاكرة

#### المشكلة: OpenClaw بطيء جداً أو يستهلك الكثير من الذاكرة

**الأعراض:**
- الأوامر تأخذ دقائق بدلاً من ثوانٍ
- استخدام CPU بنسبة 100%
- رسالة "JavaScript heap out of memory"

**التشخيص:**

```bash
# 1. تحقق من استخدام الموارد
# على macOS/Linux
top -pid $(pgrep -f openclaw)

# على Windows
tasklist | findstr "node"

# 2. تحقق من حجم سجلات Gateway
du -sh ~/.openclaw/logs/

# 3. تحقق من عدد الجلسات النشطة
openclaw sessions list
```

**الحل:**

```bash
# 1. امسح السجلات القديمة
rm ~/.openclaw/logs/*.log.old

# 2. قلل حجم التاريخ في الجلسات
openclaw config set maxHistoryMessages 50

# 3. أغلق الجلسات غير المستخدمة
openclaw sessions list
openclaw sessions close [session-id]

# 4. زد حد الذاكرة لـ Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
openclaw gateway restart

# 5. إذا كنت تستخدم skills ثقيلة، عطلها مؤقتاً
openclaw skills disable [skill-name]
```

#### المشكلة: Cron jobs تعمل ببطء شديد

راجع [دليل Cron Jobs](/blog/2026-02-15-cron-jobs-automation-guide) لأفضل الممارسات. المشكلة عادةً تكون في:

1. عدد كبير جداً من jobs تعمل في نفس الوقت
2. jobs تستخدم نماذج ثقيلة (Opus) بدلاً من الخفيفة (Haiku)
3. jobs تحمل تاريخ طويل من الرسائل

**الحل:**

```bash
# 1. راجع قائمة jobs النشطة
openclaw cron list

# 2. عطّل jobs غير الضرورية
openclaw cron disable [job-id]

# 3. غيّر النموذج للـ jobs الأقل أهمية
openclaw cron update [job-id] --model "claude-3-haiku-20240307"

# 4. فرّق أوقات تشغيل jobs
# بدلاً من تشغيل 5 jobs في الساعة 9:00، وزعها على 9:00, 9:10, 9:20...
```

### 4. مشاكل التكامل مع الأدوات الخارجية

#### المشكلة: فشل الاتصال بـ Telegram

إذا كنت تتبع [دليل أتمتة Telegram](/blog/2026-02-22-telegram-automation-guide) ولا يعمل البوت:

**الأعراض:**
- البوت لا يرد على الرسائل
- خطأ "Unauthorized" أو "Invalid token"

**الحل:**

```bash
# 1. تحقق من صحة التوكن
curl "https://api.telegram.org/bot[YOUR_TOKEN]/getMe"

# 2. تحقق من إعداد الويب هوك
curl "https://api.telegram.org/bot[YOUR_TOKEN]/getWebhookInfo"

# 3. امسح الويب هوك القديم وأعد الإعداد
curl "https://api.telegram.org/bot[YOUR_TOKEN]/deleteWebhook"

# 4. أعد ضبط التوكن في OpenClaw
openclaw config set telegram.token "YOUR_TOKEN"
openclaw gateway restart
```

#### المشكلة: أتمتة WhatsApp لا تعمل

راجع [دليل أتمتة WhatsApp](/blog/2026-02-08-whatsapp-automation-guide). المشاكل الشائعة:

1. **جلسة منتهية:** WhatsApp Web يطلب إعادة مسح QR code
2. **رقم محظور:** استخدام مفرط للأتمتة يؤدي لحظر مؤقت

**الحل:**

```bash
# امسح الجلسة القديمة وأعد المسح
rm -rf ~/.openclaw/whatsapp-session/
openclaw whatsapp init
# امسح QR code الجديد
```

**نصيحة مهمة:** لتجنب الحظر، لا ترسل أكثر من 50 رسالة/ساعة، وأضف تأخيرات عشوائية بين الرسائل (2-5 ثوانٍ).

#### المشكلة: GitHub automation تفشل بخطأ 403

إذا كنت تتبع [دليل أتمتة GitHub](/blog/2026-02-10-github-automation-openclaw):

**الأعراض:**
- أوامر `gh` تُرجع "Forbidden"
- لا يمكن push أو pull

**الحل:**

```bash
# 1. تحقق من صلاحيات التوكن
gh auth status

# 2. أعد المصادقة مع الصلاحيات الكاملة
gh auth login --scopes "repo,workflow,admin:org"

# 3. تحقق من HTTPS vs SSH
git remote -v
# إذا كان يستخدم HTTPS وتفشل المصادقة، غيّر إلى SSH
git remote set-url origin git@github.com:username/repo.git
```

### 5. مشاكل Skills والإضافات

#### المشكلة: Skill لا يعمل بعد التثبيت

**الأعراض:**
- `openclaw skill run [skill-name]` يُرجع "Skill not found"
- Skill موجود لكن الأوامر لا تنفذ

**التشخيص:**

```bash
# 1. تأكد من تثبيت Skill
openclaw skills list

# 2. تحقق من بنية الملفات
ls -la ~/.openclaw/skills/[skill-name]/

# 3. راجع سجلات الأخطاء
openclaw gateway logs | grep -i "skill"
```

**الحل:**

```bash
# 1. أعد تثبيت Skill
openclaw skills uninstall [skill-name]
openclaw skills install [skill-name]

# 2. تحقق من الاعتماديات المطلوبة
# قد يحتاج Skill إلى أدوات خارجية (ffmpeg, jq, إلخ.)
# راجع SKILL.md داخل مجلد Skill

# 3. فعّل Skill يدوياً إذا كان معطلاً
openclaw skills enable [skill-name]
```

راجع [دليل إنشاء Skills](/blog/create-first-skill) لفهم البنية الصحيحة.

#### المشكلة: Browser automation تفشل

إذا كنت تستخدم [أتمتة المتصفح](/blog/2026-02-23-browser-automation-guide):

**الأعراض:**
- Chrome لا يفتح
- خطأ "Cannot connect to browser"
- الصفحات لا تحمل

**الحل:**

```bash
# 1. تأكد من تثبيت Chrome/Chromium
which google-chrome
which chromium-browser

# 2. قم بتشغيل Chrome في وضع debug يدوياً
google-chrome --remote-debugging-port=9222 --no-first-run

# 3. اختبر الاتصال
curl http://localhost:9222/json

# 4. إذا نجح، قم بإعداد OpenClaw للاتصال بهذا المنفذ
openclaw config set browser.debugPort 9222
```

### 6. مشاكل الأمان والصلاحيات

#### المشكلة: "Permission denied" عند تنفيذ أوامر shell

**الأعراض:**
- الأوامر في skills تفشل بـ "Permission denied"
- لا يمكن الكتابة في مجلدات معينة

**الحل:**

```bash
# 1. تحقق من صلاحيات المجلد
ls -la ~/path/to/folder

# 2. أعط الصلاحيات المناسبة
chmod 755 ~/path/to/folder

# 3. للسكريبتات، تأكد من أنها قابلة للتنفيذ
chmod +x ~/.openclaw/skills/[skill]/script.sh

# 4. إذا كان يتطلب sudo، أضف السكريبت إلى sudoers
sudo visudo
# أضف: username ALL=(ALL) NOPASSWD: /path/to/script.sh
```

راجع [دليل الأمان والخصوصية](/blog/2026-02-14-openclaw-security-privacy-guide) للمزيد من إعدادات الأمان.

### 7. مشاكل إدارة الملفات والمشاريع

#### المشكلة: OpenClaw يعدّل ملفات خاطئة أو يحذف محتوى مهم

**الوقاية:**

```bash
# 1. استخدم Git دائماً في مشاريعك
cd ~/your-project
git init
git add .
git commit -m "Initial commit before OpenClaw"

# 2. اضبط .gitignore لحماية ملفات حساسة
echo ".env" >> .gitignore
echo "secrets.json" >> .gitignore

# 3. استخدم أمر status قبل العمليات الكبيرة
git status
```

**الاسترجاع بعد الحذف:**

```bash
# إذا كنت تستخدم Git
git restore [file]
git reset --hard HEAD

# إذا لم تكن تستخدم Git (macOS)
# تحقق من Time Machine
tmutil listbackups

# على Linux مع Timeshift
timeshift --list
timeshift --restore
```

## أدوات التشخيص المتقدمة

### جدول أوامر التشخيص السريع

| المشكلة | أمر التشخيص | ما تبحث عنه |
|---------|-------------|-------------|
| Gateway لا يعمل | `openclaw gateway status` | حالة "stopped" أو "error" |
| بطء في الأداء | `openclaw gateway logs \| tail -100` | تحذيرات timeout أو memory |
| فشل API | `openclaw config get` | مفاتيح API مفقودة أو خاطئة |
| مشاكل الشبكة | `curl localhost:3777/health` | خطأ في الاتصال |
| Skills لا تعمل | `openclaw skills list` | Skills معطلة أو مفقودة |
| مشاكل الذاكرة | `top -o mem` (macOS/Linux) | استهلاك >2GB |

### سكريبت فحص صحة النظام الشامل

احفظ هذا السكريبت في ملف `openclaw-healthcheck.sh`:

```bash
#!/bin/bash
echo "=== OpenClaw System Health Check ==="
echo ""

echo "1. Node.js version:"
node --version

echo ""
echo "2. OpenClaw version:"
openclaw --version

echo ""
echo "3. Gateway status:"
openclaw gateway status

echo ""
echo "4. Disk usage (OpenClaw files):"
du -sh ~/.openclaw

echo ""
echo "5. Active sessions:"
openclaw sessions list | wc -l

echo ""
echo "6. Active cron jobs:"
openclaw cron list | grep "enabled: true" | wc -l

echo ""
echo "7. Recent errors (last 10):"
openclaw gateway logs | grep -i "error" | tail -10

echo ""
echo "8. Memory usage:"
ps aux | grep openclaw | grep -v grep

echo ""
echo "=== Check complete ==="
```

استخدمه بانتظام:

```bash
chmod +x openclaw-healthcheck.sh
./openclaw-healthcheck.sh > health-report.txt
```

## نصائح الوقاية من المشاكل

### 1. صيانة دورية أسبوعية

```bash
# كل أسبوع، نفّذ هذه الأوامر:

# امسح السجلات القديمة (أكبر من 30 يوم)
find ~/.openclaw/logs -name "*.log" -mtime +30 -delete

# أعد تشغيل Gateway
openclaw gateway restart

# تحديث OpenClaw
npm update -g openclaw

# تحقق من الصحة العامة
./openclaw-healthcheck.sh
```

راجع [دليل المراقبة والصيانة](/blog/2026-04-09-openclaw-monitoring-maintenance-guide) للمزيد من نصائح الصيانة.

### 2. النسخ الاحتياطي المنتظم

```bash
# اعمل backup يومي لإعداداتك
tar -czf ~/backups/openclaw-$(date +%Y%m%d).tar.gz ~/.openclaw/

# احتفظ بآخر 7 نسخ فقط
ls -t ~/backups/openclaw-*.tar.gz | tail -n +8 | xargs rm --
```

### 3. مراقبة استخدام API والتكاليف

```bash
# تحقق من استهلاك API
openclaw usage --last-month

# اضبط حدود للاستخدام
openclaw config set maxTokensPerDay 100000
```

يمكنك أيضاً مراجعة [المقارنة مع خدمات الأتمتة المدفوعة](/blog/2026-02-09-openclaw-vs-make-comparison) لفهم كيفية تحسين التكاليف.

### 4. تحديث منتظم

```bash
# تحقق من التحديثات كل أسبوع
npm outdated -g openclaw

# قم بالتحديث
npm update -g openclaw

# اتبع changelog
curl -s https://raw.githubusercontent.com/openclaw/openclaw/main/CHANGELOG.md | head -50
```

راجع [إصدار 2026.2.17](/blog/2026-02-21-openclaw-2026-2-17-claude-sonnet-4-6) و [إصدار 2026.2.9](/blog/2026-02-10-openclaw-2026-2-9-release) لمعرفة آخر التحسينات.

## متى تطلب المساعدة من المجتمع

بعض المشاكل تتطلب خبرة مجتمعية أو دعماً رسمياً:

1. **أخطاء في الكود نفسه:** إذا كانت المشكلة bug حقيقي وليس خطأ إعداد، افتح issue في GitHub
2. **مشاكل معقدة في skills مخصصة:** اطلب المساعدة في Discord أو Telegram
3. **مشاكل أمنية:** أبلغ الفريق مباشرة عبر البريد الإلكتروني الرسمي
4. **طلبات features جديدة:** استخدم discussions في GitHub

### معلومات مفيدة عند طلب المساعدة

قدّم دائماً:
- إصدار Node.js: `node --version`
- إصدار OpenClaw: `openclaw --version`
- نظام التشغيل: `uname -a` (macOS/Linux) أو `systeminfo` (Windows)
- رسالة الخطأ الكاملة (استخدم pastebin للرسائل الطويلة)
- الخطوات لإعادة إنتاج المشكلة

## الأسئلة الشائعة

**كيف أعرف إذا كانت المشكلة من OpenClaw أم من API المستخدم (Claude/OpenAI)؟**
اختبر API مباشرة بدون OpenClaw باستخدام curl. إذا فشل، المشكلة من API (أو مفتاحك). إذا نجح مع curl وفشل مع OpenClaw، المشكلة من الإعداد المحلي.

**هل يجب أن أحذف ~/.openclaw وأعيد التثبيت عند كل مشكلة؟**
لا، هذا آخر حل. عادةً مشكلتك لها حل أبسط. احذف فقط إذا فشلت كل الحلول الأخرى، وتأكد من عمل backup أولاً.

**ما هو الحد الأقصى لعدد cron jobs التي يجب أن أستخدمها؟**
لا يوجد حد صارم، لكن عملياً أكثر من 20-30 job نشط قد يؤثر على الأداء. الأهم هو تفريق أوقات التشغيل وعدم تشغيل jobs ثقيلة في نفس اللحظة.

**OpenClaw يستهلك الكثير من الذاكرة، هل هذا طبيعي؟**
استهلاك 500MB - 1GB طبيعي مع عدة جلسات نشطة. أكثر من 2GB قد يشير لمشكلة (تسرب ذاكرة، سجلات ضخمة، أو skills ثقيلة جداً). راجع قسم الأداء أعلاه.

**كيف أستعيد بياناتي إذا حذف OpenClaw ملفات مهمة؟**
استخدم Git دائماً في مشاريعك. إذا لم تكن تستخدم Git، راجع Time Machine (macOS) أو Recycle Bin/Trash. في المستقبل، فعّل versioning تلقائي لمجلداتك المهمة.