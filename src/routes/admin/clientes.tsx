import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { createInfluenciador } from "@/services/influenciadoresService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


//formulario de clientes incluir e editar
function FormClientes() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Limpa erros anteriores
    setSuccess(""); // Limpa mensagens de sucesso anteriores
    
    try {
      const novoCliente = {
        nome,
        email,
      };
      
      await createInfluenciador(novoCliente);
      
      // Limpar o formulário após sucesso
      setNome("");
      setEmail("");
      setSuccess("Cliente cadastrado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao cadastrar cliente:", error);
      
      // Extrair mensagem de erro do backend
      if (error.response) {
        // Erro de resposta do servidor (4xx, 5xx)
        const status = error.response.status;
        const mensagem = error.response.data?.message || error.response.data?.erro || "Erro ao cadastrar cliente";
        
        if (status === 400) {
          setError(`Dados inválidos: ${mensagem}`);
        } else if (status === 409) {
          setError(`Cliente já existe: ${mensagem}`);
        } else if (status === 500) {
          setError(`Erro no servidor: ${mensagem}`);
        } else {
          setError(mensagem);
        }
      } else if (error.request) {
        // Requisição foi feita mas sem resposta
        setError("Sem resposta do servidor. Verifique sua conexão.");
      } else {
        // Erro ao configurar a requisição
        setError("Erro ao processar requisição: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro de clientes</h1>
      
      {/* Mensagem de erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Mensagem de sucesso */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
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
