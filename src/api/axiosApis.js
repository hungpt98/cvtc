import axiosClient from './axiosClient'

export const covidApi = {
  getAll() {
    return axiosClient.get('/all')
  },
  getCountries() {
    return axiosClient.get('/countries')
  },
}
