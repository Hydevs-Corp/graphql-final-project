FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx prisma migrate dev --name init
RUN npm run compile
COPY .env ./
EXPOSE 4000
CMD ["node", "./dist/index.js"]
