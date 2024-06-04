document.addEventListener("DOMContentLoaded", function () {
    // Sélection des éléments nécessaires
    const burgerMenu = document.querySelector('.burger');
    const headerNav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__list__item');

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

    document.getElementById("category").addEventListener("change", ({ target }) => target.form.submit());

});