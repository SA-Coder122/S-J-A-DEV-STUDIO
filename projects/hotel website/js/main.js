/* ============================================
   GREAT PEACE & LOVE HOTEL - MAIN JAVASCRIPT
   ============================================ */

// WhatsApp Configuration
const WHATSAPP_NUMBER = "233552180078";
const WHATSAPP_API_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// ============ MOBILE NAVIGATION ============
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
});

// ============ WHATSAPP BOOKING FUNCTION ============
function openWhatsAppBooking(roomType = null, messagePrefix = "") {
  let message = "";

  if (roomType) {
    // Pre-filled professional messages for each room type
    const messages = {
      "Executive Room": `Hello! 👋\n\nI'm interested in booking an *Executive Room* at Great Peace & Love Hotel.\n\nI would like to know:\n• Available dates\n• Pricing\n• Special amenities\n\nPlease confirm availability. Thank you! 🙏`,

      "First Class Room": `Hello! 👋\n\nI'm interested in booking a *First Class Room* at Great Peace & Love Hotel.\n\nI would like to inquire about:\n• Available dates\n• Room pricing\n• Amenities included\n\nLooking forward to your response! 🙏`,

      "Second Class Room": `Hello! 👋\n\nI'm interested in booking a *Second Class Room* at Great Peace & Love Hotel.\n\nCould you please provide:\n• Available dates\n• Room rates\n• Check-in details\n\nThank you! 🙏`,
    };

    message =
      messages[roomType] ||
      `Hello! 👋\n\nI'm interested in booking a ${roomType} at Great Peace & Love Hotel.\n\nPlease confirm availability and provide pricing information.\n\nThank you! 🙏`;
  } else if (messagePrefix) {
    message = messagePrefix;
  } else {
    // Default general inquiry message
    message = `Hello! 👋\n\nI'm interested in booking a room at Great Peace & Love Hotel in Ashalaja, Ghana.\n\nCould you please provide:\n• Available room types\n• Pricing\n• Check-in availability\n\nThank you! 🙏`;
  }

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `${WHATSAPP_API_URL}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

// ============ ATTACH WHATSAPP BUTTONS ============
document.addEventListener("DOMContentLoaded", function () {
  // Book Now buttons
  const bookButtons = document.querySelectorAll('[id^="bookNow"]');
  bookButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openWhatsAppBooking();
    });
  });

  // Room-specific book buttons
  const roomBookButtons = document.querySelectorAll(".room-book");
  roomBookButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const roomType = this.getAttribute("data-room");
      openWhatsAppBooking(roomType);
    });
  });

  // CTA buttons
  const ctaButtons = document.querySelectorAll(
    '[id*="CTA"], [id*="About"], [id*="Amenities"], [id*="Gallery"]',
  );
  ctaButtons.forEach((btn) => {
    if (
      btn.textContent.toLowerCase().includes("book") ||
      btn.textContent.toLowerCase().includes("whatsapp")
    ) {
      btn.addEventListener("click", function (e) {
        if (!this.href) {
          e.preventDefault();
          openWhatsAppBooking();
        }
      });
    }
  });
});

// ============ COUNTER ANIMATION ============
class CounterAnimation {
  constructor() {
    this.counters = [];
    this.hasRun = false;
    this.init();
  }

  init() {
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((counter) => {
      this.counters.push({
        element: counter,
        target: parseFloat(counter.getAttribute("data-target")),
        current: 0,
        speed: 2000, // milliseconds to count up
      });
    });

    if (this.counters.length > 0) {
      this.observeCounters();
    }
  }

  observeCounters() {
    const options = {
      threshold: 0.5,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasRun) {
          this.hasRun = true;
          this.startCounting();
        }
      });
    }, options);

    // Observe first counter
    if (this.counters[0]) {
      observer.observe(this.counters[0].element.closest(".stat-item"));
    }
  }

  startCounting() {
    this.counters.forEach((counter) => {
      this.animateCounter(counter);
    });
  }

  animateCounter(counter) {
    const increment = counter.target / (counter.speed / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= counter.target) {
        current = counter.target;
        clearInterval(timer);
      }

      // Format number (handle decimals)
      if (counter.target % 1 !== 0) {
        counter.element.textContent = current.toFixed(1);
      } else {
        counter.element.textContent = Math.floor(current);
      }
    }, 16);
  }
}

// ============ SCROLL REVEAL ANIMATION ============
class ScrollReveal {
  constructor() {
    this.init();
  }

  init() {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });
  }
}

// ============ GALLERY LIGHTBOX ============
class GalleryLightbox {
  constructor() {
    this.modal = document.getElementById("lightboxModal");
    this.closeBtn = document.getElementById("lightboxClose");
    this.init();
  }

  init() {
    if (!this.modal) return;

    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => this.openLightbox(item));
    });

    this.closeBtn.addEventListener("click", () => this.closeLightbox());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeLightbox();
      }
    });
  }

  openLightbox(item) {
    const title = item.getAttribute("data-title");
    const desc = item.getAttribute("data-desc");
    const image = item.querySelector(".gallery-image");

    // Set background color same as gallery item
    const bgColor = window.getComputedStyle(image).backgroundColor;
    document.getElementById("lightboxImage").style.background = bgColor;

    document.getElementById("lightboxTitle").textContent = title;
    document.getElementById("lightboxDesc").textContent = desc;

    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// ============ CONTACT FORM HANDLER ============
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!this.validateForm(data)) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create WhatsApp message from form data
    const message = this.createMessage(data);
    this.sendToWhatsApp(message);

    // Reset form
    this.form.reset();
    alert("Message sent! We will contact you shortly.");
  }

  validateForm(data) {
    return data.name && data.email && data.subject && data.message;
  }

  createMessage(data) {
    // Professional pre-filled message with form data
    const subjectMessages = {
      booking: "🛏️ Room Booking Inquiry",
      inquiry: "❓ General Inquiry",
      events: "📊 Events & Conferences",
      tours: "🌍 Tours & Activities",
      feedback: "⭐ Guest Feedback",
      other: "💬 Message",
    };

    const subjectTitle = subjectMessages[data.subject] || data.subject;

    return `
*✨ NEW INQUIRY FROM WEBSITE ✨*

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone || "Not provided"}

