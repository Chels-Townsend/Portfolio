/**
 * Mobile Menu Functionality
 * Handles opening/closing the mobile navigation menu
 */
document.addEventListener("DOMContentLoaded", () => {
  // Get menu elements
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.getElementById("mobile-nav");

  // Create menu overlay
  const menuOverlay = document.createElement("div");
  menuOverlay.className = "menu-overlay";
  document.body.appendChild(menuOverlay);

  // Toggle menu function
  function toggleMenu() {
    mobileMenuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    menuOverlay.classList.toggle("active");

    // Toggle aria-expanded attribute for accessibility
    const isExpanded = navLinks.classList.contains("active");
    mobileMenuToggle.setAttribute("aria-expanded", isExpanded);

    // Prevent body scrolling when menu is open
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Event listeners
  mobileMenuToggle.addEventListener("click", toggleMenu);
  menuOverlay.addEventListener("click", toggleMenu);

  // Close menu when a link is clicked
  const menuLinks = navLinks.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Set initial ARIA state
  mobileMenuToggle.setAttribute("aria-expanded", "false");

  // Handle resize - reset menu state if window is resized above mobile breakpoint
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      mobileMenuToggle.classList.remove("active");
      navLinks.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    }
  });
});
