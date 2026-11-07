/* =========================================================
   NAVBAR "LASER BEAM": rayo de progreso + indicador deslizante
   (estilos en navbar.css)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  /* --- Rayo de progreso de scroll --- */
  const beam = document.createElement("div");
  beam.className = "nav-beam";
  beam.setAttribute("aria-hidden", "true");
  beam.innerHTML = '<span class="nav-beam-fill"></span>';
  header.appendChild(beam);

  let ticking = false;
  const updateBeam = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    header.style.setProperty("--p", p.toFixed(4));
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateBeam();
        if (!hovering) moveToActive();
      });
    }
  };

  /* --- Indicador láser que se desliza entre links (escritorio) --- */
  const list = header.querySelector(".nav-list");
  const indicator = document.createElement("span");
  indicator.className = "nav-indicator";
  indicator.setAttribute("aria-hidden", "true");
  let hovering = false;

  const place = (a) => {
    if (!a || window.innerWidth < 992) {
      indicator.classList.remove("is-on");
      return;
    }
    const l = list.getBoundingClientRect();
    const r = a.getBoundingClientRect();
    indicator.style.width = r.width + "px";
    indicator.style.transform = `translateX(${r.left - l.left}px)`;
    indicator.classList.add("is-on");
  };
  const activeLink = () =>
    list && list.querySelector(":scope > li > a.active, :scope > li > a.nav-dropdown-toggle.active");
  function moveToActive() {
    place(activeLink());
  }

  if (list) {
    list.appendChild(indicator);
    const topLink = (el) => {
      const li = el.closest(".nav-list > li");
      return li ? li.querySelector(":scope > a") : null;
    };
    list.addEventListener("pointerover", (e) => {
      const a = topLink(e.target);
      if (!a) return;
      hovering = true;
      place(a);
    });
    list.addEventListener("focusin", (e) => {
      const a = topLink(e.target);
      if (a) { hovering = true; place(a); }
    });
    list.addEventListener("pointerleave", () => {
      hovering = false;
      moveToActive();
    });
    list.addEventListener("focusout", () => {
      hovering = false;
      moveToActive();
    });
    window.addEventListener("resize", () => { hovering = false; moveToActive(); });
    // el link activo cambia por el scroll-spy
    new MutationObserver((records) => {
      // ignorar los cambios del propio indicador (evita un ciclo infinito)
      if (records.every((r) => r.target === indicator)) return;
      if (!hovering) moveToActive();
    })
      .observe(list, { attributes: true, attributeFilter: ["class"], subtree: true });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateBeam, { passive: true });
  updateBeam();
  moveToActive();
});