*Subject:* ${subjectTitle}

*Message:*
${data.message}

---
*Please reply to confirm receipt*
Thank you! 🙏
`;
  }

  sendToWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${WHATSAPP_API_URL}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }
}

// ============ SMOOTH SCROLL ============
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }
}

// ============ ACTIVE NAVIGATION ============
class ActiveNavigation {
  constructor() {
    this.init();
  }

  init() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href === currentPage ||
        (currentPage === "" && href === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
}

// ============ LAZY LOADING ============
class LazyLoad {
  constructor() {
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }
}

// ============ PAGE LOAD ANIMATIONS ============
class PageLoadAnimation {
  constructor() {
    this.init();
  }

  init() {
    // Add fade-in animation to page load
    document.body.style.opacity = "0";
    window.addEventListener("load", () => {
      document.body.style.transition = "opacity 0.5s ease-in";
      document.body.style.opacity = "1";
    });
  }
}

// ============ PERFORMANCE OPTIMIZATION ============
class PerformanceOptimization {
  constructor() {
    this.init();
  }

  init() {
    // Defer non-critical scripts
    this.deferScripts();

    // Optimize images
    this.optimizeImages();

    // Preload critical resources
    this.preloadResources();
  }

  deferScripts() {
    // Already handled by defer attribute in script tags
  }

  optimizeImages() {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.getAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }
    });
  }

  preloadResources() {
    // Preload main CSS
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = "css/main.css";
    document.head.appendChild(link);
  }
}

// ============ ACCESSIBILITY IMPROVEMENTS ============
class AccessibilityEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.improveKeyboardNavigation();
    this.addFocusOutlines();
    this.improveContrast();
  }

  improveKeyboardNavigation() {
    const buttons = document.querySelectorAll("button, a");
    buttons.forEach((btn) => {
      btn.addEventListener("focus", () => {
        btn.style.outline = "3px solid #f39c12";
        btn.style.outlineOffset = "2px";
      });
      btn.addEventListener("blur", () => {
        btn.style.outline = "none";
      });
    });
  }

  addFocusOutlines() {
    const style = document.createElement("style");
    style.textContent = `
            *:focus-visible {
                outline: 3px solid #f39c12 !important;
                outline-offset: 2px !important;
            }
        `;
    document.head.appendChild(style);
  }

  improveContrast() {
    // This is already handled in CSS with sufficient color contrast
  }
}

// ============ INITIALIZE ALL FEATURES ============
document.addEventListener("DOMContentLoaded", function () {
  // Initialize counter animation
  new CounterAnimation();

  // Initialize scroll reveal
  new ScrollReveal();

  // Initialize gallery lightbox
  new GalleryLightbox();

  // Initialize contact form
  new ContactFormHandler();

  // Initialize smooth scroll
  new SmoothScroll();

  // Initialize active navigation
  new ActiveNavigation();

  // Initialize lazy loading
  new LazyLoad();

  // Initialize performance optimization
  new PerformanceOptimization();

  // Initialize accessibility
  new AccessibilityEnhancements();

  // Log initialization
  console.log("Great Peace & Love Hotel Website - Initialized Successfully");
});

// ============ SERVICE WORKER (PWA Support) ============
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment to enable offline functionality
    // navigator.serviceWorker.register('sw.js');
  });
}

// ============ ANALYTICS & TRACKING ============
class Analytics {
  constructor() {
    this.init();
  }

  init() {
    // Track page view
    this.trackPageView();

    // Track button clicks
    this.trackButtonClicks();

    // Track form submissions
    this.trackFormSubmissions();
  }

  trackPageView() {
    const pageInfo = {
      page: window.location.pathname,
      title: document.title,
      timestamp: new Date().toISOString(),
    };
    console.log("Page View:", pageInfo);
  }

  trackButtonClicks() {
    document.querySelectorAll("button, a").forEach((element) => {
      element.addEventListener("click", (e) => {
        const clickInfo = {
          element: element.tagName,
          text: element.textContent.substring(0, 50),
          timestamp: new Date().toISOString(),
        };
        console.log("Button Click:", clickInfo);
      });
    });
  }

  trackFormSubmissions() {
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        const formInfo = {
          formId: form.id,
          timestamp: new Date().toISOString(),
        };
        console.log("Form Submission:", formInfo);
      });
    });
  }
}

// Initialize analytics
new Analytics();

// ============ UTILITY FUNCTIONS ============

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element
 */
function smoothScrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Format phone number
 */
function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}

/**
 * Validate email
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Get current hour
 */
function getCurrentHour() {
  return new Date().getHours();
}

/**
 * Get greeting based on time
 */
function getGreeting() {
  const hour = getCurrentHour();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

// ============ ERROR HANDLING ============
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
});

window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled Promise Rejection:", e.reason);
});

// ============ LOG WEBSITE STATUS ============
console.log(
  "%c Great Peace & Love Hotel Website",
  "font-size: 20px; color: #2c5f4f; font-weight: bold;",
);
console.log("%c Version 1.0 | 2026", "font-size: 14px; color: #48a868;");
console.log("✓ HTML5 Semantic Markup");
console.log("✓ CSS3 Responsive Design");
console.log("✓ Vanilla JavaScript");
console.log("✓ WhatsApp Integration");
console.log("✓ Smooth Animations");
console.log("✓ SEO Optimized");
console.log("✓ Mobile First");
console.log("📞 WhatsApp: +233 55 218 0078");
