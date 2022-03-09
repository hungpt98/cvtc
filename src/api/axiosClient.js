import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://disease.sh/v3/covid-19',
  headers: {
    'content-type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
)

export default axiosClient
