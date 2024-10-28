
DEPLOIEMENT MANUELLEMENT:

1 - Clone project (backend, front) 
2 - Tourner d'abord l'application en local
      -npm i
      -npm 
Docker file :

FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# build the app
FROM node:20-alpine AS builder
ARG NEXT_PUBLIC_API_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

# execute the app on :3000
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
EXPOSE 3000
CMD ["npm", "start"]


C'est quoi ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

Ce fichier point env contient l'url du backend

Lors de la creation de l'image, il faut initialiser cette valeur en donnant l'adresse du backend

CREATION IMAGE 
==> docker build --build-arg NEXT_PUBLIC_API_URL=https://api.example.com -t mon-app .

DOCKER PS
rado@rado-VirtualBox:~/morning-news/frontend$ docker images
REPOSITORY         TAG       IMAGE ID       CREATED          SIZE
mon-app            latest    6a6c5ed1f879   12 minutes ago   448MB


DOCKER TAG
rado@rado-VirtualBox:~/morning-news/frontend$ sudo docker tag mon-app:latest radomala/mon-app:latest
rado@rado-VirtualBox:~/morning-news/frontend$ docker images
REPOSITORY         TAG       IMAGE ID       CREATED              SIZE
radomala/mon-app   latest    6a6c5ed1f879   About a minute ago   448MB
mon-app            latest    6a6c5ed1f879   About a minute ago   448MB


DOCKER PUSH


