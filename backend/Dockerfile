FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY src ./src
COPY server.js ./

EXPOSE 3001

CMD ["npm", "start"] 