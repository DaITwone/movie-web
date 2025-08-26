import React from 'react';
import { Link } from 'react-router-dom';
import { getImage } from '../lib/tmdb';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="rounded overflow-hidden shadow hover:bg-gray-900 hover:shadow-2xl hover:scale-105 transition-transform duration-300" data-aos="fade-up" data-aos-easing="ease-in-out">
        <img
          src={movie.poster_path ? getImage(movie.poster_path, 'w300') : ''}
          alt={movie.title}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
          <p className="text-xs text-gray-500">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
}
