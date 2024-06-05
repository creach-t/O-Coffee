const bcrypt = require('bcrypt');
const database = require('./database');

const dataMapper = {
    async getAllCoffees() {
        const query = "SELECT * FROM cafes ORDER BY reference DESC";
        const result = await database.query(query);
        return result.rows;
      },

  async get3NewsCoffees() {
    const query = "SELECT * FROM cafes ORDER BY date_ajout DESC LIMIT 3";
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

  async signUp(firstname, lastname, email, password) {
    const result = await database.query({
        text:  "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);",
        values: [firstname, lastname, email, password]
    });
  },

  async getUserByEmail(email) {
    const result = await database.query({
      text:  "SELECT * FROM users WHERE email = $1",
      values: [email]
  });
    return result.rows[0];
  },

  async login(email, password){
    const user = await dataMapper.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        return true;
    } else {
        return false;
    }
  },

};


module.exports = dataMapper;