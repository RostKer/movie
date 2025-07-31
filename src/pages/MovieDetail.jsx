import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMovieDetail } from '../service/movieService'

const MovieDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showTrailer, setShowTrailer] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const data = await getMovieDetail(slug)
        console.log('Dữ liệu API trả về:', data)
        console.log('Servers (episodes):', data?.episodes)
        if (data && data.movie) {
          setMovie(data.movie)
          setEpisodes(data.episodes || [])
          const firtServer = data.episodes?.[0]
          const firstEp = firtServer?.server_data?.[0]
          if (firstEp) {
            const url =
              firstEp.link_embed ||
              (firstEp.link_m3u8
                ? `https://player.phimapi.com/player/?url=${firstEp.link_m3u8}`
                : null)
            setCurrentEpisode(url)
          }
        } else {
          throw new Error('Không tìm thấy phim')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [slug])

  if (loading)
    return (
      <div style={{ color: '#fff', background: '#000', padding: '50px' }}>
        Đang tải...
      </div>
    )
  if (error)
    return (
      <div style={{ color: '#fff', background: '#000', padding: '50px' }}>
        Lỗi: {error}
      </div>
    )
  useEffect(() => {
    document.body.style.overflow = showTrailer ? 'hidden' : 'auto'
    return () => (document.body.style.overflow = 'auto')
  }, [showTrailer])
  const getEmbedTrailer = (url) => {
    if (!url) return null
    const isYoutube = url.includes('youtube.com') || url.includes('youtu.be')
    return isYoutube ? url.replace('watch?v=', 'embed/') : url
  }
  if (!movie)
    return (
      <div
        style={{
          background: '#000',
          color: '#fff',
          textAlign: 'center',
          padding: '50px',
          fontSize: '1.5rem',
          minHeight: '100vh',
        }}
      >
        Không tìm thấy phim.
      </div>
    )

  return (
    <div
      style={{
        background: '#000',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
      }}
    >
      {/* Banner to */}
      <div
        style={{
          backgroundImage: `url(${movie.poster_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          height: '60vh',
        }}
      >
        <div
          style={{
            backgroundImage: `url(${movie.poster_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            height: '60vh',
          }}
        >
          {/* Lớp overlay mờ */}
          <div
            style={{
              background: 'rgba(0,0,0,0.65)',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          ></div>

          {/* Nút Play */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          >
            {window.innerWidth >= 768 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                }}
              >
                <button
                  onClick={() => {
                    if (!episodes.length || !episodes[0]?.server_data?.length) {
                      alert('Hiện chưa có tập nào để xem!')
                      return
                    }
                    const firstEpisode = episodes[0].server_data[0]
                    if (!firstEpisode?.slug) {
                      alert('Không thể phát tập đầu tiên!')
                      return
                    }
                    navigate(`/phim/${slug}/${firstEpisode.slug}`)
                  }}
                  style={{
                    background: 'rgba(255,215,0,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    fontSize: '32px',
                    color: '#000',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    transition: 'transform 0.3s ease, background 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                    e.currentTarget.style.background = '#FFD700'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.background = 'rgba(255,215,0,0.9)'
                  }}
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Poster nhỏ + thông tin */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <img
            src={movie.thumb_url || movie.poster_url}
            alt={movie.name}
            style={{
              width: '180px',
              height: '250px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.7)',
            }}
          />
          <div style={{ maxWidth: '600px' }}>
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
              {movie.name}
            </h1>
            {movie.tmdb?.vote_average && (
              <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
                ⭐ {movie.tmdb.vote_average}/10
              </p>
            )}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                style={{
                  background: '#FFD700',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
                onClick={() => {
                  if (!episodes.length || !episodes[0]?.server_data?.length) {
                    alert('Hiện chưa có tập nào để xem!')
                    return
                  }
                  const firstEpisode = episodes[0].server_data[0]
                  if (!firstEpisode?.slug) {
                    alert('Không thể phát tập đầu tiên!')
                    return
                  }
                  navigate(`/phim/${slug}/${firstEpisode.slug}`)
                }}
              >
                ▶ Xem phim
              </button>
              {movie.trailer_url && (
                <button
                  onClick={() => setShowTrailer(true)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid #fff',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: '#fff',
                  }}
                >
                  Trailer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách tập */}
      {episodes.length > 0 && episodes[0].server_data?.length > 0 && (
        <div
          style={{
            padding: '20px',
            background: '#111',
            marginTop: '10px',
            borderTop: '2px solid #222',
          }}
        >
          <h2
            style={{
              fontSize: '1.8rem',
              marginBottom: '10px',
              color: '#FFD700',
            }}
          >
            Danh sách tập
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '10px',
            }}
          >
            {episodes[0].server_data.map((ep) => (
              <button
                key={ep.name}
                style={{
                  background: '#222',
                  color: '#fff',
                  border: '1px solid #444',
                  padding: '6px 8px', // nhỏ lại
                  fontSize: '0.85rem', // chữ nhỏ hơn
                  borderRadius: '4px', // bo góc nhẹ
                  cursor: 'pointer',
                  textAlign: 'center',
                  minWidth: '60px', // đảm bảo đều nhau
                }}
                onClick={() => navigate(`/phim/${slug}/${ep.slug}`)}
              >
                {ep.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Thông tin phim */}
      <div
        style={{
          padding: '20px',
          background: '#111',
          marginTop: '10px',
          borderTop: '2px solid #222',
        }}
      >
        <h2
          style={{
            fontSize: '1.8rem',
            marginBottom: '10px',
            color: '#FFD700',
          }}
        >
          Nội dung phim
        </h2>
        <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
          {movie.content || 'Đang cập nhật nội dung...'}
        </p>
        {movie.category?.length > 0 && (
          <p>
            <strong>Thể loại:</strong>{' '}
            {movie.category?.map((c) => c.name).join(', ')}
          </p>
        )}
        {movie.country?.length > 0 && (
          <p>
            <strong>Quốc gia:</strong>{' '}
            {movie.country?.map((c) => c.name).join(', ')}
          </p>
        )}
        <p>
          <strong>Đang phát:</strong> {movie.quality || 'Đang cập nhật'}
        </p>
        <p>
          <strong>Tình trạng:</strong>{' '}
          {movie.episode_current || 'Đang cập nhật'}
        </p>
        {movie.director?.length > 0 && (
          <p>
            <strong>Đạo diễn:</strong> {movie.director.join(', ')}
          </p>
        )}
        {movie.actor?.length > 0 && (
          <p>
            <strong>Diễn viên:</strong> {movie.actor.join(', ')}
          </p>
        )}
      </div>
      {showTrailer && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
          onClick={() => setShowTrailer(false)} // click ngoài tắt modal
        >
          <iframe
            width="80%"
            height="80%"
            src={getEmbedTrailer(movie.trailer_url)}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      )}
    </div>
  )
}
export default MovieDetail
