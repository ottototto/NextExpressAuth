# NextExpressAuth - Next.js Express Login Template

This project is meant to serve as a template for applications that may require simple login functionality and a database to store the information securely. It uses hashing to encrypt passwords and stores them into a postgresql database, but using JWT authentication would be more secure. I would recommend improving upon the template instead of using it directly as is. 

I made this originaly for myself to have a template that I can use whenever I want to create a software that needs login functionality and a good framework for frontend. 

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Frontend](#frontend)
  - [Backend and Database](#backend-and-database)
- [Editing and Hot Reload](#editing-and-hot-reload)
- [Resources](#resources)

## Prerequisites

Before you start, ensure you have the following installed on your machine:

- Node.js (latest LTS version)
- npm (Node package manager)
- Docker (for containerization)

## Installation

To get started with the application, follow these steps to install the necessary dependencies:

1. Clone the repository:
    ```bash
    git clone https://github.com/ottototto/NextExpressAuth.git
    cd nextexpressauth
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd frontend && npm install
    cd ../backend && npm install
    cd ..
    ```

## Running the Application

### Frontend

To start the frontend development server, execute the following commands:

```bash
cd frontend && npm run dev
```

## Backend and Database
To start the backend server and the database, use Docker Compose and then run the server:
```bash
cd ../backend && docker-compose up -d && node server.js
```
Once both servers are running, open http://localhost:3000 in your browser to view the application.


## Possible changes soon: 

### Authentication:
- HTTP-Only Cookies
- JWT Authentication
- Session-based authentication

### Cleaning
- Clean useless packages
- Refactor code
