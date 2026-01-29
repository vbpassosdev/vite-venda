import { api } from './api'

export const getInfluenciadores = async () => {
  const { data } = await api.get('/Influenciadores')
  return data
}

export const createInfluenciador = async (influenciador: any) => {
  const { data } = await api.post('/Influenciadores', influenciador)
  return data
}

export const deleteInfluenciador = async (id: any) => {
  return api.delete(`/Influenciadores/${id}`)
}
