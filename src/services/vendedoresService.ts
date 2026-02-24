import { api } from './api'



type VendedorCreate = {
  nome: string
  email: string
  telefone: string
  celular: string
}

export const getVendedores = async () => {
  const { data } = await api.get('/Vendedor')
  return data
}

export const getVendedorById = async (id: number) => {
  const { data } = await api.get(`/Vendedor/${id}`)
  return data
}

export const createVendedor = async (vendedor: VendedorCreate) => {
  const { data } = await api.post('/Vendedor', vendedor)
  return data
}

export const updateVendedor = async (id: number, vendedor: VendedorCreate) => {
  const { data } = await api.put(`/Vendedor/${id}`, vendedor)
  return data
}

export const deleteVendedor = async (id: any) => {
  return api.delete(`/Vendedor/${id}`)
}

