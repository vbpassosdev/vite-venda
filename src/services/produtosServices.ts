import { api } from "./api"

type ProdutosCreate = {
  descricao: string
  referencia: string
  tipoProduto: number
}

export const createProduto = async (produto: ProdutosCreate) => {
  const { data } = await api.post('/Produtos', produto)
  return data
}

export const getProdutos = async () => {
  const { data } = await api.get('/Produtos')
  return data
}
