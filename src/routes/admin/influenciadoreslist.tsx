import { createFileRoute } from "@tanstack/react-router"
import { getInfluenciadores } from "@/services/influenciadoresService"
import { useEffect, useState } from "react"
import { BaseList } from "@/components/BaseList"
import { TableBase } from "@/components/TableBase"
import { RowActions } from "@/components/RowActions"

type Influenciador = {
  id: string
  nome: string
  email: string
  telefone: string
}

function FormInfluenciadoresList() {
  const [data, setData] = useState<Influenciador[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInfluenciadores()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  function handleEdit(row: Influenciador) {
    console.log("Editar:", row)
  }

  function handleDelete(row: Influenciador) {
    console.log("Excluir:", row)
  }

  return (
    <BaseList
      title="Influenciadores"
      subtitle="Gerencie os influenciadores cadastrados"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum influenciador encontrado."
      actions={
        <button className="background-linear-to-r from-purple-500 to-pink-500 text-purple-600 
                          shadow-md
                          hover:shadow-purple-700 hover:opacity-30 
                           transition rounded-lg px-4 py-2 font-semibold">
          Novo Influenciador
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

export const Route = createFileRoute("/admin/influenciadoreslist")({
  component: FormInfluenciadoresList,
})
