FROM culturagovbr/web-node-ubuntu:latest 

WORKDIR /source

EXPOSE 4000  4001

CMD ["gulp"] 
