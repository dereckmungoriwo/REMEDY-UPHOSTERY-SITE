# Stitch & Soul — Upholstery Website Template

A clean, multi-page static website template for upholstery businesses.
Dark luxury aesthetic with gold accents. Ready for GitHub Pages hosting.

---

## 📁 File Structure

```
upholstery-site/
├── index.html          ← Home page (logo, description, services, footer)
├── products.html       ← Products grid (15 items, 3×5 layout)
├── contact.html        ← Contact form + info + map placeholder
├── css/
│   ├── style.css       ← Shared variables, nav, footer, buttons
│   ├── home.css        ← Home page styles only
│   ├── products.css    ← Products grid & card styles
│   └── contact.css     ← Contact form & info styles
└── assets/
    ├── logo-placeholder.png   ← Replace with your logo
    ├── product-01.png         ← Replace with your product photos
    ├── product-02.png
    └── ... (up to product-15.png)
```

---

## 🚀 Hosting on GitHub Pages

1. Create a new GitHub repository (e.g. `my-upholstery-site`)
2. Upload all files — keep the folder structure exactly as shown above
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save** — your site will be live at `https://yourusername.github.io/my-upholstery-site/`

---

## ✏️ How to Customize

### Replace the Logo
Swap `assets/logo-placeholder.png` with your own logo file.
Keep the same filename, or update the `src` attribute in all 3 HTML files.

### Update Business Info
Search all 3 HTML files for `✏️ EDIT` comments — those mark every spot to personalize:
- Company name, city, address, phone, email
- Business hours
- Social media links

### Replace Product Images
Drop your photos into `assets/` and update the `src` attributes in `products.html`.
Recommended image size: **800×600px** (4:3 ratio).

### Update Product Names & Prices
In `products.html`, find each `<article class="product-card">` and edit:
```html
<h3 class="product-name">Your Product Name</h3>
<span class="product-price">$000</span>
```

### Make the Contact Form Work
The form is HTML-only by default. To activate it:

**Option A — Formspree (free, no backend needed):**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and copy your endpoint URL
3. Wrap the form fields in:
   ```html
   <form action="https://formspree.io/f/YOUR_CODE" method="POST">
     ...
   </form>
   ```

**Option B — Netlify Forms:**
Add `netlify` attribute to the `<form>` tag if hosting on Netlify.

### Add a Real Google Map
In `contact.html`, find the `map-placeholder` div and replace it with:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
  width="100%" height="280"
  style="border:0;border-radius:8px;"
  allowfullscreen loading="lazy">
</iframe>
```
Get your embed URL from [Google Maps](https://maps.google.com) → Share → Embed a map.

---

## 🎨 Color Customization

All colors are CSS variables in `css/style.css`:
```css
:root {
  --color-gold:    #b48c50;   /* Primary accent */
  --color-bg:      #0f0d0a;   /* Dark background */
  --color-cream:   #f5efe4;   /* Light text/headings */
}
```
Change `--color-gold` to match your brand color.

---

## 📄 License
Free to use for personal and commercial projects. No attribution required.
