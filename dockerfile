# Base image
FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@6.14.11
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3030
CMD [ "node", "dist/main.js" ]
