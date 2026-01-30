import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


//formulario de clientes incluir e editar
function FormClientes() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
      
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro de clientes</h1> 
      <form  className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium mb-2">
            Nome
          </label>
          <Input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email"
            required
          />
        </div>

        <Button type="submit">"Cadastrar Cliente"</Button>
      </form>
    </div>
  );
}

//renderiza a rota
export const Route = createFileRoute("/admin/clientes")({
  component: FormClientes,
});
