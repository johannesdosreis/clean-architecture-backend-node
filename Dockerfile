FROM node:14-alpine
ENV NODE_ENV=production
ENV HOST="0.0.0.0"
ENV PORT=3000
WORKDIR /usr/src/app
COPY . .
RUN yarn install --silent --production
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "start"]
