## Savra Teacher Dashboard

A full-stack teacher activity dashboard built with a **React + Vite** frontend and an **Express + MongoDB** backend, deployed to **Vercel**.

### Tech Stack

- **Frontend**: React 19, React Router, Redux Toolkit, Tailwind CSS (via `@tailwindcss/vite`), Recharts, Vite
- **Backend**: Node.js, Express 5, Mongoose, JSON Web Token (JWT), dotenv
- **Database**: MongoDB (via `MONGODB_URI`)
- **Deployment**:
  - Frontend: Vercel static build (`frontend/vercel.json`)
  - Backend: Vercel serverless functions (`backend/vercel.json`)

### Project Structure

- **`frontend/`**: SPA dashboard UI
  - `src/main.jsx`: App bootstrap, routing setup
  - `src/App.jsx`: Dashboard layout (`Sidebar`, `Navbar`, `Outlet`)
  - `src/store/store.js`: Redux store (`dashboard`, `teachers`)
  - `src/features/*Slice.js`: State slices for dashboard metrics and teacher data
  - `src/pages/`: Route-level pages (`Dashboard`, `TeachersList`, `TeacherDetails`)
  - `src/components/`: Layout and reusable components (sidebar, navbar, cards, charts)
  - `src/utils/axios.js`: Preconfigured Axios instance for API calls
- **`backend/`**: REST API server
  - `src/index.js`: Entry point (loads env, connects DB, starts server)
  - `src/app.js`: Express app, CORS + body parsing, route registration
  - `src/db/db.js`: MongoDB connection via Mongoose
  - `src/models/activity.model.js`: Activity schema/model
  - `src/controllers/*.controller.js`: Request handlers for activities and teachers
  - `src/routes/*.routes.js`: Route definitions for `/api/v1/activity` and `/api/v1/teacher`
  - `src/utils/ApiError.js`, `ApiResponse.js`, `asyncHandler.js`: API utilities
  - `vercel.json`: Vercel config for serverless deployment

### Architecture Decisions

- **Separation of concerns (frontend vs backend)**  
  The app is split into distinct `frontend` and `backend` packages to keep UI and API concerns isolated. This allows independent deployment, scaling, and testing of both layers.

- **React SPA with client-side routing**  
  The dashboard is built as a single-page application using React Router. This gives a smooth, app-like navigation experience between dashboard, teacher list, and teacher detail views without full page reloads.

- **Global state with Redux Toolkit**  
  Redux Toolkit is used for cross-page state such as dashboard metrics and teacher data. This simplifies async data fetching and caching of API responses, and keeps the UI predictable as the app grows.

- **Modular API design (resource-based routing)**  
  Backend routes are organized by resource (`/activity`, `/teacher`) with dedicated controllers and models. This keeps the domain boundaries clear and makes it straightforward to add new resources (e.g. `/class`, `/subject`) in the future.

- **Async utilities and error/response wrappers**  
  Helpers like `asyncHandler`, `ApiError`, and `ApiResponse` centralize common patterns (error handling, consistent response shape). This reduces boilerplate in controllers and makes behavior more uniform across endpoints.

- **MongoDB + Mongoose for flexible data modeling**  
  MongoDB is used to store teacher and activity data. Mongoose models provide schema validation and a convenient query layer, which works well for an analytics-style dashboard with evolving requirements.

- **CORS and environment-based configuration**  
  The backend is configured with explicit CORS origin (`https://teacher-dashboard-savra.vercel.app`) and uses `dotenv` to load secrets (`MONGODB_URI`, `PORT`, any JWT secrets) from `.env`. This keeps configuration out of source control.

- **Vercel-focused deployment**  
  Both frontend and backend are configured via `vercel.json` files. The backend uses `@vercel/node` for serverless execution, while the frontend uses `@vercel/static-build` with Vite. This keeps deployment minimal and aligned with Vercel’s platform.

### Local Development

- **Prerequisites**
  - Node.js (LTS)
  - A MongoDB instance (local or hosted)

- **Backend**
  1. `cd backend`
  2. Create `.env`:
     - `MONGODB_URI=<your-mongodb-uri>`
     - `PORT=8000` (or any available port)
  3. Install dependencies: `npm install`
  4. Start dev server: `npm run dev`

- **Frontend**
  1. `cd frontend`
  2. Install dependencies: `npm install`
  3. Start dev server: `npm run dev`
  4. Ensure `src/utils/axios.js` `baseURL` matches your backend URL (e.g. `http://localhost:8000/api/v1`).

### API Overview

- **Base URL (local)**: `http://localhost:8000/api/v1`

- **Teacher endpoints** (`/teacher`)
  - `GET /teacher` – list teachers
  - `GET /teacher/:id` – get a single teacher and related data
  - Additional CRUD operations may exist depending on controller implementation.

- **Activity endpoints** (`/activity`)
  - `GET /activity` – list activities (e.g. by teacher, date range, etc.)
  - `POST /activity` – create new activity entries
  - Other endpoints as defined in `activity.routes.js` and `activity.controller.js`.

### Future Scalability Improvements

- **API versioning and contract stability**  
  The API is already namespaced under `/api/v1`. As new features are added or breaking changes are required, consider introducing `/api/v2` endpoints and deprecating older versions in a controlled way.

- **Decoupling frontend and backend deployments**  
  Currently both services are Vercel-based. For higher load or stricter SLAs, the backend could be moved to a dedicated Node hosting environment (e.g. containerized on a VM or Kubernetes) while keeping the frontend on Vercel/another CDN.

- **Improved configuration and secret management**  
  Move sensitive configuration from plain `.env` files to a managed secret store (Vercel environment variables, Vault, etc.), and standardize configuration via a central config module.

- **More granular service boundaries**  
  As the domain grows (more entities like classes, subjects, attendance, etc.), consider extracting separate service modules or microservices to keep each context independently deployable and testable.

- **Caching and performance**  
  Introduce caching for read-heavy endpoints (e.g. Dashboard metrics) using an in-memory cache or Redis. This will reduce MongoDB load and improve dashboard responsiveness for large datasets.

- **Background jobs and analytics**  
  For heavy analytics or aggregations, move computation to background jobs (e.g. a worker queue) and precompute commonly used metrics. The frontend can then consume pre-aggregated data for instant loading.

- **Authentication and authorization**  
  JWT is already installed in the backend; adding authentication (login, roles/permissions) would allow per-teacher dashboards, admin views, and finer-grained access control.

- **Testing and CI**  
  Introduce unit tests for reducers, controllers, and utilities, plus integration tests for major flows. A simple CI pipeline (e.g. GitHub Actions) can run tests and lint on every push/PR.

### How to Contribute / Extend

- **Add a new backend resource**
  1. Create a Mongoose model in `backend/src/models/`.
  2. Add a controller in `backend/src/controllers/`.
  3. Add routes in `backend/src/routes/` and mount them in `app.js` under `/api/v1/<resource>`.

- **Add a new frontend page**
  1. Create a page component in `frontend/src/pages/`.
  2. Add it to the router tree in `frontend/src/main.jsx`.
  3. Wire it to the store via a slice in `frontend/src/features/` if it requires global state.

### Environment & Configuration

- **Backend `.env` (example)**
  - `MONGODB_URI=mongodb+srv://...`
  - `PORT=8000`
  - `JWT_SECRET=your-secret` (if/when auth is implemented)

- **Frontend configuration**
  - `src/utils/axios.js` controls the base API URL.
  - For production, point `baseURL` to the deployed backend URL instead of `localhost`.

### License and Author

- **Author**: Jeevansh Grover
- **Backend license**: ISC (per `backend/package.json`)

