# Remedy  — Upholstery Website

A clean, multi-page static website template for upholstery businesses.
Dark luxury aesthetic with gold accents. Ready for GitHub Pages hosting.

---

## 📁 File Structure

```
upholstery-site/
├── index.html          ← Home page
├── products.html       ← Products grid (15 items, 3×5 layout)
├── contact.html        ← Contact form 
├── css/
│   ├── style.css       ← Shared variables, nav, footer, buttons
│   ├── home.css        ← Home page styles only
│   ├── products.css    ← Products grid & card styles
│   └── contact.css     
└── assets/
    ├── logo-placeholder.png  
    ├── product-01.png        
    ├── product-02.png
    └── ... (up to product-15.png)
```
```


**Option B — Netlify Forms:**
Add `netlify` attribute to the `<form>` tag if hosting on Netlify.


## 🎨 Color Customization

All colors are CSS variables in `css/style.css`:
```css
:root {
  --color-gold:    #b48c50;   /* Primary accent */
  --color-bg:      #0f0d0a;   /* Dark background */
  --color-cream:   #f5efe4;   /* Light text/headings */
}


---

## 📄 License
Free to use for personal and commercial projects. No attribution required.
