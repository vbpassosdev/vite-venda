# Vendas Boleto & NF-e

Projeto front-end para operacoes de vendas com foco em:

- emissao de boletos
- pedidos comerciais
- cobranca e vencimentos
- faturamento e NF-e

## Como rodar

```bash
npm install
npm run dev
```

## Build de producao

```bash
npm run build
npm run preview
```

## Scripts disponiveis

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run lint
npm run format
npm run check
```

## Estrutura principal

- `src/routes/index.tsx`: pagina inicial
- `src/routes/admin/main.tsx`: dashboard fiscal e financeiro
- `src/routes/admin`: telas de clientes, produtos, pedidos, titulos e vendedores
- `src/components/form`: componentes de formularios, listas e impressao

## Objetivo do projeto

Este projeto foi ajustado para servir como ambiente visual de vendas, sem dependencia de back-end, servicos externos ou autenticacao real.


