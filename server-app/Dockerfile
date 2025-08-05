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
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

RUN npm ci --quiet

COPY . .
RUN npm run build
RUN test -d dist || (echo "dist directory was not created during build" && exit 1)

FROM node:22.17 AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma/
RUN npm ci --quiet --omit=dev
RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 80

CMD ["npm", "run", "start"]
