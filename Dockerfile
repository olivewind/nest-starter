FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN npm run build

CMD [ "node", "./dist/src/main.js" ]