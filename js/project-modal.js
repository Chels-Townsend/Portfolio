/**
 * Project Modal Functionality
 * Handles opening/closing the modal and loading project details
 */
document.addEventListener("DOMContentLoaded", () => {
  // Create modal HTML structure and append to body
  createModalStructure();

  // Get modal elements
  const modalOverlay = document.getElementById("project-modal-overlay");
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalTags = document.getElementById("modal-tags");
  const modalMetadata = document.getElementById("modal-metadata");
  const modalLinks = document.getElementById("modal-links");

  // Initialize project cards with data
  initializeProjectCards();

  // Get all project cards after initialization
  const projectCards = document.querySelectorAll(".project-card");

  // Add click event to all project cards
  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Prevent default if it's a link that should open in a new window
      if (
        e.target.tagName === "A" &&
        e.target.getAttribute("target") === "_blank"
      ) {
        return; // Allow normal link behavior for external links
      }

      // If the clicked element is a link that doesn't open in a new window,
      // we should prevent the default action
      if (e.target.tagName === "A") {
        e.preventDefault();
      }

      // Get project ID from the card
      const projectId = card.getAttribute("data-project-id");

      // If we have a project ID, load the project data
      if (projectId) {
        const projectData = projectsData.find((p) => p.id === projectId);
        if (projectData) {
          loadProjectData(projectData);
          openModal();
        }
      }
    });
  });

  // Close modal when clicking the close button
  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking outside the modal
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  /**
   * Create the modal structure and append to the body
   */
  function createModalStructure() {
    const modalHTML = `
      <div id="project-modal-overlay" class="modal-overlay">
        <div id="project-modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="modal-title">
          <button id="modal-close" class="modal__close" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="modal__content">
            <div class="modal__image">
              <img id="modal-image" src="" alt="Project image">
            </div>
            <div class="modal__details">
              <h2 id="modal-title" class="modal__title"></h2>
              <div id="modal-description" class="modal__description"></div>
              
              <div id="modal-metadata" class="modal__metadata">
                <div class="metadata-grid">
                  <!-- Metadata content will be added dynamically -->
                </div>
              </div>
              
              <div id="modal-tags" class="tag-container"></div>
              
              <div id="modal-links" class="modal__links">
                <!-- Links will be added dynamically -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  /**
   * Initialize project cards with data from the projectsData array
   */
  function initializeProjectCards() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      const projectId = card.getAttribute("data-project-id");
      if (projectId) {
        const projectData = projectsData.find((p) => p.id === projectId);

        if (projectData) {
          // Update title and description if they exist
          const titleElement = card.querySelector(".project-card__title");
          const descriptionElement = card.querySelector(
            ".project-card__description"
          );

          if (titleElement) titleElement.textContent = projectData.title;
          if (descriptionElement)
            descriptionElement.textContent = projectData.shortDescription;

          // Update tags
          const tagContainer = card.querySelector(".tag-container");
          if (tagContainer) {
            // Clear existing tags
            tagContainer.innerHTML = "";

            // Create data-category attribute based on tags
            const categories = [];

            // Add tags from project data
            projectData.tags.forEach((tag) => {
              const tagClass = getTagClass(tag);
              if (tagClass) categories.push(tagClass);

              const tagElement = document.createElement("span");
              tagElement.className = `tag${
                tagClass ? " tag--" + tagClass : ""
              }`;
              tagElement.textContent = tag;
              tagContainer.appendChild(tagElement);
            });

            // Update data-category attribute for filtering
            if (categories.length > 0) {
              card.setAttribute("data-category", categories.join(" "));
            }
          }
        }
      }
    });
  }

  /**
   * Load project data into the modal
   * @param {Object} project - The project data to display
   */
  function loadProjectData(project) {
    // Set modal content
    modalImage.src = project.fullImage;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;

    // Use the full HTML description
    modalDescription.innerHTML = project.fullDescription;

    // Clear existing tags
    modalTags.innerHTML = "";

    // Add tags
    project.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = `tag tag--${getTagClass(tag)}`;
      tagElement.textContent = tag;
      modalTags.appendChild(tagElement);
    });

    // Add metadata
    const metadataHTML = `
      <div class="metadata-item">
        <h3>Tools Used</h3>
        <p>${project.tools.join(", ")}</p>
      </div>
      <div class="metadata-item">
        <h3>Duration</h3>
        <p>${project.duration}</p>
      </div>
      <div class="metadata-item">
        <h3>Role</h3>
        <p>${project.role}</p>
      </div>
    `;

    modalMetadata.querySelector(".metadata-grid").innerHTML = metadataHTML;

    // Clear existing links
    modalLinks.innerHTML = "";

    // Add links
    project.links.forEach((link) => {
      const linkElement = document.createElement("a");
      linkElement.href = link.url;
      linkElement.className = link.primary
        ? "btn btn--primary"
        : "btn btn--secondary";
      linkElement.textContent = link.text;

      if (link.url.startsWith("http") || link.target === "_blank") {
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
      }

      modalLinks.appendChild(linkElement);
    });
  }

  /**
   * Get CSS class for tag based on its content
   * @param {string} tagText - The tag text
   * @returns {string} - The CSS class to apply
   */
  function getTagClass(tagText) {
    const text = tagText.toLowerCase();
    if (text.includes("e-learning")) return "elearning";
    if (text.includes("research")) return "research";
    if (text.includes("design")) return "design";
    if (text.includes("tech")) return "tech";
    if (text.includes("game") || text.includes("gamif")) return "games";
    if (text.includes("data")) return "research";
    if (text.includes("adaptive")) return "tech";
    if (text.includes("mobile")) return "design";
    return "";
  }

  /**
   * Open the modal
   */
  function openModal() {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling the body

    // Set focus to the modal for accessibility
    modal.focus();
  }

  /**
   * Close the modal
   */
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }
});
