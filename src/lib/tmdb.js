import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const base = 'https://api.themoviedb.org/3'
const imageBase = 'https://image.tmdb.org/t/p'

const tmdb = axios.create({ baseURL: base })

export const getImage = (path, size = 'w500') => (path ? `${imageBase}/${size}${path}` : '')

export async function fetchPopular(page = 1) {
  const res = await tmdb.get('/movie/popular', { params: { api_key: API_KEY, page } })
  return res.data
}

export async function fetchMovie(id) {
  const res = await tmdb.get(`/movie/${id}`, {
    params: { api_key: API_KEY, append_to_response: 'credits' },
  })
  return res.data
}

export async function fetchVideos(id) {
  const res = await tmdb.get(`/movie/${id}/videos`, { params: { api_key: API_KEY } })
  return res.data.results
}

export async function searchMovies(query, page = 1) {
  const res = await tmdb.get('/search/movie', { params: { api_key: API_KEY, query, page } })
  return res.data
}

export async function fetchGenres() {
  const res = await tmdb.get('/genre/movie/list', { params: { api_key: API_KEY } })
  return res.data.genres
}
