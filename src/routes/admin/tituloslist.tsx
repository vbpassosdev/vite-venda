import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { BaseList } from "@/components/form/BaseList"
import { TableBase } from "@/components/form/TableBase"
import { RowActions } from "@/components/form/RowActions"
import { getTitulos, gerarBoleto } from "@/services/titulosService"

type Titulo = {
  id: string
  clienteNome: string
  numeroDocumento: string
  valorDocumento: number
  vencimento: string
}

function FormTitulosList() {
  const [data, setData] = useState<Titulo[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadTitulos()
  }, [])

  async function loadTitulos() {
    setLoading(true)
    const titulos = await getTitulos()
    setData(titulos)
    setLoading(false)
  }

  function handleEdit(row: Titulo) {
    return navigate({
      to: "/admin/titulos",
      search: { id: row.id }
    })
  }

  async function handlePrint(row: Titulo) {
    const response = await gerarBoleto(row.id)
    alert(`Boleto gerado em: ${response.caminho}`)
    window.open(response.pdfUrl, '_blank')
  }

  function getDueBadge(vencimento: string) {
    const today = new Date()
    const dueDate = new Date(vencimento)
    const diffInDays = Math.ceil((dueDate.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24))

    if (diffInDays <= 3) {
      return "app-badge app-badge-warning"
    }

    return "app-badge app-badge-success"
  }

  return (
    <BaseList
      title="Titulos e boletos"
      subtitle="Gerencie os titulos da cobranca"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum titulo encontrado."
      actions={
        <button
          onClick={() =>
            navigate({
              to: "/admin/titulos",
              search: { id: undefined }
            })
          }
          className="app-btn app-btn-primary app-btn-sm shadow-sm"
        >
          Novo titulo
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          {
            header: "Cliente",
            render: r => (
              <div>
                <div className="font-semibold text-slate-900">{r.clienteNome}</div>
                <div className="text-xs text-slate-500">Documento {r.numeroDocumento}</div>
              </div>
            ),
          },
          {
            header: "Valor",
            render: r => (
              <span className="app-badge app-badge-success">
                R$ {r.valorDocumento.toFixed(2)}
              </span>
            ),
          },
          {
            header: "Vencimento",
            render: r => (
              <span className={getDueBadge(r.vencimento)}>
                {new Date(r.vencimento).toLocaleDateString()}
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
                printLabel="Gerar boleto"
              />
            )
          }
        ]}
      />
    </BaseList>
  )
}

export const Route = createFileRoute("/admin/tituloslist")({
  component: FormTitulosList,
})

