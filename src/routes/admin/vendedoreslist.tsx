import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { BaseList } from "@/components/form/BaseList"
import { TableBase } from "@/components/form/TableBase"
import { RowActions } from "@/components/form/RowActions"
import { getVendedores } from "@/services/vendedoresService"

export const Route = createFileRoute("/admin/vendedoreslist")({
  component: FormVendedoresList,
})

type Vendedor = {
  id: string
  nome: string
  email: string
  telefone: string
}

function FormVendedoresList() {
  const [data, setData] = useState<Vendedor[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getVendedores()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  function handleEdit(row: Vendedor) {
    navigate({
      to: "/admin/vendedores",
      search: { id: row.id }
    })
  }

  function handleDelete(row: Vendedor) {
    console.log("Excluir:", row)
  }

  return (
    <BaseList
      title="Equipe e vendedores"
      subtitle="Consulte os vendedores envolvidos nas operacoes comerciais"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum vendedor encontrado."
      actions={
        <button
          onClick={() =>
            navigate({
              to: "/admin/vendedores",
              search: { id: undefined }
            })
          }
          className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium px-2.5 py-2 rounded-md shadow-sm transition"
        >
          Novo vendedor
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          { header: "Nome", render: r => r.nome },
          { header: "Email", render: r => r.email },
          { header: "Telefone", render: r => r.telefone },
          {
            header: "Acoes",
            render: (row) => <RowActions row={row} onEdit={handleEdit} onDelete={handleDelete} />
          }
        ]}
      />
    </BaseList>
  )
}

