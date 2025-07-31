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
      <iframe
        src={currentEpisode}
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 'none',
          opacity: isFading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        allowFullScreen
        allow="autoplay; encrypted-media"
        title="Video Player"
      />
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
      <div className="bg-[#111] border-t-2 border-[#222] mt-5 p-6 space-y-8">
        {servers.map((server, serverIndex) => (
          <div
            key={serverIndex}
            className={`p-4 rounded-lg shadow-md ${
              selectedServerIndex === serverIndex
                ? 'border border-yellow-500 bg-[#1a1a1a]'
                : 'bg-[#1a1a1a]'
            }`}
          >
            {/* Tên server */}
            <h3
              className="text-xl font-bold text-yellow-400 mb-4 border-b border-yellow-600 pb-2"
              style={{
                marginTop: '15px',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#FFD700',
              }}
            >
              {server.server_name || `Server ${serverIndex + 1}`}
            </h3>

            {/* Danh sách tập */}
            <div
              className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12"
              style={{
                gap: '10px',
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                width: '50px',
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
                    style={{
                      background: isActive ? '#FFD700' : '#222',
                      color: isActive ? '#000' : '#fff',
                      border: isActive ? '1px solid #FFD700' : '1px solid #444',
                      padding: '6px 8px',
                      fontSize: '0.85rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      minWidth: '60px',
                      gap: '10px',
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
