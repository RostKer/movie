import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export async function getCategories() {
  try {
    const res = await axios.get(`${API_URL}/the-loai`)
    return res.data
  } catch (error) {
    console.error('Lỗi khi lấy thể loại:', error)
    return []
  }
}
export async function getCountries() {
  try {
    const res = await axios.get(`${API_URL}/quoc-gia`)
    return res.data || []
  } catch (error) {
    console.error('Lỗi khi lấy quốc gia:', error)
    return []
  }
}
