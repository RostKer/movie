// src/pages/movie-lists/MoviesSeries.jsx
import MovieListPage from './MovieListPage'
import { getMoviesBySeries } from '../../service/movieService'

const MoviesSeries = () => {
  return (
    <MovieListPage
      fetchFunction={getMoviesBySeries}
      paramName="type_list"
      titlePrefix="DANH SÁCH"
    />
  )
}
export default MoviesSeries
