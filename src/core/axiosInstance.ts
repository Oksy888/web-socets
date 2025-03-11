import axios from 'axios'

const api = axios.create({
  baseURL: 'https://react.gromus.ai/api',
})
export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImtvbHlhZG80a2FAZ21haWwuY29tIiwiUm9sZSI6IkFkbWluIiwiU2VjdXJpdHlTdGFtcCI6IkZBQUcyTkhTVUE3UFBNRE83WjVWNFRUTVBCTU5SWkcyIiwiQ291bnRyeSI6IlVTIiwiQXV0aG9ySWQiOiI3MTk0MDQ3Nzc4MzQyMzU1OTc0IiwiVXNlcklkIjoiYzE2M2ZjN2UtODlmNy00NDg0LWI1YTAtOTNlZjU3MWYyMTc2IiwibmJmIjoxNzQxNjkwOTUyLCJleHAiOjE3NDIyOTU3NTIsImlhdCI6MTc0MTY5MDk1MiwiaXNzIjoiU2VydmVyIiwiYXVkIjoiQ2xpZW50In0.D9rSg-gNxlFbr8Y281xg7-mH8J2YQEFLDAqjfgdtHGs'

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('BEARER_TOKEN')
    if (TOKEN) {
      config.headers['Authorization'] = `Bearer ${TOKEN}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
