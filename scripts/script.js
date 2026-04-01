// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  // Toggle navigation menu on hamburger click
  if (navToggle) {
    navToggle.addEventListener("click", function () {
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
    if (navLinks.classList.contains("active")) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickInsideToggle = navToggle.contains(event.target);

      if (!isClickInsideNav && !isClickInsideToggle) {
        navToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    }
  });

  // Handle window resize - close mobile menu if resized to larger screen
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });

  // ===== SCROLL TO REVEAL ANIMATION =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards for scroll reveal (not sections, as they have their own animations)
  const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .pricing-card, .testimonial-card, .benefit-item",
  );
  revealElements.forEach((element) => {
    observer.observe(element);
  });

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

        // Open WhatsApp in new tab
        window.open(whatsappURL, "_blank");

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
