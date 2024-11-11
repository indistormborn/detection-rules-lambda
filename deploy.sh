#!/bin/bash

# Buildar o projeto TypeScript
npx tsc

# Instalar dependências de produção
mkdir -p dist/node_modules
cp package.json package-lock.json dist/
cd dist
npm install --production
cd ..

# Zipar os arquivos
cd dist
zip -r ../lambda-function.zip *
cd ..

# Fazer o upload para o AWS Lambda
aws lambda update-function-code --function-name detection-rules --zip-file fileb://lambda-function.zip --profile lambda-deploy