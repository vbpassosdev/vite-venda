import { BaseList } from '@/components/form/BaseList'
import { RowActions } from '@/components/form/RowActions'
import { TableBase } from '@/components/form/TableBase'
import { getPedidos } from '@/services/pedidosService'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

type Pedido = {
  id: number
  valorTotal: number
  cliente?: string | { razaoSocial?: string; nome?: string }
  clienteNome?: string
  dataPedido: string | Date
  status: string
  statusDescricao?: string
}

function FormPedidosList() {
    const [data, setData] = useState<Pedido[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

      function formatDate(value: string | Date) {
        const parsedDate = value instanceof Date ? value : new Date(value)

        if (Number.isNaN(parsedDate.getTime())) {
          return '-'
        }

        return parsedDate.toLocaleDateString()
      }

      function getClienteNome(pedido: Pedido) {
        if (typeof pedido.cliente === 'string' && pedido.cliente.trim()) {
          return pedido.cliente
        }

        if (pedido.cliente && typeof pedido.cliente === 'object') {
          return pedido.cliente.razaoSocial || pedido.cliente.nome || '-'
        }

        return pedido.clienteNome || '-'
      }

      useEffect(() => {
        getPedidos()
          .then(setData)
          .finally(() => setLoading(false))
      }, [])

      function handleEdit(row: Pedido) {
        console.log(row)
        navigate({
          to: "/admin/pedidos",
          search: { id: String(row.id), print: undefined }
        })
      }    

    function handlePrint(row: Pedido) {
      navigate({
        to: "/admin/pedidos",
        search: { id: String(row.id), print: "1" }
      })
    }       
  return(
    <BaseList
      title="Pedidos"
      subtitle="Gerencie os pedidos gerados"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum pedido encontrado."
      actions={
        <button
          onClick={() =>
            navigate({
              to: "/admin/pedidos",
              search: { id: undefined, print: undefined }
            })
          }
          className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium px-2.5 py-2 rounded-md shadow-sm transition"
        >
          Novo Pedido
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          { header: "Valor Total", render: r => `R$ ${r.valorTotal.toFixed(2)}` },
          { header: "Cliente", render: r => getClienteNome(r) },
          { header: "Data do Pedido", render: r => formatDate(r.dataPedido) },
          { header: "Status", render: r => r.statusDescricao || r.status },
          {
            header: "Ações",
            render: row => (
              <RowActions
                row={row}
                onEdit={handleEdit}
                onPrint={handlePrint}
              />
            )
          }
        ]}
      />
    </BaseList>
       
      )
    }

  export const Route = createFileRoute('/admin/pedidoslist')({
  component: FormPedidosList,
})

