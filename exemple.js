const { MongoClient } = require("mongodb");

async function fetchDocuments() {
  const uri = "mongodb://localhost:27017"; // Connexion à la base
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("myDatabase");
    const collection = database.collection("users");

    // Rechercher tous les documents
    const users = await collection.find({}).toArray();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error accessing NoSQL database:", error);
  } finally {
    await client.close();
  }
}

fetchDocuments();