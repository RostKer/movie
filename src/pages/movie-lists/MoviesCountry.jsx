// src/pages/movie-lists/MoviesCountry.jsx
import MovieListPage from './MovieListPage'
import { getMoviesByCountry } from '../../service/movieService'

const MoviesCountry = () => {
  return (
    <MovieListPage
      fetchFunction={getMoviesByCountry}
      paramName="slug"
      titlePrefix="QUỐC GIA"
    />
  )
}
export default MoviesCountry
