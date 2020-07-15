# Desafio React: GoFinances 
> O projeto visa criar uma aplicação simples para controle de gastos.

A aplicação GoFinances foi desenvolvida visando auxiliar o usuário a ter um controle direto e simples sobre suas entradas e saídas de dinheiro, através da importação 
de arquivos excel o usuário pode inserir seus gastos e ganhos através de uma interface limpa e direta.

![Alt text](https://i.imgur.com/80YoQ88.png "Optional title")

## Instalação

Para instalar a aplicação clone o repositório para sua máquina local com o comando
```sh
git clone https://github.com/Alaksion/GoFinance
```
Após clonar o repositório entre nos diretórios backend e web pelo terminal e digite:
```sh
yarn
```
Esse comando será responsável por instalar as dependências necessárias para fazer a aplicação funcionar. As informações aplicação GoFinances são armazenadas num banco
de dados local, para que tudo funcione corretamente é necessário configurar esse banco na sua máquina, para isso utilizaremos o Docker, você pode encontrar o manual
de instalação do docker no link:
[Manual de instalação do docker](https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2)

Após instalar o docker e se certificar que ele está funcionando normalmente precisaremos criar um container para armazenar o nosso banco, para isso no terminal digite:
```sh
docker run --name transaction_postgres -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
```
Esse comando irá criar o "local" aonde o nosso banco de dados ficará armazenado, após fazer essa configuração vá até o diretório backend pelo terminal e digite o comando
abaixo, ele será responsável por configurar as tabelas do banco automaticamente.
```sh
  yarn typeorm migration:run
```
Feito esses procedimentos no diretório backend digite os comandos abaixo nessa ordem:
```sh
  yarn dev:server
```
E no diretório web digite
```sh
  yarn start
```



