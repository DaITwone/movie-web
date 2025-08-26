import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../lib/tmdb'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!q) { setMovies([]); return }
    let mounted = true
    setLoading(true)
    searchMovies(q)
      .then((data) => { if (mounted) setMovies(data.results) })
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [q])

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={q}
          onChange={(e) => setSearchParams({ q: e.target.value })}
          placeholder="Search movies..."
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {loading ? <Loading /> : movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  )
}
