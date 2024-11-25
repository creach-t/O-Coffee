document.addEventListener("DOMContentLoaded", function () {
    // Select necessary elements with existence verification
    const burgerMenu = document.querySelector('.burger');
    const headerNav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__list__item');
    const categorySelect = document.getElementById("category");
    const popupMessage = document.querySelector('.popup-message');
    const closePopup = document.querySelector('.close-popup');

    // Handle burger menu with accessibility features
    if (burgerMenu && headerNav) {
        function toggleBurgerMenu() {
            const isOpen = headerNav.classList.toggle('open');
            burgerMenu.setAttribute('aria-expanded', isOpen);
            burgerMenu.textContent = isOpen ? "✕" : "≡";
        }

        burgerMenu.addEventListener('click', toggleBurgerMenu);
    }

    // Handle navigation links with auto-collapse and accessibility
    if (navLinks.length > 0) {
        navLinks.forEach((link, index) => {
            if (index < navLinks.length - 2) { // Exclude certain links from auto-collapse
                link.addEventListener('click', () => {
                    if (headerNav) {
                        headerNav.classList.remove('open');
                    }
                    if (burgerMenu) {
                        burgerMenu.setAttribute('aria-expanded', false);
                        burgerMenu.textContent = "≡";
                    }
                });
            }
        });
    }

    // Handle category change with data validation
    if (categorySelect) {
        categorySelect.addEventListener("change", ({ target }) => {
            // Validate form before submission if needed
            target.form.submit();
        });
    }

    // Listen to changes in quantity selectors
    const quantitySelectors = document.querySelectorAll('.quantity');
    if (quantitySelectors.length > 0) {
        quantitySelectors.forEach(select => {
            select.addEventListener('change', function () {
                const coffeeReference = this.dataset.reference;
                const quantity = this.value;
                if (quantity.match(/^[0-9]+$/)) { // Validate quantity
                    window.location.href = `/cart/update/${coffeeReference}/${quantity}`;
                } else {
                    console.error("Invalid quantity.");
                    // Optionally, show a user-friendly message about invalid input
                }
            });
        });
    }

    // Handle popup message
    if (popupMessage && closePopup) {
        closePopup.addEventListener('click', () => {
            popupMessage.style.display = 'none';
        });

        setTimeout(() => {
            popupMessage.style.display = 'none';
        }, 3000); // 3 seconds
    }
});
