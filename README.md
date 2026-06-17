# Shayan Ekramnia — Personal Website

A fast, dependency-free personal site (plain HTML/CSS/JS) for GitHub Pages.
No build step, no frameworks — just static files.

```
personal_website/
├── index.html              # the whole page (single-page site)
├── assets/
│   ├── css/styles.css       # slate + electric-blue theme, dark/light
│   ├── js/main.js           # theme toggle, reveal, counters, mobile nav
│   ├── img/
│   │   ├── favicon.svg
│   │   └── profile.jpg      # ← ADD YOUR PHOTO HERE (see below)
│   └── Shayan_Ekramnia_CV.pdf
├── .nojekyll                # tells GitHub Pages to serve files as-is
└── README.md
```

## 1. Add your photo

Drop a headshot at **`assets/img/profile.jpg`**.
- Square-ish, at least 600×600 px, JPG or PNG (keep the name `profile.jpg`).
- Until you add it, the hero gracefully shows an animated **“SE” monogram** instead — the site looks finished either way.

## 2. Preview locally

Open `index.html` directly in a browser, or serve it:

```bash
cd personal_website
python3 -m http.server 8000
# visit http://localhost:8000
```

## 3. Publish to GitHub Pages

**Option A — user site at `https://shayan-ekramnia.github.io` (recommended):**

```bash
cd personal_website
git init
git add .
git commit -m "Personal website"
git branch -M main
git remote add origin https://github.com/shayan-ekramnia/shayan-ekramnia.github.io.git
git push -u origin main
```

Create the repo `shayan-ekramnia.github.io` on GitHub first (must match your
username exactly). It goes live at `https://shayan-ekramnia.github.io` within a
minute or two.

**Option B — project site at `https://shayan-ekramnia.github.io/<repo>`:**

Push these files to any repo, then in GitHub → **Settings → Pages** set
*Source = Deploy from a branch*, *Branch = main / root*. All asset paths are
relative, so it works under a subpath without changes.

## 4. Keep the CV in sync

The downloadable CV is `assets/Shayan_Ekramnia_CV.pdf`. When you rebuild the CV
in the `cv/` project, copy the new PDF over the same filename:

```bash
cp ../cv/pdfs/Shayan_Ekramnia_senior_ml_engineer.pdf assets/Shayan_Ekramnia_CV.pdf
```

## Optional polish

- **Custom domain:** add a `CNAME` file containing your domain, and point a
  DNS `CNAME`/`A` record at GitHub Pages.
- **Contact form:** the contact section uses a `mailto:` link. To collect
  messages without exposing email, swap in a [Formspree](https://formspree.io)
  form (free tier) — happy to wire this up.
- **Analytics:** drop in a privacy-friendly analytics snippet (e.g. Plausible,
  GoatCounter) before `</head>` if you want visit stats.
