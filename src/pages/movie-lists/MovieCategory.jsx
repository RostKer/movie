// src/pages/movie-lists/Category.jsx
import MovieListPage from './MovieListPage'
import { getMoviesByCategory } from '../../service/movieService'
const MovieCategory = () => {
  return (
    <MovieListPage
      fetchFunction={getMoviesByCategory}
      paramName="slug"
      titlePrefix="THỂ LOẠI"
    />
  )
}
export default MovieCategory
