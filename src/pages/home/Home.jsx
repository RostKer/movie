import BannerSlider from './BannerSlider'
import MovieGrid from './MovieGrid'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMovies, getMoviesBySeriesItems } from '../../service/movieService'
import Swal from 'sweetalert2'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [MovieSeries, setMovieSeries] = useState([])
  const [MovieSingle, setMovieSingle] = useState([])
  const [MovieCartoon, setMovieCartoon] = useState([])
  const [TVShows, setTVShows] = useState([])
  const [loadingSeries, setLoadingSeries] = useState(false)
  const fetchMoviesNew = async () => {
    try {
      setLoading(true)
      const data = await getMovies()
      setMovies(data?.items || [])
    } catch (error) {
      console.error(error)
      Swal.fire('Lỗi', 'Không thể tải dữ liệu!', 'error')
    } finally {
      setLoading(false)
    }
  }

  const fetchMovieSingle = async () => {
    try {
      setLoadingSeries(true)
      const data = await getMoviesBySeriesItems('phim-le', 1)
      setMovieSingle(data.items || []) // lấy đúng field items
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingSeries(false)
    }
  }

  const fetchMovieSeries = async () => {
    try {
      setLoadingSeries(true)
      const data = await getMoviesBySeriesItems('phim-bo', 1)
      setMovieSeries(data.items || []) // lấy đúng field items
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingSeries(false)
    }
  }
  const fetchMovieCartoon = async () => {
    try {
      setLoadingSeries(true)
      const data = await getMoviesBySeriesItems('hoat-hinh', 1)
      setMovieCartoon(data.items || []) // lấy đúng field items
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingSeries(false)
    }
  }
  const fetchTVShows = async () => {
    try {
      setLoadingSeries(true)
      const data = await getMoviesBySeriesItems('tv-shows', 1)
      setTVShows(data.items || []) // lấy đúng field items
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingSeries(false)
    }
  }

  useEffect(() => {
    fetchMoviesNew()
    fetchMovieSingle()
    fetchMovieSeries()
    fetchMovieCartoon()
    fetchTVShows()
  }, [])

  return (
    <div className="bg-dark" style={{ minHeight: '100vh', color: '#fff' }}>
      <BannerSlider />

      <div className="d-flex justify-content-between align-items-center ms-4 pt-3 mb-4">
        <h2
          style={{
            fontWeight: 'bold',
            color: '#FFD700',
            fontSize: '18px',
            margin: 0,
          }}
        >
          PHIM MỚI CẬP NHẬT
        </h2>
        <Link
          to="/phim-moi-cap-nhat"
          className="btn btn-outline-warning me-4"
          style={{ fontSize: '14px', fontWeight: '500' }}
        >
          Xem tất cả
        </Link>
      </div>
      <MovieGrid movies={movies} loading={loading} />

      <div className="d-flex justify-content-between align-items-center ms-4 pt-3 mb-4">
        <h2
          style={{
            fontWeight: 'bold',
            color: '#FFD700',
            fontSize: '18px',
            margin: 0,
          }}
        >
          PHIM LẺ MỚI CẬP NHẬT
        </h2>
        <Link
          to="/danh-sach/phim-le"
          className="btn btn-outline-warning me-4"
          style={{ fontSize: '14px', fontWeight: '500' }}
        >
          Xem tất cả
        </Link>
      </div>
      <MovieGrid movies={MovieSingle} loading={loadingSeries} />

      <div className="d-flex justify-content-between align-items-center ms-4 pt-3 mb-4">
        <h2
          style={{
            fontWeight: 'bold',
            color: '#FFD700',
            fontSize: '18px',
            margin: 0,
          }}
        >
          PHIM BỘ MỚI CẬP NHẬT
        </h2>
        <Link
          to="/danh-sach/phim-bo"
          className="btn btn-outline-warning me-4"
          style={{ fontSize: '14px', fontWeight: '500' }}
        >
          Xem tất cả
        </Link>
      </div>
      <MovieGrid movies={MovieSeries} loading={loadingSeries} />

      <div className="d-flex justify-content-between align-items-center ms-4 pt-3 mb-4">
        <h2
          style={{
            fontWeight: 'bold',
            color: '#FFD700',
            fontSize: '18px',
            margin: 0,
          }}
        >
          PHIM HOẠT HÌNH MỚI CẬP NHẬT
        </h2>
        <Link
          to="/danh-sach/hoat-hinh"
          className="btn btn-outline-warning me-4"
          style={{ fontSize: '14px', fontWeight: '500' }}
        >
          Xem tất cả
        </Link>
      </div>
      <MovieGrid movies={MovieCartoon} loading={loadingSeries} />
      <div className="d-flex justify-content-between align-items-center ms-4 pt-3 mb-4">
        <h2
          style={{
            fontWeight: 'bold',
            color: '#FFD700',
            fontSize: '18px',
            margin: 0,
          }}
        >
          TV SHOW MỚI CẬP NHẬT
        </h2>
        <Link
          to="/danh-sach/tv-shows"
          className="btn btn-outline-warning me-4"
          style={{ fontSize: '14px', fontWeight: '500' }}
        >
          Xem tất cả
        </Link>
      </div>
      <MovieGrid movies={TVShows} loading={loadingSeries} />
    </div>
  )
}

export default Home
