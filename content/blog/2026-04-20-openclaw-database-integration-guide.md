---
title: "دليل ربط قواعد البيانات مع أوبن كلاو (OpenClaw): PostgreSQL وMySQL وMongoDB"
excerpt: "تعلم كيفية ربط أوبن كلاو (OpenClaw) بقواعد البيانات الشهيرة، أتمتة الاستعلامات والتقارير، وبناء workflows ذكية تتفاعل مع بياناتك في الوقت الفعلي."
date: "2026-04-20"
author: "فريق ArabClaw"
tags: ["أوبن كلاو", "الذكاء الاصطناعي", "قواعد البيانات", "PostgreSQL", "MySQL", "MongoDB"]
language: "ar"
canonical: "https://arabclaw.com/blog/2026-04-20-openclaw-database-integration-guide"
---

# دليل ربط قواعد البيانات مع أوبن كلاو (OpenClaw): PostgreSQL وMySQL وMongoDB

> **ما ستتعلمه:** كيفية ربط أوبن كلاو (OpenClaw) بـ PostgreSQL وMySQL وMongoDB، أتمتة الاستعلامات والتقارير اليومية، وبناء workflows ذكية تتفاعل مع بياناتك. ستتعلم أيضاً كيفية إنشاء dashboard تلقائي لعرض مؤشرات الأداء الرئيسية (KPIs) من قاعدة بياناتك.

قواعد البيانات هي قلب أي تطبيق حديث. سواء كنت تدير متجراً إلكترونياً، نظام إدارة علاقات عملاء (CRM)، أو تطبيق SaaS، فإن بياناتك مخزنة في PostgreSQL أو MySQL أو MongoDB أو غيرها من الأنظمة.

ماذا لو كان بإمكانك أتمتة كل شيء يتعلق ببياناتك؟ التقارير اليومية، التنبيهات عند تجاوز حد معين، تنظيف البيانات القديمة، النسخ الاحتياطي الذكي، وحتى توليد insights تلقائية باستخدام الذكاء الاصطناعي.

هذا بالضبط ما يقدمه أوبن كلاو (OpenClaw). في هذا الدليل الشامل، سنتعلم كيفية ربط وكيلك الذكي بقواعد البيانات الأكثر شيوعاً وبناء workflows عملية تحل مشاكل حقيقية.

## لماذا تحتاج لربط أوبن كلاو بقواعد البيانات؟

قبل أن نبدأ بالجانب التقني، دعنا نفهم لماذا هذا مهم.

**1. أتمتة التقارير اليومية**
بدلاً من كتابة SQL يدوياً كل صباح لمعرفة عدد المبيعات أو المستخدمين الجدد، دع أوبن كلاو (OpenClaw) يفعل ذلك تلقائياً ويرسل لك النتائج عبر Telegram أو Email.

**2. التنبيهات الذكية**
اضبط تنبيهات تلقائية عند حدوث أحداث مهمة: عميل جديد، طلب بقيمة كبيرة، خطأ في النظام، أو انخفاض مفاجئ في المبيعات.

**3. تنظيف وصيانة البيانات**
أتمتة حذف البيانات القديمة، أرشفة السجلات، تحديث الحالات، أو تصحيح البيانات الخاطئة بناءً على قواعد محددة.

**4. توليد Insights بالذكاء الاصطناعي**
أوبن كلاو (OpenClaw) يمكنه قراءة بياناتك، تحليلها، واقتراح insights وتوصيات ذكية بناءً على الأنماط التي يكتشفها.

**5. Workflows معقدة**
بناء سيناريوهات متقدمة: عند إضافة عميل جديد في قاعدة البيانات، أرسل له email ترحيبي، أضفه إلى قائمة Mailchimp، وأنشئ مهمة متابعة في نظام CRM.

## المتطلبات الأساسية

قبل البدء، تأكد من أن لديك:

1. **أوبن كلاو (OpenClaw) مثبت ويعمل** على جهازك أو VPS. راجع [دليل التثبيت على Linux](/blog/2026-02-11-install-openclaw-linux-ubuntu) أو [دليل Windows](/blog/2026-04-18-install-openclaw-windows) إذا لم تكن قد بدأت بعد.

2. **قاعدة بيانات تعمل** (PostgreSQL أو MySQL أو MongoDB) مع بيانات للتجربة.

3. **معرفة أساسية بـ SQL** أو استعلامات MongoDB (سنشرح الأساسيات).

4. **Node.js مثبت** (يأتي عادةً مع أوبن كلاو (OpenClaw)).

5. **معلومات الاتصال** بقاعدة البيانات: اسم المستخدم، كلمة المرور، المضيف (host)، المنفذ (port)، واسم قاعدة البيانات.

