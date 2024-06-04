const database = require('./database');

const dataMapper = {
    async getAllCoffees() {
        const query = "SELECT * FROM cafes ORDER BY reference DESC";
        const result = await database.query(query);
        return result.rows;
      },

  async get3NewsCoffees() {
    const query = "SELECT * FROM cafes ORDER BY reference DESC LIMIT 3";
    const result = await database.query(query);
    return result.rows;
  },

  async getCoffeeById(reference) {
    const result = await database.query({
        text:  "SELECT * FROM cafes WHERE reference = $1",
        values: [reference]
    });
    return result.rows[0];
  },

  async getCoffeeByCategories(category) {
    const result = await database.query({
        text:  "SELECT * FROM cafes WHERE caracteristique_principale = $1",
        values: [category]
    });
    return result.rows;
  },

  async getCategories() {
    const result = await database.query({
        text:  "SELECT DISTINCT caracteristique_principale FROM cafes"
    });
    return result.rows;
  },



};


module.exports = dataMapper;