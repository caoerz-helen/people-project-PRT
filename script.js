AOS.init({
  duration: 850,
  once: true,
  offset: 64,
  easing: "ease-out-cubic"
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
    });
  });
}

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 30);
});

window.addEventListener("load", () => {
  if (prefersReducedMotion) return;
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
  tl.from(".hero-copy .eyebrow", { y: 16, opacity: 0 })
    .from(".hero-copy h1", { y: 18, opacity: 0 }, "-=0.52")
    .from(".hero-subtitle", { y: 12, opacity: 0 }, "-=0.54")
    .from(".hero-sub", { y: 12, opacity: 0 }, "-=0.6")
    .from(".hero-cta .btn", { y: 10, opacity: 0, stagger: 0.1 }, "-=0.58")
    .from(".mini-stats article", { y: 10, opacity: 0, stagger: 0.08 }, "-=0.5")
    .from(".hero-visual", { x: 14, opacity: 0 }, "-=0.84");
});

const lights = document.querySelectorAll(".bg-light");
const routeGrid = document.querySelector(".route-grid");

window.addEventListener("mousemove", (event) => {
  if (prefersReducedMotion) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 14;
  const y = (event.clientY / window.innerHeight - 0.5) * 14;

  lights.forEach((light, index) => {
    const factor = index === 0 ? 1 : -0.7;
    light.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });

  if (routeGrid) {
    routeGrid.style.transform = `translate(${x * 0.11}px, ${y * 0.11}px)`;
  }
});

window.addEventListener("scroll", () => {
  if (prefersReducedMotion) return;
  if (!routeGrid) return;
  const offset = window.scrollY * 0.045;
  routeGrid.style.backgroundPosition = `0 ${offset}px, 0 ${offset}px, 0 0`;
});

// Poster lightbox
const lightboxOverlay = document.getElementById("poster-lightbox");
const lightboxClose = document.querySelector(".lightbox-close");

if (lightboxOverlay) {
  document.querySelectorAll(".poster-lightbox-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => lightboxOverlay.classList.add("is-open"));
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => lightboxOverlay.classList.remove("is-open"));
  }

  lightboxOverlay.addEventListener("click", (e) => {
    if (e.target === lightboxOverlay) lightboxOverlay.classList.remove("is-open");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") lightboxOverlay.classList.remove("is-open");
  });
}
