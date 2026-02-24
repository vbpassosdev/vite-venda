import { api } from './api'

type TituloCreatePayload = {
  clienteId: string
  valor: number
  vencimento: string
  numeroDocumento?: string
}

type TituloFromTituloPayload = {
  idTitulo: string
}

export type TituloCreate = TituloCreatePayload | TituloFromTituloPayload

export const gerarBoleto = async (idTitulo: string) => {
  const { data } = await api.post(`/titulos/gerar/${idTitulo}`)
  return data
}

export const getTitulos = async () => {
  const { data } = await api.get('/titulos')
  return data
}

