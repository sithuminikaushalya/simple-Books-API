# Books API

## Overview
A simple RESTful API to manage books, built with Node.js and Express.

## Features
- List all books (with pagination)
- Retrieve a book by ID
- Add a new book
- Update a book by ID
- Delete a book by ID
- API documentation with Swagger
- Automated testing using Jest and Supertest

## Setup Instructions

### Prerequisites
Ensure you have Node.js (v16 or higher) installed.

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application
Start the server:
```sh
npm start
```
The API will be available at `http://localhost:3000`.

### API Endpoints
| Method | Endpoint         | Description          |
|--------|-----------------|----------------------|
| GET    | /books          | Get all books       |
| GET    | /books/:id      | Get book by ID      |
| POST   | /books          | Add a new book      |
| PUT    | /books/:id      | Update a book       |
| DELETE | /books/:id      | Delete a book       |

### Using Swagger
Swagger documentation is available at:
```
http://localhost:3000/api-docs
```

### Testing with Postman
1. Download the Postman collection: [Book Management Postman Collection](https://github.com/user-attachments/files/18583252/Book.Management.postman_collection.json)
2. Import the collection into Postman.
3. Use the provided endpoints to test API functionality.

### Running Tests
To run the automated tests using Jest and Supertest:
```sh
npm test
```

![Test Results](https://github.com/user-attachments/assets/6d835e8d-1742-4912-a656-18ae6fe994db)

## Project Structure
```
📂 project-root
 ├── 📂 src
 │   ├── 📂 controllers
 │   │   ├── bookController.js        # Contains functions that handle requests for the books (GET, POST, PUT, DELETE).
 │   ├── 📂 models
 │   │   ├── bookModel.js             # Defines the book model and stores books in memory (or a database in the future).
 │   ├── 📂 routes
 │   │   ├── bookRoutes.js            # Defines the routes for book-related operations, mapping HTTP methods to controller actions.
 │   ├── 📂 middlewares
 │   │   ├── validateBook.js          # Middleware to validate book data before adding or updating a book.
 │   ├── 📂 utils
 │   │   ├── errorHandler.js          # Error handling middleware to catch all errors and send appropriate responses.
 ├── 📂 tests
 │   │   ├── bookRoutes.test.js       # Contains tests for the book routes to ensure proper API functionality.
 │       ├── bookController.test.js   # Contains tests for the controller logic to ensure business logic is working.
 ├── swagger.json                     # Swagger API documentation for your project, describing endpoints and data formats.
 ├── .gitignore                       # Specifies files and directories that should be ignored by Git (e.g., node_modules).
 ├── package.json                     # Contains metadata about the project (dependencies, scripts, etc.).
 ├── README.md                        

```

## Dependencies
- Express.js
- Swagger-UI-Express
- Jest
- Supertest

