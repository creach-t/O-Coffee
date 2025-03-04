-- Début d'une transaction pour garantir l'exécution atomique
-- Si une erreur survient, toutes les modifications seront annulées
BEGIN;

SET client_encoding TO 'UTF8';

-- Suppression des tables existantes si elles existent
DROP TABLE IF EXISTS cafes;
DROP TABLE IF EXISTS pays;
DROP TABLE IF EXISTS users;

-- Création de la table pour les pays
CREATE TABLE pays (
    id SERIAL PRIMARY KEY,
    code_pays VARCHAR(10) NOT NULL UNIQUE,
    nom_pays VARCHAR(100) NOT NULL,
    continent VARCHAR(50) NOT NULL,
    langue_officielle VARCHAR(100) NOT NULL,
    monnaie VARCHAR(50) NOT NULL
);

-- Insertion des données dans la table pays
INSERT INTO pays (code_pays, nom_pays, continent, langue_officielle, monnaie) 
VALUES
    ('it', 'Italie', 'Europe', 'Italien', 'Euro'),
    ('co', 'Colombie', 'Amérique du Sud', 'Espagnol', 'Peso colombien'),
    ('et', 'Éthiopie', 'Afrique', 'Amharique', 'Birr éthiopien'),
    ('br', 'Brésil', 'Amérique du Sud', 'Portugais', 'Réal brésilien'),
    ('gt', 'Guatemala', 'Amérique Centrale', 'Espagnol', 'Quetzal guatémaltèque'),
    ('ke', 'Kenya', 'Afrique', 'Swahili, Anglais', 'Shilling kényan'),
    ('id', 'Indonésie', 'Asie', 'Indonésien', 'Roupie indonésienne'),
    ('cr', 'Costa Rica', 'Amérique Centrale', 'Espagnol', 'Colón costaricien'),
    ('vn', 'Vietnam', 'Asie', 'Vietnamien', 'Dong vietnamien'),
    ('tz', 'Tanzanie', 'Afrique', 'Swahili, Anglais', 'Shilling tanzanien'),
    ('jm', 'Jamaïque', 'Amérique Centrale', 'Anglais', 'Dollar jamaïcain'),
    ('rw', 'Rwanda', 'Afrique', 'Kinyarwanda, Anglais, Français', 'Franc rwandais'),
    ('pa', 'Panama', 'Amérique Centrale', 'Espagnol', 'Balboa, Dollar américain'),
    ('pe', 'Pérou', 'Amérique du Sud', 'Espagnol', 'Sol péruvien'),
    ('us-hi', 'Hawaï', 'Océanie', 'Anglais, Hawaïen', 'Dollar américain'),
    ('ni', 'Nicaragua', 'Amérique Centrale', 'Espagnol', 'Córdoba nicaraguayen');

-- Création de la table pour les cafés
CREATE TABLE cafes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    reference VARCHAR(20) NOT NULL UNIQUE,
    pays_id INT NOT NULL,
    prix_kilo NUMERIC(6, 2) NOT NULL,
    caracteristique_principale VARCHAR(50) NOT NULL,
    disponible BOOLEAN NOT NULL,
    date_ajout DATE NOT NULL,
    FOREIGN KEY (pays_id) REFERENCES pays(id)
);

-- Insertion des données dans la table cafes
INSERT INTO cafes (
    nom, 
    description, 
    reference, 
    pays_id, 
    prix_kilo, 
    caracteristique_principale, 
    disponible, 
    date_ajout
) 
VALUES 
    ('Espresso', 'Café fort et concentré ...', '100955890', 1, 20.99, 'Corsé', TRUE, '2024-01-05'),
    ('Columbian', 'Café moyennement corsé avec une acidité vive et une saveur riche.', '100955894', 2, 18.75, 'Acide', TRUE, '2023-09-30'),
    ('Ethiopian Yirgacheffe', 'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.', '105589090', 3, 22.50, 'Fruité', TRUE, '2023-06-15'),
    ('Brazilian Santos', 'Café doux et lisse avec un profil de saveur de noisette.', '134009550', 4, 17.80, 'Doux', TRUE, '2019-08-25'),
    ('Guatemalan Antigua', 'Café corsé avec des nuances chocolatées et une pointe d''épice.', '256505890', 5, 21.25, 'Corsé', TRUE, '2020-02-14'),
    ('Kenyan AA', 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.', '295432730', 6, 23.70, 'Acide', TRUE, '2020-07-19'),
    ('Sumatra Mandheling', 'Café profond et terreux avec un corps lourd et une faible acidité.', '302932754', 7, 19.95, 'Corsé', TRUE, '2021-01-30'),
    ('Costa Rican Tarrazu', 'Café vif et net avec une finition propre et une acidité vive.', '327302954', 8, 24.50, 'Acide', TRUE, '2021-05-22'),
    ('Vietnamese Robusta', 'Café audacieux et fort avec une saveur robuste distinctive.', '549549090', 9, 16.75, 'Épicé', TRUE, '2021-11-15'),
    ('Tanzanian Peaberry', 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.', '582954954', 10, 26.80, 'Fruité', TRUE, '2022-03-11'),
    ('Jamaican Blue Mountain', 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.', '589100954', 11, 39.25, 'Doux', TRUE, '2022-07-25'),
    ('Rwandan Bourbon', 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.', '650753915', 12, 21.90, 'Fruité', TRUE, '2022-11-10'),
    ('Panamanian Geisha', 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.', '795501340', 13, 42.00, 'Fruité', TRUE, '2023-02-20'),
    ('Peruvian Arabica', 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.', '954589100', 14, 19.40, 'Chocolaté', FALSE, '2019-03-10'),
    ('Hawaiian Kona', 'Café rare au goût riche, une acidité douce et des nuances subtiles.', '958090105', 15, 55.75, 'Doux', FALSE, '2018-06-21'),
    ('Nicaraguan Maragogipe', 'Café avec des notes de fruits, une acidité vive et un corps plein.', '691550753', 16, 28.60, 'Fruité', FALSE, '2018-01-15');

-- Création de la table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insertion d'un utilisateur exemple
INSERT INTO users (firstname, lastname, email, password) 
VALUES 
    ('Théo', 'Créac''h', 'creach.t@gmail.com', 'password');
    -- Validation de la transaction pour enregistrer les modifications de manière définitive
-- Si une erreur survient avant cette commande, les modifications seront annulées
COMMIT;
