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
    navigate({
      to: "/admin/produtos",
      search: { id: String(row.id) }
    })
  }

  async function handleDelete(row: Produto) {
    const confirmar = window.confirm(`Remover ${row.descricao} de vendas?`)

    if (!confirmar) return
    try {
      await deleteProduto(row.id)
      setData(prev => prev.filter(p => p.id !== row.id))
      alert("Produto removido com sucesso!")
    } catch (err) {
      console.error(err)
      alert("Erro ao excluir produto")
    }
  }

  return (
    <BaseList
      title="Produtos para emissao"
      subtitle="Revise os produtos usados nos pedidos e na emissao de NF-e"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum produto encontrado."
      actions={
        <button
          onClick={() =>
            navigate({
              to: "/admin/produtos",
              search: { id: undefined }
            })
          }
          className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium px-2.5 py-2 rounded-md shadow-sm transition"
        >
          Novo produto
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          {
            header: "Produto",
            render: r => (
              <div>
                <div className="font-semibold text-slate-900">{r.descricao}</div>
                <div className="text-xs text-slate-500">Ref. {r.referencia}</div>
              </div>
            ),
          },
          {
            header: "Preco",
            render: r => (
              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                R$ {r.preco.toFixed(2)}
              </span>
            ),
          },
          {
            header: "Estoque",
            render: r => (
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${r.estoque > 0 ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'}`}>
                {r.estoque} unidades
              </span>
            ),
          },
          {
            header: "Status",
            render: r => (
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${r.ativo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                {r.ativo ? 'Disponivel' : 'Inativo'}
              </span>
            ),
          },
          {
            header: "Acoes",
            render: (row) => <RowActions row={row} onEdit={handleEdit} onDelete={handleDelete} />
          }
        ]}
      />
    </BaseList>
  )
}


