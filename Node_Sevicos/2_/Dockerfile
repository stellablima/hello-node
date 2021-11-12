FROM node:14-alpine
WORKDIR /urs/scr/dir-name
RUN apk update && apk upgrade && \
    apk add --no-cache tzdata
COPY package*.json ./
RUN npm install
COPY . .
CMD ['npm', 'start']