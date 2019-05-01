FROM node:alpine
COPY package-lock.json me/package-lock.json
COPY package.json me/package.json
COPY node_modules me/node_modules
COPY render.js me/render.js
COPY server.js me/server.js
EXPOSE 3001
CMD ["node", "me/server.js"]