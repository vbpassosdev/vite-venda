import { forwardRef } from "react"

type Item = {
  produto: string
  quantidade: number
  valorUnitario: number
}

export type PedidoPrintData = {
  numero: number
  data: string
  clienteNome: string
  clienteDocumento: string
  clienteEndereco: string
  itens: Item[]
  subtotal: number
  desconto: number
  total: number
  observacao?: string
}

export const PedidoPrint = forwardRef<
  HTMLDivElement,
  { pedido: PedidoPrintData }
>(({ pedido }, ref) => {
  return (
    <div ref={ref} className="print-container">
      <header className="header">
        <div>
          <h1>SUA EMPRESA LTDA</h1>
          <p>CNPJ: 00.000.000/0001-00</p>
          <p>Rua Exemplo, 123 - São Paulo - SP</p>
          <p>Telefone: (11) 0000-0000</p>
        </div>

        <div className="pedido-info">
          <h2>PEDIDO</h2>
          <p><strong>Nº:</strong> {pedido.numero}</p>
          <p><strong>Data:</strong> {pedido.data}</p>
        </div>
      </header>

      <section className="cliente">
        <h3>Dados do Cliente</h3>
        <p><strong>Nome:</strong> {pedido.clienteNome}</p>
        <p><strong>Documento:</strong> {pedido.clienteDocumento}</p>
        <p><strong>Endereço:</strong> {pedido.clienteEndereco}</p>
      </section>

      <section className="itens">
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>V. Unit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {pedido.itens.map((item, index) => (
              <tr key={index}>
                <td>{item.produto}</td>
                <td>{item.quantidade}</td>
                <td>R$ {item.valorUnitario.toFixed(2)}</td>
                <td>
                  R$ {(item.quantidade * item.valorUnitario).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="totais">
        <div>
          <h3>Total: R$ {pedido.total.toFixed(2)}</h3>
        </div>
      </section>

      {pedido.observacao && (
        <section className="observacao">
          <h4>Observações</h4>
          <p>{pedido.observacao}</p>
        </section>
      )}

      <footer className="assinatura">
        <div>
          <p>_____________________________________</p>
          <p>Assinatura do Cliente</p>
        </div>
      </footer>
    </div>
  )
})

PedidoPrint.displayName = "PedidoPrint"
