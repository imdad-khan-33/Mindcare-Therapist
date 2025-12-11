import axios from "axios"

const API_BASE_URL = "http://localhost:5000"

export const createClient = (token) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default axios.create({
  baseURL: API_BASE_URL,
})
