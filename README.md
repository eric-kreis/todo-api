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
O projeto utiliza uma Arquitetura de Software em camadas. Ela foi estruturada de forma que se adeque bem aos princípios SOLID em uma API REST e a reutilização de `classes` e `interfaces` para fazer um código mais sólido, escalável e fácil de ser testado.


---
Eric Alfinito Kreis
ericalfinitokreis@gmail.com
Quer me conhecer melhor? [LinkedIn](https://www.linkedin.com/in/eric-kreis/)
