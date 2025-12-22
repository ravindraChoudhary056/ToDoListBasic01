To-Do List (Basic Full-Stack Project)

A simple To-Do List web application built with a Node.js + Express backend and a static HTML/CSS/JavaScript frontend.
The project supports user authentication and per-user task management using MongoDB.

* Features 

User Sign Up / Sign In

Add, view, and delete tasks (per user)

MongoDB database with Mongoose

Simple, beginner-friendly full-stack structure


* Tech Stack

Backend
Node.js
Express.js
MongoDB
Mongoose
CORS
dotenv
Frontend
HTML
CSS
JavaScript (Vanilla)


📁 Project Structure
To-do-list_basic01/
│
├── backend/
│   ├── index.js          # Express app & routes
│   ├── db.js             # MongoDB connection
│   ├── models/
│   │   └── User.js       # User schema
│   └── routes/
│       └── auth.js       # Auth & task APIs
│
└── fronted/
    ├── signin.html
    ├── signup.html
    ├── profilePage.html
    ├── forget.html
    ├── setting.html
    ├── style.css
    └── script.js

* Prerequisites

Node.js (v14+ recommended)
npm
MongoDB (local or MongoDB Atlas)

*  Backend Setup

Open terminal and move to backend folder:
npm install
Create a .env file inside backend/:
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net

Server runs on:
http://localhost:5000



* Important Notes

Passwords are stored in plain text (for learning only).
This project is not production-ready.
Make sure MongoDB connection is working before testing.

* Purpose

This project is made for learning full-stack basics:
Frontend ↔ Backend communication
REST APIs
MongoDB integration
Authentication flow