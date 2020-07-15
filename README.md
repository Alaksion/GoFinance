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
Ao executar esse comando será criado um container e será retornado um código contendo números e letras, anote esse código pois ele será importante para os próximos passos, porém caso esqueça o código ou não tenha anotado digite no terminal o comando abaixo, ele irá listar todos os container ativos na sua máquina, após isso copie
o código novamente do container que você acabou de criar.
```sh
  docker ps -a
```
Com o código do container em mãos digite o comando abaixo no terminal para inicializar o seu container, sem esse procedimento o back-end não irá conseguir se conectar ao banco de dados.
```sh
  docker start codigo_do_container
```
Agora precisamos criar o nosso banco de dados, existem diversos programas que facilitam esse procedimento, nesse passo a passo estaremos utilizando o DBeaver que pode ser encontrado [Nesse link](https://dbeaver.io/). Faça o processo de instalação normal e aguarda até estar finalizado, se necessário reinicie o seu computador.
Com o Dbeaver instalado faça exatamente os passos descritos abaixo, estarei disponibilizando uma série de imagens explicativas para te auxiliar.
[Criando o banco com Dbeaver](https://imgur.com/a/DUNiUqC)

Uma vez que o procedimento acima for completo vá no diretório backend pelo terminal e digite o comando abaixo, ele irá criar as tabelas automaticamente.
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
E poderá usar a aplicação sem problemas :)



