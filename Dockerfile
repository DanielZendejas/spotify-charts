FROM node:13-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY public/ /app/public/
COPY src/ /app/src/
RUN npm install
RUN npm install react-scripts

EXPOSE 3000

CMD ["npm", "start"]
