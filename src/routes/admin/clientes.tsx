import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCliente } from "@/services/clientesService";

//formulario de clientes incluir e editar
function FormClientes() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [tipoCliente, setTipoCliente] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    // Implementar lógica de submissão do formulário aqui
    e.preventDefault();
    setLoading(true);

    try {
      const clienteData = {
        nome, 
        email,
        telefone,
        celular,
        tipoCliente: Number(tipoCliente)
      };
      await createCliente(clienteData);
      // Limpar o formulário após sucesso
      setNome("");
      setEmail("");
      setTelefone("");
      setCelular("");
      setTipoCliente("");
      alert("Cliente cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente");
    } finally {
      setLoading(false);
    }    
  }
      
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro de clientes</h1> 
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium mb-2">
            Telefone
          </label>
          <Input
            id="telefone"
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite o telefone"
            required
          />
        </div>

        <div>
          <label htmlFor="celular" className="block text-sm font-medium mb-2">
            Celular
          </label>
          <Input
            id="celular"
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            placeholder="Digite o celular"
            required
          />
        </div>

        <div>
          <label htmlFor="tipoCliente" className="block text-sm font-medium mb-2">
            Tipo Cliente
          </label>
          <Input
            id="tipoCliente"
            type="text"
            value={tipoCliente}
            onChange={(e) => setTipoCliente(e.target.value)}
            placeholder="Digite o tipo de cliente"
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Cliente"}
        </Button>
      </form>
    </div>
  );
}

//renderiza a rota
export const Route = createFileRoute("/admin/clientes")({
  component: FormClientes,
});
