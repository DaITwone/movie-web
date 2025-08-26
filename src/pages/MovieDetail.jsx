import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovie, fetchVideos, getImage } from '../lib/tmdb';
import Loading from '../components/Loading';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/useAuth';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // states cho trailer overlay
  const [modalOpen, setModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  // toast state
  const [toast, setToast] = useState(null); // { message, type, actionLabel, action }
  const toastTimerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const m = await fetchMovie(id);
      const vids = await fetchVideos(id);
      if (mounted) {
        setMovie(m);
        setVideos(vids);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  // disable body scroll khi modal mở
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  // đóng bằng phím ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // toast helpers
  const showToast = (payload = { message: '', type: 'info', actionLabel: null, action: null }, duration = 4000) => {
    clearToastTimer();
    setToast(payload);
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, duration);
  };

  const clearToastTimer = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  };

  // Add favorite without alert: show toast instead
  const addFavorite = async () => {
    if (!user) {
      showToast({
        message: 'Please sign in to add favorites',
        type: 'warning',
        actionLabel: 'Sign in',
        action: () => navigate('/auth'),
      }, 6000);
      return;
    }

    // insert into supabase
    const { error } = await supabase.from('favorites').insert({
      user_id: user.id,
      movie_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    });

    if (error) {
      console.error(error);
      showToast({ message: 'Failed to add to watchlist', type: 'error' }, 4000);
      return;
    }

    // success
    showToast({
      message: 'Added to watchlist',
      type: 'success',
      actionLabel: 'View',
      action: () => navigate('/watchlist'),
    }, 5000);
  };

  if (loading) return <Loading />;
  if (!movie) return <p className="p-4">Không tìm thấy phim</p>;

  const trailer = videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  // mở overlay và set trailerKey
  const openTrailerInline = (key) => {
    setTrailerKey(key);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="md:flex gap-6">
        <img
          src={getImage(movie.poster_path, 'w500')}
          className="w-full md:w-1/4 rounded-xl"
          alt={movie.title}
        />
        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="mt-2">{movie.overview}</p>
          <p className="mt-2">Release: {movie.release_date}</p>
          <p className="mt-1">Rating: {movie.vote_average}</p>
          <div className="mt-4 flex gap-2">
            <button
              className="px-3 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
              onClick={addFavorite}
            >
              Add to Watchlist
            </button>

            {trailer ? (
              <button
                className="px-3 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
                onClick={() => openTrailerInline(trailer.key)}
              >
                Watch Trailer
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Overlay trailer làm background */}
      {modalOpen && trailerKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
        >
          {/* dim nền + blur (bg + backdrop blur) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* iframe phủ full màn hình, background-like */}
          <div className="relative w-full h-full">
            <iframe
              title="trailer"
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&rel=0&modestbranding=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
            />

            {/* nội dung phía trên (ví dụ nút đóng và thông tin rút gọn) */}
            <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
              <div className="text-white">
                <h2 className="text-xl font-bold">{movie.title}</h2>
                <p className="text-sm opacity-80">{movie.release_date} • Rating {movie.vote_average}</p>
              </div>

              <button
                className="ml-4 rounded-full bg-black/40 text-white px-3 py-2 hover:bg-black/60 transition"
                onClick={() => setModalOpen(false)}
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast / Snackbar */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`flex items-center gap-4 px-4 py-3 rounded-lg shadow-lg
            ${toast.type === 'success' ? 'bg-green-600 text-white' : ''}
            ${toast.type === 'error' ? 'bg-red-600 text-white' : ''}
            ${toast.type === 'warning' ? 'bg-yellow-500 text-black' : ''}
            ${toast.type === 'info' ? 'bg-gray-800 text-white' : ''}
          `}>
            <div className="flex-1 text-sm">{toast.message}</div>

            {toast.actionLabel && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (typeof toast.action === 'function') toast.action();
                    setToast(null);
                    clearToastTimer();
                  }}
                  className="bg-white text-black px-3 py-1 rounded hover:opacity-90 transition"
                >
                  {toast.actionLabel}
                </button>
                <button
                  onClick={() => { setToast(null); clearToastTimer(); }}
                  className="text-gray-100 px-2 py-1 rounded hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}

            {!toast.actionLabel && (
              <button
                onClick={() => { setToast(null); clearToastTimer(); }}
                className="text-gray-100 px-2 py-1 rounded hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
