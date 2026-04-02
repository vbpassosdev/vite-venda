import { createFileRoute } from "@tanstack/react-router";
import { BadgeDollarSign, FileText, Landmark, Receipt } from "lucide-react";

const metrics = [
  {
    title: "Boletos emitidos",
    value: "24",
    change: "+6 processados hoje",
    icon: Landmark,
    tone: "emerald",
  },
  {
    title: "NF-es geradas",
    value: "12",
    change: "4 aguardando revisao",
    icon: FileText,
    tone: "sky",
  },
  {
    title: "Titulos pendentes",
    value: "8",
    change: "3 com vencimento proximo",
    icon: BadgeDollarSign,
    tone: "amber",
  },
  {
    title: "Pedidos faturados",
    value: "31",
    change: "92% concluido no fluxo",
    icon: Receipt,
    tone: "emerald",
  },
];

const activities = [
  { title: "Boleto gerado para o pedido #1048", time: "Ha 12 min", tone: "emerald" },
  { title: "NF-e preparada para conferencia", time: "Ha 34 min", tone: "sky" },
  { title: "Titulo financeiro conciliado em vendas", time: "Ha 1 h", tone: "amber" },
  { title: "Produto SKU-204 atualizado para operacao fiscal", time: "Ha 2 h", tone: "sky" },
];

export const Route = createFileRoute("/admin/main")({
  component: RouteComponent,
});

function toneClasses(tone: string) {
  if (tone === "emerald") return "bg-emerald-100 text-emerald-700";
  if (tone === "amber") return "bg-amber-100 text-amber-700";
  return "bg-sky-100 text-sky-700";
}

function RouteComponent() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ title, value, change, icon: Icon, tone }) => (
          <article
            key={title}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_rgba(148,163,184,0.14)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{title}</span>
              <div className={`rounded-2xl p-3 ${toneClasses(tone)}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-5 text-3xl font-semibold text-slate-950">{value}</p>
            <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClasses(tone)}`}>
              {change}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Evolucao das vendas
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Resumo semanal</h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Atualizado agora
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[58, 72, 64, 88].map((height, index) => (
              <div key={height} className="flex flex-col items-center gap-3">
                <div className="flex h-48 w-full items-end rounded-[24px] bg-slate-50 p-3">
                  <div
                    className="w-full rounded-[18px] bg-[linear-gradient(180deg,#38bdf8_0%,#2563eb_100%)]"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-500">{[`Seg`, `Ter`, `Qua`, `Qui`][index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Atividade recente</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Praticas do dia</h2>

          <div className="mt-6 space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="flex items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex h-2.5 w-2.5 rounded-full ${
                        activity.tone === "emerald"
                          ? "bg-emerald-500"
                          : activity.tone === "amber"
                            ? "bg-amber-500"
                            : "bg-sky-500"
                      }`}
                    />
                    <p className="font-medium text-slate-900">{activity.title}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Atualizacao registrada no ambiente de vendas.</p>
                </div>
                <span className="whitespace-nowrap text-sm text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


