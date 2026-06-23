document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth < 992;
    /* =========================
       1. REVEAL ON SCROLL
    ========================= */
    const revealItems = document.querySelectorAll("[data-reveal]");
  
    const initRevealObserver = () => {
      if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
      }
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealItems.forEach((item) => revealObserver.observe(item));
    };

    if (isMobile) {
      document.addEventListener("scroll", function lazyReveal() {
        initRevealObserver();
        document.removeEventListener("scroll", lazyReveal);
      }, { passive: true, once: true });
    } else {
      initRevealObserver();
    }
  
    /* =========================
       2. MOBILE MENU
    ========================= */
    const menuToggle = document.getElementById("menu-toggle");
    const siteNav = document.getElementById("site-nav");
    const navLinks = siteNav ? siteNav.querySelectorAll("a") : [];
  
    if (menuToggle && siteNav) {
      menuToggle.addEventListener("click", () => {
        if (!isMobile) return;
        const isOpen = siteNav.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
      });
  
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          if (!isMobile) return;
          siteNav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("menu-open");
        });
      });
  
      document.addEventListener("click", (event) => {
        if (!isMobile) return;
        const clickedInsideNav = siteNav.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);
  
        if (!clickedInsideNav && !clickedToggle && siteNav.classList.contains("is-open")) {
          siteNav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("menu-open");
        }
      });
  
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
          siteNav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("menu-open");
        }
      });
    }
  
    /* =========================
       3. FAQ ACCORDION
    ========================= */
    const faqItems = document.querySelectorAll(".faq-item");
  
    faqItems.forEach((item) => {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
  
      if (!button || !answer) return;
  
      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        const targetHeight = !isOpen ? answer.scrollHeight : 0;
  
        faqItems.forEach((faq) => {
          const faqButton = faq.querySelector(".faq-question");
          const faqAnswer = faq.querySelector(".faq-answer");
  
          faq.classList.remove("is-open");
          if (faqButton) faqButton.setAttribute("aria-expanded", "false");
          if (faqAnswer) faqAnswer.style.maxHeight = null;
        });
  
        if (!isOpen) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = `${targetHeight}px`;
        }
      });
    });
  
    /* =========================
       4. HEADER ON SCROLL (OBSERVER)
    ========================= */
    const header = document.querySelector(".site-header");
    if (isMobile && header && "IntersectionObserver" in window) {
      const sentinel = document.createElement("div");
      sentinel.id = "header-sentinel";
      sentinel.style.cssText = "position:absolute; top:16px; width:1px; height:1px; visibility:hidden;";
      document.body.prepend(sentinel);

      const headerObserver = new IntersectionObserver(([entry]) => {
        window.requestAnimationFrame(() => {
          header.classList.toggle("is-scrolled", !entry.isIntersecting);
        });
      }, { rootMargin: "0px", threshold: 0 });
      headerObserver.observe(sentinel);
    }

    /* =========================
       4.5. DYNAMIC HEADER THEME
    ========================= */
    const sections = document.querySelectorAll("section, footer");
    
    if (isMobile && "IntersectionObserver" in window && header) {
      const themeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const isDark = entry.target.classList.contains("section-dark") || 
                             entry.target.classList.contains("hero") || 
                             entry.target.tagName.toLowerCase() === "footer";
                             
              // User wants HIGH CONTRAST:
              // Dark section -> White header (theme-light)
              // Light section -> Black header (!theme-light)
              if (isDark) {
                header.classList.add("theme-light");
              } else {
                header.classList.remove("theme-light");
              }
            }
          });
        },
        {
          // Intersect exactly at the height of the header
          rootMargin: "-84px 0px -80% 0px",
          threshold: 0
        }
      );

      sections.forEach((section) => themeObserver.observe(section));
    }

    /* =========================
       4.6. SCROLL SPY (ACTIVE NAV)
    ========================= */
    const navLinksArray = document.querySelectorAll(".nav-list a[href^='#']");
    
    if (isMobile && "IntersectionObserver" in window && navLinksArray.length > 0) {
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Remove active from all
              navLinksArray.forEach((link) => link.classList.remove("active"));
              
              // Add active to current
              const activeLinks = document.querySelectorAll(`.nav-list a[href="#${entry.target.id}"]`);
              activeLinks.forEach(activeLink => {
                activeLink.classList.add("active");
                // If it's inside a dropdown, highlight the parent toggle too
                const dropdown = activeLink.closest('.nav-dropdown');
                if (dropdown) {
                    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
                    if (toggle) toggle.classList.add("active");
                }
              });
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px" // Trigger when section is in the middle-top of screen
        }
      );

      // Observe only sections that have IDs matching our links
      navLinksArray.forEach((link) => {
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          spyObserver.observe(targetSection);
        }
      });
    }
  });

  /* =========================
   5. PRODUCT GALLERY FILTERS + SLIDER
========================= */
const gallerySlider = document.getElementById("gallery-slider");
const galleryPrev = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");
const galleryFilters = document.querySelectorAll(".gallery-filter");
const galleryCards = document.querySelectorAll(".gallery-product-card");

if (gallerySlider && galleryPrev && galleryNext && galleryFilters.length) {
  const getScrollAmount = () => {
    const firstCard = gallerySlider.querySelector(".gallery-product-card:not(.is-hidden)");
    if (!firstCard) return 300;
    const styles = window.getComputedStyle(gallerySlider);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return firstCard.offsetWidth + gap;
  };

  galleryNext.addEventListener("click", () => {
    gallerySlider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  galleryPrev.addEventListener("click", () => {
    gallerySlider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  galleryFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      galleryFilters.forEach((btn) => {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");

      galleryCards.forEach((card) => {
        const categories = card.dataset.category || "";
        const matches = filter === "all" || categories.includes(filter);

        card.classList.toggle("is-hidden", !matches);
      });

      gallerySlider.scrollTo({ left: 0, behavior: "smooth" });
    });
  });
}

/* =========================
   6. LAZY LOAD GTM
========================= */
const loadGTM = () => {
  if (window.gtmLoaded) return;
  window.gtmLoaded = true;
  
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-ET4MM9DNK0";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ET4MM9DNK0');

  document.removeEventListener("scroll", loadGTM);
  document.removeEventListener("click", loadGTM);
  document.removeEventListener("mousemove", loadGTM);
  document.removeEventListener("touchstart", loadGTM);
};

document.addEventListener("scroll", loadGTM, { passive: true, once: true });
document.addEventListener("click", loadGTM, { passive: true, once: true });
document.addEventListener("mousemove", loadGTM, { passive: true, once: true });
document.addEventListener("touchstart", loadGTM, { passive: true, once: true });