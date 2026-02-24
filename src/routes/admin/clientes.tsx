import { createFileRoute, useSearch } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { createCliente, getClienteById, updateCliente } from "@/services/clientesService"
import { BaseForm } from "@/components/form/BaseForm"
import type { ClientesCreate } from "@/services/clientesService" // adjust path if needed

export type Cliente = {
  id?: string
  cpfCnpj: string
  tipoPessoa: string
  razaoSocial: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  celularDdd?: string
  celular?: string
  telefoneDdd?: string
  telefone?: string
  email?: string
}

export const Route = createFileRoute("/admin/clientes")({
  validateSearch: (search) => ({
    id: search.id as string | undefined,
  }),
  component: FormClientes,
})

function FormClientes() {
const [form, setForm] = useState<Cliente>({
  cpfCnpj: "",
  tipoPessoa: "",
  razaoSocial: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  celularDdd: "",
  celular: "",
  telefoneDdd: "",
  telefone: "",
  email: ""
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
            cpfCnpj: data.cpfCnpj,
            tipoPessoa: data.tipoPessoa,
            razaoSocial: data.razaoSocial,
            cep: data.cep,
            logradouro: data.logradouro,
            numero: data.numero,
            complemento: data.complemento ?? "",
            bairro: data.bairro,
            cidade: data.cidade,
            uf: data.uf,
            celularDdd: data.celularDdd?.toString() ?? "",
            celular: data.celular?.toString() ?? "",
            telefoneDdd: data.telefoneDdd?.toString() ?? "",
            telefone: data.telefone?.toString() ?? "",
            email: data.email ?? ""
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
      const payload: ClientesCreate = {
        ...form,
        complemento: form.complemento ?? "",
        email: form.email ?? "",
        celularDdd: form.celularDdd ?? "",
        celular: form.celular ?? "",
        telefoneDdd: form.telefoneDdd ?? "",
        telefone: form.telefone ?? "",
      }

      if (isEdit) {
        if (!id) throw new Error("ID inválido")
        await updateCliente(id, payload)
      } else {
        await createCliente(payload)
      }
      setForm({
        cpfCnpj: "",
        tipoPessoa: "",
        razaoSocial: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        celularDdd: "",
        celular: "",
        telefoneDdd: "",
        telefone: "",
        email: ""
      })

      alert(isEdit ? "Cliente atualizado com sucesso!" : 
            "Cliente cadastrado com sucesso!")
    } catch {
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
      <InputField id="cpfCnpj" label="CPF/CNPJ" value={form.cpfCnpj} onChange={handleChange} />
      <InputField id="tipoPessoa" label="Tipo Pessoa" value={form.tipoPessoa} onChange={handleChange} />
      <InputField id="razaoSocial" label="Razão Social" value={form.razaoSocial} onChange={handleChange} />
      <InputField id="cep" label="CEP" value={form.cep} onChange={handleChange} />
      <InputField id="logradouro" label="Logradouro" value={form.logradouro} onChange={handleChange} />
      <InputField id="numero" label="Número" value={form.numero} onChange={handleChange} />
      <InputField id="complemento" label="Complemento" value={form.complemento ?? ""} onChange={handleChange} />
      <InputField id="email" label="Email" value={form.email ?? ""} onChange={handleChange} />
      <InputField id="bairro" label="Bairro" value={form.bairro} onChange={handleChange} />
      <InputField id="cidade" label="Cidade" value={form.cidade} onChange={handleChange} />
      <InputField id="uf" label="UF" value={form.uf} onChange={handleChange} />
      <InputField id="celularDdd" label="DDD Celular" value={form.celularDdd ?? ""} onChange={handleChange} />
      <InputField id="celular" label="Celular" value={form.celular ?? ""} onChange={handleChange} />
      <InputField id="telefoneDdd" label="DDD Telefone" value={form.telefoneDdd ?? ""} onChange={handleChange} />
      <InputField id="telefone" label="Telefone" value={form.telefone ?? ""} onChange={handleChange} />
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
