import axios from 'axios'

export const api = axios.create({
  baseURL: '/api', // proxy vai redirecionar para http://localhost:5148/api
})
