// src/pages/movie-lists/MoviesSeries.jsx
import MovieListPage from './MovieListPage'
import { getMoviesBySeries } from '../../service/movieService'

export default function MoviesSeries() {
  return (
    <MovieListPage
      fetchFunction={getMoviesBySeries}
      paramName="type_list"
      titlePrefix="DANH SÁCH"
    />
  )
}
