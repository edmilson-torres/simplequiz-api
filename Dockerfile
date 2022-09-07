FROM node:16
WORKDIR /app
# COPY ["package.json", "yarn.lock", "./"]
COPY . .
RUN yarn install && yarn build
COPY src/utils/email/templates/ ./dist/utils/email/templates/
EXPOSE 3000
CMD [ "yarn", "start" ]