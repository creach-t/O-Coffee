-- Suppression de la table existante si elle existe
DROP TABLE IF EXISTS cafes;

-- Création de la table pour les cafés
CREATE TABLE cafes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    reference VARCHAR(20) NOT NULL UNIQUE,
    origine VARCHAR(100) NOT NULL,
    prix_kilo NUMERIC(6, 2) NOT NULL,
    caracteristique_principale VARCHAR(50) NOT NULL,
    disponible BOOLEAN NOT NULL,
    date_ajout DATE NOT NULL
);

-- Insertion des données dans la table
INSERT INTO cafes (nom, description, reference, origine, prix_kilo, caracteristique_principale, disponible, date_ajout) VALUES
('Espresso', 'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.', '100955890', 'Italie', 20.99, 'Corsé', TRUE, '2018-01-15'),
('Columbian', 'Café moyennement corsé avec une acidité vive et une saveur riche.', '100955894', 'Colombie', 18.75, 'Acide', TRUE, '2018-06-21'),
('Ethiopian Yirgacheffe', 'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.', '105589090', 'Éthiopie', 22.50, 'Fruité', TRUE, '2019-03-10'),
('Brazilian Santos', 'Café doux et lisse avec un profil de saveur de noisette.', '134009550', 'Brésil', 17.80, 'Doux', TRUE, '2019-08-25'),
('Guatemalan Antigua', 'Café corsé avec des nuances chocolatées et une pointe d''épice.', '256505890', 'Guatemala', 21.25, 'Corsé', TRUE, '2020-02-14'),
('Kenyan AA', 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.', '295432730', 'Kenya', 23.70, 'Acide', TRUE, '2020-07-19'),
('Sumatra Mandheling', 'Café profond et terreux avec un corps lourd et une faible acidité.', '302932754', 'Indonésie', 19.95, 'Corsé', TRUE, '2021-01-30'),
('Costa Rican Tarrazu', 'Café vif et net avec une finition propre et une acidité vive.', '327302954', 'Costa Rica', 24.50, 'Acide', TRUE, '2021-05-22'),
('Vietnamese Robusta', 'Café audacieux et fort avec une saveur robuste distinctive.', '549549090', 'Vietnam', 16.75, 'Épicé', TRUE, '2021-11-15'),
('Tanzanian Peaberry', 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.', '582954954', 'Tanzanie', 26.80, 'Fruité', TRUE, '2022-03-11'),
('Jamaican Blue Mountain', 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.', '589100954', 'Jamaïque', 39.25, 'Doux', TRUE, '2022-07-25'),
('Rwandan Bourbon', 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.', '650753915', 'Rwanda', 21.90, 'Fruité', TRUE, '2022-11-10'),
('Panamanian Geisha', 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.', '795501340', 'Panama', 42.00, 'Fruité', TRUE, '2023-02-20'),
('Peruvian Arabica', 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.', '954589100', 'Pérou', 19.40, 'Chocolaté', FALSE, '2023-06-15'),
('Hawaiian Kona', 'Café rare au goût riche, une acidité douce et des nuances subtiles.', '958090105', 'Hawaï', 55.75, 'Doux', FALSE, '2023-09-30'),
('Nicaraguan Maragogipe', 'Café avec des notes de fruits, une acidité vive et un corps plein.', '691550753', 'Nicaragua', 28.60, 'Fruité', FALSE, '2024-01-05');
