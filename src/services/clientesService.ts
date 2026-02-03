import { api } from './api'

type ClientesCreate = {
  nome: string
  email: string
  telefone: string
  celular: string
  tipoCliente: number
}

export const getClientes = async () => {
  const { data } = await api.get('/Clientes')
  return data
}

export const getClienteById = async (id: number) => {
  const { data } = await api.get(`/Clientes/${id}`)
  return data
}

export const createCliente = async (cliente: ClientesCreate) => {
  const { data } = await api.post('/Clientes', cliente)
  return data
}

export const updateCliente = async (id: number, cliente: ClientesCreate) => {
  const { data } = await api.put(`/Clientes/${id}`, cliente)
  return data
}

export const deleteCliente = async (id: any) => {
  return api.delete(`/Clientes/${id}`)
}