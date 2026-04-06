/**
 * Orel City Company Limited - Main JavaScript File
 * Version: 1.0.0
 *
 * PLACEHOLDER INSTRUCTIONS FOR CLIENT:
 * 1. Replace placeholder data with actual project information
 * 2. Update contact form handling for actual backend integration
 * 3. Add actual Google Maps API key and embed code
 * 4. Configure email service for form submissions
 * 5. Add analytics tracking code
 */

// DOM Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initNavigation();
  initSliders();
  initModals();
  initFilters();
  initForms();
  initFAQ();
  initStatsCounter();
  setCurrentYear();

  // Lazy loading for images
  initLazyLoading();
});

// ===== NAVIGATION =====
function initNavigation() {
  const header = document.querySelector(".main-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // Mobile Navigation Toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
      document.body.style.overflow = isExpanded ? "" : "hidden";
    });
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Sticky Header on Scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== PROJECT SLIDER =====
function initSliders() {
  const sliderContainer = document.querySelector(".slider-track");
  if (!sliderContainer) return;

  // Sample project data - CLIENT: Replace with actual projects
  const projects = [
    {
      id: 1,
      title: "Accra-Tema Motorway Rehabilitation",
      location: "Greater Accra Region",
      description: "Rehabilitation of 10km section with new drainage systems.",
      image: "assets/images/project-road.svg",
      length: "10km",
      status: "completed",
      type: "road",
      region: "greater-accra",
    },
    {
      id: 2,
      title: "Eastern Region Feeder Road",
      location: "Eastern Region",
      description:
        "Construction of new feeder road connecting rural communities.",
      image: "assets/images/project-road.svg",
      length: "15km",
      status: "ongoing",
      type: "road",
      region: "eastern",
    },
    {
      id: 3,
      title: "Urban Drainage System",
      location: "Kumasi, Ashanti Region",
      description: "Stormwater drainage system for flood-prone urban area.",
      image: "assets/images/project-drainage.svg",
      length: "5km",
      status: "completed",
      type: "drainage",
      region: "ashanti",
    },
  ];

  // Populate slider with projects
  projects.forEach((project) => {
    const slide = document.createElement("div");
    slide.className = "slider-slide";
    slide.innerHTML = `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <div class="project-tags">
                        <span class="project-tag ${project.status}">${project.status}</span>
                        <span class="project-tag">${project.type}</span>
                        <span class="project-tag">${project.region}</span>
                    </div>
                    <h3>${project.title}</h3>
                    <p><strong>Location:</strong> ${project.location}</p>
                    <p><strong>Length:</strong> ${project.length}</p>
                    <p>${project.description}</p>
                    <button class="btn btn-primary view-project" data-id="${project.id}">View Details</button>
                </div>
            </div>
        `;
    sliderContainer.appendChild(slide);
  });

  // Initialize slider functionality
  const slides = document.querySelectorAll(".slider-slide");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentSlide = 0;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      goToSlide(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dot");

  // Next slide function
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  // Previous slide function
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  }

  // Go to specific slide
  function goToSlide(index) {
    currentSlide = index;
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  // Auto-advance slides
  let slideInterval = setInterval(nextSlide, 5000);

  // Pause auto-advance on hover
  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  sliderContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // View project button handlers
  document.querySelectorAll(".view-project").forEach((button) => {
    button.addEventListener("click", function () {
      const projectId = parseInt(this.dataset.id);
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        openProjectModal(project);
      }
    });
  });
}

// ===== MODALS =====
function initModals() {
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal-close");

  // Close modal function
  function closeModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Open modal function
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  // Close modals on button click
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      closeModal(modal);
    });
  });

  // Close modal on outside click
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.classList.contains("active")) {
          closeModal(modal);
        }
      });
    }
  });

  // Quote request buttons
  document.querySelectorAll(".quote-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const service = this.dataset.service;
      const serviceInput = document.getElementById("quoteService");
      if (serviceInput) {
        serviceInput.value = service;
      }
      openModal("quoteModal");
    });
  });

  // Make functions globally available
  window.openModal = openModal;
  window.closeModal = closeModal;
}

