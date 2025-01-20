import axios from "axios"

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: "https://localhost:8080/"
})

api.interceptors.request.use(
  (config) => {
    const username = process.env.REACT_APP_API_USERNAME
    const password = process.env.REACT_APP_API_PASSWORD
    if(username && password){
      config.auth = {
        username: username,
        password: password
      }
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default api;