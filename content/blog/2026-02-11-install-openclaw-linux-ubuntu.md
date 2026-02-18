---
title: "دليل تثبيت أوبن كلاو (OpenClaw) على Linux (Ubuntu/Debian): خطوة بخطوة"
excerpt: "تعلم كيفية تثبيت وإعداد أوبن كلاو (OpenClaw) على نظام Linux بالتفصيل، من تثبيت Node.js إلى تشغيل أول مساعد ذكي لك"
date: "2026-02-11"
author: "فريق ArabClaw"
tags: ["تثبيت", "Linux", "Ubuntu", "دليل"]
language: "ar"
---

# دليل تثبيت أوبن كلاو (OpenClaw) على Linux (Ubuntu/Debian): خطوة بخطوة

**ما ستتعلمه في هذا المقال:** يقدم هذا الدليل الشامل جميع خطوات تثبيت أوبن كلاو (OpenClaw) على Ubuntu وDebian، من تثبيت Node.js وإعداد التبعيات إلى تكوين Telegram وتشغيل أوبن كلاو (OpenClaw) كخدمة systemd. بنهاية هذا الدليل ستكون لديك مساعد ذكاء اصطناعي يعمل على جهازك Linux.

إذا كنت من مستخدمي Linux وترغب في الاستفادة من قوة **أوبن كلاو (OpenClaw)** لأتمتة مهامك اليومية، فأنت في المكان الصحيح! في هذا الدليل الشامل، سنغطي كل خطوة من البداية إلى النهاية لتثبيت أوبن كلاو (OpenClaw) على Ubuntu أو Debian.

## لماذا أوبن كلاو (OpenClaw) على Linux؟

Linux هو البيئة المثالية لـ أوبن كلاو (OpenClaw) لعدة أسباب:

- **الأداء العالي**: استهلاك أقل للموارد مقارنة بأنظمة أخرى
- **الاستقرار**: مثالي للتشغيل على خوادم VPS أو Raspberry Pi
- **المرونة**: تحكم كامل في النظام والأتمتة
- **التكلفة**: يمكنك تشغيل أوبن كلاو (OpenClaw) على خادم VPS بتكلفة منخفضة

## المتطلبات الأساسية

قبل أن نبدأ، تأكد من توفر:

- **نظام التشغيل**: Ubuntu 20.04+ أو Debian 11+
- **الذاكرة**: 2GB RAM على الأقل (4GB موصى به)
- **المساحة**: 5GB مساحة حرة
- **الصلاحيات**: وصول sudo أو root
- **اتصال إنترنت**: لتحميل الحزم والتبعيات

## الخطوة 1: تحديث النظام

أولاً، دعنا نتأكد من أن نظامك محدث:

```bash
sudo apt update && sudo apt upgrade -y
```

هذا يضمن أن جميع الحزم الأساسية محدثة ويقلل من احتمالية حدوث مشاكل في التوافق.

## الخطوة 2: تثبيت Node.js (الطريقة الموصى بها)

أوبن كلاو (OpenClaw) يتطلب **Node.js 18** أو أحدث. سنستخدم NodeSource PPA للحصول على أحدث إصدار:

```bash
# تثبيت curl إذا لم يكن موجودًا
sudo apt install -y curl

# إضافة مستودع NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# تثبيت Node.js
sudo apt install -y nodejs

# التحقق من التثبيت
node --version  # يجب أن يظهر v20.x.x
npm --version   # يجب أن يظهر 10.x.x
```

### البديل: استخدام nvm (للمستخدمين المتقدمين)

إذا كنت تفضل إدارة إصدارات Node.js متعددة:

```bash
# تثبيت nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# إعادة تحميل الـ shell
source ~/.bashrc

# تثبيت Node.js 20
nvm install 20
nvm use 20
nvm alias default 20
```

## الخطوة 3: تثبيت التبعيات الإضافية

بعض المهارات في أوبن كلاو (OpenClaw) تتطلب حزم إضافية:

```bash
# أدوات البناء (مطلوبة لبعض الحزم)
sudo apt install -y build-essential

# Git (لإدارة المهارات والمشاريع)
sudo apt install -y git

# FFmpeg (لمعالجة الوسائط)
sudo apt install -y ffmpeg

# ImageMagick (لمعالجة الصور)
sudo apt install -y imagemagick
```

