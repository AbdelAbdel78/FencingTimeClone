# FencingTime

FencingTime is a web app for managing fencing club rosters and competitions. It tracks fencers and their ratings, organizes events by weapon/category/gender, handles event registration, and generates pool assignments and bouts.

## Features

- **Fencers** — add, edit, and browse a roster of fencers, including club, gender, birthdate, and foil/épée/saber ratings
- **Events** — create and edit competitions (name, capacity, address, start time, weapon, category, gender)
- **Registration** — register fencers to events and view who's competing in each event
- **Pools** — view pool assignments and bouts for an event, including seeding and per-bout results

## Tech Stack

- **Frontend:** React 18 (Vite), React Router
- **Backend:** Express (`server.cjs`)
- **Database:** PostgreSQL (`pg`)
- **Deployment:** Vercel, with `@vercel/analytics` and `@vercel/speed-insights`

## Getting Started

### Prerequisites

- Node.js
- A PostgreSQL database with `fencers`, `events`, `event_fencers`, `pools`, and `pool_bouts` tables

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your database credentials:

   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_SERVER=your_db_host
   DB_NAME=your_db_name
   ```

3. Start the backend API server:

   ```bash
   node server.cjs
   ```

   This runs on `http://localhost:5000` and exposes REST endpoints under `/api` for fencers, events, event registrations, pools, and bouts.

4. In a separate terminal, start the frontend dev server:

   ```bash
   npm run dev
   ```

   Vite proxies `/api` requests to the backend during local development.

### Other Scripts

- `npm run build` — production build
- `npm run preview` — preview a production build locally
- `npm run lint` — run ESLint
