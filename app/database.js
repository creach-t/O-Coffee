const { Client } = require("pg");

// Construct the PostgreSQL connection string dynamically
const dbUrl = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:5432/${process.env.PG_DB}`;

// Initialize the PostgreSQL client with the connection string
const client = new Client(dbUrl);

client
  .connect()
  .then(() => console.log("Connected to the database successfully!"))
  .catch((err) => console.error("Database connection error:", err.stack));

module.exports = client;