## ربط أوبن كلاو بـ PostgreSQL

PostgreSQL هي قاعدة البيانات الأكثر شيوعاً للتطبيقات الحديثة. دعنا نتعلم كيفية الاتصال بها.

### الخطوة 1: تثبيت مكتبة PostgreSQL

أوبن كلاو (OpenClaw) يعمل على Node.js، لذلك سنستخدم مكتبة `pg` للاتصال بـ PostgreSQL:

```bash
cd ~/clawd
npm install pg
```

### الخطوة 2: إنشاء سكريبت اتصال

أنشئ ملف `db-postgres.js` في مجلد العمل:

```javascript
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'postgres',
  password: 'your_password'
});

client.connect();

async function runQuery(query) {
  try {
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.error('خطأ في الاستعلام:', err);
    return null;
  }
}

module.exports = { runQuery, client };
```

غيّر `host` و`database` و`user` و`password` بمعلومات قاعدة بياناتك الحقيقية.

### الخطوة 3: اختبار الاتصال

جرب الاتصال بسكريبت بسيط:

```bash
node -e "const db = require('./db-postgres.js'); db.runQuery('SELECT NOW()').then(r => console.log(r));"
```

يجب أن ترى الوقت الحالي من قاعدة البيانات. إذا نجح الاتصال، أنت جاهز للمرحلة التالية.

### الخطوة 4: أتمتة تقرير يومي

الآن لنجعل أوبن كلاو (OpenClaw) يرسل لك تقريراً يومياً عن عدد المستخدمين الجدد.

افتح جلسة مع أوبن كلاو (OpenClaw) واطلب منه:

```
أنشئ Cron Job يعمل يومياً الساعة 9 صباحاً، يقوم بتشغيل استعلام PostgreSQL لحساب عدد المستخدمين الجدد اليوم، ثم يرسل النتيجة إلى Telegram.
```

أوبن كلاو (OpenClaw) سيساعدك في إنشاء السكريبت والـ Cron Job المناسبين. تعلم المزيد عن [Cron Jobs في أوبن كلاو](/blog/2026-02-15-cron-jobs-automation-guide).

## ربط أوبن كلاو بـ MySQL

MySQL خيار شائع آخر، خاصة في تطبيقات PHP التقليدية. الطريقة مشابهة جداً لـ PostgreSQL.

### الخطوة 1: تثبيت مكتبة MySQL

```bash
npm install mysql2
```

### الخطوة 2: إنشاء سكريبت الاتصال

أنشئ `db-mysql.js`:

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10
});

async function runQuery(query) {
  try {
    const [rows] = await pool.execute(query);
    return rows;
  } catch (err) {
    console.error('خطأ في الاستعلام:', err);
    return null;
  }
}

module.exports = { runQuery, pool };
```

### الخطوة 3: مثال عملي للتجارة الإلكترونية

لنفترض أنك تدير متجراً إلكترونياً وتريد تنبيهاً فورياً عند طلب بقيمة أكبر من 1000 دولار.

أنشئ سكريبت `check-big-orders.js`:

```javascript
const db = require('./db-mysql.js');

async function checkBigOrders() {
  const query = `
    SELECT id, customer_name, total_amount, created_at 
    FROM orders 
    WHERE total_amount > 1000 
    AND notified = 0
  `;
  
  const orders = await db.runQuery(query);
  
  if (orders && orders.length > 0) {
    orders.forEach(order => {
      console.log(`طلب كبير! العميل: ${order.customer_name}, المبلغ: ${order.total_amount} دولار`);
    });
    
    // تحديث حالة الإشعار
    await db.runQuery(`UPDATE orders SET notified = 1 WHERE id IN (${orders.map(o => o.id).join(',')})`);
  } else {
    console.log('لا توجد طلبات كبيرة جديدة.');
  }
}

checkBigOrders();
```

ثم اضبط Cron Job يعمل كل 10 دقائق لتشغيل هذا السكريبت. راجع [دليل أتمتة التجارة الإلكترونية](/blog/2026-04-25-atamtat-tajir-electronia) لمزيد من الأمثلة.

## ربط أوبن كلاو بـ MongoDB

MongoDB قاعدة بيانات NoSQL شهيرة تستخدم في التطبيقات الحديثة.

### الخطوة 1: تثبيت مكتبة MongoDB

```bash
npm install mongodb
```

### الخطوة 2: إنشاء سكريبت الاتصال

أنشئ `db-mongo.js`:

```javascript
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'myapp';
let db;

async function connect() {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log('متصل بـ MongoDB');
}

async function getCollection(name) {
  if (!db) await connect();
  return db.collection(name);
}

