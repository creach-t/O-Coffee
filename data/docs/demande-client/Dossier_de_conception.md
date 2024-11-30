# Dossier de Conception – Projet O'Coffee

## 1. Contexte et Objectifs

O'Coffee, une boutique de café haut de gamme située à Hauts-de-Cloques, souhaite moderniser son site web existant. Actuellement simple vitrine, le site doit devenir une plateforme dynamique capable de présenter un catalogue de produits et d’évoluer à terme vers une solution de e-commerce.

### Objectifs du Projet
- **Refonte du site web** : Transformer le site vitrine en un site interactif et dynamique.
- Mise en place d'un catalogue en ligne : Permettre la navigation dans un catalogue de produits (cafés), avec des détails sur chaque produit.
- Accessibilité et éco-conception : Créer un site respectant les normes d'accessibilité et intégrant des principes d’éco-conception.
- Prépation au e-commerce : Concevoir une plateforme évolutive vers une boutique en ligne.
________________________________________
### 1. Développement et Technologies Utilisées
Environnement de Développement
•	Visual Studio Code : Editeur de code configuré avec Prettier et ESLint pour maintenir une qualité de code optimale.
•	Node.js : Utilisé pour exécuter le code JavaScript côté serveur.
•	Express : Framework structurant l'application et gérant les routes.
•	EJS (Embedded JavaScript) : Moteur de template pour générer des pages HTML dynamiques.
Base de Données
•	PostgreSQL : SGBD relationnel pour stocker les informations sur les produits et les utilisateurs.
•	Requêtes SQL : Utilisation de requêtes préparées pour éviter les injections SQL et assurer l’intégrité des données.
Sécurité
•	bcrypt : Hachage des mots de passe pour garantir leur sécurité.
•	OWASP : Mise en œuvre des bonnes pratiques de sécurité décrites par l’OWASP pour protéger les données sensibles.
Gestion de Version
•	Git : Suivi des versions et des contributions via un dépôt GitHub, assurant une collaboration organisée et efficace.
o	Les fonctionnalités liées au MVP (site de présentation et catalogue) et celles de l'évolution future (e-commerce) ont été séparées dans des commits distincts pour clarifier la progression du projet.
o	Remarque : Dans un contexte de production réel, il aurait été préférable d'utiliser des branches séparées pour distinguer clairement le MVP de l'évolution vers le e-commerce.
________________________________________
1. Architecture et Fonctionnalités Développées
Architecture MVC
Le projet suit l'architecture MVC (Modèle-Vue-Contrôleur) :
•	Modèle (dataMapper) : Interagit avec la base de données pour récupérer, insérer, ou mettre à jour les données.
•	Vues (EJS) : Génèrent des pages dynamiques en affichant les informations fournies par les contrôleurs.
•	Contrôleurs : Gèrent la logique métier et les interactions utilisateur.
Fonctionnalités Clés
1.	Affichage Dynamique des Produits
o	Les produits sont affichés de manière dynamique dans le catalogue, avec un focus sur les nouveautés et promotions.
o	Utilisation des contrôleurs et des vues EJS pour afficher les données récupérées via le dataMapper.
2.	Gestion des Détails des Produits
o	Chaque produit dispose d’une page dédiée avec des informations détaillées (description, disponibilité, prix).
3.	Gestion des Utilisateurs
o	Fonctionnalités d’inscription avec validation des données, hachage sécurisé des mots de passe (bcrypt) et vérification de l'unicité des emails.
o	Connexion sécurisée avec vérification des identifiants.
4.	Gestion du Panier
o	Ajout, modification et suppression de produits dans le panier.
o	Stockage temporaire des informations utilisateur via des sessions.
5.	Préparation à l'Évolution vers le E-Commerce
o	Bien que le site soit initialement un catalogue informatif, plusieurs fonctionnalités ont été conçues pour une transition future vers une plateforme de e-commerce :
	Gestion des comptes utilisateurs (création, connexion, déconnexion).
	Système de panier dynamique permettant l'ajout, la modification, et la suppression de produits.
o	Ces fonctionnalités ont été intégrées dans le projet tout en séparant leur développement dans des commits distincts pour différencier clairement le MVP de l’évolution future.
________________________________________
1. Schéma de la Base de Données
Les principales tables conçues sont :
1.	Table cafes :
o	id (Primary Key)
o	reference (Unique)
o	name
o	description
o	price
o	available (Boolean)
2.	Table users :
o	id (Primary Key)
o	firstname
o	lastname
o	email (Unique)
o	password (Hashed via bcrypt)
Les relations entre les entités permettent de lier les utilisateurs et les produits commandés (prévu pour une évolution future vers le e-commerce).
________________________________________
1. Documentation et Tests
Documentation
•	Code source documenté avec des commentaires en anglais pour expliquer les fonctions principales.
•	Fichier README dans le dépôt GitHub pour décrire le projet, son installation, et ses fonctionnalités.
Tests Réalisés
1.	Tests Unitaires :
o	Réalisés avec Jest pour valider les fonctionnalités clés des contrôleurs et du dataMapper.
o	Exemples : vérification de la création d'un utilisateur, gestion des erreurs SQL.
2.	Tests de Sécurité :
o	Validation des entrées utilisateur pour prévenir les attaques par injection SQL.
o	Simulation de scénarios malveillants (ex : emails invalides, mots de passe faibles).
3.	Jeu d’Essai Fonctionnel :
o	Utilisation de PG Admin pour tester manuellement les requêtes SQL avec des données réelles.
Qualité du Code
•	Utilisation d’ESLint pour analyser et corriger les éventuelles erreurs de syntaxe ou incohérences dans le code.
________________________________________
1. Conclusion
Le projet O'Coffee a permis de transformer un site vitrine en une plateforme dynamique et sécurisée, offrant une expérience utilisateur fluide et adaptée à une clientèle moderne. La structure MVC et les choix technologiques garantissent la maintenabilité et l’évolutivité du site, en particulier pour une transition future vers le e-commerce. La gestion des comptes utilisateurs et du panier montre que cette évolution est déjà en cours, bien que distinguée du MVP par des commits structurés. Le respect des normes d’accessibilité, de sécurité, et de qualité a été une priorité tout au long du développement.

