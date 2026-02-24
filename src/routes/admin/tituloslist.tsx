import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { BaseList } from "@/components/form/BaseList"
import { TableBase } from "@/components/form/TableBase"
import { RowActions } from "@/components/form/RowActions"
import {getTitulos, gerarBoleto} from "@/services/titulosService"

type Titulo = {
  id: string
  clienteNome: string
  numeroDocumento : string
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
  const response = await gerarBoleto(row.id);
  console.log("Resposta completa:", response);
  alert(`Arquivo gerado em: ${response.caminho}`);
  window.open(response.pdfUrl, '_blank');
}

  return (
    <BaseList
      title="Títulos"
      subtitle="Gerencie os títulos gerados"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum título encontrado."
      actions={
        <button
          onClick={() =>
            navigate({
              to: "/admin/titulos",
              search: { id: undefined }
            })
          }
          className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium px-2.5 py-2 rounded-md shadow-sm transition"
        >
          Novo Título
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          { header: "Cliente", render: r => r.clienteNome },
          { header: "Valor", render: r => `R$ ${r.valorDocumento.toFixed(2)}` },
          { header: "Vencimento", render: r => new Date(r.vencimento).toLocaleDateString() },
          {
            header: "Ações",
            render: row => (
              <RowActions
                row={row}
                onEdit={handleEdit}
                onPrint={handlePrint}
                printLabel="Gerar Boleto"
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
