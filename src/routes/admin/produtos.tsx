import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { BaseForm } from "@/components/form/BaseForm"
import { createProduto, getProdutoById, updateProduto } from '@/services/produtosService'

export const Route = createFileRoute("/admin/produtos")({
  validateSearch: (search: { id?: string }) => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  component: FormProdutos,
})

type ProdutoForm = {
  descricao: string
  referencia: string
  preco: number
  estoque: number
}

function FormProdutos() {
  const [form, setForm] = useState<ProdutoForm>({
    descricao: "",
    referencia: "",
    preco: 0,
    estoque: 0,
  })  
  
  const { id } = useSearch({ from: "/admin/produtos" })
  const isEdit = Boolean(id)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
        if (!id) return
  
        async function loadProduto() {
          setLoading(true)
          console.log("ID recebido:", id)
          console.log("Modo edição:", isEdit)
          try {
            const data = await getProdutoById(id as unknown as number)
            setForm({
              descricao: data.descricao,
              referencia: data.referencia,
              preco: data.preco,
              estoque: data.estoque,
            })
          } catch (err) {
            console.error(err)
            alert("Erro ao carregar produto")
          } finally {
            setLoading(false)
          }
        }
  
        loadProduto()
      }, [id])
  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target

    setForm(prev => ({
      ...prev,
      [id]: id === "preco" || id === "estoque"
        ? Number(value || 0)
        : value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {

      if (isEdit) {
        await updateProduto(id as unknown as number, form)
      } else {
        await createProduto(form)
      }
      setForm({
        descricao: "",
        referencia: "",
        preco: 0,
        estoque: 0,
      })

      alert(isEdit ? "Produto atualizado com sucesso!" : 
            "Produto cadastrado com sucesso!")
    } catch {
      alert("Erro ao salvar produto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseForm
      title= "Cadastro de Produtos"
      subtitle="Preencha os dados do produto"
      loading={loading}
      onSubmit={handleSubmit}
    >
      <InputField id="descricao" label="Descrição" value={form.descricao} onChange={handleChange} />
      <InputField id="referencia" label="Referência" value={form.referencia} onChange={handleChange} />
      <InputField id="preco" label="Preço" type="number" value={form.preco} onChange={handleChange} />
      <InputField id="estoque" label="Estoque" type="number" value={form.estoque} onChange={handleChange} />
    </BaseForm>
  )
}

type InputFieldProps = {
  id: keyof ProdutoForm
  label: string
  value: string | number
  onChange: React.ChangeEventHandler<HTMLInputElement>
  type?: string
}

function InputField({ id, label, value, onChange, type = "text" }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <Input id={id} type={type} value={value} onChange={onChange} required />
    </div>
  )
}
