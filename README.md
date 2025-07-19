# 🚀 Backend App

A production-ready Node.js backend API built with **TypeScript**, **Express**, and **Sequelize (MySQL)**. This app provides user authentication, email validation, timed user activation via a cron job, and is fully tested using Jest.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [Environment Configuration](#-environment-configuration)
- [Scripts](#-scripts)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Cron Job: User Activation](#-cron-job-user-activation)

---

## ✨ Features

- ✅ User signup and login endpoints
- ✅ Secure password hashing with bcrypt
- ✅ Validation middleware for input fields
- ⏰ Cron job to activate inactive users after 15 minutes
- 📧 Mocked activation email notification (console log)
- 📄 Swagger API documentation
- 🧪 Jest unit/integration tests
- 🔁 Sequelize models and migrations

---

## 💻 Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** MySQL, Sequelize ORM
- **Validation:** Custom middleware (Regex-based)
- **Scheduler:** node-cron
- **Testing:** Jest, Supertest
- **Documentation:** Swagger

---

## 📁 Project Structure
```env
backend-app/
├── src/
│ ├── controllers/ # Request handlers
│ ├── middlewares/ # Validation logic
│ ├── models/ # Sequelize models
│ ├── routes/ # API endpoints
│ ├── schedulers/ # Cron jobs
│ ├── utils/ # Utility functions
│ ├── tests/ # Unit/integration tests
│ └── index.ts # Entry point
├── jest.config.ts # Jest configuration
├── tsconfig.json # TypeScript configuration
└── .env # Environment variables
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash

git clone https://github.com/ashish-138/backend-app.git
cd backend-app
```

### 2. Install Dependencies:
```bash
  npm install
```
### 3. Configure MySQL:
```bash
  CREATE DATABASE backendapp_db;
```
### 4. Create a .env file in the root:
```env
PORT=3000
DB_HOST=localhost
DB_NAME=backendapp_db
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=test_secret
```

---

## 📜 Scripts
Command	Description
npm run dev	 :  Start in development mode
npm run build:	Compile TypeScript
npm start	 :  Run compiled JavaScript
npm run test :	Run all Jest tests


## ✅ Testing
```bash
npm run test : Jest + Supertest are used to test APIs.
```
```env
Test Coverage:
Signup:
Success
Missing fields
Invalid email or mobile
Login:
Success
Wrong credentials
Cron Job:
Activates user after 15 min
Email:
Console log mock
```
---

## 📄 API Documentation
Once the server is running:

👉 Open: http://localhost:3000/api-docs
(Swagger UI)

You’ll find routes for:

POST /api/auth/signup

POST /api/auth/login

---


## ⏲️ Cron Job: User Activation
Scheduled every minute via node-cron

- Activates users with:

- status: 'inactive'

  - createdAt <= 15 minutes ago

  - Sends mock activation email (console):

```bash
📧 [MOCK] Activation email sent to: user@example.com

```