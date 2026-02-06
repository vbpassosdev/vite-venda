import { api } from "./api"

// ========================
// TIPOS
// ========================

// Retorno da API
export type Produto = {
  id: number
  descricao: string
  referencia: string
  preco: number
  estoque: number
  ativo: boolean
  dataCadastro: string
}

// Criar produto (sem id, ativo, dataCadastro)
export type ProdutoCreate = {
  descricao: string
  referencia: string
  preco: number
  estoque: number
}

// Atualizar produto
export type ProdutoUpdate = {
  descricao: string
  referencia: string
  preco: number
  estoque: number
}

// ========================
// CRUD PRINCIPAL
// ========================

// LISTAR
export const getProdutos = async () => {
  const { data } = await api.get<Produto[]>("/Produto")
  return data
}

// BUSCAR POR ID
export const getProdutoById = async (id: Number) => {
  const { data } = await api.get<Produto>(`/Produto/${id}`)
  return data
}

// CRIAR
export const createProduto = async (produto: ProdutoCreate) => {
  const { data } = await api.post<Produto>("/Produto", produto)
  return data
}

// ATUALIZAR
export const updateProduto = async (id: number, produto: ProdutoUpdate) => {
  await api.put(`/Produto/${id}`, produto)
}

// SOFT DELETE (INATIVAR)
export const deleteProduto = async (id: number) => {
  await api.delete(`/Produto/${id}`)
}

// ========================
// ESTOQUE
// ========================

// BAIXAR ESTOQUE
export const baixarEstoque = async (id: number, quantidade: number) => {
  const { data } = await api.patch<Produto>(
    `/Produto/${id}/estoque/baixar?quantidade=${quantidade}`
  )
  return data
}

// REPOR ESTOQUE
export const reporEstoque = async (id: number, quantidade: number) => {
  const { data } = await api.patch<Produto>(
    `/Produto/${id}/estoque/repor?quantidade=${quantidade}`
  )
  return data
}
