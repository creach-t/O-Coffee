const database = require("./database");

const dataMapper = {
  /**
   * Retrieves all coffees from the database, ordered by reference.
   * @returns {Promise<Array>} A promise that resolves to an array of coffee objects.
   * @throws {Error} If the query fails.
   */
  async getAllCoffees() {
    try {
      const query = "SELECT * FROM cafes ORDER BY reference ASC";
      const result = await database.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error while retrieving all coffees:", error);
      throw new Error("Unable to retrieve coffees.");
    }
  },

  /**
   * Retrieves the latest 3 coffees added to the database.
   * @returns {Promise<Array>} A promise that resolves to an array of the latest coffee objects.
   * @throws {Error} If the query fails.
   */
  async get3NewsCoffees() {
    try {
      const query = "SELECT * FROM cafes ORDER BY date_ajout DESC LIMIT 3";
      const result = await database.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error while retrieving the latest 3 coffees:", error);
      throw new Error("Unable to retrieve the latest 3 coffees.");
    }
  },

  /**
   * Retrieves a coffee by its unique reference.
   * @param {string} reference - The unique reference of the coffee.
   * @returns {Promise<Object|null>} A promise that resolves to the coffee object or null if not found.
   * @throws {Error} If the query fails.
   */
  async getCoffeeByReference(reference) {
    try {
      const result = await database.query({
        text: `
              SELECT 
                  cafes.*, 
                  pays.nom_pays AS origin, 
                  pays.code_pays, 
                  pays.continent, 
                  pays.langue_officielle, 
                  pays.monnaie 
              FROM cafes
              JOIN pays ON cafes.pays_id = pays.id
              WHERE cafes.reference = $1
          `,
        values: [reference],
      });
      return result.rows[0];
    } catch (error) {
      console.error(
        `Error while retrieving coffee with reference ${reference}:`,
        error
      );
      throw new Error("Unable to retrieve the specified coffee.");
    }
  },

  /**
   * Retrieves all coffees that belong to a specific category.
   * @param {string} category - The category of coffees to retrieve.
   * @returns {Promise<Array>} A promise that resolves to an array of coffee objects.
   * @throws {Error} If the query fails.
   */
  async getCoffeeByCategories(category) {
    try {
      const result = await database.query({
        text: "SELECT * FROM cafes WHERE caracteristique_principale = $1",
        values: [category],
      });
      return result.rows;
    } catch (error) {
      console.error(
        `Error while retrieving coffees for category ${category}:`,
        error
      );
      throw new Error("Unable to retrieve coffees for the specified category.");
    }
  },

  /**
   * Retrieves all available coffees that belong to a specific category.
   * @param {string} category - The category of coffees to retrieve.
   * @returns {Promise<Array>} A promise that resolves to an array of available coffee objects.
   * @throws {Error} If the query fails.
   */
  async getCoffeeDispoByCategories(category) {
    try {
      const result = await database.query({
        text: "SELECT * FROM cafes WHERE caracteristique_principale = $1 AND disponible = true",
        values: [category],
      });
      return result.rows;
    } catch (error) {
      console.error(
        `Error while retrieving available coffees for category ${category}:`,
        error
      );
      throw new Error(
        "Unable to retrieve available coffees for the specified category."
      );
    }
  },

  /**
   * Retrieves all unique coffee categories.
   * @returns {Promise<Array>} A promise that resolves to an array of categories.
   * @throws {Error} If the query fails.
   */
  async getCategories() {
    try {
      const result = await database.query({
        text: "SELECT DISTINCT caracteristique_principale FROM cafes",
      });
      return result.rows;
    } catch (error) {
      console.error("Error while retrieving categories:", error);
      throw new Error("Unable to retrieve categories.");
    }
  },

  /**
   * Checks if an email exists in the database.
   * @param {string} email - The email to check.
   * @returns {Promise<boolean>} A promise that resolves to true if the email exists, otherwise false.
   * @throws {Error} If the query fails.
   */
  async checkEmailExists(email) {
    try {
      const query = "SELECT COUNT(*) FROM users WHERE email = $1";
      const values = [email];
      const result = await database.query(query, values);
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      console.error(`Error while checking existence of email ${email}:`, error);
      throw new Error("Unable to verify the email.");
    }
  },

  /**
   * Registers a new user in the database.
   * @param {string} firstname - The user's first name.
   * @param {string} lastname - The user's last name.
   * @param {string} email - The user's email.
   * @param {string} password - The hashed password of the user.
   * @returns {Promise<void>} A promise that resolves when the user is registered.
   * @throws {Error} If the query fails.
   */
  async signUp(firstname, lastname, email, password) {
    try {
      const query =
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)";
      const values = [firstname, lastname, email, password];
      await database.query(query, values);
    } catch (error) {
      console.error("Error while registering the user:", error);
      throw new Error("Unable to create the user account.");
    }
  },

  /**
   * Retrieves a user by their email.
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves to the user object or null if not found.
   * @throws {Error} If the query fails.
   */
  async getUserByEmail(email) {
    try {
      const result = await database.query({
        text: "SELECT * FROM users WHERE email = $1",
        values: [email],
      });
      return result.rows[0];
    } catch (error) {
      console.error(`Error while retrieving user by email ${email}:`, error);
      throw new Error("Unable to retrieve the user.");
    }
  },
};

module.exports = dataMapper;