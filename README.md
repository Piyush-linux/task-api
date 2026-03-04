# Task Management API

This is a simple REST API built with **Node.js, Express, and PostgreSQL** that allows users to manage their tasks.
Users can register, log in, and create or manage their personal tasks through authenticated API endpoints.

The project was created to demonstrate backend development concepts such as authentication, database interaction, API design, and basic security practices.

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JWT for authentication
* bcrypt for password hashing
* Zod for request validation

---

## Features

* User registration and login
* JWT-based authentication
* Create, read, update, and delete tasks
* Rate limiting to prevent abuse
* Security headers using Helmet
* Centralized error handling

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/task-management-api.git
cd task-management-api
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run dev
```

The API will run on:

```
http://localhost:3000
```

---


# File Structure 

```sh
task-api
│
├ server.js
├ package.json
├ .gitignore
├ README.md
├ LICENSE
├ .env.example
│
└ src
   ├ app.js
   ├ config
   │   └ db.js
   │
   ├ routes
   │   ├ auth.js
   │   └ tasks.js
   │
   ├ controllers
   │   ├ authController.js
   │   └ taskController.js
   │
   └ middleware
       ├ authMiddleware.js
       ├ rateLimiter.js
       └ errorHandler.js
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=taskuser
DB_PASSWORD=password
DB_NAME=task_manager

JWT_SECRET=your-secret-key
```

---

## API Endpoints

### Authentication

Register a user

```
POST /auth/register
```

Login

```
POST /auth/login
```

---

### Tasks

Get all tasks

```
GET /tasks
```

Get task by ID

```
GET /tasks/:id
```

Create a task

```
POST /tasks
```

Update a task

```
PUT /tasks/:id
```

Delete a task

```
DELETE /tasks/:id
```

---

## Example Request

Login:

```bash
http POST :3000/auth/login email=test@test.com password=123456
```

Get tasks using a token:

```bash
http GET :3000/tasks Authorization:"Bearer YOUR_TOKEN"
```

---

## License

MIT License




- [x] indexing
- [ ] Pagination
- [ ] filterig 
- [ ] API Design
- [ ] Error Handeling
- [ ] Docker
- [ ] Swagger API 
- [ ] API Testing : autocanon 
- [ ] Scalable 
- [ ] Testing API
- [ ] autocad, API testing tool
- [ ] Cluster
- [ ] package.json script
- [ ] LICENSE

# ENV
```
NODE_ENV=development
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=taskuser
DB_PASSWORD=stronpassword
DB_NAME=task_manager
# openssl rand -hex 32
JWT_SECRET=0044168740a272a7ac27041740921a6fcd391fc4348311bbb2da9b9c049996bb

```


# Indexing
```sql
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
```
4️⃣ Composite Index (Optional)

If you frequently query like:

WHERE user_id=$1 AND status=$2

Then add:

CREATE INDEX idx_tasks_user_status
ON tasks(user_id, status);



# Connection Pooling Properly
```js
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

# Rate Limiting
npm install express-rate-limit
```sh
autocannon -c 100 -d 15 http://localhost:3000/auth/login

autocannon \
  -c 20 \
  -d 10 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/tasks
```

# Response Compression
```js
npm install compression
```


# Make API Stateless
```js

```

# Cluster / Scalibility



# Graceful Shutdown


# Security Headers
npm install helmet
What Helmet Protects Against:
X-DNS-Prefetch-Control
X-Frame-Options
X-Content-Type-Options
Strict-Transport-Security
Content-Security-Policy
These help prevent:
clickjacking
MIME sniffing attacks
XSS attacks
protocol downgrade attacks

# CORS Configuration

# API Documentation Section

# SQL injection protection

# input validation
Strict Input Sanitization: input.trim();
Stronger Password Policy: password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/)

# Protect Routes with Middleware

# XSS

# Account Lockout (Brute Force Protection)
An attacker might try thousands of passwords:
Update Database Schema:
```sql
ALTER TABLE users
ADD COLUMN failed_attempts INTEGER DEFAULT 0,
ADD COLUMN lock_until TIMESTAMP;
```

# Prevent Parameter Pollution

# API Testing Tools
