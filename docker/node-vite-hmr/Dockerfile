# Usa imagem oficial do Node 24
FROM node:25

# Entra de trabalho
WORKDIR /app

# Copia arquivos necessários para instalar as dependencia node_modules EM TEMPO DE BUILD
COPY ./package*.json ./

# Instala dependências + nodemon para "ouvir" as mudanças
RUN npm install && npm install -g vite

COPY ./vite.config.js ./

# Expõe a porta usada pelo Express (ajuste conforme necessário)
# Foi comentado pois foi exposto no docker compose
EXPOSE 5173

# Comando padrão ao iniciar o container
ENTRYPOINT ["vite"]