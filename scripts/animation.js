// ==========================================
// SCROLL ANIMATIONS WITH GSAP & SCROLL TRIGGER
// ==========================================

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. PARALLAX LAYERS - Floating Elements
// ==========================================
function initParallaxLayers() {
  // Hero section glows parallax
  gsap.to(".hero-glow--left", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
    y: 100,
    ease: "none",
  });

  gsap.to(".hero-glow--right", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
    y: -80,
    ease: "none",
  });

  // Service cards parallax depth
  gsap.utils.toArray(".service-card").forEach((card, index) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
      y: index % 2 === 0 ? 50 : -50,
      rotationZ: index % 2 === 0 ? 2 : -2,
      ease: "sine.inOut",
    });
  });
}

// ==========================================
// 2. REVEAL & HIDE SCROLL ANIMATIONS
// ==========================================
function initRevealAnimations() {
  // Fade in on scroll
  gsap.utils.toArray(".scroll-animate").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 50%",
        scrub: false,
        markers: false,
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });
  });


  // Project cards reveal - Enhanced with better triggers
  gsap.utils.toArray(".project-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 45%",
        scrub: 0.6,
        markers: false,
      },
      opacity: 0,
      scale: 0.8,
      y: 60,
      rotationZ: -5 + index * 2.5,
      duration: 0.9,
      ease: "back.out(1.7)",
    });
  });

  // Pricing cards reveal - Enhanced scroll trigger
  gsap.utils.toArray(".pricing-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "top 40%",
        scrub: 0.7,
      },
      opacity: 0,
      y: 80,
      rotationX: 90,
      transformOrigin: "center bottom",
      duration: 0.8,
      ease: "power4.out",
      delay: index * 0.12,
    });
  });

  // Testimonial cards reveal - Enhanced scroll trigger
  gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 45%",
        scrub: 0.6,
      },
      opacity: 0,
      x: index % 2 === 0 ? -80 : 80,
      rotationY: index % 2 === 0 ? -15 : 15,
      duration: 0.85,
      ease: "power3.out",
    });
  });
}

// ==========================================
// 3. KINETIC & MORPHING TYPOGRAPHY
// ==========================================
function initMorphingTypography() {
  // Hero title morphing effect
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    gsap.from(heroTitle, {
      scrollTrigger: {
        trigger: ".hero",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      opacity: 0.3,
      letterSpacing: "-0.05em",
      ease: "power2.inOut",
    });

    // Letter-by-letter scale animation on load
    gsap.to(".gradient-text", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top 50%",
        end: "center 50%",
        scrub: 0.5,
      },
      scale: 1.2,
      color: "#22d3ee",
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    });
  }

  // Section headings morphing
  gsap.utils.toArray("section h2").forEach((heading) => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "top 50%",
        scrub: 0.5,
      },
      opacity: 0.2,
      scale: 0.8,
      letterSpacing: "0.3em",
      duration: 1,
      ease: "power3.out",
    });
  });
}

// ==========================================
// 4. STICKY SCROLL CONTENT STACKING
// ==========================================
function initStickyScrollStacking() {
  // Project cards stacking effect with scroll trigger
  const projectCards = gsap.utils.toArray(".project-card");

  if (projectCards.length > 1) {
    // Create a timeline for card stacking
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects .projects-grid",
        start: "top center",
        end: "bottom 30%",
        scrub: 1.2,
        markers: false,
      },
    });

    projectCards.forEach((card, index) => {
      tl.to(
        card,
        {
          y: index * 30,
          opacity: 1 - index * 0.15,
          scale: 1 - index * 0.03,
          zIndex: projectCards.length - index,
          rotationZ: index * 0.5 - 1,
          duration: 0.8,
        },
        0,
      );
    });
  }

  // Pricing cards 3D perspective scroll effect
  const pricingCards = gsap.utils.toArray(".pricing-card");
  if (pricingCards.length > 0) {
    gsap.to(pricingCards, {
      scrollTrigger: {
        trigger: "#pricing",
        start: "top 60%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          pricingCards.forEach((card, index) => {
            gsap.set(card, {
              rotationY: Math.sin(progress * Math.PI) * 8,
              rotationX: Math.cos(progress * Math.PI) * 3,
              z: Math.sin(progress * Math.PI) * 50,
            });
          });
        },
      },
    });
  }
}

