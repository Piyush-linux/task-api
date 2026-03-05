# Task Management API

This is a simple REST API built with **Node.js, Express, and PostgreSQL** that allows users to manage their tasks.
Users can register, log in, and create or manage their personal tasks through authenticated API endpoints.

The project was created to demonstrate backend development concepts such as authentication, database interaction, API design, and basic security practices.

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JWT for authentication
* bcrypt for password hashing
* Zod for request validation

## Features

* User registration and login
* JWT-based authentication
* Create, read, update, and delete tasks
* Rate limiting to prevent abuse
* Security headers using Helmet
* Centralized error handling

## Getting Started

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/task-management-api.git
cd task-management-api
```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
NODE_ENV=development
PORT=5000

DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=taskdb
# openssl rand -hex 32
JWT_SECRET=0044168740a272a7ac27041740921a6fcd391fc4348311bbb2da9b9c049996bb
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run dev
```



## Docker 
```sh
docker compose up --build

docker compose down -v

docker ps
```

*The API will run on:*

```sh
http://localhost:3000
http://localhost:3000/api-docs/
```

# Schema
![](/schema.png)

# Architecture
![](/architecture.png)


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


## Example Request

Login:

```bash
http POST :3000/auth/login email=test@test.com password=123456
```

Get tasks using a token:

```bash
http GET :3000/tasks Authorization:"Bearer YOUR_TOKEN"
```

## License

MIT License
