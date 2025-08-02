// src/components/BannerSlider.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMovies } from '../../service/movieService'
import getPoster from '../../utils/imageHelper'

const BannerSlider = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMovies(1)
      setMovies(res?.items?.slice(0, 10) || [])
    }
    fetchData()
  }, [])

  if (movies.length === 0) return null

  return (
    <div
      id="bannerCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <h2
        className="ms-4 pt-3 mb-4"
        style={{ fontWeight: 'bold', color: '#FFD700', fontSize: '20Px' }}
      >
        PHIM ĐỀ CỬ
      </h2>
      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div
            key={movie._id}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <div className="position-relative">
              <img
                src={getPoster(movie.poster_url)}
                alt={movie.name}
                className="d-block w-100"
                style={{
                  height: '45vh',
                  objectFit: 'cover',
                  minHeight: '250px',
                }}
                onError={(e) => (e.target.src = '/fallback-poster.jpg')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                }}
              ></div>

              {/* Caption chia làm 2 cột: poster nhỏ + info */}
              <div
                className="carousel-caption d-flex align-items-center"
                style={{
                  zIndex: 2,
                  bottom: '5%',
                  left: '10%',
                  right: '5%',
                  gap: '20px',
                }}
              >
                {/* Poster nhỏ */}
                <div
                  style={{
                    flex: '0 0 150px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
                  }}
                >
                  <Link to={`/phim/${movie.slug}`}>
                    <img
                      src={getPoster(movie.poster_url)}
                      alt={movie.name}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                      onError={(e) => (e.target.src = '/fallback-poster.jpg')}
                    />
                  </Link>
                </div>

                {/* Thông tin phim */}
                <div className="text-start">
                  <h2 className="fw-bold text-warning">{movie.name}</h2>
                  <p className="text-light">{movie.origin_name}</p>
                  <Link
                    to={`/phim/${movie.slug}`}
                    className="btn btn-warning fw-bold px-4 mt-2"
                  >
                    Xem ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#bannerCarousel"
        data-bs-slide="prev"
        style={{ width: '50px' }}
      >
        <i className="bi bi-chevron-left fs-1 bg-dark"></i>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bannerCarousel"
        data-bs-slide="next"
        style={{ width: '50px' }}
      >
        <i className="bi bi-chevron-right fs-1 bg-dark"></i>
      </button>
    </div>
  )
}

export default BannerSlider
