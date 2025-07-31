import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCategories, getCountries } from '../service/categoryService'
import { useLocation } from 'react-router-dom'
import Menu from './Menu'
import { getMoviesByYear } from '../service/movieService'

const Header = () => {
  const [keyword, setKeyword] = useState('')
  const [categories, setCategories] = useState([])
  const [country, setCountry] = useState([])
  const [year, setYears] = useState([])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [loadingError, setLoadingError] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200)
  const navigate = useNavigate()
  const location = useLocation()

  const seriesList = [
    { slug: 'phim-bo', name: 'Phim bộ' },
    { slug: 'phim-le', name: 'Phim lẻ' },
    { slug: 'hoat-hinh', name: 'Hoạt hình' },
    { slug: 'tv-shows', name: 'TV Shows' },
  ]

  // Helper đóng navbar khi chọn item
  const closeNavbar = () => {
    const navbar = document.getElementById('navbarNav')
    if (navbar) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, {
        toggle: false,
      })
      bsCollapse.hide()
    }
  }

  // Lấy danh sách category
  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      if (data && Array.isArray(data)) {
        setCategories(data)
        setLoadingError(false)
      } else {
        setCategories([])
        setLoadingError(true)
      }
    } catch (error) {
      console.error('Lỗi khi tải thể loại:', error)
      setCategories([])
      setLoadingError(true)
    }
  }

  // Lấy danh sách country
  const fetchCountry = async () => {
    try {
      const data = await getCountries()
      if (data && Array.isArray(data)) {
        setCountry(data)
        setLoadingError(false)
      } else {
        setCountry([])
        setLoadingError(true)
      }
    } catch (error) {
      console.error('Lỗi khi tải quốc gia:', error)
      setCountry([])
      setLoadingError(true)
    }
  }
  //Lấy danh sách Năm
  //Lấy danh sách Năm
  const fetchYear = async () => {
    try {
      const currentYear = new Date().getFullYear()
      const yearList = []
      for (let y = currentYear; y >= 2000; y--) {
        yearList.push({ slug: y.toString(), name: y.toString() })
      }
      setYears(yearList)
      setLoadingError(false)
    } catch (error) {
      console.error('Lỗi khi tạo danh sách năm:', error)
      setYears([])
      setLoadingError(true)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchCountry()
    fetchYear()

    const handleResize = () => setIsMobile(window.innerWidth <= 1200)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmed = keyword.trim()
    if (!trimmed) return
    const params = new URLSearchParams(location.search)
    const currentKeyword = params.get('keyword')
    if (currentKeyword !== trimmed) {
      navigate(`/tim-kiem?keyword=${encodeURIComponent(trimmed)}&page=1`)
    } else {
      const timestamp = Date.now()
      navigate(
        `/tim-kiem?keyword=${encodeURIComponent(
          trimmed
        )}&page=1&_reload=${timestamp}`
      )
    }
    if (isMobile) closeNavbar()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  //  Helper chia dữ liệu cột
  // const getColumn = (arr, size, colIndex) =>
  //   arr.slice(colIndex * size, colIndex * size + size)

  return (
    <div
      className="navbar navbar-expand-xl navbar-dark shadow-sm sticky-top"
      style={{ background: '#0f0f0f', padding: '10px 20px' }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a
          className="navbar-brand fw-bold"
          href="/"
          style={{ color: '#FFD700', fontSize: '1.8rem', letterSpacing: '1px' }}
        >
          🎬 MyMovie
        </a>

        {/* Toggle mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div
                onClick={() => {
                  navigate('/')
                  if (isMobile) closeNavbar()
                }}
                style={{
                  fontSize: '1.1rem',
                  padding: '8px 15px',
                  color: location.pathname === '/' ? '#FFD700' : '#fff',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
              >
                Trang chủ
              </div>
            </li>
            <Menu
              title="Thể loại"
              items={categories}
              showDropdown={showCategoryDropdown}
              setShowDropdown={setShowCategoryDropdown}
              loadingError={loadingError}
              fetchData={fetchCategories}
              isMobile={isMobile}
              navigateBase="/the-loai/"
              location={location}
              closeNavbar={closeNavbar}
            />
            <Menu
              title="Quốc gia"
              items={country}
              showDropdown={showCountryDropdown}
              setShowDropdown={setShowCountryDropdown}
              loadingError={loadingError}
              fetchData={fetchCountry}
              isMobile={isMobile}
              navigateBase="/quoc-gia/"
              location={location}
              closeNavbar={closeNavbar}
            />
            <Menu
              title="Năm"
              items={year}
              showDropdown={showYearDropdown}
              setShowDropdown={setShowYearDropdown}
              loadingError={loadingError}
              fetchData={fetchYear}
              isMobile={isMobile}
              navigateBase="/nam/"
              location={location}
              closeNavbar={closeNavbar}
            />
            {/* Series list */}
            {seriesList.map((s) => (
              <li key={s.slug} className="nav-item">
                <div
                  onClick={() => {
                    navigate(`/danh-sach/${s.slug}`)
                    if (isMobile) closeNavbar()
                  }}
                  style={{
                    fontSize: '1.1rem',
                    padding: '8px 15px',
                    color:
                      location.pathname === `/danh-sach/${s.slug}`
                        ? '#FFD700'
                        : '#fff',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = '#FFD700')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      location.pathname === `/danh-sach/${s.slug}`
                        ? '#FFD700'
                        : '#fff')
                  }
                >
                  {s.name}
                </div>
              </li>
            ))}
          </ul>

          {/* Search + Login */}
          <div className="d-flex mt-3 mt-lg-0 align-items-center">
            <form
              className="d-flex"
              onSubmit={handleSearch}
              style={{
                maxWidth: '300px',
                width: '100%',
                background: '#f3f3f3ff',
                borderRadius: '15px',
                overflow: 'hidden',
              }}
            >
              <input
                className="form-control border-0"
                type="search"
                placeholder="Tìm phim..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{
                  fontSize: '0.95rem',
                  background: 'transparent',
                  color: 'black',
                }}
              />
              <button
                className="btn"
                type="submit"
                style={{
                  background: '#FFD700',
                  color: '#000',
                  fontWeight: 'bold',
                  border: 'none',
                  padding: '10px 16px',
                  fontSize: '14px',
                }}
              >
                Tìm
              </button>
            </form>
            <button
              className="btn ms-3"
              type="button"
              style={{
                background: '#FFD700',
                color: '#000',
                whiteSpace: 'nowrap',
                minWidth: '100px',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                border: 'none',
                padding: '12px 10px',
                borderRadius: '20px',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#ffea75')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = '#FFD700')
              }
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
