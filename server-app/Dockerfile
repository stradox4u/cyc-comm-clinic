FROM node:22.17 AS dev
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get update
RUN apt-get -y install \
  cmake

RUN --mount=type=cache,target=/root/.npm \
    npm ci --quiet

COPY . .
CMD [ "npm", "run", "start:dev" ]

FROM node:22.17 AS build
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .
RUN npm run build

FROM node:22.17 AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist

EXPOSE 80

CMD ["npm", "run", "start"]