FROM node:{{NODE_VERSION}}-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE {{PORT}}

CMD ["npm", "start"]