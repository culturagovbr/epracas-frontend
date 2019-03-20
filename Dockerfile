FROM node:8.15.1-jessie-slim

WORKDIR /var/www/epracas-frontend

COPY . .

RUN npm install -g yarn \
  && npm install -g natives \
  && yarn global add gulp

