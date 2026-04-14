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

  function getStatusTone(status: string) {
    const normalized = status.toLowerCase()

    if (normalized.includes('fat') || normalized.includes('emit')) return 'app-badge app-badge-success'
    if (normalized.includes('aber') || normalized.includes('pend')) return 'app-badge app-badge-warning'
    return 'app-badge app-badge-primary'
  }

  useEffect(() => {
    getPedidos()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  function handleEdit(row: Pedido) {
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

  return (
    <BaseList
      title="Pedidos"
      subtitle="Acompanhe os pedidos do fluxo de faturamento"
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
          className="app-btn app-btn-primary app-btn-sm shadow-sm"
        >
          Novo pedido
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          {
            header: "Pedido",
            render: r => (
              <div>
                <div className="font-semibold text-slate-900">#{r.id}</div>
                <div className="text-xs text-slate-500">{formatDate(r.dataPedido)}</div>
              </div>
            ),
          },
          { header: "Cliente", render: r => <span className="font-medium text-slate-700">{getClienteNome(r)}</span> },
          {
            header: "Valor total",
            render: r => (
              <span className="app-badge app-badge-success">
                R$ {r.valorTotal.toFixed(2)}
              </span>
            ),
          },
          {
            header: "Status",
            render: r => (
              <span className={getStatusTone(r.statusDescricao || r.status)}>
                {r.statusDescricao || r.status}
              </span>
            ),
          },
          {
            header: "Acoes",
            render: row => (
              <RowActions
                row={row}
                onEdit={handleEdit}
                onPrint={handlePrint}
                printLabel="Ver impressao"
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

