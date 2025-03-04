
# Deploying the O'Coffee Application with Docker

This document explains how to containerize and deploy the O'Coffee application using Docker.

## **Prerequisites**

- Docker installed on the server.
- Docker Compose installed on the server.
- A Git repository containing the application's source code.

---

## **Deployment Steps**

### 1. Clone the Git Repository

Retrieve the application's source code:

```bash
git clone https://github.com/creach-t/O-Coffee.git
cd O-Coffee
```

### 2. Configure Environment Variables

Create a `.env` file from the example template:

```bash
cp .env.example .env
```

Edit the `.env` file to match your environment settings. For Docker deployment, ensure your database configuration points to the Docker PostgreSQL service:

```
PORT=3000
PG_URL=postgres://coffee:coffee@postgres:5432/coffee
```

### 3. Review and Configure Docker Compose

The `docker-compose.yml` file should include both the application and PostgreSQL services. If it doesn't exist or needs modification, create/update it with the following content:

```yaml
version: '3.8'

services:
  app:
    build: .
    container_name: ocoffee-app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - PG_URL=postgres://coffee:coffee@postgres:5432/coffee
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:14
    container_name: ocoffee-db
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=coffee
      - POSTGRES_PASSWORD=coffee
      - POSTGRES_DB=coffee
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./data/data.sql:/docker-entrypoint-initdb.d/data.sql
    restart: unless-stopped

volumes:
  postgres_data:
```

Ensure the `./data/data.sql` path points to your SQL data file.

### 4. Create a Dockerfile

If not already present, create a `Dockerfile` in the root directory:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

### 5. Launch the Containers

Build and run the Docker containers in detached mode:

```bash
docker compose up --build -d
```

This command will:
- Build the application image
- Create and start the PostgreSQL container
- Import the initial database data
- Create and start the application container

### 6. Monitor the Containers

Check the running containers:

```bash
docker ps
```

View the container logs:

```bash
# For the application container
docker logs ocoffee-app

# For the database container
docker logs ocoffee-db
```

### 7. Access the Application

The application should now be accessible at:

```
http://your-server-ip:3000
```

### 8. Redeploy After an Update

Stop and remove the existing containers:

```bash
docker compose down
```

Fetch the latest changes:

```bash
git pull
```

Rebuild and run the Docker containers:

```bash
docker compose up --build -d
```

## Troubleshooting

### Database Connection Issues

If the application cannot connect to the database:

1. Check the database container status:
   ```bash
   docker logs ocoffee-db
   ```

2. Verify that the database is properly initialized:
   ```bash
   docker exec -it ocoffee-db psql -U coffee -d coffee -c "\dt"
   ```

3. Confirm the connection string in the `.env` file or Docker Compose environment variables.

### Container Startup Issues

If containers fail to start:

1. Check for port conflicts:
   ```bash
   netstat -tuln | grep 3000
   netstat -tuln | grep 5432
   ```

2. View detailed container logs:
   ```bash
   docker logs ocoffee-app
   ```

3. Try rebuilding the containers:
   ```bash
   docker compose down
   docker compose up --build
   ```

## Additional Documentation

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices for Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
