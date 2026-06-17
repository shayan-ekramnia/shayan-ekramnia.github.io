/* =========================================================================
   Shayan Ekramnia — site interactions
   ========================================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Year ---- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Theme toggle (persisted) ---- */
  const root = document.documentElement;
  const toggle = $("#themeToggle");
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ---- Profile photo graceful fallback to monogram ---- */
  const img = $("#profileImg");
  const fallback = $("#portraitFallback");
  if (img && fallback) {
    const showFallback = () => { img.classList.add("is-hidden"); fallback.style.display = "grid"; };
    const showImg = () => { img.classList.remove("is-hidden"); fallback.style.display = "none"; };
    // start by assuming image will load; hide fallback if it does
    img.addEventListener("load", showImg);
    img.addEventListener("error", showFallback);
    // if it already failed (cached) before listener attached
    if (img.complete && img.naturalWidth === 0) showFallback();
  }

  /* ---- Nav: scrolled state + scroll progress ---- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("is-scrolled", y > 12);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const burger = $("#navBurger");
  const links = $("#navLinks");
  if (burger && links) {
    const close = () => { burger.classList.remove("is-open"); links.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); };
    burger.addEventListener("click", () => {
      const open = burger.classList.toggle("is-open");
      links.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
    });
    $$("a", links).forEach((a) => a.addEventListener("click", close));
  }

  /* ---- Active nav link via IntersectionObserver ---- */
  const sections = $$("section[id]");
  const navAnchors = $$("#navLinks a");
  const byId = (id) => navAnchors.find((a) => a.getAttribute("href") === "#" + id);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navAnchors.forEach((a) => a.classList.remove("is-active"));
            const link = byId(e.target.id);
            if (link) link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const ro = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => ro.observe(el));
  }

  /* ---- Animated stat counters ---- */
  const fmt = (n) => n.toLocaleString("en-US");
  const counters = $$(".stat__num");
  const runCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = fmt(target) + suffix; return; }
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = fmt(Math.floor(eased * target)) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target) + suffix;
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      const co = new IntersectionObserver(
        (entries, obs) => entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); } }),
        { threshold: 0.6 }
      );
      counters.forEach((c) => co.observe(c));
    }
  }
})();
