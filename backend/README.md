# CuraQuantis Backend API (MongoDB Atlas)

This directory contains the standalone, production-ready Express & MongoDB Atlas backend for the CuraQuantis Partner & Franchise Portal.

---

## 🚀 Local Development

1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   # or with live reload:
   npm run dev
   ```
4. Health check:
   Open [http://localhost:5000/api/health](http://localhost:5000/api/health) in your browser.

---

## 📦 Deployment Guide

### Option 1: Deploy on Render (Recommended - Free & Easy)
1. Push your repository to GitHub.
2. Go to [Render.com](https://render.com) and click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. In **Environment Variables**, add:
   - `PORT`: `5000`
   - `MONGO_URI`: `mongodb+srv://rajmange94_db_user:C76w8anI5GHYkP1t@cluster0.gxsxc6g.mongodb.net/curaquantis?retryWrites=true&w=majority`
   - `CORS_ORIGIN`: `*` (or your frontend deployment URL, e.g. `https://your-curaquantis-site.vercel.app`)
6. Click **Create Web Service**.
7. Copy your assigned Render URL (e.g. `https://curaquantis-api.onrender.com`) and paste it as `VITE_API_URL` in your frontend environment settings!

---

### Option 2: Deploy on Railway
1. Go to [Railway.app](https://railway.app) and create a **New Project**.
2. Select **Deploy from GitHub repo**.
3. Under **Settings**:
   - Set **Root Directory** to `/backend`.
4. In **Variables**, add:
   - `MONGO_URI`: `mongodb+srv://rajmange94_db_user:C76w8anI5GHYkP1t@cluster0.gxsxc6g.mongodb.net/curaquantis?retryWrites=true&w=majority`
   - `PORT`: `5000`
5. Railway will automatically build and start `node server.js`.

---

### Option 3: Deploy on VPS (Ubuntu / Linux) with PM2
1. Clone the repo and navigate to `backend`:
   ```bash
   cd backend
   npm install --production
   ```
2. Start process with PM2:
   ```bash
   pm2 start server.js --name "curaquantis-api"
   pm2 save
   pm2 startup
   ```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status and MongoDB Atlas connection details |
| `POST` | `/api/partner/applications` | Submit application (Pan-India, Regional, or Franchise) |
| `GET` | `/api/partner/applications` | List applications (with query filters: `pathway`, `status`, `search`) |
| `GET` | `/api/partner/applications/:id` | Get single application by ID |
| `PATCH` | `/api/partner/applications/:id/status` | Update application status (Approve, Reject, Interview) |
| `POST` | `/api/partner/applications/:id/clarifications` | Add clarification message to application thread |
| `POST` | `/api/partner/leads` | Register Franchise Investor Lead (with 180-day territory protection) |
| `GET` | `/api/partner/leads` | List all investor leads |
| `PATCH` | `/api/partner/leads/:id` | Update lead status and review notes |

