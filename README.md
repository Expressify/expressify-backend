# Expressify Backend Documentation

Capstone project in Bangkit Academy using Express.js.

## Prerequisites

- Node.js
- npm

## Getting Started

1.  Clone the repository:

    ###

        git clone https://github.com/Expressify/expressify-backend.git

2.  Install dependencies:
    ##
        cd expressify-backend
        npm install
3.  Start the server:
    - For development mode (with hot-reloading):
    ##
         npm run dev
    ##
    - For production mode:
    ##
         npm start

## Usage

Make API requests to http://localhost:8080 to interact with the backend.

# REST API Documentation

This documentation provides an overview and usage instructions for the REST API.

## Authentication

### Registration

**Endpoint**: `/api/v1/auth/register`

**Method**: `POST`

#### Request

```
{
    "nama": "lorem ipsum",
    "email": "loremipsum@gmail.com",
    "password": "123456",
    "genre": ["id-genre1", "id-genre2"]
}
```

### Login

**Endpoint**: `/api/v1/auth/login`

**Method**: `POST`

#### Request

```
{
  "email": "example_user@gmail.com",
  "password": "example_password"
}
```

## API Call with Authentication

### Endpoint Music

**Endpoint**: `/api/v1/musik`

**Method**: `GET`

#### Request

```
Authorization: Bearer <access_token>
```

**Endpoint**: `/api/v1/musik`

**Method**: `POST`

#### Request

```
Authorization: Bearer <access_token>

{
    "judul_musik": "Spongebob Squarepants",
    "url_spotify": "abcdsabfhdsafsafdsa"
}
```

For more api documentation, see the following postman link

https://warped-moon-321039.postman.co/workspace/New-Team-Workspace~c494c844-fe7a-4f62-b0c7-2bd7cf9ef7aa/collection/23691179-12fdca62-0cb5-4c01-89ce-715851247cac?action=share&creator=28030275

## Directory Structure

```
expressify-backend/
|- src/
| |- configs/
| |- controllers/
| |- middleware/
| |- routes/
| |- services/
| |- utils/
| |- server.js
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
