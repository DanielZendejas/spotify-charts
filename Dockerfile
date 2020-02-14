FROM node:13-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
RUN npm install
COPY . .
RUN npm install react-scripts

EXPOSE 3000

CMD ["npm", "start"]
