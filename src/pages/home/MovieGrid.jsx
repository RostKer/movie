import { Link } from 'react-router-dom'
import LazyImage from '../../component/LazyImage'
import getPoster from '../../utils/imageHelper'
import { useState } from 'react'

const MovieGrid = ({ movies, loading }) => {
  const [hovered, setHovered] = useState(null)

  if (loading) {
    return (
      <div className="text-center w-100 my-5">
        <div
          className="spinner-border"
          style={{ width: '3rem', height: '3rem', color: '#FFD700' }}
        ></div>
        <p className="mt-3 text-light">Đang tải phim...</p>
      </div>
    )
  }

  if (!movies.length) {
    return (
      <div className="text-center text-light w-100 my-5">
        Không có dữ liệu phim.
      </div>
    )
  }

  return (
    <div className="container-fluid px-3">
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 g-3">
        {movies.map((movie) => (
          <div key={movie._id} className="col">
            <Link to={`/phim/${movie.slug}`} className="text-decoration-none">
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
                  transform: hovered === movie._id ? 'scale(1.05)' : 'scale(1)',
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
                  <p style={{ fontSize: '0.8rem', color: '#aaa', margin: 0 }}>
                    {movie.year}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieGrid
