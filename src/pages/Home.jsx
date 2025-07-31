import MovieListPage from './movie-lists/MovieListPage'
import { getMovies } from '../service/movieService'

export default function Home() {
  return (
    <MovieListPage
      fetchFunction={getMovies}
      titlePrefix="PHIM MỚI CẬP NHẬT"
      useSearchParamsOnly={true}
      showApiTitle={false}
    />
  )
}
