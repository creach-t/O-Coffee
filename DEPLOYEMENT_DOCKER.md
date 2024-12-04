
# Deploying the O'Coffee Application with Docker

This document explains how to containerize and deploy the O'Coffee application using Docker.

## **Prerequisites**

- Docker installed on the server.
- A Git repository containing the application's source code.

---

## **Deployment Steps**

### 1. Clone the Git Repository

- Retrieve the application's source code:

```bash
git clone https://github.com/yourproject/ocoffee.git
cd ocoffee
```

### 2. Prerequisites

- A `docker-compose.yml` file is present in the repository but may not be fully configured for all environments.
- Review the `docker-compose.yml` file and adjust it according to your environment.
- Copy the `.env.example` file, rename it to `.env`, and update it according to your environment.

### 3. Launch the Container

- Build and run the Docker image in detached mode `-d` (does not block the console):

```bash
docker compose up --build -d
```

### 4. Monitor the Container

- Check the running containers:

```bash
docker ps
```

- View the container logs:

```bash
docker logs container_name
```

### 6. Redeploy After an Update

- Stop and remove the existing containers:

```bash
docker compose down --remove-orphans
```

- Fetch the **latest changes**:

```bash
git pull
```

- Rebuild and run the Docker image in detached mode:

```bash
docker compose up --build -d
```

## Additional Documentation

- [Docker Documentation](https://docs.docker.com/)
- [Best Practices for Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
