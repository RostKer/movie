const getPoster = (url) => {
  if (!url) return '/fallback-poster.jpg'
  // Nếu đã có http thì giữ nguyên
  if (url.startsWith('http')) return url
  // Nếu chỉ có /upload/... thì thêm domain CDN
  return `https://img.phimapi.com/${url.replace(/^\/+/, '')}`
}
export default getPoster
