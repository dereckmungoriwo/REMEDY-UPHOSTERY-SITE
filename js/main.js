/* ============================================
   main.js — Shared scripts for all pages
   Stitch & Soul Upholstery
   ============================================ */

/* ══════════════════════════════════════════
   ✏️ EDIT: Your WhatsApp number here
   Include country code, no spaces or dashes
   Example: South Africa +27 → "27821234567"
            USA +1         → "15551234567"
   ══════════════════════════════════════════ */
const WHATSAPP_NUMBER = "27821234567";

/* ✏️ EDIT: Pre-filled message customers will see when they open WhatsApp */
const WHATSAPP_MESSAGE = "Hi! I found you on your website and I'd like to enquire about your upholstery services.";


/* ─────────────────────────────────────────
   WhatsApp Floating Button
   ───────────────────────────────────────── */
function initWhatsApp() {
  const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

  // Build the button HTML
  const btn = document.createElement("a");
  btn.href        = waURL;
  btn.target      = "_blank";
  btn.rel         = "noopener noreferrer";
  btn.id          = "wa-float";
  btn.className   = "wa-float";
  btn.setAttribute("aria-label", "Chat with us on WhatsApp");
  btn.setAttribute("title", "Chat on WhatsApp");

  btn.innerHTML = `
    <div class="wa-bubble" aria-hidden="true">
      <svg class="wa-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.72.69 5.27 1.9 7.5L.5 31.5l8.23-1.87A15.45 15.45 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.1a12.55 12.55 0 01-6.4-1.75l-.46-.27-4.76 1.08 1.1-4.64-.3-.48A12.6 12.6 0 1116 28.6zm6.9-9.43c-.38-.19-2.23-1.1-2.57-1.22-.35-.13-.6-.19-.85.19-.25.38-.97 1.22-1.18 1.47-.22.25-.44.28-.81.09-.38-.19-1.59-.59-3.03-1.87-1.12-1-1.87-2.24-2.09-2.62-.22-.38-.02-.58.16-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.09-.19-.85-2.04-1.16-2.79-.3-.73-.61-.63-.85-.64h-.72c-.25 0-.66.09-1 .47-.35.38-1.32 1.29-1.32 3.14s1.35 3.65 1.54 3.9c.19.25 2.66 4.06 6.44 5.7.9.39 1.6.62 2.15.79.9.28 1.73.24 2.38.15.73-.11 2.23-.91 2.54-1.79.32-.88.32-1.63.22-1.79-.09-.16-.34-.25-.72-.44z"/>
      </svg>
      <span class="wa-pulse" aria-hidden="true"></span>
    </div>
    <span class="wa-tooltip">Chat with us!</span>
  `;

  document.body.appendChild(btn);

  // Show button after a short delay (feels less intrusive)
  setTimeout(() => btn.classList.add("wa-visible"), 1200);

  // Hide tooltip after 4 seconds
  setTimeout(() => btn.classList.add("wa-tooltip-hidden"), 5000);
}


/* ─────────────────────────────────────────
   Navigation — scroll shadow & active link
   ───────────────────────────────────────── */
function initNav() {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;

  // Add shadow when scrolled
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // Mark current page link as active
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === currentPage);
    if (href === currentPage) link.setAttribute("aria-current", "page");
    else                      link.removeAttribute("aria-current");
  });
}


/* ─────────────────────────────────────────
   Scroll-reveal for cards
   ───────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".product-card, .service-card, .stat-card, .info-item"
  );
  if (!targets.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => {
    el.classList.add("scroll-hidden");
    observer.observe(el);
  });
}


/* ─────────────────────────────────────────
   Products page — filter buttons
   ───────────────────────────────────────── */
