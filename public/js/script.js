document.addEventListener("DOMContentLoaded", function () {
  // Select necessary elements with existence verification
  const burgerMenu = document.querySelector(".burger");
  const headerNav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav__list__item");
  const categorySelect = document.getElementById("category");
  const popupMessage = document.querySelector(".popup-message");
  const closePopup = document.querySelector(".close-popup");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("toggle-password"); // Icon for toggling password visibility

  // Security: Prevent script from running if DOM is incomplete
  if (!document.body) {
    console.error("DOM not fully loaded. Script execution stopped.");
    return;
  }

  // Handle burger menu with accessibility features
  if (burgerMenu && headerNav) {
    function toggleBurgerMenu() {
      const isOpen = headerNav.classList.toggle("open");
      burgerMenu.setAttribute("aria-expanded", isOpen);
      burgerMenu.textContent = isOpen ? "✕" : "≡";
    }

    burgerMenu.addEventListener("click", toggleBurgerMenu);
  } else {
    console.warn("Burger menu or navigation header not found.");
  }

  // Handle navigation links with auto-collapse and accessibility
  if (navLinks.length > 0) {
    navLinks.forEach((link, index) => {
      if (index < navLinks.length - 2) {
        // Exclude certain links from auto-collapse
        link.addEventListener("click", () => {
          if (headerNav) {
            headerNav.classList.remove("open");
          }
          if (burgerMenu) {
            burgerMenu.setAttribute("aria-expanded", false);
            burgerMenu.textContent = "≡";
          }
        });
      }
    });
  } else {
    console.warn("Navigation links not found.");
  }

  // Handle category change with data validation
  if (categorySelect) {
    categorySelect.addEventListener("change", ({ target }) => {
      if (target.form && typeof target.form.submit === "function") {
        target.form.submit();
      } else {
        console.error("Category select form is invalid or not found.");
      }
    });
  } else {
    console.warn("Category select element not found.");
  }

  // Listen to changes in quantity selectors
  const quantitySelectors = document.querySelectorAll(".quantity");
  if (quantitySelectors.length > 0) {
    quantitySelectors.forEach((select) => {
      select.addEventListener("change", function () {
        const coffeeReference = this.dataset.reference;
        const quantity = this.value;

        if (/^[0-9]+$/.test(quantity)) {
          // Validate quantity
          if (coffeeReference) {
            window.location.href = `/cart/update/${coffeeReference}/${quantity}`;
          } else {
            console.error("Coffee reference missing on quantity selector.");
          }
        } else {
          console.error("Invalid quantity entered.");
          // Optionally, show a user-friendly message about invalid input
        }
      });
    });
  } else {
    console.warn("No quantity selectors found.");
  }

  // Handle popup message
  if (popupMessage && closePopup) {
    closePopup.addEventListener("click", () => {
      popupMessage.style.display = "none";
    });

    setTimeout(() => {
      if (popupMessage) {
        popupMessage.style.display = "none";
      }
    }, 3000); // 3 seconds
  } else {
    console.warn("Popup message or close button not found.");
  }

  // Show/hide password logic with icon toggle
  if (passwordInput && togglePassword) {
    togglePassword.addEventListener("click", () => {
      const isPasswordVisible = passwordInput.type === "text";
      passwordInput.type = isPasswordVisible ? "password" : "text";
      togglePassword.textContent = isPasswordVisible ? "👁️" : "🙈"; // Toggle icon
    });
  } else {
    console.warn("Password input or toggle-password icon not found.");
  }
});
