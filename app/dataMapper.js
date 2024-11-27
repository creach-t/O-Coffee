const database = require("./database");

const dataMapper = {
  async getAllCoffees() {
    const query = "SELECT * FROM cafes ORDER BY reference ASC";
    const result = await database.query(query);
    return result.rows;
  },

  async get3NewsCoffees() {
    const query = "SELECT * FROM cafes ORDER BY date_ajout DESC LIMIT 3";
    const result = await database.query(query);
    return result.rows;
  },

  async getCoffeeByReference(reference) {
    const result = await database.query({
      text: `
            SELECT 
                cafes.*, 
                pays.nom_pays AS origine, 
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
  },

  async getCoffeeByCategories(category) {
    const result = await database.query({
      text: "SELECT * FROM cafes WHERE caracteristique_principale = $1",
      values: [category],
    });
    return result.rows;
  },

  async getCoffeeDispoByCategories(category) {
    const result = await database.query({
      text: "SELECT * FROM cafes WHERE caracteristique_principale = $1 AND disponible = true",
      values: [category],
    });
    return result.rows;
  },

  async getCategories() {
    const result = await database.query({
      text: "SELECT DISTINCT caracteristique_principale FROM cafes",
    });
    return result.rows;
  },

  async checkEmailExists(email) {
    const query = "SELECT COUNT(*) FROM users WHERE email = $1";
    const values = [email];
    const result = await database.query(query, values);
    return parseInt(result.rows[0].count) > 0;
  },

  // Fonction pour inscrire un nouvel utilisateur
  async signUp(firstname, lastname, email, password) {
    // Validation des entrées
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Email invalide");
    }

    if (!firstname || firstname.length > 50) {
      throw new Error("Le prénom doit contenir entre 1 et 50 caractères");
    }

    if (!lastname || lastname.length > 50) {
      throw new Error("Le nom doit contenir entre 1 et 50 caractères");
    }

    if (!password || password.length < 8) {
      throw new Error("Le mot de passe doit contenir au moins 8 caractères");
    }

    // Vérifie si l'email existe déjà
    const emailExists = await dataMapper.checkEmailExists(email);
    if (emailExists) {
      throw new Error("Email déjà utilisé");
    }

    // Insérer le nouvel utilisateur dans la base de données
    const query =
      "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)";
    const values = [firstname, lastname, email, password];
    await database.query(query, values);
  },

  async getUserByEmail(email) {
    const result = await database.query({
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    });
    return result.rows[0];
  },
};

module.exports = dataMapper;
