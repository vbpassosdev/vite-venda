import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { BaseForm } from "@/components/BaseForm"
import { createProduto } from '@/services/produtosServices'

export const Route = createFileRoute('/admin/produtos')({
  component: FormProdutos,
})



function FormProdutos() {
  const [form, setForm] = useState({
    descricao: "",
    referencia: "",
    tipoProduto: ""
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await createProduto({
        ...form,
        tipoProduto: Number(form.tipoProduto)
      })

      setForm({
        descricao: "",
        referencia: "",
        tipoProduto: ""
      })

      alert("Produto cadastrado com sucesso!")
    } catch {
      alert("Erro ao cadastrar produto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseForm
      title="Cadastro de Produtos"
      subtitle="Preencha os dados do produto"
      loading={loading}
      onSubmit={handleSubmit}
    >
      <InputField id="descricao" label="Descrição" value={form.descricao} onChange={handleChange} />
      <InputField id="referencia" label="Referência" value={form.referencia} onChange={handleChange} />
      <InputField id="tipoProduto" label="Tipo Produto" value={form.tipoProduto} onChange={handleChange} />
    </BaseForm>
  )
}

function InputField({ id, label, value, onChange }: any) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <Input id={id} value={value} onChange={onChange} required />
    </div>
  )
}

