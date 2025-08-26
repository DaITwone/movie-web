import React, { useEffect, useState, useCallback } from 'react';
import { fetchPopular, fetchVideos } from '../lib/tmdb';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import Modal from '../components/Modal';

export default function Home() {
  const [topHeroes, setTopHeroes] = useState([]); // top 3 trending
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const load = useCallback(
    async (p = 1) => {
      setLoading(true);
      try {
        const data = await fetchPopular(p);

        setMovies((prev) => (p === 1 ? data.results : [...prev, ...data.results]));

        // Lấy 3 phim đầu làm banner
        if (p === 1 && data.results.length) {
          setTopHeroes(data.results.slice(0, 5));
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => { load(1); }, [load]); // initial load

  // infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 && !loading) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading]);

  useEffect(() => { if (page > 1) load(page); }, [page, load]);

  async function openTrailer(movieId) {
    const vids = await fetchVideos(movieId);
    const yt = vids.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
    if (yt) {
      setTrailerKey(yt.key);
      setModalOpen(true);
    }
  }

  return (
    <div className="container mx-auto p-4" data-aos="fade-up" data-aos-delay="200">
      <HeroBanner movies={topHeroes} onPlay={(id) => openTrailer(id)} />

      <h2 className="mt-6 text-xl font-semibold">Popular</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>

      {loading && <Loading />}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {trailerKey ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="trailer"
              width="100%"
              height="470"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            />
          </div>
        ) : (
          <p>No trailer found</p>
        )}
      </Modal>
    </div>
  );
}
