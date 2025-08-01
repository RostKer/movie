import { useNavigate } from 'react-router-dom'

export default function Menu({
  title,
  items,
  showDropdown,
  setShowDropdown,
  loadingError,
  fetchData,
  isMobile,
  navigateBase,
  location,
  closeNavbar,
}) {
  const navigate = useNavigate()

  const handleItemClick = (slug) => {
    navigate(`${navigateBase}${slug}`)
    closeNavbar() // gọi luôn
  }
  // Tự động tính số cột (desktop nhiều hơn mobile)
  const columns = isMobile
    ? 2
    : items.length > 30
    ? 4
    : items.length > 15
    ? 3
    : 2
  const itemsPerCol = Math.ceil(items.length / columns)

  // Chia item ra thành các cột đều nhau
  const getColumn = (arr, perCol, colIndex) =>
    arr.slice(colIndex * perCol, (colIndex + 1) * perCol)

  return (
    <li
      className="nav-item"
      onMouseEnter={() => !isMobile && setShowDropdown(true)}
      onMouseLeave={() => !isMobile && setShowDropdown(false)}
      style={{ position: 'relative' }}
    >
      <span
        className="nav-link"
        onClick={() => {
          if (isMobile) {
            setShowDropdown(!showDropdown)
            setTimeout(
              () =>
                document
                  .getElementById('navbarNav')
                  .scrollIntoView({ behavior: 'smooth' }),
              100
            )
          }
        }}
        style={{
          fontSize: '1.1rem',
          padding: '8px 15px',
          color: '#fff',
          cursor: 'pointer',
          transition: 'color 0.3s ease',
        }}
      >
        {title}
      </span>

      {showDropdown && (
        <div
          style={{
            position: isMobile ? 'static' : 'absolute',
            top: '100%',
            left: 0,
            background: '#1a1a1a',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            padding: '15px',
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, minmax(150px, 1fr))`,
            gap: '15px',
            width: isMobile ? '100%' : '600px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 999,
          }}
        >
          {loadingError ? (
            <div style={{ color: '#ff4d4f', padding: '10px' }}>
              Không tải được {title.toLowerCase()}{' '}
              <button
                onClick={fetchData}
                style={{
                  background: '#FFD700',
                  border: 'none',
                  padding: '5px 10px',
                  marginLeft: '10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Thử lại
              </button>
            </div>
          ) : (
            Array.from({ length: columns }).map((_, colIndex) => (
              <ul
                key={colIndex}
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {getColumn(items, itemsPerCol, colIndex).map((item) => (
                  <li key={item.slug}>
                    <div
                      onClick={() => {
                        handleItemClick(item.slug)
                        setShowDropdown(false)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      style={{
                        color:
                          location.pathname === `${navigateBase}${item.slug}`
                            ? '#FFD700'
                            : '#fff',
                        padding: '8px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#333'
                        e.currentTarget.style.color = '#FFD700'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color =
                          location.pathname === `${navigateBase}${item.slug}`
                            ? '#FFD700'
                            : '#fff'
                      }}
                    >
                      {item.name}
                    </div>
                  </li>
                ))}
              </ul>
            ))
          )}
        </div>
      )}
    </li>
  )
}
