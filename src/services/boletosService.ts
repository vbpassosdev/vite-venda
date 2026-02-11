import { api } from './api'

export type BoletoCreate = {
  clienteId: string
  valor: number
  vencimento: string
  numeroDocumento?: string
}

export const gerarBoleto = async (boleto: BoletoCreate) => {
  const { data } = await api.post('/boleto/gerar', boleto)
  return data
}

export const getBoletos = async () => {
  const { data } = await api.get('/boleto')
  return data
}

export const getBoletoById = async (id: string) => {
  const { data } = await api.get(`/boleto/${id}`)
  return data
}

export const deleteBoleto = async (id: string) => {
  return api.delete(`/boleto/${id}`)
}
