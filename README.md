# Expressify Backend Documentation

A simple Node.js project using Express.js.

## Prerequisites

- Node.js
- npm

## Getting Started

1.  Clone the repository:

    ```shell
    git clone https://github.com/Expressify/expressify-backend.git
    ```

2.  Install dependencies:
    ```
    cd expressify-backend
    npm install
    ```
3.  Start the server:
    - For development mode (with hot-reloading):
    ##
         npm run dev
    ##
    - For production mode:
    ##
         npm start
    ##

## Usage

Make API requests to http://localhost:8080 to interact with the backend.

## Usage

Make API requests to http://localhost:8080 to interact with the backend.

## Directory Structure

```
expressify-backend/
  |- src/
  |  |- configs/
  |  |- controllers/
  |  |- middleware/
  |  |- routes/
  |  |- services/
  |  |- utils/
  |  |- server.js
  |- node_modules/
  |- package.json
  |- .env
  |- README.md
```

## Acknowledgments

- Express.js: The web framework used for building the backend server.
- Nodemon: Utility for automatically restarting the server during development.
- axios: Promise-based HTTP client for making API requests.
- dotenv: Module for loading environment variables from a .env file.
- multer: Middleware for handling file uploads.
- jsonwebtoken: Library for generating and verifying JSON Web Tokens.
- promise-mysql: Promisified version of the mysql library.
- uuid: Library for generating universally unique identifiers.
