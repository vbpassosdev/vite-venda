import { api } from './api'

export type PedidoItemCreate = {
	produtoId: number
	produtoNome: string
	quantidade: number
	valorUnitario: number
}

export type PedidoCreate = {
	clienteId: string
	dataPedido: string
	valorTotal: number
	itens: PedidoItemCreate[]
}

export const getPedidos = async () => {
	const { data } = await api.get('/Pedido')
	return data
}

export const getPedidoById = async (id: string) => {
	const { data } = await api.get(`/Pedido/${id}`)
	return data
}

export const createPedido = async (pedido: PedidoCreate) => {
	const { data } = await api.post('/Pedido', pedido)
	return data
}

export const updatePedido = async (id: string, pedido: PedidoCreate) => {
	const { data } = await api.put(`/Pedido/${id}`, pedido)
	return data
}

export const deletePedido = async (id: string) => {
	return api.delete(`/Pedido/${id}`)
}

