# 🪙 Plan.ia — Educador Financeiro Inteligente

<p align="center">
  <img src="src/assets/image/piggy-bank.png" alt="Plan.ia Logo" width="120" />
</p>

<p align="center">
  <strong>Uma SPA moderna de planejamento financeiro pessoal impulsionada por Inteligência Artificial Generativa.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-blue?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Google_Gemini-IA_Generativa-orange?logo=google-gemini&logoColor=white" alt="Gemini API" />
</p>

---

## 📌 Apresentação do Projeto

O **Plan.ia** é uma aplicação web interativa (SPA) projetada para transformar a maneira como você gerencia seu dinheiro. Ao combinar uma interface de usuário fluida e passo a passo com a inteligência do **Google Gemini (IA)**, o Plan.ia gera diagnósticos financeiros sob medida, planos de ação práticos, ideias de renda extra e análises de viabilidade de metas.

Toda a persistência é realizada diretamente no navegador via **localStorage**, o que elimina a necessidade de um banco de dados externo ou fluxo de cadastro complexo, garantindo total privacidade e velocidade.

---

## ✨ Principais Funcionalidades

- 📋 **Formulário Passo a Passo (Wizard):** Um fluxo interativo e gamificado para coletar dados essenciais (saldo atual, reserva financeira ideal, renda bruta, gastos fixos, dívidas e meta financeira).
- 🧠 **Diagnóstico Financeiro com IA:** Integração direta com a API do Google Gemini para criar um relatório detalhado e estruturado em JSON sobre a saúde financeira do usuário.
- 🎯 **Análise de Viabilidade de Metas:** A IA avalia se a meta estipulada pelo usuário é viável no prazo desejado e oferece ajustes estratégicos se necessário.
- 💡 **Sugestões Personalizadas:** Dicas de economia prática, ideias criativas de renda extra e recomendações básicas de investimento adaptadas ao perfil do usuário.
- ⏳ **Histórico de Simulações:** Acesso rápido a todas as simulações passadas através do painel de histórico, permitindo comparar e excluir registros.
- 🌓 **Tema Claro & Escuro (Dark Mode):** Layout moderno com controle de aparência dinâmico para maior conforto visual.
- 📱 **Interface Premium e Responsiva:** Desenvolvida com Tailwind CSS v4, animações suaves, fontes modernas e ícones minimalistas (Lucide React).

---

## 🛠️ Tecnologias Utilizadas

### Core & Framework
- **React 19 (SPA)** — Renderização rápida e componentes baseados em funções.
- **TypeScript** — Tipagem estática para maior segurança e produtividade.
- **Vite** — Build tool ultra-rápido para desenvolvimento moderno.
- **React Router DOM v7** — Gerenciamento de rotas e navegação fluidas.

### Estilização & UI
- **Tailwind CSS v4** — Framework utilitário de CSS otimizado para alta performance.
- **Lucide React** — Pacote de ícones bonitos e consistentes.
- **React Loading Skeleton** — Skeletons animados enquanto a IA processa o diagnóstico.
- **@fontsource/inter** — Fonte premium hospedada localmente para excelente legibilidade.

### Integração & Utilitários
- **Google Gemini API** (`gemini-flash-latest`) — IA Generativa utilizada para a inteligência financeira.
- **localStorage API** — Banco de dados local para guardar o histórico das simulações de forma privada.
- **UUID** — Geração de identificadores únicos para as simulações e registros.

---

## 📂 Estrutura do Projeto

A arquitetura do projeto segue padrões modernos de organização de arquivos em React:

```text
src/
├── assets/         # Recursos estáticos (imagens, ícones e logotipos)
├── components/     # Componentes de interface organizados por finalidade
│   ├── features/   # Componentes acoplados a regras de negócio (Form, Insights, Results)
│   ├── layout/     # Componentes estruturais (Layout de rotas)
│   └── shared/     # Componentes de UI reutilizáveis (Button, Input, Header)
├── context/        # Provedores de estado global (Gerenciamento de Tema)
├── data/           # Configurações estáticas, prompts da IA e estruturas de dados
├── hooks/          # Hooks customizados (useInsight, useTheme, useSimulationStorage)
├── pages/          # Páginas principais mapeadas pelas rotas
├── services/       # Serviços de integração (Chamadas para a API do Gemini)
├── styles/         # Estilos globais e variáveis de tema
├── types/          # Arquivos de definição de tipos TypeScript
├── utils/          # Funções auxiliares (formatação de moeda, cálculos)
├── App.tsx         # Componente raiz da aplicação
├── main.tsx        # Ponto de entrada do React
└── routes.tsx      # Configuração de roteamento da SPA
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Recomendado v18 ou superior)
* Um gerenciador de pacotes de sua preferência (`npm`, `yarn` ou `pnpm`)

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/Educador-Financeiro-Inteligente-React.git
cd Educador-Financeiro-Inteligente-React
```

### 2. Instalar as dependências
```bash
# Se utilizar npm:
npm install

# Se utilizar pnpm:
pnpm install
```

### 3. Configurar as Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave de API do Gemini:
```env
VITE_GEMINI_API_KEY=sua_chave_de_api_aqui
```
> **Nota:** Para obter uma chave de API gratuita, acesse o [Google AI Studio](https://aistudio.google.com/).

### 4. Executar em modo de desenvolvimento
```bash
npm run dev
# ou
pnpm dev
```
A aplicação estará disponível no endereço indicado no terminal (geralmente `http://localhost:5173`).

### 5. Compilar para Produção (Build)
```bash
npm run build
# ou
pnpm build
```
Os arquivos otimizados para produção serão gerados na pasta `/dist`.

---

## 🔒 Segurança e Privacidade dos Dados

O **Plan.ia** foi desenhado visando a privacidade do usuário:
* Seus dados financeiros **não são enviados para servidores externos**, exceto para a API oficial do Google Gemini para a geração dos insights.
* Nenhuma informação é guardada em banco de dados na nuvem; tudo fica armazenado no `localStorage` do seu próprio navegador.

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

---

<p align="center">
  Desenvolvido com 💜 por Aguinaldo.
</p>