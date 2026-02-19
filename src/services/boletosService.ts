import { api } from './api'

type BoletoCreatePayload = {
  clienteId: string
  valor: number
  vencimento: string
  numeroDocumento?: string
}

type BoletoFromTituloPayload = {
  idTitulo: string
}

export type BoletoCreate = BoletoCreatePayload | BoletoFromTituloPayload

export const gerarBoleto = async (idTitulo: string) => {
  const { data } = await api.post(`/titulos/gerar/${idTitulo}`)
  return data
}

export const getBoletos = async () => {
  const { data } = await api.get('/titulos')
  return data
}