// ==========================================
// 5. CARD STACKING ANIMATION
// ==========================================
function initCardStacking() {
  // Enhanced project cards with 3D tilt and scroll effects
  const projectCards = gsap.utils.toArray(".project-card");

  projectCards.forEach((card, index) => {
    gsap.set(card, { transformStyle: "preserve-3d" });

    // Mouse-based 3D tilt effect on cards
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(card, {
        rotationY: (x / rect.width) * 10,
        rotationX: -(y / rect.height) * 10,
        y: -15,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    });

    // Scroll-triggered shadow effect
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 70%",
        end: "top 20%",
        scrub: 0.5,
        onEnter: () => {
          gsap.to(card, {
            filter: "drop-shadow(0 20px 50px rgba(34, 211, 238, 0.3))",
            duration: 0.4,
          });
        },
        onLeave: () => {
          gsap.to(card, {
            filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3))",
            duration: 0.4,
          });
        },
      },
    });
  });

  // Service cards with scroll-triggered animation
  const serviceCards = gsap.utils.toArray(".service-card");
  serviceCards.forEach((card, index) => {
    gsap.set(card, { transformStyle: "preserve-3d" });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(card, {
        rotationY: (x / rect.width) * 8,
        rotationX: -(y / rect.height) * 8,
        y: -12,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    });
  });
}

// ==========================================
// 6. AWESOME SCROLL TRIGGERS - Text Reveal
// ==========================================
function initTextReveal() {
  // Split text into characters for letter-by-letter reveal
  gsap.utils.toArray("section h2, .section-subtitle").forEach((element) => {
    const text = element.textContent;
    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      return span;
    });

    element.innerHTML = "";
    chars.forEach((char) => element.appendChild(char));

    gsap.to(chars, {
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        end: "top 50%",
        scrub: 0.5,
      },
      opacity: 1,
      stagger: 0.02,
      duration: 0.6,
      ease: "power2.out",
    });
  });
}

