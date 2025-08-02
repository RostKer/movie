import MovieListPage from './MovieListPage'
import { getMoviesByYear } from '../../service/movieService'

const MovieYear = () => {
  return (
    <MovieListPage
      fetchFunction={getMoviesByYear}
      paramName="slug"
      titlePrefix=""
    />
  )
}
export default MovieYear
