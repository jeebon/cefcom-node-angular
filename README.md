# CefCom

Dockerized full-stack eCommerce reference application built with **Angular, Node.js, Express, and TypeScript**.

This repository demonstrates a modular frontend/backend architecture, RESTful API design, containerized local development, and a simple product catalog workflow. It is intended as a **reference implementation for learning, experimentation, and portfolio demonstration**, rather than a production-ready eCommerce platform.

---

## Tech Stack

### Frontend
- Angular
- TypeScript
- SCSS

### Backend
- Node.js
- Express
- TypeScript

### Infrastructure
- Docker
- Docker Compose

### Database
- MongoDB

---

## Project Structure

```text
.
├── client/                 # Angular frontend application
├── server/                 # Node.js + Express API
├── docker-compose.yml      # Local multi-container setup
└── README.md
```

---

## Features

- Angular single-page application
- Node.js REST API
- Product listing endpoint
- Product details endpoint
- Dockerized development environment
- Seed script for dummy products
- Separate frontend and backend modules

---

## Architecture

```text
Angular Client
       │
       ▼
Node.js / Express API
       │
       ▼
     MongoDB
```

---

## Getting Started

### Prerequisites

- Docker Desktop
- Docker Compose

---

## Run Locally

Clone the repository:

```bash
git clone https://github.com/jeebon/cefcom-node-angular.git
cd cefcom-node-angular
```

Start all services:

```bash
docker compose up --build
```

---

## Service URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:5000 |

---

## Seed Dummy Products

Import sample products into the database:

```bash
docker compose exec backend sh
npm run import:products
```

Remove all products:

```bash
npm run delete:products
```

---

## Development Notes

- Frontend and backend are developed independently.
- Docker Compose is used to simplify local setup.
- The project focuses on code organization and development workflow rather than production deployment concerns such as authentication, payments, inventory management, or order processing.

---

## API Example

Get all products:

```bash
GET /api/v1/products
```

Get a product by id:

```bash
GET /api/v1/products/:id
```

---

## Roadmap

Potential future improvements:

- Authentication and authorization
- Shopping cart
- Order management
- Admin dashboard
- Pagination and filtering
- Automated tests
- CI/CD workflow

---

## Purpose of This Repository

This project is maintained as a **full-stack reference application** that reflects my work with:

- Angular frontend development
- Node.js backend services
- REST API design
- TypeScript across the stack
- Docker-based local development

It is intentionally kept smaller than a complete commercial eCommerce system.

---

## License

This project is available under the MIT License.
