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
      res.render('detail', {
        coffee,
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
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occurred with the database :\n${error.message}`);
    }
  },

  // About page controller
  aboutPage: (req, res) => {
    res.render('about');
  },
};

module.exports = mainController;
