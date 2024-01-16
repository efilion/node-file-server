FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --dev --silent && mv node_modules ../
COPY . .
ARG port=3000
ENV PORT=$port
EXPOSE $port
RUN chown -R node /usr/src/app
USER node
CMD ["node", "server.js"]
