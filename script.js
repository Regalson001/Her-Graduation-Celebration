document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const toast = document.getElementById("toast");
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  let particles = [];
  let animationId = null;

  // NOTIFICATION TOAST
  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
  }

  // THEME SWITCHER
  const savedTheme = localStorage.getItem("gee-graduation-theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    themeToggle.textContent = "☀";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const isLight = body.classList.contains("light");
    themeToggle.textContent = isLight ? "☀" : "☾";
    localStorage.setItem("gee-graduation-theme", isLight ? "light" : "dark");
  });

  // CONFETTI CELEBRATION ENGINE
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function triggerCelebration() {
    const colors = ["#d4af37", "#f3e5ab", "#ffffff", "#8ba898", "#4a7c59"];
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        size: Math.random() * 7 + 3,
        speed: Math.random() * 4 + 2,
        drift: (Math.random() - 0.5) * 3,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    if (!animationId) animateConfetti();
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += 5;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    particles = particles.filter(p => p.y < window.innerHeight + 20);

    if (particles.length > 0) {
      animationId = requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      animationId = null;
    }
  }

  // CELEBRATION TRIGGERS
  document.getElementById("surpriseButton").addEventListener("click", () => {
    triggerCelebration();
    notify("✨ Congratulations on your remarkable achievement, Gee!");
  });

  document.getElementById("grandCelebrateBtn").addEventListener("click", () => {
    triggerCelebration();
    notify("🎉 Here is to a brilliant future ahead, Gee M. Oyugi!");
  });

  // IMAGE LIGHTBOX
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightbox = document.getElementById("closeLightbox");

  function openLightbox(imgSrc) {
    lightboxImg.src = imgSrc;
    lightbox.classList.add("open");
  }

  function closeLightboxModal() {
    lightbox.classList.remove("open");
  }

  document.querySelectorAll(".zoomable, .hero-photo img").forEach(img => {
    img.addEventListener("click", () => openLightbox(img.src));
  });

  document.getElementById("triggerPhoto1").addEventListener("click", () => {
    openLightbox("assets/gee-portrait-1.jpg");
  });
  document.getElementById("triggerPhoto2").addEventListener("click", () => {
    openLightbox("assets/gee-portrait-2.jpg");
  });

  closeLightbox.addEventListener("click", closeLightboxModal);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightboxModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightboxModal();
  });

  // SHARE FUNCTIONALITY
  document.getElementById("shareButton").addEventListener("click", async () => {
    const shareData = {
      title: "Gee M. Oyugi | Graduation Keepsake",
      text: "Celebrating Gee M. Oyugi and her incredible graduation milestone on 18 November 2026!",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        notify("🔗 Keepsake link copied to clipboard!");
      } else {
        notify("Sharing is not supported on this browser.");
      }
    } catch (err) {
      if (err.name !== "AbortError") notify("Unable to share at the moment.");
    }
  });

  // PRINT / PDF
  document.getElementById("printButton").addEventListener("click", () => {
    window.print();
  });

  // SCROLL REVEAL OBSERVER
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
