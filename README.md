# Recipe API

A simple Node.js API for managing recipes, using [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) and SQLite as the database. Built with Express and TypeScript.

## Features

- Create, read, update, and delete recipes
- Input validation with [celebrate](https://github.com/arb/celebrate) and [Joi](https://joi.dev/)
- Uses SQLite for lightweight, file-based or in-memory storage
- Dockerized for easy deployment

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/benkwash/givery-recipe-api.git
   cd givery-recipe-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the project root with the following content:

   ```
   PORT=3000
   NODE_ENV=development
   ```

   - `NODE_SERVER_PORT`: The port your server will run on (default: 3000)
   - `NODE_ENV`: The environment mode (`development`, `production`, etc.)

4. Build the project (if using TypeScript):

   ```sh
   npm run build
   ```

5. Start the server:

   ```sh
   npm start
   ```

   The API will be available at `http://localhost:3000`.

### Development Mode (with auto-reload)

```sh
npm run dev
```

## API Endpoints

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| GET    | `/recipes`     | List all recipes      |
| GET    | `/recipes/:id` | Get a recipe by ID    |
| POST   | `/recipes`     | Create a new recipe   |
| PATCH  | `/recipes/:id` | Update a recipe by ID |
| DELETE | `/recipes/:id` | Delete a recipe by ID |

### Example Recipe Object

```json
{
  "title": "Chicken Curry",
  "making_time": "45 min",
  "serves": "4 people",
  "ingredients": "Chicken, Curry Powder, Onion, Garlic",
  "cost": 1200
}
```

## Running with Docker

1. Build the Docker image:

   ```sh
   docker build -t recipe-api .
   ```

2. Run the container:

   ```sh
   docker run -p 3000:3000 --env-file .env recipe-api
   ```

## Project Structure

```
src/
  ├── db/           # Database setup and helpers
  ├── routes/       # API route handlers
  ├── validators/   # Joi validation schemas
  ├── index.ts      # App entry point
```

##### **Author:** Benkwash

##### **Contact:** benjaminkwashie@gmail.com
