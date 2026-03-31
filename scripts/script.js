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
