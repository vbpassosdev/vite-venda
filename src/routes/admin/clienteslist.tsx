import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/clienteslist')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Clientes</h1>
        <Button onClick={() => alert("Novo cliente")}>+ Novo</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          <TableRow>
            <TableCell>Cliente Exemplo</TableCell>
            <TableCell>exemplo@cliente.com</TableCell>
            <TableCell>(11) 99999-9999</TableCell>
            <TableCell className="text-right">
            <Button onClick={() => alert("Editar cliente")}>Editar</Button>
            <Button onClick={() => alert("Excluir cliente")}>Excluir</Button>
            </TableCell>
            </TableRow>
        </TableBody>  
      </Table>
    </div>
  )
}
        

