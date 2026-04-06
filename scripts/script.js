// ===== LOADING SCREEN =====
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    // Hide the loading screen after animation completes (2.4s from CSS)
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
    }, 2600);
  }
});

// ===== DEBOUNCE UTILITY =====
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

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  // Optimize nav toggle click
  if (navToggle) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close menu when a nav link is clicked
  navItems.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Close menu when clicking outside of nav
  document.addEventListener("click", function (event) {
    if (navLinks && navLinks.classList.contains("active")) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickInsideToggle = navToggle && navToggle.contains(event.target);

      if (!isClickInsideNav && !isClickInsideToggle) {
        navToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    }
  });

  // Handle window resize - close mobile menu if resized to larger screen (debounced)
  window.addEventListener(
    "resize",
    debounce(function () {
      if (window.innerWidth > 768) {
        if (navToggle) navToggle.classList.remove("active");
        if (navLinks) navLinks.classList.remove("active");
      }
    }, 200),
  );

  // ===== WHATSAPP CONTACT FORM =====
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        // Create WhatsApp message with form data
        const whatsappMessage = `Hello, my name is ${name}.\nEmail: ${email}\n\nMessage: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Your WhatsApp number (without + symbol, country code included)
        const whatsappNumber = "233534078670";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Show success message
        const alertBox = document.querySelector(".Alert");
        if (alertBox) {
          alertBox.classList.add("open");
        }

        // Reset form
        contactForm.reset();

        // Open WhatsApp in new tab after a short delay
        if (window.open) {
          setTimeout(() => {
            window.open(whatsappURL, "_blank", "noopener,noreferrer");
          }, 300);
        }

        // Hide alert after 3 seconds
        setTimeout(() => {
          if (alertBox) {
            alertBox.classList.remove("open");
          }
        }, 3000);
      }
    });
  }
});
