import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getClientes } from "@/services/clientesService"

export type Cliente = {
  id: string
  razaoSocial: string
}

type Props = {
  value?: string
  onSelect: (cliente: Cliente) => void
}

export function BuscarCliente({ value = "", onSelect }: Props) {
  const [busca, setBusca] = useState(value)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [mostrarLista, setMostrarLista] = useState(false)
  const [loading, setLoading] = useState(false)
  const [indiceSelecionado, setIndiceSelecionado] = useState(-1)

  async function buscarClientes(texto: string) {
    if (!texto) {
      setClientes([])
      return
    }

    try {
      setLoading(true)
      const data = await getClientes()
      setClientes(data)
    } catch {
      console.error("Erro ao buscar clientes")
    } finally {
      setLoading(false)
    }
  }

  // debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      buscarClientes(busca)
    }, 400)

    return () => clearTimeout(delay)
  }, [busca])

  useEffect(() => {
    setIndiceSelecionado(-1)
  }, [clientes])

  function selecionarCliente(cliente: Cliente) {
    setBusca(cliente.razaoSocial)
    setMostrarLista(false)
    onSelect(cliente)
  }

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

      <Input
        type="text"
        placeholder="Buscar cliente..."
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
              prev < clientes.length - 1 ? prev + 1 : prev
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
              selecionarCliente(clientes[indiceSelecionado])
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

          {!loading && clientes.length === 0 && (
            <div className="p-2 text-gray-400 text-sm">
              Nenhum cliente encontrado
            </div>
          )}

          {clientes.map((cliente, index) => (
            <div
              key={cliente.id}
              className={`px-3 py-2 cursor-pointer ${
                index === indiceSelecionado
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              onMouseEnter={() => setIndiceSelecionado(index)}
              onClick={() => selecionarCliente(cliente)}
            >
              {cliente.razaoSocial}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}