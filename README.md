# Rohan Cherkar — Personal Portfolio

A modern, responsive single-page portfolio website built with **React + Vite + Tailwind CSS + Framer Motion**.

🌐 **Live:** [rohan-cherkar.vercel.app](https://rohan-cherkar.vercel.app) *(update with your actual URL)*

---

## ✨ Features

- 🎨 Dark purple aurora/glassmorphism design
- ⚡ Framer Motion scroll-reveal animations & 3D tilt cards
- 🖱️ Custom cursor with glow trail (desktop only)
- ✍️ Typing/rotating title effect
- 📊 Animated counters for stats
- 📬 Contact form via Formspree with validation & toast notifications
- 🐙 GitHub contribution graph + featured repos
- 📱 Fully responsive (360px → desktop)
- ♿ Accessible: semantic HTML, ARIA labels, keyboard navigation
- 🔍 SEO meta tags + Open Graph + JSON-LD structured data
- 🚀 Deploy-ready for Vercel

---

## 🗂️ Project Structure

```
MyPortfolio/
├── public/
│   ├── images/
│   │   ├── rohan.jpg          ← ADD YOUR PHOTO HERE
│   │   ├── roamly.png         ← Add Roamly screenshot
│   │   ├── tradeza.png        ← Add Tradeza screenshot
│   │   └── digital-voice.png  ← Add Digital Voice screenshot
│   ├── resume.pdf             ← ADD YOUR RESUME HERE
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── data/
│   │   └── portfolioData.js   ← EDIT ALL CONTENT HERE
│   ├── hooks/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── vercel.json
└── tailwind.config.js
```

---

## 🚀 Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env: add your Formspree endpoint

# 3. Add your assets
#    public/images/rohan.jpg  — your photo
#    public/resume.pdf        — your resume

# 4. Start dev server
npm run dev
```

## 🛠️ Deploy to Vercel

```bash
# CLI
npm i -g vercel
vercel --prod
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) and set `VITE_FORMSPREE_ENDPOINT` as an env var.

## 📝 Edit Content

All content lives in **`src/data/portfolioData.js`** — projects, skills, education, etc.

## 📦 Stack

React 18 + Vite · Tailwind CSS · Framer Motion · React Icons · Lenis · React Hot Toast · Formspree

---

MIT © 2026 [Rohan Cherkar](https://github.com/Rohan-cherkar)