function initFilterButtons() {
  const btns  = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".product-card");
  const noResults = document.getElementById("no-results");
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active button
      btns.forEach(b => {
        b.classList.remove("active");
        b.removeAttribute("aria-pressed");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      const filter = btn.getAttribute("data-filter");
      let visibleCount = 0;

      cards.forEach(card => {
        const category = card.getAttribute("data-category");
        const show = filter === "all" || category === filter;
        card.classList.toggle("card-hidden", !show);
        if (show) visibleCount++;
      });

      // Show "no results" if nothing matches
      if (noResults) {
        noResults.classList.toggle("visible", visibleCount === 0);
      }
    });
  });
}


/* ─────────────────────────────────────────
   Products page — detail modal / lightbox
   ───────────────────────────────────────── */
function initProductModal() {
  const modal     = document.getElementById("product-modal");
  const closeBtn  = document.getElementById("modal-close");
  if (!modal) return;

  // Open modal when clicking the overlay OR the card image area
  document.querySelectorAll(".product-card").forEach(card => {
    const trigger = card.querySelector(".product-img-wrap");
    if (!trigger) return;

    trigger.style.cursor = "pointer";

    trigger.addEventListener("click", () => {
      // Pull data from this card
      const img      = card.querySelector(".product-img-wrap img");
      const badge    = card.querySelector(".product-badge");
      const category = card.querySelector(".product-category")?.textContent || "";
      const name     = card.querySelector(".product-name")?.textContent || "";
      const price    = card.querySelector(".product-price")?.textContent || "";
      const origPrice= card.querySelector(".product-price-original")?.textContent || "";

      // Populate modal fields
      document.getElementById("modal-img").src = img?.src || "";
      document.getElementById("modal-img").alt = img?.alt || name;
      document.getElementById("modal-category").textContent = category;
      document.getElementById("modal-name").textContent = name;
      document.getElementById("modal-price").textContent = price;

      const origEl = document.getElementById("modal-price-original");
      if (origPrice) {
        origEl.textContent = origPrice;
        origEl.style.display = "inline";
      } else {
        origEl.style.display = "none";
      }

      const badgeEl = document.getElementById("modal-badge");
      if (badge) {
        badgeEl.textContent = badge.textContent;
        badgeEl.className   = "product-badge " + (badge.classList.contains("badge-sale") ? "badge-sale" : "badge-new");
        badgeEl.style.display = "inline";
      } else {
        badgeEl.style.display = "none";
      }

      // Open
      modal.removeAttribute("hidden");
      modal.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    });
  });

  // Close handlers
  function closeModal() {
    modal.classList.remove("modal-open");
    document.body.style.overflow = "";
    setTimeout(() => modal.setAttribute("hidden", ""), 300);
  }

  closeBtn?.addEventListener("click", closeModal);

  // Click outside the box
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  // Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.hasAttribute("hidden")) closeModal();
  });
}


/* ─────────────────────────────────────────
   Contact page — form + today's hours
   ───────────────────────────────────────── */
function initContactPage() {
  // Highlight today in hours table
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = days[new Date().getDay()];
  document.querySelectorAll(".hours-table tr").forEach(row => {
    if (row.cells[0]?.textContent.trim() === today) row.classList.add("today");
  });

  // Form submission
  const submitBtn = document.getElementById("submit-btn");
  if (!submitBtn) return;

  submitBtn.addEventListener("click", () => {
    const firstName = document.getElementById("first-name")?.value.trim();
    const email     = document.getElementById("email")?.value.trim();
    const message   = document.getElementById("message")?.value.trim();
    const consent   = document.getElementById("consent")?.checked;

    if (!firstName || !email || !message) {
      alert("Please fill in all required fields (First Name, Email, Message).");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      alert("Please agree to be contacted before submitting.");
      return;
    }

    // ✏️ To actually send the form, replace this block with a fetch() to
    // Formspree or your backend. Example:
    //
    // fetch("https://formspree.io/f/YOUR_CODE", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ firstName, email, message })
    // });

    document.getElementById("contact-form").style.display = "none";
    document.getElementById("form-success").classList.add("visible");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ─────────────────────────────────────────
   Init everything on DOM ready
   ───────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initWhatsApp();
  initNav();
  initScrollReveal();
  initFilterButtons();
  initProductModal();
  initContactPage();
});
