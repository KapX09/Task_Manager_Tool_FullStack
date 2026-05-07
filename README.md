# Task Manager Application

A web application to manage projects and tasks within a team. Users can create projects, assign tasks, and track progress based on their role.
Demo link: [Click here to Check the management tool](https://taskmanagertoolfullstack-production.up.railway.app/)

## Overview

The system allows users to:

* Register and login securely using JWT authentication
* Create and manage projects
* Assign and track tasks with priority and deadlines
* View analytics and task progress through a dashboard
* Control access based on user roles (Admin & Member)

This project follows a REST API architecture with a MongoDB database.

## Features

### Authentication

* User signup with name, email, and password
* Secure login using JSON Web Tokens (JWT)
* Protected routes using authentication middleware

### Project Management

* Create new projects
* View projects where the user is a member
* Add members to a project (Admin only)

### Task Management

* Create tasks with title, description, due date, and priority
* Assign tasks to users
* Update task status (TODO, IN_PROGRESS, DONE)
* View tasks assigned to the logged users

### Dashboard

* Total number of tasks
* Tasks grouped by status
* Overdue task tracking

### Role Access
* ADMIN:

  * Manage project members | Access all users
* MEMBER:

  * Access assigned projects and tasks

## System Structure

```
project/                          ← Root
├── .gitignore
├── README.md
├── data/                    ← Empty folder (for MongoDB)
├── output/                  ← (optional, for images later)
└── server/                  ← backend code (node.js Express)
    ├── public/
    │   └── index.html
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env(add into gitignore)
    ├── package.json
    ├── server.js
    └── start.bat(optional write .bat file with path for click start)
```

## Tech Stack

* **Backend**: Node.js | Express.js | MongoDB (Mongoose)
* **Frontend**: HTML | CSS | Bootstrap 5
* **Authentication**: JSON Web Token (JWT)
* **Security**: bcryptjs

## API Overview

### Auth

* POST /api/auth/signup
* POST /api/auth/login
* GET /api/auth/me

### Projects

* GET /api/projects
* POST /api/projects
* POST /api/projects/:id/members

### Tasks

* GET /api/tasks
* GET /api/tasks/dashboard
* POST /api/tasks
* PATCH /api/tasks/:id

### Users

* GET /api/users (Admin only)

## Local Setup

### Step 1: Run MongoDB

```bash
<yourpath>\mongodb\bin\mongod.exe --dbpath "<yourpath>\data" --port 27017
```

### Step 2: Start Server

```bash
cd <yourpath>\t3\server
node server.js
```

### Step 3: Access API (Application)

```
http://localhost:5000
```

## Environment Variables

**Important**: The `.env` file is **not pushed** to GitHub for security reasons.

Create `.env` file in `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://<Add_your_local_address>/taskmanager
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## Deployment

* Backend deployed on Railway
* Uses Railway MongoDB plugin
* Environment variables configured via Railway dashboard

## Current Status

* Backend fully functional with REST APIs
* User authentication and authorization implemented
* Project and task management working
* Role-based access (Admin/Member) implemented
* Dashboard with task statistics available
* Frontend is basic but functional

## Limitations | Future Update

*Feel Free to contribute.*

* Admin role must be assigned manually in the database
* Advanced audit logging not implemented yet
* No real-time updates (WebSockets can be added)
* File attachments feature not implemented
* Error handling can be improved

#### Author
_Student Project created Task Manager with fun._ 
