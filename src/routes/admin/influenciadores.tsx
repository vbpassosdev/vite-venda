import { createInfluenciador, getInfluenciadorById, updateInfluenciador } from "@/services/influenciadoresService"
import { createFileRoute, useSearch } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { BaseForm } from "@/components/form/BaseForm"

function FormInfluenciadores() {
  const search = useSearch({ from: "/admin/influenciadores" }) as { id?: number }
  const influenciadorId = search?.id

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    celular: ""
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (influenciadorId) {
      loadInfluenciador(influenciadorId)
    }
  }, [influenciadorId])

  async function loadInfluenciador(id: number) {
    try {
      setLoading(true)
      const data = await getInfluenciadorById(id)

      setForm({
        nome: data.nome ?? "",
        email: data.email ?? "",
        telefone: data.telefone ?? "",
        celular: data.celular ?? ""
      })
    } catch {
      alert("Erro ao carregar influenciador")
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (influenciadorId) {
        await updateInfluenciador(influenciadorId, form)
        alert("Influenciador atualizado com sucesso!")
      } else {
        await createInfluenciador(form)

        setForm({
          nome: "",
          email: "",
          telefone: "",
          celular: ""
        })

        alert("Influenciador cadastrado com sucesso!")
      }
    } catch {
      alert("Erro ao salvar influenciador")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseForm
      title={influenciadorId ? "Editar Influenciador" : "Cadastro de Influenciadores"}
      subtitle="Preencha os dados do influenciador"
      loading={loading}
      submitLabel={influenciadorId ? "Atualizar" : "Cadastrar"}
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

export const Route = createFileRoute("/admin/influenciadores")({
  component: FormInfluenciadores,
})
