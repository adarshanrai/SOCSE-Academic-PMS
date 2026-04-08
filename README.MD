# SOCSE Academic Project Management Portal

## Overview

The SOCSE Academic Project Management Portal is a web-based system designed to manage and display academic projects, departments, student groups, and institutional news.

It consists of:


- A public frontend website
- A separate admin panel
- A backend API server

All components are modular and maintained in separate folders for scalability and clean architecture.

## Project Structure

The root directory contains three main folders:

```
root/
│
├── backend/     # Node.js + Express API server
├── frontend/    # Public website (React)
└── admin-panel/ # Admin dashboard (React)
```

### Backend

Handles:

- API development
- Authentication
- Business logic
- Database operations

### Frontend (User Panel)

Public-facing website
Features:

- View projects
- View news
- Search and filter data

### Admin Panel

Restricted access dashboard
Features:

- Manage projects, groups, departments
- Assign students and teachers
- View analytics and reports

## Key Features

### Authentication

- Secure admin login
- Role-based access control

### Dashboard

Overview statistics:

- Total projects
- Ongoing, completed, pending projects
- Total news
- Total groups

Analytics:

- Project status distribution
- Projects by department
- Projects by semester
- Recent activity tracking

### Project Management

- Create, update, delete projects
- Assign department and semester
- Track progress and timelines
- Filter projects

### News Management

- Add, edit, delete news
- Display announcements

### Group & Assignment Management

- Create student groups
- Assign students
- Assign group leader
- Assign teachers
- Link groups to projects

### Department & Semester Management

- Manage departments (BCA, B.Tech, etc.)
- Define semesters
- Organize academic structure

### Admin Settings

- Manage college details
- Manage users and roles
- Configure system preferences

### Public Website

- View projects and news
- Filter by department, semester, status
- Search functionality

## Tech Stack

### Frontend & Admin Panel

- React (Vite recommended)
- Tailwind CSS (optional)

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL / MySQL

## System Architecture

```
User (Browser)
    ↓
Frontend / Admin Panel (React)
    ↓
Backend API (Node.js / Express)
    ↓
Database (PostgreSQL)
```

## Data Flow

Admin interacts with Admin Panel
Requests are sent to Backend API
Backend processes and stores data in database
Frontend fetches data via APIs
Data is displayed to users
🚀 Getting Started
Prerequisites
Node.js (v18+)
PostgreSQL / MySQL
npm or yarn
Installation

# Clone repository

git clone https://github.com/your-username/socse-project-portal.git

cd socse-project-portal
Setup Backend
cd backend
npm install
npm run dev
Setup Frontend
cd frontend
npm install
npm run dev
Setup Admin Panel
cd admin-panel
npm install
npm run dev
🔐 Environment Variables

Create .env file in backend:

DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
🧪 Testing
Unit testing (API)
Integration testing
UI testing
Authentication testing
📈 Future Enhancements
Student login system
Teacher dashboard
File upload for projects
Notification system
Mobile application
Advanced analytics
🤝 Contribution

Contributions are welcome.
Fork the repository and submit a pull request.

📄 License

This project is for academic and educational purposes.

📌 Conclusion

The SOCSE Academic Project Management Portal provides a scalable and modular solution for managing academic projects, departments, and institutional data while ensuring clean separation between frontend, admin panel, and backend systems.
