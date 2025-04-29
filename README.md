# Notes App - MERN Stack

A simple notes application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js) that allows users to create, view, and delete notes.

## Features

- Create notes with title and content
- View all notes sorted by creation date (newest first)
- Delete notes
- Real-time updates without page reload
- Loading indicators during API requests


## Live Deployment

- **Frontend**: https://mini-note-zeta.vercel.app/
- **Backend**: https://mini-note.onrender.com/

## Installation (Local Development)

Since the backend is already deployed, you only need to run the frontend:

1. Navigate to the folder:
   ```bash
   npm i
2. Run the development server:
   ```bash
   npm run dev

The app will be available at http://localhost:5173 (or the port specified by Vite).

API Endpoints
The frontend communicates with these backend API endpoints:

POST /notes - Create a new note

GET /notes - Get all notes (sorted by createdAt descending)

DELETE /notes/:id - Delete a note by ID

Technologies Used
Frontend: React.js, Vite, Axios

Backend: Node.js, Express.js, MongoDB Atlas

Deployment:

Frontend: Vercel

Backend: Render



