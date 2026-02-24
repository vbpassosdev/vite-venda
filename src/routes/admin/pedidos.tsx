import { createFileRoute, useSearch } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState, type FormEvent } from "react"
import { BaseForm } from "@/components/form/BaseForm"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { BuscarCliente } from '@/components/form/BuscarCliente'
import type { Cliente as ClienteBusca } from '@/components/form/BuscarCliente'
import { BuscarProduto } from "@/components/form/BuscarProduto"
import { PedidoPage } from '@/components/form/PedidoPage'
import { createPedido, getPedidoById, updatePedido, type PedidoCreate } from '@/services/pedidosService'

export const Route = createFileRoute('/admin/pedidos')({
  validateSearch: (search) => ({
    id: search.id as string | undefined,
    print: search.print as string | undefined,
  }),
  component: FormPedidos,
})

type ItemPedido = {
  idProduto: number
  produtoNome: string
  quantidade: number
  valorUnitario: number
}

function FormPedidos() {
  const { id, print } = useSearch({ from: "/admin/pedidos" })
  const isEdit = Boolean(id)
  const autoPrint = print === "1"
  const [loading, setLoading] = useState(false)
  const [loadingPedido, setLoadingPedido] = useState(false)
  const [itens, setItens] = useState<ItemPedido[]>([])
  const [mostrarNovoItem, setMostrarNovoItem] = useState(false)
  const [novoItem, setNovoItem] = useState<ItemPedido>({
    idProduto: 0,
    produtoNome: "",
    quantidade: 1,
    valorUnitario: 0,
  })
  const [pedido, setPedido] = useState({
    clienteId: "",
    dataPedido: new Date(),
    valorTotal: 0,
    cliente: ""
  })

  useEffect(() => {
    if (!id) return

    setLoadingPedido(true)
    getPedidoById(id)
      .then((data) => {
        const clienteNome =
          data?.clienteNome ||
          data?.cliente?.razaoSocial ||
          data?.cliente?.nome ||
          ""

        setPedido({
          clienteId: String(data?.clienteId || data?.cliente?.id || ""),
          dataPedido: data?.dataPedido ? new Date(data.dataPedido) : new Date(),
          valorTotal: Number(data?.valorTotal || 0),
          cliente: clienteNome,
        })

        const itensApi = Array.isArray(data?.itens) ? data.itens : []
        setItens(
          itensApi.map((item: any) => ({
            idProduto: Number(item?.produtoId || item?.idProduto || 0),
            produtoNome:
              item?.produtoNome ||
              item?.produto?.nome ||
              "",
            quantidade: Number(item?.quantidade || 0),
            valorUnitario: Number(item?.valorUnitario || 0),
          })),
        )
      })
      .catch(() => {
        alert("Erro ao carregar pedido")
      })
      .finally(() => setLoadingPedido(false))
  }, [id])

  const totalPedido = itens.reduce(
    (total, item) => total + item.quantidade * item.valorUnitario,
    0,
  )

  const pedidoParaImpressao = {
    numero: isEdit && id ? Number(id) || 0 : 0,
    data: pedido.dataPedido.toLocaleDateString('pt-BR'),
    clienteNome: pedido.cliente || 'Cliente não informado',
    clienteDocumento: '-',
    clienteEndereco: '-',
    itens: itens.map((item) => ({
      produto: item.produtoNome,
      quantidade: item.quantidade,
      valorUnitario: item.valorUnitario,
    })),
    subtotal: totalPedido,
    desconto: 0,
    total: totalPedido,
  }

  function adicionarItem() {
  if (!novoItem.idProduto) return

  setItens(prev => [...prev, novoItem])

  setNovoItem({
    idProduto: 0,
    produtoNome: "",
    quantidade: 1,
    valorUnitario: 0,
  })

  setMostrarNovoItem(false)
}

function removerItem(index: number) {
  setItens(prev => prev.filter((_, i) => i !== index))
}

 async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!pedido.clienteId) {
      alert("Selecione um cliente antes de salvar o pedido")
      return
    }

    if (itens.length === 0) {
      alert("Adicione pelo menos um item ao pedido")
      return
    }

    const itemInvalido = itens.some(
      (item) =>
        !item.produtoNome ||
        item.idProduto <= 0 ||
        item.quantidade <= 0 ||
        item.valorUnitario <= 0,
    )

    if (itemInvalido) {
      alert("Revise os itens: produto, quantidade e valor unitário são obrigatórios")
      return
    }

    setLoading(true)

    try {
      const valorTotal = itens.reduce(
        (total, item) => total + item.quantidade * item.valorUnitario,
        0,
      )

      const payload: PedidoCreate = {
        clienteId: pedido.clienteId,
        dataPedido: pedido.dataPedido.toISOString(),
        valorTotal,
        itens: itens.map((item) => ({
          produtoId: item.idProduto,
          produtoNome: item.produtoNome,
          quantidade: item.quantidade,
          valorUnitario: item.valorUnitario,
        })),
      }

      if (isEdit) {
        if (!id) throw new Error("ID inválido")
        await updatePedido(id, payload)
      } else {
        await createPedido(payload)
      }
      setPedido({
        clienteId: "",
        dataPedido: new Date(),
        valorTotal: 0,
        cliente: ""
      })
      setItens([])
      setMostrarNovoItem(false)

      alert(isEdit ? "Pedido atualizado com sucesso!" : 
            "Pedido cadastrado com sucesso!")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.title ||
          error.message
        alert(`Erro ao salvar pedido: ${message}`)
      } else {
        alert("Erro ao salvar pedido")
      }
    } finally {
      setLoading(false)
    }
  }

  
  return (
     <BaseForm
      title={isEdit ? "Editar Pedido" : "Cadastro de Pedido"}
      subtitle="Preencha os dados do pedido de venda"
      loading={loading || loadingPedido}
      onSubmit={handleSubmit}
    >
      <div className="form-pedidos">
        <header className="form-pedidos-header">
          <h1>Pedido de Venda</h1>
          <p>Dados gerais do pedido</p>
          <PedidoPage pedido={pedidoParaImpressao} autoPrint={autoPrint} />
        </header>

        <section className="form-pedidos-section">
        <div className="form-pedidos-field">   
            <div className="form-pedidos-field">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <label>Cliente</label>

            <BuscarCliente
              onSelect={(cliente: ClienteBusca) =>
                setPedido(prev => ({
                  ...prev,
                  clienteId: cliente.id,
                  cliente: cliente.razaoSocial,
                }))
              }
            />
          </div>

          <div className="form-pedidos-field">
            <label>Data do Pedido</label>
            <Input 
              type="date"
              value={pedido.dataPedido.toISOString().split("T")[0]}
              onChange={e => setPedido({ ...pedido, dataPedido: new Date(e.target.value) })}
            />
          </div>
        </div>       
        </section>

        {/* Itens */}
        <section>
          <div className="form-pedidos-itens-header flex justify-between items-center">
            <h2>Itens do Pedido</h2>

            <Button
              type="button"
              variant="outline"
              onClick={() => setMostrarNovoItem(true)}
            >
              + Adicionar Item
            </Button>
          </div>

          {/* Formulário Novo Item */}
          {mostrarNovoItem && (
            <div className="border rounded p-4 mt-3 space-y-3 bg-gray-50">

              <BuscarProduto
                value={novoItem.produtoNome}
                onSelect={(produto) =>
                  setNovoItem(prev => ({
                    ...prev,
                    idProduto: Number(produto.id),
                    produtoNome: produto.nome,
                  }))
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Quantidade"
                  value={novoItem.quantidade}
                  onChange={(e) =>
                    setNovoItem(prev => ({
                      ...prev,
                      quantidade: Number(e.target.value),
                    }))
                  }
                />

                <Input
                  type="number"
                  placeholder="Valor Unitário"
                  value={novoItem.valorUnitario}
                  onChange={(e) =>
                    setNovoItem(prev => ({
                      ...prev,
                      valorUnitario: Number(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button type="button" onClick={adicionarItem}>
                  Salvar Item
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setMostrarNovoItem(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

              {/* Lista de Itens */}
                <div className="form-pedidos-itens-list mt-4 space-y-2">
                  {itens.length === 0 && (
                    <p className="text-gray-500">Nenhum item adicionado</p>
                  )}

                  {itens.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border rounded p-3 bg-white"
                    >
                      <div>
                        <div className="font-medium">{item.produtoNome}</div>
                        <div className="text-sm text-gray-500">
                          {item.quantidade} x R$ {item.valorUnitario.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="font-semibold">
                          R$ {(item.quantidade * item.valorUnitario).toFixed(2)}
                        </div>

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removerItem(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
        </section>
    </div>
  </BaseForm>
)
}

