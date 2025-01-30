import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    console.log('Request Config:', config)
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Full Network Error:', {
        message: error.message,
        code: error.code,
        config: error.config
      })
      return Promise.reject(error)
    }
)

export default api