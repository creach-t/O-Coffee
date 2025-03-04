const { Client } = require("pg");

// Utiliser un objet de configuration plutôt qu'une chaîne de connexion
const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: 5432,
  database: process.env.PG_DB
});

client
  .connect()
  .then(() => console.log("Connected to the database successfully!"))
  .catch((err) => console.error("Database connection error:", err.stack));

module.exports = client;