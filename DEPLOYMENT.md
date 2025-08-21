# 🚀 دليل نشر KodlarBot على Vercel

## الخطوات المطلوبة للنشر:

### 1. إعداد حساب Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول باستخدام GitHub
3. ربط حسابك بـ GitHub

### 2. رفع المشروع إلى GitHub
```bash
# في مجلد المشروع الرئيسي
git init
git add .
git commit -m "Initial commit - KodlarBot ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/kodlarbot.git
git push -u origin main
```

### 3. نشر على Vercel
1. اذهب إلى [vercel.com/dashboard](https://vercel.com/dashboard)
2. اضغط "New Project"
3. اختر repository الخاص بـ KodlarBot
4. اضغط "Import"

### 4. إعداد متغيرات البيئة
في صفحة إعدادات المشروع على Vercel:
1. اذهب إلى "Settings" > "Environment Variables"
2. أضف المتغير التالي:
   - **Name**: `GOOGLE_API_KEY`
   - **Value**: مفتاح Google Gemini API الخاص بك
   - **Environment**: Production, Preview, Development

### 5. الحصول على Google API Key
1. اذهب إلى [Google AI Studio](https://makersuite.google.com/app/apikey)
2. اضغط "Create API Key"
3. انسخ المفتاح واستخدمه في Vercel

### 6. النشر
1. اضغط "Deploy" في Vercel
2. انتظر حتى ينتهي البناء (2-3 دقائق)
3. ستحصل على رابط الموقع المنشور

## 🔧 إعدادات إضافية

### تخصيص النطاق (اختياري)
1. في Vercel Dashboard > Settings > Domains
2. أضف النطاق المخصص الخاص بك

### مراقبة الأداء
- استخدم Vercel Analytics لمراقبة الأداء
- تحقق من Logs في حالة وجود أخطاء

## 📁 هيكل المشروع المحضر للنشر:

```
kodlarbot/
├── api/                    # Serverless Functions
│   ├── ask.js             # Main API endpoint
│   └── health.js          # Health check
├── kodlar-app/            # React Frontend
│   ├── src/
│   ├── public/
│   └── build/             # Production build
├── vercel.json            # Vercel configuration
├── package.json           # Root dependencies
├── .vercelignore         # Files to ignore
├── .gitignore            # Git ignore rules
└── README.md             # Documentation
```

## ✅ التحقق من النشر

بعد النشر، تأكد من:
1. الصفحة الرئيسية تحمل بشكل صحيح
2. وظيفة "Fix Code" تعمل
3. وظيفة "Translate Code" تعمل
4. لا توجد أخطاء في Console

## 🆘 حل المشاكل الشائعة

### خطأ في API Key
- تأكد من صحة Google API Key
- تأكد من تفعيل Gemini API في Google Cloud

### خطأ في البناء
- تأكد من وجود جميع dependencies
- تحقق من صحة vercel.json

### خطأ CORS
- تم إعداد CORS headers في API functions
- لا حاجة لتعديل إضافي

## 📞 الدعم

في حالة وجود مشاكل:
1. تحقق من Vercel Logs
2. تأكد من إعدادات Environment Variables
3. راجع Google API Console للتأكد من الحصص

---

🎉 **مبروك! موقع KodlarBot جاهز للعالم!** 🎉
