FROM node:latest 

WORKDIR /source

RUN apt update \
  && npm install  n -g \
  && n stable \
  && npm install  yarn -g \
  && npm uninstall phantomjs-prebuilt -g \
  && npm install phantomjs-prebuilt \
  && yarn global add phantomjs-prebuilt \
  && yarn install \
  && npm install gulp -g 

