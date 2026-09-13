const { Pool } = require("pg");

// Pool de connexions : mieux adapté à un serveur web (concurrence, reconnexion).
// L'interface `.query()` est identique à celle du Client, le dataMapper reste inchangé.
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: 5432,
  database: process.env.PG_DB,
  // Échouer vite si la base est injoignable/lente, plutôt que faire hang les requêtes.
  connectionTimeoutMillis: 5000,
  statement_timeout: 10000,
});

// Éviter qu'une erreur sur un client inactif du pool ne fasse planter le process.
pool.on("error", (err) => {
  console.error("Unexpected error on idle database client:", err.stack);
});

// Vérification de connexion au démarrage
pool
  .query("SELECT 1")
  .then(() => console.log("Connected to the database successfully!"))
  .catch((err) => console.error("Database connection error:", err.stack));

module.exports = pool;