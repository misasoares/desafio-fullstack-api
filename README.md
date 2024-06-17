## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev


```

#Descrição
Este é o repositório da API desenvolvida em NestJS, um framework para construção de aplicativos server-side em Node.js. A API é responsável por fornecer os serviços e endpoints necessários para suportar a aplicação front-end associada https://github.com/misasoares/desafio-fullstack-web.

Como Executar
Para executar a API localmente, siga os passos abaixo:

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
Clone este repositório em seu ambiente local.
Navegue até o diretório clonado.
Execute o Docker Compose para iniciar o banco de dados PostgreSQL:
docker-compose up -d

Aguarde até que o banco de dados esteja em execução.
Execute o seguinte comando para instalar as dependências do projeto:
npm install

Após a instalação das dependências, inicie a API com o comando:
npm run start:dev 

A API estará disponível em http://localhost:3000.

#Banco de Dados
A aplicação utiliza um banco de dados PostgreSQL. O Docker Compose está configurado para iniciar uma instância local do PostgreSQL. As credenciais padrão estão definidas no arquivo docker-compose.yml. Certifique-se de que o banco de dados esteja acessível e funcionando corretamente antes de iniciar a API.
