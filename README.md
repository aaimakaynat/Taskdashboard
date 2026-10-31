# Task Dashboard

A full-stack task manager with create, read, update, and delete (CRUD) actions. Built during my full stack developer internship at Progree.

## What it does
A vanilla JavaScript front end calls a Node.js/Express REST API with async/await `fetch`, and reloads the task list after every change so the page always matches the database.

## Tech
Node.js, Express, lowdb (local JSON database), HTML, CSS, JavaScript

## API
| Method | Route | Action |
|--------|-------|--------|
| POST | /api/tasks | Create a task |
| GET | /api/tasks | Read all tasks |
| GET | /api/tasks/:id | Read one task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Run it locally
1. `cd backend`
2. `npm install`
3. `npm start` (runs on port 4000)
4. Open `frontend/index.html` in a browser
