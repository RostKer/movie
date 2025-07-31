// src/pages/movie-lists/Category.jsx
import MovieListPage from './MovieListPage'
import { getMoviesByCategory } from '../../service/movieService'

export default function Category() {
  return (
    <MovieListPage
      fetchFunction={getMoviesByCategory}
      paramName="slug"
      titlePrefix="THỂ LOẠI"
    />
  )
}
