import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react"
import { BaseList } from "@/components/form/BaseList"
import { TableBase } from "@/components/form/TableBase"
import { RowActions } from "@/components/form/RowActions"
import { deleteProduto, getProdutos } from '@/services/produtosService'
import { useNavigate } from "@tanstack/react-router"


export const Route = createFileRoute('/admin/produtoslist')({
  component: FormProdutosList,
})

type Produto = {
  id: number
  descricao: string
  referencia: string
  preco: number
  estoque: number
  ativo: boolean
  dataCadastro: string
}


function FormProdutosList() {
  const [data, setData] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getProdutos()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])


  function handleEdit(row: Produto) {
    console.log(row)
    navigate({
      to: "/admin/produtos",
      search: { id: String(row.id) }
    })
  }

  async function handleDelete(row: Produto) {
    const confirmar = window.confirm(`Excluir ${row.descricao}?`)

    if (!confirmar) return
    try {
       await deleteProduto(row.id) // Importar a função de delete
      setData(prev => prev.filter(p => p.id !== row.id))
      alert("Produto excluído com sucesso!")
    } catch (err) {
      console.error(err)
      alert("Erro ao excluir produto")
    }
  }

  return (
    <BaseList
      title="Produtos Cadastrados"
      subtitle="Gerencie os produtos cadastrados"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum produto encontrado."
           actions={
         <button
          onClick={() =>
                      navigate({
              to: "/admin/produtos",
              search: {id: undefined }
            })
          }
          className="
            bg-purple-500 hover:bg-purple-600
            text-white text-xs font-medium
            px-2.5 py-2 rounded-md
            shadow-sm
            transition
          "
        >
          Novo Produto
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          { header: "Descrição", render: r => r.descricao },
          { header: "Referência", render: r => r.referencia },
          { header: "Preço", render: r => r.preco },
          { header: "Estoque", render: r => r.estoque },
          { header: "Ativo", render: r => r.ativo ? "Sim" : "Não" },
          { header: "Data Cadastro", render: r => new Date(r.dataCadastro).toLocaleDateString() },
          
          {
            header: "Ações",
            render: (row) => <RowActions row={row} onEdit={handleEdit} onDelete={handleDelete} />
          }
        ]}
      />
    </BaseList>
  )
}


