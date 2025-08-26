# 🎬 Movie App

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/github/workflow/status/DaITwone/movie-web/CI/main" alt="Build">
  <img src="https://img.shields.io/npm/v/react.svg" alt="React">
</p>

Movie App is a modern web application that allows users to **discover, search, and manage their favorite movies**.  
The app provides a seamless experience for browsing trending films, watching trailers, saving movies to a personal watchlist, secure authentication, and a beautiful, responsive UI.

---

## 📑 Table of Contents
- [Project Description](#-project-description)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Future Improvements](#-future-improvements)

---

## 📝 Project Description
Movie App is a full-featured web application built with React, Vite, and Supabase.  
It integrates **TMDB API** for movie data and trailers, and provides a responsive, modern UI with TailwindCSS.

---

## ⚙️ Tech Stack
- ⚛ **React** – UI development  
- ⚡ **Vite** – Fast bundler & dev server  
- 🎨 **TailwindCSS** – Modern, responsive styling  
- 🔐 **Supabase** – User authentication & watchlist storage  
- 🎥 **TMDB API** – Movie data, trailers, search  
- 🔀 **React Router** – Page navigation  
- ✨ **AOS** – Scroll animations  
- 🌐 **Axios** – API requests  
- 🧹 **ESLint & Prettier** – Code quality  

---

## 🌟 Features
- 🔎 Browse trending and popular movies  
- 📝 Search movies by name  
- 🎞 View movie details and YouTube trailers  
- 👤 Sign in / Sign up with Supabase Auth  
- 📌 Add / remove movies to personal Watchlist  
- ↩ Undo removal from Watchlist  
- 🔔 Toast/snackbar notifications for actions  
- 🌓 Light/Dark theme toggle  
- 📜 Infinite scroll for more movies  
- 📱 Responsive UI with smooth animations  

---

## 📂 Project Structure

```
src/
  components/   # Reusable UI components: NavBar, HeroBanner, MovieCard, Modal, Loading
  pages/        # Main pages: Home, MovieDetail, Search, WatchList, AuthPage
  context/      # Global state: AuthContext, ThemeContext, useAuth/useTheme hooks
  hooks/        # Custom hooks: useInfiniteScroll
  lib/          # API connections: supabase.js, tmdb.js
  utils/        # Utility functions: formatDate.js
  assets/       # Static assets
index.html
vite.config.js
eslint.config.js
package.json
```

---

## 🚀 Getting Started

### Installation
```bash
git clone <repo-url>
cd movie-app
npm install
```

### Environment Variables
Create a `.env` file and add:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### Run the App
```bash
npm run dev
```
👉 Visit [http://localhost:5173](http://localhost:5173)

---

## 🎮 Usage
- **Explore movies**: Home page shows trending & popular movies.  
- **Search**: Find movies by name.  
- **Details**: View details, watch trailer, add to watchlist.  
- **Watchlist**: Save favorites, remove or undo removal.  
- **Authentication**: Secure sign in / sign up via Supabase.  
- **Theme**: Toggle light/dark mode.  

---

## 🚧 Future Improvements
- ⭐ Add movie ratings & user comments  
- 🔑 Support Google/Facebook login  
- 🎭 Filter by genre, release year  
- 📱 PWA/mobile support & SEO optimization  
- 👤 User profile management  

---

✨ Built with love using **React + Vite + Supabase + TMDB API**.
