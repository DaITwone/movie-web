# Movie App

## 1. Project Description

Movie App is a modern web application that allows users to discover, search, and manage their favorite movies. The app provides a seamless experience for browsing trending films, watching trailers, saving movies to a personal watchlist, secure authentication, and a beautiful, responsive UI.

## 2. Tech Stack

- **React**: UI development
- **Vite**: Fast bundler & dev server
- **TailwindCSS**: Modern, responsive styling
- **Supabase**: User authentication & watchlist storage
- **TMDB API**: Movie data, trailers, search
- **React Router**: Page navigation
- **AOS**: Scroll animations
- **Axios**: API requests
- **ESLint, Prettier**: Code quality

## 3. Features

- Browse trending and popular movies
- Search movies by name
- View movie details and YouTube trailers
- Sign in/sign up with Supabase Auth
- Add/remove movies to your personal Watchlist
- Undo removal from Watchlist
- Toast/snackbar notifications for actions
- Light/Dark theme toggle
- Infinite scroll for loading more movies
- Responsive UI with smooth animations

## 4. Project Structure

```
src/
	components/      // Reusable UI components: NavBar, HeroBanner, MovieCard, Modal, Loading
	pages/           // Main pages: Home, MovieDetail, Search, WatchList, AuthPage
	context/         // Global state management: AuthContext, ThemeContext, useAuth/useTheme hooks
	hooks/           // Custom hooks: useInfiniteScroll
	lib/             // API connections: supabase.js, tmdb.js
	utils/           // Utility functions: formatDate.js
	assets/          // Static assets
index.html         // Root HTML file
vite.config.js     // Vite configuration
eslint.config.js   // ESLint configuration
package.json       // Package info & dependencies
```

- **components/**: Reusable UI elements
- **pages/**: Main application pages
- **context/**: Global state (auth, theme)
- **hooks/**: Custom hooks for advanced logic
- **lib/**: API integrations (Supabase, TMDB)
- **utils/**: Helper functions

## 5. Getting Started

### Installation

```bash
git clone <repo-url>
cd movie-app
npm install
```

### Environment Variables

Create a `.env` file and add:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### Run the App

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

## 6. Usage

- **Explore movies**: Home page shows trending and popular movies with banners.
- **Search**: Use the search bar to find movies by name.
- **Details**: Click a movie to view details, watch trailer, add to watchlist.
- **Watchlist**: Sign in to save favorites, remove or undo removal.
- **Authentication**: Secure sign in/sign up via Supabase Auth.
- **Theme**: Toggle between light and dark modes.

## 7. Future Improvements (optional)

- Add movie ratings and user comments
- Support Google/Facebook login
- Filter movies by genre, release year
- Optimize for SEO, PWA/mobile support
- Add user profile management

---


