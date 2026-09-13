# Image de production O'Coffee (serveur Express)
FROM node:18

WORKDIR /app

ENV NODE_ENV=production

# Installe uniquement les dependances de production (lockfile fige les versions)
COPY package*.json ./
RUN npm ci --omit=dev

# Copie le code applicatif (voir .dockerignore pour les exclusions)
COPY . .

# Port applicatif (surchargé par la variable PORT au runtime)
EXPOSE 2584

CMD ["npm", "start"]
