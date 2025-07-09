# Projeto de Tarefas com Next.js

Este é um projeto de um aplicativo de gerenciamento de tarefas (To-Do List) desenvolvido com Next.js, TypeScript e Firebase.

## Funcionalidades

- Criar, editar e excluir tarefas.
- Marcar tarefas como concluídas.
- Visualização de tarefas em um painel central.
- Autenticação de usuários para gerenciamento de tarefas pessoais.

## Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Banco de Dados:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Autenticação:** [NextAuth.js](https://next-auth.js.org/)

## Estrutura do Projeto

O projeto segue uma estrutura organizada para facilitar a manutenção e escalabilidade:

```
/
├── public/               # Arquivos estáticos (imagens, ícones)
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   ├── lib/              # Funções utilitárias (ex: manipulação de tarefas)
│   ├── pages/            # Páginas e rotas da aplicação (App Router)
│   │   ├── api/          # Rotas de API (ex: NextAuth)
│   │   ├── dashboard/    # Painel principal do usuário
│   │   └── task/         # Página para visualização de uma tarefa específica
│   ├── services/         # Configuração e conexão com serviços externos (Firebase)
│   └── types/            # Definições de tipos TypeScript
├── styles/               # Estilos globais
├── .gitignore
├── next.config.ts        # Configurações do Next.js
├── package.json
└── tsconfig.json
```

## Como Começar

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](httpss://nodejs.org/en/) (versão 18 ou superior)
- [npm](httpss://www.npmjs.com/) ou [yarn](httpss://yarnpkg.com/)

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente. Crie um arquivo `.env.local` na raiz do projeto e adicione as credenciais do Firebase e as configurações do NextAuth.

   ```env
   # Credenciais do Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=

   # Chave secreta para NextAuth
   NEXTAUTH_SECRET=
   ```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.