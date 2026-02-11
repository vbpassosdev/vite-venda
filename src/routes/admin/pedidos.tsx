import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import { BaseForm } from "@/components/form/BaseForm"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { getClientes } from '@/services/clientesService'


export const Route = createFileRoute('/admin/pedidos')({
  component: FormPedidos,
})

type Cliente = {
  id: string
  nome: string
}

type ItemPedido = {
  produto: string
  quantidade: number
  valor: number
}

function FormPedidos() {
  const [buscaCliente, setBuscaCliente] = useState("")
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [mostrarLista, setMostrarLista] = useState(false)
  const [loadingClientes, setLoadingClientes] = useState(false)
  
  const [loading, setLoading] = useState(false)

  const [pedido, setPedido] = useState({
    cliente: "",
    data: "",
    vendedor: "",
  })

  const [itens, setItens] = useState<ItemPedido[]>([
    { produto: "", quantidade: 1, valor: 0 }
  ])

  async function buscarClientes(texto: string) {
    if (!texto) {
      setClientes([])
      return
    }

    try {
      setLoadingClientes(true)

      const data = await getClientes()

      const filtrados = data.filter((c: Cliente) =>
        c.nome.toLowerCase().includes(texto.toLowerCase())
      )

      setClientes(filtrados)
    } catch {
      console.error("Erro ao buscar clientes")
    } finally {
      setLoadingClientes(false)
    }
  }

  function handleItemChange(index: number, field: keyof ItemPedido, value: string | number) {
    const novosItens = [...itens]
    if (field === 'produto') {
      novosItens[index][field] = value as string
    } else {
      novosItens[index][field] = value as number
    }
    setItens(novosItens)
  }

  function adicionarItem() {
    setItens([...itens, { produto: "", quantidade: 1, valor: 0 }])
  }

  function removerItem(index: number) {
    setItens(itens.filter((_, i) => i !== index))
  }

  const totalPedido = itens.reduce(
    (total, item) => total + item.quantidade * item.valor,
    0
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("Pedido enviado:", { pedido, itens, totalPedido })
      alert("Pedido cadastrado com sucesso!")
    } catch {
      alert("Erro ao cadastrar pedido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseForm
      title="Lançamento de Pedido"
      subtitle="Preencha os dados do pedido"
      loading={loading}
      onSubmit={handleSubmit}
    >

      <div className="form-pedidos">

        {/* Cabeçalho */}
        <header className="form-pedidos-header">
          <h1>Pedido de Venda</h1>
          <p>Dados gerais do pedido</p>
        </header>

        {/* Dados principais */}
        <section className="form-pedidos-section">
          <div className="form-pedidos-field">
            




  <label>Cliente</label>

  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

    <Input
      type="text"
      placeholder="Busque por cliente..."
      value={buscaCliente}
      className="pl-9"
      onChange={(e) => {
        setBuscaCliente(e.target.value)
        buscarClientes(e.target.value)
        setMostrarLista(true)
      }}
      onBlur={() => setTimeout(() => setMostrarLista(false), 150)}
    />
  </div>

  {mostrarLista && (
    <div className="absolute z-50 bg-white border w-full rounded shadow mt-1 max-h-48 overflow-auto">

      {loadingClientes && (
        <div className="p-2 text-gray-500 text-sm">Buscando...</div>
      )}

      {!loadingClientes && clientes.length === 0 && (
        <div className="p-2 text-gray-400 text-sm">Nenhum cliente encontrado</div>
      )}

      {clientes.map(cliente => (
        <div
          key={cliente.id}
          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setPedido({ ...pedido, cliente: cliente.nome })
            setBuscaCliente(cliente.nome)
            setMostrarLista(false)
          }}
        >
          {cliente.nome}
        </div>
      ))}
    </div>
  )}








          </div>

          <div className="form-pedidos-field">
            <label>Data do Pedido</label>
            <Input 
              type="date"
              value={pedido.data}
              onChange={e => setPedido({ ...pedido, data: e.target.value })}
            />
          </div>

          
        </section>

        {/* Itens */}
        <section>
          <div className="form-pedidos-itens-header">
            <h2>Itens do Pedido</h2>

            <Button type="button" variant="outline" onClick={adicionarItem}>
              + Adicionar Item
            </Button>
          </div>

          <table className="form-pedidos-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtde</th>
                <th>Valor</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {itens.map((item, index) => (
                <tr key={index}>

                  <td>
                    <Input
                      value={item.produto}
                      onChange={e => handleItemChange(index, "produto", e.target.value)}
                    />
                  </td>

                  <td>
                    <Input
                      type="number"
                      value={item.quantidade}
                      onChange={e => handleItemChange(index, "quantidade", Number(e.target.value))}
                    />
                  </td>

                  <td>
                    <Input
                      type="number"
                      value={item.valor}
                      onChange={e => handleItemChange(index, "valor", Number(e.target.value))}
                    />
                  </td>

                  <td>
                    R$ {(item.quantidade * item.valor).toFixed(2)}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="form-pedidos-remove-btn"
                      onClick={() => removerItem(index)}
                    >
                      Remover
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Total */}
        <div className="form-pedidos-total">
          Total: R$ {totalPedido.toFixed(2)}
        </div>

      </div>

    </BaseForm>
  )
}