// ==========================================
// 7. FEATURE CARDS HOVER ANIMATIONS
// ==========================================
function initCardHoverEffects() {
  // Service card hover effects with scroll trigger awareness
  gsap.utils.toArray(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -15,
        boxShadow: "0 30px 80px rgba(34, 211, 238, 0.3)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 8px 20px rgba(15, 23, 42, 0.6)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Pricing card hover effects
  gsap.utils.toArray(".pricing-card").forEach((card) => {
    const isFeature = card.classList.contains("featured");

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -20,
        scale: isFeature ? 1.08 : 1.05,
        boxShadow: "0 40px 100px rgba(34, 211, 238, 0.4)",
        duration: 0.35,
        ease: "back.out(1.2)",
        overwrite: "auto",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 8px 20px rgba(15, 23, 42, 0.6)",
        duration: 0.35,
        ease: "power2.out",
      });
    });
  });

  // Testimonial card hover effects
  gsap.utils.toArray(".testimonial-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -12,
        scale: 1.05,
        boxShadow: "0 25px 60px rgba(34, 211, 238, 0.25)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 8px 20px rgba(15, 23, 42, 0.6)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// ==========================================
// 8. FLOATING ELEMENTS & PULSE EFFECTS
// ==========================================
function initFloatingElements() {
  // Floating service icons
  gsap.utils.toArray(".service-icon").forEach((icon, index) => {
    gsap.to(icon, {
      y: -10,
      duration: 3 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Pulse on scroll into view
    gsap.to(icon, {
      scrollTrigger: {
        trigger: icon,
        start: "top 80%",
        end: "top 50%",
        scrub: 0.5,
      },
      scale: 1.1,
      duration: 0.6,
      ease: "back.out",
    });
  });

  // Floating project images
  gsap.utils.toArray(".project-image").forEach((image, index) => {
    gsap.to(image, {
      y: -15,
      duration: 4 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
}

// ==========================================
// 9. SMOOTH SCROLL PROGRESS BAR
// ==========================================
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #22d3ee, #6366f1);
    width: 0%;
    z-index: 9999;
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
  `;
  document.body.appendChild(progressBar);

  ScrollTrigger.addEventListener("update", (self) => {
    progressBar.style.width =
      self.getVelocity() > 0 ? self.progress * 100 + "%" : "0%";
  });

  gsap.to(progressBar, {
    opacity: 0,
    scrollTrigger: {
      trigger: "body",
      start: "bottom bottom",
      scrub: 0.5,
    },
  });
}

// ==========================================
// 10. PARALLAX BACKGROUND IMAGE MOVE
// ==========================================
function initBackgroundParallax() {
  // Apply parallax to background elements if they exist
  gsap.utils.toArray("section").forEach((section) => {
    const bg = section.style.backgroundImage;
    if (bg && bg.includes("url")) {
      gsap.to(section, {
        backgroundPosition: "50% 100%",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        ease: "none",
      });
    }
  });
}

// ==========================================
// 11. BUTTON RIPPLE EFFECTS
// ==========================================
function initButtonRippleEffects() {
  gsap.utils.toArray(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    });
  });
}

// ==========================================
// 12. NAV LINK ANIMATIONS
// ==========================================
function initNavAnimations() {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    if (!link.querySelector("i")) {
      // Skip icon buttons
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          color: "#22d3ee",
          textShadow: "0 0 10px rgba(34, 211, 238, 0.5)",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          color: "var(--text-color)",
          textShadow: "none",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }
  });
}

// ==========================================
// 13. ADDON CARDS ANIMATION
// ==========================================
function initAddonCards() {
  // Set initial state for all addon cards
  gsap.set(".addon-card", {
    opacity: 1,
    y: 0,
    clearProps: "all",
  });

  // Animate addon cards on scroll
  gsap.utils.toArray(".addon-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 60%",
        scrub: false,
        onComplete: () => {
          gsap.set(card, { opacity: 1, y: 0 });
        },
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: index * 0.08,
      ease: "power3.out",
    });
  });

  // Addon card hover effect
  gsap.utils.toArray(".addon-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.05,
        y: -5,
        boxShadow: "0 15px 40px rgba(34, 211, 238, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Ensure all cards are visible after animation completes
  setTimeout(() => {
    gsap.set(".addon-card", { opacity: 1 });
  }, 2000);
}

// ==========================================
// 14. BENEFIT ITEMS ANIMATION
// ==========================================
function initBenefitItems() {
  gsap.from(".benefit-item", {
    scrollTrigger: {
      trigger: ".benefits-grid",
      start: "top 70%",
      end: "top 30%",
      scrub: 0.5,
    },
    opacity: 0,
    scale: 0.8,
    stagger: 0.12,
    duration: 0.8,
    ease: "back.out",
  });
}

// ==========================================
// 15. FOOTER ANIMATION
// ==========================================
function initFooterAnimation() {
  const footer = document.querySelector("footer");
  if (footer) {
    gsap.from(footer, {
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
        end: "top 60%",
        scrub: 0.5,
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }
}

// ==========================================
// INITIALIZE ALL ANIMATIONS
// ==========================================
function initAllAnimations() {
  // Wait for DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        try {
          initParallaxLayers();
          initRevealAnimations();
          initMorphingTypography();
          initStickyScrollStacking();
          initCardStacking();
          initTextReveal();
          initCardHoverEffects();
          initFloatingElements();
          initScrollProgress();
          initBackgroundParallax();
          initButtonRippleEffects();
          initNavAnimations();
          initAddonCards();
          initBenefitItems();
          initFooterAnimation();

          // Refresh ScrollTrigger after all animations are set
          ScrollTrigger.refresh();
        } catch (e) {
          console.warn("Animation initialization:", e);
        }
      }, 100);
    });
  } else {
    setTimeout(() => {
      try {
        initParallaxLayers();
        initRevealAnimations();
        initMorphingTypography();
        initStickyScrollStacking();
        initCardStacking();
        initTextReveal();
        initCardHoverEffects();
        initFloatingElements();
        initScrollProgress();
        initBackgroundParallax();
        initButtonRippleEffects();
        initNavAnimations();
        initAddonCards();
        initBenefitItems();
        initFooterAnimation();

        ScrollTrigger.refresh();
      } catch (e) {
        console.warn("Animation initialization:", e);
      }
    }, 100);
  }
}

// Start animations on page load
initAllAnimations();

// Refresh ScrollTrigger on window resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

// Ensure visibility on page ready
document.addEventListener("DOMContentLoaded", () => {
  // Make sure all scroll-animate elements are visible when needed
  gsap.utils.toArray(".scroll-animate").forEach((el) => {
    if (!el.style.opacity || el.style.opacity === "0") {
      gsap.set(el, { opacity: 0 });
    }
  });
});
