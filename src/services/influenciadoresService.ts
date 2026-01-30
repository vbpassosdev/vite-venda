import { api } from './api'


type InfluenciadorCreate = {
  nome: string
  email: string
  telefone: string
  celular: string
}

export const getInfluenciadores = async () => {
  const { data } = await api.get('/Influenciadores')
  return data
}

export const createInfluenciador = async (influenciador: InfluenciadorCreate) => {
  const { data } = await api.post('/Influenciadores', influenciador)
  return data
}

export const deleteInfluenciador = async (id: any) => {
  return api.delete(`/Influenciadores/${id}`)
}
