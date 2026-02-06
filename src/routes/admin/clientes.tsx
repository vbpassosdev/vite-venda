import { createFileRoute, useSearch } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { createCliente, getClienteById, updateCliente } from "@/services/clientesService"
import { BaseForm } from "@/components/form/BaseForm"

export type Cliente = {
  id?: string
  nome: string
  email: string
  telefone: string
  celular: string
  tipoCliente: number
}

export const Route = createFileRoute("/admin/clientes")({
  validateSearch: (search) => ({
    id: search.id as string | undefined,
  }),
  component: FormClientes,
})

function FormClientes() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    celular: "",
    tipoCliente: ""
  })
  
  const { id } = useSearch({ from: "/admin/clientes" })

  const isEdit = Boolean(id)



  const [loading, setLoading] = useState(false)

    useEffect(() => {
      if (!id) return

      async function loadCliente() {
        setLoading(true)
        console.log("ID recebido:", id)
        console.log("Modo edição:", isEdit)
        try {
          const data = await getClienteById(id as string)
          setForm({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            celular: data.celular,
            tipoCliente: String(data.tipoCliente)
          })
        } catch (err) {
          console.error(err)
          alert("Erro ao carregar cliente")
        } finally {
          setLoading(false)
        }
      }

      loadCliente()
    }, [id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...form,
        tipoCliente: Number(form.tipoCliente)
      }

      if (id && id !== "novo") {
        await updateCliente(id, payload)
        alert("Cliente atualizado com sucesso!")
      } else {
        await createCliente(payload)
        alert("Cliente cadastrado com sucesso!")

        setForm({
          nome: "",
          email: "",
          telefone: "",
          celular: "",
          tipoCliente: ""
        })
      }
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar cliente")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseForm
      title={isEdit ? "Editar Cliente" : "Cadastro de Clientes"}
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

function InputField({
  id,
  label,
  value,
  onChange
}: {
  id: string
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <Input id={id} value={value} onChange={onChange} required />
    </div>
  )
}
