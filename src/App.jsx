import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import Watchlist from './pages/WatchList';
import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen px-25 bg-gradient-to-r from-gray-800 to-black text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
