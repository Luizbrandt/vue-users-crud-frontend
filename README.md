# Desafio Operand
Como solicitado, foi desenvolvida uma aplicação (utilizando Vue.Js) que contempla o CRUD de usuários (Criação, Leitura/Consulta, Alteração e Exclusão).

### Visão Geral do Projeto
Para o desenvolvimento deste projeto, uma API simples (sem autenticação) foi desenvolvida, contendo os seguintes métodos:
- POST: criação de usuários (Cadastro).
- GET: consulta de usuários (Busca).
- PUT: alteração de dados cadastrais (Update).
- DELETE: exclusão de usuários.

### Páginas e Layout

#### Página Principal

<p align="justify">
  Contém a tabela de dados, listando os usuários cadastrados, com as informações: Nome, E-mail e CPF. Segue o layout de barra superior (estilo retirada da página do <a href="https://www.operand.com.br/">Operand</a>), logo da empresa, card principal centralizado contendo respectivamente, a busca de usuários cadastrados via campo de texto, listagem em formato de tabela dos usuários cadastrados (linha representa um usuário, coluna representa um atriuto), ações de Edição e Exclusão dos usuários cadastrados, e por fim, criação de novos usuários (Cadastro).
</p>

<p align="center">
  <img src="main.PNG" width="850px" align="center"></img>
</p>

#### Página de Cadastro - Inserção de Usuários

<p align="justify">
  Contém logo superior, card centralizado, com os campos para inserção dos dados do novo usuário (Nome, CPF e Email). Botões de ação - submissão e limpeza do formulário, bem como o redirecionamento para a página principal.
</p>

<p align="center">
  <img src="create-user-view.png" width="850px" align="center"></img>
</p>

#### Página de Cadastro - Inserção de Usuários

<p align="justify">
  Consiste numa dialog, janela modal, aberta com ocorrência de um evento. Neste caso, pressionar o botão de ação, na listagem de usuários. Como os valores de Nome e CPF são estáticos, somente o campo de e-mail pode ser atualizado, contendo os botões de ação de editar (Submissão do Formulário) e cancelas (fecha a dialog e retorna ao contexto de listagem de usuários da página principal).
</p>

<p align="center">
  <img src="edit-user.PNG" width="850px" align="center"></img>
</p>

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
