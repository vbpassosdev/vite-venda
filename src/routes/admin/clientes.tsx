import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { createCliente } from "@/services/clientesService"
import { BaseForm } from "@/components/BaseForm"

function FormClientes() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    celular: "",
    tipoCliente: ""
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await createCliente({
        ...form,
        tipoCliente: Number(form.tipoCliente)
      })

      setForm({
        nome: "",
        email: "",
        telefone: "",
        celular: "",
        tipoCliente: ""
      })

      alert("Cliente cadastrado com sucesso!")
    } catch {
      alert("Erro ao cadastrar cliente")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseForm
      title="Cadastro de Clientes"
      subtitle="Preencha os dados do cliente"
      loading={loading}
      onSubmit={handleSubmit}
    >
      <InputField id="nome" label="Nome" value={form.nome} onChange={handleChange} />
      <InputField id="email" label="Email" value={form.email} onChange={handleChange} />
      <InputField id="telefone" label="Telefone" value={form.telefone} onChange={handleChange} />
      <InputField id="celular" label="Celular" value={form.celular} onChange={handleChange} />
      <InputField id="tipoCliente" label="Tipo Cliente" value={form.tipoCliente} onChange={handleChange} />
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

export const Route = createFileRoute("/admin/clientes")({
  component: FormClientes,
})
