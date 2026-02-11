import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { BaseList } from "@/components/form/BaseList"
import { TableBase } from "@/components/form/TableBase"
import { RowActions } from "@/components/form/RowActions"
import { deleteBoleto, getBoletos } from "@/services/boletosService"

type Boleto = {
  id: string
  clienteNome: string
  valor: number
  vencimento: string
}

function FormBoletosList() {
  const [data, setData] = useState<Boleto[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadBoletos()
  }, [])

  async function loadBoletos() {
    setLoading(true)
    const boletos = await getBoletos()
    setData(boletos)
    setLoading(false)
  }

   function handleEdit(row: Boleto) {
    return navigate({
      to: "/admin/boletolist",
      search: { id: row.id }
    })
    }
    
  async function handleDelete(row: Boleto) {
    const confirmar = window.confirm(`Excluir boleto do cliente ${row.clienteNome}?`)
    if (!confirmar) return

    await deleteBoleto(row.id)

    setData(prev => prev.filter(b => b.id !== row.id))
  }

  return (
    <BaseList
      title="Boletos"
      subtitle="Gerencie os boletos gerados"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum boleto encontrado."
      actions={
        <button
          onClick={() =>
            navigate({
              to: "/admin/boletolist",
              search: { id: undefined }
            })
          }
          className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium px-2.5 py-2 rounded-md shadow-sm transition"
        >
          Novo Boleto
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          { header: "Cliente", render: r => r.clienteNome },
          { header: "Valor", render: r => `R$ ${r.valor.toFixed(2)}` },
          { header: "Vencimento", render: r => new Date(r.vencimento).toLocaleDateString() },
          {
            header: "Ações",
            render: row => (
              <RowActions
                row={row}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          }
        ]}
      />
    </BaseList>
  )
}

export const Route = createFileRoute("/admin/boletolist")({
  component: FormBoletosList,
})
