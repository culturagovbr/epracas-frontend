# e-Praças Frontend

O e-Praças é um sistema para gestão das Praças CEUs quem tem as seguintes funcionalidades: 
1. Transparência e divulgação das atividades das Praças CEUs a todos os cidadãos; 
2. apoio ao planejamento, monitoramento e avaliação das atividades desenvolvidas nos espaços; 
3. fornecimento de indicadores (relatórios e estatísticas) para a avaliação e melhoria contínua da gestão dos CEUs; e 
4. apoio à comunicação entre municípios, MinC, gestores e comunidades dos CEUs

Este é o repositório da Interface Web do sistema. O repositório da API pode ser encontrado [aqui](https://github.com/culturagovbr/epracas-backend)

## Configurando o ambiente de desenvolvimento
As dependencias estão listadas em [package.json](package.json), e podem ser gerenciadas pelo npm ou Yarn. O repositório também possui um arquivo [yarn.lock](yarn.lock) que auxilia o controle de versões pelo Yarn. Você também precisa executar uma instancia do backend, local ou remoto, para poder usar a interface plenamente. E ainda, um servidor de identificação OpenID Connect(como o [Login Cidadão](http://github.com/redelivre/login-cidadao))

- [Ambiente de desenvolvimento local com o yarn configurado.](#ambiente-de-desenvolvimento-local-com-yarn-configurado)
- [Ambiente de desenvolvimento local com container Docker.](#ambiente-local-com-contaienr-docker)
- [Configurando as variáveis de ambiente.](#configurando-as-variáveis-de-ambiente)

### Ambiente de desenvolvimento local com yarn configurado.
O frontend do e-Praças é desenvolvido utilizando Angular 1.5 com EcmaScript6(2015). O Gulp ajuda no processo de servir e gerar um build do projeto pronto a ser enviado ao servidor de produção.

Primeiramente, instale o gulp globalmente(system-wide):
```
yarn global add gulp
```

Depois, dentro do diretório da aplicação, execute:
```
yarn
```

Após instalar as dependencias, copie o arquivo app.yml.dist para app.yml e edite com suas configurações:
```
cp app.yml.dist app.yml
```

E por fim, execute o Gulp para subir o ambiente de desenvolvimento:
```
gulp
```

### Ambiente local com contaienr Docker.

#### 1. Instalação do docker.
Instale o docker escolhendo a instalação conforme o seu OS (Sistema Operacional).

[Docker Installation](https://docs.docker.com/engine/installation/) 
    
#### 2. Rodar o container docker.
Execute o container apartir de uma imagem pública do MinC.

    docker run -it -v /var/www:/var/www -p 4000:4000 --name epracas-frontend culturagovbr/web-node-ubuntu

Este comando faz as seguites tarefas:
- Baixa uma imagem pública do minc para o front do e-praças;
- Coloca pra rodar a imagem baixada;
- Compartilha a pasta "/var/www" com o container para poder editar os arquivos de fora do container;
- Compartilha a porta "4000" (porta padrao do gulp) para fora do container;
- Coloca o nome do container de epracas-frontend;
- Entra no container.

Entendendo os comandos:
- docker (chama um comando docker);
- run (baixa uma imagem e coloca ela pra rodar, caso ja tenha a imagem localmente ele usa a local);
- -it (ao terminar o comando entra no container);
- -v (compartilha pasta);
- -p (compartilha porta);
- --name (coloca um nome no container).
- culturagovbr/web-node-ubuntu (imagem publica do minc no Hub Docker, para saber mais acesse: [https://hub.docker.com/u/culturagovbr/](#https://hub.docker.com/u/culturagovbr/)).

Para saber mais comandos do docker acesse: [https://docs.docker.com/engine/reference/run/](#https://docs.docker.com/engine/reference/run/)

#### 3. Baixar o código e preparar para rodar o ambiente.

Acessar a pasta "/var/www", baixar o código.

    cd /var/www 
    git clone https://github.com/culturagovbr/epracas-frontend.git


#### 4. Instalando depedências com o npm.

Entra na pasta:
    
    cd ./epracas-frontend
    
Instala a depedências:

    npm install

#### 5. Criando arquivo de configuração. 
Copie o arquivo app.yml.dist para app.yml e edite com suas configurações:

    cp app.yml.dist app.yml
        
#### 6. Rodando o servidor.

    gulp
ou para rodar setando as variaveis de ambiente.

    NODE_ENV=production gulp
    
### Configurando as variáveis de ambiente.
Alguns elementos da aplicação podem ser configurados através de variáveis de ambiente para alterar caracteristicas de acordo com o ambiente utilizado. Lembre-se de configurar corretamente o arquivo para garantir o bom funcionamento tanto do ambiente de desenvolvimento quanto o de produção.

| Variável      | Descrição |
|---------------|-----------|
|idcultura_url  | URL para o provedor de identidade com suporte a OpenIDConnect |
|idcultura_clientId | ClientID da sua aplicação nesse provedor |
|epracas_api_url | URL para a API do EPraças |
