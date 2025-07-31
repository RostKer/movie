// src/pages/movie-lists/Category.jsx
import MovieListPage from './MovieListPage'
import { getMoviesByYear } from '../../service/movieService'

export default function MovieYear() {
  return (
    <MovieListPage
      fetchFunction={getMoviesByYear}
      paramName="slug"
      titlePrefix="NĂM"
    />
  )
}
