<div align="center">
  <img align="center"  src="logo.png" alt="Soul Doação">
  <p>Projeto final do módulo de Nodejs voltado a uma aplicação de sistema de doação.</p>
</div>
<br>
<div>
  <h2>&rArr; Objetivo &lArr;</h2>
  <p>Construir uma REST API em MongoDB que permita fazer a adição de diversas ONGS e a funcionalidade de realizar doações para a mesma.</P>
  <h3>&rarr; Requisitos da aplicação &larr; </h3>
  <ul>
    <li>Deve realizar CRUD de ONGs</li>
    <li>Deve permitir a realização de doações (pagamento fictício)</li>
  </ul>
  <h3>&rarr; Realizações &larr; </h3>
  <ul>
    <li>CRUD de ONGs, Voluntários, Doadores e Doações.</li>
    <li>O Doador pode doar valores monetários ou itens</li>
    <li>Ao realizar uma doação, os itens doados são registrados na ONG e o ID da doação atrelado ao doador.</li>
    <li>Ao se deletar uma doação, o seu ID será excluído do doador e os itens doados removidos da ONG.</li>
  </ul>
</div>
<br>
<div>
  <h2>&rArr; Tecnologias & Ferramentas utilizadas &lArr;</h2>
  <br>
  <div>
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/agorasoudev/soul-doacao?style=plastic">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/agorasoudev/soul-doacao?style=plastic">
    <img alt="Lines of code" src="https://img.shields.io/tokei/lines/github.com/agorasoudev/soul-doacao?style=plastic">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/agorasoudev/soul-doacao?color=red&style=plastic">
    <img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/agorasoudev/soul-doacao?color=green&style=plastic">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/agorasoudev/soul-doacao?color=blue&style=plastic">
    <img alt="GitHub" src="https://img.shields.io/github/license/agorasoudev/soul-doacao?color=important&style=plastic">
  </div>
  <br>
  <div>
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img src="https://img.shields.io/badge/nodemon-4EA94B?style=for-the-badge&logo=nodemon&logoColor=gray">
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
    <img src="https://img.shields.io/badge/Sucrase-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white">
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white">
  </div>
</div>
<br>
<div>
  <h2>&rArr; Utilização da API &lArr;</h2>
  <br>
  <h3>&rarr; Clonagem do repositório &larr; </h3>

```shell
git clone https://github.com/agorasoudev/soul-doacao.git
```
  <h3>&rarr; Preparando o ambiente &larr; </h3>
<ol>
<li>Primeiro instalamos as dependências.

```shell
npm install
```
</li>
<li>Em seguida, renomeamos o arquivo <b>.env.local</b> para <b>.env</b></li>
<li>Dentro do arquivo .env, iremos preencher com a URL do servidor atlas - MongoDB</li>
</ol>
  

  <h3>&rarr; Inicializar o servidor &larr; </h3>

```shell
npm run dev
```

<h3>&rarr; Utilizando os End-Points &larr; </h3>
<details>
  <summary>Ongs</summary>
  <ul>
    <li>Create: POST: <code>localhost:3333/ong/create</code>
    <p>Todos os campos com exceção de site e telefone são obrigatórios para se registrar uma ONG.</p>
    <p>Segue exemplo de JSON.:</p>

```shell
{
  "name" : "Soul Doação",
  "endereco" : "Rua Angra dos Reis",
  "segmento" : "Conectividade",
  "cnpj" : "80.580.861/0001-25",
  "n_funcionarios" : 4,
  "contato" : {
      "email" :"soudoacao@gmail.com",
      "site" : "https://soudoacao.com.br",
      "telefone" : "11999999999"
      },
  "caixa" : 100
}
```
  </li>
  <li>Read All: GET: <code>localhost:3333/ongs</code> 
  <p>Ao executar, será retornado uma lista com todas as ONGS cadastradas.</p>
  </li>
  <li>Read One: GET: <code>localhost:3333/ong/:id</code>
  <p>Necessário informar o ID da ong na URI.</p>
  <p>O ID será gerado automaticamente na hora da criação da ONG</p>
  </li>
  <li>UPDATE: PATCH: <code>localhost:3333/ong/:id</code>
  <p>Necessário informar o ID da ong na URI.</p>
  <p>O ID será gerado automaticamente na hora da criação da ONG</p>
  <p>Passar o que deseja alterar no body. (os campos não são obrigatórios)</p>

  ```shell
{
  "name" : "Soul Doação",
  "endereco" : "Rua Angra dos Reis",
  "segmento" : "Conectividade",
  "cnpj" : "80.580.861/0001-25",
  "n_funcionarios" : 4,
  "contato" : {
      "email" :"soudoacao@gmail.com",
      "site" : "https://soudoacao.com.br",
      "telefone" : "11999999999"
      },
  "caixa" : 100
}
```
  </li>
  <li>DESTROY: DELETE: <code>localhost:3333/ong</code>
  <p>Informe o ID ou o E-mail da ONG que deseja deletar no body.</p>
  <p>OBS: Caso informe os 2, o ID será priorizado</p>

  ```shell
  {
    "id" : "5e9f8f8f8f8f8f8f8f8f8f8",
    "email" :"soudoacao@gmail.com"
  }
  ```
  </li>
  </ul>
</details>
<details>
  <summary>Doador</summary>
  <ul>
    <li>Create: POST: <code>localhost:3333/doador/create</code>
    <p>Cadastra um novo doador. Os únicos dados obrigatórios são o nome e o email.</p>
    <p>Segue exemplo de JSON.:</p>

