FROM node:22.17 AS dev
WORKDIR /app
ENV PATH ./node_modules/.bin:$PATH

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
