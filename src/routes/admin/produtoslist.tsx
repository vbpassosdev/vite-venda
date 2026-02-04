import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react"
import { BaseList } from "@/components/BaseList"
import { TableBase } from "@/components/TableBase"
import { RowActions } from "@/components/RowActions"
import { getProdutos } from '@/services/produtosServices'
export const Route = createFileRoute('/admin/produtoslist')({
  component: FormProdutosList,
})

type Produto = {
  id: string
  descricao: string
  referencia: string
  tipoProduto: number
}

function FormProdutosList() {
  const [data, setData] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProdutos()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  function handleEdit(row: Produto) {
    console.log("Editar:", row)
  }

  function handleDelete(row: Produto) {
    console.log("Excluir:", row)
  }

  return (
    <BaseList
      title="Produtos Cadastrados"
      subtitle="Gerencie os produtos cadastrados"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum produto encontrado."
      actions={
        <button className="background-linear-to-r from-purple-500 to-pink-500 text-purple-600 
                          shadow-md
                          hover:shadow-purple-700 hover:opacity-30 
                           transition rounded-lg px-4 py-2 font-semibold">
          Novo Produto
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          { header: "Descrição", render: r => r.descricao },
          { header: "Referência", render: r => r.referencia },
          { header: "Tipo Produto", render: r => r.tipoProduto },

          {
            header: "Ações",
            render: (row) => <RowActions row={row} onEdit={handleEdit} onDelete={handleDelete} />
          }
        ]}
      />
    </BaseList>
  )
}