## الخطوة 4: تثبيت أوبن كلاو (OpenClaw)

الآن، لنقم بتثبيت أوبن كلاو (OpenClaw) عالميًا:

```bash
sudo npm install -g openclaw
```

هذا قد يستغرق بضع دقائق حسب سرعة اتصالك بالإنترنت.

### التحقق من التثبيت

```bash
openclaw --version
```

إذا ظهر رقم الإصدار، تهانينا! أوبن كلاو (OpenClaw) مثبت بنجاح.

## الخطوة 5: إعداد أوبن كلاو (OpenClaw)

الآن، لنقم بإعداد أوبن كلاو (OpenClaw) للاستخدام لأول مرة:

```bash
# إنشاء مجلد العمل
mkdir -p ~/clawd
cd ~/clawd

# تهيئة أوبن كلاو
openclaw init
```

ستظهر لك بعض الأسئلة:

1. **اختر نموذج AI**: اختر Claude Sonnet (الخيار الافتراضي)
2. **API Key**: أدخل مفتاح Anthropic API الخاص بك
3. **اسم المساعد**: اختر اسمًا (مثل "Julie" أو "Ahmad")

## الخطوة 6: إنشاء ملف الخدمة (systemd)

لتشغيل أوبن كلاو (OpenClaw) كخدمة تبدأ تلقائيًا مع النظام:

```bash
# إنشاء ملف الخدمة
sudo nano /etc/systemd/system/openclaw.service
```

أضف المحتوى التالي (استبدل `YOUR_USERNAME` باسم المستخدم الخاص بك):

```ini
[Unit]
Description=OpenClaw AI Assistant
After=network.target

[Service]
Type=simple
User=YOUR_USERNAME
WorkingDirectory=/home/YOUR_USERNAME/clawd
ExecStart=/usr/bin/openclaw gateway start
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

احفظ الملف (Ctrl+X ثم Y ثم Enter).

### تفعيل وتشغيل الخدمة

```bash
# إعادة تحميل systemd
sudo systemctl daemon-reload

# تفعيل الخدمة للبدء التلقائي
sudo systemctl enable openclaw

# بدء الخدمة
sudo systemctl start openclaw

