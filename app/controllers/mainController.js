const dataMapper = require('../dataMapper.js');

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
      const coffee = await dataMapper.getCoffeeById(reference);
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
      res.render('catalogue', {
        coffees,
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
      res.render('catalogue', {
        coffees,
        all: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

};

module.exports = mainController;