// Open project detail modal
function openProjectModal(project) {
  const modal = document.getElementById("projectDetailModal");
  const modalBody = modal.querySelector(".modal-body");

  modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <div class="project-meta">
            <p><strong>Location:</strong> ${project.location}</p>
            <p><strong>Length:</strong> ${project.length}</p>
            <p><strong>Status:</strong> <span class="project-tag ${project.status}">${project.status}</span></p>
            <p><strong>Type:</strong> ${project.type}</p>
        </div>
        
        <div class="project-images">
            <div class="main-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="image-thumbnails">
                <img src="assets/images/placeholder.png" alt="Before construction">
                <img src="${project.image}" alt="During construction">
                <img src="assets/images/placeholder.png" alt="After construction">
            </div>
        </div>
        
        <div class="project-description">
            <h3>Project Description</h3>
            <p>${project.description}</p>
            <p>Additional details about this project would be provided here. This is a placeholder description that should be replaced with actual project information.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li>Constructed according to MRH specifications</li>
                <li>Includes proper drainage systems</li>
                <li>Built with durable materials for longevity</li>
                <li>Completed within scheduled timeline</li>
            </ul>
            
            <h3>Client Information</h3>
            <p><strong>Client:</strong> Department of Urban Roads</p>
            <p><strong>Completion Date:</strong> December 2023</p>
            <p><strong>Contract Value:</strong> Confidential</p>
        </div>
        
        <div class="project-documents">
            <a href="#" class="btn btn-secondary">
                📄 Download Project PDF
            </a>
            <p class="note"><small>Note: Replace with actual project documentation</small></p>
        </div>
    `;

  // Open the modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// ===== PROJECT FILTERS =====
function initFilters() {
  const projectsContainer = document.getElementById("projectsContainer");
  if (!projectsContainer) return;

  // Sample projects data - CLIENT: Replace with actual projects
  const allProjects = [
    {
      id: 1,
      title: "Accra-Tema Motorway Rehabilitation",
      location: "Greater Accra Region",
      description: "Rehabilitation of 10km section with new drainage systems.",
      image: "assets/images/project-road.svg",
      length: "10km",
      status: "completed",
      type: "road",
      region: "greater-accra",
      tags: ["road", "completed", "greater-accra"],
    },
    {
      id: 2,
      title: "Eastern Region Feeder Road",
      location: "Eastern Region",
      description:
        "Construction of new feeder road connecting rural communities.",
      image: "assets/images/project-road.svg",
      length: "15km",
      status: "ongoing",
      type: "road",
      region: "eastern",
      tags: ["road", "ongoing", "eastern"],
    },
    {
      id: 3,
      title: "Urban Drainage System",
      location: "Kumasi, Ashanti Region",
      description: "Stormwater drainage system for flood-prone urban area.",
      image: "assets/images/project-drainage.svg",
      length: "5km",
      status: "completed",
      type: "drainage",
      region: "ashanti",
      tags: ["drainage", "completed", "ashanti"],
    },
    {
      id: 4,
      title: "Community Road Upgrade",
      location: "Central Region",
      description: "Upgrading of community access roads with proper drainage.",
      image: "assets/images/project-road.svg",
      length: "8km",
      status: "completed",
      type: "road",
      region: "central",
      tags: ["road", "completed", "central"],
    },
    {
      id: 5,
      title: "Commercial Building Foundation",
      location: "Greater Accra Region",
      description:
        "Site preparation and foundation works for commercial complex.",
      image: "assets/images/placeholder.svg",
      length: "N/A",
      status: "ongoing",
      type: "civil",
      region: "greater-accra",
      tags: ["civil", "ongoing", "greater-accra"],
    },
    {
      id: 6,
      title: "Rural Bridge Construction",
      location: "Volta Region",
      description: "Construction of concrete bridge over river.",
      image: "assets/images/project-bridge.svg",
      length: "50m",
      status: "completed",
      type: "civil",
      region: "volta",
      tags: ["civil", "completed", "volta"],
    },
  ];

  // Populate projects grid
  function renderProjects(projects) {
    projectsContainer.innerHTML = "";

    if (projects.length === 0) {
      document.getElementById("noResults").style.display = "block";
      return;
    }

    document.getElementById("noResults").style.display = "none";

    projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";
      projectCard.setAttribute("data-tags", project.tags.join(" "));

      projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <div class="project-tags">
                        <span class="project-tag ${project.status}">${project.status}</span>
                        <span class="project-tag">${project.type}</span>
                        <span class="project-tag">${project.region}</span>
                    </div>
                    <h3>${project.title}</h3>
                    <p><strong>Location:</strong> ${project.location}</p>
                    <p><strong>Length:</strong> ${project.length}</p>
                    <p>${project.description}</p>
                    <button class="btn btn-primary view-project" data-id="${project.id}">View Details</button>
                </div>
            `;

      projectsContainer.appendChild(projectCard);
    });

    // Re-attach event listeners to view buttons
    document.querySelectorAll(".view-project").forEach((button) => {
      button.addEventListener("click", function () {
        const projectId = parseInt(this.dataset.id);
        const project = allProjects.find((p) => p.id === projectId);
        if (project) {
          openProjectModal(project);
        }
      });
    });
  }

  // Initial render
  renderProjects(allProjects);

  // Filter functionality
  const filterTags = document.querySelectorAll(".filter-tag");
  const searchInput = document.getElementById("projectSearch");
  let activeFilters = new Set(["all"]);

  // Filter tag click handler
  filterTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      const filter = this.dataset.filter;

      if (filter === "all") {
        // If "all" is clicked, clear other filters
        activeFilters.clear();
        activeFilters.add("all");
        filterTags.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
      } else {
        // Remove "all" from active filters
        activeFilters.delete("all");

        // Toggle this filter
        if (activeFilters.has(filter)) {
          activeFilters.delete(filter);
          this.classList.remove("active");

          // If no filters active, activate "all"
          if (activeFilters.size === 0) {
            activeFilters.add("all");
            document
              .querySelector('.filter-tag[data-filter="all"]')
              .classList.add("active");
          }
        } else {
          activeFilters.add(filter);
          this.classList.add("active");
        }

        // Remove "all" active class
        document
          .querySelector('.filter-tag[data-filter="all"]')
          .classList.remove("active");
      }

      applyFilters();
    });
  });

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // Apply filters function
  function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

    const filteredProjects = allProjects.filter((project) => {
      // Check against active filters
      if (!activeFilters.has("all")) {
        const hasMatchingFilter = Array.from(activeFilters).some((filter) => {
          return project.tags.includes(filter);
        });
        if (!hasMatchingFilter) return false;
      }

      // Check against search term
      if (searchTerm) {
        const matchesSearch =
          project.title.toLowerCase().includes(searchTerm) ||
          project.location.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      return true;
    });

    renderProjects(filteredProjects);
  }
}

