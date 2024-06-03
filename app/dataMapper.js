const database = require('./database');

const dataMapper = {
    async getAllCoffees() {
        const query = "SELECT * FROM cafes ORDER BY reference ASC";
        const result = await database.query(query);
        return result.rows;
      },

  async get3NewsCoffees() {
    const query = "SELECT * FROM cafes ORDER BY reference ASC LIMIT 3";
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



};


module.exports = dataMapper;