<h1 align="center" sytle= "font-weight: D8BFD8;" >📋 TaskMe - Gerenciador de Tarefas</h1>

<p align="center">
<b>TaskMe é uma aplicação full-stack desenvolvida como projeto prático acadêmico, implementando um sistema completo de gerenciamento de tarefas com arquitetura moderna e escalável. O projeto demonstra a integração efetiva entre frontend e backend, aplicando as melhores práticas de desenvolvimento web.</b>
</p>

<h2 id="technologies">💻 Tecnologias/Technologies</h2>

<h3>Frontend</h3>

- React 18 - Biblioteca UI
- TypeScript - Tipagem estática
- Redux Toolkit - Gerenciamento de estado
- React Router - Roteamento
- Axios - Requisições HTTP
- SCSS - Estilização avançada

<h3>Backend</h3>

- Node.js - Runtime JavaScript
- MongoDB - Banco de dados NoSQL
- Mongoose - ODM para MongoDB
- JWT - Autenticação
- Bcrypt - Hash de senhas
- Express Validator - Validação de dados

<h2 id="started">🚀 Começando/Getting started</h2>

Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB (v6 ou superior)
- npm ou yarn

<h3>1. Clonar o Repositório</h3>

```bash
git clone https://github.com/devGabrielly/gerenciadorDeTarefas.git
```

<h3>2. Configurar o Backend</h3>

```bash
cd server
npm install
```

<h3> Crie um arquivo .env na pasta server:</h3>

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskme
JWT_SECRET=seu_secret_super_seguro_aqui
```

<h3>Inicie o servidor:</h3>

```bash
npm run dev
```

<h3>3. Configurar o Frontend</h3>

```bash
cd ../client
npm install
```

<h3>Instale as dependências específicas (se necessário):</h3>

```bash
npm install recharts @headlessui/react
```

<h3>Inicie o aplicativo:</h3>

```bash
npm start
```

4. Acessar a Aplicação
   Abra seu navegador em: http://localhost:3000

<h2 id="colab">🤝 Colaboradores/Collaborators</h2>

Este projeto foi desenvolvido em dupla como parte do projeto prático da disciplina

- Desenvolvedor 1: Gabrielly - Frontend & Design
- Desenvolvedor 2: Annanda - Backend & Database
