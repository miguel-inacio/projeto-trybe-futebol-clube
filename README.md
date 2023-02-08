# Projeto Trybe Futebol Clube :soccer:

Projeto desenvolvido no curso de desenvolvimento web da Trybe, no módulo de Back-End.

### Tecnologias utilizadas:
- API Rest com CRUD completo em TypeScript
- ORM Sequelize
- POO
- SOLID
- Docker
- Arquitetura MSC
- Mocha, Chai e Sinon, com abordagem TDD;

### Rodando localmente

Clone o repositório

```bash
  git clone git@github.com:miguel-inacio/projeto-trybe-futebol-clube.git
```

Entre no diretório do projeto

```bash
  cd projeto-trybe-futebol-clube
```

Instale as dependências

```bash
  npm install
```

Suba os containers com o script do docker-compose

```bash
  cd app/ && npm run compose:up:dev
```
:heavy_exclamation_mark: A API ficará disponível no seu navegador no endereço <http://localhost:3001/> e o front-end em <http://localhost:3000/>

### Documentação da API

<details>
  <summary> Rotas relacionadas ao login </summary>
  

#####  POST /login
- Usada para fazer login através da página inicial da aplicação no Front-End.
- Tente as seguintes credenciais
  
```
Para logar como administrador:
admin@admin.com
secret_admin
```

```
Para logar como usuário comum:
user@user.com
secret_user
```
- A requisição retorna um token gerado para cada usuário
  
<hr>


#####  GET /login/validate
- Usada para validar as credenciais do usuário e definir permissões
</details>

<details>
  <summary> Rotas relacionadas aos times </summary>


##### GET /teams
- Retorna todos os times cadastrados no banco de dados
  
<hr>

##### GET /teams/${id}
- Retornar time cadastrado no banco de dados através do ID.
</details>
 
<details>
  <summary> Rotas relacionadas às partidas </summary>

##### GET /matches
- Retorna todas as partidas armazenadas no banco de dados
  
<hr>

##### POST /matches
- Permite cadastrar uma partida no DB
  
<hr>

##### POST /matches/${id}
- Pertmite atualizar gols de uma partida específica
  
<hr>

##### POST /matches/${id}/finish
- Permite atualizar o status de uma partida, passando de "em andamento" para "finalizada" no banco de dados.
</details>

<details>
  <summary> Rotas relacionadas às tabelas de classificação </summary>
  
##### GET /leaderboard
- Retorna tabela de classificação geral
  
<hr>

##### GET /leaderboard/home
- Retorna tabela de classificação considerando apenas as partidas em casa
  
<hr>

##### GET /leaderboard/away
- Retorna tabela de classificação considerando apenas as partidas fora de casa
</details>

