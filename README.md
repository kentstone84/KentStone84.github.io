# ME - Landing Page

Professional landing page for ME - Chronic Illness Journal

## 📁 Structure

```
WebSite/
├── index.html          # Main landing page
├── styles.css          # Complete styling (dark theme)
├── script.js           # Mobile menu + smooth scroll
├── images/             # ADD YOUR SCREENSHOTS HERE
│   ├── app-screenshot.png       # Hero section screenshot
│   ├── app-screenshot-2.png     # (optional) Additional screenshots
│   ├── app-screenshot-3.png     # (optional) Additional screenshots
│   └── og-image.png             # Social media preview image (1200x630)
├── privacy.html        # TODO: Add privacy policy
├── terms.html          # TODO: Add terms of service
└── README.md           # This file
```

## 🚀 Deploy to GitHub Pages

### Option 1: Deploy to username.github.io

1. **Create repository:**
   ```bash
   # On GitHub, create public repo: yourusername.github.io
   ```

2. **Push WebSite folder contents:**
   ```bash
   cd WebSite
   git init
   git add .
   git commit -m "Initial landing page"
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. **Your site will be live at:**
   ```
   https://yourusername.github.io
   ```

### Option 2: Deploy to project subdomain

1. **Create repository:** `me-app` (or any name)

2. **Push and enable Pages:**
   ```bash
   cd WebSite
   git init
   git add .
   git commit -m "Launch ME landing page"
   git remote add origin https://github.com/yourusername/me-app.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

4. **Your site will be live at:**
   ```
   https://yourusername.github.io/me-app/
   ```

## 📸 Images You Need

### 1. **app-screenshot.png** (Required)
- Hero section screenshot
- Recommended: 1200x900px
- Shows main app interface
- Dark theme preferred
- Make it compelling!

### 2. **og-image.png** (Recommended)
- Social media preview
- Size: 1200x630px
- Include app name + tagline
- Example: "ME - Your pain deserves better than a spreadsheet"

### 3. **Additional Screenshots** (Optional)
- app-screenshot-2.png
- app-screenshot-3.png
- These rotate in hero section if you enable the slideshow

## ✏️ Customize Before Deploy

### 1. Update all "app.yoursite.com" links:
```html
<!-- Find and replace in index.html: -->
https://app.yoursite.com
→ https://your-actual-app-url.com
```

### 2. Update support email:
```html
<!-- In footer: -->
mailto:support@yoursite.com
→ mailto:support@your-actual-email.com
```

### 3. Add your actual app icon:
- Create favicon.ico (16x16, 32x32)
- Add to root:
  ```html
  <link rel="icon" type="image/x-icon" href="./favicon.ico">
  ```

### 4. Create Privacy Policy & Terms:
```bash
# Use generators:
# https://www.privacypolicygenerator.info/
# https://www.termsandconditionsgenerator.com/

# Save as:
WebSite/privacy.html
WebSite/terms.html
```

## 🎨 Color Theme

Dark Forest Theme:
- Background: `#0a1f1a`
- Card: `#133d33`
- Accent: `#7ec9a3`
- Text: `#d4f1e4`
- Muted: `#7fa890`

## 📱 Features

✅ Fully responsive (mobile, tablet, desktop)
✅ Mobile hamburger menu
✅ Smooth scroll navigation
✅ Fade-in animations on scroll
✅ SEO optimized meta tags
✅ Social media preview cards
✅ Fast loading (no external dependencies except fonts)

## 🔧 Technical Details

- **No frameworks** - Pure HTML/CSS/JS
- **No build step** - Deploy as-is
- **Google Fonts:** Inter (fast loading)
- **Performance:** ~50KB total (without images)
- **Browser support:** All modern browsers

## 📊 Analytics Setup (Optional)

Add Google Analytics to `<head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🎯 Launch Checklist

- [ ] Add app screenshots to `/images/`
- [ ] Update all placeholder URLs
- [ ] Create privacy.html
- [ ] Create terms.html
- [ ] Add favicon.ico
- [ ] Test on mobile devices
- [ ] Deploy to GitHub Pages
- [ ] Share on Reddit/Twitter/communities

## 💬 Support

Questions? Open an issue or DM Kent Stone

---

**Built with ❤️ for chronic illness warriors**
