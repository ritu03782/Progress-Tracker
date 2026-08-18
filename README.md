# React + Vite
# Progress Tracker

Progress Tracker is a personal productivity and placement-preparation web application built using React, Tailwind CSS, and Vite.

The application is designed to help students organize and track their DSA preparation, subjects, daily habits, goals, projects, job applications, and coding contests from a single platform.

> Project Status: Frontend development is currently in progress. Backend and API integration are planned for the next phase.

## Features

### Dashboard

- Overall progress overview
- Today's schedule
- Weekly activity
- Recent activity
- Progress statistics
- Quick overview of important tasks

### DSA Tracker

- Track solved DSA problems
- Filter problems by difficulty, status, platform, and topic
- Favourite questions
- Topic-wise progress
- Weak topic identification
- Revision queue
- Platform statistics

### Subject Tracker

- Track academic subjects
- Topic-wise completion
- Overall subject progress
- Study hours
- Weak topics
- Study notes
- Learning resources
- Subject details through an interactive side panel

### Daily Habits

- Create and manage habits
- Mark habits as completed
- Track daily consistency
- Track habit streaks
- View habit completion statistics
- Yearly consistency heatmap
- Daily notes and reflections

### Goals

- Create and manage long-term goals
- Track goal progress
- Associate scheduled tasks with goals
- View active and completed goals
- View detailed goal information through a side panel

### Project Tracker

- Track personal and academic projects
- Project progress
- Project tasks
- Project status
- Technology stack
- GitHub repository links
- Project notes
- Project details through an interactive side panel

### Applications

- Track job and internship applications
- Monitor application status
- Organize companies and roles
- Track application progress

### Contests

- Track coding contests
- Organize upcoming and completed contests
- Monitor contest participation

## Tech Stack

### Frontend

- React.js
- JavaScript
- Vite
- Tailwind CSS
- React Router DOM

### Libraries

- React Icons
- Recharts
- date-fns

### Current Data Storage

- Local Storage

### Planned

- Backend API
- Database
- User authentication
- Cloud data storage

## Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Header.jsx
│   │   └── ProgressBar.jsx
│   │
│   ├── dsa/
│   ├── habits/
│   ├── subjects/
│   ├── goals/
│   ├── projects/
│   ├── applications/
│   └── contests/
│
├── config/
│
├── pages/
│   ├── Dashboard.jsx
│   ├── DailyHabits.jsx
│   ├── DsaTracker.jsx
│   ├── Subjects.jsx
│   ├── Goals.jsx
│   ├── Projects.jsx
│   ├── Applications.jsx
│   └── Contests.jsx
│
├── services/
│   └── habitService.js
│
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css
