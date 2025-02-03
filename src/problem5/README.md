# CRUD Server with Express and TypeScript

This is a simple CRUD (Create, Read, Update, Delete) server built with Express.js, TypeScript, and MongoDB.

## Prerequisites:

-   Node.js (v14 or higher)
-   MongoDB (local installation or MongoDB Atlas account)
-   npm or yarn

## Project Structure:

```bash

src/
├── types/ # Type definitions
├── models/ # Database models
├── controllers/ # Route controllers
├── routes/ # API routes
└── app.ts # Main application file
```

## Setup Instructions:

1. Clone the repository:

```bash
git clone https://github.com/maonguyen-itage/Nguyen-Van-Mao.git
cd problem5
```

2. Install dependencies:

```bash
  npm install
```

3. Create a .env file in the root directory with the following content:
   env

```
  `PORT=3000`
  MONGODB_URI=mongodb://localhost:27017/crud-app
```

Build the TypeScript code:

```bash
  npm run build
```

Start the server:

```bash
  npm start
```

**API Endpoints:**
**Products API:**

-   **Create Product**
-   POST /api/products
-   Body: { name: string, price: number, description: string, category: string }

-   **List Products**
-   GET /api/products
-   Query Parameters:

    -   category: Filter by category
    -   minPrice: Filter by minimum price
    -   maxPrice: Filter by maximum price

-   **Get Product Details**
    -   GET /api/products/:id
-   **Update Product**

    -   PUT /api/products/:id
    -   Body: { name?: string, price?: number, description?: string, category?: string }

-   **Delete Product**
    -   DELETE /api/products/:id

**Development**

1. Install development dependencies:

```bash
  npm install -D typescript @types/node @types/express @types/mongoose
  npm install --save-dev ts-node-dev
```

2. Run in development mode:

```bash
  npm run dev
```

**Scripts**

-   npm run build: Compile TypeScript code
-   npm start: Start the production server
-   npm run dev: Start the development server with hot-reload
-   npm test: Run tests (when implemented)

**Environment Variables**

-   PORT: Server port (default: 3000)
-   MONGODB_URI: MongoDB connection string (default: mongodb://localhost:27017/crud-app)

**Testing the API**
You can test the API using tools like Postman or curl. Here are some example requests:

# Create a product

```bash
URL: http://localhost:5000/api/products
Method: POST
Headers: Content-Type: application/json
Body (raw JSON):
{
    "name": "iPhone 14 Pro",
    "description": "Latest iPhone model",
    "price": 999.99,
    "category": "Electronics"
}
```

# Get all products

```bash
URL: http://localhost:5000/api/products
Method: GET
```

# Get products with filters (GET)

```bash
- Filter by category:
  http://localhost:5000/api/products?category=Electronics
- Filter by price:
  http://localhost:5000/api/products?minPrice=500&maxPrice=1000
```

# Get a specific product (GET)

```bash
  Get Product by ID (GET):
  URL: http://localhost:5000/api/products/:id
  Method: GET
  Replace :id with the ID of the product you want to view.
  For example: http://localhost:5000/api/products/67a038c45332cd63ca7a2701
```

# Update a product (PUT):

```bash
URL: http://localhost:5000/api/products/:id
Method: PUT
Headers: Content-Type: application/json
Body (raw JSON):
{
    "price": 899.99,
    "description": "Updated description for iPhone 14 Pro"
}

```

# Delete a product (DELETE):

```bash
URL: http://localhost:3000/api/products/:id
Method: DELETE
```
