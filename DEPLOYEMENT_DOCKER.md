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

### 2. Créer un fichier Dockerfile

- Ajoutez ce fichier Dockerfile dans le répertoire racine du projet :

```bash
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "start"]
```

### 3. Construire l'image Docker

- Construisez une image Docker à partir du Dockerfile :

```bash
docker-compose up --build
```

MODIFIER LA VARIABLE D'ENVIRONNEMENT en remplacant par db:5432 PG_URL=postgres://coffee:coffee@db:5432/coffee

### 4. Lancer le conteneur

- Exécutez l'image Docker en créant un conteneur et en exposant le port 3000 :

```bash
docker run -d -p 3000:3000 --name ocoffee-container ocoffee
```

### 5. Superviser le conteneur

- Vérifiez les conteneurs en cours d'exécution :

```bash
docker ps
```

- Consultez les logs du conteneur :

```bash
docker logs ocoffee-container
```

### 6. Redéployer après une mise à jour

- Supprimez le conteneur existant :

```bash
docker rm -f ocoffee-container
```

- Reconstruisez l'image Docker :

```bash
docker build -t ocoffee .
```

- Relancez le conteneur :

```bash
docker run -d -p 3000:3000 --name ocoffee-container ocoffee-app
```

## Documentation supplémentaire

Docker Documentation
Best Practices for Dockerfiles
