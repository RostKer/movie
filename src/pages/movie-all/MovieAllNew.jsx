import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getMovies } from '../../service/movieService'

const MovieAllNew = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const page = Number(searchParams.get('page')) || 1

  const fetchMovies = async (pageNum) => {
    try {
      setLoading(true)
      const data = await getMovies('/danh-sach/phim-moi-cap-nhat-v2', pageNum)
      setMovies(data?.items || [])
      setTotalPages(data?.params?.pagination?.totalPages || 1)
    } catch (error) {
      Swal.fire('Lỗi', 'Không thể tải dữ liệu!', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(page)
  }, [page])

  const changePage = (newPage) => {
    setSearchParams({ page: newPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getVisiblePages = (currentPage, totalPages, visibleCount = 6) => {
    let start = currentPage
    let end = start + visibleCount - 1
    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - visibleCount + 1)
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }
  const pages = getVisiblePages(page, totalPages)

  return (
    <div className="bg-dark" style={{ minHeight: '100vh', color: '#fff' }}>
      {/* Tiêu đề */}
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
      </div>

      {/* Danh sách phim */}
      {loading ? (
        <div className="text-center w-100 my-5">
          <div
            className="spinner-border"
            style={{ width: '3rem', height: '3rem', color: '#FFD700' }}
          />
          <p className="mt-3 text-light">Đang tải phim...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center text-light w-100 my-5">
          Không có dữ liệu phim.
        </div>
      ) : (
        <div className="container-fluid px-3">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 g-3">
            {movies.map((movie) => (
              <div key={movie._id} className="col">
                <Link
                  to={`/phim/${movie.slug}`}
                  className="text-decoration-none"
                >
                  <div
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#1a1a1a',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <img
                      src={movie.poster_url}
                      alt={movie.name}
                      style={{
                        aspectRatio: '2/3',
                        objectFit: 'cover',
                        width: '100%',
                      }}
                      onError={(e) => (e.target.src = '/fallback-poster.jpg')}
                    />
                    <div style={{ padding: '6px' }}>
                      <h6
                        style={{
                          fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginBottom: '4px',
                          color: '#fff',
                        }}
                      >
                        {movie.name}
                      </h6>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#ccc',
                          marginBottom: '2px',
                        }}
                      >
                        {movie.episode_current}
                      </p>
                      <p
                        style={{ fontSize: '0.8rem', color: '#aaa', margin: 0 }}
                      >
                        {movie.year}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 align-items-center flex-wrap">
          <button
            className="btn btn-outline-light btn-sm me-1"
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
          >
            <i className="bi bi-chevron-left d-inline d-sm-none"></i>
            <span className="d-none d-sm-inline">Trang trước</span>
          </button>

          {pages.map((p) => (
            <button
              key={p}
              className={`btn btn-sm mx-1 ${
                p === page ? 'btn-warning' : 'btn-outline-light'
              }`}
              onClick={() => changePage(p)}
            >
              {p}
            </button>
          ))}

          <button
            className="btn btn-outline-light btn-sm ms-1"
            disabled={page === totalPages}
            onClick={() => changePage(page + 1)}
          >
            <i className="bi bi-chevron-right d-inline d-sm-none"></i>
            <span className="d-none d-sm-inline">Trang tiếp</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieAllNew
