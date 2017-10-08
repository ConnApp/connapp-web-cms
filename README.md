# ConnApp Web CMS

## Requisitos
Para execução do CMS é necessario o NodeJS 8.5.x, MongoDB 3.4.x e Yarn 1.x.

## ENV
Crie as variaveis de ambiente PORT e MONGO_URL para indicar a aplicação em qual porta que o serviço vai ser inicializado e em qual endereço o banco de dados se encontra.
Caso as porta não sejam especificadas a aplicação será inicializada na porta 3000 e na seguite URL do mongo: *'mongodb://localhost:27017/connapp-web-cms'*

## Inicializando serviço
Para inicializar a aplicação execute o comando abaixo:
```sh
yarn start
```

