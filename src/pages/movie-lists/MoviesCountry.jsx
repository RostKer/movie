// src/pages/movie-lists/MoviesCountry.jsx
import MovieListPage from './MovieListPage'
import { getMoviesByCountry } from '../../service/movieService'

export default function MoviesCountry() {
  return (
    <MovieListPage
      fetchFunction={getMoviesByCountry}
      paramName="slug"
      titlePrefix="QUỐC GIA"
    />
  )
}
