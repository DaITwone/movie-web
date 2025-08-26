import React, { useState } from 'react';
import { getImage } from '../lib/tmdb';

export default function HeroBanner({ movies = [], onPlay }) {
  const [current, setCurrent] = useState(0);

  if (!movies.length) return null;

  const movie = movies[current];

  const prev = () => setCurrent((c) => (c === 0 ? movies.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === movies.length - 1 ? 0 : c + 1));

  return (
    <div className="relative h-72 md:h-96 rounded overflow-hidden">
      <img
        src={getImage(movie.backdrop_path || movie.poster_path, 'w780')}
        alt={movie.title}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold">{movie.title}</h2>
          <p className="max-w-xl mt-2 text-sm line-clamp-3">{movie.overview}</p>
          <div className="mt-3">
            <button
              onClick={() => onPlay(movie.id)}
              className="px-3 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700"
            >
              Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Nút prev/next */}
      <button
        onClick={prev}
        className="absolute opacity-50 left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 hover:opacity-100"
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute opacity-50 right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 hover:opacity-100"
      >
        &#8594;
      </button>
    </div>
  );
}
