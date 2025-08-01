import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMovieDetail } from '../service/movieService'

const EpisodePlayer = () => {
  const { slug, ep } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [servers, setServers] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [currentEpisode, setCurrentEpisode] = useState(null)
  const [selectedServerIndex, setSelectedServerIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)
  4n
  // Reset server về 0 khi đổi phim
  useEffect(() => {
    setSelectedServerIndex(0)
  }, [slug])

  // Fetch movie
  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      try {
        const data = await getMovieDetail(slug)

        if (!data?.movie) {
          setMovie(null)
          setCurrentEpisode(null)
          return
        }

        setMovie(data.movie)
        setServers(data.episodes || [])

        const serverData =
          data.episodes?.[selectedServerIndex]?.server_data || []
        setEpisodes(serverData)

        const episodeData =
          serverData.find((e) => e.slug === ep) || serverData[0]
        if (!episodeData) {
          setCurrentEpisode(null)
          return
        }

        const url =
          episodeData.link_embed ||
          (episodeData.link_m3u8
            ? `https://player.phimapi.com/player/?url=${episodeData.link_m3u8}`
            : null)
        setCurrentEpisode(url)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [slug, ep, selectedServerIndex])

  // Reset fading state khi đổi tập
  useEffect(() => {
    if (currentEpisode) setIsFading(false)
  }, [currentEpisode])

  // Hàm đổi tập
  const handleChangeEpisode = (serverIndex, episodeSlug) => {
    setIsFading(true)
    setTimeout(() => {
      setSelectedServerIndex(serverIndex)
      navigate(`/phim/${slug}/${episodeSlug}`)
      setIsFading(false)
    }, 300)
  }

  // Render
  if (loading)
    return (
      <div className="text-white bg-black p-12 text-center">Đang tải...</div>
    )

  if (!movie) {
    return (
      <div className="text-white bg-black p-12 text-center">
        Không tìm thấy phim.
      </div>
    )
  }

  if (!currentEpisode) {
    return (
      <div className="text-white bg-black p-12 text-center">
        Chưa có tập phim để xem.
      </div>
    )
  }
  // cc
  return (
    <div className="bg-black text-white min-h-screen">
      {isFading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white z-20">
          Đang chuyển tập...
        </div>
      )}
      <div
        className="position-relative bg-black"
        style={{
          width: '100%',
          aspectRatio: '16/9', // giữ tỷ lệ 16:9
        }}
      >
        <iframe
          src={currentEpisode}
          className="position-absolute top-0 start-0"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            opacity: isFading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
          allowFullScreen
          allow="autoplay; encrypted-media"
          title="Video Player"
        />
      </div>
      <p
        style={{
          marginTop: '15px',
          fontSize: '25px',
          fontWeight: 'bold',
          color: '#FFD700',
        }}
      >
        {movie.name}
      </p>
      {/* Server + tập */}
      <div className="bg-dark border-top mt-3 p-3">
        {servers.map((server, serverIndex) => (
          <div key={serverIndex} className="mb-4">
            {/* Tên server */}
            <h3
              className="h5 fw-bold text-warning mb-3 border-bottom border-warning pb-2"
              style={{ marginTop: '10px' }}
            >
              {server.server_name || `Server ${serverIndex + 1}`}
            </h3>

            {/* Danh sách tập */}
            <div
              className="d-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '10px',
              }}
            >
              {server.server_data.map((episodeItem) => {
                const isActive =
                  selectedServerIndex === serverIndex && episodeItem.slug === ep
                return (
                  <button
                    key={episodeItem.slug}
                    onClick={() =>
                      handleChangeEpisode(serverIndex, episodeItem.slug)
                    }
                    className={`btn ${
                      isActive ? 'btn-warning text-dark' : 'btn-dark border'
                    }`}
                    style={{
                      fontSize: '0.85rem',
                      borderRadius: '4px',
                      padding: '6px 8px',
                      textAlign: 'center',
                    }}
                  >
                    {episodeItem.name}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default EpisodePlayer
