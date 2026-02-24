import { api } from './api'

export type ClientesCreate = {
  cpfCnpj: string
  tipoPessoa: string
  razaoSocial: string
  cep: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  uf: string
  celularDdd: string
  celular: string
  telefoneDdd: string
  telefone: string
  email: string
}

export const getClientes = async () => {
  const { data } = await api.get('/Clientes')
  return data
}

export const searchClientes = async (query: string) => {
  const { data } = await api.get(`/Clientes/search?q=${encodeURIComponent(query)}`)
  return data
}

export const getClienteById = async (id: string) => {
  const { data } = await api.get(`/Clientes/${id}`)
  return data
}

export const createCliente = async (cliente: ClientesCreate) => {
  const { data } = await api.post('/Clientes', cliente)
  return data
}

export const updateCliente = async (id: string, cliente: ClientesCreate) => {
  const { data } = await api.put(`/Clientes/${id}`, cliente)
  return data
}

export const deleteCliente = async (id: string) => {
  return api.delete(`/Clientes/${id}`)
}