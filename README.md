# Form Application with Node.js Backend

A full-stack form application with MySQL database integration for collecting parent/children information.

## Features

- Frontend form with responsive design
- Node.js/Express backend
- MySQL database storage
- REST API endpoints
- Dashboard to view submissions

## Project Structure
form/
├── assets/ # Static assets
├── backend/
│ ├── config/ # Database configuration
│ ├── controllers/ # Business logic
│ ├── routes/ # API routes
│ └── server.js # Main server file
├── public/ # Frontend files
│ ├── dash.css # Dashboard styles
│ ├── dashboard.html # Submission viewer
│ ├── index.html # Main form
│ ├── scripts.js # Frontend logic
│ └── styles.css # Form styles
├── .env.example # Environment variables template
├── package.json # Node.js dependencies
└── form_app.sql # Database schema

text

## Prerequisites

- Node.js (v16+ recommended)
- MySQL database
- npm/yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/B00ZI/form.git
   cd form
Install dependencies:

bash
npm install
Set up environment variables:

Copy .env.example to .env

Update with your database credentials

Import the database schema:

bash
mysql -u username -p database_name < form_app.sql
Running the Application
Start the development server:

bash
node backend/server.js
Access the application at:

Form: http://localhost:3001

Dashboard: http://localhost:3001/dashboard.html

API Endpoints
POST /api/submit - Submit form data

GET /api/submissions - Get all submissions

Deployment
Option 1: Render.com (Recommended)
Create new Web Service

Connect your GitHub repository

Set environment variables

Deploy!

Option 2: Vercel + Railway
Frontend on Vercel

Backend on Railway with MySQL add-on

Contributing
Pull requests are welcome. For major changes, please open an issue first.

License
MIT
