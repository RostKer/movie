// src/pages/movie-lists/Search.jsx
import MovieListPage from './MovieListPage'
import { searchMovies } from '../../service/movieService'

export default function Search() {
  return (
    <MovieListPage
      fetchFunction={async (_, page, searchParams) => {
        const keyword = searchParams.get('keyword') || ''
        if (!keyword.trim())
          return {
            items: [],
            params: { pagination: { totalPages: 1 } },
            titlePage: 'Không có từ khoá',
          }
        const res = await searchMovies({ keyword, page, limit: 20 })
        return {
          items: res?.data?.items || [],
          params: res?.data?.params || {},
          titlePage: `TÌM KIẾM: ${keyword}`,
        }
      }}
      paramName={null} // không cần slug
      titlePrefix="" // Search sẽ có title riêng
      useSearchParamsOnly={true}
    />
  )
}
