import { createFileRoute, useSearch } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { BaseForm } from "@/components/form/BaseForm"

export type Titulo = {
  id?: string
  numeroDocumento: string
  nossoNumero: string
  carteira: string
  valorDocumento: number
  vencimento: string
  dataDocumento: string
  dataProcessamento: string
  valorJuros: number
  percentualMulta: number
  especie: string
  especieMod: string
  instrucao1: string
  instrucao2: string
  cedenteId: string
  sacadoId: string
}

export const Route = createFileRoute("/admin/titulos")({
  validateSearch: (search) => ({
    id: search.id as string | undefined,
  }),
  component: FormTitulos,
})

function FormTitulos() {
  const { id } = useSearch({ from: "/admin/titulos" })
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(false)
  const [cedentes, setCedentes] = useState<any[]>([])
  const [sacados, setSacados] = useState<any[]>([])

  const [form, setForm] = useState({
    numeroDocumento: "",
    nossoNumero: "",
    carteira: "109",
    valorDocumento: "",
    vencimento: "",
    dataDocumento: "",
    dataProcessamento: "",
    valorJuros: "0",
    percentualMulta: "0",
    especie: "DM",
    especieMod: "R$",
    instrucao1: "",
    instrucao2: "",
    cedenteId: "",
    sacadoId: "",
  })

  useEffect(() => {
    async function loadCombos() {
      const ceds = await getCedentes()
      const sacs = await getSacados()

      setCedentes(ceds)
      setSacados(sacs)
    }

    loadCombos()
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { id, value } = e.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...form,
        valorDocumento: Number(form.valorDocumento),
        valorJuros: Number(form.valorJuros),
        percentualMulta: Number(form.percentualMulta),
      }

      if (isEdit && id !== "novo") {
        await updateTitulo(id!, payload)
        alert("Título atualizado com sucesso!")
      } else {
        await createTitulo(payload)
        alert("Título cadastrado com sucesso!")
      }
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar título")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseForm
      title={isEdit ? "Editar Título" : "Cadastro de Título"}
      subtitle="Dados do boleto"
      loading={loading}
      onSubmit={handleSubmit}
    >
      {/* Dados principais */}
      <InputField id="numeroDocumento" label="Número Documento" value={form.numeroDocumento} onChange={handleChange} />
      <InputField id="nossoNumero" label="Nosso Número" value={form.nossoNumero} onChange={handleChange} />
      <InputField id="carteira" label="Carteira" value={form.carteira} onChange={handleChange} />

      {/* Valores */}
      <InputField id="valorDocumento" label="Valor Documento" type="number" step="0.01" value={form.valorDocumento} onChange={handleChange} />
      <InputField id="valorJuros" label="Valor Juros ao Dia" type="number" step="0.01" value={form.valorJuros} onChange={handleChange} />
      <InputField id="percentualMulta" label="% Multa" type="number" step="0.01" value={form.percentualMulta} onChange={handleChange} />

      {/* Datas */}
      <InputField id="vencimento" label="Vencimento" type="date" value={form.vencimento} onChange={handleChange} />
      <InputField id="dataDocumento" label="Data Documento" type="date" value={form.dataDocumento} onChange={handleChange} />
      <InputField id="dataProcessamento" label="Data Processamento" type="date" value={form.dataProcessamento} onChange={handleChange} />

      {/* Select Cedente */}
      <SelectField
        id="cedenteId"
        label="Cedente"
        value={form.cedenteId}
        options={cedentes}
        onChange={handleChange}
      />

      {/* Select Sacado */}
      <SelectField
        id="sacadoId"
        label="Sacado"
        value={form.sacadoId}
        options={sacados}
        onChange={handleChange}
      />

      {/* Instruções */}
      <TextAreaField id="instrucao1" label="Instrução 1" value={form.instrucao1} onChange={handleChange} />
      <TextAreaField id="instrucao2" label="Instrução 2" value={form.instrucao2} onChange={handleChange} />
    </BaseForm>
  )
}

  function SelectField({
  id,
  label,
  value,
  options,
  onChange
}: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
        required
      >
        <option value="">Selecione</option>
        {options.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.nome}
          </option>
        ))}
      </select>
    </div>
  )
}

function TextAreaField({
  id,
  label,
  value,
  onChange
}: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
        rows={3}
      />
    </div>
  )
}

async function updateTitulo(id: string, payload: Titulo) {
    const response = await fetch(`/api/titulos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error(`Failed to update titulo: ${response.statusText}`)
    }

    return response.json()
}

async function createTitulo(payload: Titulo) {
    const response = await fetch("/api/titulos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error(`Failed to create titulo: ${response.statusText}`)
    }

    return response.json()
}

async function getCedentes() {
    const response = await fetch("/api/cedentes")
    return response.json()
}

async function getSacados() {
    const response = await fetch("/api/sacados")
    return response.json()
}

function InputField({
    id,
    label,
    type = "text",
    step,
    value,
    onChange,
}: any) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">
                {label}
            </label>
            <input
                id={id}
                type={type}
                step={step}
                value={value}
                onChange={onChange}
                className="w-full border rounded px-3 py-2"
                required
            />
        </div>
    )
}

