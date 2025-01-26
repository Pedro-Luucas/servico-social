import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    config.auth = {
      username: process.env.REACT_APP_API_USERNAME || 'pedrao',
      password: process.env.REACT_APP_API_PASSWORD || '123'
    }
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