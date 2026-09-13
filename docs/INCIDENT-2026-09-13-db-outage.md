# Incident — Prod down : base de données injoignable (2026-09-13)

> Postmortem + runbook. Site concerné : <https://ocoffee.creachtheo.fr>

## Résumé

Le site de production ne répondait plus (timeout total, `HTTP 000`). L'application
tournait mais **toutes les requêtes restaient bloquées** car l'app ne parvenait plus
à joindre PostgreSQL :

```
Database connection error: connect ECONNREFUSED 172.18.0.4:5432
```

## Chaîne de diagnostic

| Étape | Constat |
|-------|---------|
| `curl` prod | timeout, 0 octet, même après 105 s |
| Racine `creachtheo.fr` | `HTTP 200` en 0,2 s → **edge Cloudflare sain** |
| Handshake TLS vers l'edge | OK → Cloudflare termine bien le TLS |
| Conteneur app (`o-coffee-ocoffee-1`) | `Up`, mais `wget localhost:2584` **hang** puis KO |
| Logs app | `ECONNREFUSED 172.18.0.4:5432` |
| Réseau `traefik-public` | **`172.18.0.4` = le conteneur de l'app lui-même** |
| PostgreSQL | tournait **nativement sur l'hôte**, exposé sur `45.90.121.7:5432` (IP publique) |

## Cause racine

`PG_HOST` dans le `.env` de prod était une **IP Docker figée** (`172.18.0.4`). Les IP
du bridge Docker sont réattribuées à chaque recréation de conteneur. Après un
redémarrage, cette IP a été réattribuée au conteneur applicatif ; l'app tentait donc
de se connecter à PostgreSQL **sur sa propre IP**, où rien n'écoutait → `ECONNREFUSED`.

Aggravant : le pool `pg` n'avait **ni `connectionTimeoutMillis` ni `statement_timeout`**,
donc les requêtes pendaient au lieu d'échouer vite → hang remontant jusqu'à Cloudflare.

## Résolution appliquée

La base a été **migrée de l'hôte vers un conteneur** (règle le point d'IP figée *et*
l'exposition publique de PostgreSQL) :

1. Sauvegarde : `sudo -u postgres pg_dump -Fc ocoffee > /root/ocoffee_backup_<date>.dump`
2. Conteneur PostgreSQL 14 (même version majeure que l'hôte, sinon refus de démarrage) :
   ```bash
   docker run -d --name o-coffee-db --restart unless-stopped \
     --network traefik-public \
     -e POSTGRES_USER=ocoffee -e POSTGRES_PASSWORD=<.env> -e POSTGRES_DB=ocoffee \
     -v o-coffee_postgres-data:/var/lib/postgresql/data \
     postgres:14-alpine
   ```
3. Restauration (dump custom = fichier seekable, **pas** via stdin) :
   ```bash
   docker cp <dump> o-coffee-db:/tmp/o.dump
   docker exec -e PGPASSWORD=<.env> o-coffee-db \
     pg_restore -U ocoffee -d ocoffee --no-owner --no-privileges /tmp/o.dump
   ```
4. Repointage app : `PG_HOST=o-coffee-db` (nom de service, **jamais une IP**), puis
   `docker compose -p o-coffee -f docker-compose.prod.yml up -d --force-recreate ocoffee`.
5. Vérif : log `Connected to the database successfully!` + site `HTTP 200`.

Tables restaurées : `cafes`, `pays`, `users`.

## Actions de suivi (à faire)

- [ ] **Durabilité CI** — le job de déploiement lance `docker compose up -d
  --force-recreate --remove-orphans`. Le conteneur `o-coffee-db` a été créé **à la
  main** : `--remove-orphans` le **supprimera au prochain déploiement**. Il faut
  déclarer le service `db` dans `docker-compose.prod.yml` (voir bloc ci-dessous).
- [ ] **Décommissionner PostgreSQL de l'hôte** une fois la prod stable : arrêt du
  service, puis fermeture du `5432` public (il était exposé sur l'IP publique).
- [ ] **Durcir le pool** dans `app/database.js` : `connectionTimeoutMillis` +
  `statement_timeout` pour échouer vite plutôt que hang.

### Service `db` à ajouter dans `docker-compose.prod.yml`

```yaml
services:
  db:
    image: postgres:14-alpine
    container_name: o-coffee-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${PG_USER}
      POSTGRES_PASSWORD: ${PG_PASSWORD}
      POSTGRES_DB: ${PG_DB}
    volumes:
      - postgres-data:/var/lib/postgresql/data   # → volume o-coffee_postgres-data
    networks:
      - traefik-public

  ocoffee:
    depends_on:
      - db
    # ... (config existante)

volumes:
  postgres-data:
```

> Avec `PG_HOST=o-coffee-db`, l'app résout la base par **nom** via le DNS Docker du
> réseau `traefik-public` — plus aucune dépendance à une IP.
