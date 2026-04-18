# 💰 Expense Tracker

## Overview

A full-stack web application to track personal expenses with category management and spending summaries.

**Live App →** [your-expense-tracker.netlify.app](https://your-expense-tracker.netlify.app)

> Register a free account to explore all features

## Tech Stack

| Layer    | Technology                                |
| -------- | ----------------------------------------- |
| Backend  | Java 17, Spring Boot 3.2, Spring Security |
| Database | PostgresSQL, Spring Data JPA              |
| Auth     | JWT (JSON Web Tokens)                     |
| Frontend | React, Vite, Tailwind CSS                 |
| API Docs | Swagger / OpenAPI                         |

---

## Features

- JWT-based user registration and login
- Create, edit, delete expenses
- Categorize expenses — Food, Travel, Bills, Shopping, Health and more
- Global categories available to all users plus personal custom categories
- Dashboard with total spent and expense count summary

---

## Project Structure

```
expense-tracker/
├── backend/
│   └── src/main/java/com/expensetracker/
│       ├── auth/        # Authentication module
│       ├── user/        # User management
│       ├── expense/     # Expense CRUD
│       ├── category/    # Category management
│       └── common/      # Shared configs, security, exceptions
│   └── pom.xml
└── frontend/
    └── src/
        ├── components/  # Reusable UI components
        ├── pages/       # Page components
        ├── services/    # API service layer
        └── utils/       # Utility functions
    └── package.json
```

---

## Local Setup

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL
- Maven

---

### 1. Database

```sql
CREATE DATABASE expense_tracker;
```

---

### 2. Backend

```bash
cd backend
```

Edit `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/expense_tracker?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
    username: your_postgres_username
    password: your_postgres_password

app:
  jwt:
    secret: 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
    expiration: 86400000
```

Seed global categories (optional):

```sql
INSERT INTO categories (name, user_id) VALUES ('Food', NULL);
INSERT INTO categories (name, user_id) VALUES ('Travel', NULL);
INSERT INTO categories (name, user_id) VALUES ('Bills', NULL);
INSERT INTO categories (name, user_id) VALUES ('Shopping', NULL);
INSERT INTO categories (name, user_id) VALUES ('Health', NULL);
INSERT INTO categories (name, user_id) VALUES ('Entertainment', NULL);
INSERT INTO categories (name, user_id) VALUES ('Other', NULL);
```

Run:

```bash
./mvnw spring-boot:run
```

Backend runs at → `http://localhost:8080`

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## API Endpoints

### Auth — Public

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| POST   | `/auth/register`  | Register new user        |
| POST   | `/auth/login`     | Login, returns JWT token |

### Expenses — Requires JWT

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/expenses`        | Get all expenses      |
| GET    | `/expenses/{id}`   | Get one expense       |
| POST   | `/expenses`        | Create expense        |
| PUT    | `/expenses/{id}`   | Update expense        |
| DELETE | `/expenses/{id}`   | Delete expense        |
| GET    | `/expenses/summary`| Get total and count   |

### Categories — Requires JWT

| Method | Endpoint       | Description                        |
| ------ | -------------- | ---------------------------------- |
| GET    | `/categories`  | Get all categories (global + yours)|
| POST   | `/categories`  | Create a personal category         |

---

## API Documentation (Swagger)

Open → `http://localhost:8080/swagger-ui.html`

**To authenticate in Swagger:**

1. Call `/auth/login` → copy the token
2. Click **Authorize** button
3. Enter → `Bearer your_token_here`

---

## How Authentication Works

```
User Login → JWT Token → Sent in every request header → Backend validates → Access granted
```

Token is stored in `localStorage` on the frontend and attached to every API call automatically.

---

## What I Learned

**Backend Architecture**
- Modular monolith — organizing code by feature, not by layer
- Layered flow — Controller → Service → Repository
- DTO pattern with MapStruct — never expose entities directly
- JWT authentication — stateless security with Spring Security
- Global exception handling — clean, consistent error responses
- Swagger — self-documenting API

**Frontend Architecture**
- Component-based design — reusable, single-purpose components
- Centralized API layer — all HTTP calls in one place
- Protected routes — auth guards for secure pages
- Loading and error states — better user experience
- Axios interceptors — auto-attach tokens, handle 401 globally