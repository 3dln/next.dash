FROM node:current-alpine AS builder

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm i --force

COPY . .

RUN npm run build

RUN npm install --production

FROM node:current-alpine AS production

WORKDIR /usr/app

COPY package.json next.config.js .env* ./
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/node_modules ./node_modules

RUN npm i --global pm2

EXPOSE 3000

CMD [ "pm2-runtime", "start", "npm", "--", "start"]
