# Simple-Forum
This is an internet forum written in TypeScript for studying purposes. It uses the following libraries:

Backend: Express, Multer...
Frontend: React, Tanstack Query, Vite, Styled Components, React Icons...

---

# Explanations
If you're stumbling upon this project, here's some context: this is one of my personal projects, primarily used to experiment and learn more about the JavaScript/TypeScript/Node ecosystem. That's why I incorporate many libraries, with the exception of an ORM — I don't use one in this project.

## Why not use an ORM?
It's probably clear by now that this is a practice project. When I started, practicing included writing raw SQL. I've considered creating a fork or eventually replacing raw SQL with something like Drizzle or Prisma to leverage features like migrations. However, for such a small project, I currently don't see the benefits of doing that.

---

# Explicações (Portuguese)
Se você encontrou este projeto, aqui está um pouco de contexto: este é um dos meus projetos pessoais, usado principalmente para experimentar e aprender mais sobre o ecossistema JavaScript/TypeScript/Node. Por isso, utilizo várias bibliotecas, com a exceção de um ORM — eu não uso nenhum neste projeto.

## Por que não usar um ORM?

Acho que está claro que este é um projeto para prática e treino. Quando comecei, meus estudos incluiam escrever SQL puro. Pensei em criar um fork ou talvez substituir o SQL por algo como Drizzle ou Prisma no futuro, para aproveitar recursos como migrações. No entanto, para um projeto tão pequeno, atualmente não vejo benefícios em fazer essa mudança.

---

# Running the Project Locally
To run the project on your local machine, first navigate to the project directory and install all dependencies (both in the server and client directories):
```bash
npm install  # or
pnpm install # or
yarn install
## Client
```
Before running any scripts, run npm install in the client directory. To start a development server locally, use:
```bash
npm run dev
```
## Database
In the `server/config/db` folder, there is an SQL file. Execute the script to set up the database, and ensure you have the latest version of PostgreSQL installed.
## Server
Before starting the server, create a `.env` file in the server root directory. It should contain a single property, `DATABASE_URI`. Use the .env.example file as a guide and copy its structure to `.env`.
Install the server dependencies with npm install. To start a development server locally, run:
```bash
npm run dev
```
That’s it! Ensure the database, client, and server are running, and the application should be fully functional. Have fun!

---

# Executando o Projeto Localmente
Para executar o projeto em sua máquina local, primeiro navegue até o diretório do projeto e instale todas as dependências (tanto no diretório server quanto no client):
```bash
npm install  # ou
pnpm install # ou
yarn install
```
## Cliente
Antes de executar qualquer script, execute npm install no diretório client. Para iniciar um servidor de desenvolvimento localmente, use:
```bash
npm run dev
```
## Banco de Dados
Na pasta `server/config/db`, há um arquivo SQL. Execute o script para configurar o banco de dados e certifique-se de ter a versão mais recente do PostgreSQL instalada.
Servidor
Antes de iniciar o servidor, crie um arquivo chamado `.env` no diretório raiz do server. Ele precisa conter uma única propriedade, `DATABASE_URI`. Use o arquivo `.env.example` como guia e copie sua estrutura para o `.env`.
Instale as dependências do servidor com `npm install`. Para iniciar o servidor de desenvolvimento localmente, execute:
```bash
npm run dev
```
Pronto! Certifique-se de que o banco de dados, o cliente e o servidor estão em execução, e a aplicação deve funcionar completamente. Divirta-se!