# التحقق من الحالة
sudo systemctl status openclaw
```

## الخطوة 7: إعداد Telegram (اختياري ولكن موصى به)

لاستخدام أوبن كلاو (OpenClaw) عبر Telegram:

1. افتح Telegram وابحث عن [@BotFather](https://t.me/BotFather)
2. أرسل `/newbot` واتبع التعليمات
3. احفظ الـ **Bot Token** الذي تحصل عليه

الآن، قم بإضافة البوت إلى إعدادات أوبن كلاو (OpenClaw):

```bash
openclaw config set telegram.token "YOUR_BOT_TOKEN"
openclaw config set telegram.chat_id "YOUR_CHAT_ID"
```

للحصول على `chat_id`، أرسل رسالة لبوتك ثم:

```bash
curl https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
```

ابحث عن `"chat":{"id":123456789` في النتيجة.

## الخطوة 8: تثبيت المهارات الأساسية

أوبن كلاو (OpenClaw) يصبح أقوى مع المهارات. لنثبت بعضها:

```bash
# مهارة GitHub للمطورين
openclaw skill install github

# مهارة الطقس
openclaw skill install weather

# مهارة WhatsApp للأتمتة
openclaw skill install whatsapp
```

## الخطوة 9: اختبار التثبيت

لنتأكد أن كل شيء يعمل:

```bash
# إرسال رسالة اختبار
openclaw chat "مرحبًا! هل يمكنك سماعي؟"
```

إذا حصلت على رد، فكل شيء يعمل بشكل مثالي!

## استكشاف الأخطاء وحلها

### المشكلة: `command not found: openclaw`

**الحل**: تأكد من أن npm global bin في PATH:

```bash
echo 'export PATH="$PATH:$(npm config get prefix)/bin"' >> ~/.bashrc
source ~/.bashrc
```

### المشكلة: `Permission denied` أثناء التثبيت

**الحل**: استخدم sudo أو أصلح أذونات npm:

```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

ثم أعد تثبيت أوبن كلاو (OpenClaw) بدون sudo:

```bash
npm install -g openclaw
```

### المشكلة: الخدمة لا تبدأ

**الحل**: تحقق من سجلات الخطأ:

```bash
sudo journalctl -u openclaw -n 50
```

غالبًا ما تكون المشكلة في مسارات الملفات أو الأذونات.

### المشكلة: استهلاك عالي للذاكرة

**الحل**: قلل عدد العمليات المتزامنة في الإعدادات:

```bash
openclaw config set performance.maxConcurrency 2
openclaw gateway restart
```

## الأمان والحماية

عند تشغيل أوبن كلاو (OpenClaw) على خادم، اتبع هذه الممارسات:

1. **جدار ناري**: استخدم ufw لتقييد الوصول
   ```bash
   sudo ufw enable
   sudo ufw allow 22/tcp  # SSH فقط
   ```

2. **تحديثات منتظمة**: قم بتحديث النظام والحزم دوريًا
   ```bash
   sudo apt update && sudo apt upgrade
   ```

3. **نسخ احتياطية**: احتفظ بنسخ احتياطية من مجلد العمل
   ```bash
   tar -czf clawd-backup-$(date +%Y%m%d).tar.gz ~/clawd
   ```

راجع [دليل الأمان والخصوصية](/blog/2026-02-07-security-privacy) للمزيد.

## الخطوات التالية

الآن بعد أن أصبح أوبن كلاو (OpenClaw) مثبتًا ويعمل:

1. **تخصيص شخصية المساعد**: عدّل `SOUL.md` و `IDENTITY.md`
2. **أتمتة المهام**: استخدم Cron Jobs لجدولة المهام
3. **تكامل مع أدوات أخرى**: جرب [أتمتة GitHub](/blog/2026-02-10-github-automation-openclaw)

## المقارنة مع منصات أخرى

إذا كنت تتساءل لماذا أوبن كلاو (OpenClaw) وليس أدوات أخرى:

- **مقابل Zapier**: راجع [مقارنة OpenClaw vs Zapier](/blog/2026-02-09-openclaw-vs-zapier-comparison)
- **مقابل Make**: راجع [مقارنة OpenClaw vs Make](/blog/2026-02-09-openclaw-vs-make-comparison)

أوبن كلاو (OpenClaw) يمنحك **تحكمًا كاملاً** و**خصوصية** و**قابلية للتوسع** بدون قيود الاشتراكات الشهرية.

## الخلاصة

تثبيت أوبن كلاو (OpenClaw) على Linux عملية بسيطة ومباشرة. باتباع هذا الدليل، لديك الآن مساعد ذكي قوي يعمل على نظامك، جاهز لأتمتة مهامك اليومية.

الجميل في أوبن كلاو (OpenClaw) أنه يتحسن مع الاستخدام — كلما تفاعلت معه أكثر، كلما فهمك بشكل أفضل وأصبح أكثر فائدة.

---

## الأسئلة الشائعة

**ما هي متطلبات تشغيل أوبن كلاو (OpenClaw) على Linux؟**
يحتاج أوبن كلاو (OpenClaw) إلى Node.js 18+ و2GB RAM كحد أدنى (4GB موصى به) ومساحة قرص 5GB. يعمل على Ubuntu 20.04+ وDebian 11+ وتوزيعات مشابهة.

**هل يمكن تشغيل أوبن كلاو (OpenClaw) على Raspberry Pi؟**
نعم، أوبن كلاو (OpenClaw) يعمل على Raspberry Pi 4 وأحدث. تأكد من تثبيت نظام 64-bit وNode.js المناسب لـ ARM64.

**كيف أشغل أوبن كلاو (OpenClaw) كخدمة تبدأ تلقائياً؟**
استخدم systemd كما هو موضح في الخطوة 6 من هذا الدليل. أنشئ ملف service ثم استخدم `systemctl enable openclaw` لتفعيل البدء التلقائي.

**هل أوبن كلاو (OpenClaw) يعمل مع توزيعات Linux الأخرى غير Ubuntu؟**
نعم، أوبن كلاو (OpenClaw) يعمل على أي توزيعة تدعم Node.js 18+، بما في ذلك Fedora وArch وCentOS وغيرها. قد تختلف أوامر تثبيت التبعيات.

---

**هل أعجبك هذا الدليل؟** شاركه مع أصدقائك المهتمين بالأتمتة والذكاء الاصطناعي!

**التالي**: تعلم كيفية [إنشاء أول مهارة مخصصة](/blog/create-first-skill) لـ أوبن كلاو (OpenClaw).
