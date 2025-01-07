
eBKStore is an online B2C transaction platform designed for seamless electronic product shopping. The system integrates advanced features for managing products, suppliers, customers, and orders, ensuring an efficient experience for both buyers and administrators.
## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

eBKStore aims to provide an intuitive and robust platform for purchasing electronic devices and accessories. It supports multiple product categories, detailed product specifications, order tracking, and customer reviews. The platform also includes tools for administrators to manage products, promotions, and store branches effectively.
## Features



- **User-Friendly Interface:** Intuitive product browsing and checkout process.
- **Product Management:** Advanced tools for handling categories, specifications, and stock levels.
- **Customer Reviews:** Feedback and rating system for products.
- **Order Management:** Detailed invoices, order tracking, and shipping integration.
- **Role-Based Access Control:** Admin tools for managing users, suppliers, and promotions.
- **Payment Integration:** Secure and seamless payment options.

## Frontend

The frontend is built using modern web technologies, ensuring a smooth, responsive, and accessible user experience.

### Technologies Used

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **State Management:** Redux
- **Routing:** Next Router

### Key Features

- Interactive user interface for browsing products, managing carts, and completing orders.
- User account management and purchase history tracking.
- Real-time updates on order and shipping statuses.

### Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start

```
## Backend

The backend provides RESTful APIs for managing data and communication between the frontend and the database.

### Technologies Used

- **Framework:** Nestjs,
- **Database:** MySql
- **Authentication:** JWT
- **API Documentation:** Swagger

### Key Features

- User authentication and role-based access control.
- APIs for managing printers, jobs, and user profiles.

```bash
# Navigate to the backend directory
cd backend

# Configure environment variables in the .env file
# Example: If use local database
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=yourpassword
# DB_NAME=ssps_database

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Read more in directory frontend, backend
