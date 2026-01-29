import { createFileRoute } from "@tanstack/react-router";

function FormInfluenciadores() {
  return (
    <h1>Cadastro de Influenciadores</h1>
  );
}

export const Route = createFileRoute("/admin/influenciadores")({
  component: FormInfluenciadores,
});
