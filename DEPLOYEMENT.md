# Déploiement de l'application O'Coffee avec PM2

Ce document décrit les étapes nécessaires pour déployer l'application O'Coffee en utilisant PM2, un gestionnaire de processus pour Node.js.

## **Prérequis**

- Node.js installé sur le serveur.
- Dépôt Git contenant le code source de l'application.
- PM2 installé globalement sur le serveur.

---

## **Étapes de déploiement**

### 1. Cloner le dépôt Git

Récupérez le code source de l'application depuis le **dépôt Git** :

```bash
git clone https://github.com/monprojet/ocoffee.git
cd ocoffee
```

### 2. Installer les dépendances

Installez les dépendances nécessaires via **npm** :

```bash
npm install
```

### 3. Lancer l'application avec PM2

Démarrez l'application en utilisant **PM2** :

```bash
pm2 start app.js --name ocoffee
```

### 4. Sauvegarder la configuration de PM2

Pour assurer un **redémarrage automatique** après un reboot du serveur :

```bash
pm2 save
pm2 startup
```

### 5. Superviser l'application

Pour voir les **logs** :

```bash
pm2 logs ocoffee
```

Pour surveiller les **performances** :

```bash
    pm2 monit
```

### 6. Redéployer après une mise à jour

Récupérez les **dernières modifications** :

```bash
git pull origin main
```

**Redémarrez** l'application :

```bash
pm2 restart ocoffee
```
