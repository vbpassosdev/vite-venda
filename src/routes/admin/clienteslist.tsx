import { createFileRoute } from "@tanstack/react-router"
import { getInfluenciadores } from "@/services/influenciadoresService"
import { useEffect, useState } from "react"
import { BaseList } from "@/components/BaseList"
import { TableBase } from "@/components/TableBase"
import { RowActions } from "@/components/RowActions"
import { getClientes } from "@/services/clientesService"

type Cliente = {
  id: string
  nome: string
  email: string
  telefone: string
}

function FormClientesList() {
  const [data, setData] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClientes()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  function handleEdit(row: Cliente) {
    console.log("Editar:", row)
  }

  function handleDelete(row: Cliente) {
    console.log("Excluir:", row)
  }

  return (
    <BaseList
      title="Clientes"
      subtitle="Gerencie os clientes cadastrados"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum cliente encontrado."
      actions={
        <button className="background-linear-to-r from-purple-500 to-pink-500 text-purple-600 
                          shadow-md
                          hover:shadow-purple-700 hover:opacity-30 
                           transition rounded-lg px-4 py-2 font-semibold">
          Novo Cliente
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

export const Route = createFileRoute("/admin/clienteslist")({
  component: FormClientesList,
})
