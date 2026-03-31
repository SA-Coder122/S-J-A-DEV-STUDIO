// ====================== PARALLAX DEPTH TRANSITION OVERLAY ======================
class FIFATransitionController {
  constructor() {
    this.overlay = document.getElementById("fifa-overlay");
    this.overlayText = document.querySelector(".fifa-section-name");
    this.isAnimating = false;
    this.currentSection = null;
    this.init();
  }

  init() {
    // Intercept navigation links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        // Skip internal links and theme toggle
        if (link.id === "theme-toggle" || !link.getAttribute("href")) return;

        const target = link.getAttribute("href");
        const targetElement = document.querySelector(target);

        if (targetElement && targetElement.id !== this.currentSection) {
          e.preventDefault();
          this.transitionToSection(target, targetElement);
        }
      });
    });

    // Initialize current section
    this.currentSection = "home";
  }

  transitionToSection(targetId, targetElement) {
    if (this.isAnimating) return;

    this.isAnimating = true;
    const sectionName = this.getSectionName(targetId);

    // Opening animation
    this.openOverlay(sectionName, () => {
      // Scroll to section during animation
      targetElement.scrollIntoView({ behavior: "smooth" });
      this.currentSection = targetId.slice(1);

      // Close overlay after content settles
      setTimeout(() => {
        this.closeOverlay();
      }, 500);
    });
  }

  openOverlay(sectionName, callback) {
    // Ensure clean state
    this.overlay.classList.remove("reverse");
    this.overlay.classList.add("active");
    this.overlayText.textContent = sectionName;

    // Callback after opening animation completes
    setTimeout(callback, 800);
  }

  closeOverlay() {
    this.overlay.classList.add("reverse");

    setTimeout(() => {
      this.overlay.classList.remove("active", "reverse");
      this.isAnimating = false;
    }, 600);
  }

  getSectionName(sectionId) {
    const names = {
      "#home": "Home",
      "#services": "Services",
      "#projects": "Projects",
      "#pricing": "Pricing",
      "#skills": "Skills",
      "#about": "About",
      "#contact": "Contact",
    };
    return names[sectionId] || "Section";
  }
}

// Initialize FIFA Transition Controller
const fifaController = new FIFATransitionController();

// ====================Theme Toggle===================
const themeToggle = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = themeToggle.querySelector("i");
  if (theme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

// =================Initialize theme=====================
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  // Default to dark theme for glassmorphism aesthetic
  setTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// =======================Mobile Navigation=============================
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// ================Close mobile menu when clicking outside===============
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// ============Navigation with FIFA Transitions===============
// Intercept nav links for FIFA overlay effect
document.querySelectorAll(".nav-links a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href !== "#") {
      e.preventDefault();
      // FIFA controller will handle the transition
      // Close the mobile menu
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
});

// ===========================Contact Form===========================
const contactForm = document.getElementById("contact-form");
const alertBox = document.querySelector(".Alert");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple form validation
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    // ======================Simulate form submission=========================
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    setTimeout(() => {
      alertBox.classList.toggle("open");
      setTimeout(() => {
        alertBox.classList.toggle("open");
      }, 2000);
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  });
}

// ============================WhatsApp Integration============================
const whatsappButton = document.querySelector(".contact-form .btn a");

if (whatsappButton && contactForm) {
  whatsappButton.addEventListener("click", (e) => {
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert("Please fill in all fields before sending");
      return;
    }

    const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    whatsappButton.href = `https://wa.me/233534078670?text=${encodedMessage}`;
  });
}

// ======================= Scroll Animations with Intersection Observer =======================
class ScrollAnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.observerOptions,
    );
    this.init();
  }

  init() {
    // Observe all elements with scroll-animate classes
    const animatedElements = document.querySelectorAll(
      "[data-scroll], .scroll-animate, .scroll-animate-left, .scroll-animate-right, " +
        ".scroll-animate-down, .scroll-animate-scale, .scroll-animate-zoom, .scroll-animate-rotate",
    );

    animatedElements.forEach((el) => {
      // Add stagger delay based on data attribute or element index
      const delay = el.getAttribute("data-delay") || "0";
      el.style.animationDelay = `${delay}s`;
      this.observer.observe(el);
    });

    // Observe parallax elements
    const parallaxElements = document.querySelectorAll(".parallax-element");
    parallaxElements.forEach((el) => {
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Trigger animation by adding animation class
        entry.target.style.animationPlayState = "running";
      }
    });
  }
}

// ======================= Parallax Effect Manager =======================
class ParallaxManager {
  constructor() {
    this.parallaxElements = document.querySelectorAll(
      ".parallax-slow, .parallax-medium, .parallax-fast",
    );
    this.init();
  }

  init() {
    if (this.parallaxElements.length === 0) return;

    // Only enable parallax on desktop
    if (window.innerWidth > 768) {
      window.addEventListener("scroll", this.updateParallax.bind(this));
      window.addEventListener("resize", this.handleResize.bind(this));
    }
  }

  updateParallax() {
    const scrollPos = window.pageYOffset;

    this.parallaxElements.forEach((el) => {
      let speed = 0.5; // Default slow speed

      if (el.classList.contains("parallax-medium")) {
        speed = 0.3;
      } else if (el.classList.contains("parallax-fast")) {
        speed = 0.1;
      }

      // Calculate parallax offset
      const offset = scrollPos * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  handleResize() {
    // Disable parallax on small screens
    if (window.innerWidth <= 768) {
      this.parallaxElements.forEach((el) => {
        el.style.transform = "translateY(0)";
      });
    }
  }
}

// ======================= Initialize Scroll Features =======================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize scroll animations
  new ScrollAnimationManager();

  // Initialize parallax
  new ParallaxManager();

  // Add scroll animation classes to elements
  const cards = document.querySelectorAll(
    ".project-card, .service-card, .skill-card, .pricing-card",
  );
  cards.forEach((card, index) => {
    card.classList.add("scroll-animate");
    card.setAttribute("data-delay", `${index * 0.1}`);
  });

  // Add animations to headings
  const headings = document.querySelectorAll("h2, h3");
  headings.forEach((heading) => {
    heading.classList.add("scroll-animate-down");
  });

  // Add animations to paragraphs
  const paragraphs = document.querySelectorAll(
    ".section-subtitle, .description",
  );
  paragraphs.forEach((p) => {
    p.classList.add("scroll-animate");
  });
});
