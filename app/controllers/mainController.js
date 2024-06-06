const dataMapper = require('../dataMapper.js');
const dayjs = require('dayjs');
require('dayjs/locale/fr');

const mainController = {

  homePage: async (req, res) => {
    try {
      const coffees = await dataMapper.get3NewsCoffees();
      res.render('index', {
        coffees,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  detailPage: async (req, res) => {
    const reference = req.params.reference;

    try {
      const coffee = await dataMapper.getCoffeeByReference(reference);
      coffee.date_ajout_formatted = dayjs(coffee.date_ajout).locale('fr').format('D MMMM YYYY');
      res.render('detail', {
        coffee,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

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
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

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
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  catalogueCategoryPage: async (req, res) => {
    const categorySelected = req.query.category;
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
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  aboutPage: (req, res) => {
    res.render('about');
  },

};

module.exports = mainController;