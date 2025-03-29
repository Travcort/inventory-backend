# Inventory Management System

This project is a full-stack inventory management system that allows users to manage products through a web interface. It includes a backend API built with Node.js, Express, and MongoDB, and a frontend dashboard built with HTML, CSS, and JavaScript. Users can log in, view a list of products, add new products, edit existing products, delete products, filter products by name, and log out.

## Project Structure

The project is divided into two main directories:

- `inventory-backend`: Contains the backend API (Node.js, Express, MongoDB).
- `inventory-frontend`: Contains the frontend dashboard (HTML, CSS, JavaScript).

## Features

- User Authentication: Users can log in with their email and password. JWT tokens are used for authentication.
-Product Management:
  - View a list of products with details (name, description, image, stock).
  - Add new products.
  - Edit existing products.
  - Delete products.
  - Filter products by name.
- Logout: Users can log out, clearing their session.
-Responsive Design: The dashboard is styled for usability on both desktop and mobile devices.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or higher): [Download Node.js](https://nodejs.org/)
- MongoDB: Either a local MongoDB instance or a cloud instance (e.g., MongoDB Atlas). [Download MongoDB](https://www.mongodb.com/try/download/community)
- http-server: A simple static file server for the frontend. Install globally with:
  ```bash
  npm install -g http-server
## if you have installed all the software, to run the project;
   - clone the repository:
     ```bash
     git clone -b chris-test <repo URL e.g https://github.com/Travcort/inventory-backend.git>
   - in the inventory backend directory, run command:
     ```bash
     npm install
   - create a .env file in the backend directory and paste the code:
     ```code
      MONGO_LOCAL=mongodb://localhost:27017/inventory_db
      JWT_SECRET=your_jwt_secret_key
      PORT=5000
   - start the database as an admin:
     ```bash
     net start MongoDB
   - in the backend directory, start the backend:
     ```bash
     npm start
