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
  });