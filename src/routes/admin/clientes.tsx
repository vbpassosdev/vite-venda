import { createFileRoute } from "@tanstack/react-router";

function FormClientes() {
  return (
    <h1>Cadastro de Clientes</h1>
  );
}

export const Route = createFileRoute("/admin/clientes")({
  component: FormClientes,
});
