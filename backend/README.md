# SOCSE Academic PMS Backend

## Setup

1. Copy `.env.example` to `.env` and set values:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
   - `JWT_SECRET`
2. `npm install`
3. `npm run dev` (or `npm start`)

## Features implemented

- Admin auth: `/api/auth/login`, `/api/auth/register`
- Dashboard: `/api/dashboard`
- Projects CRUD, filtering and search: `/api/projects`
- News CRUD: `/api/news`
- Groups CRUD + student/teacher assignments: `/api/groups`
- Departments CRUD: `/api/departments`
- Semesters CRUD: `/api/semesters`
- Settings management: `/api/settings`

## DB schema

- `admins`, `projects`, `news`, `departments`, `semesters`, `groups`, `students`, `teachers`, `group_students`, `group_teachers`, `settings`

## Notes

- Uses PostgreSQL. Ensure the DB user password is a string.
- `db/setup.js` runs automatically and creates missing tables.
