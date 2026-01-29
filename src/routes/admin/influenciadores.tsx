import { createFileRoute } from "@tanstack/react-router";

//formulario de influenciadores incluir e editar
function FormInfluenciadores() {
  return (
    <h1>Cadastro de Influenciadores</h1>
  );
}


//renderiza a rota
export const Route = createFileRoute("/admin/influenciadores")({
  component: FormInfluenciadores,
});
