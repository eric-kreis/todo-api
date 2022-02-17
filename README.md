# Todo API - Guia de início rápido

### O QUE É
O Projeto é uma Interface de Programação de Aplicação (API) que será o coração para uma aplicação Front-end.

### A QUEM SE DESTINA / OBJETIVO
Este projeto é mantido sob o mais absoluto sigilo para a Empresa Ebyrt. Se você está vendo isso certamente você faz parte do projeto. O objetivo deste documento é facilitar a compreenção do escopo do que foi desenvolvido e de como funciona.

### INSTALAÇÃO LOCAL
* Instale o NodeJS, um gerenciador de pacotes Node (npm ou yarn) e o banco de dados MongoDB;
* Em seu servidor local baixe o projeto usando `git clone git@github.com:eric-kreis/todo-api.git`;
* Digite: `yarn (ou npm install)` para instalar os pacotes (dependências);
* Crie o arquivo `.env` no diretório raiz do projeto e escreva nele as variáveis de ambiente, elas estão no `.env.example`;

### CONVENÇÕES
Convenções adotadas no ambiente de trabalho para o projeto Todo API:
* Os nomes das collections do Mongo devem ser estar de acordo com a entidade no plural: **users**, **tasks**;
* Todas as `classes` e `interfaces` devem ser escritas em `PascalCase`;
* Todos os `metodos` devem ser representadas por um verbo ou frases verbais no infinitivo: create, findById, delete;
* Todos os `endpoints` da API devem ser representados no plural e devem estar relacionados à uma entidade: **/users/signin**, **/tasks/...**;
* Todos os `controllers`, `services`, `validators`, `repositories` e `models` devem respeitar os princípios SOLID e a Arquitetura em Camadas;

### ARQUITETURA
O projeto utiliza uma Arquitetura de Software em camadas. Ela foi estruturada de forma que se adeque bem aos princípios SOLID em uma API REST e a reutilização de `classes` e `interfaces` para fazer um código mais sólido, escalável e testável. Além disso, me inspirei na arquitetura apresentada [nesse artigo](https://medium.com/perry-street-software-engineering/clean-api-architecture-2b57074084d5) do Eric Silverberg. Para ilustrar melhor, veja abaixo uma imagem da arquitetura do artigo.

![The Clean API Architeture](https://miro.medium.com/max/120/1*yTDpfIqqAdeKRhbHwfhrYQ.png)

#### ESTRUTURA DE PASTAS E ARQUIVOS SIMPLIFICADA
```
|-- rootDir
    |-- .env
    |-- .env.example
    |-- .eslintignore
    |-- .eslintrc.json
    |-- .gitignore
    |-- LICENSE
    |-- README.md
    |-- ecosystem.config.yml
    |-- jest.config.ts
    |-- package.json
    |-- tsconfig.eslint.json
    |-- tsconfig.json
    |-- yarn.lock
    |-- __tests__
    |   |-- integration
    |   |-- mocks
    |   |-- unit
    |-- coverage
    |-- src
        |-- @types
        |-- api
        |   |-- app.ts
        |   |-- server.ts
        |-- application
        |   |-- joiSchemas
        |   |   |-- JOI-SCHEMAS
        |   |-- services
        |   |   |-- SERVICE-CLASSES
        |   |-- validators
        |       |-- VALIDATOR-CLASSES
        |-- config
        |   |-- CONFIG-FILES
        |-- data
        |   |-- connection.ts
        |   |-- models
        |   |   |-- MODEL-CLASSES
        |   |-- structs
        |       |-- STRUCT-CLASSES
        |-- domains
        |   |-- application
        |   |   |-- service
        |   |   |   |-- SERVICE-INTERFACES
        |   |   |-- validators
        |   |       |-- VALIDATOR-INTERFACES
        |   |-- data
        |   |   |-- model
        |   |   |   |-- MODEL-INTERFACES
        |   |   |-- schemas
        |   |       |-- SCHEMA-INTERFACES
        |   |-- entity
        |   |   |-- respository
        |   |       |-- REPOSITORY-INTERFACES
        |   |-- infra
        |       |-- CONTROLLER-INTERFACES
        |-- entities
        |   |-- builders
        |   |   |-- BUILDER-CLASSES
        |   |-- repositories
        |       |-- REPOSITORY-CLASSES
        |-- helpers
        |   |-- HELPER-FUNCTIONS
        |-- infra
        |   |-- controllers
        |   |   |-- CONTROLLER-CLASSES
        |   |-- initializers
        |   |   |-- INITIALIZER-CLASSES
        |   |-- middlewares
        |   |   |-- MIDDLEWARE-HANDLERS
        |   |-- routers
        |       |-- ROUTER-CLASSES
        |-- utils
            |-- UTIL-VARIABLES
```

### BIBLIOTECAS DO PROJETO
* [Express](https://expressjs.com/pt-br/) como framework de rotas (endpoints);

* Banco de dados [MongoDB](https://www.mongodb.com/pt-br) e o [MongoDB Driver](https://docs.mongodb.com/drivers/node/current/) para fazer a comunicação da API com o banco;



---
Eric Alfinito Kreis
ericalfinitokreis@gmail.com
Quer me conhecer melhor? [LinkedIn](https://www.linkedin.com/in/eric-kreis/)
