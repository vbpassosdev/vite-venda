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
      <button className="
              bg-purple-500 hover:bg-purple-600
              text-white text-xs font-medium
              px-2.5 py-2 rounded-md
              shadow-sm
              transition
            ">
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


