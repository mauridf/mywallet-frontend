# MyWallet Frontend

Plataforma frontend do sistema **MyWallet** --- gestão financeira
pessoal profissional, moderna e escalável.

## Stack

-   React + TypeScript
-   Vite
-   TailwindCSS
-   React Query
-   Axios
-   Recharts
-   Arquitetura modular (modules)
-   Clean Architecture (frontend)
-   API REST (.NET Backend)

## Funcionalidades

-   Dashboard financeiro profissional
-   Fluxo mensal (Income / Expense / Investment)
-   Histórico financeiro
-   Curva de capital
-   Projeções financeiras
-   Indicadores financeiros reais:
    -   Runway
    -   Burn rate
    -   Saving rate
    -   Health index
    -   Financial score
-   Exportação CSV
-   Fechamento mensal
-   Visual SaaS real
-   UX corporativo
-   Arquitetura escalável

## Estrutura de pastas

    src/
     ├ modules/
     │   ├ dashboard/
     │   ├ transactions/
     │   ├ auth/
     │   └ users/
     ├ components/
     │   └ ui/
     ├ services/
     ├ routes/
     ├ hooks/
     ├ styles/

## Configuração

### Instalação

``` bash
npm install
```

### Ambiente

``` bash
cp .env.example .env
```

Configurar:

    VITE_API_URL=https://localhost:7006

### Execução

``` bash
npm run dev
```

## Integração com Backend

Necessário backend MyWallet API em execução.

Auth via JWT:

    Authorization: Bearer <token>

## Filosofia do projeto

Produto sério. Plataforma real. Arquitetura limpa. Escalável. Pronta
para SaaS. Pronta para produto financeiro real. Pronta para
investidores. Pronta para monetização. Pronta para mercado.

## Roadmap

-   Engine de recomendação
-   Perfil financeiro automático
-   Classificação de investidor
-   Metas financeiras
-   Planejamento patrimonial
-   Simulador de cenários
-   Multi-conta
-   Multi-usuário/família
-   API pública
-   Modo investidor
-   Dashboard executivo
-   BI financeiro

------------------------------------------------------------------------

MyWallet © Plataforma Financeira Profissional
