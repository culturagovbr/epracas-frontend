FROM node:8.15.1-jessie-slim

WORKDIR /var/www/epracas-frontend

COPY package.json .

RUN npm install -g yarn \
  && yarn global add gulp