// ===== FORM VALIDATION =====
function initForms() {
  const contactForm = document.getElementById("contactForm");
  const quoteForm = document.getElementById("quoteForm");

  // Contact form validation
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateContactForm()) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        // Simulate API call - CLIENT: Replace with actual form submission
        setTimeout(() => {
          showToast(
            "Message sent successfully! We will respond within 24 hours.",
          );
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
    });
  }

  // Quote form submission
  if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending Request...";
      submitBtn.disabled = true;

      // Simulate API call - CLIENT: Replace with actual form submission
      setTimeout(() => {
        showToast(
          "Quote request submitted successfully! We will contact you shortly.",
        );
        quoteForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal(document.getElementById("quoteModal"));
      }, 1500);
    });
  }
}

// Contact form validation function
function validateContactForm() {
  let isValid = true;

  // Reset errors
  document.querySelectorAll(".error-message").forEach((el) => {
    el.style.display = "none";
    el.textContent = "";
  });

  // Validate name
  const nameInput = document.getElementById("contactName");
  if (!nameInput.value.trim()) {
    showError("nameError", "Name is required");
    isValid = false;
  }

  // Validate email
  const emailInput = document.getElementById("contactEmail");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    showError("emailError", "Email is required");
    isValid = false;
  } else if (!emailRegex.test(emailInput.value)) {
    showError("emailError", "Please enter a valid email address");
    isValid = false;
  }

  // Validate phone
  const phoneInput = document.getElementById("contactPhone");
  if (!phoneInput.value.trim()) {
    showError("phoneError", "Phone number is required");
    isValid = false;
  } else if (phoneInput.value.replace(/\D/g, "").length < 10) {
    showError("phoneError", "Please enter a valid phone number");
    isValid = false;
  }

  // Validate message
  const messageInput = document.getElementById("contactMessage");
  if (!messageInput.value.trim()) {
    showError("messageError", "Message is required");
    isValid = false;
  }

  // Validate consent
  const consentInput = document.getElementById("contactConsent");
  if (!consentInput.checked) {
    alert("Please consent to us processing your data");
    isValid = false;
  }

  return isValid;
}

