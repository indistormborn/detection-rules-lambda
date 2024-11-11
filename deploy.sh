#!/bin/bash

# Buildar o projeto TypeScript
npm run build:prod

# Instalar dependências de produção
mkdir -p dist/prod/node_modules
cp package.json package-lock.json dist/prod/
cd dist/prod
npm install --production
cd ..

# Zipar os arquivos
zip -r lambda-function.zip prod/*

# Fazer o upload para o AWS Lambda
aws lambda update-function-code --function-name detection-rules --zip-file fileb://lambda-function.zip --profile lambda-deploy

# Limpar o arquivo zip após o upload
rm lambda-function.zip