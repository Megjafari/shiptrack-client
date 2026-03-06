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
- Shipment detail view with full tracking event timeline
- Create shipment workflow with auto-generated tracking ID
- Filtering and search by shipment status, tracking ID, or city
- Operational table with carrier and ETA information
- Responsive dashboard layout
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
| Styling | Custom styling using CSS variables and component-level styles |
| Deploy | Vercel |

---

## System Overview

ShipTrack is split into two parts:

- **ShipTrack Client** – a React dashboard used to visualize and manage shipments
- **ShipTrack API** – an ASP.NET Core REST API that provides shipment data and tracking events

The frontend fetches shipment data from the API and displays it through operational dashboards including statistics, shipment tables, and tracking timelines.

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
│   ├── Layout.tsx          # Sidebar + main layout
│   └── ShipmentChart.tsx   # 30-day line chart
├── pages/
│   ├── Dashboard.tsx       # Main overview page
│   ├── ShipmentDetail.tsx  # Single shipment view
│   └── CreateShipment.tsx  # New shipment form
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
<img width="1899" height="899" alt="Screenshot 2026-03-06 102142" src="https://github.com/user-attachments/assets/90379857-a952-4f4a-9d4e-2f4b505d387b" />


### Shipment Detail
<img width="1904" height="725" alt="Screenshot 2026-03-06 102221" src="https://github.com/user-attachments/assets/60b125ac-669c-4efd-9d96-59448d6ec825" />


### Create Shipment
<img width="744" height="582" alt="Screenshot 2026-03-06 102252" src="https://github.com/user-attachments/assets/73587be6-ff1d-4f3b-a739-fc91c8db8308" />


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

Built by [Meghdad jafari](https://meghdadjafari.dev)
