# CuraQuantis Architecture & Deployment Guide

This project is organized into two independent, production-ready modules for seamless deployment:

```
├── backend/                  <-- Express.js + MongoDB Atlas API
│   ├── models/
│   │   ├── PartnerApplication.js
│   │   └── InvestorLead.js
│   ├── .env                  <-- MongoDB Atlas Connection URI & Port
│   ├── .env.example
│   ├── package.json          <-- Backend dependencies only
│   ├── README.md             <-- Backend deployment walkthrough
│   ├── seedData.js           <-- Initial seeding dataset
│   └── server.js             <-- Express REST API entry point
│
├── frontend/                 <-- React 18 + Vite + Tailwind CSS
│   ├── public/               <-- Logos, icons, and static assets
│   ├── src/                  <-- React components, pages & stores
│   ├── .env                  <-- VITE_API_URL pointing to backend
│   ├── .env.example
│   ├── index.html
│   ├── package.json          <-- Frontend UI dependencies only
│   ├── README.md             <-- Frontend deployment walkthrough
│   ├── vercel.json           <-- SPA rewrite configuration
│   └── vite.config.ts        <-- Vite proxy & build configuration
│
└── DEPLOYMENT_GUIDE.md       <-- You are here!
```

---

## ⚡ Quick Start (Local Development)

### 1. Run the Backend API (Port 5000)
```bash
cd backend
npm install
npm start
```
*Connected to MongoDB Atlas: `cluster0.gxsxc6g.mongodb.net/curaquantis`*

### 2. Run the Frontend UI (Port 8080)
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
*Open `http://localhost:8080/partner-portal` in your browser.*

---

## 🚀 How to Deploy in 5 Minutes

### Step 1: Deploy Backend to Render (Free Web Service)
1. Push your repository to GitHub.
2. Sign in to [Render.com](https://render.com) and click **New +** → **Web Service**.
3. Select your GitHub repository.
4. Set:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - `PORT`: `5000`
   - `MONGO_URI`: `mongodb+srv://rajmange94_db_user:C76w8anI5GHYkP1t@cluster0.gxsxc6g.mongodb.net/curaquantis?retryWrites=true&w=majority`
   - `CORS_ORIGIN`: `*`
6. Click **Create Web Service**.
7. Note down your Render API URL (e.g. `https://curaquantis-api.onrender.com`).

---

### Step 2: Deploy Frontend to Vercel
1. Sign in to [Vercel](https://vercel.com) and click **Add New...** → **Project**.
2. Select the same GitHub repository.
3. Under **Project Configuration**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and choose `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**:
   - Name: `VITE_API_URL`
   - Value: `https://curaquantis-api.onrender.com` *(your deployed Render backend URL from Step 1)*
5. Click **Deploy**.

---

## 🛡️ Stored Data & Workflows

1. **Pan-India Channel Partner Form** (`/apply/pan-india`):
   - Stored in `partner_applications` on MongoDB Atlas.
2. **Regional Channel Partner Form** (`/apply/regional`):
   - Stored in `partner_applications` on MongoDB Atlas.
3. **Franchise Investor Form** (`/apply/franchise`):
   - Stored in `partner_applications` on MongoDB Atlas.
4. **Partner Lead Registration** (`/portal/partner-dashboard`):
   - Stored in `investor_leads` on MongoDB Atlas (with 180-day exclusivity protection).
5. **CuraQuantis Scrutiny Board** (`/portal/admin`):
   - Pulls live applications from MongoDB Atlas with full review, status update, and messaging capabilities.

