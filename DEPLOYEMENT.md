
# Deploying the O'Coffee Application with PM2

This document outlines the steps required to deploy the O'Coffee application using PM2, a process manager for Node.js.

## **Prerequisites**

- Node.js installed on the server.
- A Git repository containing the application's source code.
- PM2 installed globally on the server (`npm install -g pm2`).
- PostgreSQL installed on the server.

---

## **Deployment Steps**

### 1. Clone the Git Repository

Retrieve the application's source code from the **Git repository**:

```bash
git clone https://github.com/creach-t/O-Coffee.git
cd O-Coffee
```

### 2. Install Dependencies

Install the required dependencies using **npm**:

```bash
npm install
```

### 3. Set Up PostgreSQL Database

Create a PostgreSQL user and database for the application:

```bash
sudo -u postgres createuser --createdb --pwprompt coffee
sudo -u postgres createdb --owner=coffee coffee
```

### 4. Import Data

Import the initial data using the provided SQL file:

```bash
psql -U coffee -d coffee -f data/data.sql
```

*Note: You may be prompted to enter the password for the 'coffee' user.*

### 5. Configure Environment Variables

Create a `.env` file at the root of the project:

```bash
cp .env.example .env
```

Edit the `.env` file to match your environment settings:

```
PORT=3000
PG_URL=postgres://coffee:password@localhost:5432/coffee
```

Replace `password` with the password you set for the 'coffee' user.

### 6. Start the Application with PM2

Launch the application using **PM2**:

```bash
pm2 start app.js --name ocoffee
```

### 7. Save the PM2 Configuration

To ensure **automatic restart** after a server reboot:

```bash
pm2 save
pm2 startup
```

Follow the instructions provided by the `pm2 startup` command to set up the startup script.

### 8. Monitor the Application

To view the **logs**:

```bash
pm2 logs ocoffee
```

To monitor **performance**:

```bash
pm2 monit
```

### 9. Redeploy After an Update

Fetch the **latest changes**:

```bash
git pull
```

Install any new dependencies:

```bash
npm install
```

**Restart** the application:

```bash
pm2 restart ocoffee
```

## Troubleshooting

### Database Connection Issues

If you encounter issues connecting to the database:

1. Verify that PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql
   ```

2. Check the PostgreSQL logs:
   ```bash
   sudo tail -f /var/log/postgresql/postgresql-[version]-main.log
   ```

3. Ensure your `.env` file has the correct database connection string.

### PM2 Issues

If PM2 is not behaving as expected:

1. Check the status of your applications:
   ```bash
   pm2 list
   ```

2. View detailed information about a specific application:
   ```bash
   pm2 show ocoffee
   ```

3. Restart PM2:
   ```bash
   pm2 kill
   pm2 start app.js --name ocoffee
   pm2 save
   ```
