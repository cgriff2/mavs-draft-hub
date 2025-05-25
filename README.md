# 🏀 Mavericks Draft Hub

The **Mavericks Draft Hub** is a React-based web app that allows scouts and decision-makers to view, compare, and analyze NBA draft prospects. Built with React, React Router, and Material UI, this app features an interactive Big Board and detailed player profiles with stats, measurements, and scouting report functionality.

## 🚀 Features

- **Big Board**
  - Displays a list of players sorted by average scout ranking
  - Each card links to a detailed player profile

- **Player Profile**
  - Shows player bio, measurements, and photo
  - Toggle between per-game and total stats
  - Displays individual scout rankings with color-coded indicators
  - Input form to add new scouting reports (stored in component state)

## 🛠 Tech Stack

- **Frontend:** React, Vite
- **Routing:** React Router
- **Styling & UI:** Material UI (MUI)
- **Data:** Static JSON (`draftDataWrapper.js`)

## 🧪 Functionality Criteria Checklist

✅ **Dynamic Input:**  
Toggle between per-game and total stats on the player profile page.

✅ **Form Submission with State:**  
Add a new scouting report using the form — updates local state and re-renders without persistence.
