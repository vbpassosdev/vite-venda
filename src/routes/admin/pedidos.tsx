import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import { BaseForm } from "@/components/form/BaseForm"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


export const Route = createFileRoute('/admin/pedidos')({
  component: FormPedidos,
})

type ItemPedido = {
  produto: string
  quantidade: number
  valor: number
}

function FormPedidos() {
  const [loading, setLoading] = useState(false)

  const [pedido, setPedido] = useState({
    cliente: "",
    data: "",
    vendedor: "",
  })

  const [itens, setItens] = useState<ItemPedido[]>([
    { produto: "", quantidade: 1, valor: 0 }
  ])

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
            <Input 
              value={pedido.cliente}
              onChange={e => setPedido({ ...pedido, cliente: e.target.value })}
            />
          </div>

          <div className="form-pedidos-field">
            <label>Data do Pedido</label>
            <Input 
              type="date"
              value={pedido.data}
              onChange={e => setPedido({ ...pedido, data: e.target.value })}
            />
          </div>

          <div className="form-pedidos-field">
            <label>Vendedor</label>
            <Input 
              value={pedido.vendedor}
              onChange={e => setPedido({ ...pedido, vendedor: e.target.value })}
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