```shell
{
  "name": "José Vinicius",
  "estado": "PE",
  "contato": {
    "email": "vini_dev@gmail.com",
    "telefone": "81999999999"
  }
}
```
  </li>
  <li>Read All: GET: <code>localhost:3333/doadores</code> 
  <p>Ao executar, será retornado uma lista com todos os doadores cadastradas.</p>
  </li>
  <li>Read One: GET: <code>localhost:3333/doador/:id</code>
  <p>Necessário informar o ID do doador na URI.</p>
  <p>O ID será gerado automaticamente na hora da criação do doador</p>
  </li>
  <li>UPDATE: PATCH: <code>localhost:3333/doador/:id</code>
  <p>Necessário informar o ID do doador na URI.</p>
  <p>O ID será gerado automaticamente na hora da criação do doador</p>
  <p>Passar o que deseja alterar no body. (os campos não são obrigatórios)</p>

  ```shell
{
  "name": "José Vinicius",
  "estado": "PE",
  "contato": {
    "email": "vini_dev@gmail.com",
    "telefone": "81999999999"
  }
}
```
  </li>
  <li>DESTROY: DELETE: <code>localhost:3333/doador/:id</code>
  <p>Informe o ID do doador que deseja deletar na URI.</p>
  </li>
  </ul>
</details>
<details>
  <summary>Voluntários</summary>
  <ul>
    <li>Create: POST: <code>localhost:3333/voluntario/create</code>
    <p>Cadastra um novo voluntario. Os únicos dados obrigatórios são o nome e o email.</p>
    <p>Segue exemplo de JSON.:</p>

```shell
{
  "name": "Alexandre",
  "email": "ale@gmail.com",
  "telefone": "11999999999"
}
```
  </li>
  <li>Read All: GET: <code>localhost:3333/voluntarios</code> 
  <p>Ao executar, será retornado uma lista com todos os voluntarios cadastradas.</p>
  </li>
  <li>Read One: GET: <code>localhost:3333/voluntario/:id</code>
  <p>Necessário informar o ID do voluntario na URI.</p>
  <p>O ID será gerado automaticamente na hora da criação do voluntario</p>
  </li>
  <li>UPDATE: PATCH: <code>localhost:3333/voluntario/:id</code>
  <p>Necessário informar o ID do voluntario na URI.</p>
  <p>O ID será gerado automaticamente na hora da criação do voluntario</p>
  <p>Passar o que deseja alterar no body. (os campos não são obrigatórios)</p>

  ```shell
{
  "name": "Alexandre",
  "email": "ale@gmail.com",
  "telefone": "11999999999"
}
```
  </li>
  <li>DESTROY: DELETE: <code>localhost:3333/voluntario/:id</code>
  <p>Informe o ID do voluntario que deseja deletar na URI.</p>
  </li>
  </ul>
</details>
</div>
<br>
<div>
<h2>&rArr; Acessando a documentação &lArr;</h2>
<p>Apos a inicialização do servidor, é possível acessar a documentação com todas as rotas através da url <code>localhost:3333/api-doc</code></p>
</div>
<br>
<div>
  <h2>&rArr; Equipe de desenvolvimento &lArr;</h2>
  <br>
  <ul>
    <!-- ALEXANDRE -->
    <li>
      <img src="https://img.shields.io/badge/dev-Alexandre%20Barbosa-blueviolet">
      <a href="https://github.com/alesalg">
        <img src="https://img.shields.io/badge/GitHub-100000?&logo=github&logoColor=white">
      </a>
      <a href="https://www.linkedin.com/in/alesalg/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?&logo=linkedin&logoColor=white">
      </a>
    </li>
    <!-- ICARO -->
    <li>
      <img src="https://img.shields.io/badge/dev-Icaro%20Ferreira-blueviolet">
      <a href="https://github.com/icarofilho">
        <img src="https://img.shields.io/badge/GitHub-100000?&logo=github&logoColor=white">
      </a>
      <a href="https://www.linkedin.com/in/icarofilho/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?&logo=linkedin&logoColor=white">
      </a>
    </li>
    <!-- JAQUELINE -->
    <li>
      <img src="https://img.shields.io/badge/dev-Jaqueline%20Rodrigues-blueviolet">
      <a href="https://github.com/agorasoudev">
        <img src="https://img.shields.io/badge/GitHub-100000?&logo=github&logoColor=white">
      </a>
      <a href="https://www.linkedin.com/in/jaquelinefcrodrigues/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?&logo=linkedin&logoColor=white">
      </a>
    </li>
    <!-- VINICIUS -->
    <li>
      <img src="https://img.shields.io/badge/dev-Jose%20Vinicius-blueviolet">
      <a href="https://github.com/euviniciusdev">
        <img src="https://img.shields.io/badge/GitHub-100000?&logo=github&logoColor=white">
      </a>
      <a href="https://www.linkedin.com/in/josevinicius-ti/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?&logo=linkedin&logoColor=white">
      </a>
    </li>
    <!-- Rafaela -->
    <li>
      <img src="https://img.shields.io/badge/dev-Rafaella%20Brunorio-blueviolet">
      <a href="https://github.com/Rafafdev">
        <img src="https://img.shields.io/badge/GitHub-100000?&logo=github&logoColor=white">
      </a>
      <a href="https://www.linkedin.com/in/rafaella-brunorio-329931203">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?&logo=linkedin&logoColor=white">
      </a>
    </li>
  </ul>
</div>