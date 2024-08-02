# O'Coffee

## Information du projet

O'Coffee est une boutique de café haut de gamme située dans la ville de Hauts-de-Cloques. L'objectif de ce projet est de créer un site web attrayant et informatif qui présente les produits de la boutique de manière engageante. Initialement, le site servira de catalogue informatif, avec une possible évolution vers une plateforme de e-commerce en fonction des retours des utilisateurs.

Pour plus de détails sur les spécifications du projet, veuillez consulter [la demande du client](./docs/demande-client/).

## Remarques pédagogiques et rendus

Ce projet a été développé en suivant les meilleures pratiques de développement web, en mettant l'accent sur l'accessibilité, la performance et la sécurité. Des recommandations spécifiques et des rendus peuvent être trouvés dans la section [recommandations](./docs/recommandations/).

## Technologies utilisées

Le développement du projet O'Coffee repose sur une stack technologique moderne, permettant une gestion efficace des données, une sécurité renforcée, et une interface utilisateur dynamique.

### Rendu

- **EXPRESS** : Framework web utilisé pour structurer l'application serveur.
- **EJS** : Moteur de templates pour générer des pages HTML dynamiques côté serveur.
- **DOTENV** : Module permettant de charger des variables d'environnement à partir d'un fichier `.env`.
- **DAYJS** : Bibliothèque JavaScript légère pour le formatage et la manipulation des dates.

### Authentification

- **BODY-PARSER** : Middleware pour analyser le corps des requêtes HTTP.
- **EXPRESS-SESSION** : Middleware pour gérer les sessions utilisateurs de manière sécurisée.
- **BCRYPT** : Bibliothèque pour le hachage des mots de passe, assurant une sécurité accrue des données utilisateur.

### Méthode

- **DATAMAPPER** : Patron de conception utilisé pour interagir avec la base de données de manière structurée et sécurisée. Les fonctions de `dataMapper` gèrent les opérations CRUD pour les entités comme les utilisateurs et les produits (cafés).

## Installation et configuration

Pour faciliter la prise en main du projet, voici les étapes pour installer et configurer l'environnement de développement.

### Prérequis

- Node.js
- PostgreSQL
- Docker (optionnel pour la conteneurisation)

### Étapes d'installation

1. Clonez le dépôt GitHub :

   ```bash
   git clone https://github.com/votre-utilisateur/ocoffee.git
   cd ocoffee
   ```

2. Installez les dépendances Node.js :
   
3. 

```bash
    npm install
```

3. Configurez les variables d'environnement :

Créez un fichier .env à la racine du projet.
Ajoutez les variables nécessaires comme DB_HOST, DB_USER, DB_PASSWORD, DB_NAME.

1. Initialisez la base de données :

    Utilisez les scripts SQL fournis dans le dossier database pour créer et peupler les tables.

2. Démarrez l'application :

```bash
    npm start
```

6. Structure du projet

    src/ : Contient le code source de l'application.
        controllers/ : Gère la logique métier.
        models/ : Contient les fichiers dataMapper.js pour les opérations sur la base de données.
        views/ : Contient les templates EJS pour le rendu des pages.
        public/ : Contient les fichiers statiques (CSS, JavaScript, images).

7. Contribution

Les contributions au projet sont les bienvenues. Veuillez suivre les étapes suivantes pour contribuer :

    Forkez le dépôt.
    Créez une branche pour votre fonctionnalité (git checkout -b feature/nouvelle-fonctionnalité).
    Committez vos modifications (git commit -am 'Ajoutez une nouvelle fonctionnalité').
    Poussez votre branche (git push origin feature/nouvelle-fonctionnalité).
    Ouvrez une Pull Request.
