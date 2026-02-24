import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getProdutos } from "@/services/produtosService"
import type { Produto as ProdutoApi } from "@/services/produtosService"

export type Produto = {
  id: string
  nome: string
}

type Props = {
  value?: string
  onSelect: (produto: Produto) => void
}

export function BuscarProduto({ value = "", onSelect }: Props) {
  const [busca, setBusca] = useState(value)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [mostrarLista, setMostrarLista] = useState(false)
  const [loading, setLoading] = useState(false)
  const [indiceSelecionado, setIndiceSelecionado] = useState(-1)

  async function buscarProdutos(texto: string) {
    if (!texto) {
      setProdutos([])
      return
    }

    try {
      setLoading(true)
      const data = await getProdutos()
      const produtosFormatados: Produto[] = data.map((produto: ProdutoApi) => ({
        id: String(produto.id),
        nome: produto.descricao,
      }))

      setProdutos(produtosFormatados)
    } catch {
      console.error("Erro ao buscar produtos")
    } finally {
      setLoading(false)
    }
  }

  // debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      buscarProdutos(busca)
    }, 400)

    return () => clearTimeout(delay)
  }, [busca])

  useEffect(() => {
    setIndiceSelecionado(-1)
  }, [produtos])

  function selecionarProduto(produto: Produto) {
    setBusca(produto.nome)
    setMostrarLista(false)
    onSelect(produto)
  }

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

      <Input
        type="text"
        placeholder="Buscar produto..."
        value={busca}
        className="pl-9"
        onChange={(e) => {
          setBusca(e.target.value)
          setMostrarLista(true)
        }}
        onBlur={() => setTimeout(() => setMostrarLista(false), 150)}
        onKeyDown={(e) => {
          if (!mostrarLista) return

          if (e.key === "ArrowDown") {
            e.preventDefault()
            setIndiceSelecionado(prev =>
              prev < produtos.length - 1 ? prev + 1 : prev
            )
          }

          if (e.key === "ArrowUp") {
            e.preventDefault()
            setIndiceSelecionado(prev =>
              prev > 0 ? prev - 1 : 0
            )
          }

          if (e.key === "Enter") {
            e.preventDefault()
            if (indiceSelecionado >= 0) {
              selecionarProduto(produtos[indiceSelecionado])
            }
          }

          if (e.key === "Escape") {
            setMostrarLista(false)
          }
        }}
      />

      {mostrarLista && (
        <div className="absolute z-50 bg-white border w-full rounded shadow mt-1 max-h-48 overflow-auto">

          {loading && (
            <div className="p-2 text-gray-500 text-sm">Buscando...</div>
          )}

          {!loading && produtos.length === 0 && (
            <div className="p-2 text-gray-400 text-sm">
              Nenhum produto encontrado
            </div>
          )}

          {produtos.map((produto, index) => (
            <div
              key={produto.id}
              className={`px-3 py-2 cursor-pointer ${
                index === indiceSelecionado
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              onMouseEnter={() => setIndiceSelecionado(index)}
              onClick={() => selecionarProduto(produto)}
            >
              {produto.nome}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}