// Validate individual field
function validateField(e) {
  const field = e.target;
  const errorId = field.id + "Error";
  const errorElement = document.getElementById(errorId);

  if (!errorElement) return;

  // Reset error
  errorElement.style.display = "none";
  errorElement.textContent = "";

  // Validate based on field type
  if (field.required && !field.value.trim()) {
    showError(errorId, "This field is required");
    return;
  }

  if (field.type === "email" && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      showError(errorId, "Please enter a valid email address");
    }
  }

  if (field.id === "contactPhone" && field.value.trim()) {
    const phoneDigits = field.value.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      showError(errorId, "Please enter a valid phone number");
    }
  }
}

// Show error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

// ===== FAQ ACCORDION =====
function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const answer = this.nextElementSibling;

      // Toggle active class
      faqItem.classList.toggle("active");

      // Toggle answer visibility
      if (faqItem.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        this.setAttribute("aria-expanded", "true");
      } else {
        answer.style.maxHeight = "0";
        this.setAttribute("aria-expanded", "false");
      }

      // Close other FAQ items
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== this) {
          const otherItem = otherQuestion.parentElement;
          const otherAnswer = otherQuestion.nextElementSibling;
          otherItem.classList.remove("active");
          otherAnswer.style.maxHeight = "0";
          otherQuestion.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Initialize all answers as collapsed
    const answer = question.nextElementSibling;
    answer.style.maxHeight = "0";
    question.setAttribute("aria-expanded", "false");
  });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number");

  if (statNumbers.length === 0) return;

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Animate number counting
  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-count"));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent =
          target + element.textContent.slice(target.toString().length);
        clearInterval(timer);
        element.classList.add("animated");
      } else {
        element.textContent =
          Math.floor(current) +
          element.textContent.slice(Math.floor(current).toString().length);
      }
    }, 16);
  }

  // Handle scroll event
  let animated = false;

  function handleScroll() {
    if (!animated && isInViewport(statNumbers[0])) {
      statNumbers.forEach(animateCounter);
      animated = true;
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // Initial check and event listener
  handleScroll();
  window.addEventListener("scroll", handleScroll);
}

// ===== LAZY LOADING =====
function initLazyLoading() {
  // Use native lazy loading where supported
  const images = document.querySelectorAll('img[loading="lazy"]');

  // Fallback for browsers that don't support lazy loading
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Load polyfill or implement intersection observer
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      observer.observe(img);
    });
  }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = "success") {
  const toast = document.getElementById("successToast");
  const toastMessage = toast.querySelector(".toast-message");

  toastMessage.textContent = message;
  toast.classList.add("show");

  // Set timeout to hide toast
  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);

  // Close button
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show");
  });
}

// ===== UTILITY FUNCTIONS =====
function setCurrentYear() {
  const yearElements = document.querySelectorAll("#currentYear");
  const currentYear = new Date().getFullYear();
  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

// ===== ADDITIONAL INITIALIZATIONS =====
// Intersection Observer for animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate
  document
    .querySelectorAll(".service-card, .team-card, .project-card")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Initialize when DOM is fully loaded
window.addEventListener("load", function () {
  initAnimations();
});
