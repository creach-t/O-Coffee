
# O'Coffee

## Project Information

O'Coffee is a premium coffee shop located in the city of Hauts-de-Cloques. The objective of this project is to create an attractive and informative website that showcases the shop's products in an engaging manner. Initially, the website will serve as an informational catalog, with the possibility of evolving into an e-commerce platform based on user feedback.

For more details on the project specifications, please refer to the [client's request](./docs/demande-client/).

## Pedagogical Notes and Deliverables

This project was developed following the best practices of web development, with a strong focus on accessibility, performance, and security.

## Technologies Used

The development of the O'Coffee project is based on a modern technology stack, enabling efficient data management, enhanced security, and a dynamic user interface.

### Deliverables

- **EXPRESS**: Web framework used to structure the server application.
- **EJS**: Template engine to generate dynamic HTML pages on the server side.
- **DOTENV**: Module for loading environment variables from a `.env` file.
- **DAYJS**: Lightweight JavaScript library for formatting and manipulating dates.

### Authentication

- **BODY-PARSER**: Middleware to parse HTTP request bodies.
- **EXPRESS-SESSION**: Middleware to manage user sessions securely.
- **BCRYPT**: Library for password hashing, ensuring enhanced user data security.

### Methodology

- **DATAMAPPER**: Design pattern used to interact with the database in a structured and secure manner. The `dataMapper` functions manage CRUD operations for entities like users and products (coffee).

## Installation and Configuration

To facilitate project onboarding, here are the steps to install and configure the development environment.

### Prerequisites

- Node.js
- PostgreSQL

### Installation Steps

#### 1. Clone the GitHub Repository

```bash
git clone https://github.com/your-username/ocoffee.git
cd ocoffee
```

#### 2. Install Node.js Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

**Create a `.env` file at the root of the project.**
**Use `.env.example` as a template.**

#### 4. Initialize the Database

Load the schema and dataset into your PostgreSQL database:

```bash
psql -U <PG_USER> -d <PG_DB> -f data/data.sql
```

#### 5. Start the Application

```bash
npm start      # production
npm run dev    # development (node --watch)
npm test       # run the Jest test suite
```

### Project Structure

The application follows a lightweight **MVC** pattern:

- `app.js`: Application entry point (Express server, session, static files).
- `app/router.js`: Maps URLs to controller handlers.
- `app/controllers/`: Request handling and business logic
  (`mainController`, `authController`, `cartController`).
- `app/dataMapper.js`: **DataMapper** — centralized SQL access layer (CRUD on
  `cafes`, `pays`, `users`).
- `app/database.js`: PostgreSQL connection (`pg`).
- `app/middlewares/`: Custom middleware (`cartCalculation`).
- `app/views/`: EJS templates for page rendering.
- `public/`: Static files (CSS, JavaScript, images).
- `data/data.sql`: Database schema and seed dataset.

## Architecture & Documentation

- [Architecture map (graph + Mermaid diagrams)](docs/ARCHITECTURE.md)
- [Audit report](docs/AUDIT.md)

## Deployment

- [Deployment with PM2](DEPLOYEMENT.md)
- [Deployment with Docker](DEPLOYEMENT_DOCKER.md)
