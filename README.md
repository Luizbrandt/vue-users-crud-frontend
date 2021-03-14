# Desafio Operand
Como solicitado, foi desenvolvida uma aplicação (utilizando Vue.Js) que contempla o CRUD de usuários (Criação, Leitura/Consulta, Alteração e Exclusão).

### Visão Geral do Projeto
Para o desenvolvimento deste projeto, uma API simples (sem autenticação) foi desenvolvida, contendo os seguintes métodos:
- POST: criação de usuários (Cadastro).
- GET: consulta de usuários (Busca).
- PUT: alteração de dados cadastrais (Update).
- DELETE: exclusão de usuários.

### Organização de Pastas e Arquivos
- src/: Pasta raiz do projeto.
- src/assets: Pasta que contém o material gráfico utilizado, como logo e imagens (na pasta './img').
- src/components: Pasta que contém os componentes do Vue.Js criados para o projeto.
- src/plugins/vuetify.js: Arquivo de configuração do Vuetify, biblioteca de interface de usuário (UI) do vue, com estilos, templates e componentes personalizados.
- src/router/index.js: Arquivo JavaScript de configuração do router, aplicativo de paginação utilizado no projeto.
- src/services: Pasta que contém as funções JavaScript de validação de dados e consumo da API.
- src/views: Páginas secundárias do projeto, criadas com arquivos do Vue.js.
- src/App.vue: Instância principal do Vue -> página que fornece acesso à todas as views.
- src/main.js: Arquivo JavaScript principal, que controla a instância do Vue, adicionando pacotes e definindo configurações de projeto.

### Instalação dos Pacotes:
Para a instalação dos pacotes, é necessário clonar este repositório em sua máquina. Na pasta raiz do projeto, rode os sequintes comandos:
- Para instalação dos módulos do Node.Js:
```
npm i
```
- Para a inicialização da aplicação:
```
npm run serve
```
