# InstaClone - Modern MERN Stack Social Application

InstaClone is an ultra-premium full-stack social media application featuring a glassmorphic dark-theme UI. It supports user profiles, direct messaging channels, interactive homepage feeds (with likes and comment sections), and user authentication.

## 🚀 Key Features
- **User Authentication**: Secure signup and login powered by JSON Web Tokens (JWT).
- **Homepage Feed**: Create posts by entering image URLs and captions. Double tap/click to like and publish comments in real-time.
- **Direct Messaging (Chat)**: Real-time active chat thread with outgoing/incoming message bubble alignment, a direct contact sidebar, and auto-scroll logic.
- **User Profiles**: Dashboard displaying stats (posts count, followers, following) and custom avatar glows.
- **Zero-Configuration database**: Backend automatically spins up an in-memory MongoDB database (`mongodb-memory-server`) if no external connection URI is specified.

---

## 💻 Tech Stack
- **Frontend**: React (18.2.0), React Router v6, Axios, Vanilla CSS.
- **Backend**: Node.js, Express, Mongoose, JWT, MongoDB Memory Server.

---

## 🛠️ Local Development Quickstart

### Prerequisites
- Node.js installed (v18+ recommended)
- npm installed

### 1. Server Configuration
Create a `.env` file in the `server/` directory:
```env
PORT=5000
TOKEN_SECRET=your_super_secret_token
# Optional: Set MONGO_URL to connect to your own database. 
# If left blank, server falls back to an in-memory MongoDB.
# MONGO_URL=mongodb+srv://...
```

### 2. Start the Backend Server
```bash
cd server
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 3. Start the Frontend client
```bash
cd client
npm install
npm start
```
The client will compile and open `http://localhost:3000` automatically.

---

## 📦 How to Upload to GitHub

Follow these steps to push the project to your GitHub repository:

1. **Initialize Git Repository** at the root of the project:
   ```bash
   git init
   ```
2. **Stage all files** (this will respect the `.gitignore` created at the root):
   ```bash
   git add .
   ```
3. **Commit the changes**:
   ```bash
   git commit -m "feat: complete instaclone social features & design overhaul"
   ```
4. **Create a new repository** on [GitHub](https://github.com/new).
5. **Link and push** to your remote repository:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

---

## 🌐 Deployment Instructions

### 1. Database (MongoDB Atlas)
For production persistence, set up a free database on MongoDB Atlas:
1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Shared Cluster.
3. Add a database user (username & password) and whitelist `0.0.0.0/30` IP access.
4. Copy the connection string (URI) and replace the placeholder in your backend `.env` file (`MONGO_URL`).

### 2. Backend Deployment (e.g. Render)
Deploy your Express server on [Render](https://render.com/):
1. Sign in to Render and create a new **Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add **Environment Variables** in the Render settings tab:
   - `PORT=10000` (Render allocates this dynamically)
   - `TOKEN_SECRET=your_secret_production_key`
   - `MONGO_URL=your_mongodb_atlas_connection_string`

### 3. Frontend Deployment (e.g. Vercel)
Deploy your React app on [Vercel](https://vercel.com/):
1. Import your GitHub repository into Vercel.
2. Select your project framework (Create React App).
3. Configure settings:
   - **Root Directory**: `client`
4. Deploy!
5. **Important**: Remember to update the base URL in your frontend axios requests (in `Login.js`, `Register.js`, `Homepage.js`, `Messages.js`) to point to your live Render backend URL instead of `http://localhost:5000`!
