
# Deploying the O'Coffee Application with PM2

This document outlines the steps required to deploy the O'Coffee application using PM2, a process manager for Node.js.

## **Prerequisites**

- Node.js installed on the server.
- A Git repository containing the application's source code.
- PM2 installed globally on the server.

---

## **Deployment Steps**

### 1. Clone the Git Repository

Retrieve the application's source code from the **Git repository**:

```bash
git clone https://github.com/yourproject/ocoffee.git
cd ocoffee
```

### 2. Install Dependencies

Install the required dependencies using **npm**:

```bash
npm install
```

### 3. Start the Application with PM2

Launch the application using **PM2**:

```bash
pm2 start app.js --name ocoffee
```

### 4. Save the PM2 Configuration

To ensure **automatic restart** after a server reboot:

```bash
pm2 save
pm2 startup
```

### 5. Monitor the Application

To view the **logs**:

```bash
pm2 logs ocoffee
```

To monitor **performance**:

```bash
pm2 monit
```

### 6. Redeploy After an Update

Fetch the **latest changes**:

```bash
git pull
```

**Restart** the application:

```bash
pm2 restart ocoffee
```
