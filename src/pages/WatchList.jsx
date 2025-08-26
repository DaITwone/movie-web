import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/useAuth';
import { supabase } from '../lib/supabase';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

export default function Watchlist() {
  const { user } = useAuth();
  const [favs, setFavs] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // id của favorite đang xóa
  const [toast, setToast] = useState(null); // { message, item, type } or null
  const undoTimerRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    async function load() {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) console.error(error);
      if (mounted) setFavs(data);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  // Xóa favorite: optimistic UI + gọi API, show toast with Undo
  const removeFavorite = async (fav) => {
    if (!user) return;

    // optimistic UI: remove ngay trên UI
    setFavs((prev) => prev.filter((f) => f.id !== fav.id));
    setDeletingId(fav.id);

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', fav.id);

    setDeletingId(null);

    if (error) {
      console.error(error);
      // rollback và hiển thị toast lỗi
      setFavs((prev) => {
        // nếu đã xóa trong prev, put lại ở đầu
        const exists = prev?.some((p) => p.id === fav.id);
        if (!exists) return [fav, ...(prev || [])];
        return prev;
      });
      setToast({ message: 'Remove failed. Please try again.', type: 'error' });
      clearUndoTimer();
      autoHideToast();
      return;
    }

    // nếu success: show toast có Undo
    setToast({ message: 'Removed from watchlist', type: 'success', item: fav });

    // bắt đầu timer auto clear (ví dụ 6s)
    startUndoTimer();
  };

  const startUndoTimer = () => {
    clearUndoTimer();
    undoTimerRef.current = setTimeout(() => {
      setToast(null);
      undoTimerRef.current = null;
    }, 6000);
  };

  const clearUndoTimer = () => {
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
      undoTimerRef.current = null;
    }
  };

  const autoHideToast = (delay = 3000) => {
    clearUndoTimer();
    undoTimerRef.current = setTimeout(() => {
      setToast(null);
      undoTimerRef.current = null;
    }, delay);
  };

  // Undo: re-insert record to supabase và cập nhật UI
  const handleUndo = async () => {
    if (!toast?.item) return;
    const fav = toast.item;
    clearUndoTimer();
    setToast({ message: 'Restoring...', type: 'info' });

    // attempt to re-insert (keep user_id, movie_id, title, poster_path)
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: fav.user_id,
        movie_id: fav.movie_id,
        title: fav.title,
        poster_path: fav.poster_path,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      setToast({ message: 'Undo failed. Please try again.', type: 'error' });
      autoHideToast(3000);
      return;
    }

    // thêm lại vào UI (đưa ở đầu danh sách)
    setFavs((prev) => [data, ...(prev || [])]);
    setToast({ message: 'Restored', type: 'success' });
    autoHideToast(2000);
  };

  if (!user) return <p className="p-4">Please sign in to view your watchlist</p>;
  if (favs === null) return <Loading />;
  if (favs.length === 0) return <p className="p-4">No favorites yet</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold">Your Watchlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {favs.map((f) => (
          <div key={f.id} className="relative">
            <MovieCard
              movie={{
                id: f.movie_id,
                title: f.title,
                poster_path: f.poster_path,
              }}
            />

            {/* nút xóa ở góc trên phải */}
            <button
              onClick={() => removeFavorite(f)}
              disabled={deletingId === f.id}
              className="absolute top-2 right-2 z-10 bg-black/60 text-white hover:bg-red-600 rounded-full p-1 transition-shadow"
              title="Remove from watchlist"
            >
              {deletingId === f.id ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Toast / Snackbar */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
            <div className="flex-1">
              <div className="text-sm">{toast.message}</div>
            </div>

            {/* nếu có thể undo */}
            {toast.item ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUndo}
                  className="bg-white text-black px-3 py-1 rounded hover:opacity-90 transition"
                >
                  Undo
                </button>
                <button
                  onClick={() => { clearUndoTimer(); setToast(null); }}
                  className="text-gray-300 px-2 py-1 rounded hover:text-white"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setToast(null)}
                className="text-gray-300 px-2 py-1 rounded hover:text-white"
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
