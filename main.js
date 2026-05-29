document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       1. REVEAL ON SCROLL
    ========================= */
    const revealItems = document.querySelectorAll("[data-reveal]");
  
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
  
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        }
      );
  
      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }
  
    /* =========================
       2. MOBILE MENU
    ========================= */
    const menuToggle = document.getElementById("menu-toggle");
    const siteNav = document.getElementById("site-nav");
    const navLinks = siteNav ? siteNav.querySelectorAll("a") : [];
  
    if (menuToggle && siteNav) {
      menuToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
      });
  
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          siteNav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("menu-open");
        });
      });
  
      document.addEventListener("click", (event) => {
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
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });
  
    /* =========================
       4. HEADER ON SCROLL
    ========================= */
    const header = document.querySelector(".site-header");
  
    const updateHeaderOnScroll = () => {
      if (!header) return;
  
      if (window.scrollY > 16) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
  
    updateHeaderOnScroll();
    window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

    /* =========================
       4.5. DYNAMIC HEADER THEME
    ========================= */
    const sections = document.querySelectorAll("section, footer");
    
    if ("IntersectionObserver" in window && header) {
      const themeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const isDark = entry.target.classList.contains("section-dark") || 
                             entry.target.classList.contains("hero") || 
                             entry.target.tagName.toLowerCase() === "footer";
                             
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
    
    if ("IntersectionObserver" in window && navLinksArray.length > 0) {
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

      galleryFilters.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      galleryCards.forEach((card) => {
        const categories = card.dataset.category || "";
        const matches = filter === "all" || categories.includes(filter);

        card.classList.toggle("is-hidden", !matches);
      });

      gallerySlider.scrollTo({ left: 0, behavior: "smooth" });
    });
  });
}