!#/bin/bash

#Inicializando dados dos usuários
echo "Criando usuários..."
mongoimport -d enegep -c user ./api/collections/user.json
echo "Done."

#Instalando dependências
echo "Instalando pacotes..."
yarn run setup
echo "Done."

#Gerando bundle
echo "Gerando bundle..."
yarn run build
echo "Done."

#Inicializando servidor
echo "Inicializando serviço..."
node index.js
