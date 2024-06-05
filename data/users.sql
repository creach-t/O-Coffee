-- Suppression de la table des utilisateurs si elle existe
DROP TABLE IF EXISTS users;

-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion d'un utilisateur exemple (optionnel)
INSERT INTO users (firstname, lastname, email, password) VALUES ('Théo', 'Créac''h', 'creach.t@gmail.com', 'password');
