import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { BaseList } from "@/components/form/BaseList"
import { TableBase } from "@/components/form/TableBase"
import { RowActions } from "@/components/form/RowActions"
import { getClientes, deleteCliente } from "@/services/clientesService"

type Cliente = {
  id: string
  nome: string
  email: string
  telefone: string
}

function FormClientesList() {
  const [data, setData] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadClientes()
  }, [])

  async function loadClientes() {
    setLoading(true)
    const clientes = await getClientes()
    setData(clientes)
    setLoading(false)
  }

  // ✅ EDITAR → navega para tela de edição
  function handleEdit(row: Cliente) {
      navigate({
      to: "/admin/clientes",
      search: { id: row.id }
    })

  }

  // ✅ EXCLUIR → remove local + API
  async function handleDelete(row: Cliente) {
    const confirmar = window.confirm(`Excluir ${row.nome}?`)
    if (!confirmar) return

    await deleteCliente(row.id)

    setData(prev => prev.filter(c => c.id !== row.id))
  }

  return (
    <BaseList
      title="Clientes"
      subtitle="Gerencie os clientes cadastrados"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum cliente encontrado."
      actions={
        <button
          onClick={() => 
           navigate({
              to: "/admin/clientes",
              search: { id: undefined }
            })
          }
          className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium px-2.5 py-2 rounded-md shadow-sm transition"
        >
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

export const Route = createFileRoute("/admin/clienteslist")({
  component: FormClientesList,
})
