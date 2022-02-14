FROM node:14-slim

WORKDIR /usr/src/app
RUN npm install -g @angular/cli
COPY ./package.json ./
RUN npm install

COPY . .
EXPOSE 4200

CMD [ "npm", "start" ]
