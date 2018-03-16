FROM node:latest 

WORKDIR /source

COPY start.sh /source/.

COPY package.json /source/.

RUN npm install yarn \
  && chmod +x start.sh

CMD /source/start.sh