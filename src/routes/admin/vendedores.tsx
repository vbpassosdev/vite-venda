import { createFileRoute, useSearch } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import {createVendedor, getVendedorById, updateVendedor } from "@/services/vendedoresService"
import { BaseForm } from "@/components/form/BaseForm"

function FormVendedores() {
  const search = useSearch({ from: "/admin/vendedores" }) as { id?: number }
  const vendedorId = search?.id

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    celular: ""
  })

  const [loading, setLoading] = useState(false)
  const isEdit = Boolean(vendedorId)

  useEffect(() => {
    if (vendedorId) {
      loadVendedor(vendedorId)
    }
  }, [vendedorId])

  async function loadVendedor(id: number) {
    try {
      setLoading(true)
      const data = await getVendedorById(id)

      setForm({
        nome: data.nome ?? "",
        email: data.email ?? "",
        telefone: data.telefone ?? "",
        celular: data.celular ?? ""
      })
    } catch {
      alert("Erro ao carregar vendedor")
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target

    setForm(prev => ({
      ...prev,
      [id]: value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEdit) {
        await updateVendedor(vendedorId as number, form)
      } else {
        await createVendedor(form)
      }
      
      setForm({
        nome: "",
        email: "",
        telefone: "",
        celular: ""
      })

      alert(isEdit ? "Vendedor atualizado com sucesso!" : "Vendedor cadastrado com sucesso!")
    } catch {
      alert("Erro ao salvar vendedor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseForm
      title={isEdit ? "Editar Vendedor" : "Cadastro de Vendedores"}
      subtitle="Preencha os dados do vendedor"
      loading={loading}
      onSubmit={handleSubmit}
    >
      <InputField id="nome" label="Nome" value={form.nome} onChange={handleChange} />
      <InputField id="email" label="Email" value={form.email} onChange={handleChange} />
      <InputField id="telefone" label="Telefone" value={form.telefone} onChange={handleChange} />
      <InputField id="celular" label="Celular" value={form.celular} onChange={handleChange} />
    </BaseForm>
  )
}

function InputField({ id, label, value, onChange }: any) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}

export const Route = createFileRoute("/admin/vendedores")({
  component: FormVendedores,
})
