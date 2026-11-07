# DoDigital — Full-Stack Digital Marketing Platform

This project is a full-stack web application built as a final project for CIS 1962.

## Overview
DoDigital is a digital marketing platform designed for small and independent businesses.  
Users can:
- Request dynamic website & marketing quotes
- Schedule consultation meetings
- Receive pricing based on business type and services

## Tech Stack
- Frontend: React + React Router (Vite)
- Backend: Node.js + Express
- Database: MongoDB (via Mongoose)

## Features
- Dynamic quote generation
- Conditional form rendering based on business type
- MongoDB data persistence
- Modern UI with branded styling and animations

## How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev

## Setup
Create `backend/.env` with `MONGO_URI=<your MongoDB connection string>`, then run `npm install && node server.js` in `backend/` and `npm install && npm run dev` in `frontend/`.
