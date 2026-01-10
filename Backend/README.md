# Simple MERN Backend

A simple Node.js backend for MERN stack practice with authentication and product management.

## Features

- User registration and login with JWT authentication
- Role-based access (user/admin)
- Product CRUD operations (admin only for create/update/delete)
- Swagger API documentation
- MongoDB with Mongoose
- CORS enabled

## Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT
- bcryptjs
- Swagger UI

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Seed the database with sample products:
   ```
   node config/seed.js
   ```
5. Start the server:
   ```
   npm start
   ```
   Or for development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)

## API Documentation

Visit `http://localhost:5000/api-docs` for Swagger UI documentation.

## Usage

1. Register a user with role 'admin' to manage products.
2. Use the login endpoint to get a JWT token.
3. Include the token in the Authorization header as `Bearer <token>` for protected routes.

## Project Structure

```
├── config/
│   ├── database.js
│   ├── swagger.js
│   └── seed.js
├── controllers/
│   ├── authController.js
│   └── productController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   └── Product.js
├── routes/
│   ├── auth.js
│   └── products.js
├── index.js
├── .env.example
└── README.md