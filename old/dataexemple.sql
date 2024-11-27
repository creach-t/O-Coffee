-- Début d'une transaction pour garantir l'exécution atomique
-- Si une erreur survient, toutes les modifications seront annulées
BEGIN;

-- Suppression de la table existante si elle existe
DROP TABLE IF EXISTS cafes;

-- Création de la table pour les cafés
CREATE TABLE cafes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    reference VARCHAR(20) NOT NULL UNIQUE,
    origine VARCHAR(100) NOT NULL,
    code_pays VARCHAR(10) NOT NULL,
    prix_kilo NUMERIC(6, 2) NOT NULL,
    caracteristique_principale VARCHAR(50) NOT NULL,
    disponible BOOLEAN NOT NULL,
    date_ajout DATE NOT NULL
);

-- Insertion des données dans la table
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
    ('Espresso', 'Café fort et concentré ...', 
    '100955890', 1, 20.99, 'Corsé', 
    TRUE, '2024-01-05'),
    -- pays_id = 1 correspond au pays Italie
    -- Autres valeurs...

    ('Nicaraguan', 
    'Café avec des notes de fruits', 
    '691550753', 16, 
    28.60, 'Fruité', FALSE, '2018-01-15');
    -- pays_id = 16 correspond au pays Nicaragua

-- Validation de la transaction pour enregistrer les modifications de manière définitive
-- Si une erreur survient avant cette commande, les modifications seront annulées
COMMIT;
