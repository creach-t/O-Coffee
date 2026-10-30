const dataMapper = require('../dataMapper.js');
const dayjs = require('dayjs');
require('dayjs/locale/fr');

const mainController = {
  // Home page controller
  homePage: async (req, res) => {
    try {
      const coffees = await dataMapper.get3NewsCoffees();
      res.render('index', {
        coffees,
        title: "O'Coffee — Boutique de cafés de spécialité en ligne",
        description:
          "Découvrez O'Coffee, une sélection de cafés de spécialité du monde entier : grains d'exception, saveurs riches et torréfactions soignées. Projet de démonstration (boutique fictive) d'un site e-commerce codé à la main en Node.js, Express et EJS par Théo Créac'h.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occurred with the database :\n${error.message}`);
    }
  },

  // Detail page controller with input validation
  detailPage: async (req, res) => {
    const reference = req.params.reference;

    if (!reference || typeof reference !== 'string') {
      return res.status(400).send('Invalid coffee reference.');
    }

    try {
      const coffee = await dataMapper.getCoffeeByReference(reference);

      if (!coffee) {
        return res.status(404).send('Coffee not found.');
      }

      coffee.date_ajout_formatted = dayjs(coffee.date_ajout).locale('fr').format('D MMMM YYYY');
      const shortDescription = coffee.description
        ? coffee.description.slice(0, 155).trim()
        : '';
      res.render('detail', {
        coffee,
        title: `${coffee.nom} — Café de spécialité | O'Coffee`,
        description: shortDescription
          ? `${shortDescription} — Découvrez ce café de spécialité sur O'Coffee (projet de démonstration).`
          : `${coffee.nom}, café de spécialité à découvrir sur O'Coffee (projet de démonstration).`,
        ogImage: `/image/coffees/${coffee.reference}.webp`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occurred with the database :\n${error.message}`);
    }
  },

  // Catalogue page controller
  cataloguePage: async (req, res) => {
    try {
      const coffees = await dataMapper.get3NewsCoffees();
      const categories = await dataMapper.getCategories();
      res.render('catalogue', {
        coffees,
        categories,
        categorySelected: "Du Moment",
        all: false,
        title: "Catalogue de cafés de spécialité — O'Coffee",
        description:
          "Parcourez le catalogue O'Coffee : nos cafés de spécialité du moment, par catégorie, du plus doux au plus corsé, avec leur prix au kilo. Projet de démonstration.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occurred with the database :\n${error.message}`);
    }
  },

  // Catalogue all page controller
  catalogueAllPage: async (req, res) => {
    try {
      const coffees = await dataMapper.getAllCoffees();
      const categories = await dataMapper.getCategories();
      res.render('catalogue', {
        coffees,
        categories,
        categorySelected: "",
        all: true,
        title: "Tous nos cafés de spécialité — Catalogue O'Coffee",
        description:
          "L'intégralité du catalogue O'Coffee : tous nos cafés de spécialité, origines et torréfactions, avec leur prix au kilo. Projet de démonstration.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occurred with the database :\n${error.message}`);
    }
  },

  // Catalogue category page controller with input validation
  catalogueCategoryPage: async (req, res) => {
    const categorySelected = req.query.category;

    if (!categorySelected || typeof categorySelected !== 'string') {
      return res.status(400).send('Invalid category selected.');
    }

    try {
      const coffees = await dataMapper.getCoffeeByCategories(categorySelected);
      const categories = await dataMapper.getCategories();
      res.render('catalogue', {
        coffees,
        categories,
        categorySelected,
        all: false,
        title: `Cafés ${categorySelected} — Catalogue O'Coffee`,
        description: `Découvrez notre sélection de cafés ${categorySelected} sur O'Coffee : cafés de spécialité, origines et torréfactions, avec leur prix au kilo. Projet de démonstration.`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occurred with the database :\n${error.message}`);
    }
  },

  // About page controller
  aboutPage: (req, res) => {
    res.render('about', {
      title: "À propos — O'Coffee, boutique de cafés de spécialité",
      description:
        "L'histoire d'O'Coffee et des frères Pepper, leur savoir-faire et leur passion pour le café de spécialité. Projet de démonstration développé par Théo Créac'h.",
    });
  },
};

module.exports = mainController;
