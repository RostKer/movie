import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Header from './component/Header'
import Footer from './component/Footer'

// Lazy load các page
const Home = lazy(() => import('./pages/Home'))
const Category = lazy(() => import('./pages/movie-lists/Category'))
const MovieDetail = lazy(() => import('./pages/MovieDetail'))
const MoviesCountry = lazy(() => import('./pages/movie-lists/MoviesCountry'))
const MoviesSeries = lazy(() => import('./pages/movie-lists/MoviesSeries'))
const MovieYear = lazy(() => import('./pages/movie-lists/MovieYear'))
const EpisodePlayer = lazy(() => import('./pages/EpisodePlayer'))
const Search = lazy(() => import('./pages/movie-lists/Search'))
const App = () => {
  return (
    <Router>
      <Header />
      <Suspense
        fallback={
          <div
            style={{ textAlign: 'center', padding: '50px', color: '#FFD700' }}
          >
            <div
              className="spinner-border"
              style={{ width: '3rem', height: '3rem' }}
            ></div>
            <p>Đang tải trang...</p>
          </div>
        }
      >
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/the-loai/:slug" element={<Category />} />
            <Route path="/quoc-gia/:slug" element={<MoviesCountry />} />
            <Route path="/nam/:slug" element={<MovieYear />} />
            <Route path="/phim/:slug" element={<MovieDetail />} />
            <Route path="/phim/:slug/:ep" element={<EpisodePlayer />} />
            <Route path="/danh-sach/:type_list" element={<MoviesSeries />} />
            <Route path="/tim-kiem" element={<Search />} />
          </Routes>
        </div>
      </Suspense>
      <Footer />
    </Router>
  )
}
export default App
