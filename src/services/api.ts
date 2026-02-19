import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5148/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
})
