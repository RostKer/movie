const Footer = () => {
  return (
    <footer
      style={{ background: '#0f0f0f', color: '#fff', padding: '40px 20px' }}
    >
      <div className="container">
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start"
          style={{ gap: '20px' }}
        >
          {/* Bản quyền */}
          <div>
            <h5
              style={{
                color: '#FFD700',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              🎬 MyMovie
            </h5>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#ccc' }}>
              © {new Date().getFullYear()} MyMovie — Xem phim chất lượng cao.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '15px',
            }}
          >
            <a
              href="/ve-chung-toi"
              style={{
                color: '#ccc',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              Về chúng tôi
            </a>
            <a
              href="/lien-he"
              style={{
                color: '#ccc',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              Liên hệ
            </a>
            <a
              href="/dieu-khoan"
              style={{
                color: '#ccc',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              Điều khoản
            </a>
          </div>

          {/* Social media */}
          <div
            className="d-flex justify-content-center"
            style={{ gap: '15px' }}
          >
            <a href="#" style={{ color: '#FFD700', fontSize: '1.4rem' }}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" style={{ color: '#FFD700', fontSize: '1.4rem' }}>
              <i className="bi bi-youtube"></i>
            </a>
            <a href="#" style={{ color: '#FFD700', fontSize: '1.4rem' }}>
              <i className="bi bi-telegram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
