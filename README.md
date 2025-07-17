# EpyTodo

## 📋 Description

EpyTodo is a backend project developed with **Node.js**, **Express**, and **MySQL**. It provides a RESTful API to manage users and their tasks (todos). The project includes full CRUD operations for users and todos, user authentication using JWT, and secure password storage with hashing.

---

## 📁 Project Structure

```
.
├── .env
├── epytodo.sql
├── package.json
├── README.md
└── src
    ├── config
    │   └── db.js
    ├── index.js
    ├── middleware
    │   ├── auth.js
    │   └── notFound.js
    └── routes
        ├── auth
        │   └── auth.js
        ├── todos
        │   ├── todos.js
        │   └── todos.query.js
        └── user
            ├── user.js
            └── user.query.js
```

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd epytodo
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and set the following variables:

```env
MYSQL_DATABASE=epytodo
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=your_password
PORT=3000
SECRET=your_jwt_secret
```

4. Import the database schema:

```bash
cat epytodo.sql | mysql -u root -p
```

---

## 🚀 Run the Project

```bash
npm start
```

---

## 🧪 API Routes

| Route                  | Method | Auth Required | Description                    |
|-----------------------|--------|---------------|--------------------------------|
| /register             | POST   | No            | Register a new user            |
| /login                | POST   | No            | Login a user                   |
| /user                 | GET    | Yes           | Get current user info          |
| /user/todos           | GET    | Yes           | Get all current user's todos   |
| /users/:id or :email  | GET    | Yes           | Get user by ID or email        |
| /users/:id            | PUT    | Yes           | Update user by ID              |
| /users/:id            | DELETE | Yes           | Delete user by ID              |
| /todos                | GET    | Yes           | Get all todos                  |
| /todos/:id            | GET    | Yes           | Get a todo by ID               |
| /todos                | POST   | Yes           | Create a new todo              |
| /todos/:id            | PUT    | Yes           | Update a todo by ID            |
| /todos/:id            | DELETE | Yes           | Delete a todo by ID            |

---

## 🔒 Authentication

All protected routes require a **JWT token** in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## ✅ Allowed Packages

- express
- mysql2
- dotenv
- jsonwebtoken
- bcryptjs
- body-parser

---

## 📄 SQL Structure

Make sure you provide a file `epytodo.sql` with the full database schema including the two required tables:

- `user`
- `todo`

Do not insert any sample data into the SQL file.

---


