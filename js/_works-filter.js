/**
 * Works Filter Functionality
 * Handles filtering of project cards based on category
 */
document.addEventListener("DOMContentLoaded", () => {
  // Make sure project cards are initialized before setting up filters
  setTimeout(() => {
    // Get all filter buttons and project cards
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    // Add click event listener to each filter button
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Get the filter value from data attribute
        const filterValue = button.getAttribute("data-filter");

        // Update active button class
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Filter the project cards
        filterProjects(filterValue);
      });
    });

    /**
     * Filter projects based on category
     * @param {string} category - The category to filter by
     */
    function filterProjects(category) {
      projectCards.forEach((card) => {
        // Reset animation to ensure smooth transitions
        card.style.animation = "none";
        card.offsetHeight; // Trigger reflow

        if (category === "all") {
          // Show all cards with staggered animation
          card.classList.remove("hidden");
          card.style.animation = "fadeIn 0.5s forwards";
        } else {
          // Get card categories from data attribute
          const cardCategories = card.getAttribute("data-category")
            ? card.getAttribute("data-category").split(" ")
            : [];

          // Check if card has the selected category
          if (cardCategories.includes(category)) {
            card.classList.remove("hidden");
            card.style.animation = "fadeIn 0.5s forwards";
          } else {
            // Hide cards that don't match
            card.classList.add("hidden");
          }
        }
      });

      // After filtering, check if any cards are visible
      const visibleCards = document.querySelectorAll(
        ".project-card:not(.hidden)"
      );
      const worksGrid = document.querySelector(".works-grid");

      if (visibleCards.length === 0) {
        // Show "no results" message
        let noResults = document.querySelector(".no-results");

        if (!noResults) {
          noResults = document.createElement("p");
          noResults.className = "no-results";
          noResults.textContent = "No projects found in this category.";
          worksGrid.appendChild(noResults);
        }
      } else {
        // Remove "no results" message if it exists
        const noResults = document.querySelector(".no-results");
        if (noResults) {
          noResults.remove();
        }
      }
    }
  }, 100); // Small timeout to ensure project cards are initialized
});
