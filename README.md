# Predictive Frontend - Docker Compose Setup

This guide walks you through downloading, building, and running the Predictive Frontend application using **Docker Compose**.

---

## 📦 Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <YOUR_REPO_URL> predictive-frontend
cd predictive-frontend
```

### 2️⃣ Create Environment File
Create a `.env` file in the project root directory with the required environment variables:

```bash
# Copy the example environment file (if available)
cp .env.example .env

# Or create a new .env file
touch .env
```

Edit the `.env` file and add your configuration variables:
```env
# Predictive Frontend Environment Variables
VITE_APP_BACKENDURL="https://qa-dev-api.quantifiedante.com/"
VITE_APP_FRONTENDURL="http://localhost:3000/predictive-application/"
VITE_APP_WEBSITEURL="http://localhost:5173/"
VITE_APP_SERVER="STAGING"
```

> **Note:** Make sure to replace the placeholder values with your actual configuration. Never commit sensitive information like API keys or database credentials to version control.

### 3️⃣ Build and Run the Application
Run the following command to build and start the container:
```bash
docker-compose up --build -d
```

### 4️⃣ Access the Application
Once the container is running, open your browser and visit:
```
http://localhost:3000
```

### 5️⃣ Stop the Application
To stop the running container:
```bash
docker-compose down
```

---

## 🛠 Common Commands

- View container logs:
```bash
docker-compose logs -f
```

- Rebuild without cache:
```bash
docker-compose build --no-cache
```

- Restart services:
```bash
docker-compose restart
```

- Check running containers:
```bash
docker-compose ps
```

- Login to container for package management:
```bash
# Access the running container shell
docker-compose exec <service_name> bash

# Or if bash is not available, use sh
docker-compose exec <service_name> sh

# Install npm packages inside the container
docker-compose exec <service_name> npm install <package_name>

# Example: Install a specific package
docker-compose exec app npm install axios
```

---

## 🔧 Environment Variables

The application requires the following environment variables to be set in your `.env` file:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_APP_BACKENDURL` | Backend API base URL | Yes | `https://qa-dev-api.quantifiedante.com/` |
| `VITE_APP_FRONTENDURL` | Frontend application URL | Yes | `http://localhost:3000/predictive-application/` |
| `VITE_APP_WEBSITEURL` | Website base URL | Yes | `http://localhost:5173/` |
| `VITE_APP_SERVER` | Server environment | Yes | `STAGING` or `PRODUCTION` |

> **Security Note:** Keep your `.env` file secure and never share it publicly. Add `.env` to your `.gitignore` file to prevent accidental commits.