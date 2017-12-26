FROM culturagovbr/web-node-ubuntu:latest 

WORKDIR /source


RUN apt update \
  && npm cache clean -f \
  && npm install -g n \
  && n stable \
  && npm install -g yarn \
  && npm uninstall phantomjs \
  && npm install phantomjs -g \
  && npm install gulp -g
