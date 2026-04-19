# Smart Venue AI 🏟️🤖

**Smart Venue AI** is a real-time crowd management and predictive routing platform designed to solve operational bottlenecks at large-scale physical events like sports matches, concerts, and festivals.

By analyzing live crowd densities and historical capacity data, the system visualizes congestion metrics for organizers and actively redirects attendees with smart-routing push notifications.

---

## 🔥 Features
*   **Organizer Command Center (`admin/`)**: A sleek, dark-mode glassmorphism dashboard featuring:
    *   Live CSS-animated heatmap simulation of crowd density bottlenecks.
    *   Real-time system health and critical zone metrics.
    *   Live "AI Feed" mimicking automated staff deployment and auto-rerouting events.
*   **Attendee Web App (`client/`)**: A mobile-first, native-feeling PWA interface offering:
    *   Quick-glance wait times for restrooms, food courts, and merchandise stalls.
    *   Dynamic queue mapping and smart pathfinding suggestions.
*   **Real-time Node.js Core (`server/`)**: 
    *   Express REST API routing with mock data controllers.
    *   Predictive bottleneck analysis loop.
    *   MongoDB integration ready (via Mongoose).

## 📂 Project Architecture

```
smart-venue-ai/
├── admin/                      # Organizer Dashboard UI (HTML/CSS/JS)
├── client/                     # Mobile-first Attendee UI App
│   ├── components/             # Modular classes (CrowdManager, MapRenderer, QueueManager)
│   ├── index.html              # Bottom-nav layout
│   └── style.css               # Premium light-mode styling
├── server/                     # Backend API
│   ├── controllers/            # Route logic (Crowd, Queue, Suggestions)
│   ├── models/                 # Mongoose Schemas (ActiveCrowd)
│   ├── routes/                 # Express endpoints
│   ├── data/                   # Mock JSON data / venue configurations
│   ├── utils/                  # Core AI pathfinding/routing logic
│   └── server.js               # Express application entry-point
├── config/                     
│   └── db.js                   # MongoDB connection logic
└── package.json
```

## 🚀 How to Run Locally

### 1. Start the Backend API
You will need [Node.js](https://nodejs.org/) installed on your machine.
```bash
# Move into the project directory
cd smart-venue-ai

# Install the necessary backend dependencies (Express, Mongoose, Cors)
npm install

# Start the server (Defaults to Port 3000)
npm start
```
*Note: A local MongoDB instance is not strictly required to run the mocked API endpoints.*

### 2. View the Interfaces
Because the UIs are built with Vanilla HTML/JS/CSS for maximum performance and minimum bloat, no modern JS bundlers (like Webpack or Vite) are required! 

Simply open the HTML files directly in your web browser:
1. **Admin Dashboard:** Double click `admin/admin.html`
2. **Attendee App:** Double click `client/index.html` (For the best experience, open your browser's Developer Tools (`F12`) and enable the Mobile Device Toolbar to simulate a phone screen).

---

## 🛠️ Technology Stack
*   **Frontend**: Vanilla HTML5, JavaScript (ES6+), Vanilla CSS (Flexbox/Grid, Glassmorphism).
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose).
*   **Icons & Typography**: FontAwesome 6, Google Fonts ('Outfit' & 'Inter').

_Built as a conceptual solution for efficient crowd management at massive physical events._
