# CuraQuantis Frontend (Vite + React + Tailwind)

This directory contains the standalone, production-ready frontend for the CuraQuantis Healthcare platform and Partner & Franchise Portal.

---

## 🚀 Local Development

1. Navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:8080](http://localhost:8080) (or the port Vite outputs) in your browser.

---

## 📦 Deployment Guide

### Option 1: Deploy on Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New...** → **Project**.
3. Import your GitHub repository.
4. In **Project Configuration**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click "Edit" and choose `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. In **Environment Variables**, add:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://curaquantis-api.onrender.com`)
6. Click **Deploy**!

> **Note on Client-Side Routing**: The [`vercel.json`](./vercel.json) file included in this folder automatically configures SPA rewrites so direct navigation to `/partner-portal`, `/apply/regional`, etc. works without 404 errors.

---

### Option 2: Deploy on Netlify
1. Go to [Netlify](https://netlify.com) and click **Add new site** → **Import an existing project**.
2. Select your repository.
3. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Set Environment Variable:
   - `VITE_API_URL`: `https://your-backend-api-url.com`
5. Click **Deploy Site**.

---

### Option 3: Static Build
To generate production-ready static assets locally:
```bash
npm run build
```
Output will be generated in `dist/`.

