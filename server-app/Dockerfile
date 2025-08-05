FROM node:22.17 AS dev
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get update
RUN apt-get -y install \
  cmake

RUN npm ci --quiet

COPY . .
CMD [ "npm", "run", "start:dev" ]

FROM node:22.17 AS build
ARG DATABASE_URL
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/
COPY . .

RUN npm ci --quiet
RUN npm run build
RUN test -d dist || (echo "dist directory was not created during build" && exit 1)

RUN npx prisma migrate deploy
RUN npm run db:seed

FROM node:22.17 AS production
ARG DATABASE_URL
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist/
COPY --from=build /app/prisma ./prisma/

RUN npm ci --quiet --omit=dev && \
  npx prisma generate

EXPOSE 80

CMD ["npm", "run", "start"]