module.exports = { getCollection };
```

### الخطوة 3: مثال تحليل بيانات

لنفترض أن لديك collection اسمه `users` وتريد معرفة عدد المستخدمين من كل دولة:

```javascript
const mongo = require('./db-mongo.js');

async function analyzeUsers() {
  const users = await mongo.getCollection('users');
  const stats = await users.aggregate([
    { $group: { _id: '$country', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]).toArray();
  
  console.log('إحصائيات المستخدمين حسب الدولة:');
  stats.forEach(stat => {
    console.log(`${stat._id}: ${stat.count} مستخدم`);
  });
}

analyzeUsers();
```

أوبن كلاو (OpenClaw) يمكنه تشغيل هذا السكريبت تلقائياً وإرسال النتائج لك عبر [Telegram](/blog/2026-02-22-telegram-automation-guide) أو [WhatsApp](/blog/2026-02-08-whatsapp-automation-guide).

## Workflows متقدمة: دمج قواعد البيانات مع أدوات أخرى

القوة الحقيقية تظهر عند دمج قاعدة البيانات مع أدوات أخرى.

### مثال 1: تقرير أسبوعي بالبريد الإلكتروني

اضبط Cron Job أسبوعي يقوم بـ:
1. جلب أهم 10 عملاء من PostgreSQL
2. توليد تقرير HTML بالإحصائيات
3. إرسال التقرير عبر Email باستخدام [Himalaya](/blog/2026-02-16-email-automation-himalaya)

### مثال 2: Dashboard تلقائي

استخدم أوبن كلاو (OpenClaw) لتوليد ملف HTML يعرض KPIs من قاعدة البيانات:
- عدد المستخدمين النشطين
- إجمالي المبيعات هذا الشهر
- معدل التحويل (Conversion Rate)
- الطلبات المعلقة

احفظ الملف في مجلد `~/dashboard/` وافتحه في المتصفح. يتم تحديثه تلقائياً كل ساعة.

### مثال 3: نسخ احتياطي ذكي

اضبط نسخاً احتياطياً يومياً لقاعدة البيانات، مع رفع الملف إلى Google Drive أو Dropbox تلقائياً. استخدم [Google Workspace integration](/blog/2026-04-02-openclaw-google-workspace-arab-business) لذلك.

## أمان البيانات: نصائح مهمة

التعامل مع قواعد البيانات يتطلب حذراً:

1. **لا تكتب معلومات الاتصال في الكود**
   استخدم متغيرات البيئة (Environment Variables):
   ```bash
   export DB_HOST=localhost
   export DB_USER=myuser
   export DB_PASS=secret123
   ```
   
   ثم في الكود:
   ```javascript
   const host = process.env.DB_HOST;
   const user = process.env.DB_USER;
   const password = process.env.DB_PASS;
   ```

2. **استخدم اتصالات آمنة (SSL/TLS)**
   عند الاتصال بقواعد بيانات على السحابة، فعّل SSL دائماً.

3. **احذر من SQL Injection**
   لا تبني استعلامات SQL بجمع النصوص (string concatenation). استخدم Prepared Statements دائماً.

4. **قيد الصلاحيات**
   لا تمنح أوبن كلاو (OpenClaw) صلاحيات `root` أو `admin` على قاعدة البيانات. أنشئ مستخدماً خاصاً بصلاحيات محدودة (قراءة فقط إذا أمكن).

5. **مراقبة الأداء**
   استعلامات قواعد البيانات قد تكون مكلفة. راقب استهلاك الموارد باستخدام [دليل المراقبة والصيانة](/blog/2026-04-09-openclaw-monitoring-maintenance-guide).

تعلم المزيد عن [أمان وخصوصية بياناتك مع أوبن كلاو](/blog/2026-02-14-openclaw-security-privacy-guide).

## حل المشاكل الشائعة

### مشكلة: "Error: connect ECONNREFUSED"

**السبب:** أوبن كلاو (OpenClaw) لا يستطيع الاتصال بقاعدة البيانات.

**الحل:**
- تأكد من أن قاعدة البيانات تعمل: `systemctl status postgresql` أو `systemctl status mysql`
- تحقق من المنفذ (port): PostgreSQL عادة 5432، MySQL عادة 3306
- تأكد من أن Firewall لا يحجب الاتصال

### مشكلة: "authentication failed"

**السبب:** اسم المستخدم أو كلمة المرور خاطئة.

**الحل:**
- تحقق من بيانات الاعتماد
- في PostgreSQL، تحقق من ملف `pg_hba.conf` للصلاحيات
- في MySQL، تحقق من الصلاحيات: `SHOW GRANTS FOR 'username'@'localhost';`

راجع [دليل إصلاح الأعطال](/blog/2026-04-13-openclaw-troubleshooting-common-problems) للمزيد.

## أفكار عملية للاستفادة من التكامل

إليك 10 أفكار عملية يمكنك تطبيقها اليوم:

1. **تقرير يومي بأهم الأحداث**: طلبات جديدة، مستخدمون جدد، أخطاء في النظام
2. **تنبيهات الأداء**: عند انخفاض المبيعات أو زيادة معدل الإلغاءات
3. **تحليل سلوك المستخدمين**: أكثر الصفحات زيارة، أوقات الذروة، معدل الارتداد
4. **تنظيف البيانات التلقائي**: حذف حسابات غير مفعلة بعد 30 يوماً
5. **مراقبة المخزون**: تنبيه عند نفاد منتج معين
6. **رصد الاحتيال**: اكتشاف أنماط مشبوهة في الطلبات
7. **إحصائيات فريق العمل**: أداء موظفي المبيعات، عدد التذاكر المغلقة
8. **نسخ احتياطي ذكي**: حسب الوقت أو حجم التغييرات
9. **توليد فواتير تلقائية**: من سجلات قاعدة البيانات إلى PDF
10. **Chatbot داخلي**: موظفوك يمكنهم سؤال أوبن كلاو (OpenClaw) عن بيانات معينة بلغة طبيعية

## الخلاصة

ربط أوبن كلاو (OpenClaw) بقواعد البيانات يفتح أمامك عالماً من الإمكانيات. من أتمتة التقارير البسيطة إلى workflows معقدة تربط أنظمة متعددة، يمكنك توفير ساعات من العمل اليدوي وتحويل بياناتك إلى insights قابلة للتنفيذ.

البداية بسيطة: اختر قاعدة بيانات واحدة، اصنع سكريبت اتصال، وجرب استعلاماً بسيطاً. ثم توسع تدريجياً بإضافة Cron Jobs، تنبيهات، ودمج مع [أدوات أخرى](/blog/openclaw-vs-langchain-arabic).

الآن أنت تعرف الأساسيات. حان وقت التطبيق العملي على مشاريعك.

## الأسئلة الشائعة

**هل يدعم أوبن كلاو (OpenClaw) قواعد بيانات أخرى غير PostgreSQL وMySQL وMongoDB؟**
نعم، أي قاعدة بيانات لها مكتبة Node.js يمكن ربطها مع أوبن كلاو (OpenClaw). يمكنك استخدام SQLite، MariaDB، Redis، Cassandra، وغيرها. الطريقة نفسها: تثبيت المكتبة، كتابة سكريبت الاتصال، ثم استخدامه في workflows.

**كيف أحمي معلومات الاتصال بقاعدة البيانات من التسريب؟**
استخدم متغيرات البيئة (Environment Variables) بدلاً من كتابة كلمات المرور في الكود. احفظها في ملف `.env` وأضفه إلى `.gitignore` حتى لا يُرفع إلى GitHub أو Git. يمكنك أيضاً استخدام خدمات إدارة الأسرار مثل HashiCorp Vault أو AWS Secrets Manager.

**هل يمكن لأوبن كلاو (OpenClaw) كتابة استعلامات SQL بنفسه؟**
نعم! أوبن كلاو (OpenClaw) يمكنه فهم طلبك بلغة طبيعية وتوليد استعلام SQL أو MongoDB مناسب. مثلاً، يمكنك أن تقول: "اعطني عدد المستخدمين الذين سجلوا اليوم" وسيكتب الاستعلام المناسب. لكن راجع الاستعلام دائماً قبل تنفيذه، خاصة إذا كان يعدل البيانات.

**ما هي أفضل قاعدة بيانات لمشروعي؟**
يعتمد على نوع المشروع. PostgreSQL خيار ممتاز للتطبيقات التي تحتاج علاقات معقدة وموثوقية عالية. MySQL بسيط وسريع للمشاريع الصغيرة والمتوسطة. MongoDB مناسب للبيانات غير المنظمة أو المتغيرة باستمرار مثل logs أو بيانات IoT. لا توجد إجابة واحدة، جرب وقرر.

**هل يمكن ربط أوبن كلاو (OpenClaw) بقاعدة بيانات على السحابة مثل AWS RDS أو Google Cloud SQL؟**
بالتأكيد. الطريقة نفسها تماماً، فقط غيّر معلومات الاتصال (host، port، username، password) لتتوافق مع قاعدة البيانات السحابية. تأكد من تفعيل SSL/TLS للأمان، وأن Firewall الخاص بالسحابة يسمح بالاتصال من عنوان IP الخاص بك أو VPS الذي يعمل عليه أوبن كلاو (OpenClaw).