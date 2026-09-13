# Rapport d'audit — O'Coffee

**Date :** 2026-08-19
**Périmètre :** code source `app/`, comparé au graphe `graphe-code-memory`.
**État graphe :** projet `E-Projets-SSD-O-Coffee` — 231 nœuds / 313 arêtes (indexation initiale).

## 1. Synchronisation du graphe MCP

Le projet **n'était pas encore indexé** dans `graphe-code-memory`. L'audit a donc
procédé à une **première cartographie complète** :

- Indexation `full` du dépôt (exclusions : `.git`, `.vscode`, `node_modules`).
- Extraction de 38 modules, 29 fonctions, 3 tables SQL, 11 variables d'environnement.
- Persistance de l'artefact dans `.codebase-memory/graph.db.zst`.
- Enregistrement d'un **ADR-001** (décisions structurantes + dette) dans le graphe.

Le graphe est désormais **fidèle au code réel** : les 25 arêtes `CALLS` correspondent
exactement aux appels contrôleurs → DataMapper observés dans les sources.

## 2. Écarts détectés (code réel vs documentation existante)

| # | Écart | Réalité du code | Impact |
|---|-------|-----------------|--------|
| D1 | `README.md` décrit `src/`, `models/` | Structure réelle : `app/controllers`, `app/dataMapper.js`, `app/views` | Doc trompeuse |
| D2 | `README.md` référence `npm run setup-db` | Script absent de `package.json` (`dev`, `start`, `test` seulement) | Onboarding cassé |

## 3. Dette technique dans le code — corrigée sur `fix/audit-corrections`

| # | Sévérité | Fichier | Constat | Statut |
|---|----------|---------|---------|--------|
| C1 | Moyenne | `app/dataMapper.js` | `getCoffeeDispoByCategories` défini mais **jamais appelé** (code mort) | ✅ supprimé |
| C2 | Faible  | `app.js` | `app.use(router)` appelé **deux fois** (montage redondant) | ✅ dédupliqué + view engine en tête |
| C3 | Moyenne | `app.js` | Favicon : `./public/images/logo.svg` — dossier réel `public/image/` (**singulier**) → 404 | ✅ chemin corrigé |
| C4 | Moyenne | `app/controllers/cartController.js` | `update` fait `parseInt(reference)` alors qu'`addToCart`/`deleteFromCart` gardent `reference` en **chaîne** | ✅ chaîne + appel DB inutile retiré |
| C5 | Faible  | `app/database.js` | Connexion via `Client` unique plutôt qu'un `Pool` | ✅ `Pool` + listener `error` |
| C6 | Info    | `app.js` | Middleware global de gestion d'erreurs commenté (désactivé) | ⏳ laissé en l'état (choix produit) |

**Durcissement session** : `cookie.secure` désormais piloté par `NODE_ENV === "production"`.
**Tests** : 26/26 verts après corrections.

## 4. Sécurité (constats)

- ✅ Mots de passe hachés via **bcrypt** (`saltRounds = 10`).
- ✅ Verrouillage anti-bruteforce (`MAX_ATTEMPTS = 5`, `LOCK_TIME = 5 min`) — mais
  stocké **en mémoire** (`loginAttempts`), donc réinitialisé au redémarrage et non
  partagé entre instances.
- ⚠️ `session.cookie.secure = false` et `saveUninitialized: true` (`app.js`) — à durcir
  en production (HTTPS + `secure: true`).
- ⚠️ Dépendance `csrf-csrf` présente dans `package.json` mais **aucune protection CSRF
  branchée** sur les routes POST (`/login`, `/signup`).

## 5. Couverture de test

| Cible | Testé | Fichier |
|-------|-------|---------|
| `dataMapper` (9 méthodes) | ✅ | `app/datamapper.test.js` |
| `authController` (login/signup/logout) | ✅ | `app/controllers/authController.test.js` |
| `cartController` | ❌ | — |
| `mainController` | ❌ | — |

## 6. État de santé global

**Application saine et cohérente** pour un projet pédagogique MVC. Le noyau
(routeur → contrôleurs → DataMapper → PostgreSQL) est propre, testé côté données et
authentification. Les points à traiter en priorité :

1. **C3** (favicon cassé) et **D1/D2** (doc obsolète) — corrections rapides.
2. **C4** (incohérence de type sur `reference`) — risque fonctionnel réel sur le panier.
3. **CSRF** non branché — durcissement sécurité avant toute mise en production.
4. **C1** (code mort) — supprimer ou brancher `getCoffeeDispoByCategories`.

## 7. Comment régénérer cette cartographie

```bash
# Réindexer le graphe après des modifications de code (via le MCP graphe-code-memory)
#   index_repository(repo_path="E:/Projets SSD/O-Coffee", mode="full")
#   detect_changes(project="E-Projets-SSD-O-Coffee")  # impact des changements
#   get_architecture(project="E-Projets-SSD-O-Coffee", aspects=["all"])
```
