# Utilise une image officielle de Node.js comme base
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tous les fichiers du projet dans le conteneur
COPY . .

# Expose le port utilisé par l'application
EXPOSE 3000

# Définis la commande par défaut pour démarrer l'application
CMD ["npm", "start"]
