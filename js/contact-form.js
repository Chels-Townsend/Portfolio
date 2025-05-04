/**
 * Contact Form Validation and Submission
 * Handles form validation, security, and Formspree submission
 */
document.addEventListener("DOMContentLoaded", () => {
  // Get form elements
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");
  const formError = document.getElementById("form-error");

  // Form field elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const resumeRequestCheckbox = document.getElementById("resume-request");
  const resumeRequestedHidden = document.getElementById(
    "resume-requested-hidden"
  );

  // Error message elements
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const subjectError = document.getElementById("subject-error");
  const messageError = document.getElementById("message-error");

  // Rate limiting variables
  let lastSubmissionTime = 0;
  const SUBMISSION_COOLDOWN = 10000; // 10 seconds

  // Set up the resume request checkbox to update the hidden field
  if (resumeRequestCheckbox && resumeRequestedHidden) {
    // Update hidden field when checkbox changes
    resumeRequestCheckbox.addEventListener("change", function () {
      resumeRequestedHidden.value = this.checked ? "Yes" : "No";
    });

    // Set initial value
    resumeRequestedHidden.value = resumeRequestCheckbox.checked ? "Yes" : "No";
  }

  /**
   * Sanitize input to prevent XSS attacks
   * @param {string} input - Input text to sanitize
   * @returns {string} - Sanitized input
   */
  function sanitizeInput(input) {
    return input.replace(/[<>&"']/g, function (c) {
      return {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }

  /**
   * Check if form can be submitted (rate limiting)
   * @returns {boolean} - Whether form submission is allowed
   */
  function canSubmitForm() {
    const now = Date.now();
    if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
      return false;
    }
    lastSubmissionTime = now;
    return true;
  }

  /**
   * Validate the entire form
   * @returns {boolean} - Whether the form is valid
   */
  function validateForm() {
    let isValid = true;

    // Reset error states
    resetErrors();

    // Validate name (required, min 2 characters)
    if (!validateName(nameInput.value)) {
      showError(
        nameInput,
        nameError,
        "Please enter your name (at least 2 characters)"
      );
      isValid = false;
    }

    // Validate email (required, valid format)
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, emailError, "Please enter a valid email address");
      isValid = false;
    }

    // Validate subject (required, min 3 characters)
    if (!validateSubject(subjectInput.value)) {
      showError(
        subjectInput,
        subjectError,
        "Please enter a subject (at least 3 characters)"
      );
      isValid = false;
    }

    // Validate message (required, min 10 characters)
    if (!validateMessage(messageInput.value)) {
      showError(
        messageInput,
        messageError,
        "Please enter your message (at least 10 characters)"
      );
      isValid = false;
    }

    return isValid;
  }

  /**
   * Validate name field
   * @param {string} name - Name value
   * @returns {boolean} - Whether the name is valid
   */
  function validateName(name) {
    return name.trim().length >= 2;
  }

  /**
   * Validate email field
   * @param {string} email - Email value
   * @returns {boolean} - Whether the email is valid
   */
  function validateEmail(email) {
    // More comprehensive email regex pattern
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
  }

  /**
   * Validate subject field
   * @param {string} subject - Subject value
   * @returns {boolean} - Whether the subject is valid
   */
  function validateSubject(subject) {
    return subject.trim().length >= 3;
  }

  /**
   * Validate message field
   * @param {string} message - Message value
   * @returns {boolean} - Whether the message is valid
   */
  function validateMessage(message) {
    return message.trim().length >= 10;
  }

  /**
   * Show error for a field
   * @param {HTMLElement} input - Input element
   * @param {HTMLElement} errorElement - Error message element
   * @param {string} message - Error message
   */
  function showError(input, errorElement, message) {
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    errorElement.textContent = message;
    errorElement.classList.add("active");
  }

  /**
   * Reset all error states
   */
  function resetErrors() {
    // Remove all error classes
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.classList.remove("invalid");
      input.setAttribute("aria-invalid", "false");
    });

    // Hide all error messages
    const errorMessages = contactForm.querySelectorAll(".error-message");
    errorMessages.forEach((error) => error.classList.remove("active"));

    // Hide form status messages
    formSuccess.classList.remove("active");
    formError.classList.remove("active");
  }

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  async function handleSubmit(e) {
    // Validate form first
    if (!validateForm()) {
      e.preventDefault();
      return;
    }

    // Check rate limiting
    if (!canSubmitForm()) {
      e.preventDefault();
      formError.textContent = "Please wait a moment before submitting again.";
      formError.classList.add("active");
      return;
    }

    // Collect form data for tracking/analytics
    const formData = {
      name: sanitizeInput(nameInput.value),
      email: sanitizeInput(emailInput.value),
      subject: sanitizeInput(subjectInput.value),
      interest: sanitizeInput(document.getElementById("interest").value),
      resumeRequested: resumeRequestCheckbox.checked,
      message: sanitizeInput(messageInput.value),
      timestamp: new Date().toISOString(),
    };

    // Add analytics tracking if available
    if (typeof gtag === "function") {
      gtag("event", "form_submit", {
        event_category: "Contact",
        event_label: formData.subject,
      });
    }

    // Visual indication of form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Sending...";

    // The form will be submitted to Formspree via the form action
    // Here we need to capture the form submission to reset the form after success

    // Store the form data for Formspree submission
    const formSpreeFormData = new FormData(contactForm);

    // Prevent default form submission
    e.preventDefault();

    try {
      // Submit the form to Formspree using fetch
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formSpreeFormData,
        headers: {
          Accept: "application/json",
        },
      });

      const json = await response.json();

      if (json.ok) {
        // Success! Reset the form and show success message
        contactForm.reset();

        // Reset the resume checkbox hidden field
        if (resumeRequestedHidden) {
          resumeRequestedHidden.value = "No";
        }

        // Show success message
        formSuccess.classList.add("active");

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        // Error handling
        throw new Error("Form submission failed");
      }
    } catch (error) {
      // Show error message
      formError.classList.add("active");
      console.error("Form submission error:", error);
    }

    // Reset button text
    submitButton.textContent = originalButtonText;
  }

  /**
   * Debounce function to limit function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Add event listeners for real-time validation with debounce
  nameInput.addEventListener(
    "input",
    debounce(() => {
      if (nameInput.value.trim() !== "") {
        if (!validateName(nameInput.value)) {
          showError(
            nameInput,
            nameError,
            "Please enter your name (at least 2 characters)"
          );
        } else {
          nameInput.classList.remove("invalid");
          nameInput.setAttribute("aria-invalid", "false");
          nameError.classList.remove("active");
        }
      }
    }, 300)
  );

  emailInput.addEventListener(
    "input",
    debounce(() => {
      if (emailInput.value.trim() !== "") {
        if (!validateEmail(emailInput.value)) {
          showError(
            emailInput,
            emailError,
            "Please enter a valid email address"
          );
        } else {
          emailInput.classList.remove("invalid");
          emailInput.setAttribute("aria-invalid", "false");
          emailError.classList.remove("active");
        }
      }
    }, 300)
  );

  subjectInput.addEventListener(
    "input",
    debounce(() => {
      if (subjectInput.value.trim() !== "") {
        if (!validateSubject(subjectInput.value)) {
          showError(
            subjectInput,
            subjectError,
            "Please enter a subject (at least 3 characters)"
          );
        } else {
          subjectInput.classList.remove("invalid");
          subjectInput.setAttribute("aria-invalid", "false");
          subjectError.classList.remove("active");
        }
      }
    }, 300)
  );

  messageInput.addEventListener(
    "input",
    debounce(() => {
      if (messageInput.value.trim() !== "") {
        if (!validateMessage(messageInput.value)) {
          showError(
            messageInput,
            messageError,
            "Please enter your message (at least 10 characters)"
          );
        } else {
          messageInput.classList.remove("invalid");
          messageInput.setAttribute("aria-invalid", "false");
          messageError.classList.remove("active");
        }
      }
    }, 300)
  );

  // Final validation on blur
  nameInput.addEventListener("blur", () => {
    if (nameInput.value.trim() !== "" && !validateName(nameInput.value)) {
      showError(
        nameInput,
        nameError,
        "Please enter your name (at least 2 characters)"
      );
    }
  });

  emailInput.addEventListener("blur", () => {
    if (emailInput.value.trim() !== "" && !validateEmail(emailInput.value)) {
      showError(emailInput, emailError, "Please enter a valid email address");
    }
  });

  subjectInput.addEventListener("blur", () => {
    if (
      subjectInput.value.trim() !== "" &&
      !validateSubject(subjectInput.value)
    ) {
      showError(
        subjectInput,
        subjectError,
        "Please enter a subject (at least 3 characters)"
      );
    }
  });

  messageInput.addEventListener("blur", () => {
    if (
      messageInput.value.trim() !== "" &&
      !validateMessage(messageInput.value)
    ) {
      showError(
        messageInput,
        messageError,
        "Please enter your message (at least 10 characters)"
      );
    }
  });

  // Add form submit handler
  contactForm.addEventListener("submit", handleSubmit);
});
