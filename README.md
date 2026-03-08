# ShipTrack Client

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Frontend dashboard for ShipTrack — a shipment tracking platform designed to simulate how logistics systems visualize shipment flows, delivery statuses, and operational data.

The project was built to explore how logistics dashboards can be structured, including shipment tracking, filtering, and operational overview.

> ⚠️ **Note:** The backend API is hosted on Render's free tier and may take **30–60 seconds to load data** on the first visit after inactivity. The UI will appear immediately – just wait a moment for the data to populate.

---

## Project Purpose

This project explores how operational dashboards for logistics platforms can be designed.

It focuses on building a clear UI for shipment tracking, status filtering, and operational insights based on data from the ShipTrack API.

---

## 🔗 Links

- **Live demo:** [https://shiptrack.meghdadjafari.dev](https://shiptrack.meghdadjafari.dev)
- **Backend repo:** [shiptrack-api](https://github.com/Megjafari/shiptrack-api)

---

## Features

- Dashboard overview with shipment statistics and 30-day activity chart
- Shipment detail view with full tracking timeline and interactive route map
- Create shipment with weight input and automatic carrier recommendation
- Filtering and search by status, tracking ID, or city
- Operational table with carrier and ETA information
- Mobile responsive layout with hamburger menu
- Toast notification on shipment creation
- Type-safe data models with TypeScript

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript |
| Build tool | Vite |
| Routing | React Router v6 |
| Charts | Recharts |
| Maps | Leaflet + React Leaflet |
| Styling | CSS variables + component-level styles |
| Deploy | Vercel |

---

## System Overview

ShipTrack is split into two parts:

- **ShipTrack Client** – a React dashboard used to visualize and manage shipments
- **ShipTrack API** – an ASP.NET Core REST API that provides shipment data and tracking events

The frontend fetches shipment data from the API and displays it through operational dashboards including statistics, shipment tables, tracking timelines, and route maps.

```
React Client (TypeScript)
        ↓
ShipTrack REST API (.NET)
        ↓
In-memory shipment dataset
```

---

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Sidebar + mobile hamburger menu
│   ├── ShipmentChart.tsx   # 30-day line chart
│   └── ShipmentMap.tsx     # Interactive route map (Leaflet)
├── pages/
│   ├── Dashboard.tsx       # Main overview page
│   ├── ShipmentDetail.tsx  # Single shipment view with map
│   └── CreateShipment.tsx  # New shipment form with carrier recommendation
├── services/
│   └── shipmentService.ts  # API calls
├── types/
│   └── shipment.ts         # TypeScript interfaces
├── App.tsx                 # Routing
└── index.css               # Global styles + CSS variables
```

---

## Screenshots

### Dashboard
<img width="1896" height="918" alt="overview" src="https://github.com/user-attachments/assets/8bb49565-3303-4e91-9668-4c4e5f60ffa4" />


### Shipment Detail
<img width="1896" height="920" alt="detail" src="https://github.com/user-attachments/assets/177303e6-b2ed-494a-bb00-88282b34bcef" />


### Create Shipment
<img width="1063" height="660" alt="Create" src="https://github.com/user-attachments/assets/a6072c2f-b8cc-4285-9acf-18c34c11c2fd" />



---

## Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- Backend API running locally (see [shiptrack-api](https://github.com/Megjafari/shiptrack-api))

### Steps

```bash
# Clone the repo
git clone https://github.com/Megjafari/shiptrack-client.git
cd shiptrack-client

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

Make sure the backend is running on `http://localhost:5141` before starting the frontend.

---

Built by [Meghdad Jafari](https://meghdadjafari.dev)
