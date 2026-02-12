# Issue Tracker Application

A full-stack issue tracking web application with **CRUD operations**, user authentication, search/filtering, pagination, status tracking, and modern UI/UX. Built to meet the assignment requirements using **React + Vite + TypeScript + Tailwind CSS + Redux** (frontend), **Express.js + Node.js + MongoDB** (backend), and **JWT authentication**.

## Features

### Core Functionality
- **Issue Management**
  - Create issues with title, description, severity (Low/Medium/High), and priority (Low/Medium/High)
  - List all issues with title, status, priority, and visual status badges
  - Display real-time counts of issues by status (Open, In Progress, Resolved, Closed)
  - View detailed issue information (description, severity, priority, created date)
  - Edit and update existing issues
  - Mark issues as **Resolved** or **Closed** with confirmation prompts
  - Search by title (debounced for performance) + filter by priority/status
  - Pagination with previous/next buttons
- **User Authentication**
  - Register and login with email/password
  - Secure password hashing with bcryptjs
  - JWT-based authentication (protected routes)
- **Visual & UX Features**
  - Modern, responsive UI with Tailwind CSS
  - Reusable components (badges, forms, cards)
  - Floating labels, hover effects, glassmorphism navbar
  - Toast notifications for success/error feedback

### Bonus Features Implemented
- TypeScript for type safety in frontend
- Redux for efficient state management (auth + issues)
- Export issue list to CSV and JSON
- Polished UI/UX with reusable components and animations
- Deployed frontend (Netlify) and backend (Render) with live demo

## Technologies Used

**Frontend**
- React 18 + Vite (build tool)
- TypeScript
- Tailwind CSS v3.4
- Redux Toolkit + React-Redux
- React Router v6
- Axios (API client)
- React Icons, Lodash (debounce), PapaParse (CSV), React-Toastify

**Backend**
- Node.js + Express.js
- Mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- dotenv, cors, nodemon (dev)

**Database**
- MongoDB (MongoDB Atlas cloud)


## Setup Instructions

### Prerequisites
- Node.js ≥ 18
- npm
- MongoDB Atlas account (free tier)
- Git

### Clone the Repository
```bash
git clone https://github.com/PasinduNimeshS/Issue-Tracker.git
cd issue-tracker-app
```
## Backend Setup
```bash
cd backend
```
### Install dependencies
```bash
npm install
```

### Create .env file in /backend with:
```bash
PORT=5000
MONGODB_URI=your-mongodb-atlas-uri (e.g., mongodb+srv://user:pass@cluster.mongodb.net/issue-tracker?retryWrites=true&w=majority)
JWT_SECRET=your-strong-random-secret (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
```
### Start Backend Server
```bash
npm run start
```
- Server runs on http://localhost:5000.
- Test with Postman: POST /api/auth/register or /api/issues.

## Frontend Setup

### Navigate to frontend
```bash
cd ../frontend
```
### Install dependencies
```bash
npm install
```

### Create .env file in /frontend with
```bash
VITE_API_URL=http://localhost:5000/api
```

### Start the frontend dev server
```bash
npm run dev
```
- App runs on http://localhost:5173.
- Vite proxies /api requests to backend to avoid CORS issues.

## Running the Full App Locally
- Start backend first, then frontend.
- Open http://localhost:5173 in browser.  
- Register/login, then access dashboard to manage issues.

## Dependencies
### Backend (package.json)
- Production: express, mongoose, dotenv, cors, bcryptjs, jsonwebtoken
- Dev: nodemon

### Frontend (package.json)
- Production: react, react-dom, react-router-dom, axios, react-icons, lodash, papaparse, react-toastify, @reduxjs/toolkit, react-redux
- Dev: @types/*, vite, tailwindcss, postcss, autoprefixer, typescript

## Usage
1. Register/Login: Go to /register or /login. Use valid email/password.
2. Dashboard: View issue counts, list with search/filter/pagination, export buttons.
3. Create Issue: Click "Create Issue" → fill form → submit.
4. View/Edit/Delete: Click title for details → edit/resolve/close/delete with confirmations.
5. Logout: From navbar → redirects to landing page.