# Déploiement de l'application O'Coffee avec Docker

Ce document explique comment conteneuriser et déployer l'application O'Coffee en utilisant Docker.

## **Prérequis**

- Docker installé sur le serveur.
- Dépôt Git contenant le code source de l'application.

---

## **Étapes de déploiement**

### 1. Cloner le dépôt Git

- Récupérez le code source de l'application :

```bash
git clone https://github.com/monprojet/ocoffee.git
cd ocoffee
```

### 2. Prérequis

- un fichier `docker-compose.yml` est present dans le depot mais ne correspond pas forcement à tout les environnements.
- Verifier le fichier docker-compose.yml et l'ajuster selon son environnement.
- Copier le fichier `.env.example` le renommer `.env` et le mettre à jour le fichier selon son environnement.

### 3. Lancer le conteneur

- Construisez et exécutez l'image Docker en mode detaché `-d` (ne bloque pas la console) :

```bash
docker compose up --build -d
```

### 4. Superviser le conteneur

- Vérifiez les conteneurs en cours d'exécution :

```bash
docker ps
```

- Consultez les logs du conteneur :

```bash
docker logs nom_du_container
```

### 6. Redéployer après une mise à jour

- Supprimez les conteneurs existant :

```bash
docker compose down --remove-orphans
```

- Récupérez les **dernières modifications** :

```bash
git pull
```

- Reconstruisez et executer l'image Docker en mode détaché :

```bash
docker compose up --build -d
```

## Documentation supplémentaire

Docker Documentation
Best Practices for Dockerfiles
