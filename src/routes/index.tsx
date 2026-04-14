import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  FileSpreadsheet,
  FileText,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

const highlights = [
  {
    title: "Emissao de boletos",
    description: "Explore fluxos de cobranca, titulos e acompanhamento financeiro em uma interface clara.",
    icon: Landmark,
  },
  {
    title: "Emissao de NF-e",
    description: "Organize produtos, clientes e pedidos para entender o processo de faturamento fiscal.",
    icon: FileText,
  },
  {
    title: "Rotina comercial",
    description: "Conecte pedidos, titulos e documentos em um painel pensado para operacao comercial.",
    icon: FileSpreadsheet,
  },
];

type PanelMode = "login" | "forgot" | "reset";

type SearchParams = {
  mode?: PanelMode;
};

export const Route = createFileRoute("/")({
  validateSearch: (search): SearchParams => ({
    mode:
      search.mode === "forgot" || search.mode === "reset" || search.mode === "login"
        ? search.mode
        : undefined,
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const mode = search.mode ?? "login";

  function handleModeChange(nextMode: PanelMode) {
    void navigate({ to: "/", search: { mode: nextMode } });
  }

  return (
    <div className="app-page">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="app-shell-panel mb-10 flex flex-col gap-4 rounded-[28px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="app-eyebrow">
              Vendas fiscal e financeiro
            </p>
            <h1 className="text-lg font-semibold text-slate-900">
              Projeto para emissao de boletos, pedidos comerciais e operacao de NF-e.
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/main"
              className="app-btn app-btn-success rounded-full px-4 py-2"
            >
              Acessar sistema
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <section className="grid flex-1 gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-8">
            <div className="grid gap-5 md:grid-cols-3">
              {highlights.map(({ title, description, icon: Icon }) => (
                <article
                  key={title}
                  className="app-card p-6"
                >
                  <div className="app-avatar-accent mb-4 inline-flex rounded-2xl p-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>

          <AccessPanel mode={mode} onModeChange={handleModeChange} />
        </section>
      </div>
    </div>
  );
}

function AccessPanel({
  mode,
  onModeChange,
}: {
  mode: PanelMode;
  onModeChange: (mode: PanelMode) => void;
}) {
  const title = useMemo(() => {
    if (mode === "forgot") return "Recuperar acesso";
    if (mode === "reset") return "Redefinir senha";
    return "Entrar";
  }, [mode]);

  return (
    <aside className="app-card-lg p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="app-icon-dark rounded-2xl p-3">
          {mode === "reset" ? <BookOpen className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}
        </div>
        <div>
          <p className="app-section-label">
            Acesso de vendas
          </p>
          <h3 className="text-2xl font-semibold text-slate-950">{title}</h3>
        </div>
      </div>

      {mode === "login" ? <LoginForm onForgotPassword={() => onModeChange("forgot")} /> : null}
      {mode === "forgot" ? <ForgotPasswordForm onBack={() => onModeChange("login")} onReset={() => onModeChange("reset")} /> : null}
      {mode === "reset" ? <ResetPasswordForm onBackToLogin={() => onModeChange("login")} /> : null}
    </aside>
  );
}

function LoginForm({ onForgotPassword }: { onForgotPassword: () => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("vendas@empresa.com");
  const [password, setPassword] = useState("123456");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      void navigate({ to: "/admin/main" });
    }, 350);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">E-mail</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="app-input"
          placeholder="vendas@empresa.com"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Senha</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="app-input"
          placeholder="Digite sua senha"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="app-btn app-btn-primary w-full px-4 py-3 text-sm font-semibold"
      >
        {isSubmitting ? "Entrando..." : "Acessar"}
        <ArrowRight className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onForgotPassword}
        className="app-btn app-btn-outline w-full px-4 py-3 text-sm font-medium"
      >
        Esqueci minha senha
      </button>

      <ExperienceNotes />
    </form>
  );
}

function ForgotPasswordForm({
  onBack,
  onReset,
}: {
  onBack: () => void;
  onReset: () => void;
}) {
  const [email, setEmail] = useState("vendas@empresa.com");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(`Enviamos instrucoes visuais de redefinicao para ${email}.`);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <p className="text-sm leading-6 text-slate-600">
        Informe o e-mail de vendas para continuar a recuperacao de acesso.
      </p>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">E-mail</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="app-input"
          placeholder="vendas@empresa.com"
        />
      </label>

      {message ? (
        <div className="app-alert app-alert-success">
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        className="app-btn app-btn-primary w-full px-4 py-3 text-sm font-semibold"
      >
        Enviar instrucoes
        <ArrowRight className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onReset}
        className="app-btn app-btn-outline w-full px-4 py-3 text-sm font-medium"
      >
        Abrir tela de redefinicao
      </button>

      <button
        type="button"
        onClick={onBack}
        className="app-btn app-btn-outline w-full px-4 py-3 text-sm font-medium"
      >
        Voltar para o login
      </button>
    </form>
  );
}

function ResetPasswordForm({ onBackToLogin }: { onBackToLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("As senhas precisam ser iguais para concluir a alteracao.");
      return;
    }

    setMessage("Senha atualizada com sucesso no ambiente de vendas.");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="app-alert">
        Preencha os campos abaixo para redefinir a senha em vendas.
      </div>

      {message ? (
        <div className="app-alert app-alert-success">
          {message}
        </div>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Nova senha</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="app-input"
          placeholder="Digite a nova senha"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Confirmar nova senha</span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="app-input"
          placeholder="Repita a nova senha"
        />
      </label>

      <button
        type="submit"
        className="app-btn app-btn-primary w-full px-4 py-3 text-sm font-semibold"
      >
        Salvar nova senha
        <ArrowRight className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onBackToLogin}
        className="app-btn app-btn-outline w-full px-4 py-3 text-sm font-medium"
      >
        Voltar para o login
      </button>
    </form>
  );
}

function ExperienceNotes() {
  return (
    <div className="app-panel-muted mt-6">
      <p className="text-sm font-medium text-slate-800">Rotinas implementadas</p>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3">
          <Sparkles className="mt-0.5 h-4 w-4 text-emerald-600" />
          <span>Entender a rotina de emissao de boletos, cobranca e acompanhamento de titulos.</span>
        </li>
        <li className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3">
          <BookOpen className="mt-0.5 h-4 w-4 text-sky-600" />
          <span>Explorar o fluxo de pedidos, produtos e documentos fiscais no contexto de NF-e.</span>
        </li>
        <li className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-amber-600" />
          <span>Praticar navegacao e organizacao de um painel financeiro e fiscal com clareza visual.</span>
        </li>
      </ul>
    </div>
  );
}


