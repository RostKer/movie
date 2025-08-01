// src/pages/movie-lists/MovieListPage.jsx
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import getPoster from '../../utils/imageHelper'
import LazyImage from '../../component/LazyImage'

export default function MovieListPage({
  fetchFunction,
  paramName,
  titlePrefix,
  useSearchParamsOnly = false,
  showApiTitle = true,
}) {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const slug = useSearchParamsOnly ? null : params[paramName]
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('ĐANG TẢI...')
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [hovered, setHovered] = useState(null)
  const [displayMovies, setDisplayMovies] = useState([])
  const visibleCount = 6
  const getVisiblePages = (currentPage, totalPages, visibleCount = 6) => {
    let start = currentPage
    let end = start + visibleCount - 1

    // Nếu vượt quá totalPages thì lùi lại
    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - visibleCount + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const pages = getVisiblePages(page, totalPages)

  const changePage = (newPage) => {
    const newParams = Object.fromEntries(searchParams)
    newParams.page = newPage
    setSearchParams(newParams)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const getDisplayMovies = () => {
    const width = window.innerWidth
    if (width >= 768 && width < 992) {
      const max = movies.length - (movies.length % 3)
      return movies.slice(0, max || movies.length)
    }
    return movies
  }
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const data = await fetchFunction(slug, page, searchParams)
        if (!data || !data.items || data.items.length === 0) {
          setMovies([])
          setTitle('KHÔNG TÌM THẤY')
          setTotalPages(1)
        } else {
          setMovies(data.items)
          setTitle((data.titlePage || 'KHÔNG XÁC ĐỊNH').toUpperCase())
          setTotalPages(data.params?.pagination?.totalPages || 1)
        }
      } catch (error) {
        Swal.fire('Lỗi', 'Không thể tải dữ liệu!', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [slug, page, searchParams])

  useEffect(() => {
    const newPage = Number(searchParams.get('page')) || 1
    if (newPage !== page) setPage(newPage)
  }, [searchParams])

  useEffect(() => {
    setDisplayMovies(getDisplayMovies())
    const handleResize = () => setDisplayMovies(getDisplayMovies())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [movies])

  return (
    <div className="bg-dark" style={{ minHeight: '100vh', color: '#fff' }}>
      <h2
        className=" ml-2 mb-4 ms-4 pt-3 text-start text-md-start pt-1"
        style={{ fontWeight: 'bold', color: '#FFD700', fontSize: '18px' }}
      >
        {showApiTitle ? `${titlePrefix} ${title}` : titlePrefix}
      </h2>

      {/* Grid phim */}
      <div className="container-fluid px-3">
        <div className=" row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 g-3">
          {loading ? (
            <div className="text-center w-100 my-5">
              <div
                className="spinner-border"
                style={{ width: '3rem', height: '3rem', color: '#FFD700' }}
              ></div>
              <p className="mt-3 text-light">Đang tải phim...</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center text-light w-100 my-5">
              Không có dữ liệu phim.
            </div>
          ) : (
            displayMovies.map((movie) => (
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
                      boxShadow:
                        hovered === movie._id
                          ? '0 6px 20px rgba(255,215,0,0.3)'
                          : '0 4px 15px rgba(0,0,0,0.5)',
                      position: 'relative',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      transform:
                        hovered === movie._id ? 'scale(1.05)' : 'scale(1)',
                    }}
                    onMouseEnter={() => setHovered(movie._id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <LazyImage
                      src={getPoster(movie.poster_url)}
                      alt={movie.name}
                      loading="lazy"
                      style={{
                        aspectRatio: '2/3',
                        objectFit: 'cover',
                        width: '100%',
                      }}
                      onError={(e) => (e.target.src = '/fallback-poster.jpg')}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        opacity: hovered === movie._id ? 1 : 0,
                        transition: 'opacity 0.3s',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <button
                        style={{
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          background: '#FFD700',
                          color: '#000',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '2rem',
                        }}
                      >
                        <i className="bi bi-play-fill"></i>
                      </button>
                    </div>

                    {/* Thông Tin */}
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
                          fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                          color: '#ccc',
                          marginBottom: '2px',
                        }}
                      >
                        {movie.episode_current}
                      </p>
                      <p
                        style={{
                          fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                          color: '#aaa',
                          margin: 0,
                        }}
                      >
                        {movie.year}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Phân trang */}
      {!loading && totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 align-items-center flex-wrap">
          {/* Nút Trang trước */}
          <button
            className="btn btn-outline-light btn-sm me-1"
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
          >
            {/* Mobile: icon */}
            <i className="bi bi-chevron-left d-inline d-sm-none"></i>
            {/* Tablet/Desktop: text */}
            <span className="d-none d-sm-inline">Trang trước</span>
          </button>

          {/* Các nút số trang */}
          {pages
            .filter((p) => {
              if (window.innerWidth >= 576) return true // desktop: tất cả

              // Mobile: 5 nút quanh page
              let start = page - 2
              let end = page + 2

              // Nếu gần đầu thì dịch sang phải
              if (start < 1) {
                end += 1 - start
                start = 1
              }

              // Nếu gần cuối thì dịch sang trái
              if (end > totalPages) {
                start -= end - totalPages
                end = totalPages
              }

              return p >= start && p <= end
            })
            .map((p) => (
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

          {/* Nút Trang tiếp */}
          <button
            className="btn btn-outline-light btn-sm ms-1"
            disabled={page === totalPages}
            onClick={() => changePage(page + 1)}
          >
            {/* Mobile: icon */}
            <i className="bi bi-chevron-right d-inline d-sm-none"></i>
            {/* Tablet/Desktop: text */}
            <span className="d-none d-sm-inline">Trang tiếp</span>
          </button>
        </div>
      )}
    </div>
  )
}
