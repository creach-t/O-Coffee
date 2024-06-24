document.addEventListener("DOMContentLoaded", function () {
    // Sélection des éléments nécessaires
    const burgerMenu = document.querySelector('.burger');
    const headerNav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__list__item');
    const categorySelect = document.getElementById("category");

    // Vérification de l'existence des éléments
    if (!burgerMenu) {
        console.error("Un ou plusieurs éléments nécessaires sont manquants dans le HTML.");
        return;
    }

    // Gestion du menu burger
    function toggleBurgerMenu() {
        const isOpen = headerNav.classList.toggle('open');
        burgerMenu.textContent = isOpen ? "✕" : "≡";
    }

    burgerMenu.addEventListener('click', toggleBurgerMenu);

    navLinks.forEach((link, index) => {
        if (index < navLinks.length - 2) {
            link.addEventListener('click', () => {
                headerNav.classList.remove('open');
                burgerMenu.textContent = "≡";
            });
        }
    });

    if (categorySelect) {
        categorySelect.addEventListener("change", ({ target }) => target.form.submit());
    }

      // Écoute les changements dans les sélecteurs de quantité
  document.querySelectorAll('.quantity').forEach(select => {
    select.addEventListener('change', function() {
      const coffeeReference = this.dataset.reference;
      const quantity = this.value;
      window.location.href = `/cart/update/${coffeeReference}/${quantity}`;
    });
  });
  
      // Gestion du message pop-up
      const popupMessage = document.querySelector('.popup-message');
      const closePopup = document.querySelector('.close-popup');
  
      if (popupMessage && closePopup) {
          closePopup.addEventListener('click', () => {
              popupMessage.style.display = 'none';
          });
  
          // Optionnel : Masquer automatiquement après quelques secondes
          setTimeout(() => {
              popupMessage.style.display = 'none';
          }, 5000); // 5 secondes
      }

});