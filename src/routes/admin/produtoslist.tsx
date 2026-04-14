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
          className="app-btn app-btn-primary app-btn-sm shadow-sm"
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
              <span className="app-badge app-badge-success">
                R$ {r.preco.toFixed(2)}
              </span>
            ),
          },
          {
            header: "Estoque",
            render: r => (
              <span className={`app-badge ${r.estoque > 0 ? 'app-badge-primary' : 'app-badge-warning'}`}>
                {r.estoque} unidades
              </span>
            ),
          },
          {
            header: "Status",
            render: r => (
              <span className={`app-badge ${r.ativo ? 'app-badge-success' : 'app-badge-neutral'}`}>
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


