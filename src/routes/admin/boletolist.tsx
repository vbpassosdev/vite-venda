import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { BaseList } from "@/components/form/BaseList"
import { TableBase } from "@/components/form/TableBase"
import { RowActions } from "@/components/form/RowActions"
import {getBoletos, gerarBoleto} from "@/services/boletosService"

type Boleto = {
  id: string
  clienteNome: string
  numeroDocumento : string
  valorDocumento: number
  vencimento: string
}

function FormBoletosList() {
  const [data, setData] = useState<Boleto[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadBoletos()
  }, [])

  async function loadBoletos() {
    setLoading(true)
    const boletos = await getBoletos()
    setData(boletos)
    setLoading(false)
  }

   function handleEdit(row: Boleto) {
    return navigate({
      to: "/admin/boletolist",
      search: { id: row.id }
    })
    }

  async function handlePrint(row: Boleto) {
  try {
    //Chama a API para gerar o boleto
      const response = await gerarBoleto(row.id);
      if (response.pdf) {
        const byteCharacters = atob(response.pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        // 3️⃣ Cria URL e abre em nova aba
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        console.error('PDF não encontrado na resposta da API');
      }
    } catch (error) {
      console.error('Erro ao gerar o boleto:', error);
    }
  };



  return (
    <BaseList
      title="Boletos"
      subtitle="Gerencie os boletos gerados"
      loading={loading}
      empty={!loading && data.length === 0}
      emptyMessage="Nenhum boleto encontrado."
      actions={
        <button
          onClick={() =>
            navigate({
              to: "/admin/boletolist",
              search: { id: undefined }
            })
          }
          className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium px-2.5 py-2 rounded-md shadow-sm transition"
        >
          Novo Boleto
        </button>
      }
    >
      <TableBase
        data={data}
        columns={[
          { header: "Cliente", render: r => r.clienteNome },
          { header: "Valor", render: r => `R$ ${r.valorDocumento.toFixed(2)}` },
          { header: "Vencimento", render: r => new Date(r.vencimento).toLocaleDateString() },
          {
            header: "Ações",
            render: row => (
              <RowActions
                row={row}
                onEdit={handleEdit}
                onPrint={handlePrint}
              />
            )
          }
        ]}
      />
    </BaseList>
  )
}

export const Route = createFileRoute("/admin/boletolist")({
  component: FormBoletosList,
})
