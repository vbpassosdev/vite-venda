import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Bem-vindo</h1>

      <Link
        to="/admin/main"
        className="mt-4 inline-block text-blue-600 underline"
      >
        Entrar no sistema
      </Link>
    </div>
  ),
});
