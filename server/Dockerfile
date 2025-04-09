FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run compile
COPY prisma ./prisma
RUN npx prisma migrate dev --name init
RUN npx prisma generate

FROM node:22 AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY .env ./
EXPOSE 4000
CMD ["node", "./dist/index.js"]
