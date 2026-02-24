import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { BaseList } from "@/components/form/BaseList"
import { TableBase } from "@/components/form/TableBase"
import { RowActions } from "@/components/form/RowActions"
import { getVendedores } from "@/services/vendedoresService"

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
    console.log("Editar:", row)
  }

  function handleDelete(row: Vendedor) {
    console.log("Excluir:", row)
  }

  return (
    <BaseList
      title="Vendedores"
      subtitle="Gerencie os vendedores cadastrados"
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
        
          className="background-linear-to-r from-purple-500 to-pink-500 text-purple-600 
                          shadow-md
                          hover:shadow-purple-700 hover:opacity-30 
                           transition rounded-lg px-4 py-2 font-semibold"
        >  
        Novo Vendedor
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
            header: "Ações",
            render: (row) => <RowActions row={row} onEdit={handleEdit} onDelete={handleDelete} />
          }
        ]}
      />
    </BaseList>
  )
}

export const Route = createFileRoute("/admin/vendedoreslist")({
  component: FormVendedoresList,
})
