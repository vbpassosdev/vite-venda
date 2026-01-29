import { createFileRoute } from "@tanstack/react-router";


//formulario de clientes incluir e editar
function FormClientes() {
  return (
    <div className="bg-red-500 text-white p-4">
  TESTE TAILWIND
</div>
  );
}


//renderiza a rota
export const Route = createFileRoute("/admin/clientes")({
  component: FormClientes,
});
