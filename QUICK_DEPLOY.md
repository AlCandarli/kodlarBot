# ⚡ نشر سريع على Vercel

## خطوات النشر السريع:

### 1. رفع إلى GitHub
```bash
git init
git add .
git commit -m "KodlarBot ready for Vercel"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. نشر على Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "New Project"
3. اختر repository
4. أضف Environment Variable:
   - `GOOGLE_API_KEY` = مفتاح Google Gemini API

### 3. انتظر النشر
- سيستغرق 2-3 دقائق
- ستحصل على رابط مثل: `https://kodlarbot.vercel.app`

## 🔑 الحصول على Google API Key:
1. [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API Key
3. انسخ المفتاح

## ✅ تم! موقعك جاهز للعالم 🌍
