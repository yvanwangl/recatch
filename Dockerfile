FROM node:8.9.1

MAINTAINER yvanwang googolewang@gmail.com

RUN mkdir -p /usr/src

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /usr/src
COPY build recatch

WORKDIR /usr/src/recatch
COPY package.json .

#RUN npm install -g cross-env pm2
#RUN npm install pm2 cross-env -g

EXPOSE 8084

#RUN container run command
CMD ["npm", "run", "start:docker"]