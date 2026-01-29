import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5148/api', // ajuste para sua API
})
