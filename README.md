
# Configuração e Layout Base do Projeto

## Apresentação do Projeto

O **Plan.ia – Educador Financeiro Inteligente** é uma **SPA (Single Page Application)** desenvolvida com **React + TypeScript**, criada para auxiliar usuários no planejamento financeiro pessoal por meio da **Inteligência Artificial Generativa**.

A aplicação permite que o usuário informe sua renda, despesas e uma meta financeira (como uma viagem, compra de um bem ou criação de uma reserva de emergência). Com essas informações, a IA gera um diagnóstico personalizado contendo sugestões práticas de economia, ideias de renda extra e um plano de ação para alcançar os objetivos financeiros.

Todo o processamento acontece diretamente no navegador, sem necessidade de backend ou banco de dados remoto. Os dados são armazenados localmente utilizando **localStorage**, enquanto as análises são geradas em tempo real através da **API Google Gemini**.

### Principais características

- SPA (Single Page Application)
- React 19 + TypeScript
- Integração com Google Gemini (IA Generativa)
- Formulário de planejamento financeiro
- Sistema de tema Claro/Escuro
- Persistência de dados com localStorage
- Interface moderna e responsiva
- Sem backend
- Sem banco de dados remoto

---

##  Criação do Projeto e Configurações Iniciais

O projeto foi criado utilizando **Vite** com o template oficial do React + TypeScript, proporcionando um ambiente moderno, rápido e otimizado para desenvolvimento.

Durante a configuração inicial foram realizadas as seguintes etapas:

- Criação do projeto com React + TypeScript
- Limpeza da estrutura padrão do Vite
- Configuração do Git
- Configuração do ESLint
- Configuração do Prettier
- Configuração do VS Code
- Formatação automática ao salvar arquivos
- Organização automática de imports
- Remoção automática de imports não utilizados
- Ordenação automática de classes do Tailwind CSS
- Configuração do alias `@/` apontando para a pasta `src`

---

##  Configuração do Tailwind CSS

Para estilização da aplicação foi utilizado o **Tailwind CSS v4**, integrado ao Vite através do plugin oficial.

Também foi adicionada a fonte **Inter**, hospedada localmente utilizando o pacote `@fontsource/inter`, garantindo melhor desempenho e consistência visual.

### Recursos configurados

- Tailwind CSS v4
- Plugin oficial do Tailwind para Vite
- Fonte Inter
- Estilos globais centralizados em `index.css`

### Benefícios

- Interface moderna
- CSS otimizado
- Desenvolvimento mais rápido
- Layout responsivo
- Melhor organização dos estilos

---

# Estrutura de Pastas

```text
src/
│
├── assets/         # Recursos estáticos (imagens, ícones, etc.)
├── components/     # Componentes reutilizáveis
├── context/        # Context API e estados globais
├── data/           # Dados estáticos e constantes
├── hooks/          # Hooks customizados
├── pages/          # Páginas da aplicação
├── services/       # Integração com APIs (Google Gemini)
├── styles/         # Estilos globais
├── utils/          # Funções utilitárias
│
├── App.tsx         # Componente principal
├── main.tsx        # Entrada da aplicação
├── routes.tsx      # Configuração das rotas
└── index.css       # Estilos globais
```

---

# Tecnologias Utilizadas

## Front-end

- React 19
- TypeScript
- Vite
- React Router DOM

## Estilização

- Tailwind CSS v4
- @tailwindcss/vite
- @fontsource/inter

## Interface

- Lucide React
- React Loading Skeleton

## Inteligência Artificial

- Google Gemini API

## Qualidade de Código

- ESLint
- Prettier
- eslint-plugin-simple-import-sort
- eslint-plugin-unused-imports
- prettier-plugin-tailwindcss

## Persistência

- localStorage