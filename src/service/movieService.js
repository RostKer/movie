import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

export async function getMovies(_, page = 1, searchParams) {
  try {
    const params = new URLSearchParams(searchParams)
    if (!params.has('page')) params.set('page', page)
    const url = `${API_URL}/danh-sach/phim-moi-cap-nhat-v2?${params.toString()}`
    const res = await axios.get(url)

    const totalItems =
      res.data.pagination?.totalItems || res.data.totalItems || 0
    const perPage =
      res.data.pagination?.totalItemsPerPage || res.data.itemsPerPage || 10
    const totalPages =
      res.data.totalPages ||
      (totalItems && perPage ? Math.ceil(totalItems / perPage) : 1)

    return {
      items: res.data.items,
      titlePage: res.data.titlePage || 'Phim mới cập nhật',
      params: {
        pagination: { totalPages },
      },
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phim mới:', error)
    return null
  }
}

export async function getMovieDetail(slug) {
  try {
    const res = await axios.get(`${API_URL}/phim/${slug}`)
    return res.data || null
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết phim:', error)
    return null
  }
}
export async function searchMovies({
  keyword = '',
  page = 1,
  sort_field = '',
  sort_type = '',
  sort_lang = '',
  category = '',
  country = '',
  year = '',
  limit = 20,
}) {
  try {
    const params = new URLSearchParams()

    if (keyword.trim()) params.append('keyword', keyword.trim())
    if (page > 0) params.append('page', page)
    if (sort_field) params.append('sort_field', sort_field)
    if (sort_type) params.append('sort_type', sort_type)
    if (sort_lang) params.append('sort_lang', sort_lang)
    if (category) params.append('category', category)
    if (country) params.append('country', country)
    if (year) params.append('year', year)
    if (limit > 0) params.append('limit', limit)

    const url = `${API_URL}/v1/api/tim-kiem?${params.toString()}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Search API error:', error)
    throw error
  }
}

export async function getMoviesByCategory(slug, page = 1) {
  try {
    const res = await axios.get(`${API_URL}/v1/api/the-loai/${slug}`, {
      params: { page },
    })
    return res.data?.data
  } catch (error) {
    console.error('Lỗi khi lấy phim theo thể loại:', error)
    return null
  }
}
export async function getMoviesByCountry(slug, page = 1) {
  try {
    const res = await axios.get(`${API_URL}/v1/api/quoc-gia/${slug}`, {
      params: { page },
    })
    return res.data?.data
  } catch (error) {
    console.error('Lỗi khi lấy phim theo quốc gia:', error)
    return null
  }
}
export async function getMoviesBySeries(type_list, page = 1) {
  try {
    const res = await axios.get(`${API_URL}/v1/api/danh-sach/${type_list}`, {
      params: { page },
    })
    return res.data?.data
  } catch (error) {
    console.error('Lỗi khi lấy phim:', error)
    return null
  }
}
export async function getMoviesByYear(slug, page = 1) {
  try {
    const res = await axios.get(`${API_URL}/v1/api/nam/${slug}`, {
      params: { page },
    })
    return res.data?.data
  } catch (error) {
    console.error('Lỗi khi lấy phim theo quốc gia:', error)
    return null
  }
}
export async function getMoviesBySeriesItems(type_list, page = 1) {
  try {
    const res = await axios.get(`${API_URL}/v1/api/danh-sach/${type_list}`, {
      params: { page },
    })
    return res.data?.data || { items: [] }  // Trả nguyên object
  } catch (error) {
    console.error('Lỗi khi lấy phim:', error)
    return { items: [] }
  }
}