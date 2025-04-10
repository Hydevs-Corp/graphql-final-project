![ReadThot Logo](https://readthot.louisrvl.fr/logo.png){ width=32px }

# GraphQL Final Project - ReadThot

Production URL: [https://readthot.louisrvl.fr/](https://readthot.louisrvl.fr/)

## Overview

ReadThot is a social media platform where users can:

-   Register and log in.
-   Create, read, update, and delete articles.
-   Comment on articles.
-   Like and unlike articles.
-   View articles with filtering and sorting options.

This project demonstrates the integration of a GraphQL server with a modern frontend framework using TypeScript, Prisma, and Apollo Client.

---

## Project Structure

The project is organized as a monorepo with two main directories:

1. **`server/`**: Contains the GraphQL backend.

    - Built with Apollo Server and Prisma.
    - Handles authentication, queries, and mutations.
    - Uses SQLite as the database.

2. **`webapp/`**: Contains the React frontend.
    - Built with Vite and TypeScript.
    - Uses Apollo Client for GraphQL communication.
    - Implements a responsive UI with Mantine.

---

## Features

### Backend

-   **Authentication**: JWT-based user authentication.
-   **CRUD Operations**: Create, read, update, and delete articles.
-   **GraphQL API**: Queries and mutations for managing users, articles, comments, and likes.
-   **Database**: Prisma ORM with SQLite.

### Frontend

-   **User Interface**: Responsive design with Mantine components.
-   **Rich Text Editor**: Create and edit articles with formatting options.
-   **GraphQL Integration**: Apollo Client for seamless communication with the backend.
-   **State Management**: React hooks for managing user sessions and UI state.

---

## Installation

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   SQLite

### Clone the Repository

```bash
git clone <repository-url>
cd graphql-final-project
```

### Backend Setup

1. Navigate to the `server/` directory:

    ```bash
    cd server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the database:

    ```bash
    npx prisma migrate dev
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

The server will run at `http://localhost:4000/graphql`.

### Frontend Setup

1. Navigate to the `webapp/` directory:

    ```bash
    cd ../webapp
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

The frontend will run at `http://localhost:5173`.

---

## Usage

1. Open the frontend in your browser:
    - Development: `http://localhost:5173`
    - Production: [https://readthot.louisrvl.fr/](https://readthot.louisrvl.fr/)
2. Register a new user or log in with an existing account.
3. Create, view, and interact with articles.

---

## Scripts

### Backend

-   `npm run dev`: Start the development server.
-   `npm run compile`: Compile TypeScript to JavaScript.
-   `npm run prisma`: Run Prisma commands.

### Frontend

-   `npm run dev`: Start the development server.
-   `npm run build`: Build the production-ready app.
-   `npm run lint`: Run ESLint for code quality checks.
-   `npm run codegen`: Generate GraphQL types and hooks.

---

## Technologies Used

### Backend

-   Apollo Server
-   Prisma ORM
-   SQLite
-   TypeScript
-   bcrypt
-   jsonwebtoken

### Frontend

-   React
-   Vite
-   Apollo Client
-   Mantine UI
-   TypeScript
-   Tiptap Rich Text Editor

---

## License

This project is licensed under the MIT License.
