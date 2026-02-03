import { Button } from "@/components/ui/button";
import { createInfluenciador, getInfluenciadorById, updateInfluenciador } from "@/services/influenciadoresService";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";

//formulario de influenciadores incluir e editar
function FormInfluenciadores() {
  const search = useSearch({ from: "/admin/influenciadores" }) as { id?: number };
  const influenciadorId = search?.id;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (influenciadorId) {
      loadInfluenciador(influenciadorId);
    }
  }, [influenciadorId]);

  const loadInfluenciador = async (id: number) => {
    try {
      setLoading(true);
      const data = await getInfluenciadorById(id);
      setNome(data.nome);
      setEmail(data.email);
      setTelefone(data.telefone);
      setCelular(data.celular);
    } catch (error) {
      console.error("Erro ao carregar influenciador:", error);
      alert("Erro ao carregar influenciador");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const influenciadorData = {
        nome,
        email,
        telefone,
        celular
      };
      
      if (influenciadorId) {
        await updateInfluenciador(influenciadorId, influenciadorData);
        alert("Influenciador atualizado com sucesso!");
      } else {
        await createInfluenciador(influenciadorData);
        // Limpar o formulário após sucesso
        setNome("");
        setEmail("");
        setTelefone("");
        setCelular("");
        alert("Influenciador cadastrado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar influenciador:", error);
      alert("Erro ao salvar influenciador");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {influenciadorId ? "Editar Influenciador" : "Cadastro de Influenciadores"}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">  
        <div>

          <label htmlFor="nome" className="block text-sm font-medium mb-2">
            Nome  
          </label>
          <input
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
            <input
              id="email"
              type="text" 
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
          <input
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
          <input
            id="celular"
            type="text" 
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            placeholder="Digite o celular"
            required
          />  
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : influenciadorId ? "Atualizar" : "Cadastrar"}
        </Button>
      </form>
    </div>
  );
}

//renderiza a rota
export const Route = createFileRoute("/admin/influenciadores")({
  component: FormInfluenciadores,
});
